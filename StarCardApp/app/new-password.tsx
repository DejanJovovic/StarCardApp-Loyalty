import {View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import React, {useCallback, useState} from 'react'
import {router, useFocusEffect} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";

const NewPassword = () => {

    const [email, setEmail] = useState("");
    const dummyEmail = "test@gmail.com";

    const [emailError, setEmailError] = useState(false);
    const isEmailValid = email.includes("@");

    const handleContinuePress = () => {

        setEmailError(!isEmailValid);

        if(!isEmailValid) {
            Alert.alert("Invalid email", "Please enter a valid email address.")
            return;
        }

        if(email !== dummyEmail){
            Alert.alert("Invalid email", "Please check your email address.")
            return;
        }

        Alert.alert("Success", "Code successfully sent to your email.", [
            {
                text: "OK",
                // should be changed to navigate to change-password screen
                onPress: () => router.push("/sign-in"),
            },
        ]);
    }

    useFocusEffect(
        useCallback(() => {
            return () => {
                setEmail("");
                setEmailError(false);
            };
        }, [])
    );

    return (
        <LinearGradient colors={["#3E5060", "#B0C4DE"]} className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1}}>

                <View className="relative mx-auto w-[92%] overflow-hidden rounded-bl-[80px] mt-5">
                    <Image
                        source={require('../assets/images/cellphones.jpg')}
                        className=" w-full h-56"
                        resizeMode="cover"
                    />
                </View>

                <View className=" px-6 py-8">
                    <Text className=" text-lg font-semibold text-gray-100 text-start">LOYALTY CARDS</Text>
                    <Text className=" text-lg font-semibold text-gray-100 text-start">REVOLUTION</Text>

                    <Text className=" text-2xl mt-10 text-gray-100">
                        <Text className=" font-bold">NEW</Text>
                        <Text> PASSWORD</Text>
                    </Text>
                    <View className=" border-b border-gray-400 w-full mx-auto my-2"/>

                    <View className=" mt-5">
                        <Text className=" text-xs text-gray-200 mt-4">Email address</Text>
                        <TextInput
                            className={`border ${emailError ? "border-red-500" : "border-gray-400"} text-gray-500 rounded-md p-3 mt-1 h-12 bg-white`}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError(false);
                            }}
                        />
                        <Text
                            className=" text-[10px] text-gray-200 mt-2">If you don't have your account password, send a
                            request for a new one</Text>

                        <TouchableOpacity className="bg-gray-200 py-4 rounded-md mt-6"
                                            onPress={handleContinuePress}>
                            <Text className="text-center font-semibold text-gray-500 text-base">CONTINUE</Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-end mt-4">
                            <Text className="text-sm font-bold text-gray-200">Already have an account?</Text>
                            <TouchableOpacity onPress={() => router.push('/sign-in')}>
                                <Text className="text-sm text-gray-500 font-semibold ml-2">Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </LinearGradient>

    )
}
export default NewPassword
