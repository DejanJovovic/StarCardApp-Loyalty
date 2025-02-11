import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {router, usePathname, useRouter} from "expo-router";

const CustomHeader = () => {

    const router = useRouter();
    const pathname = usePathname();

    const isRootScreen = pathname === '/';

    const goBackToHome = () => {
        if (!isRootScreen) {
            router.push('/');
        }
    };

    return (
        <View className="flex-row items-center justify-start bg-white p-4 shadow-md">
            <TouchableOpacity
                onPress={goBackToHome} disabled={isRootScreen}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={{tintColor: "black", width: 40, height: 40, resizeMode: "contain", marginRight: 10}}
                />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-700">STARCARD</Text>
        </View>

    )
}
export default CustomHeader
