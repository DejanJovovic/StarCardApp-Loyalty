import {View, TouchableOpacity, StyleSheet, Text, Image, Alert, Modal} from "react-native";
import React, {useState, useCallback, useRef} from "react";
import {Camera, CameraView} from "expo-camera";
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "expo-router";
import * as Haptics from "expo-haptics";
import colors from "@/constants/colors";
import icons from "@/constants/icons";
import CustomHeaderLoggedIn from "@/components/CustomHeaderLoggedIn";
import images from "@/constants/images";


const Scan = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [torch, setTorch] = useState(false);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const lastScannedData = useRef(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [newScannedData, setNewScannedData] = useState<string | null>(null);

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
            const storedData = await AsyncStorage.getItem("scannedCodes");
            const codes = storedData ? JSON.parse(storedData) : [];

            if (codes.includes(data)) {
                Alert.alert(
                    "QR Code Already Scanned",
                    "Please try to scan a different QR code.",
                    [
                        {text: "OK", onPress: () => console.log("Duplicate scan attempt")},
                    ]
                );
                return;
            }

            setNewScannedData(data);
            setModalVisible(true);

        } catch (error) {
            console.error("Failed to process scan data", error);
        }

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
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000}}>
                    <CustomHeaderLoggedIn/>
                </View>

                <View className="px-6 mt-24">
                    <Text style={{fontFamily: 'Lexend-Zetta-Bold'}}>Scan QR Code</Text>
                    <Text className="mt-1" style={{color: colors.secondary, fontFamily: 'Lexend-Deca-Medium'}}>
                        Add a new Loyalty Program
                    </Text>
                </View>

                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleScanResult}
                    barcodeScannerSettings={{barcodeTypes: ["qr"]}}
                    style={[StyleSheet.absoluteFill, {top: 160}]}
                    enableTorch={torch}
                    zoom={0.1}
                />

                <View className="absolute inset-0" style={{top: 70}}>
                    <View className="absolute inset-0 justify-center items-center">
                        <View
                            style={{
                                width: 320,
                                height: 320,
                                borderRadius: 20,
                                borderWidth: 4,
                                borderColor: "white",
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
                                    style={{width: 28, height: 28, tintColor: colors.secondary}}
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
                                style={{width: 28, height: 28, tintColor: colors.secondary}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="rounded-3xl overflow-hidden items-center">
                        <View style={{position: "relative", width: 320, height: 360}}>
                            <Image
                                source={images.scanCardImage}
                                style={{width: 320, height: 480, resizeMode: "cover", borderRadius: 24}}
                            />
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={{
                                    position: "absolute",
                                    top: 12,
                                    right: 12,
                                    padding: 6,
                                    backgroundColor: "white",
                                    borderRadius: 999,
                                    zIndex: 10,
                                }}
                            >
                                <Image
                                    source={icons.x_icon}
                                    style={{width: 18, height: 18, tintColor: "#92C4CE"}}
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            className="bg-[#92C4CE] py-4 rounded-full"
                            style={{width: 320, marginTop: 150}}
                            onPress={async () => {
                                try {
                                    const storedData = await AsyncStorage.getItem("scannedCodes");
                                    const codes = storedData ? JSON.parse(storedData) : [];

                                    if (!codes.includes(newScannedData)) {
                                        Alert.alert(
                                            "Success",
                                            "Program has been added to your wallet.",
                                            [
                                                {
                                                    text: "OK",
                                                    onPress: async () => {
                                                        codes.push(newScannedData);
                                                        await AsyncStorage.setItem("scannedCodes", JSON.stringify(codes));
                                                        console.log("Scanned data saved:", newScannedData);

                                                        setModalVisible(false);
                                                        setScanned(true);
                                                    }
                                                }
                                            ],
                                            {cancelable: false}
                                        );
                                    } else {
                                        Alert.alert("Already added!", "This program is already in your wallet.");
                                    }
                                } catch (error) {
                                    console.error("Error saving program:", error);
                                }
                            }}
                        >
                            <Text className="text-center"
                                  style={{color: 'white', fontSize: 16, fontFamily: 'Lexend-SemiBold'}}>ADD
                                PROGRAM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default Scan;