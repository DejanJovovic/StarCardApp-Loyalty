import {Stack} from "expo-router";
import "./globals.css"
import {AuthProvider} from "@/components/AuthContext";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{headerShown: false}}/>
                <Stack.Screen
                    name="(auth)/sign-up"
                    options={{title: ""}}
                />
                <Stack.Screen
                    name="(auth)/verify-account"
                    options={{title: ""}}
                />
                <Stack.Screen
                    name="(auth)/new-password"
                    options={{title: ""}}
                />
                <Stack.Screen
                    name="(other)/buy-now"
                    options={{title: ""}}
                />
                <Stack.Screen
                    name="(other)/settings"
                    options={{title: ""}}
                />
                <Stack.Screen
                    name="(other)/support"
                    options={{title: ""}}
                />
            </Stack>
        </AuthProvider>)
}

