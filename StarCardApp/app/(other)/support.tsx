import {View, Text, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import colors from "@/constants/colors";
import {LinearGradient} from "expo-linear-gradient";
import images from "@/constants/images";

const Support = () => {
    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1,}} className="px-5 pb-15">
                <View className="flex flex-col mt-10 items-center justify-center">
                    <Text className="font-bold text-3xl tracking-wider"
                          style={{color: colors.secondary}}>SUPPORT</Text>
                    <Text className="mt-3 text-lg font-bold"
                          style={{color: colors.primary}}>Fill out the form below and we will get back to you
                        asap.</Text>
                </View>

                <View className="flex-row justify-between mt-10">
                    <View className="flex-1 mr-2">
                        <Text className="text-sm"
                              style={{color: colors.primary}}>Full Name</Text>
                        <TextInput
                            className="border border-[#74747EF3] text-black rounded-md p-3 mt-1 h-12 bg-white"
                        />
                    </View>

                    <View className="flex-1 ml-2">
                        <Text className="text-sm"
                              style={{color: colors.primary}}>Phone number</Text>
                        <TextInput
                            className="border border-[#74747EF3] text-black rounded-md p-3 mt-1 h-12 bg-white"
                            keyboardType="phone-pad"
                        />
                    </View>
                </View>

                <Text className="text-sm mt-4"
                      style={{color: colors.primary}}>Email Address</Text>
                <TextInput
                    className="border border-[#74747EF3] text-black rounded-md p-3 mt-1 h-12 bg-white"
                    keyboardType="email-address"
                />

                <Text className="text-sm mt-4"
                      style={{color: colors.primary}}>Question</Text>
                <TextInput
                    className="border border-[#74747EF3] text-black rounded-md p-3 mt-1 h-36 bg-white"
                />

                <TouchableOpacity className="bg-[#92C4CE] py-4 rounded-md mt-6">
                    <Text className="text-center font-semibold text-base"
                          style={{color: colors.gradientColor2}}>SEND</Text>
                </TouchableOpacity>

                <View className="mt-10 w-full">
                    <Image
                        source={images.contactMapImage}
                        resizeMode="cover"
                        className="w-full h-[200px]"
                    />
                </View>

                <View className="flex-row mt-10 mb-10">
                    <TouchableOpacity>
                        <Image
                            source={images.logo}
                            style={{tintColor: "black", width: 30, height: 30, resizeMode: "contain", marginRight: 10}}
                        />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold"
                          style={{color: colors.primary}}>STARCARD</Text>

                    <View className="flex-col ml-5">
                        <Text className="text-xs"
                              style={{color: colors.primary}}>For all information</Text>
                        <Text className="text-xs"
                              style={{color: colors.primary}}>you can contact</Text>
                        <Text className="text-xs"
                              style={{color: colors.primary}}>us at our offices in</Text>
                        <Text className="text-xs"
                              style={{color: colors.primary}}>Belgrade (Serbia) and</Text>
                        <Text className="text-xs"
                              style={{color: colors.primary}}>Dubai (UAE)</Text>
                        {/*can we clickable to open mail app???*/}
                        <Text className="text-xs mt-4"
                              style={{color: colors.primary}}>office@starcardapp.com</Text>
                    </View>
                    <View className="ml-4 mt-2">
                        {/*should be changed to display a real qr code!!*/}
                        <Image
                            source={images.qrCodeTest}
                            style={{width: 75, height: 75, resizeMode: "contain"}}
                        />
                    </View>
                </View>


            </ScrollView>
        </LinearGradient>
    )
}
export default Support
