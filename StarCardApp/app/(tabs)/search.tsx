import {View, TextInput, Image, Text, TouchableOpacity, SafeAreaView} from "react-native";
import React, {useState} from "react";
import icons from "@/constants/icons";
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/colors";
import CustomHeaderLoggedIn from "@/components/CustomHeaderLoggedIn";
import images from "@/constants/images"; // Assuming you have icons.search

export default function Search() {
    const [query, setQuery] = useState("");

    return (
        <SafeAreaView>
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 10}}>
                    <CustomHeaderLoggedIn/>
                </View>
                <View className="flex-col px-7 mt-10">
                    <Text style={{fontFamily: 'Lexend-Zetta-Bold', paddingTop: 62}}>Search</Text>
                    <Text className="mb-4"
                          style={{color: colors.secondary, fontFamily: 'Lexend-Deca-Medium'}}>Quickly find your favorite
                        card</Text>
                </View>
                <View className="w-[90%] self-center mt-5 px-4">
                    <View className="rounded-full flex-row items-center h-12 px-3 pr-0"
                          style={{backgroundColor: "#82BCC7"}}>
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Search"
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
                <View className="items-center justify-center px-7">
                    <Image
                        source={images.testCards}
                        style={{width: 450, height: 700, marginTop: 150}}
                        resizeMode="contain"/>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}