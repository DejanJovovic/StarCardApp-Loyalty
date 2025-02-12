import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions
} from 'react-native'
import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const images = [
    require("../../../assets/images/elements/cc3b.jpg"),
    require("../../../assets/images/elements/cc1c.jpg"),
    require("../../../assets/images/elements/cc4b.jpg"),
];

const textDescriptions = [
    "Welcome to StarCard",
    "Loyalty cards",
    "Revolution",
];

// the screen needs fixing

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

    const handleScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(index);
    };

    return (
        <LinearGradient colors={["#3E5060", "#B0C4DE"]} className="flex-1 justify-center items-center">

            <FlatList
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                onScroll={handleScroll}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
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
                                source={item}
                                style={{ width: "100%", height: "90%" }}
                                resizeMode="cover"
                                className=" rounded-[50px] shadow-gray-700"

                            />

                        </View>
                    </View>

                )}
            />

            <View className="flex-row mt-4 mb-12">
                {images.map((_, i) => (
                    <View
                        key={i}
                        className={`w-3 h-3 mx-1 rounded-full ${i === activeIndex ? 'bg-white' : 'bg-gray-500'}`}
                    />
                ))}
            </View>

            <Animated.Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "white",
                    marginTop: 10,
                    opacity: textOpacity,
                }}
            >
                {textDescriptions[activeIndex]}
            </Animated.Text>

            <Animated.View
                style={{
                    marginTop: 20,
                    marginBottom: 10,
                    transform: [{ translateY: buttonTranslateY }],
                }}
            >
                <TouchableOpacity
                    className="bg-white py-4 px-12 rounded-full mb-4"
                    onPress={() => router.push("/sign-up")}
                >
                    <Text className="text-gray-500 text-lg font-semibold">Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="border border-white py-4 px-12 rounded-full"
                    onPress={() => router.push("/sign-in")}
                >
                    <Text className="text-white text-lg font-semibold">Sign In</Text>
                </TouchableOpacity>
            </Animated.View>
        </LinearGradient>
    );
};

export default Index
