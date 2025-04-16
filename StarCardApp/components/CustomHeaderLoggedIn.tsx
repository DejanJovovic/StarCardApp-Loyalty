import {View, Text, Image, TouchableOpacity, Animated, Alert, BackHandler, ActivityIndicator} from 'react-native'
import React, {useRef, useState} from 'react'
import {useRouter} from "expo-router";
import colors from "@/constants/colors";
import images from "@/constants/images";
import {useAuth} from "@/components/AuthContext";

const CustomHeaderLoggedIn = () => {

    const router = useRouter();
    const {logout} = useAuth();

    const [isLoggingOut, setIsLoggingOut] = useState(false); // State for loading indicator
    const [menuVisible, setMenuVisible] = useState(false);

    const fadeAnim = useRef(new Animated.Value(1)).current; // Opacity for open menu icon
    const rotateAnim = useRef(new Animated.Value(0)).current; // Rotation animation


    const toggleMenu = () => {
        const toValue = menuVisible ? 0 : 1;

        setMenuVisible((prev) => !prev);


        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: menuVisible ? 1 : 0,
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
        <View
            className="relative bg-white p-3 shadow-md flex-row items-center justify-between">
            <Image
                source={images.logo}
                style={{tintColor: "black", width: 180, height: 40, resizeMode: "contain", marginRight: 10}}/>
            <TouchableOpacity onPress={toggleMenu} style={{position: "relative", width: 50, height: 40}}>
                <Animated.Image
                    source={require("../assets/images/drop-down-menu.png")}
                    style={{
                        position: "absolute",
                        width: 45,
                        height: 45,
                        opacity: fadeAnim,
                        transform: [
                            {
                                rotate: rotateAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["0deg", "90deg"],
                                }),
                            },
                            {
                                scale: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.8, 1],
                                }),
                            },
                        ],
                    }}
                />

                <Animated.Image
                    source={require("../assets/images/close-menu.png")}
                    style={{
                        position: "absolute",
                        width: 50,
                        height: 50,
                        opacity: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                        }),
                        transform: [
                            {
                                rotate: rotateAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["-90deg", "0deg"],
                                }),
                            },
                            {
                                scale: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0.8],
                                }),
                            },
                        ],
                    }}
                />
            </TouchableOpacity>

            {menuVisible && (
                <View className="absolute right-4 top-16 bg-white shadow-lg rounded-md w-40">
                    <TouchableOpacity className="p-3 border-b border-gray-200"
                                      onPress={() => router.push("/settings")}>
                        <Text className="text-gray-700">Settings</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>

    )
}
export default CustomHeaderLoggedIn
