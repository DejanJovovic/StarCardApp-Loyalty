import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageSourcePropType,
    Alert,
    TextInput, ActivityIndicator, StatusBar
} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import icons from "@/constants/icons";
import {router} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import {SafeAreaView} from 'react-native-safe-area-context';
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

    const [isEmailVisible, setIsEmailVisible] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
                         }: ProfileItemProp) => (
        <TouchableOpacity
            onPress={onPress}
            className="flex flex-row items-center justify-between py-3"
        >
            <View className="flex flex-row items-center gap-4">
                <Image source={icon} tintColor="#92C4CE" className="size-6"/>
                <Text style={{
                    fontFamily: "Lexend-Regular",
                    fontSize: 15,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    color: "#000000",

                }}>
                    {title}
                </Text>
            </View>

            <Image source={icons.rightArrow} tintColor="#92C4CE" className="size-6"/>
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
        <SafeAreaView>
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000}}>
                    <CustomHeaderLoggedIn/>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="pb-32 px-7"
                >

                    <Text style={{fontFamily: 'Lexend-Zetta-Bold', marginTop: 92}}>Profile</Text>
                    <Text className="mb-4"
                          style={{color: colors.secondary, fontFamily: 'Lexend-Deca-Medium'}}>Manage your personal
                        data</Text>

                    <View className="mt-5">
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
                            value={email ?? ""}
                            placeholder="Email"
                            placeholderTextColor="#82BCC7"
                            autoCapitalize="none"
                            editable={false}
                            secureTextEntry={!isEmailVisible}
                            selectTextOnFocus={false}

                        />
                        <TouchableOpacity
                            onPress={() => setIsEmailVisible(!isEmailVisible)}
                            style={{
                                position: "absolute",
                                right: 15,
                                top: "14%",
                                transform: [{translateY: -12}],
                            }}
                        >
                            <Image
                                source={isEmailVisible ? icons.eyeOpen : icons.eyeClosed}
                                tintColor={colors.secondary}
                                style={{width: 24, height: 24}}
                            />
                        </TouchableOpacity>

                        <TextInput
                            className="rounded-full w-full bg-white mt-5"
                            style={{
                                fontFamily: "Lexend-Regular",
                                fontSize: 15,
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                color: "#000000",
                                height: 60,
                            }}
                            value={password ?? ""}
                            placeholder="Password"
                            placeholderTextColor="#82BCC7"
                            editable={false}
                            autoCapitalize="none"
                            selectTextOnFocus={false}
                            secureTextEntry={!isPasswordVisible}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            style={{
                                position: "absolute",
                                right: 15,
                                top: "50%",
                                transform: [{translateY: -12}],
                            }}>
                            <Image
                                source={isPasswordVisible ? icons.eyeOpen : icons.eyeClosed}
                                tintColor={colors.secondary}
                                style={{width: 24, height: 24}}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className="rounded-full w-full mt-5"
                                          style={{
                                              backgroundColor: "#000000",
                                              height: 60,
                                              justifyContent: "center",
                                              alignItems: "center",
                                          }}
                        >
                            <Text style={{
                                fontFamily: 'Lexend-Deca-Medium',
                                color: "white",
                            }}
                                /*should change onPress to go to the change credentials screen*/
                                  onPress={() => {
                                  }}>Change</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="mt-10">
                        <View className="bg-white rounded-full pl-4 mb-2" style={{paddingRight: 15}}>
                            <ProfileItem icon={icons.card} title="My Cards"/>
                        </View>
                        <View className="bg-white mt-2 rounded-full pl-4 mb-2" style={{paddingRight: 15}}>
                            <ProfileItem icon={icons.bell} title="Notifications"/>
                        </View>
                        <View className="bg-white mt-2 rounded-full pl-4 mb-2" style={{paddingRight: 15}}>
                            <ProfileItem icon={icons.people} title="Invite Friends"/>
                        </View>
                        <View className="bg-white rounded-full mt-2 pl-4 mb-2" style={{paddingRight: 15}}>
                            <ProfileItem icon={icons.info} title="Support" onPress={() => {
                            }}/>
                        </View>
                        <View className="bg-white mt-2 rounded-full pl-4 mb-2" style={{paddingRight: 15}}>
                            <ProfileItem
                                icon={icons.logout}
                                title="Logout"
                                onPress={handleLogout}
                            />
                        </View>
                    </View>

                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default Profile
