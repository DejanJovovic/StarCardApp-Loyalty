import {View, Text, FlatList, ScrollView, Image} from "react-native";
import React, {useCallback, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "expo-router";
import CustomHeaderLoggedIn from "@/components/CustomHeaderLoggedIn";
import colors from "@/constants/colors";
import images from "@/constants/images";
import {LinearGradient} from "expo-linear-gradient";

const Wallet = () => {
    const [codes, setCodes] = useState<string[]>([]);
    const [authToken, setAuthToken] = useState<string | null>(null);


    const loadScannedCodes = async () => {
        try {
            const stored = await AsyncStorage.getItem("scannedCodes");
            if (stored) {
                setCodes(JSON.parse(stored));
            } else {
                setCodes([]);
            }
        } catch (error) {
            console.error("Failed to load scanned codes", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            const checkAuth = async () => {
                const token = await AsyncStorage.getItem("auth_token");
                setAuthToken(token);
            };

            checkAuth();
            if (authToken) {
                loadScannedCodes();
            }
        }, [authToken])
    );

    if (!authToken) {
        return (
            <View className="flex-1 justify-center items-center bg-[#f0f0f0]">
                <Text className="text-2xl text-center font-bold">
                    Please log in to check your scanned QR codes!
                </Text>
            </View>
        );
    }

    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="flex-1">
            <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 10}}>
                <CustomHeaderLoggedIn/>
            </View>
            <View className="mt-8 px-5">
                <Text className="text-xl font-bold mb-4">Scanned QR Codes</Text>
                <FlatList
                    data={codes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <View className="py-3 border-b border-gray-300">
                            <Text className="text-base text-gray-800">{item}</Text>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text className="mt-5 text-center text-gray-500">No codes yet</Text>
                    }
                />
            </View>
        </LinearGradient>
    );
};

export default Wallet;