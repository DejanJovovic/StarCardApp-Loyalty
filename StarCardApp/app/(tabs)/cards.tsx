import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/colors';
import CustomHeaderLoggedIn from '@/components/CustomHeaderLoggedIn';
import LoyaltyCard from '@/components/LoyaltyCard';
import { useAuth } from '@/components/AuthContext';
import { useCard } from '@/context/CardContext';

const Cards = () => {
    const { auth_token } = useAuth();
    const { status, cards, refreshFromApi } = useCard();

    useEffect(() => {
        if (auth_token) {
            refreshFromApi(auth_token);
        }
    }, [auth_token, refreshFromApi]);

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
                <Text>You are not logged in.</Text>
            </View>
        );
    }

    const loading = status === 'loading' && (!cards || cards.length === 0);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} style={{ flex: 1 }}>
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                    <CustomHeaderLoggedIn />
                </View>

                <ScrollView contentContainerStyle={{ paddingTop: 30, paddingBottom: 40 }}>
                    <View className="px-6" style={{ marginTop: 80 }}>
                        <Text style={{ fontFamily: 'Lexend-Zetta-Bold' }}>Your Cards</Text>
                        <Text className="mb-4" style={{ color: colors.secondary, fontFamily: 'Lexend-Deca-Medium' }}>
                            Pick your card and program
                        </Text>
                    </View>

                    {loading && (
                        <View className="mt-6 items-center">
                            <ActivityIndicator size="large" color={colors.primary} />
                        </View>
                    )}

                    <View className="px-6 mt-2" style={{ paddingBottom: 100 }}>
                        {cards?.map((card, idx) => (
                            <LoyaltyCard key={`${card.id}-${idx}`} card={card} />
                        ))}
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};
export default Cards;
