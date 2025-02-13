import {View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert} from 'react-native'
import React from 'react'
import icons from "@/constants/icons";
import {settings} from "@/constants/data";
import {router} from "expo-router";

const ProfileScreen = () => {

    interface SettingsItemProp {
        icon: ImageSourcePropType;
        title: string;
        onPress?: () => void;
        textStyle?: string;
        showArrow?: boolean;
    }

    const SettingsItem = ({
                              icon,
                              title,
                              onPress,
                              textStyle,
                              showArrow = true,
                          }: SettingsItemProp) => (
        <TouchableOpacity
            onPress={onPress}
            className="flex flex-row items-center justify-between py-3"
        >
            <View className="flex flex-row items-center gap-3">
                <Image source={icon} className="size-6"/>
                <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
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
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >

                <View className="flex flex-row justify-center mt-5">
                    <View className="flex flex-col items-center relative mt-5">
                        <Image
                            source={require('../assets/images/avatar.png')}
                            className="size-44 relative rounded-full"
                        />
                        <TouchableOpacity className="absolute bottom-11 right-2">
                            <Image source={icons.edit} className="size-9"/>
                        </TouchableOpacity>

                        {/*should be changed to display users real name*/}
                        <Text className="text-2xl font-rubik-bold mt-2">Test</Text>
                    </View>
                </View>

                <View className="flex flex-col mt-10">
                    <SettingsItem icon={icons.card} title="My Cards"/>
                    <SettingsItem icon={icons.wallet} title="Payments"/>
                </View>

                <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
                    {settings.slice(2).map((item, index) => (
                        <SettingsItem key={index} {...item} />
                    ))}
                </View>

                <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
                    <SettingsItem
                        icon={icons.logout}
                        title="Logout"
                        textStyle="text-danger"
                        showArrow={false}
                        onPress={handleLogout}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ProfileScreen
