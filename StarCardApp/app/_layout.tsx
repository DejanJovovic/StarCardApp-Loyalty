import {enableScreens} from 'react-native-screens';

enableScreens();

import {SplashScreen as ExpoSplashScreen, Stack} from 'expo-router';
import "./globals.css";
import {AuthProvider} from "@/components/AuthContext";
import {useFonts} from "expo-font";
import {useEffect, useState} from "react";
import SplashScreen from "@/components/SplashScreen";

enableScreens();

export default function RootLayout() {


    const [showCustomSplash, setShowCustomSplash] = useState(true);

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
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="sign-up" options={{title: ""}}/>
                <Stack.Screen name="verify-account" options={{title: ""}}/>
                <Stack.Screen name="new-password" options={{title: ""}}/>
                <Stack.Screen name="buy-now" options={{title: ""}}/>
                <Stack.Screen name="settings" options={{title: ""}}/>
                <Stack.Screen name="support" options={{title: ""}}/>
            </Stack>
        </AuthProvider>
    );
}