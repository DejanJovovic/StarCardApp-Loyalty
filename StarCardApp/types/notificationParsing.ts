export type OneSignalLike = {
    additionalData?: Record<string, any>;
    launchURL?: string;
    rawPayload?: { custom?: { u?: string } };
    [k: string]: any;
};

// Extract programId from notification payload
export const extractProgramId = (n?: OneSignalLike, evt?: any): string | undefined => {
    const fromData = n?.additionalData?.programId;
    if (fromData) return String(fromData);

    const lu =
        evt?.notification?.launchURL ??
        n?.launchURL ??
        n?.additionalData?.app_url ??
        n?.rawPayload?.custom?.u;

    if (!lu || typeof lu !== "string") return undefined;

    try {
        const qs = lu.split("?")[1] ?? "";
        const pid = new URLSearchParams(qs).get("programId");
        if (pid) return String(pid);
    } catch {}

    return undefined;
};

// Optional: get deep link URL for general navigation
export const getDeepLinkUrl = (n?: OneSignalLike, evt?: any): string | undefined => {
    return (
        evt?.notification?.launchURL ??
        n?.launchURL ??
        n?.additionalData?.app_url ??
        n?.rawPayload?.custom?.u
    );
};
