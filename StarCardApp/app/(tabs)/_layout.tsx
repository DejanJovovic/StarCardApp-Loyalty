import {Tabs} from "expo-router";
import icons from "@/constants/icons";
import {View, Image, Text, Animated, TouchableWithoutFeedback, TouchableOpacity, Pressable} from "react-native";
import React, {useEffect, useRef} from "react";

function TabIcon({ focused, icon, title, isCenter = false }: any) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [focused]);

    const size = isCenter ? 70 : 50;
    const marginTop = isCenter ? -10 : 25;

    const circleColor = isCenter
        ? focused
            ? "#000000E5"
            : "#82BCC7"
        : focused
            ? "#000000E5"
            : "white";

    const iconTintColor = isCenter
        ? focused
            ? "white"
            : "white"
        : focused
            ? "white"
            : "#000000E5";

    const borderWidth = isCenter ? 0 : focused ? 0 : 1.5;
    const borderColor = isCenter ? "transparent" : "#82BCC7";

    const textColor = focused ? "#000000E5" : "#82BCC7";

    return (
        <Animated.View
            style={{
                transform: [{ scale: scaleAnim }],
                alignItems: "center",
                marginTop,
            }}
        >
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: circleColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth,
                    borderColor,
                }}
            >
                <Image
                    source={icon}
                    style={{
                        tintColor: iconTintColor,
                        width: 24,
                        height: 24,
                    }}
                />
            </View>

            {!isCenter && (
                <View style={{ width: size, alignItems: "center" }}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            fontSize: 12,
                            marginTop: 2,
                            color: textColor,
                            fontWeight: "600",
                            textAlign: "center",
                        }}
                    >
                        {title}
                    </Text>
                </View>
            )}
        </Animated.View>
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
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 90,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    paddingBottom: 10,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home" />
                    ),
                    tabBarButton: (props) => (
                        <Pressable
                            {...props}
                            android_ripple={{ color: "transparent" }}
                        >
                            {props.children}
                        </Pressable>
                    ),
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    title: 'Scan',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.scan} title="Scan" />
                    ),
                    tabBarButton: (props) => (
                        <Pressable
                            {...props}
                            android_ripple={{ color: "transparent" }}
                        >
                            {props.children}
                        </Pressable>
                    ),
                }}
            />
            <Tabs.Screen
                name="wallet"
                options={{
                    title: 'Wallet',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.wallet_new} title="Wallet" isCenter />
                    ),
                    tabBarButton: (props) => (
                        <Pressable
                            {...props}
                            android_ripple={{ color: "transparent" }}
                        >
                            {props.children}
                        </Pressable>
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.search} title="Search" />
                    ),
                    tabBarButton: (props) => (
                        <Pressable
                            {...props}
                            android_ripple={{ color: "transparent" }}
                        >
                            {props.children}
                        </Pressable>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.person} title="Profile" />
                    ),
                    tabBarButton: (props) => (
                        <Pressable
                            {...props}
                            android_ripple={{ color: "transparent" }}
                        >
                            {props.children}
                        </Pressable>
                    ),
                }}
            />
        </Tabs>
    );
}