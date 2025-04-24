import {View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert} from 'react-native'
import React, {useCallback, useRef, useState} from 'react'
import {router, useFocusEffect} from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import CustomHeader from "@/components/CustomHeader";
import colors from "@/constants/colors";
import { LinearGradient } from 'expo-linear-gradient';

const SignUp = () => {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isFirstNameValid = firstName.trim().length > 2;
    const isLastNameValid = lastName.trim().length > 2;
    const isEmailValid = email.includes("@");
    // checks that the password has at least 8 characters, contains one digit (0-9) and one special character (#?!@$%^&*-)
    const isPasswordValid = /^(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/.test(password);

    const lastNameInputRef = useRef<TextInput>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);


    const handleContinuePress = () => {


        setFirstNameError(!isFirstNameValid);
        setLastNameError(!isLastNameValid);
        setEmailError(!isEmailValid);
        setPasswordError(!isPasswordValid);

        if (!isFirstNameValid || !isLastNameValid  || !isEmailValid || !isPasswordValid ) {
            Alert.alert("Invalid Input", "Please fill all the fields correctly.");
            return;
        }

        Alert.alert("Success", "Sign up successful.", [
            {
                // code should be sent to the email and then let the user verify it later after signin occurs?
                // Or don't allow the user to sign-in unless the code is verified
                text: "OK",
                onPress: () => router.replace("/sign-in"),
            },
        ]);
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setFirstNameError(false);
                setLastNameError(false);
                setEmailError(false);
                setPasswordError(false);
            };
        }, [])
    );

    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
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

                    <Text style={{color: "#0C0C0C", fontFamily: "Lexend-Zetta-Medium", marginTop: 60, fontSize: 14}}>
                        CREATE AN ACCOUNT</Text>
                    <View className="border-b border-[#0C0C0C] w-full mx-auto my-2"/>

                    <View className="mt-5">
                        <View className="flex-row">
                            <View className="flex-1 mr-2">
                                <Text style={{color: "#000000", fontFamily: "Lexend-Light", fontSize: 11}}>First
                                    Name</Text>
                                <TextInput
                                    className={`border ${firstNameError ? "border-red-500" : "border-[#A5A5A5]"} rounded-0.5 mt-1`}
                                    style={{
                                        fontFamily: "Lexend-Regular",
                                        fontSize: 15,
                                        width: 180,
                                        height: 40,
                                        paddingHorizontal: 12,
                                        paddingVertical: 8,
                                    }}
                                    value={firstName}
                                    autoCapitalize="words"
                                    onChangeText={(text) => {
                                        setFirstName(text);
                                        setFirstNameError(false);
                                    }}
                                    onSubmitEditing={() => lastNameInputRef.current?.focus()} // Move to the next input
                                    returnKeyType="next"/>
                            </View>

                            <View className="flex-1 ml-2">
                                <Text style={{color: "#000000", fontFamily: "Lexend-Light", fontSize: 11}}>Last
                                    Name</Text>
                                <TextInput
                                    className={`border ${lastNameError ? "border-red-500" : "border-[#A5A5A5]"} rounded-0.5 mt-1`}
                                    style={{
                                        fontFamily: "Lexend-Regular",
                                        fontSize: 15,
                                        width: 180,
                                        height: 40,
                                        paddingHorizontal: 12,
                                        paddingVertical: 8
                                    }}
                                    value={lastName}
                                    ref={lastNameInputRef}
                                    autoCapitalize="words"
                                    onChangeText={(text) => {
                                        setLastName(text);
                                        setLastNameError(false);
                                    }}
                                    onSubmitEditing={() => emailInputRef.current?.focus()} // Move to the next input
                                    returnKeyType="next"/>
                            </View>
                        </View>

                        <Text className="mt-4"
                              style={{color: "#000000", fontFamily: "Lexend-Light", fontSize: 11}}>Email</Text>

                        <TextInput
                            className={`border ${emailError ? "border-red-500" : "border-[#A5A5A5]"} rounded-0.5 mt-1`}
                            style={{
                                fontFamily: "Lexend-Regular",
                                fontSize: 15,
                                width: 375,
                                height: 40,
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                            }}
                            keyboardType="email-address"
                            ref={emailInputRef}
                            value={email}
                            autoCapitalize="none"
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError(false);
                            }}
                            onSubmitEditing={() => passwordInputRef.current?.focus()} // Move to the next input
                            returnKeyType="next"/>

                        <Text className="mt-4"
                              style={{color: "#000000", fontFamily: "Lexend-Light", fontSize: 11}}>Password</Text>

                        <View className="relative">
                            <TextInput
                                className={`border ${passwordError ? "border-red-500" : "border-[#A5A5A5]"} rounded-0.5 mt-1`}
                                style={{
                                    fontFamily: "Lexend-Regular",
                                    fontSize: 15,
                                    width: 375,
                                    height: 40,
                                    paddingHorizontal: 12,
                                    paddingVertical: 8
                                }}
                                secureTextEntry={!isPasswordVisible}
                                ref={passwordInputRef}
                                autoCapitalize="none"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError(false);
                                }}
                                returnKeyType="done"/>

                            <TouchableOpacity
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                className="absolute right-4 top-[50%] transform -translate-y-1/2"
                            >
                                <Image
                                    source={isPasswordVisible ? icons.eyeOpen : icons.eyeClosed}
                                    tintColor="#A5A5A5"
                                    style={{width: 24, height: 24}}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text className="mt-4"
                              style={{
                                  fontFamily: "Lexend-Light",
                                  fontSize: 9,
                                  width: 272,
                                  height: 40,
                                  lineHeight: 9 * 1.2,
                                  letterSpacing: 9 * 0.025,
                              }}>
                            The password must be at least 8 characters long and contain
                            one digit (0-9) and one special character (#?!@$%^&*-)
                        </Text>


                        <TouchableOpacity className="rounded-0.5 mt-7"
                                          style={{
                                              backgroundColor: "#0C0C0C",
                                              width: 375,
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

                    <View className="flex flex-row justify-end mt-10"
                    style={{paddingBottom: 50}}>
                        <Text style={{
                            fontFamily: "Lexend-SemiBold",
                            fontSize: 11,
                            lineHeight: 9 * 1.2,
                            letterSpacing: 9 * 0.025,
                        }}>Already have an account?</Text>
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
            </ScrollView>
        </LinearGradient>
    )
}
export default SignUp
