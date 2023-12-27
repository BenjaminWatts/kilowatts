import { Platform } from "react-native";

export const getPlatform = () => {
    return Platform.OS;
}

export const getSentry = () => {
    return Platform.select({
        ios: require("@sentry/react-native"),
        android: require("@sentry/react-native"),
        web: require("@sentry/react"),
    });
}