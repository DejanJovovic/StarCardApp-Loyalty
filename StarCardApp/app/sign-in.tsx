import {View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, SafeAreaView} from 'react-native'
import React, {useCallback, useRef, useState} from 'react'
import {router, useFocusEffect} from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import CustomHeader from "@/components/CustomHeader";
import colors from "@/constants/colors";
import {useAuth} from "@/components/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LinearGradient} from 'expo-linear-gradient';

const SignIn = () => {

    const {setAuth, email, password} = useAuth();

    const [authToken, setAuthToken] = useState<string | null>(null);


    // on figma says username, but i only have email for now
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [staySignedIn, setStaySignedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isEmailValid = userEmail.includes("@");
    // checks that the password has at least 8 characters, contains one digit (0-9) and one special character (#?!@$%^&*-)
    // const isPasswordValid = /^(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/.test(userPassword);

    const passwordInputRef = useRef<TextInput>(null);

    const handleContinuePress = async () => {
        setEmailError(!isEmailValid);
        // setPasswordError(!isPasswordValid);

        if (!isEmailValid) {
            Alert.alert("Invalid Input", "Please enter a valid email.");
            return;
        }
        // if(!isPasswordValid) {
        //     Alert.alert("Invalid Input", "Please enter a password with at least 8 characters, one digit and one special character.");
        //     return;
        // }

        try {

            const formData = new URLSearchParams();
            formData.append("email", userEmail);
            formData.append("pass", userPassword);

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
                const userToken = data.jwtoken;


                await AsyncStorage.setItem("auth_token", userToken);
                await AsyncStorage.setItem("email", userEmail);
                await AsyncStorage.setItem("password", userPassword);

                Alert.alert("Success", "Sign in successful.", [
                    {
                        text: "OK",
                        onPress: async () => {
                            setLoading(true);
                            // Validate token before navigating to the next screen
                            const isValid = await validateToken(userToken);

                            if (isValid) {
                                setAuth(userToken, userEmail, userPassword);
                                setUserEmail(userEmail);
                                setUserPassword(userPassword);
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
            console.error("Error", error);
            Alert.alert("Login failed", "Please enter valid email and password.");
        }
    };

    // Function that validates the token
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

            // In case the server returns a 200 OK, check the response body for further validation
            // const data = await response.json(); // assuming the server sends JSON data
            // if (data && data.error && data.error === "Invalid token") {
            //     console.log("Server rejected token explicitly:", data.error);
            //     return false;
            // }

            setAuthToken(userToken);
            return response.ok;// If response is OK (200), token is valid

        } catch (error) {
            console.error("Token Validation Error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        // trebalo bi ovako dodati svuda h-full da se ne vidi dole rupa ??
        <SafeAreaView className="h-full">
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 10}}>
                    <CustomHeader/>
                </View>

                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View className="mx-auto w-[100%] overflow-hidden">
                        <Image
                            source={images.cellPhonesImage}
                            className="w-full rounded-bl-[80px]"
                            style={{height: 220, marginTop: 61}}
                            resizeMode="cover"
                        />
                    </View>


                    <View className="px-5 mt-7 w-full">
                        <Text className="text-start"
                              style={{color: "#000000", fontFamily: "Lexend-Zetta-Bold", fontSize: 19}}>WE MAKE</Text>
                        <Text className="text-start"
                              style={{color: "#000000", fontFamily: "Lexend-Zetta-Bold", fontSize: 19}}>GOOD
                            CONNECTIONS</Text>

                        <Text style={{color: "#0C0C0C", marginTop: 120}}>
                            <Text style={{fontFamily: "Lexend-Zetta-Medium", fontSize: 14}}>SIGN IN</Text>
                            <Text style={{fontFamily: "Lexend-Zetta-Light", fontSize: 14}}> TO YOUR ACCOUNT</Text>
                        </Text>
                        <View className="border-b border-[#0C0C0C] w-full mx-auto my-2"/>

                        <View className="mt-5">
                            <Text style={{color: "#000000", fontFamily: "Lexend-Light", fontSize: 11}}>Email</Text>

                            <TextInput
                                className={`border ${emailError ? "border-red-500" : "border-[#A5A5A5]"} rounded-0.5 mt-1 w-full`}
                                style={{
                                    fontFamily: "Lexend-Regular",
                                    fontSize: 15,
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                }}
                                keyboardType="email-address"
                                value={userEmail}
                                autoCapitalize="none"
                                onChangeText={(text) => {
                                    setUserEmail(text);
                                    setEmailError(false);
                                }}
                                onSubmitEditing={() => passwordInputRef.current?.focus()} // Move to the next input
                                returnKeyType="next"/>

                            <View className="flex flex-row justify-between mt-4">
                                <Text
                                    style={{color: "#000000", fontFamily: "Lexend-Light", fontSize: 11}}>Password</Text>
                                <TouchableOpacity onPress={() => router.push("/reset-password")}>
                                    <Text style={{
                                        color: "#82BCC7",
                                        fontFamily: "Lexend-SemiBold",
                                        fontSize: 11
                                    }}>Forgot your password?</Text>
                                </TouchableOpacity>

                            </View>

                            <View className="relative">
                                <TextInput
                                    className={`border ${passwordError ? "border-red-500" : "border-[#A5A5A5]"} rounded-0.5 mt-1 w-full`}
                                    style={{
                                        fontFamily: "Lexend-Regular",
                                        fontSize: 15,
                                        paddingHorizontal: 12,
                                        paddingVertical: 8
                                    }}
                                    secureTextEntry={!isPasswordVisible}
                                    ref={passwordInputRef}
                                    autoCapitalize="none"
                                    value={userPassword}
                                    onChangeText={(text) => {
                                        setUserPassword(text);
                                        setPasswordError(false);
                                    }}
                                    returnKeyType="done"/>

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

                            <View className="flex-row items-center mt-5">
                                {/*should be implemented to do something*/}
                                <TouchableOpacity
                                    onPress={() => setStaySignedIn(!staySignedIn)}
                                    style={{position: "relative", width: 24, height: 24}}
                                >
                                    {/* Rectangle box image (border only) */}
                                    <Image
                                        source={images.staySignedInRectangle}
                                        style={{
                                            width: 24,
                                            height: 24,
                                            borderWidth: 1,
                                            borderColor: "#0C0C0C",
                                        }}
                                    />

                                    {/* Inner box, only shown when selected */}
                                    {staySignedIn && (
                                        <Image
                                            source={images.staySignedInBox}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: 24,
                                                height: 24,
                                                tintColor: "#0C0C0C",
                                            }}
                                        />
                                    )}
                                </TouchableOpacity>


                                <Text
                                    style={{
                                        marginLeft: 10,
                                        color: "#000000",
                                        fontFamily: "Lexend-SemiBold",
                                        fontSize: 11,
                                    }}
                                >
                                    Stay signed in
                                </Text>
                            </View>


                            <TouchableOpacity className="rounded-0.5 mt-7 w-full"
                                              style={{
                                                  backgroundColor: "#0C0C0C",
                                                  height: 60,
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                              }}
                                              onPress={handleContinuePress}>
                                <Text style={{
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
                            }}>Don't have an account?</Text>
                            <TouchableOpacity className="ml-2"
                                              onPress={() => router.push("/sign-up")}>
                                <Text style={{
                                    fontFamily: "Lexend-SemiBold",
                                    color: "#82BCC7",
                                    fontSize: 11,
                                    lineHeight: 9 * 1.2,
                                    letterSpacing: 9 * 0.025,
                                }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default SignIn
