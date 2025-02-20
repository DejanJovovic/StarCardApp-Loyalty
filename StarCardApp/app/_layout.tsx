import {Stack} from "expo-router";
import "./globals.css"
import CustomHeader from "@/components/CustomHeader";
import {AuthProvider} from "@/components/AuthContext";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{
                header: () => <CustomHeader/>
            }}/>
        </AuthProvider>)
}