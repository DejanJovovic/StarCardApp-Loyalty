import {View, Text, ScrollView, Image, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import {router} from "expo-router";

const NewPassword = () => {
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} className="bg-white">

            <View className="relative">
                <Image
                    source={require('../assets/images/cellphones.jpg')}
                    className="w-full h-56"
                    resizeMode="cover"
                />
            </View>

            <View className="px-6 py-8">
                <Text className="text-lg font-semibold text-gray-700 text-start">LOYALTY CARDS</Text>
                <Text className="text-lg font-semibold text-gray-700 text-start">REVOLUTION</Text>

                <Text className="text-2xl mt-10">
                    <Text className="font-bold">NEW</Text>
                    <Text> PASSWORD</Text>
                </Text>
                <View className="border-b border-gray-300 w-full mx-auto my-2"/>

                <View className="mt-5">
                    <Text className="text-xs text-gray-600 mt-4">Email address</Text>
                    <TextInput
                        className="border border-gray-300 rounded-md p-3 mt-1"
                        keyboardType="email-address"
                    />
                    <Text
                        className="text-[10px] text-gray-500 mt-2">If you don't have your account password, send a
                        request for a new one</Text>

                    <TouchableOpacity className="bg-gray-300 py-4 rounded-md mt-6">
                        <Text className="text-center font-semibold text-gray-400 text-base">CONTINUE</Text>
                    </TouchableOpacity>

                    <View className="flex-row justify-end mt-4">
                        <Text className="text-sm font-bold text-gray-600">Already have an account?</Text>
                        <TouchableOpacity onPress={() => router.push('/sign-in')}>
                            <Text className="text-sm text-blue-500 font-semibold ml-1">Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}
export default NewPassword
