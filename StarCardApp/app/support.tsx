import {View, Text, ScrollView, TextInput, TouchableOpacity, Image, Alert} from 'react-native'
import React, {useCallback, useRef, useState} from 'react'
import colors from "@/constants/colors";
import {LinearGradient} from "expo-linear-gradient";
import images from "@/constants/images";
import CustomHeader from "@/components/CustomHeader";
import {router, useFocusEffect} from "expo-router";

const Support = () => {

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [question, setQuestion] = useState("");

    const [fullNameError, setFullNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [questionError, setQuestionError] = useState(false);

    const isFullNameValid = fullName.trim().length > 2;
    const isPhoneValid = phone.trim().length > 8;
    const isEmailValid = email.includes("@");
    const isQuestionValid = question.trim().length > 10;

    const phoneInputRef = useRef<TextInput>(null);
    const emailInputRef = useRef<TextInput>(null);
    const questionInputRef = useRef<TextInput>(null);


    const handleSend = () => {

        setFullNameError(!isFullNameValid);
        setPhoneError(!isPhoneValid);
        setEmailError(!isEmailValid);
        setQuestionError(!isQuestionValid);

        if (!isFullNameValid || !isPhoneValid || !isEmailValid || !isQuestionValid) {
            Alert.alert("Invalid Input", "Please fill all the fields correctly.");
            return;
        }

        Alert.alert("Success", "We will reach out to you shortly.", [
            {
                // should be sent to email
                text: "OK",
                onPress: () => router.replace("/support"),
            },
        ]);
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                setFullName("");
                setPhone("");
                setEmail("");
                setQuestion("");
                setFullNameError(false);
                setPhoneError(false);
                setEmailError(false);
                setQuestionError(false);
            };
        }, [])
    );


    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
            <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 10}}>
                <CustomHeader/>
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1,}} className="px-5 pb-15"
                        style={{marginTop: 80}}>
                <View className="flex flex-col mt-10 items-center justify-center">
                    <Text style={{color: "#82BCC7", fontFamily: "Lexend-Zetta-Bold", fontSize: 19}}>SUPPORT</Text>
                    <Text className="mt-3"
                          style={{
                              fontFamily: "Lexend-Light",
                              fontSize: 14,
                          }}>Fill out the form below and we will get back to you
                        asap.</Text>
                </View>

                <View className="flex-row justify-between mt-10">
                    <View className="flex-1 mr-2">
                        <Text style={{
                            color: "#000000", fontFamily: "Lexend-Light", fontSize: 11
                        }}>Full Name</Text>
                        <TextInput
                            className={`border ${fullNameError ? "border-red-500" : "border-[#A5A5A5]"} rounded-0.5 mt-1`}
                            style={{
                                fontFamily: "Lexend-Regular",
                                fontSize: 15,
                                width: 180,
                                height: 40,
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                            }}
                            value={fullName}
                            autoCapitalize="words"
                            onChangeText={(text) => {
                                setFullName(text);
                                setFullNameError(false);
                            }}
                            onSubmitEditing={() => phoneInputRef.current?.focus()} // Move to the next input
                            returnKeyType="next"/>
                    </View>

                    <View className="flex-1 ml-2">
                        <Text style={{
                            color: "#000000", fontFamily: "Lexend-Light", fontSize: 11
                        }}>Phone</Text>
                        <TextInput
                            className={`border ${phoneError ? "border-red-500" : "border-[#A5A5A5]"} rounded-0.5 mt-1`}
                            style={{
                                fontFamily: "Lexend-Regular",
                                fontSize: 15,
                                width: 180,
                                height: 40,
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                            }}
                            ref={phoneInputRef}
                            value={phone}
                            keyboardType="phone-pad"
                            onChangeText={(text) => {
                                setPhone(text);
                                setPhoneError(false);
                            }}
                            onSubmitEditing={() => emailInputRef.current?.focus()} // Move to the next input
                            returnKeyType="next"/>
                    </View>
                </View>

                <Text style={{
                    color: "#000000", fontFamily: "Lexend-Light", fontSize: 11, marginTop:10
                }}>Email</Text>
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
                    ref={emailInputRef}
                    value={email}
                    keyboardType="email-address"
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailError(false);
                    }}
                    onSubmitEditing={() => questionInputRef.current?.focus()} // Move to the next input
                    returnKeyType="next"/>

                <Text style={{
                    color: "#000000", fontFamily: "Lexend-Light", fontSize: 11, marginTop: 10
                }}>Question</Text>
                <TextInput
                    className={`border ${questionError ? "border-red-500" : "border-[#A5A5A5]"} rounded-0.5 mt-1`}
                    style={{
                        fontFamily: "Lexend-Regular",
                        fontSize: 15,
                        width: 375,
                        height: 120,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                    }}
                    ref={questionInputRef}
                    value={question}
                    autoCapitalize="sentences"
                    onChangeText={(text) => {
                        setQuestion(text);
                        setQuestionError(false);
                    }}
                    returnKeyType="done"/>

                <TouchableOpacity className="rounded-0.5 mt-7"
                                  style={{
                                      backgroundColor: "#0C0C0C",
                                      width: 375,
                                      height: 60,
                                      justifyContent: "center",
                                      alignItems: "center",
                                  }}
                                  onPress={handleSend}>
                    <Text style={{
                              fontFamily: "Lexend-Zetta-ExtraBold",
                              color: "#82BCC7",
                          }}>SEND</Text>
                </TouchableOpacity>

                <View className="mt-10 w-full">
                    <Image
                        source={images.contactMapImage}
                        resizeMode="cover"
                        className="w-full h-[200px]"
                    />
                </View>

                <View className="flex-row mt-10 mb-10">
                    <TouchableOpacity>
                        <Image
                            source={images.logo}
                            style={{width: 120, height: 40, resizeMode: "contain", marginRight: 10}}
                        />
                    </TouchableOpacity>

                    <View className="flex-col ml-2">
                        <Text style={{
                            color: "#000000", fontFamily: "Lexend-Light", fontSize: 11
                        }}>For all information</Text>
                        <Text style={{
                            color: "#000000", fontFamily: "Lexend-Light", fontSize: 11
                        }}>you can contact</Text>
                        <Text style={{
                            color: "#000000", fontFamily: "Lexend-Light", fontSize: 11
                        }}>us at our offices in</Text>
                        <Text style={{
                            color: "#000000", fontFamily: "Lexend-Light", fontSize: 11
                        }}>Belgrade (Serbia) and</Text>
                        <Text style={{
                            color: "#000000", fontFamily: "Lexend-Light", fontSize: 11
                        }}>Dubai (UAE)</Text>
                        {/*can we clickable to open mail app???*/}
                        <Text style={{
                            color: "#000000", fontFamily: "Lexend-SemiBold", fontSize: 11, marginTop: 10
                        }}>office@starcardapp.com</Text>
                    </View>
                    <View className="ml-2 mt-2">
                        <Image
                            source={images.qrCodeTest}
                            style={{width: 75, height: 75, resizeMode: "contain"}}
                        />
                    </View>
                </View>


            </ScrollView>
        </LinearGradient>
    )
}
export default Support
