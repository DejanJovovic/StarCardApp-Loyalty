import {View, Text, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native'
import React from 'react'
import {router} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";

const SignUp = () => {
    return (
        <LinearGradient colors={["#3E5060", "#B0C4DE"]} className="flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="relative">
                    <Image
                        source={require('../assets/images/cellphones.jpg')}
                        className="w-full h-56"
                        resizeMode="cover"
                    />
                </View>

                <View className="px-6 py-8">
                    <Text className="text-lg font-semibold text-gray-100 text-start">LOYALTY CARDS</Text>
                    <Text className="text-lg font-semibold text-gray-100 text-start">REVOLUTION</Text>

                    <Text className="text-2xl mt-6 text-gray-100">
                        <Text className="font-bold">CREATE</Text>
                        <Text> AN ACCOUNT</Text>
                    </Text>
                    <View className="border-b border-gray-400 w-full mx-auto my-2" />

                    <View className="mt-5">
                        <View className="flex-row justify-between">
                            <View className="flex-1 mr-2">
                                <Text className="text-xs text-gray-200">Full Name</Text>
                                <TextInput className="border border-gray-400 text-gray-500 rounded-md p-3 mt-1 h-12 bg-white" />
                            </View>

                            <View className="flex-1 ml-2">
                                <Text className="text-xs text-gray-200">Phone number</Text>
                                <TextInput
                                    className="border border-gray-400 rounded-md text-gray-500 p-3 mt-1 h-12 bg-white"
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                        <Text className="text-xs text-gray-200 mt-4">Email Address</Text>
                        <TextInput className="border border-gray-400 rounded-md text-gray-500 p-3 mt-1 bg-white" keyboardType="email-address" />

                        <Text className="text-xs text-gray-200 mt-4">Password</Text>
                        <TextInput className="border border-gray-400 rounded-md text-gray-500 p-3 mt-1 bg-white" secureTextEntry />

                        <Text className="text-xs text-gray-200 mt-4">Confirm Password</Text>
                        <TextInput className="border border-gray-400 rounded-md text-gray-500 p-3 mt-1 bg-white" secureTextEntry />

                        <Text className="text-[10px] text-gray-200 mt-2">
                            The password must be at least 8 characters long
                        </Text>

                        <TouchableOpacity className="bg-gray-200 py-4 rounded-md mt-6">
                            <Text className="text-center font-semibold text-gray-500 text-base">CONTINUE</Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-center mt-4">
                            <Text className="text-sm font-bold text-gray-200">Already have an account?</Text>
                            <TouchableOpacity onPress={() => router.push("/sign-in")}>
                                <Text className="text-sm text-gray-500 font-semibold ml-2">Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}
export default SignUp
