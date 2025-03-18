import {Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useCallback, useRef, useState} from 'react'
import {router, useFocusEffect} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import images from "@/constants/images";
import colors from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icons from "@/constants/icons";


const SignIn = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isEmailValid = email.includes("@");
    const isPasswordValid = password.length >= 8;

    const passwordInputRef = useRef<TextInput>(null);


    const handleContinuePress = async () => {
        setEmailError(!isEmailValid);
        setPasswordError(!isPasswordValid);

        if (!isEmailValid || !isPasswordValid) {
            Alert.alert("Invalid Input", "Please enter a valid email and password (8+ characters).");
            return;
        }

        try {

            const formData = new URLSearchParams();
            formData.append("email", email);
            formData.append("pass", password);

            const response = await fetch('https://starcardapp.com/loyalty/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': ' Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
                },
                body: formData.toString(),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                const token = data.jwtoken;

                await AsyncStorage.setItem("auth_token", token);
                await AsyncStorage.setItem("email", email);
                await AsyncStorage.setItem("password", password);

                Alert.alert("Success", "Sign in successful.", [
                    {
                        text: "OK",
                        onPress: async () => {

                            // Validate token before navigating to the next screen
                            const isValid = await validateToken(token);

                            if (isValid) {
                                router.push("/home-screen");
                            } else {
                                Alert.alert("Error", "Session expired. Please log in again.");
                            }
                        },
                    },
                ]);
            } else {
                Alert.alert("Error", "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                setEmail("");
                setPassword("");
                setEmailError(false);
                setPasswordError(false);
            };
        }, [])
    );

    // Function that validates the token
    const validateToken = async (token: string) => {
        try {

            const testToken = "test_token";// fake token for testing

            const response = await fetch("https://starcardapp.com/loyalty/admin/dashboard", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
                },
            });

            console.log("Token Validation Response:", response.status, token);

            if (response.status === 401 || response.status === 403) {
                console.log("Token is invalid or expired.");
                return false; // Token is not valid
            }

            // In case the server returns a 200 OK, check the response body for further validation
            // const data = await response.json(); // assuming the server sends JSON data
            // if (data && data.error && data.error === "Invalid token") {
            //     console.log("Server rejected token explicitly:", data.error);
            //     return false;
            // }

            return response.ok; // If response is OK (200), token is valid
        } catch (error) {
            console.error("Token Validation Error:", error);
            return false;
        }
    };


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

                    <Text className="text-2xl mt-6"
                          style={{color: colors.primary}}>
                        <Text className="font-bold">SIGN IN</Text>
                        <Text> TO YOUR ACCOUNT</Text>
                    </Text>
                    <View className="border-b border-[#74747EF3] w-full mx-auto my-2"/>

                    <View className="mt-5">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-sm"
                                  style={{color: colors.primary}}>Email Address</Text>
                            <TouchableOpacity
                                onPress={() => router.push('/verify-account')}
                            >
                                <Text className="text-sm font-bold"
                                      style={{color: colors.secondary}}>Account Verification</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            className={`border ${emailError ? "border-red-500" : "border-[#74747EF3]"} text-black rounded-md p-3 mt-1 h-12 bg-white`}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError(false);
                            }}
                            onSubmitEditing={() => passwordInputRef.current?.focus()} // Move to the next input
                            returnKeyType="next"
                        />

                        <View className="flex-row justify-between items-center mt-4">
                            <Text className="text-sm"
                                  style={{color: colors.primary}}>Password</Text>
                            <TouchableOpacity onPress={() => router.push('/new-password')}>
                                <Text className="text-sm font-bold"
                                      style={{color: colors.secondary}}>Forgot your password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="relative">
                            <TextInput
                                className={`border ${passwordError ? "border-red-500" : "border-[#74747EF3]"} text-black rounded-md p-3 mt-1 h-12 bg-white`}
                                secureTextEntry={!isPasswordVisible}
                                ref={passwordInputRef}
                                autoCapitalize="none"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError(false);
                                }}
                                returnKeyType="done"
                            />
                            <TouchableOpacity
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                className="absolute right-4 top-[50%] transform -translate-y-1/2"
                            >
                                <Image
                                    source={isPasswordVisible ? icons.eyeOpen : icons.eyeClosed}
                                    style={{width: 24, height: 24}}
                                />
                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity className="bg-white py-4 rounded-md mt-6"
                                          onPress={handleContinuePress}>
                            <Text className="text-center font-semibold text-base"
                                  style={{color: colors.secondary}}>CONTINUE</Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-end mt-4">
                            <Text className="text-lg font-semibold"
                                  style={{color: colors.primary}}>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => router.push('/sign-up')}>
                                <Text className="text-lg ml-2"
                                      style={{color: colors.secondary}}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </LinearGradient>
    )
}
export default SignIn
