import {View, Text, FlatList, ScrollView, Image, TouchableOpacity} from "react-native";
import React, {useCallback, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "expo-router";
import CustomHeaderLoggedIn from "@/components/CustomHeaderLoggedIn";
import colors from "@/constants/colors";
import images from "@/constants/images";
import {LinearGradient} from "expo-linear-gradient";
import icons from "@/constants/icons";

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
            <View className="mt-10 px-7">
                <View className="flex flex-row">
                    <View className="flex-column">

                        <Text style={{fontFamily: 'Lexend-Zetta-Bold', paddingTop: 62}}>Your Wallet</Text>
                        <Text className="mb-4"
                              style={{color: colors.secondary, fontFamily: 'Lexend-Deca-Medium'}}>Pick your card or add
                            a
                            new one</Text>
                    </View>
                    <View className="justify-end ml-5">
                        <TouchableOpacity className="items-center justify-center">
                        <Image source={images.rectangleBlue}
                               style={{width: 66, height: 50}}
                               resizeMode="cover"/>
                            <Image source={icons.plus_icon}
                                   tintColor="white"
                                   className="absolute"
                                   resizeMode="cover"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={codes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <View className="py-3 border-b border-gray-300">
                            <Text style={{fontFamily: 'Lexend-Zetta-Medium', paddingTop: 32}}>{item}</Text>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text className="mt-5 text-center"
                              style={{fontFamily: 'Lexend-Zetta-Medium'}}>No codes yet</Text>
                    }
                />
            </View>


        </LinearGradient>
    );
};

export default Wallet;