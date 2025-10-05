import {OneSignal} from "react-native-onesignal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchAndSaveMobileId = async (): Promise<string | null> => {
    try {
        // Wait a bit to ensure registration completes
        await new Promise((res) => setTimeout(res, 2000));

        const deviceState = await (OneSignal as any).getDeviceState();
        const mobileId = deviceState?.userId ?? null;

        if (mobileId) {
            await AsyncStorage.setItem("mobileId", mobileId);
            console.log("OneSignal Mobile ID:", mobileId);
        } else {
            console.warn("Mobile ID is still null. Registration may not have completed.");
        }

        return mobileId;
    } catch (error) {
        console.error("Error fetching OneSignal mobile ID:", error);
        return null;
    }
};