import React from "react";
import { View, Text, Image } from "react-native";
import type { CardValues } from "@/types/card";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images";

type Props = { card: CardValues };

const REWARD_THRESHOLD = 10; // "Collect 10 stamps to get a reward"

export default function LoyaltyCard({ card }: Props) {
    const bg = card.colors.background ?? "#1c1c9c";
    const stampBg = card.colors.stampBackground ?? "#1c1c9c";
    const stampText = card.colors.stampText ?? "#ffffff";
    const stampActiveBg = card.colors.stampActiveBg ?? "#5cc192";
    const stampInactiveBg = card.colors.stampInactiveBg ?? "#aaaaaa";

    const active = Math.max(0, card.stamps.active ?? 0);
    const missing = Math.max(0, REWARD_THRESHOLD - active);

    return (
        <View className="rounded-2xl shadow-md p-4" style={{ backgroundColor: bg }}>
            {/* Header */}
            <View className="flex-row items-center justify-between">
                <Text className="text-white text-lg font-bold">
                    {card.info.companyName ?? "LOYALTY CARD"}
                </Text>
                <View
                    className="px-2 py-1 rounded-full"
                    style={{
                        backgroundColor: card.isActive
                            ? "rgba(255,255,255,0.18)"
                            : "rgba(0,0,0,0.18)",
                    }}
                >
                    <Text className="text-white text-xs font-semibold tracking-wider">
                        {card.status?.toUpperCase() ?? "STATUS"}
                    </Text>
                </View>
            </View>

            {/* Balance */}
            <View className="mt-4">
                <Text className="text-white/80 text-xs tracking-wider font-medium">
                    LOYALTY BALANCE
                </Text>
                <View className="flex-row items-baseline space-x-2 mt-1">
                    <Text className="text-white text-4xl font-extrabold">
                        {card.stamps.total}
                    </Text>
                    <Text className="text-white/90 text-base font-semibold"> stamps</Text>
                </View>
            </View>

            <View className="h-px bg-white/25 my-4" />

            {/* Reward progress */}
            <View>
                <Text className="text-white font-medium">
                    {card.info.cardDescription ?? "Reward progress"}
                </Text>
                <Text className="text-white/90 text-sm font-semibold tracking-wide mt-1">
                    {active} stamps
                </Text>
                <Text className="text-white/90 text-xs font-semibold tracking-wide">
                    {missing} missing
                </Text>
            </View>

            <View className="flex-row flex-wrap gap-2 mt-3">
                {Array.from({ length: REWARD_THRESHOLD }).map((_, i) => {
                    const filled = i < active;
                    return (
                        <View
                            key={i}
                            className="w-8 h-8 rounded-full items-center justify-center border-2"
                            style={{
                                backgroundColor: filled
                                    ? stampActiveBg ?? stampBg
                                    : stampBg ?? "transparent",
                                borderColor: filled ? stampActiveBg : stampInactiveBg,
                            }}
                        >
                            <Ionicons
                                name="cafe-outline"
                                size={16}
                                color={filled ? stampText : stampInactiveBg}
                            />
                        </View>
                    );
                })}
            </View>

            <View className="h-px bg-white/25 my-4" />

            {/* CTA / info */}
            <Text className="text-white/95 font-medium">
                {card.info.rewardDetails ?? "Check our new offers"}
            </Text>

            {/* QR image */}
            <View className="mt-3 rounded-xl bg-white/10 items-center p-3">
                <Image
                    source={images.qrCodeTest}
                    resizeMode="contain"
                    className="w-full h-24"
                />
            </View>
        </View>
    );
}