import {View, Text, ScrollView, Alert, BackHandler, Image, FlatList} from 'react-native'
import React, {useEffect} from 'react'
import {router} from "expo-router";
import {cardData, howItWorksData} from "@/constants/data";
import images from "@/constants/images";
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/colors";

const HomeScreen = () => {

    // activates when the user tries to leave by swiping on their phone
    useEffect(() => {
        const handleBackPress = () => {
            Alert.alert(
                "",
                "Are you sure you want to log out?",
                [
                    {text: "No", style: "cancel"},
                    {
                        text: "Yes",
                        onPress: () => {
                            router.push("/sign-in");
                        }
                    }
                ]
            );
            return true; // prevents exiting the app
        };
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        };
    }, []);


    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1,}}>
                <View className="relative mx-auto w-[92%] overflow-hidden rounded-bl-[80px] mt-5">
                    <Image
                        source={images.homeStartImage}
                        className="w-full h-56"
                        resizeMode="cover"
                    />
                </View>

                <View className="flex flex-col items-center justify-center">
                    <Text className="mt-5 text-lg font-semibold"
                          style={{color: colors.secondary}}>Your Personal</Text>
                    <Text className="uppercase text-xl font-bold">Digital Business Card</Text>
                    <Text className="mt-5 px-6 text-justify leading-relaxed"
                          style={{color: colors.primary}}>
                        STARCARD is meant for people who keep up with the modern lifestyle.
                        Once you have experienced our way of networking,
                        you’ll never go back to paper.
                        Upgrading your networking to professional level,
                        telling a story about your life with a single tap,
                        instead of just sharing your contact details will make everyone think about you long after the
                        meeting,
                        creating a relationship from just a quiet encounter.
                    </Text>
                    <Text className="mt-5 px-4 text-justify leading-relaxed"
                          style={{color: colors.secondary}}>Starcard helps you connect
                        like a pro,</Text>
                    <Text className="px-4 text-justify leading-relaxed"
                          style={{color: colors.secondary}}>share your contact details and
                        your story,</Text>
                    <Text className="px-4 text-justify leading-relaxed"
                          style={{color: colors.secondary}}>gather leads, and create a
                        striking first impression.</Text>
                </View>

                <View className="mt-6 px-4">
                    <FlatList
                        data={cardData}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <View
                                className="bg-[#92C4CE] shadow-md rounded-bl-[40px] p-4 w-60 h-40 mr-4 flex justify-center">
                                <View>
                                    <Text className="text-xl font-semibold text-black">{item.title}</Text>
                                    <Text className="text-white text-sm mt-1">{item.description}</Text>
                                </View>
                                <View className="border-2 border-white p-1 rounded-lg self-end ">
                                    <Image
                                        source={item.icon}
                                        style={{width: 30, height: 30, tintColor: "white"}}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>

                        )}
                    />
                </View>
                <View className="flex-col flex items-center justify-center m-3 p-1">
                    <Text className=" text-justify leading-relaxed text-lg font-semibold">EVERY NEW CONNECTION YOU MAKE
                        COULD BE
                        THE ONE.</Text>
                    <Text className="mt-5 text-justify leading-relaxed font-semibold text-gray-700">Make it
                        count.</Text>
                    <Text className="text-justify leading-relaxed font-semibold text-gray-700">Make it memorable.</Text>
                    <Text className="mt-5 text-justify leading-relaxed font-semibold text-gray-700">Make people think
                        about you long after the meeting.</Text>
                    <Text className="mt-5 text-justify leading-relaxed font-semibold text-gray-700">STARCARD shares not
                        only your contact details but your story as well.</Text>

                </View>

                <Text className="uppercase ml-4 font-bold text-xl mt-10">How it works</Text>

                <View className="border-t ml-4 mr-4 border-primary-200"></View>

                <View className="mt-6 px-4">
                    <FlatList
                        data={howItWorksData}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <View className="flex-col justify-between">
                                <View className="items-center justify-center">
                                    <Image
                                        source={item.image}
                                        style={{width: 200, height: 200}}
                                        resizeMode="contain"/>
                                    <View className="items-center justify-center mt-5">
                                        <Text className="text-2xl font-semibold text-[#92C4CE]">{item.step}</Text>
                                        <Text className="text-xl font-semibold text-black">{item.title}</Text>
                                        <Text
                                            className="text-justify leading-relaxed text-gray-700 ">{item.description}</Text>
                                    </View>
                                </View>
                            </View>

                        )}
                    />
                </View>

            </ScrollView>
        </LinearGradient>

    )
}
export default HomeScreen
