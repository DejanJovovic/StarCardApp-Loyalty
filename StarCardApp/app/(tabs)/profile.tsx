import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageSourcePropType,
    Alert,
    TextInput, ActivityIndicator
} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import icons from "@/constants/icons";
import {router} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/colors";
import {useAuth} from "@/components/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import images from "@/constants/images";

const Profile = () => {

    const {setAuth, email, password} = useAuth();
    const {logout} = useAuth();

    const [authToken, setAuthToken] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isEmailVisible, setIsEmailVisible] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    const isEmailValid = userEmail.includes("@");
    const isPasswordValid = userEmail.length >= 8;

    const passwordInputRef = useRef<TextInput>(null);

    interface ProfileItemProp {
        icon: ImageSourcePropType;
        title: string;
        onPress?: () => void;
        showArrow?: boolean;
    }

    const ProfileItem = ({
                             icon,
                             title,
                             onPress,
                             showArrow = true,
                         }: ProfileItemProp) => (
        <TouchableOpacity
            onPress={onPress}
            className="flex flex-row items-center justify-between py-3"
        >
            <View className="flex flex-row items-center gap-3">
                <Image source={icon} className="size-6"/>
                <Text className="text-lg text-black-300">
                    {title}
                </Text>
            </View>

            {showArrow && <Image source={icons.rightArrow} className="size-5"/>}
        </TouchableOpacity>
    );

    const handleLogout = () => {
        Alert.alert(
            "",
            "Are you sure you want to log out?",
            [
                {text: "No", style: "cancel"},
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            logout();

                            const token = await AsyncStorage.getItem("auth_token"); // check if it's null
                            console.log("Token after deletion:", token); // should be null if the token is successfully deleted

                            setAuthToken(null);
                            setUserEmail("");
                            setUserPassword("");

                            router.replace("/profile");
                        } catch (error) {
                            console.log("Logout error: ", error)
                        }
                    }
                }
            ]
        );
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem("auth_token");
            setAuthToken(token);

            if (token) {
                const isValid = await validateToken(token);
                if (!isValid) {
                    await AsyncStorage.removeItem("auth_token");
                    setAuthToken(null);
                }
            }
        };

        checkAuth();
    }, []);

    const handleContinuePress = async () => {
        setEmailError(!isEmailValid);
        setPasswordError(!isPasswordValid);

        if (!isEmailValid || !isPasswordValid) {
            Alert.alert("Invalid Input", "Please enter a valid email and password (8+ characters).");
            return;
        }

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
                                router.replace("/profile");
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


    if (!authToken) {
        return (
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="flex-1">
                <ScrollView contentContainerStyle={{flexGrow: 1}}>

                    {/*should be more visible on the screen*/}
                    {loading && (
                        <View className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                            <ActivityIndicator size="large" color={colors.secondary}/>
                        </View>
                    )}

                    <View className="relative mx-auto w-[92%] overflow-hidden rounded-bl-[80px] mt-5">
                        <Image
                            source={images.cellPhonesImage}
                            className="w-full h-56"
                            resizeMode="cover"/>
                    </View>

                    <View className="px-6">
                        <Text className="text-2xl mt-6"
                              style={{color: colors.primary}}>
                            <Text className="font-bold">SIGN IN</Text>
                            <Text> TO YOUR ACCOUNT</Text>
                        </Text>
                        <Text className="mt-2 text-sm text-gray-600">If you have already registered for the application,
                            please sign in.</Text>
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
                                value={userEmail}
                                onChangeText={(text) => {
                                    setUserEmail(text);
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
                                    value={userPassword}
                                    onChangeText={(text) => {
                                        setUserPassword(text);
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


                            <TouchableOpacity className="bg-[#92C4CE] py-4 rounded-md mt-6"
                                              onPress={handleContinuePress}>
                                <Text className="text-center font-semibold text-base text-white">CONTINUE</Text>
                            </TouchableOpacity>


                        </View>
                    </View>

                    <View className="bg-white mt-5 px-6 h-full">
                        <Text className="text-sm text-gray-600 mt-4">Don't have an account for this mobile
                            application?</Text>

                        <TouchableOpacity className="bg-white border border-[#92C4CE] py-4 rounded-md mt-6"
                                          onPress={() => {
                                              router.push('/sign-up')
                                          }}>
                            <Text className="text-center font-bold text-base"
                                  style={{color: colors.primary}}>SIGN UP</Text>
                        </TouchableOpacity>

                        <Text className="text-sm text-gray-600 mt-4">
                            If you had a problem while trying to sign up, please
                            <TouchableOpacity onPress={() => router.push('/support')}>
                                <Text className="text-sm font-semibold mt-4"
                                      style={{color: colors.secondary}}>contact us</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>

                </ScrollView>
            </LinearGradient>
        )
    }
    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
            <SafeAreaView className="h-full">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="pb-32 px-7"
                >

                    <View className="justify-center items-center mt-5">
                        {/*should be changed to display users real name {username}*/}
                        <Text className="text-3xl mt-2">Test username</Text>
                    </View>

                    <View className="flex flex-col mt-4 border-t pt-5 border-primary-200">
                        <View className="mt-10">
                            <Text className="text-sm"
                                  style={{color: colors.primary}}>Email Address</Text>
                            <TextInput
                                value={email ?? ""}
                                editable={false}
                                secureTextEntry={!isEmailVisible}
                                selectTextOnFocus={false}
                                className="border border-[#74747EF3] text-black rounded-md p-3 mt-1 h-12 bg-white"
                            />

                            <TouchableOpacity
                                onPress={() => setIsEmailVisible(!isEmailVisible)}
                                className="absolute right-4 top-[19%] transform -translate-y-1/2"
                            >
                                <Image
                                    source={isEmailVisible ? icons.eyeOpen : icons.eyeClosed}
                                    style={{width: 24, height: 24}}
                                />
                            </TouchableOpacity>

                            <Text className="text-sm mt-5"
                                  style={{color: colors.primary}}>Password</Text>

                            <TextInput
                                value={password ?? ""}
                                editable={false}
                                selectTextOnFocus={false}
                                secureTextEntry={!isPasswordVisible}
                                className="border border-[#74747EF3] text-black rounded-md p-3 mt-1 h-12 bg-white pr-10"
                            />

                            <TouchableOpacity
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                className="absolute right-4 top-[54%] transform -translate-y-1/2"
                            >
                                <Image
                                    source={isPasswordVisible ? icons.eyeOpen : icons.eyeClosed}
                                    style={{width: 24, height: 24}}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity className="py-4 rounded-md mt-10 bg-[#92C4CE]"
                            >
                                <Text className="text-center font-semibold text-white"
                                    /*should change onPress to go to the change credentials screen*/
                                      onPress={() => {
                                      }}>CHANGE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex flex-col border-t mt-10 pt-5 border-primary-200">
                        <View className="mt-5">
                            <View className="bg-white">
                                <ProfileItem icon={icons.card} title="My Cards"/>
                            </View>
                            <View className="bg-white mt-2">
                                <ProfileItem icon={icons.bell} title="Notifications"/>
                            </View>
                            <View className="bg-white mt-2">
                                <ProfileItem icon={icons.people} title="Invite Friends"/>
                            </View>
                            <View className="bg-white mt-2">
                                <ProfileItem icon={icons.info} title="Support" onPress={() => router.push('/support')}/>
                            </View>
                            <View className="bg-white mt-2">
                                <ProfileItem
                                    icon={icons.logout}
                                    title="Logout"
                                    onPress={handleLogout}
                                />
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}
export default Profile
