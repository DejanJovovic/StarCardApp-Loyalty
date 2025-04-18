import {View, TextInput, Image, Text, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import icons from "@/constants/icons";
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/colors";
import CustomHeaderLoggedIn from "@/components/CustomHeaderLoggedIn"; // Assuming you have icons.search

export default function Search() {
    const [query, setQuery] = useState("");

    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="flex-1">
            <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 10}}>
                <CustomHeaderLoggedIn/>
            </View>
            <View className="flex-1 bg-white p-4 mt-10">
                <View className="justify-start items-start mt-10 flex-col">
                    <Text className="font-bold text-2xl text-black">Search</Text>
                    <Text className="text-xl mt-2"
                          style={{color: colors.secondary}}>Quickly find your favorite card</Text>
                </View>
                <View className="w-[90%] self-center mt-5">
                    <View className="bg-[#92C4CE] mt-5 rounded-full flex-row items-center h-12 px-3 pr-1">
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Search..."
                            placeholderTextColor="white"
                            className="flex-1 text-base text-white px-2 ml-5"
                        />

                        <TouchableOpacity
                            onPress={() => {
                            }}
                            className="h-full rounded-full bg-black justify-center items-center"
                            style={{width: 45}}
                        >
                            <Text className="text-white text-sm font-bold">Go</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}