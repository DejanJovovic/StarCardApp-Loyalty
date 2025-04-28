import {View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert, SafeAreaView} from 'react-native'
import React, {useCallback, useState} from 'react'
import {router, useFocusEffect} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import images from "@/constants/images";
import colors from "@/constants/colors";
import CustomHeader from "@/components/CustomHeader";
import icons from "@/constants/icons";

const ResetPassword = () => {

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
        <SafeAreaView>
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="h-full">
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 10}}>
                    <CustomHeader/>
                </View>

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

                    <Text style={{color: "#0C0C0C", fontFamily: "Lexend-Zetta-Medium", marginTop: 60, fontSize: 14}}>
                        RESET YOUR PASSWORD</Text>
                    <View className="border-b border-[#0C0C0C] w-full mx-auto my-2"/>

                    <View className="mt-5">
                        <Text style={{color: "#000000", fontFamily: "Lexend-Light", fontSize: 11}}>Email</Text>

                        <TextInput
                            className={`border ${emailError ? "border-red-500" : "border-[#A5A5A5]"} rounded-0.5 mt-1`}
                            style={{
                                fontFamily: "Lexend-Regular",
                                fontSize: 15,
                                height: 40,
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                            }}
                            keyboardType="email-address"
                            value={email}
                            autoCapitalize="none"
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError(false);
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
                                  }}>RESET PASSWORD</Text>
                        </TouchableOpacity>

                    </View>

                    <View className="flex flex-row justify-end mt-10"
                          style={{paddingBottom: 50}}>
                        <Text style={{
                            fontFamily: "Lexend-SemiBold",
                            fontSize: 11,
                            lineHeight: 9 * 1.2,
                            letterSpacing: 9 * 0.025,
                        }}>Login instead?</Text>
                        <TouchableOpacity className="ml-2"
                                          onPress={() => router.push("/sign-in")}>
                            <Text style={{
                                fontFamily: "Lexend-SemiBold",
                                color: "#82BCC7",
                                fontSize: 11,
                                lineHeight: 9 * 1.2,
                                letterSpacing: 9 * 0.025,
                            }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default ResetPassword
