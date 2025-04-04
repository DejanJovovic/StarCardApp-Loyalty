import {View, Text, TouchableOpacity} from "react-native";
import {useState, useCallback} from "react";
import {Camera, CameraView} from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "expo-router";


export function Scan() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [torch, setTorch] = useState(false);
    const [authToken, setAuthToken] = useState<string | null>(null);


    useFocusEffect(
        useCallback(() => {
            checkPermissionsAndAuth();
        }, []) // Empty dependency array to run only on screen focus
    );

    const checkPermissionsAndAuth = async () => {
        const token = await AsyncStorage.getItem("auth_token");
        setAuthToken(token);

        const {status} = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
    };

    const handleScanResult = async (result: any) => {
        setScanned(true);
        const data = result?.data;
        console.log("Scanned QR Code:", data);

        try {
            const storedData = await AsyncStorage.getItem("scannedCodes");
            const codes = storedData ? JSON.parse(storedData) : [];
            codes.push(data);
            await AsyncStorage.setItem("scannedCodes", JSON.stringify(codes));
        } catch (error) {
            console.error("Failed to save scan data", error);
        }
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
        </View>
    );
}

export default Scan;