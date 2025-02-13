import {View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import React, {useCallback, useState} from 'react'
import {router, useFocusEffect} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import images from "@/constants/images";
import colors from "@/constants/colors";

const NewPassword = () => {

    const [email, setEmail] = useState("");
    const dummyEmail = "test@gmail.com";

    const [emailError, setEmailError] = useState(false);
    const isEmailValid = email.includes("@");

    const handleContinuePress = () => {

        setEmailError(!isEmailValid);

        if (!isEmailValid) {
            Alert.alert("Invalid email", "Please enter a valid email address.")
            return;
        }

        if (email !== dummyEmail) {
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
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1}}>

                <View className="relative mx-auto w-[92%] overflow-hidden rounded-bl-[80px] mt-5">
                    <Image
                        source={images.cellPhonesImage}
                        className=" w-full h-56"
                        resizeMode="cover"
                    />
                </View>

                <View className=" px-6 py-8">
                    <Text className=" text-lg font-semibold text-start"
                          style={{color: colors.primary}}>LOYALTY CARDS</Text>
                    <Text className=" text-lg font-semibold text-start"
                          style={{color: colors.primary}}>REVOLUTION</Text>

                    <Text className=" text-2xl mt-10"
                          style={{color: colors.primary}}>
                        <Text className=" font-bold">NEW</Text>
                        <Text> PASSWORD</Text>
                    </Text>
                    <View className=" border-b border-[#74747EF3] w-full mx-auto my-2"/>

                    <View className=" mt-5">
                        <Text className=" text-sm mt-4"
                              style={{color: colors.primary}}>Email address</Text>
                        <TextInput
                            className={`border ${emailError ? "border-red-500" : "border-[#74747EF3]"} text-[#74747EF3] rounded-md p-3 mt-1 h-12 bg-white`}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError(false);
                            }}
                        />
                        <Text
                            className=" text-[10px] mt-2"
                            style={{color: colors.primary}}>If you don't have your account password, send a
                            request for a new one</Text>

                        <TouchableOpacity className="bg-white py-4 rounded-md mt-6"
                                          onPress={handleContinuePress}>
                            <Text className="text-center font-semibold text-base"
                                  style={{color: colors.secondary}}>CONTINUE</Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-end mt-4">
                            <Text className="text-lg font-bold"
                                  style={{color: colors.primary}}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => router.push('/sign-in')}>
                                <Text className="text-lg font-semibold ml-2"
                                      style={{color: colors.secondary}}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </LinearGradient>

    )
}
export default NewPassword
