import {View, Text, ScrollView, Image, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import {router} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";

const VerifyAccount = () => {


    return (
        <LinearGradient colors={["#3E5060", "#B0C4DE"]} className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1}}>

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

                    <Text className="text-2xl mt-10 text-gray-100">
                        <Text className="font-bold">VERIFY</Text>
                        <Text> YOUR ACCOUNT</Text>
                    </Text>
                    <View className="border-b border-gray-400 w-full mx-auto my-2"/>

                    <View className="mt-5">
                        <View className="flex-row justify-between">
                            <Text className="text-xs text-gray-200">Code</Text>
                            <TouchableOpacity>
                                <Text className="text-xs font-bold text-gray-200">Forgot your code?</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            className="border border-gray-400 text-gray-500 bg-white rounded-md p-3 mt-1"
                            keyboardType="number-pad"
                            secureTextEntry
                        />

                        <TouchableOpacity className="bg-gray-200 py-4 rounded-md mt-6">
                            <Text className="text-center font-semibold text-gray-500 text-base">CONTINUE</Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-end mt-4">
                            <Text className="text-sm font-bold text-gray-200">Already have an account?</Text>
                            <TouchableOpacity onPress={() => router.push('/sign-in')}>
                                <Text className="text-sm text-gray-500 font-semibold ml-1">Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </LinearGradient>
    )
}
export default VerifyAccount
