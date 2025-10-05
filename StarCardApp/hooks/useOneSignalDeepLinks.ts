import * as Linking from "expo-linking";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { addToInbox } from "@/types/notificationInbox";
import { extractProgramId, getDeepLinkUrl } from "@/types/notificationParsing";
import { routeFromUrl, RouteTarget } from "@/types/routeDeepLink";
import React from "react";

type UseOneSignalDeepLinksOpts = {
    navigate: (to: RouteTarget) => void;
    onesignalAppId: string;
    debug?: boolean;
};

export const useStarCardOneSignal = ({
                                         navigate,
                                         onesignalAppId,
                                         debug,
                                     }: UseOneSignalDeepLinksOpts) => {
    const lastHandledUrl = { current: null as string | null };

    React.useEffect(() => {
        if (debug) OneSignal.Debug.setLogLevel(LogLevel.Verbose);

        // Initialize OneSignal
        OneSignal.initialize(onesignalAppId);

        // Prompt permission
        OneSignal.Notifications.requestPermission(true);

        // Handle notification click (background or closed)
        const handleClick = (event: any) => {
            const n = event?.notification;
            const programId = extractProgramId(n, event);
            const deepLinkUrl = getDeepLinkUrl(n, event);

            try {
                addToInbox({
                    id: `${Date.now()}-${Math.random()}`,
                    oneSignalId: n?.notificationId ?? n?.id,
                    title: n?.title,
                    message: n?.body,
                    programId,
                    deepLinkUrl,
                    imageUrl: (n as any)?.image,
                    receivedAt: Date.now(),
                    read: true,
                });
            } catch {}

            if (programId) {

            } else if (deepLinkUrl) {
                routeFromUrl(deepLinkUrl, navigate, lastHandledUrl);
            }
        };

        // Handle foreground notification
        const handleForeground = (evt: any) => {
            const n = evt?.notification;
            if (!n) return;

            const programId = extractProgramId(n, evt);
            const deepLinkUrl = getDeepLinkUrl(n, evt);

            try {
                addToInbox({
                    id: `${Date.now()}-${Math.random()}`,
                    oneSignalId: n?.notificationId ?? n?.id,
                    title: n?.title,
                    message: n?.body,
                    programId,
                    deepLinkUrl,
                    imageUrl: (n as any)?.image,
                    receivedAt: Date.now(),
                    read: false,
                });
            } catch {}
        };

        // Register OneSignal listeners
        OneSignal.Notifications.addEventListener("click", handleClick);
        OneSignal.Notifications.addEventListener("foregroundWillDisplay", handleForeground);

        // Deep link handling
        Linking.getInitialURL().then((initialUrl) => {
            if (initialUrl) routeFromUrl(initialUrl, navigate, lastHandledUrl);
        });
        const urlSub = Linking.addEventListener("url", (ev) =>
            routeFromUrl(ev.url, navigate, lastHandledUrl)
        );

        // Cleanup
        return () => {
            OneSignal.Notifications.removeEventListener("click", handleClick);
            OneSignal.Notifications.removeEventListener(
                "foregroundWillDisplay",
                handleForeground
            );
            urlSub.remove();
        };
    }, [navigate, onesignalAppId, debug]);
};