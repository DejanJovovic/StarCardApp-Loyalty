import {Stack} from "expo-router";
import "./globals.css"
import CustomHeader from "@/components/CustomHeader";

export default function RootLayout () {
    return <Stack screenOptions={{
        header: () => <CustomHeader />
    }} />
}