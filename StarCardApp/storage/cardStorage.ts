import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CardValues } from '@/types/card';

const KEY = 'card_values_list';

export async function saveCardValues(cards: CardValues[]) {
    await AsyncStorage.setItem(KEY, JSON.stringify(cards));
}

export async function loadCardValues(): Promise<CardValues[] | null> {
    const s = await AsyncStorage.getItem(KEY);
    if (!s) return null;
    try {
        const arr = JSON.parse(s) as CardValues[];
        for (const c of arr) {
            (c as any).createdAt = new Date(c.createdAt);
            (c as any).updatedAt = new Date(c.updatedAt);
        }
        return arr;
    } catch {
        return null;
    }
}

export async function clearCardValues() {
    await AsyncStorage.removeItem(KEY);
}