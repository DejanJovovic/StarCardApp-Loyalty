import { useEffect } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 5000); // adjust based on GIF length

        return () => clearTimeout(timer);
    }, []);

    return (
        <View className="flex-1 bg-black">
            <StatusBar hidden />
            <Image
                source={require('@/assets/animations/scintro.gif')}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
                contentPosition="center"
            />
        </View>
    );
}