import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StampImageItem } from '@/service/cardService';

const KEY = 'stamp_images_list';

export async function saveStampImages(images: StampImageItem[]) {
    await AsyncStorage.setItem(KEY, JSON.stringify(images));
}

export async function loadStampImages(): Promise<StampImageItem[] | null> {
    const s = await AsyncStorage.getItem(KEY);
    if (!s) return null;
    try {
        return JSON.parse(s) as StampImageItem[];
    } catch {
        return null;
    }
}

export async function clearStampImages() {
    await AsyncStorage.removeItem(KEY);
}
