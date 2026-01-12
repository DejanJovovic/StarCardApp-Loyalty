import type { CardValues, ProgramCardsApiResponse, ProgramCardApiItem } from '@/types/card';

export class CardValuesMapper {
    static fromApiResponse(resp: ProgramCardsApiResponse): CardValues[] {
        const items = Array.isArray(resp?.data) ? resp.data : [];
        return items.map(this.fromApiItem);
    }

    static fromApiItem(item: ProgramCardApiItem): CardValues {
        const pc = item.program_cards;
        const pi = item.program_images;
        const color = item.program_color;
        const stamps = item.program_stamps;
        const info = item.program_information;

        const total = toInt(stamps?.stamped_number, 0);
        const created = safeDate(pc?.program_date) ?? new Date();

        return {
            id: pc?.program_code ?? `${pc?.company_code ?? ''}-${pc?.program_selector ?? ''}`,

            name: pc?.program_title ?? null,
            isActive: (pc?.program_status ?? 'inactive') === 'active',
            status: (pc?.program_status as any) ?? 'inactive',

            createdAt: created,
            updatedAt: created,

            colors: {
                background: color?.card_background ?? color?.card_background_hex ?? null,
                stampBackground: color?.stamp_background_color ?? null,
                stampText: color?.stamp_text_color ?? null,
                stampActiveBg: color?.active_stamp_color ?? null,
                stampInactiveBg: color?.inactive_stamp_color ?? null,
            },

            stamps: {
                total,
                active: total, // show same progress as before (10-dots UI)
                iconActive: orNull(pi?.active_select_image_url),
                iconInactive: orNull(pi?.inactive_select_image_url),
                rewardsCount: Math.max(0, Math.floor(total / 10)),
            },

            info: {
                companyName: orNull(info?.company_name),
                cardDescription: orNull(info?.card_description) ?? orNull(pc?.program_description),
                howToEarn: orNull(info?.how_to_earn_stamp),
                rewardDetails: orNull(info?.card_description) ?? 'Check our new offers',
                earnedStampMsg: orNull(info?.earned_stamp_message),
                earnedRewardMsg: null,
                termsOfUse: trimMultiline(orNull(info?.terms_of_use)),
            },
        };
    }
}

function toInt(n: string | number | null | undefined, fallback = 0): number {
    if (n === null || n === undefined) return fallback;
    const v = typeof n === 'string' ? parseInt(n, 10) : Number(n);
    return Number.isFinite(v) ? v : fallback;
}

function orNull<T>(v: T | undefined): T | null {
    return v === undefined ? null : (v as any);
}

function safeDate(s?: string | null): Date | null {
    if (!s) return null;
    const dt = new Date(s);
    return isNaN(dt.getTime()) ? null : dt;
}

function trimMultiline(v: string | null) {
    if (!v) return v;
    return v.replace(/\n\s+/g, '\n').trim();
}