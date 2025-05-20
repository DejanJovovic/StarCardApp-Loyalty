import {View, Text, ActivityIndicator, ScrollView, Image, StatusBar} from 'react-native'
import React from 'react'
import {useAuth} from "@/components/AuthContext";
import {SafeAreaView} from 'react-native-safe-area-context';
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/colors";
import CustomHeaderLoggedIn from "@/components/CustomHeaderLoggedIn";
import images from "@/constants/images";

const Home = () => {

    const {auth_token} = useAuth();

    if (auth_token === undefined) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    if (auth_token) {
        return (
            <SafeAreaView>
                <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
                    <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000}}>
                        <CustomHeaderLoggedIn/>
                    </View>
                    <ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: 30, paddingBottom: 80}}>
                        <View className="px-6" style={{
                            marginTop: 80
                        }}>
                            <Text style={{
                                fontFamily: "Lexend-Zetta-Bold",
                                color: colors.primary
                            }}>Welcome Dušan</Text>
                        </View>

                        <View className="mx-auto w-[100%] overflow-hidden mt-5">
                            <Image source={images.starbucksHome} resizeMode="contain" style={{
                                height: 450
                            }} className="w-full"/>
                        </View>

                        <View className="px-6 mt-5">
                            <Text style={{
                                fontFamily: "Lexend-Deca-Bold"
                            }}>Recent activity</Text>
                        </View>
                        <View className="flex flex-col px-6 w-[100%]">
                            <Image source={images.luluHome} resizeMode="contain"
                                   className="w-full"/>
                            <Image source={images.gelatoHome} resizeMode="contain"
                                   className="w-full"/>
                        </View>

                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>
        )
    }
}
export default Home
