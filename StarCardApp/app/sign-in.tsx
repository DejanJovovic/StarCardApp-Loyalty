import {View, Text, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'

const SignIn = () => {
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
                    <Text className="font-bold">SIGN IN</Text>
                    <Text> TO YOUR ACCOUNT</Text>
                </Text>
                <View className="border-b border-gray-300 w-full mx-auto my-2"/>

                <View className="mt-5">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-xs text-gray-600 mt-4">Email Address</Text>
                        <TouchableOpacity>
                            <Text className="text-xs text-blue-500">Account Verification</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        className="border border-gray-300 rounded-md p-3 mt-1"
                        keyboardType="email-address"
                    />

                    {/* Password Section */}
                    <View className="flex-row justify-between items-center mt-4">
                        <Text className="text-xs text-gray-600">Password</Text>
                        <TouchableOpacity>
                            <Text className="text-xs text-blue-500">Forgot your password?</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        className="border border-gray-300 rounded-md p-3  mt-1"
                        secureTextEntry
                    />


                    <TouchableOpacity className="bg-gray-300 py-4 rounded-md mt-6">
                        <Text className="text-center font-semibold text-gray-400 text-base">CONTINUE</Text>
                    </TouchableOpacity>

                    <View className="flex-row justify-end mt-4">
                        <Text className="text-sm font-bold text-gray-600">Don't have an account?</Text>
                        <TouchableOpacity>
                            <Text className="text-sm text-blue-500 font-semibold ml-1">Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}
export default SignIn
