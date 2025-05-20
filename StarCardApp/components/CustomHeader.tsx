import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from "expo-router";
import images from "@/constants/images";

const CustomHeader = () => {

    return (
        <View className="relative bg-white p-3 flex-row items-center justify-between" style={{height: 80}}>
            <TouchableOpacity onPress={() => router.replace("/")}>
                <Image
                    source={images.logo}
                    style={{ width: 180, height: 40, resizeMode: "contain" }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default CustomHeader;