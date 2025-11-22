import {View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, StatusBar} from 'react-native'
import React, {useCallback, useRef, useState} from 'react'
import {router, useFocusEffect} from "expo-router";
import {SafeAreaView} from 'react-native-safe-area-context';
import images from "@/constants/images";
import icons from "@/constants/icons";
import CustomHeader from "@/components/CustomHeader";
import colors from "@/constants/colors";
import {useAuth} from "@/components/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LinearGradient} from 'expo-linear-gradient';
import {fetchAndSaveMobileId} from "@/types/fetchAndSaveMobileId";
import {OneSignal} from "react-native-onesignal";

const SignIn = () => {

    const {setAuth, email, password} = useAuth();

    const [authToken, setAuthToken] = useState<string | null>(null);


    // username or email login?
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isEmailValid = userEmail.includes("@");

    const passwordInputRef = useRef<TextInput>(null);

    const getOneSignalPlayerId = async (): Promise<string | null> => {
        try {
            const device = await OneSignal.User.getOnesignalId(); // SDK 5+
            console.log("Fetched OneSignal Player ID:", device);
            return device;
        } catch (err) {
            console.warn("Failed to get OneSignal Player ID:", err);
            return null;
        }
    };

    const handleContinuePress = async () => {
        setEmailError(!isEmailValid);

        if (!isEmailValid) {
            Alert.alert("Invalid Input", "Please enter a valid email.");
            return;
        }

        try {
            const oneSignalId = await getOneSignalPlayerId();

            const formData = new URLSearchParams();
            formData.append("email", userEmail);
            formData.append("pass", userPassword);
            formData.append("oneSignalAppId", "d38275c3-a404-4718-9945-4f8654e00025");
            formData.append("oneSignalPlayerId", oneSignalId ?? "");

            console.log("Login payload being sent:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            const response = await fetch('https://starcardapp.com/loyalty/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
                },
                body: formData.toString(),
            });

            const data = await response.json();

            console.log("Response from backend:", data);

            if (response.ok) {
                const userToken = data.jwtoken;

                await AsyncStorage.setItem("auth_token", userToken);
                await AsyncStorage.setItem("email", userEmail);
                await AsyncStorage.setItem("password", userPassword);

                Alert.alert("Success", "Sign in successful.", [
                    {
                        text: "OK",
                        onPress: async () => {
                            setLoading(true);

                            const isValid = await validateToken(userToken);
                            if (isValid) {
                                setAuth(userToken, userEmail, userPassword);
                                setUserEmail(userEmail);
                                setUserPassword(userPassword);

                                const mobileId = await fetchAndSaveMobileId();
                                console.log("Saved mobile id", mobileId);
                                router.replace("/home");
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
            console.error("Error during login:", error);
            Alert.alert("Login failed", "Please enter valid email and password.");
        }
    };

    const validateToken = async (userToken: string) => {
        try {
            const response = await fetch("https://starcardapp.com/loyalty/admin/dashboard", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
                },
            });

            console.log("Token Validation Response:", response.status, userToken);

            if (response.status === 401 || response.status === 403) {
                console.log("Token is invalid or expired.");
                return false; // Token is not valid
            }

            setAuthToken(userToken);
            return response.ok;

        } catch (error) {
            console.error("Token Validation Error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="h-full">
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="h-full">
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000}}>
                    <CustomHeader/>
                </View>
                <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 80}}>

                    <View className="mx-auto w-[100%] overflow-hidden" style={{marginTop: 80}}>
                        <Image
                            source={images.homeNew}
                            className="w-full rounded-bl-[80px]"
                            style={{height: 320}}
                            resizeMode="cover"
                        />
                    </View>
                    <View className="px-6 mt-10">
                        <Text style={{fontFamily: 'Lexend-Zetta-Bold'}}>Welcome</Text>
                        <Text className="mt-1" style={{color: colors.secondary, fontFamily: 'Lexend-Deca-Medium'}}>
                            Sign in to your account
                        </Text>
                    </View>

                    <View>
                        <View className="mt-10 px-6">
                            <TextInput
                                className={`rounded-full w-full bg-white ${emailError ? "border border-red-500" : ""}`}
                                style={{
                                    fontFamily: "Lexend-Regular",
                                    fontSize: 15,
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                    color: "#000000",
                                    height: 60
                                }}
                                keyboardType="email-address"
                                placeholder="Email"
                                placeholderTextColor="#82BCC7"
                                value={userEmail}
                                autoCapitalize="none"
                                onChangeText={(text) => {
                                    setUserEmail(text);
                                    setEmailError(false);
                                }}
                                onSubmitEditing={() => passwordInputRef.current?.focus()}
                                returnKeyType="next"/>
                        </View>

                        <View className="mt-5 px-6">
                            <View style={{position: "relative", justifyContent: "center"}}>
                                <TextInput
                                    className={`rounded-full w-full bg-white pr-12 ${
                                        passwordError ? "border border-red-500" : ""
                                    }`}
                                    style={{
                                        fontFamily: "Lexend-Regular",
                                        fontSize: 15,
                                        paddingHorizontal: 12,
                                        paddingVertical: 8,
                                        color: "#000000",
                                        height: 60,
                                    }}
                                    ref={passwordInputRef}
                                    autoCapitalize="none"
                                    value={userPassword}
                                    secureTextEntry={!isPasswordVisible}
                                    placeholder="Password"
                                    placeholderTextColor="#82BCC7"
                                    onChangeText={(text) => {
                                        setUserPassword(text);
                                        setPasswordError(false);
                                    }}
                                    returnKeyType="done"
                                />

                                {userPassword.length > 0 && (
                                    <TouchableOpacity
                                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                        style={{
                                            position: "absolute",
                                            right: 15,
                                            top: "50%",
                                            transform: [{translateY: -12}],
                                        }}
                                    >
                                        <Image
                                            source={isPasswordVisible ? icons.eyeOpen : icons.eyeClosed}
                                            tintColor={colors.secondary}
                                            style={{width: 24, height: 24}}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <View className="mt-5 px-6">
                            <TouchableOpacity className="rounded-full w-full"
                                              style={{
                                                  backgroundColor: "#000000",
                                                  height: 60,
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                              }}
                                              onPress={handleContinuePress}>
                                <Text style={{
                                    fontFamily: 'Lexend-Deca-Medium',
                                    color: "white",
                                }}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex flex-row justify-start mt-5 px-6">
                        <Text style={{
                            fontFamily: "Lexend-SemiBold",
                            fontSize: 11,
                            color: "#82BCC7"
                        }}>Don't have an account?</Text>
                        <TouchableOpacity className="ml-2"
                                          onPress={() => router.push("/sign-up")}>
                            <Text style={{
                                fontFamily: "Lexend-SemiBold",
                                color: "black",
                                fontSize: 11,
                            }}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 0,
                        right: 0,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: "#82BCC7",
                            fontFamily: "Lexend-Deca-Light"
                        }}>
                            © Copyright 2025 Starcard App.
                        </Text>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default SignIn
