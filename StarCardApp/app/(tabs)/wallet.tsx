import {View, Text, FlatList, ScrollView, Image, TouchableOpacity, StatusBar} from "react-native";
import React, {useCallback, useState} from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
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


    // const loadScannedCodes = async () => {
    //     try {
    //         const stored = await AsyncStorage.getItem("scannedCodes");
    //         if (stored) {
    //             setCodes(JSON.parse(stored));
    //         } else {
    //             setCodes([]);
    //         }
    //     } catch (error) {
    //         console.error("Failed to load scanned codes", error);
    //     }
    // };

    // useFocusEffect(
    //     useCallback(() => {
    //         const checkAuth = async () => {
    //             const token = await AsyncStorage.getItem("auth_token");
    //             setAuthToken(token);
    //         };
    //
    //         checkAuth();
    //         if (authToken) {
    //             loadScannedCodes();
    //         }
    //     }, [authToken])
    // );

    return (
        <SafeAreaView>
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000}}>
                    <CustomHeaderLoggedIn/>
                </View>
                <View className="mt-10 px-7">
                    <View className="flex flex-row justify-between">
                        <View className="flex-column">

                            <Text style={{fontFamily: 'Lexend-Zetta-Bold', paddingTop: 62}}>Your Wallet</Text>
                            <Text className="mb-4"
                                  style={{color: colors.secondary, fontFamily: 'Lexend-Deca-Medium'}}>Pick your card or
                                add
                                a
                                new one</Text>
                        </View>
                        <View className="justify-end">
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
                    <View className="items-center justify-center px-7">
                        <Image
                            source={images.testCards}
                            style={{width: 450, height: 700, marginTop: 10}}
                            resizeMode="contain"/>
                    </View>
                    {/*<FlatList*/}
                    {/*    data={codes}*/}
                    {/*    keyExtractor={(item, index) => index.toString()}*/}
                    {/*    renderItem={({item}) => (*/}
                    {/*        <View className="py-3 border-b border-gray-300">*/}
                    {/*            <Text style={{fontFamily: 'Lexend-Zetta-Medium', paddingTop: 32}}>{item}</Text>*/}
                    {/*        </View>*/}
                    {/*    )}*/}
                    {/*    ListEmptyComponent={*/}
                    {/*        <Text className="mt-5 text-center"*/}
                    {/*              style={{fontFamily: 'Lexend-Zetta-Medium'}}>No codes yet</Text>*/}
                    {/*    }*/}
                    {/*/>*/}
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Wallet;