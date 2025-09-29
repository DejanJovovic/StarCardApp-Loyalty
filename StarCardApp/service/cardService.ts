import type { CardValues } from '@/types/card';
import { CardValuesMapper } from '@/model/CardValuesMapper';

export async function fetchCardValues(token: string, userCode: string): Promise<CardValues> {
    const url = `https://starcardapp.com/loyalty/cards/get_all_card_values/${encodeURIComponent(userCode)}`;
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

    const parsed = JSON.parse(raw);
    console.log('[CardService] parsed JSON:', parsed);

    const mapped = CardValuesMapper.fromApi(parsed);
    console.log('[CardService] mapped CardValues:', mapped);

    return mapped;

}