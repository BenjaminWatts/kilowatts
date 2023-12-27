import { onFetchUpdateAsync } from "../updates";
import React from "react";
import { AppState, AppStateStatus } from "react-native";


export const useCheckUpdates = () => {
   React.useEffect(() => {
    const subscription = AppState.addEventListener(
        "change",
        (nextAppState: AppStateStatus) => {
          if (nextAppState === "active") {
            if (!__DEV__) {
              onFetchUpdateAsync();
            }
          }
        }
      );
    if (!__DEV__) {
        onFetchUpdateAsync();
    }
    return () => subscription.remove();

   }, []);
   return null
};