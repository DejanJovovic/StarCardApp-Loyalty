import {Tabs} from "expo-router";
import {ImageBackground, Image, Text, View} from "react-native";

import icons from "@/constants/icons";
import colors from "@/constants/colors";

function TabIcon({ focused, icon, title, isCenter = false }: any) {
    if (isCenter) {
        return (
            <View
                className="justify-center items-center"
                style={{
                    marginTop: -30, // Pull it above the tab bar
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: 'white',
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.15,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 3 },
                }}
            >
                <Image source={icon} tintColor={focused ? colors.primary : colors.secondary} className="size-6" />
            </View>
        );
    }

    if (focused) {
        return (
            <ImageBackground
                className="flex flex-column justify-center items-center mt-4 overflow-hidden rounded-2xl"
                style={{
                    width: 90,
                    height: 56,
                    backgroundColor: '#E8E8EAF2',
                }}
            >
                <Image source={icon} tintColor="black" className="size-6" />
                <Text className="font-semibold text-xs" style={{ color: colors.primary }}>
                    {title}
                </Text>
            </ImageBackground>
        );
    }

    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor={colors.secondary} className="size-5" />
        </View>
    );
}

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "white",
                    borderRadius: 20,
                    width: "100%",
                    height: 55,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflow: "visible",
                    borderTopWidth: 0,
                    elevation: 10,
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
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.wallet_new} title="Wallet" isCenter />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.search} title="Search"/>
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