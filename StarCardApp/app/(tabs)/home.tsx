import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/colors';
import CustomHeaderLoggedIn from '@/components/CustomHeaderLoggedIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCard } from '@/context/CardContext';
import LoyaltyCard from '@/components/LoyaltyCard';

const USER_CODE = 'FI7459883';

const Home = () => {
    const { auth_token } = useAuth();
    const { status, card, initFromCache, refreshFromApi } = useCard();

    useEffect(() => {
        // 1) load from cache ASAP
        initFromCache();

        // 2) then refresh from API
        (async () => {
            const token = auth_token || (await AsyncStorage.getItem('auth_token'));
            if (token) {
                await refreshFromApi(token, USER_CODE);
            }
        })();
    }, [auth_token, initFromCache, refreshFromApi]);

    if (auth_token === undefined) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!auth_token) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Niste prijavljeni.</Text>
            </View>
        );
    }

    const loading = status === 'loading';

    return (
        <SafeAreaView>
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]}>
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                    <CustomHeaderLoggedIn />
                </View>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingTop: 30 }}
                >
                    <View className="px-6" style={{ marginTop: 80 }}>
                        <Text style={{ fontFamily: 'Lexend-Zetta-Bold', color: colors.primary }}>
                            Welcome Dušan
                        </Text>
                        {loading ? (
                            <View style={{ marginTop: 8 }}>
                                <ActivityIndicator size="small" />
                            </View>
                        ) : null}
                    </View>

                    {/* Loyalty Card */}
                    {card && (
                        <View className="px-6 mt-6">
                            <LoyaltyCard card={card} />
                        </View>
                    )}

                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Home;