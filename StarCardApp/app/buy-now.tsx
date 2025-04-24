import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import colors from "@/constants/colors";
import {LinearGradient} from "expo-linear-gradient";
import images from "@/constants/images";
import CustomHeader from "@/components/CustomHeader";

const BuyNow = () => {
    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
            <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 10}}>
                <CustomHeader/>
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1}} className="px-5 pb-15"
                        style={{marginTop: 80}}>
                <Text className="tracking-wider text-center justify-center mt-7"
                      style={{color: "#82BCC7", fontFamily: "Lexend-Zetta-Bold", fontSize: 19}}>PICK YOUR STYLE
                    CARD</Text>

                <View className="mt-10 flex flex-row items-center">
                    <Text style={{
                        fontFamily: "Lexend-Regular",
                        fontSize: 15,
                    }}>Plasty</Text>
                    <View className="flex-row items-center ml-auto">
                        <View className="p-3.5" style={{backgroundColor: "#0C0C0C"}}>
                            <Text style={{
                                fontFamily: "Lexend-Regular",
                                fontSize: 14, color: "white"
                            }}>0€</Text>
                        </View>
                        <TouchableOpacity className="bg-[#82BCC7] p-3">
                            <Text className="text-center"
                                  style={{
                                      fontFamily: "Lexend-SemiBold",
                                      fontSize: 15, color: "white"
                                  }}>ADD TO CARD</Text>
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
                    <Text style={{
                        fontFamily: "Lexend-Regular",
                        fontSize: 15,
                    }}>Choose color</Text>
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
                <View className="border-t border-[#0C0C0C] mt-5 "></View>


                <View className="mt-10 flex flex-row items-center">
                    <Text style={{
                        fontFamily: "Lexend-Regular",
                        fontSize: 15,
                    }}>Metallic</Text>
                    <View className="flex-row items-center ml-auto">
                        <View className="p-3.5"
                              style={{backgroundColor: "#0C0C0C"}}>
                            <Text style={{
                                fontFamily: "Lexend-Regular",
                                fontSize: 14, color: "white"
                            }}>0€</Text>
                        </View>
                        <TouchableOpacity className="bg-[#92C4CE] p-3">
                            <Text className="text-center"
                                  style={{
                                      fontFamily: "Lexend-SemiBold",
                                      fontSize: 15, color: "white"
                                  }}>ADD TO CARD</Text>
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
                    <Text style={{
                        fontFamily: "Lexend-Regular",
                        fontSize: 15,
                    }}>Choose color</Text>
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
