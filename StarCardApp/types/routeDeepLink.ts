export type RouteTarget = { screen: string; params?: Record<string, string> };

// Parse app URL into a screen and params
export const parseAppUrl = (url: string): RouteTarget | undefined => {
    if (!url) return;
    const [, rest = ""] = url.split("://");
    const [pathPart = "", query = ""] = rest.split("?");
    const screen = pathPart.startsWith("/") ? pathPart.slice(1) : pathPart;
    const params: Record<string, string> = {};
    if (query) {
        for (const kv of query.split("&")) {
            if (!kv) continue;
            const [k, v = ""] = kv.split("=");
            params[decodeURIComponent(k)] = decodeURIComponent(v);
        }
    }
    return { screen, params };
};

// Navigate from a URL if needed
export const routeFromUrl = (
    url: string,
    navigate: (to: RouteTarget) => void,
    dedupeKey?: { current: string | null }
) => {
    if (!url) return;
    if (dedupeKey && dedupeKey.current === url) return;
    if (dedupeKey) dedupeKey.current = url;

    const target = parseAppUrl(url);
    if (target) navigate(target);
};
