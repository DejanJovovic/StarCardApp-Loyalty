import {View, Text, Image} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/colors";
import CustomHeaderLoggedIn from "@/components/CustomHeaderLoggedIn";
import images from "@/constants/images";

const Cards = () => {

    return (
        <SafeAreaView>
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000}}>
                    <CustomHeaderLoggedIn/>
                </View>
                <View className="mt-10 px-7">
                    <View className="flex flex-row justify-between">
                        <View className="flex-column">

                            <Text style={{fontFamily: 'Lexend-Zetta-Bold', paddingTop: 62}}>Your Cards</Text>
                            <Text className="mb-4"
                                  style={{color: colors.secondary, fontFamily: 'Lexend-Deca-Medium'}}>
                                Pick your card and program</Text>
                        </View>
                    </View>
                    <View className="items-center justify-center px-7">
                        <Image
                            source={images.testCards}
                            style={{width: 450, height: 700, marginTop: 10}}
                            resizeMode="contain"/>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}
export default Cards
