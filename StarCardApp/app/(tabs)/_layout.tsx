import {Tabs} from "expo-router";
import icons from "@/constants/icons";
import CustomTabBarButton from "@/components/CustomTabBarButton";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 90,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: "#000",
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    paddingBottom: 42,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    tabBarButton: (props) => (
                        <CustomTabBarButton
                            onPress={props.onPress}
                            icon={icons.homeMenuButton}
                            iconActive={icons.homeMenuButtonActive}
                            iconHovered={icons.homeMenuButtonHover}
                            routeName="home"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    headerShown: false,
                    tabBarButton: (props) => (
                        <CustomTabBarButton
                            onPress={props.onPress}
                            icon={icons.scanMenuButton}
                            iconActive={icons.scanMenuButtonActive}
                            iconHovered={icons.scanMenuButtonHover}
                            routeName="scan"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="wallet"
                options={{
                    headerShown: false,
                    tabBarButton: (props) => (
                        <CustomTabBarButton
                            onPress={props.onPress}
                            icon={icons.walletMenuButton}
                            iconActive={icons.walletMenuButtonActive}
                            iconHovered={icons.walletMenuButtonHover}
                            routeName="wallet"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarButton: (props) => (
                        <CustomTabBarButton
                            onPress={props.onPress}
                            icon={icons.searchMenuButton}
                            iconActive={icons.searchMenuButtonActive}
                            iconHovered={icons.searchMenuButtonHover}
                            routeName="search"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarButton: (props) => (
                        <CustomTabBarButton
                            onPress={props.onPress}
                            icon={icons.profileMenuButton}
                            iconActive={icons.profileMenuButtonActive}
                            iconHovered={icons.profileMenuButtonHover}
                            routeName="profile"
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="notifications"
                options={{
                    href: null,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="cards"
                options={{
                    href: null,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="reset-password"
                options={{
                    href: null,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="support"
                options={{
                    href: null,
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}