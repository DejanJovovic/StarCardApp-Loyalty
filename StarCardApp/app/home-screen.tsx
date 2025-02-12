import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import {LinearGradient} from "expo-linear-gradient";

const HomeScreen = () => {
    return (
        <LinearGradient colors={["#3E5060", "#B0C4DE"]} className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <Text className="text-2xl items-center justify-center text-white">Home Screen</Text>
            </ScrollView>
        </LinearGradient>
    )
}
export default HomeScreen
