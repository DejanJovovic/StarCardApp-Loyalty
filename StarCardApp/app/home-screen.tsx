import {View, Text, ScrollView, Alert, BackHandler, Image, FlatList, TouchableOpacity, Platform} from 'react-native'
import React, {useEffect, useRef} from 'react'
import {cardData, howItWorksData} from "@/constants/data";
import images from "@/constants/images";
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/colors";
import icons from "@/constants/icons";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";




const HomeScreen = () => {

    const scrollViewRef = useRef(null);

    // activates when the user tries to leave by swiping on their phone
    const handleLogout = () => {
        Alert.alert(
            "",
            "Are you sure you want to exit?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Ok",
                    onPress: async () => {
                        await AsyncStorage.removeItem("auth_token"); // delete the token
                        await AsyncStorage.removeItem("email");
                        await AsyncStorage.removeItem("password");

                        const token = await AsyncStorage.getItem("auth_token"); // check if it's null
                        console.log("Token after deletion:", token); // should be null if the token is successfully deleted

                        router.replace("/sign-in");
                    },
                },
            ]
        );
    };

    // handle back swipe - ONLY WORKS ON ANDROID
    useEffect(() => {
        const backAction = () => {
            handleLogout();
            return true; // prevents default back behavior
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, []);



    // Swipe Gesture for iOS - needs fixing probably
    // const swipeGesture = Gesture.()
    //     .direction(Gesture.Directions.LEFT)
    //     .onEnd(() => {
    //         if (Platform.OS === "ios") {
    //             handleLogout();
    //         }
    //     });

    return (
        <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1,}}
                        ref={scrollViewRef}>
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
                    <Text className="mt-5 text-justify leading-relaxed"
                          style={{color: colors.primary}}>Make it count.</Text>
                    <Text className="text-justify leading-relaxed"
                          style={{color: colors.primary}}>Make it memorable.</Text>
                    <Text className="mt-5 text-justify leading-relaxed"
                          style={{color: colors.primary}}>Make people think
                        about you long after the meeting.</Text>
                    <Text className="mt-5 text-justify leading-relaxed font-semibold"
                          style={{color: colors.primary}}>STARCARD shares not
                        only your contact details but your story as well.</Text>

                </View>

                <Text className="uppercase ml-4 font-bold text-xl mt-10">How it works</Text>

                <View className="border-t ml-4 mr-4 border-[#74747EF3]"></View>

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
                                    <View className="items-center justify-center mt-5 flex-col">
                                        <Text className="text-2xl font-semibold text-[#92C4CE]">{item.step}</Text>
                                        <Text className="text-xl font-semibold"
                                              style={{color: colors.primary}}>{item.title}</Text>
                                        <Text
                                            className="text-justify leading-relaxed mt-2"
                                            style={{color: colors.primary}}>{item.description}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <View className="relative mx-auto w-[100%] overflow-hidden mt-10">
                    <Image
                        source={images.homeImage2}
                        className="w-full h-56"
                        resizeMode="cover"
                    />
                    <View className="absolute inset-0 flex-col items-center justify-center mb-10">
                        <Text className="text-white text-3xl font-bold tracking-wider">BUSINESS CARDS</Text>
                        <Text className="text-white text-3xl font-bold tracking-wider">REVOLUTION</Text>
                    </View>
                </View>

                <View className="mt-6 px-4">
                    <Text className="uppercase font-bold text-xl tracking-wider">Shop</Text>
                    <View className="border-t border-[#74747EF3]"></View>
                </View>

                <View className="mt-10 flex-col px-4 items-center justify-center">
                    <Text className="text-2xl font-bold tracking-wider"
                          style={{color: colors.secondary}}>PRESENTATION IS EVERYTHING</Text>
                    <Text className="text-sm mt-1 font-bold"
                          style={{color: colors.primary}}>Choose your card style and stay true to yourself</Text>
                </View>

                <View className="mt-10">
                    <Text className="text-lg px-6"
                          style={{color: colors.primary}}>
                        <Text className="font-bold">Plasty</Text>
                        <Text> (mat plastic)</Text>
                    </Text>
                    <View className="flex-row">
                        <Image source={images.card1}
                               resizeMode="contain"
                               style={{width: 250, height: 150}}
                               className="rounded-[30px]"/>
                        <Image source={images.card2}
                               resizeMode="contain"
                               style={{width: 170, height: 150}}
                               className=""/>
                    </View>
                </View>

                <View className="mt-8">
                    <View className="flex-row">
                        <Text className="text-lg px-4"
                              style={{color: colors.primary}}>
                            <Text className="font-bold">Chromy</Text>
                            <Text> (glassy metal)</Text>
                        </Text>
                        <Text className="text-lg ml-2"
                              style={{color: colors.primary}}>
                            <Text className="font-bold">Brushy</Text>
                            <Text> (brushed metal)</Text>
                        </Text>

                    </View>
                    <View className="flex-auto flex-row">
                        <Image source={images.card3}
                               resizeMode="contain"
                               style={{width: 200, height: 150}}
                               className="rounded-[30px]"/>
                        <Image source={images.card4}
                               resizeMode="contain"
                               style={{width: 200, height: 150}}
                               className="rounded-[30px]"/>
                    </View>
                </View>

                <View className="mt-10 px-4 items-center justify-center">
                    <Text className="text-lg"
                          style={{color: colors.primary}}>
                        <Text className="font-bold">Woody</Text>
                        <Text> (oak wood)</Text>
                    </Text>
                    <View>
                        <Image source={images.card5}
                               resizeMode="contain"
                               style={{width: 220, height: 150}}
                               className="rounded-[30px]"/>
                    </View>
                    <TouchableOpacity className="bg-[#92C4CE] rounded-md mt-6 items-center justify-center"
                                      style={{width: 150, height: 50}}
                                        onPress={() => router.push("/buy-now")}>
                        <Text className="text-white text-center font-semibold text-base">BUY NOW</Text>
                    </TouchableOpacity>
                </View>

                <View className="px-4 mt-6">
                    <Text className="uppercase font-bold text-xl">About us</Text>
                    <View className="border-t border-[#74747EF3] px-4"></View>
                </View>


                <View className="mt-6 items-center justify-center flex-col">
                    <Text className="text-2xl font-bold tracking-wider"
                          style={{color: colors.primary}}>WE ARE THE FUTURE</Text>
                    <Text className="mt-1 font-semibold"
                          style={{color: colors.secondary}}>We aim to create impactful products</Text>
                    <Text className="mt-1 font-semibold"
                          style={{color: colors.secondary}}>that shape the future and enhance lives</Text>
                </View>

                <View className="relative mx-auto w-[92%] overflow-hidden rounded-bl-[80px] mt-5">
                    <Image
                        source={images.homeImage3}
                        className="w-full h-56"
                        resizeMode="cover"
                    />
                    <View className="absolute left-2 top-4">
                        <View className="flex-col w-[90%]">
                            <Text className="text-xs font-bold "
                                  style={{color: colors.primary}}>STARCARD is an innovative</Text>
                            <Text className="text-xs font-bold"
                                  style={{color: colors.primary}}>and dynamic young company at</Text>
                            <Text className="text-xs font-bold"
                                  style={{color: colors.primary}}>the forefront of the technology industry.</Text>
                            <Text className="text-xs tracking-wider mt-3"
                                  style={{color: colors.primary}}>With a team of talented and</Text>
                            <Text className="text-xs tracking-wider"
                                  style={{color: colors.primary}}>passionate professionals, we</Text>
                            <Text className="text-xs tracking-wider"
                                  style={{color: colors.primary}}>are dedicated to developing</Text>
                            <Text className="text-xs tracking-wider ml-2"
                                  style={{color: colors.primary}}>cutting-edge solutions and</Text>
                            <Text className="text-xs tracking-wider ml-5"
                                  style={{color: colors.primary}}>pushing the boundaries.</Text>
                        </View>

                    </View>
                </View>


                <View className="relative mt-10 items-center w-full h-auto">
                    <Image
                        source={images.homeImage4}
                        resizeMode="cover"
                        className="w-full h-[400px] rounded-lg"
                    />

                    <View className="absolute items-center justify-center flex-col mt-8">
                        <Text className="font-bold text-2xl"
                              style={{color: colors.primary}}>WHAT PEOPLE THINK...</Text>
                        <Text className="text-sm font-bold text-white">Check out some recent comments about our
                            products</Text>
                        <View className="flex-row ml-10 mt-5">
                            <View className="flex-col">
                                <Image source={images.userHomeImage1}
                                       resizeMode="contain"
                                       style={{width: 70, height: 70}}
                                       className="ml-4"
                                />
                                <View className="flex-row mt-2 ml-6">
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />

                                </View>
                                <Text className="text-lg text-bold ml-4"
                                      style={{color: colors.primary}}>IVANA S.</Text>
                                <Text className="text-xs text-semibold"
                                      style={{color: colors.primary}}>Starcard helps me </Text>
                                <Text className="text-xs text-semibold"
                                      style={{color: colors.primary}}>expand my digital</Text>
                                <Text className="text-xs text-semibold"
                                      style={{color: colors.primary}}>footprint and tell a </Text>
                                <Text className="text-xs text-semibold"
                                      style={{color: colors.primary}}>consistent story. It</Text>
                                <Text className="text-xs text-semibold"
                                      style={{color: colors.primary}}>also helps me eliminate</Text>
                                <Text className="text-xs text-semibold"
                                      style={{color: colors.primary}}>waste associated with</Text>
                                <Text className="text-xs text-semibold"
                                      style={{color: colors.primary}}>traditional hardcopy</Text>
                                <Text className="text-xs text-semibold"
                                      style={{color: colors.primary}}>business cards.</Text>

                            </View>
                            <View className="flex-col ml-2">
                                <Image source={images.userHomeImage2}
                                       resizeMode="contain"
                                       style={{width: 70, height: 70}}
                                       className="ml-4"
                                />

                                <View className="flex-row mt-2 ml-7">
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />

                                </View>


                                <Text className="text-lg text-bold"
                                      style={{color: colors.primary}}>ALEKSANDAR V.</Text>

                                <View className="ml-1">
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>With the world turning</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>more digital, old</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>methodologies are</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>losing their step.</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>Starcard can reduce</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>the wast and money</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>by keeping your</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>information up to date,</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>easy to access</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>and quick to distribute.</Text>
                                </View>
                            </View>
                            <View className="flex-col ml-4 mr-5">
                                <Image source={images.userHomeImage3}
                                       resizeMode="contain"
                                       style={{width: 70, height: 70}}
                                />
                                <View className="flex-row mt-2 ml-3">
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />
                                    <Image
                                        source={icons.starIcon}
                                        resizeMode="contain"
                                        style={{width: 10, height: 10, tintColor: "white"}}
                                    />

                                </View>


                                <Text className="text-lg text-bold"
                                      style={{color: colors.primary}}>KATARINA J.</Text>

                                <View className="ml-1">
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>I cannot be more</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>grateful to have</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>found Starcard.</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>I carry just one</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>card and it saves</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>the day when</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>I'm meeting</Text>
                                    <Text className="text-xs text-semibold"
                                          style={{color: colors.primary}}>new people.</Text>
                                </View>
                            </View>
                        </View>

                    </View>

                </View>

                <View className="mt-10 flex-col px-4">
                    <Text className="uppercase font-bold text-xl">Contact</Text>
                    <View className="border-t border-[#74747EF3] px-4"></View>
                </View>

                <View className="mt-10 w-full px-4">
                    <Image
                        source={images.contactMapImage}
                        resizeMode="cover"
                        className="w-full h-[200px]"
                    />
                </View>

                <View className="flex-row mt-10 mb-10">
                    {/*when clicked scroll to the top of the current screen*/}
                    <TouchableOpacity onPress={() =>
                        scrollViewRef.current?.scrollTo({ y: 0, animated: true })}>
                        <Image
                            source={images.logo}
                            style={{tintColor: "black", width: 30, height: 30, resizeMode: "contain", marginRight: 10}}
                        />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold"
                          style={{color: colors.primary}}>STARCARD</Text>

                    <View className="flex-col ml-5">
                        <Text className="text-xs"
                              style={{color: colors.primary}}>For all information</Text>
                        <Text className="text-xs"
                              style={{color: colors.primary}}>you can contact</Text>
                        <Text className="text-xs"
                              style={{color: colors.primary}}>us at our offices in</Text>
                        <Text className="text-xs"
                              style={{color: colors.primary}}>Belgrade (Serbia) and</Text>
                        <Text className="text-xs"
                              style={{color: colors.primary}}>Dubai (UAE)</Text>
                        {/*can we clickable to open mail app???*/}
                        <Text className="text-xs mt-4 font-bold"
                              style={{color: colors.primary}}>office@starcardapp.com</Text>
                    </View>
                    <View className="ml-8 mt-2">
                        {/*should be changed to display a real qr code!!*/}
                        <Image
                            source={images.qrCodeTest}
                            style={{width: 75, height: 75, resizeMode: "contain"}}
                        />
                    </View>
                </View>


            </ScrollView>
        </LinearGradient>

    )
}
export default HomeScreen
