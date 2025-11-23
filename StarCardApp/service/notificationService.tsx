import { OneSignal } from "react-native-onesignal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "notifications_enabled";

export const requestSystemPermission = async (): Promise<boolean> => {
    const result = await OneSignal.Notifications.requestPermission(true);
    return result === true;
};

export const enableOneSignal = async () => {
    OneSignal.User.pushSubscription.optIn();
    await AsyncStorage.setItem(STORAGE_KEY, "true");
};

export const disableOneSignal = async () => {
    OneSignal.User.pushSubscription.optOut();
    await AsyncStorage.setItem(STORAGE_KEY, "false");
};

export const loadStoredNotificationPreference = async (): Promise<boolean> => {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    return value === "true";
};
