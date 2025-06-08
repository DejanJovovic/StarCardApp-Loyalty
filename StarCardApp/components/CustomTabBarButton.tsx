import React, { useEffect, useRef, useState } from "react";
import {Animated, Easing, GestureResponderEvent, Image, Pressable, View} from "react-native";
import { useNavigationState } from "@react-navigation/native";

type Props = {
    onPress?: (event: GestureResponderEvent) => void;
    icon: any;
    iconActive: any;
    iconHovered: any;
    routeName: string;
};

export default function CustomTabBarButton({
                                               onPress,
                                               icon,
                                               iconActive,
                                               iconHovered,
                                               routeName,
                                           }: Props) {
    const [isPressed, setIsPressed] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    const bounceEase = Easing.bezier(0.34, 1.56, 0.64, 1); // smoother bounce
    const bounceAnim = useRef<Animated.CompositeAnimation | null>(null);
    const isBouncing = useRef(false);

    const focused = useNavigationState(
        (state) => state.routes[state.index].name === routeName
    );

    const startBounce = () => {
        if (isBouncing.current) return;

        isBouncing.current = true;
        bounceAnim.current = Animated.loop(
            Animated.sequence([
                Animated.spring(translateY, {
                    toValue: -15,
                    speed: 1.5,
                    bounciness: 20,
                    useNativeDriver: true,
                }),
                Animated.spring(translateY, {
                    toValue: -10,
                    speed: 1.5,
                    bounciness: 20,
                    useNativeDriver: true,
                }),
            ])
        );
        bounceAnim.current.start();
    };

    const stopBounce = () => {
        bounceAnim.current?.stop();
        isBouncing.current = false;
        Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: focused ? 1.1 : 1,
            useNativeDriver: true,
        }).start();

        if (focused) {
            startBounce();
        } else {
            stopBounce();
        }
    }, [focused]);

    const currentIcon = focused
        ? iconActive
        : isPressed
            ? iconHovered
            : icon;

    const iconSize = focused ? 80 : 70;

    return (
        <Pressable
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={onPress ?? (() => {})}
            style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 25,
            }}
        >
            <Animated.View
                style={{
                    transform: [{ scale: scaleAnim }, { translateY }],
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    source={currentIcon}
                    style={{
                        width: iconSize,
                        height: iconSize,
                        resizeMode: "contain",
                    }}
                />
            </Animated.View>
        </Pressable>
    );
}