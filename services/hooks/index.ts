import { AppState } from "react-native";
import log from "../../services/log";
import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { ElexonRangeParams } from "../../common/types";
import {useNowSettlementPeriod} from "../hooks/useNowSettlementPeriod";

/*
useRefetchOnAppOrNetworkResume
Hook to refetch data when app resumes or network restored
*/
type UseRefetchOnAppOrNetworkResumeParams = {
  refetch: () => void;
  isLoading: boolean;
};
export const useRefetchOnAppOrNetworkResume = ({
  refetch,
  isLoading,
}: UseRefetchOnAppOrNetworkResumeParams) => {
  React.useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          if (!isLoading) {
            log.info(
              `useUnitGroupLiveQuery: appStateListener: active -- refetching`
            );
            refetch();
          }
        }
      }
    );
    return () => {
      appStateListener.remove();
    };
  }, []);
};


/*
useRecentHistoryElexonRange
Returns from and to corresponding to yesterday and tomorrow
*/
export const useRecentHistoryElexonRange = (): ElexonRangeParams => {
  const nowSettlementPeriod = useNowSettlementPeriod(60);
  const today = nowSettlementPeriod.settlementPeriod.settlementDate
  const yesterday = new Date(Date.parse(today) - 86400000).toISOString().slice(0, 10)
  const tomorrow = new Date(Date.parse(today) + 86400000).toISOString().slice(0, 10)
  return {
    from: yesterday,
    to: tomorrow
  }
}

/*
useInternetConnection
*/
export const useInternetConnection = () => {
  const [isConnected, setIsConnected] = React.useState<boolean|null>(true);
  React.useEffect(() => {
    const netInfoListener = NetInfo.addEventListener((state) => {
      console.log(`useInternetConnection: netInfoListener: ${state.isConnected}`);
      setIsConnected(state.isConnected);
    });
    return () => {
      netInfoListener();
    };
  });
  return {
    isConnected
  }
}