import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useRef, useState } from 'react';
import { router } from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";

const CustomHeader = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

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
            <TouchableOpacity onPress={() => router.replace("/")}>
                <Image
                    source={images.logo}
                    style={{ width: 180, height: 40, resizeMode: "contain" }}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleMenu} style={{ position: "relative", width: 40, height: 29 }}>
                <Animated.Image
                    source={require("../assets/icons/menu_icon_new.png")}
                    style={{
                        position: "absolute",
                        width: 30,
                        height: 20,
                        opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
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
                        transform: [{ scale: fadeAnim }],
                    }}
                >
                    <Image
                        source={icons.favicon}
                        tintColor="white"
                        style={{ width: 28.36, height: 29, marginTop: 15 }}
                        resizeMode="contain"
                    />

                    <TouchableOpacity onPress={() => router.push("/buy-now")}>
                        <Text style={{ color: "#F1F2F2", fontFamily: "Lexend-Zetta-Bold", marginTop: 50 }}>Buy Cards</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/support")}>
                        <Text style={{ color: "#F1F2F2", fontFamily: "Lexend-Zetta-Bold", marginTop: 15 }}>Contact us</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => router.push("/sign-in")}>
                        <Text style={{ color: "#82BCC7", fontFamily: "Lexend-Zetta-Regular", marginTop: 70 }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/sign-up")}>
                        <Text style={{ color: "#82BCC7", fontFamily: "Lexend-Zetta-Regular", marginTop: 15 }}>Sign Up</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    );
};

export default CustomHeader;