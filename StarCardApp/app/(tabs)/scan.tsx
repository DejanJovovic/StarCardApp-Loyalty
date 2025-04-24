import {View, TouchableOpacity, StyleSheet, Text, Image, Alert} from "react-native";
import React, {useState, useCallback, useRef} from "react";
import {Camera, CameraView} from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "expo-router";
import * as Haptics from "expo-haptics";
import colors from "@/constants/colors";
import icons from "@/constants/icons";
import CustomHeaderLoggedIn from "@/components/CustomHeaderLoggedIn";


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
        const {status} = await Camera.requestCameraPermissionsAsync();
        // has an error for some reason, but it doesnt cause crashes
        setHasPermission(status === "granted");
    };

    const checkAuth = async () => {
        const token = await AsyncStorage.getItem("auth_token");
        setAuthToken(token);
    };

    const handleScanResult = async (result: any) => {
        const data = result?.data;
        if (data === lastScannedData.current) return;

        lastScannedData.current = data;
        setScanned(true);
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        try {
            // Retrieve the stored scanned codes from AsyncStorage
            const storedData = await AsyncStorage.getItem("scannedCodes");
            const codes = storedData ? JSON.parse(storedData) : [];

            // Check if the QR code has already been scanned
            if (codes.includes(data)) {
                // Show alert if the QR code was already scanned
                Alert.alert(
                    "QR Code Already Scanned",
                    "Please try to scan a different QR code.",
                    [
                        {text: "OK", onPress: () => console.log("Duplicate scan attempt")},
                    ]
                );
                return; // Stop further processing if it's a duplicate
            }

            // Show the alert with Yes/No options if the QR code is new
            Alert.alert(
                "QR Code Scanned",
                `Add ${data} to your wallet?`,
                [
                    {
                        text: "No", // When "No" is pressed, just close the alert and do nothing
                        onPress: () => {
                            console.log("Scan discarded");
                        },
                        style: "cancel",
                    },
                    {
                        text: "Yes", // When "Yes" is pressed, process the scanned data
                        onPress: async () => {
                            // Save the scanned data to AsyncStorage
                            codes.push(data);
                            await AsyncStorage.setItem("scannedCodes", JSON.stringify(codes));

                            // Optionally, show another confirmation or success message
                            console.log("Scanned data saved:", data);
                        },
                    },
                ],
                {cancelable: false} // Make sure the alert cannot be dismissed by tapping outside
            );
        } catch (error) {
            console.error("Failed to process scan data", error);
        }

        // Reset lastScannedData after a short delay to prevent multiple quick scans
        setTimeout(() => {
            lastScannedData.current = null;
        }, 2000);
    };

    if (hasPermission === false) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>No access to camera</Text>
            </View>
        );
    }

    return (
        <View style={StyleSheet.absoluteFill} className="relative bg-white">
            <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 10}}>
                <CustomHeaderLoggedIn/>
            </View>

            <View className="px-6"
            style={{marginTop: 96}}>
                <Text style={{fontFamily:'Lexend-Zetta-Bold'}}>Scan QR Code</Text>
                <Text className="mt-1"
                style={{color: colors.secondary, fontFamily: 'Lexend-Deca-Medium'}}>Add a new Loyalty Program</Text>
            </View>

            <CameraView
                onBarcodeScanned={scanned ? undefined : handleScanResult}
                barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                style={[StyleSheet.absoluteFill, { top: 160 }]}
                enableTorch={torch}
                zoom={0.1}
            />

            <View className="absolute inset-0" style={{ top: 70 }}>
                <View className="absolute inset-0 justify-center items-center">
                    <View
                        style={{
                            width: 320,
                            height: 320,
                            borderRadius: 20,
                            borderWidth: 4,
                            borderColor: "#92C4CE",
                            backgroundColor: "transparent",
                        }}
                    />
                </View>
            </View>

            <View className="absolute bottom-32 left-6 right-6 flex-row justify-between items-center">
                <View>
                    {scanned && (
                        <TouchableOpacity
                            onPress={() => setScanned(false)}
                            className="bg-white p-3 rounded-full"
                        >
                            <Image
                                source={icons.qr_scanner}
                                style={{ width: 28, height: 28, tintColor: colors.secondary }}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                <View>
                    <TouchableOpacity
                        onPress={() => setTorch((prev) => !prev)}
                        className="bg-white p-3 rounded-full"
                    >
                        <Image
                            source={icons.flashlight}
                            style={{ width: 28, height: 28, tintColor: colors.secondary }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Scan;