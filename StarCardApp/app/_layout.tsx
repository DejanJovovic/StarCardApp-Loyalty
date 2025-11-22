import {enableScreens} from 'react-native-screens';

enableScreens();

import {router, SplashScreen as ExpoSplashScreen, Stack} from 'expo-router';
import "./globals.css";
import {AuthProvider} from "@/components/AuthContext";
import {useFonts} from "expo-font";
import React, {useEffect, useState} from "react";
import SplashScreen from "@/components/SplashScreen";
import {StatusBar} from "react-native";
import {CardProvider} from "@/context/CardContext";
import {useStarCardOneSignal} from "@/hooks/useOneSignalDeepLinks";
import {RouteTarget} from "@/types/routeDeepLink";

export default function RootLayout() {

    const [showCustomSplash, setShowCustomSplash] = useState(true);

    const [fontsLoaded] = useFonts({
        'Lexend-Light': require('../assets/fonts/Lexend-Light.ttf'),
        'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
        'Lexend-SemiBold': require('../assets/fonts/Lexend-SemiBold.ttf'),
        'Lexend-Zetta-Bold': require('../assets/fonts/LexendZetta-Bold.ttf'),
        'Lexend-Zetta-ExtraBold': require('../assets/fonts/LexendZetta-ExtraBold.ttf'),
        'Lexend-Zetta-Regular': require('../assets/fonts/LexendZetta-Regular.ttf'),
        'Lexend-Zetta-Medium': require('../assets/fonts/LexendZetta-Medium.ttf'),
        'Lexend-Zetta-Light': require('../assets/fonts/LexendZetta-Light.ttf'),
        'Lexend-Deca-Bold': require('../assets/fonts/LexendDeca-Bold.ttf'),
        'Lexend-Deca-SemiBold': require('../assets/fonts/LexendDeca-SemiBold.ttf'),
        'Lexend-Deca-Light': require('../assets/fonts/LexendDeca-Light.ttf'),
        'Lexend-Deca-Medium': require('../assets/fonts/LexendDeca-Medium.ttf'),
    });

    // hides splash when openning the notification
    const fastRoute = (to: RouteTarget) => {
        setShowCustomSplash(false);
        try {
            ExpoSplashScreen.hideAsync();
        } catch {}
        requestAnimationFrame(() => router.push(to as any));
    };

    // OneSignal + deep links (Android-only for now)
    useStarCardOneSignal({
        navigate: fastRoute,
        onesignalAppId: "d38275c3-a404-4718-9945-4f8654e00025",
        debug: true, // set false in production
    });



    if (showCustomSplash) {
        return (
            <SplashScreen
                onFinish={() => {
                    setShowCustomSplash(false);
                    ExpoSplashScreen.hideAsync();
                }}
            />
        );
    }

    return (
        <AuthProvider>
            <CardProvider>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent animated />
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="sign-up" options={{ headerShown: false }} />
                    <Stack.Screen name="sign-in" options={{ headerShown: false }} />
                    <Stack.Screen name="verify-account" options={{ headerShown: false }} />
                    <Stack.Screen name="reset-password" options={{ headerShown: false }} />
                    <Stack.Screen name="notifications" options={{ headerShown: false }} />
                    <Stack.Screen name="cards" options={{ headerShown: false }} />
                    <Stack.Screen name="settings" options={{ headerShown: false }} />
                    <Stack.Screen name="support" options={{ headerShown: false }} />
                </Stack>
            </CardProvider>
        </AuthProvider>
    );
}