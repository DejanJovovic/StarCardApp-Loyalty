import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Alert,
    StatusBar,
    Platform,
    Modal,
    Pressable
} from 'react-native'
import React, {useCallback, useRef, useState} from 'react'
import {router, useFocusEffect} from "expo-router";
import {SafeAreaView} from 'react-native-safe-area-context';
import images from "@/constants/images";
import icons from "@/constants/icons";
import CustomHeader from "@/components/CustomHeader";
import colors from "@/constants/colors";
import {LinearGradient} from 'expo-linear-gradient';
import DateTimePicker from "@react-native-community/datetimepicker";


const SignUp = () => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [date, setDate] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [acceptTerms, setAcceptedTerms] = useState(false);

    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [dateError, setDateError] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const isNameValid = name.trim().length > 2;
    const isEmailValid = email.includes("@");
    // checks that the password has at least 8 characters, contains one digit (0-9) and one special character (#?!@$%^&*-)
    const isPasswordValid = /^(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/.test(password);
    const isConfirmPasswordValid = /^(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/.test(password);
    const isDateValid = date.trim().length > 2;

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);
    const phoneInputRef = useRef<TextInput>(null);
    const locationInputRef = useRef<TextInput>(null);

    const handleContinuePress = () => {

        setNameError(!isNameValid);
        setEmailError(!isEmailValid);
        setPasswordError(!isPasswordValid);
        setConfirmPasswordError(!isConfirmPasswordValid);
        setDateError(!isDateValid);

        if (!isNameValid) {
            Alert.alert("Invalid Input", "Please check your name.");
            return;
        }
        if (!isEmailValid) {
            Alert.alert("Invalid Input", "Please check your email adress.");
            return;
        }
        if (!isPasswordValid) {
            Alert.alert("Invalid Input", "Please check that your password has at least 8 characters(one digit and one special character)");
            return;
        }

        if (!isConfirmPasswordValid) {
            Alert.alert("Invalid Input", "Please check your confirm password.");
        }

        if (password !== confirmPassword) {
            Alert.alert("Invalid Input", "Please make sure that your passwords match.");
        }
        if (!isDateValid) {
            Alert.alert("Invalid Input", "Please set your date of birth.");
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

    const handleDateChange = (event: any, chosenDate?: Date) => {
        setShowPicker(Platform.OS === "ios"); // keep picker open on iOS
        if (chosenDate) {
            setSelectedDate(chosenDate);
            const formatted = chosenDate.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
            setDate(formatted);
            setDateError(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setDate("");
                setPhone("");
                setLocation("");
                setNameError(false);
                setEmailError(false);
                setPasswordError(false);
                setConfirmPasswordError(false);
                setDateError(false);
            };
        }, [])
    );

    return (
        <SafeAreaView className="h-full">
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="h-full">
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000}}>
                    <CustomHeader/>
                </View>
                <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 80}}>

                    <View className="px-6" style={{marginTop: 100}}>
                        <Text style={{fontFamily: 'Lexend-Zetta-Bold'}}>Create your account</Text>
                        <Text className="mt-1" style={{color: colors.secondary, fontFamily: 'Lexend-Deca-Medium'}}>
                            Manage your personal data
                        </Text>
                    </View>

                    <View className="mt-10 px-6">
                        <TextInput
                            className={`rounded-full w-full bg-white ${nameError ? "border border-red-500" : ""}`}
                            style={{
                                fontFamily: "Lexend-Regular",
                                fontSize: 15,
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                color: "#000000",
                                height: 60
                            }}
                            placeholder="* Name"
                            placeholderTextColor="#82BCC7"
                            value={name}
                            autoCapitalize="words"
                            onChangeText={(text) => {
                                setName(text);
                                setNameError(false);
                            }}
                            onSubmitEditing={() => emailInputRef.current?.focus()} // Move to the next input
                            returnKeyType="next"/>
                    </View>

                    <View className="mt-5 px-6">
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
                            ref={emailInputRef}
                            autoCapitalize="none"
                            value={email}
                            keyboardType="email-address"
                            placeholder="* Email"
                            placeholderTextColor="#82BCC7"
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError(false);
                            }}
                            onSubmitEditing={() => passwordInputRef.current?.focus()} // Move to the next input
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
                                value={password}
                                secureTextEntry={!isPasswordVisible}
                                placeholder="* Password"
                                placeholderTextColor="#82BCC7"
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError(false);
                                }}
                                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                                returnKeyType="next"
                            />

                            {password.length > 0 && (
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
                        <View style={{position: "relative", justifyContent: "center"}}>
                            <TextInput
                                className={`rounded-full w-full bg-white ${confirmPasswordError ? "border border-red-500" : ""}`}
                                style={{
                                    fontFamily: "Lexend-Regular",
                                    fontSize: 15,
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                    color: "#000000",
                                    height: 60
                                }}
                                ref={confirmPasswordInputRef}
                                autoCapitalize="none"
                                value={confirmPassword}
                                secureTextEntry={!isConfirmPasswordVisible}
                                placeholder="* Confirm password"
                                placeholderTextColor="#82BCC7"
                                onChangeText={(text) => {
                                    setConfirmPassword(text);
                                    setConfirmPasswordError(false);
                                }}
                                onSubmitEditing={() => phoneInputRef.current?.focus()} // Move to the next input
                                returnKeyType="next"/>

                            {confirmPassword.length > 0 && (
                                <TouchableOpacity
                                    onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                    style={{
                                        position: "absolute",
                                        right: 15,
                                        top: "50%",
                                        transform: [{translateY: -12}],
                                    }}
                                >
                                    <Image
                                        source={isConfirmPasswordVisible ? icons.eyeOpen : icons.eyeClosed}
                                        tintColor={colors.secondary}
                                        style={{width: 24, height: 24}}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>

                    </View>
                    <View className="mt-5 px-6">
                        <View style={{position: "relative", justifyContent: "center"}}>
                            <TextInput
                                className={`rounded-full w-full bg-white pr-12 ${dateError ? "border border-red-500" : ""}`}
                                style={{
                                    fontFamily: "Lexend-Regular",
                                    fontSize: 15,
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                    color: "#000000",
                                    height: 60,
                                }}
                                value={date}
                                placeholder="* Date of birth"
                                placeholderTextColor="#82BCC7"
                                editable={false}
                                pointerEvents="none"
                                onChangeText={(text) => {
                                    setDate(text);
                                    setDateError(false);
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => setShowPicker(true)}
                                style={{
                                    position: "absolute",
                                    right: 15,
                                    padding: 6,
                                }}
                            >
                                <Image
                                    source={icons.datePicker}
                                    style={{width: 25, height: 25, tintColor: "#82BCC7"}}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Android picker */}
                        {showPicker && Platform.OS === "android" && (
                            <DateTimePicker
                                value={selectedDate || new Date()}
                                mode="date"
                                display="default"
                                maximumDate={new Date()}
                                onChange={handleDateChange}
                            />
                        )}

                        {/* iOS modal picker */}
                        {Platform.OS === "ios" && (
                            <Modal visible={showPicker} transparent animationType="slide">
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "flex-end",
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                    }}
                                >
                                    <View style={{backgroundColor: "white", padding: 20}}>
                                        <DateTimePicker
                                            value={selectedDate || new Date()}
                                            mode="date"
                                            display="spinner"
                                            maximumDate={new Date()}
                                            onChange={handleDateChange}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPicker(false)}
                                            className="mt-3 bg-[#82BCC7] p-3 rounded-full"
                                        >
                                            <Text
                                                style={{
                                                    color: "white",
                                                    fontFamily: "Lexend-Regular",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Done
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>
                    <View className="mt-5 px-6">
                        <TextInput
                            className="rounded-full w-full bg-white"
                            style={{
                                fontFamily: "Lexend-Regular",
                                fontSize: 15,
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                color: "#000000",
                                height: 60
                            }}
                            ref={phoneInputRef}
                            value={phone}
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="telephoneNumber"
                            placeholder="Phone number"
                            placeholderTextColor="#82BCC7"
                            onChangeText={(text) => {
                                setPhone(text);
                            }}
                            onSubmitEditing={() => locationInputRef.current?.focus()} // Move to the next input
                            returnKeyType="next"/>

                    </View>
                    <View className="mt-5 px-6">
                        <TextInput
                            className="rounded-full w-full bg-white"
                            style={{
                                fontFamily: "Lexend-Regular",
                                fontSize: 15,
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                color: "#000000",
                                height: 60
                            }}
                            ref={locationInputRef}
                            value={location}
                            placeholder="Location"
                            placeholderTextColor="#82BCC7"
                            onChangeText={(text) => {
                                setLocation(text);
                            }}
                            returnKeyType="done"/>
                    </View>
                    <View className="flex-row items-center mt-5 px-6">
                        <TouchableOpacity
                            onPress={() => setAcceptedTerms(!acceptTerms)}
                            style={{
                                width: 20,
                                height: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                            }}
                        >
                            <Image
                                source={icons.checkForTerms}
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                            />
                            {acceptTerms && (
                                <Image
                                    source={icons.checkedTerms}
                                    style={{
                                        position: "absolute",
                                        width: 12,
                                        height: 12,
                                        tintColor: "#0C0C0C",
                                    }}
                                />
                            )}
                        </TouchableOpacity>
                        <Text
                            style={{
                                marginLeft: 10,
                                marginBottom: 2,
                                color: colors.secondary,
                                fontFamily: "Lexend-Deca-Medium",
                                fontSize: 11,
                            }}
                        >I understand the
                            <Text style={{color: colors.primary}}> terms & policy</Text>
                        </Text>
                    </View>
                    <View className="mt-10 px-6">
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
                            }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex flex-row justify-start mt-5 px-6">
                        <Text style={{
                            fontFamily: "Lexend-SemiBold",
                            fontSize: 11,
                            color: "#82BCC7"
                        }}>Have an account?</Text>
                        <TouchableOpacity className="ml-2"
                                          onPress={() => router.push("/sign-in")}>
                            <Text style={{
                                fontFamily: "Lexend-SemiBold",
                                color: "black",
                                fontSize: 11,
                            }}>SIGN IN</Text>
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
export default SignUp
