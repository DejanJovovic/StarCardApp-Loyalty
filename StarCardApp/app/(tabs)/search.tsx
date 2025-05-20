import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Modal,
    TouchableWithoutFeedback, Alert
} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from 'react-native-safe-area-context';
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/colors";
import CustomHeaderLoggedIn from "@/components/CustomHeaderLoggedIn";
import images from "@/constants/images";
import icons from "@/constants/icons";

const Search = () => {
    const [query, setQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedLink, setSelectedLink] = useState("");

    const openModal = (image: any, link: string) => {
        setSelectedImage(image);
        setSelectedLink(link);
        setShowModal(true);
    };

    return (
        <SafeAreaView>
            <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} className="h-full">
                <View style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000}}>
                    <CustomHeaderLoggedIn/>
                </View>
                <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>

                    <View className="flex-col px-6 mt-10">
                        <Text style={{fontFamily: 'Lexend-Zetta-Bold', paddingTop: 62}}>Search</Text>
                        <Text className="mb-4"
                              style={{color: colors.secondary, fontFamily: 'Lexend-Deca-Medium'}}>
                            Find out available Loyalty Programs</Text>
                    </View>
                    <View className="w-[100%] self-center mt-5 px-6">
                        <View
                            className="rounded-full flex-row items-center pr-0"
                            style={{
                                backgroundColor: "#82BCC7",
                                height: 60,
                                paddingHorizontal: 12,
                            }}
                        >
                            <TextInput
                                value={query}
                                onChangeText={setQuery}
                                placeholder="Search"
                                placeholderTextColor="white"
                                className="flex-1 text-base text-white"
                                style={{
                                    fontFamily: "Lexend-Regular",
                                    fontSize: 15,
                                    paddingVertical: 8,
                                    paddingLeft: 12,
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                }}
                                style={{
                                    width: 66,
                                    height: 60,
                                    backgroundColor: "black",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 999,
                                }}
                            >
                                <Text style={{
                                    fontFamily: "Lexend-Regular",
                                    fontSize: 15,
                                    color: "white"
                                }}>Go</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex flex-col px-6 w-full mt-10">
                        <TouchableOpacity onPress={() => openModal(images.buzzSearch, "https://www.buzzsneakers.rs/")}>
                            <Image
                                source={images.buzzSearch}
                                resizeMode="contain"
                                style={{height: 100}}
                                className="w-full"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => openModal(images.ferdinandSearch, "https://www.ferdinandknedle.com/")} style={{marginTop: 20}}>
                            <Image
                                source={images.ferdinandSearch}
                                resizeMode="contain"
                                style={{height: 150}}
                                className="w-full"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => openModal(images.waterdropSearch, "https://waterdrop.rs/")} style={{marginTop: 20}}>
                            <Image
                                source={images.waterdropSearch}
                                resizeMode="contain"
                                style={{height: 100}}
                                className="w-full"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => openModal(images.lagunaSearch, "https://laguna.rs/")} style={{marginTop: 50}}>

                            <Image
                                source={images.lagunaSearch}
                                resizeMode="contain"
                                style={{height: 50}}
                                className="w-full"
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
            <Modal visible={showModal} animationType="fade" transparent>
                <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                    <View className="flex-1 justify-center items-center bg-transparent">
                        <TouchableWithoutFeedback onPress={() => { /* Do nothing to prevent closing modal when clicking inside */
                        }}>
                            <View
                                style={{
                                    width: '90%',
                                    maxWidth: 500,
                                    height: 530,
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    overflow: 'hidden',
                                    shadowColor: '#000',
                                    shadowOffset: {width: 0, height: 4},
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 10,
                                }}
                            >
                                {/* Top Section - White */}
                                <View className="bg-white flex-row justify-between items-start px-4 pt-4 pb-2">
                                    {selectedImage && (
                                        <Image
                                            source={selectedImage}
                                            style={{width: 112, height: 56}}
                                            resizeMode="contain"
                                        />
                                    )}
                                    <TouchableOpacity onPress={() => setShowModal(false)}>
                                        <Image
                                            source={icons.x_icon}
                                            style={{width: 24, height: 24, marginTop: 12}}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* Bottom Section - Black */}
                                <View style={{
                                    backgroundColor: 'black',
                                    flex: 1,
                                    paddingHorizontal: 24,
                                    paddingVertical: 16,
                                    justifyContent: 'space-between'
                                }}>
                                    <View>
                                        <Text
                                            style={{color: 'white', fontSize: 12, fontFamily: 'Lexend-SemiBold', marginBottom: 8}}>LOYALTY
                                            PROGRAMS</Text>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: 30,
                                            fontFamily: 'Lexend-Deca-Medium',
                                            lineHeight: 36,
                                            marginBottom: 8
                                        }}>
                                            -15%{'\n'}na prvu kupovinu
                                        </Text>

                                        <View style={{borderTopWidth: 1, borderColor: '#4B5563', marginVertical: 16}}/>

                                        <Text style={{
                                            color: 'white',
                                            fontSize: 12,
                                            fontFamily: "Lexend-Regular",
                                            lineHeight: 20,
                                            marginBottom: 12
                                        }}>
                                            Registruj se na <Text style={{fontFamily: "Lexend-SemiBold"}}>{selectedLink}</Text> i
                                            prilikom prve kupovine
                                            ostvari popust od neverovatnih <Text
                                            style={{fontFamily: "Lexend-SemiBold"}}>15%</Text> na bilo koji proizvod u nekoj od
                                            naših radnji.
                                        </Text>

                                        <Text style={{color: 'white', fontSize: 12, fontFamily: "Lexend-SemiBold"}}>
                                            NAPOMENA: <Text style={{fontFamily: "Lexend-Regular"}}>Ovaj program nije validan za
                                            ONLINE kupovinu.</Text>
                                        </Text>

                                        <View style={{borderTopWidth: 1, borderColor: '#4B5563', marginVertical: 16}}/>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: colors.secondary,
                                            paddingVertical: 12,
                                            borderRadius: 999,
                                            alignItems: 'center',
                                            marginTop: 24,
                                        }}
                                        onPress={() => {
                                            Alert.alert(
                                                "Success",
                                                "Program has been added to your wallet.",
                                                [
                                                    {
                                                        text: "OK",
                                                        onPress: () => {
                                                            setShowModal(false);
                                                        },
                                                    },
                                                ],
                                                { cancelable: false }
                                            );
                                        }}
                                    >
                                        <Text style={{color: 'white', fontFamily: "Lexend-SemiBold", fontSize: 16}}>ADD
                                            PROGRAM</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
}
export default Search;