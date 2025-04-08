import {Tabs} from "expo-router";
import {ImageBackground, Image, Text, View} from "react-native";

import icons from "@/constants/icons";
import images from "@/constants/images";
import colors from "@/constants/colors";

function TabIcon({focused, icon, title}: any) {
    if (focused) {
        return (
            <ImageBackground
                className="flex flex-column bg-[#E8E8EAF2] w-full min-w-[112px] min-h-16 mt-4 justify-center items-center overflow-hidden"
            >
                <Image source={icon} tintColor="black" className="size-6"/>
                <Text className="font-semibold"
                      style={{color: colors.primary}}>
                    {title}
                </Text>
            </ImageBackground>
        );
    }

    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor={colors.secondary} className="size-5"/>
        </View>
    );
}

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "white",
                    borderRadius: 20,
                    width: "100%",
                    height: 56,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflow: "hidden"
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "index",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home"/>
                    ),
                }}
            />

            <Tabs.Screen
                name="scan"
                options={{
                    title: "Scan",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.scan} title="Scan"/>
                    ),
                }}
            />

            <Tabs.Screen
                name="wallet"
                options={{
                    title: "Wallet",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.wallet_new} title="Wallet"/>
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.person} title="Profile"/>
                    ),
                }}
            />
        </Tabs>
    );
}