import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CardValues } from '@/types/card';

const KEY = 'card_values';

export async function saveCardValues(card: CardValues) {
    await AsyncStorage.setItem(KEY, JSON.stringify(card));
}

export async function loadCardValues(): Promise<CardValues | null> {
    const s = await AsyncStorage.getItem(KEY);
    if (!s) return null;
    try {
        const obj = JSON.parse(s) as CardValues;
        // revive Dates
        obj.createdAt = new Date(obj.createdAt);
        obj.updatedAt = new Date(obj.updatedAt);
        return obj;
    } catch {
        return null;
    }
}

export async function clearCardValues() {
    await AsyncStorage.removeItem(KEY);
}