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
import CustomHeaderLoggedIn from "@/components/CustomHeaderLoggedIn";

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
    const isPasswordValid = userPassword.length >= 8;

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
                <Image source={icon} tintColor="#92C4CE" className="size-6"/>
                <Text style={{fontFamily: 'Lexend-Deca-Light'}}>
                    {title}
                </Text>
            </View>

            {showArrow && <Image source={icons.rightArrow} tintColor="#92C4CE" className="size-5"/>}
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

                            router.replace("/");
                        } catch (error) {
                            console.log("Logout error: ", error)
                        }
                    }
                }
            ]
        );
    };

    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
            <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 10}}>
                <CustomHeaderLoggedIn/>
            </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="pb-32 px-7"
                >

                    <Text style={{fontFamily: 'Lexend-Zetta-Bold', marginTop: 92}}>Profile</Text>
                    <Text className="mb-4"
                          style={{color: colors.secondary, fontFamily: 'Lexend-Deca-Medium'}}>Manage your personal data</Text>

                    <View className="mt-10">
                        <Text className="text-sm"
                              style={{color: colors.primary, fontFamily: 'Lexend-Deca-Light'}}>Email</Text>
                        <TextInput
                            value={email ?? ""}
                            editable={false}
                            secureTextEntry={!isEmailVisible}
                            selectTextOnFocus={false}
                            className="text-[#92C4CE] rounded-xl p-3 mt-1 bg-white"
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
                              style={{color: colors.primary, fontFamily: 'Lexend-Deca-Light'}}>Password</Text>

                        <TextInput
                            value={password ?? ""}
                            editable={false}
                            selectTextOnFocus={false}
                            secureTextEntry={!isPasswordVisible}
                            className="text-[#92C4CE] rounded-xl p-3 mt-1  bg-white pr-10"
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

                        <TouchableOpacity className="py-4 rounded-xl mt-10 bg-black"
                        >
                            <Text className="text-center text-white"
                                  style={{fontFamily: 'Lexend-Deca-SemiBold'}}
                                /*should change onPress to go to the change credentials screen*/
                                  onPress={() => {
                                  }}>Change</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="mt-10">
                        <View className="bg-white rounded-xl pl-4 mb-2">
                            <ProfileItem icon={icons.card} title="My Cards"/>
                        </View>
                        <View className="bg-white mt-2 rounded-xl pl-4 mb-2">
                            <ProfileItem icon={icons.bell} title="Notifications"/>
                        </View>
                        <View className="bg-white mt-2 rounded-xl pl-4 mb-2">
                            <ProfileItem icon={icons.people} title="Invite Friends"/>
                        </View>
                        <View className="bg-white mt-2 rounded-xl pl-4 mb-2">
                            <ProfileItem icon={icons.info} title="Support" onPress={() => {}}/>
                        </View>
                        <View className="bg-white mt-2 rounded-xl pl-4 mb-2">
                            <ProfileItem
                                icon={icons.logout}
                                title="Logout"
                                onPress={handleLogout}
                            />
                        </View>
                    </View>

                </ScrollView>
        </LinearGradient>
    )
}
export default Profile
