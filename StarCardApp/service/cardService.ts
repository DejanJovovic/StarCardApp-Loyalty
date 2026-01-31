import type { CardValues, ProgramCardsApiResponse } from '@/types/card';
import { CardValuesMapper } from '@/model/CardValuesMapper';
import { saveStampImages } from '@/storage/stampStorage';

export async function fetchCardValues(token: string): Promise<CardValues[]> {
    const url = 'https://starcardapp.com/loyalty/cards/get_all_program_cards_values';

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'User-Agent':
                'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        },
    });

    const raw = await res.text();
    console.log('[CardService] status:', res.status);
    console.log('[CardService] raw body:', raw);

    if (!res.ok) {
        throw new Error(`API ${res.status}`);
    }

    const parsed: ProgramCardsApiResponse = JSON.parse(raw);
    console.log('[CardService] parsed JSON:', parsed);

    const mapped = CardValuesMapper.fromApiResponse(parsed);
    console.log('[CardService] mapped CardValues[]:', mapped);

    return mapped;
}

export type StampImageItem = {
    name: string;
    size: number;
    modified: number;
    etag: string;
};

type StampImagesResponse = {
    count: number;
    images: StampImageItem[];
};

export async function fetchStampImages(token: string): Promise<StampImageItem[]> {
    const url = 'https://starcardapp.com/loyalty/cards/get_all_stamps_images';

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'User-Agent':
                'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        },
    });

    const raw = await res.text();
    console.log('[StampImages] status:', res.status);
    console.log('[StampImages] raw body:', raw);

    if (!res.ok) {
        throw new Error(`StampImages API ${res.status}`);
    }

    const parsed: StampImagesResponse = JSON.parse(raw);
    console.log('[StampImages] parsed JSON:', parsed);

    await saveStampImages(parsed.images);
    return parsed.images;
}

export async function fetchStampImagesWithUserCode(token: string): Promise<StampImageItem[]> {
    const url = 'https://starcardapp.com/loyalty/cards/get_all_stamps_images';

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'User-Agent':
                'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        },
    });

    const raw = await res.text();
    console.log('[StampImages] status:', res.status);
    console.log('[StampImages] raw body:', raw);

    if (!res.ok) {
        throw new Error(`StampImages API ${res.status}`);
    }

    const parsed: StampImagesResponse = JSON.parse(raw);
    console.log('[StampImages] parsed JSON:', parsed);

    await saveStampImages(parsed.images);
    return parsed.images;
}

