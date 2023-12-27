import React from "react";
import { initSentry } from "../sentry";
import { Platform } from "react-native";

/* hook called at app initialisation to load sentry (in prod) or reactotron (in dev)*/
export const useInitMonitoring = () => {
  React.useEffect(() => {
    if (__DEV__ && Platform.OS !== "web") {
      require("../reactotron")
    }
    if (!__DEV__) {
      initSentry();
    }
  }, []);
};
