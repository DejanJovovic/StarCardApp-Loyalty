import {View, Text, ScrollView, Alert, BackHandler} from 'react-native'
import React, {useEffect} from 'react'
import {LinearGradient} from "expo-linear-gradient";
import {router} from "expo-router";

const HomeScreen = () => {

    // activates when the user tries to leave by swiping on their phone
    useEffect(() => {
        const handleBackPress = () => {
            Alert.alert(
                "",
                "Are you sure you want to log out?",
                [
                    { text: "No", style: "cancel" },
                    {
                        text: "Yes",
                        onPress: () => {
                            router.push("/sign-in");
                        }
                    }
                ]
            );
            return true; // Prevents exiting the app
        };
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        };
    }, []);


    return (
        <LinearGradient colors={["#3E5060", "#B0C4DE"]} className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <Text className="text-2xl items-center justify-center text-white">Home Screen</Text>
            </ScrollView>
        </LinearGradient>
    )
}
export default HomeScreen
