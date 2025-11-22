import {View, Text, Switch, FlatList, ScrollView} from 'react-native';
import React, {useState} from 'react';
import colors from "@/constants/colors";
import CustomHeaderLoggedIn from "@/components/CustomHeaderLoggedIn";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";

const Notifications = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const notifications: string[] = []; // empty for now

    const toggleSwitch = () => setNotificationsEnabled(prev => !prev);

    return (
        <SafeAreaView className="flex-1">
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="flex-1">
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000}}>
                    <CustomHeaderLoggedIn/>
                </View>

                <View className="bg-white rounded-xl p-4"
                style={{paddingTop: 70}}>
                    <Text className="text-2xl font-['Lexend-Zetta-Bold'] mb-5">Notifications</Text>

                    <View className="flex-row items-center justify-between mb-5">
                        <Text className="text-base font-['Lexend-Regular']">Enable Notifications</Text>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={toggleSwitch}
                            trackColor={{false: "#767577", true: "#92C4CE"}}
                            thumbColor={notificationsEnabled ? "#ffffff" : "#f4f3f4"}
                        />
                    </View>

                    <FlatList
                        data={notifications}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <View className="p-3 border-b border-gray-200">
                                <Text>{item}</Text>
                            </View>
                        )}
                        ListEmptyComponent={
                            <View className="flex-1 justify-center items-center mt-12">
                                <Text className="text-[#82BCC7] font-['Lexend-Light']">
                                    No notifications yet.
                                </Text>
                            </View>
                        }
                        contentContainerStyle={{flexGrow: 1}}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Notifications;
