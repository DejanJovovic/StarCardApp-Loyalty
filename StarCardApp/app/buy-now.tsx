import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import colors from "@/constants/colors";
import {LinearGradient} from "expo-linear-gradient";
import images from "@/constants/images";

const BuyNow = () => {
    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1}} className="px-5 pb-15">
                <Text className="text-2xl font-bold tracking-wider text-center justify-center mt-7"
                      style={{color: colors.secondary}}>PICK YOUR STYLE CARD</Text>

                <View className="mt-10 flex flex-row items-center">
                    <Text className="font-bold text-lg"
                          style={{color: colors.primary}}>Plasty</Text>
                    <View className="flex-row items-center ml-auto">
                        <View className="bg-black p-3.5">
                            <Text className="text-white text-sm">0€</Text>
                        </View>
                        <TouchableOpacity className="bg-[#92C4CE] p-3">
                            <Text className="text-center font-semibold text-base text-white">ADD TO CARD</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mt-5">
                    <View>
                        <Image source={images.card1}
                               resizeMode="contain"
                               style={{width: 380, height: 200}}
                               className="rounded-[30px]"/>
                    </View>
                </View>


                <View className="mt-10 items-center justify-center flex flex-col">
                    <Text className="text-lg font-bold">Choose color</Text>
                    <View className="flex-row mt-4 gap-x-2">
                        {["#000000", "#F09595", "#93DBD0", "#FDD774", "#EDDCBD", "#132A3D"].map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                className="w-10 h-10 rounded-full"
                                style={{backgroundColor: color}}
                                /*should add to select that color*/
                                /*onPress={() =>()}*/
                            />
                        ))}
                    </View>
                </View>
                <View className="border-t border-[#74747EF3] mt-5 "></View>


                <View className="mt-10 flex flex-row items-center">
                    <Text className="font-bold text-lg"
                          style={{color: colors.primary}}>Metallic</Text>
                    <View className="flex-row items-center ml-auto">
                        <View className="bg-black p-3.5">
                            <Text className="text-white text-sm">0€</Text>
                        </View>
                        <TouchableOpacity className="bg-[#92C4CE] p-3">
                            <Text className="text-center font-semibold text-base text-white">ADD TO CARD</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mt-5">
                    <View>
                        <Image source={images.card3}
                               resizeMode="contain"
                               style={{width: 380, height: 200}}
                               className="rounded-[30px]"/>
                    </View>
                </View>


                <View className="mt-10 items-center justify-center flex flex-col">
                    <Text className="text-lg font-bold">Choose color</Text>
                    <View className="flex-row mt-4 gap-x-2">
                        {[images.brushColor1, images.brushColor2, images.brushColor3, images.brushColor4, images.brushColor5, images.brushColor6].map((image, index) => (
                            <TouchableOpacity
                                key={index}
                                className="w-10 h-10 rounded-full"
                                /*should add to select that color*/
                                /*onPress={() =>()}*/
                            >
                                <Image source={image} className="w-full h-full" resizeMode="cover"/>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View className="border-t border-[#74747EF3] mt-5"></View>
            </ScrollView>
        </LinearGradient>
    )
}
export default BuyNow
