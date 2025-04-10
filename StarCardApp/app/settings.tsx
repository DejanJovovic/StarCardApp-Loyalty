import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    ImageSourcePropType
} from 'react-native'
import React from 'react'
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/colors";
import icons from "@/constants/icons";
import {settings} from "@/constants/data";
import {router} from "expo-router";

interface SettingsItemProp {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    showArrow?: boolean;
}

const SettingsItem = ({
                          icon,
                          title,
                          onPress,
                          showArrow = true,
                      }: SettingsItemProp) => (
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

const Settings = () => {
    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
            <SafeAreaView className="h-full">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="px-7"
                >
                    <View className="flex flex-col">
                        <View className="mt-5">
                            <View className="bg-white rounded-lg pl-4 mb-2">
                                <SettingsItem icon={icons.wallet} title="Payments"/>
                            </View>
                            <View className="bg-white mt-2 rounded-lg pl-4 mb-2">
                                <SettingsItem icon={icons.shield} title="Security"/>
                            </View>
                            <View className="bg-white mt-2 rounded-lg pl-4 mb-2">
                                <SettingsItem icon={icons.language} title="Language"/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}
export default Settings
