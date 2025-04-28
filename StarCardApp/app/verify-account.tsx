import {View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert, SafeAreaView} from 'react-native'
import React, {useCallback, useState} from 'react'
import {router, useFocusEffect} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import images from "@/constants/images";
import colors from "@/constants/colors";
import CustomHeader from "@/components/CustomHeader";

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
                // should be changed


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
        <SafeAreaView>
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="flex-1">
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 10}}>
                    <CustomHeader/>
                </View>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View className="relative mx-auto w-[92%] overflow-hidden rounded-bl-[70px]">
                        <Image
                            source={images.cellPhonesImage}
                            style={{width: 370, height: 220, marginTop: 76}}
                            resizeMode="cover"
                        />
                    </View>

                    <View className="px-5 mt-7">
                        <Text className="text-start"
                              style={{color: "#000000", fontFamily: "Lexend-Zetta-Bold", fontSize: 19}}>WE MAKE</Text>
                        <Text className="text-start"
                              style={{color: "#000000", fontFamily: "Lexend-Zetta-Bold", fontSize: 19}}>GOOD
                            CONNECTIONS</Text>

                        <Text
                            style={{color: "#0C0C0C", fontFamily: "Lexend-Zetta-Medium", marginTop: 60, fontSize: 14}}>
                            VERIFY YOUR ACCOUNT</Text>
                        <View className="border-b border-[#0C0C0C] w-full mx-auto my-2"/>

                        <View className="mt-5">
                            <Text style={{color: "#000000", fontFamily: "Lexend-Light", fontSize: 11}}>Code</Text>

                            <TextInput
                                className={`border ${codeError ? "border-red-500" : "border-[#A5A5A5]"} rounded-0.5 mt-1`}
                                style={{
                                    fontFamily: "Lexend-Regular",
                                    fontSize: 15,
                                    height: 40,
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                }}
                                keyboardType="phone-pad"
                                value={code}
                                onChangeText={(text) => {
                                    setCode(text);
                                    setCodeError(false);
                                }}
                                returnKeyType="done"/>

                            <TouchableOpacity className="rounded-0.5 mt-7"
                                              style={{
                                                  backgroundColor: "#0C0C0C",
                                                  height: 60,
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                              }}
                                              onPress={handleContinuePress}>
                                <Text className=""
                                      style={{
                                          fontFamily: "Lexend-Zetta-ExtraBold",
                                          color: "#82BCC7",
                                      }}>CONTINUE</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default VerifyAccount
