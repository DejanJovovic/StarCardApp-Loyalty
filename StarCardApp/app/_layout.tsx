import { enableScreens } from 'react-native-screens';
enableScreens();

import {SplashScreen, Stack} from "expo-router";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import {useFonts} from "expo-font";
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="sign-up"
                    options={{ title: "" }}
                />
                <Stack.Screen
                    name="verify-account"
                    options={{ title: "" }}
                />
                <Stack.Screen
                    name="new-password"
                    options={{ title: "" }}
                />
                <Stack.Screen
                    name="buy-now"
                    options={{ title: "" }}
                />
                <Stack.Screen
                    name="settings"
                    options={{ title: "" }}
                />
                <Stack.Screen
                    name="support"
                    options={{ title: "" }}
                />
            </Stack>
        </AuthProvider>
    );
}