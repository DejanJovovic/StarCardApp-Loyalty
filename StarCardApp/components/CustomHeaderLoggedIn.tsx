import {View, Text, Image, TouchableOpacity, Animated, Alert, BackHandler, ActivityIndicator} from 'react-native'
import React, {useRef, useState} from 'react'
import {router, useRouter} from "expo-router";
import colors from "@/constants/colors";
import images from "@/constants/images";
import {useAuth} from "@/components/AuthContext";
import icons from "@/constants/icons";

const CustomHeaderLoggedIn = () => {

    const router = useRouter();
    const [menuVisible, setMenuVisible] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity for open menu icon
    const rotateAnim = useRef(new Animated.Value(0)).current; // Rotation animation


    const toggleMenu = () => {
        const toValue = menuVisible ? 0 : 1;
        setMenuVisible(!menuVisible);

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: menuVisible ? 0 : 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View className="relative bg-white p-3 flex-row items-center justify-between">
            <Image
                source={images.logo}
                style={{width: 180, height: 40, resizeMode: "contain"}}
            />

            <TouchableOpacity onPress={toggleMenu} style={{position: "relative", width: 40, height: 29}}>
                <Animated.Image
                    source={require("../assets/icons/menu_icon_new.png")}
                    style={{
                        position: "absolute",
                        width: 30,
                        height: 20,
                        opacity: fadeAnim.interpolate({inputRange: [0, 1], outputRange: [1, 0]}),
                        transform: [
                            {
                                rotate: rotateAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["0deg", "90deg"],
                                }),
                            },
                        ],
                    }}
                />
                <Animated.Image
                    source={require("../assets/icons/x_icon_new.png")}
                    style={{
                        position: "absolute",
                        width: 30,
                        height: 20,
                        opacity: fadeAnim,
                        transform: [
                            {
                                rotate: rotateAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["-90deg", "0deg"],
                                }),
                            },
                        ],
                    }}
                />
            </TouchableOpacity>

            {menuVisible && (
                <Animated.View
                    style={{
                        position: "absolute",
                        top: "152%",
                        right: 0,
                        width: 200,
                        height: 340,
                        backgroundColor: '#000000E5',
                        paddingVertical: 20,
                        paddingHorizontal: 16,
                        borderBottomLeftRadius: 33,
                        alignItems: 'flex-end',
                        opacity: fadeAnim,
                        transform: [{scale: fadeAnim}],
                        zIndex: 9999,             // <-- Important
                        elevation: 20,
                    }}
                >
                    <Image
                        source={icons.favicon}
                        tintColor="white"
                        style={{width: 28.36, height: 29, marginTop: 15}}
                        resizeMode="contain"
                    />

                    <TouchableOpacity onPress={() => router.push("/settings")}>
                        <Text style={{
                            color: "#82BCC7",
                            fontFamily: "Lexend-Zetta-Regular",
                            marginTop: 190
                        }}>Settings</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    );
};
export default CustomHeaderLoggedIn
