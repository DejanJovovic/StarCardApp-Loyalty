import type { CardValuesApi, CardValues } from '@/types/card';

const parseDate = (s: string) => new Date(s.replace(' ', 'T') + 'Z');
const trimMultiline = (s: string | null): string | null =>
    s ? s.replace(/\r/g, '').split('\n').map(line => line.trimEnd()).join('\n').trim() : null;

export class CardValuesMapper {
    static fromApi(json: CardValuesApi): CardValues {
        if (!json || typeof json !== 'object' || !json.data) {
            throw new Error('Invalid API payload');
        }
        const d = json.data;

        return {
            id: d.id,
            cardId: d.card_id,
            userId: d.user_id,
            userCode: d.user_code,
            name: d.card_name,
            type: d.card_type,
            isActive: d.is_active === 1,
            status: d.status,
            createdAt: parseDate(d.created_at),
            updatedAt: parseDate(d.updated_at),

            colors: {
                // prefer NEW card_background; fallback to legacy background_color; fallback null
                background: d.card_background ?? d.background_color ?? null,

                // NEW fields (may be null/undefined)
                stampBackground: d.stamp_background_color ?? null,
                stampText: d.stamp_text_color ?? null,

                // existing
                stampActiveBg: d.active_stamp_bg ?? null,
                stampInactiveBg: d.inactive_stamp_bg ?? null,
            },

            stamps: {
                total: d.stamps,
                active: d.active_stamps,
                iconActive: d.active_stamp_icon,
                iconInactive: d.inactive_stamp_icon,
                rewardsCount: d.rewards,
            },

            info: {
                companyName: d.info_company_name,
                cardDescription: d.info_card_description,
                howToEarn: d.info_how_to_earn_stamp,
                rewardDetails: d.info_reward_details,
                earnedStampMsg: d.info_earned_stamp_message,
                earnedRewardMsg: d.info_earned_reward_message,
                termsOfUse: trimMultiline(d.text_info_terms_of_use),
            },
        };
    }
}