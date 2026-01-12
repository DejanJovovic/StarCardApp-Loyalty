// Raw API (new response) — a single array element
export type ProgramCardApiItem = {
    program_cards: {
        program_code: string;
        company_code: string;
        program_selector: string;
        program_validator: string;
        program_link: string;
        program_title: string;
        program_description: string;
        program_date: string; // YYYY-MM-DD
        date_start: string | null;
        time_start: string | null;
        date_end: string | null;
        time_end: string | null;
        program_status: 'active' | 'inactive' | string;
    };
    program_images: {
        program_icon: string;
        program_logo: string;
        active_select_image_url: string;
        inactive_select_image_url: string;
    };
    program_color: {
        card_background: string | null;
        card_background_hex: string | null;
        stamp_text_color: string | null;
        active_stamp_color: string | null;
        inactive_stamp_color: string | null;
        stamp_background_color: string | null;
    };
    program_stamps: {
        stamped_number: string;   // numeric string
        visits_required: string;  // numeric string or ""
        stamps_required: string;  // numeric string or ""
        expiration_type: 'unlimited' | 'fixed_term' | string;
        expiration_date: string | null; // YYYY-MM-DD or null
        card_name: string;
        background_stamp_img: string;
    };
    program_information: {
        card_description: string | null;
        company_name: string | null;
        terms_of_use: string | null;
        how_to_earn_stamp: string | null;
        earned_stamp_message: string | null;
    };
    program_rewards: any;
    program_users: any;
    locations: Array<{
        location_id: number;
        location_name: string;
        location_coords: string;
        location_address: string;
        location_push_mess: string;
    }>;
};

export type ProgramCardsApiResponse = {
    status: number;
    data: ProgramCardApiItem[];
};

// Normalized domain model for the UI (one card)
export type CardValues = {
    // Using program_code as a stable id
    id: string;

    // Meta / status
    name: string | null;                // program_title
    isActive: boolean;                  // program_status === 'active'
    status: 'active' | 'inactive' | string; // program_status

    // Timestamps (not provided precisely — approximate from program_date)
    createdAt: Date;
    updatedAt: Date;

    colors: {
        background: string | null;      // program_color.card_background
        stampBackground: string | null; // program_color.stamp_background_color
        stampText: string | null;       // program_color.stamp_text_color
        stampActiveBg: string | null;   // program_color.active_stamp_color
        stampInactiveBg: string | null; // program_color.inactive_stamp_color
    };

    stamps: {
        total: number;                   // total stamped (stamped_number)
        active: number;                  // same as total for progress ring
        iconActive: string | null;       // from program_images.active_select_image_url
        iconInactive: string | null;     // from program_images.inactive_select_image_url
        rewardsCount: number;            // derived: Math.floor(total / 10) or 0
    };

    info: {
        companyName: string | null;      // program_information.company_name
        cardDescription: string | null;  // program_information.card_description
        howToEarn: string | null;        // program_information.how_to_earn_stamp
        rewardDetails: string | null;    // derive from description or leave as-is
        earnedStampMsg: string | null;   // program_information.earned_stamp_message
        earnedRewardMsg: string | null;  // not provided → null
        termsOfUse: string | null;       // trimmed multiline terms_of_use
    };
};