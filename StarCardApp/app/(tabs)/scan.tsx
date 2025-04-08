import {View, Text, TouchableOpacity} from "react-native";
import {useState, useCallback, useRef} from "react";
import {Camera, CameraView} from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "expo-router";
import * as Haptics from 'expo-haptics';
import colors from "@/constants/colors";



export function Scan() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [torch, setTorch] = useState(false);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const lastScannedData = useRef(null);


    useFocusEffect(
        useCallback(() => {
            checkPermissions();
            checkAuth();
        }, [])
    );

    const checkPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
    };

    const checkAuth = async () => {
        const token = await AsyncStorage.getItem("auth_token");
        setAuthToken(token);
    };

    const handleScanResult = async (result: any) => {
        const data = result?.data;

        // Prevent processing the same data multiple times in quick succession
        if (data === lastScannedData.current) {
            return;
        }
        lastScannedData.current = data;

        setScanned(true);
        console.log("Scanned QR Code:", data);

        // the app vibrates when the qr code is successfully scanned
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);


        try {
            const storedData = await AsyncStorage.getItem("scannedCodes");
            const codes = storedData ? JSON.parse(storedData) : [];
            if (!codes.includes(data)) {
                codes.push(data);
                await AsyncStorage.setItem("scannedCodes", JSON.stringify(codes));
            }
        } catch (error) {
            console.error("Failed to save scan data", error);
        }

        // Reset lastScannedData after a short delay to allow new scans
        setTimeout(() => {
            lastScannedData.current = null;
        }, 2000); // 2-second cooldown
    };

    if (!authToken) {
        return (
            <View className="flex-1 justify-center items-center bg-[#f0f0f0] pb-10">
                <Text className="text-2xl text-center font-bold">
                    Please log in to scan QR codes
                </Text>
            </View>
        );
    }

    if (hasPermission === null) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Requesting camera permission...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>No access to camera</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 justify-center items-center bg-[#f0f0f0] pb-10">
            <View className="w-52 h-52 rounded-xl border-2 border-white overflow-hidden justify-center items-center">
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleScanResult}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "pdf417"],
                    }}
                    style={{width: 200, height: 200}}
                    enableTorch={torch}
                    zoom={0.7}
                />
            </View>

            {scanned && (
                <TouchableOpacity
                    onPress={() => setScanned(false)}
                    className="bg-[#92C4CE] px-4 py-3 rounded-lg mt-10"
                >
                    <Text className="text-white font-semibold text-base">
                        Tap to scan again
                    </Text>
                </TouchableOpacity>
            )}

            {/*optional, torch might not be needed at all*/}
            <TouchableOpacity onPress={() => setTorch(prev => !prev)} className="mt-4">
                <Text className="font-semibold text-xl"
                style={{color: colors.secondary}}>
                    {torch ? 'Turn Off Flashlight' : 'Turn On Flashlight'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Scan;