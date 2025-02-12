import {View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert} from 'react-native'
import React, {useCallback, useState} from 'react'
import {router, useFocusEffect} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";

const SignUp = () => {


    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullNameError, setFullNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const isFullNameValid = fullName.trim().length > 0;
    const isPhoneValid = phone.trim().length > 0;
    const isEmailValid = email.includes("@");
    const isPasswordValid = password.length >= 8;
    const isPasswordSame = password === confirmPassword;

    const handleContinuePress = () => {


        setFullNameError(!isFullNameValid);
        setPhoneError(!isPhoneValid);
        setEmailError(!isEmailValid);
        setPasswordError(!isPasswordValid);
        setConfirmPasswordError(!isPasswordSame);

        if (!isFullNameValid || !isPhoneValid || !isEmailValid || !isPasswordValid || !isPasswordSame) {
            Alert.alert("Invalid Input", "Please fill all the fields correctly.");
            return;
        }

        /*if(!isFullNameValid) {
            Alert.alert("Invalid Full name", "Please enter a valid full name.");
            return;
        }

        if(!isPhoneValid) {
            Alert.alert("Invalid phone number", "Please enter a valid phone number.");
            return;
        }

        if (!isEmailValid) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        if (!isPasswordValid) {
            Alert.alert("Invalid Password", "Password must be at least 8 characters long.");
            return;
        }

        if(!isPasswordSame) {
            Alert.alert("Invalid Password", "Please enter the same password twice.");
            return;
        }*/

        Alert.alert("Success", "Sign up successful.", [
            {
                // code should be sent to the email and then let the user verify it later after signin occurs?
                // Or don't allow the user to sign-in unless the code is verified
                text: "OK",
                onPress: () => router.push("/sign-in"),
            },
        ]);
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                setFullName("");
                setPhone("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setFullNameError(false);
                setPhoneError(false);
                setEmailError(false);
                setPasswordError(false);
                setConfirmPasswordError(false);
            };
        }, [])
    );

    return (
        <LinearGradient colors={["#3E5060", "#B0C4DE"]} className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="relative mx-auto w-[92%] overflow-hidden rounded-bl-[80px] mt-5">
                    <Image
                        source={require('../assets/images/cellphones.jpg')}
                        className="w-full h-56"
                        resizeMode="cover"
                    />
                </View>

                <View className="px-6 py-8">
                    <Text className="text-lg font-semibold text-gray-100 text-start">LOYALTY CARDS</Text>
                    <Text className="text-lg font-semibold text-gray-100 text-start">REVOLUTION</Text>

                    <Text className="text-2xl mt-6 text-gray-100">
                        <Text className="font-bold">CREATE</Text>
                        <Text> AN ACCOUNT</Text>
                    </Text>
                    <View className="border-b border-gray-400 w-full mx-auto my-2"/>

                    <View className="mt-5">
                        <View className="flex-row justify-between">
                            <View className="flex-1 mr-2">
                                <Text className="text-xs text-gray-200">Full Name</Text>
                                <TextInput
                                    className={`border ${fullNameError ? "border-red-500" : "border-gray-400"} text-gray-500 rounded-md p-3 mt-1 h-12 bg-white`}
                                    value={fullName}
                                    onChangeText={(text) => {
                                        setFullName(text);
                                        setFullNameError(false);
                                    }}/>
                            </View>

                            <View className="flex-1 ml-2">
                                <Text className="text-xs text-gray-200">Phone number</Text>
                                <TextInput
                                    className={`border ${phoneError ? "border-red-500" : "border-gray-400"} text-gray-500 rounded-md p-3 mt-1 h-12 bg-white`}
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={(text) => {
                                        setPhone(text);
                                        setPhoneError(false);
                                    }}
                                />
                            </View>
                        </View>

                        <Text className="text-xs text-gray-200 mt-4">Email Address</Text>
                        <TextInput
                            className={`border ${emailError ? "border-red-500" : "border-gray-400"} text-gray-500 rounded-md p-3 mt-1 h-12 bg-white`}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError(false);
                            }}/>

                        <Text className="text-xs text-gray-200 mt-4">Password</Text>
                        <TextInput
                            className={`border ${passwordError ? "border-red-500" : "border-gray-400"} text-gray-500 rounded-md p-3 mt-1 h-12 bg-white`}
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setPasswordError(false);
                            }}/>

                        <Text className="text-xs text-gray-200 mt-4">Confirm Password</Text>
                        <TextInput
                            className={`border ${confirmPasswordError ? "border-red-500" : "border-gray-400"} text-gray-500 rounded-md p-3 mt-1 h-12 bg-white`}
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                setConfirmPasswordError(false);
                            }}/>

                        <Text className="text-[10px] text-gray-200 mt-2">
                            The password must be at least 8 characters long
                        </Text>

                        <TouchableOpacity className="bg-gray-200 py-4 rounded-md mt-6"
                                          onPress={handleContinuePress}>
                            <Text className="text-center font-semibold text-gray-500 text-base">CONTINUE</Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-center mt-4">
                            <Text className="text-sm font-bold text-gray-200">Already have an account?</Text>
                            <TouchableOpacity onPress={() => router.push("/sign-in")}>
                                <Text className="text-sm text-gray-500 font-semibold ml-2">Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}
export default SignUp
