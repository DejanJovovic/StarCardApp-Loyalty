import {View, Text, Image} from 'react-native'
import React from 'react'

const CustomHeader = () => {
    return (
        <View className="flex-row items-center justify-start bg-white p-4 shadow-md">
            {/* Logo */}
            <Image
                source={require("../assets/images/logo.png")}
                style={{ tintColor: "black", width: 40, height: 40, resizeMode: "contain", marginRight: 10 }}
            />

            {/* Title */}
            <Text className="text-2xl font-bold text-gray-700">STARCARD</Text>
        </View>

    )
}
export default CustomHeader
