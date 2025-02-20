import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageSourcePropType,
    Alert,
    TextInput
} from 'react-native'
import React, {useState} from 'react'
import icons from "@/constants/icons";
import {profile} from "@/constants/data";
import {router} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/colors";
import {useAuth} from "@/components/AuthContext";

const ProfileScreen = () => {

    const {email, password} = useAuth();
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
                    onPress: () => {
                        // logout logic needs to be implemented, to clear auth state
                        router.push("/sign-in");
                    }
                }
            ]
        );
    };


    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
            <SafeAreaView className="h-full">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="pb-32 px-7"
                >

                    <View className="flex flex-row justify-center mt-5">
                        <View className="flex flex-col items-center relative mt-5">
                            <Image
                                source={icons.avatar}
                                className="size-44 relative rounded-full"
                            />
                            <TouchableOpacity className="absolute bottom-11 right-2">
                                {/*change to allow the user to change his profile picture*/}
                                <Image source={icons.edit} className="size-9"/>
                            </TouchableOpacity>

                            {/*should be changed to display users real name {username}*/}
                            <Text className="text-2xl mt-2">Test</Text>
                        </View>
                    </View>

                    <View className="flex flex-col mt-10">
                        <ProfileItem icon={icons.card} title="My Cards"/>
                        <ProfileItem icon={icons.bell} title="Notifications"/>
                    </View>

                    <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
                        <Text className="text-sm"
                              style={{color: colors.primary}}>Email Address</Text>
                        <TextInput
                            value={email}
                            editable={false}
                            secureTextEntry={!isEmailVisible}
                            selectTextOnFocus={false}
                            className="border border-[#74747EF3] text-black rounded-md p-3 mt-1 h-12 bg-white"
                        />

                        <TouchableOpacity
                            onPress={() => setIsEmailVisible(!isEmailVisible)}
                            className="absolute right-4 top-[21%] transform -translate-y-1/2"
                        >
                            <Image
                                source={isEmailVisible ? icons.eyeOpen : icons.eyeClosed}
                                style={{width: 24, height: 24}}
                            />
                        </TouchableOpacity>

                        <Text className="text-sm mt-5"
                              style={{color: colors.primary}}>Password</Text>

                        <TextInput
                            value={password}
                            editable={false}
                            selectTextOnFocus={false}
                            secureTextEntry={!isPasswordVisible}
                            className="border border-[#74747EF3] text-black rounded-md p-3 mt-1 h-12 bg-white pr-10"
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            className="absolute right-4 top-[48%] transform -translate-y-1/2"
                        >
                            <Image
                                source={isPasswordVisible ? icons.eyeOpen : icons.eyeClosed}
                                style={{width: 24, height: 24}}
                            />
                        </TouchableOpacity>


                        <Text className="text-sm mt-5"
                              style={{color: colors.primary}}>Username</Text>
                        <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            className="border border-[#74747EF3] text-black rounded-md p-3 mt-1 h-12 bg-white"
                        />

                        <TouchableOpacity className="bg-white py-4 rounded-md mt-6"
                        >
                            <Text className="text-center font-semibold text-base"
                                  style={{color: colors.secondary}}
                                  /*should change onPress to go to the change credentials screen*/
                                  onPress={() => {
                                  }}>CHANGE</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
                        <ProfileItem icon={icons.people} title="Invite Friends"/>
                        <ProfileItem icon={icons.info} title="Support" onPress={() => router.push('/support-screen')}/>
                        <ProfileItem
                            icon={icons.logout}
                            title="Logout"
                            showArrow={false}
                            onPress={handleLogout}
                        />

                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}
export default ProfileScreen
