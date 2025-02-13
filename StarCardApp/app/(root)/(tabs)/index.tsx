import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions, Alert, BackHandler
} from 'react-native'
import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import {rootData} from "@/constants/data";
import colors from "@/constants/colors";

const {width, height} = Dimensions.get("window");


// the screen needs improvement

const Index = () => {
    const router = useRouter();
    const textOpacity = useRef(new Animated.Value(0)).current;
    const buttonTranslateY = useRef(new Animated.Value(50)).current;
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }).start();
        }, 500);

        setTimeout(() => {
            Animated.timing(buttonTranslateY, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }, 1000);
    }, []);

    // activates when the user tries to leave by swiping on their phone
    // is it good to have two useEffects???
    useEffect(() => {
        const handleBackPress = () => {
            Alert.alert(
                "",
                "Are you sure you want to exit the app?",
                [
                    {text: "No", style: "cancel"},
                    {
                        text: "Yes",
                        onPress: () => {
                            BackHandler.exitApp();
                        }
                    }
                ]
            );
            return true; // prevents exiting the app
        };
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        };
    }, []);

    const handleScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(index);
    };

    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}
                        className="flex-1 justify-center items-center">

            <FlatList
                data={rootData}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                onScroll={handleScroll}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
                    <View
                        style={{
                            width,
                            height: height * 0.7,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                width: width * 0.9,
                                height: "80%",
                                overflow: "hidden",
                            }}
                        >
                            <Image
                                source={item.image}
                                style={{width: "100%", height: "90%"}}
                                resizeMode="cover"
                                className=" rounded-[50px] shadow-gray-700"
                            />

                            <View
                                style={{
                                    position: "absolute",
                                    bottom: 50,
                                    left: 0,
                                    right: 0,
                                    alignItems: "center",
                                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                                    paddingVertical: 8,
                                    borderBottomLeftRadius: 50,
                                    borderBottomRightRadius: 50,
                                }}
                            >
                                <Text className="text-white text-2xl font-bold">
                                    {item.description}
                                </Text>
                            </View>
                        </View>

                    </View>

                )}
            />

            <View className="flex-row mt-4 mb-12">
                {rootData.map((_, i) => (
                    <View
                        key={i}
                        className={`w-3 h-3 mx-1 rounded-full ${i === activeIndex ? 'bg-white' : 'bg-gray-500'}`}
                    />
                ))}
            </View>

            <Animated.Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: colors.primary,
                    marginTop: 10,
                    opacity: textOpacity,
                }}
            >
                Welcome to StarCard
            </Animated.Text>

            <Animated.View
                style={{
                    marginTop: 20,
                    marginBottom: 10,
                    transform: [{translateY: buttonTranslateY}],
                }}
            >
                <TouchableOpacity
                    className="bg-white py-4 px-12 rounded-full mb-4"
                    onPress={() => router.push("/sign-up")}
                >
                    <Text className="text-xl font-bold"
                          style={{color: colors.primary}}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="border border-[#92C4CE] py-4 px-12 rounded-full"
                    onPress={() => router.push("/sign-in")}
                >
                    <Text className="text-xl font-bold"
                          style={{color: colors.secondary}}>Sign In</Text>
                </TouchableOpacity>
            </Animated.View>
        </LinearGradient>
    );
};

export default Index
