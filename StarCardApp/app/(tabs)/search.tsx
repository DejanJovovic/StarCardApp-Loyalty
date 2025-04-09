import { View, TextInput, Image } from "react-native";
import { useState } from "react";
import icons from "@/constants/icons"; // Assuming you have icons.search

export default function Search() {
    const [query, setQuery] = useState("");

    return (
        <View className="flex-1 bg-white p-4">
            <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
                <Image source={icons.search} className="w-5 h-5 tint-gray-500" />
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search..."
                    placeholderTextColor="#888"
                    className="flex-1 ml-3 text-base text-black"
                />
            </View>
        </View>
    );
}