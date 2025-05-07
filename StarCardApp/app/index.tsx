import {View, Text, ScrollView, Image, SafeAreaView} from 'react-native'
import React, {useEffect} from 'react'
import images from "@/constants/images";
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/colors";
import CustomHeader from "@/components/CustomHeader";


const Index = () => {

    return (
        <SafeAreaView className="h-full">
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 10}}>
                    <CustomHeader/>
                </View>
                <ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: 30, paddingBottom: 150}}>
                    <View className="mx-auto w-[100%] overflow-hidden">
                        <Image
                            source={images.homeNewImage}
                            className="w-full rounded-bl-[80px]"
                            style={{height: 320}}
                            resizeMode="cover"
                        />
                    </View>

                    <View className="flex flex-col mt-10 items-center justify-center">
                        <Text className="text-2xl text-black"
                              style={{fontFamily: 'Lexend-Zetta-Bold'}}>WELCOME TO</Text>
                        <Text className="text-2xl text-black"
                              style={{fontFamily: 'Lexend-Zetta-Bold'}}>LOYALTY PROGRAMS</Text>
                        <Text className="text-2xl text-black"
                              style={{fontFamily: 'Lexend-Zetta-Bold'}}>REVOLUTION</Text>
                    </View>

                    <View className="flex flex-col mt-5 items-center justify-center">
                        <Text className="text-xl "
                              style={{color: colors.secondary, fontFamily: 'Lexend-Deca-SemiBold'}}>Your Affordable
                            Loyalty Partner</Text>
                        <Text className="text-xl"
                              style={{color: colors.secondary, fontFamily: 'Lexend-Deca-SemiBold'}}>for Small and Medium
                            Businesses</Text>
                    </View>

                    <View className="flex flex-col mt-10 items-start justify-center  ml-10">
                        <Text style={{fontFamily: 'Lexend-Deca-Light'}}>At StarCard, <Text
                            style={{fontFamily: 'Lexend-Deca-Medium'}}>we believe that every business</Text></Text>
                        <Text style={{fontFamily: 'Lexend-Deca-Medium'}}>- no matter the size - deserves access
                            to</Text>
                        <Text style={{fontFamily: 'Lexend-Deca-Medium'}}>powerful, easy-to-use digital loyalty
                            programs.</Text>

                        <Text className="mt-5" style={{fontFamily: 'Lexend-Deca-Light'}}>Our mission is to <Text
                            style={{fontFamily: 'Lexend-Deca-Medium'}}>revolutionize the way small</Text></Text>
                        <Text style={{fontFamily: 'Lexend-Deca-Medium'}}>businesses connect with their customers
                            -</Text>
                        <Text style={{fontFamily: 'Lexend-Deca-Light'}}>turning every visit into a lasting
                            relationship.</Text>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default Index
