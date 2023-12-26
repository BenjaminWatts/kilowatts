import { AppState } from "react-native";
import React from "react";

/* fires the refetch callback if the app is resumed and the status isLoading is false*/
type UseRefetchOnAppOrNetworkResumeParams = {
  refetch: () => void;
  isLoading: boolean;
};
export const useRefetchOnAppOrNetworkResume = ({
  refetch,
  isLoading,
}: UseRefetchOnAppOrNetworkResumeParams) => {
  React.useEffect(() => {
    const listener = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active" && !isLoading) {
        refetch();
      }
    });
    return () => {
      listener.remove();
    };
  }, []);
};
