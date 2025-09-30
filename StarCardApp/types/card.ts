// Raw shape coming from backend
export type CardValuesApi = {
    status: number;
    data: {
        card_id: number;
        user_id: number | null;
        user_code: string;
        card_name: string | null;
        card_type: 'stamps' | string;
        is_active: 0 | 1;
        created_at: string; // "YYYY-MM-DD HH:mm:ss"
        updated_at: string;
        id: number;

        info_card_description: string | null;
        info_how_to_earn_stamp: string | null;
        info_company_name: string | null;
        info_reward_details: string | null;
        info_earned_stamp_message: string | null;
        info_earned_reward_message: string | null;
        text_info_terms_of_use: string | null;

        stamps: number;
        active_stamps: number;
        active_stamp_icon: string | null;
        inactive_stamp_icon: string | null;
        active_stamp_bg: string | null;
        inactive_stamp_bg: string | null;

        rewards: number;
        status: 'active' | 'inactive' | string;

        // COLORS (new + legacy)
        // NEW
        stamp_background_color?: string | null;
        stamp_text_color?: string | null;
        card_background?: string | null;
        // LEGACY (keep for fallback)
        background_color?: string | null;
    };
};

// Normalized domain model used across the app
export type CardValues = {
    id: number;              // alias of data.id
    cardId: number;          // alias of data.card_id
    userId: number | null;
    userCode: string;
    name: string | null;
    type: 'stamps' | string;
    isActive: boolean;
    status: 'active' | 'inactive' | string;
    createdAt: Date;
    updatedAt: Date;

    colors: {
        // canonical main card background (prefers NEW card_background, falls back to legacy background_color)
        background: string | null;

        // NEW optional styling for the stamps section
        stampBackground: string | null; // from stamp_background_color
        stampText: string | null;       // from stamp_text_color

        // existing fields
        stampActiveBg: string | null;
        stampInactiveBg: string | null;
    };

    stamps: {
        total: number;
        active: number;
        iconActive: string | null;
        iconInactive: string | null;
        rewardsCount: number;
    };

    info: {
        companyName: string | null;
        cardDescription: string | null;
        howToEarn: string | null;
        rewardDetails: string | null;
        earnedStampMsg: string | null;
        earnedRewardMsg: string | null;
        termsOfUse: string | null; // trimmed multi-line string
    };
};