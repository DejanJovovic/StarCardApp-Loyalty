import {View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import React, {useCallback, useState} from 'react'
import {router, useFocusEffect} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import images from "@/constants/images";
import colors from "@/constants/colors";

const VerifyAccount = () => {

    const [code, setCode] = useState("");
    const dummyCode = "1234";

    // should be changed when the code logic is implemented
    const isCodeValid = code === dummyCode;
    const [codeError, setCodeError] = useState(false);


    const handleContinuePress = () => {

        setCodeError(!isCodeValid);

        if (code !== dummyCode) {
            Alert.alert("Invalid code", "Please enter a valid code.")
            return;
        }

        Alert.alert("Success", "Proceed to your account.", [
            {
                text: "OK",
                // should be changed to navigate to profile screen?
                onPress: () => router.push("/home-screen"),
            },
        ]);

    }

    useFocusEffect(
        useCallback(() => {
            return () => {
                setCode("");
                setCodeError(false);
            };
        }, [])
    );

    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1}}>

                <View className="relative mx-auto w-[92%] overflow-hidden rounded-bl-[80px] mt-5">
                    <Image
                        source={images.cellPhonesImage}
                        className="w-full h-56"
                        resizeMode="cover"
                    />
                </View>

                <View className="px-6 py-8">
                    <Text className="text-lg font-semibold text-start"
                          style={{color: colors.primary}}>LOYALTY CARDS</Text>
                    <Text className="text-lg font-semibold text-start"
                          style={{color: colors.primary}}>REVOLUTION</Text>

                    <Text className="text-2xl mt-10"
                          style={{color: colors.primary}}>
                        <Text className="font-bold">VERIFY</Text>
                        <Text> YOUR ACCOUNT</Text>
                    </Text>
                    <View className="border-b border-[#74747EF3] w-full mx-auto my-2"/>

                    <View className="mt-5">
                        <View className="flex-row justify-between">
                            <Text className="text-sm"
                                  style={{color: colors.primary}}>Code</Text>
                            <TouchableOpacity>
                                {/*send the code again to the email?*/}
                                <Text className="text-sm font-bold"
                                      style={{color: colors.secondary}}>Forgot your code?</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            className={`border ${codeError ? "border-red-500" : "border-[#74747EF3]"} text-black rounded-md p-3 mt-1 h-12 bg-white`}
                            keyboardType="number-pad"
                            secureTextEntry
                            value={code}
                            onChangeText={(text) => {
                                setCode(text);
                                setCodeError(false);

                            }}
                        />

                        <TouchableOpacity className="bg-white py-4 rounded-md mt-6"
                                          onPress={handleContinuePress}>
                            <Text className="text-center font-semibold text-base"
                                  style={{color: colors.secondary}}>CONTINUE</Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-end mt-4">
                            <Text className="text-lg font-bold"
                                  style={{color: colors.primary}}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => router.push('/sign-in')}>
                                <Text className="text-lg font-semibold ml-1"
                                      style={{color: colors.secondary}}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </LinearGradient>
    )
}
export default VerifyAccount
