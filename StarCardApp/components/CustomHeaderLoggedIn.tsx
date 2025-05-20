import {View, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";
import images from "@/constants/images";

const CustomHeaderLoggedIn = () => {

    const router = useRouter();

    return (
        <View className="relative bg-white p-3 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.replace("/home")}>
                <Image
                    source={images.logo}
                    style={{width: 180, height: 40, resizeMode: "contain"}}
                />
            </TouchableOpacity>

        </View>
    );
};
export default CustomHeaderLoggedIn
