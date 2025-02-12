import {View, Text, Image, TouchableOpacity, Alert, Animated} from 'react-native'
import React, {useRef, useState} from 'react'
import {router, usePathname, useRouter} from "expo-router";

const CustomHeader = () => {

    const router = useRouter();
    const pathname = usePathname();

    const isRootScreen = pathname === '/';
    const isHomeScreen = pathname === "/home-screen";
    const [menuVisible, setMenuVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current; // Opacity for open menu icon
    const rotateAnim = useRef(new Animated.Value(0)).current; // Rotation animation

    const goBackToHome = () => {
        // works but it doesnt make sense to be able to press the logo from home-screen and then go back to the starting screen
        // so it probably needs fixing
        if (!isRootScreen) {
            router.push('/');
        }
    };

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

    const handleLogout = () => {
        Alert.alert(
            "",
            "Are you sure you want to log out?",
            [
                {text: "No", style: "cancel"},
                {
                    text: "Yes",
                    onPress: () => {
                        setMenuVisible(false);
                        // logout logic needs to be implemented, to clear auth state
                        router.push("/sign-in");
                    }
                }
            ]
        );
    };

    return (
        <View
            className={`relative bg-white p-4 shadow-md ${isHomeScreen ? "flex-row items-center justify-between" : "flex-row items-center justify-start"}`}>
            <TouchableOpacity
                onPress={goBackToHome} disabled={isRootScreen}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={{tintColor: "black", width: 40, height: 40, resizeMode: "contain", marginRight: 10}}
                />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-700">STARCARD</Text>

            {/* drop down menu works only on home-screen(it should work on profile and setings and the rest also??)*/}
            {isHomeScreen && (
                <TouchableOpacity onPress={toggleMenu} style={{position: "relative", width: 50, height: 50}}>
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
            )}

            {menuVisible && isHomeScreen && (
                <View className="absolute right-4 top-16 bg-white shadow-lg rounded-md w-40">
                    <TouchableOpacity className="p-3 border-b border-gray-200"
                                      onPress={() => router.push("/profile-screen")}>
                        <Text className="text-gray-700">Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-3 border-b border-gray-200"
                                      onPress={() => router.push("/settings-screen")}>
                        <Text className="text-gray-700">Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-3" onPress={handleLogout}>
                        <Text className="text-red-500">Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>

    )
}
export default CustomHeader
