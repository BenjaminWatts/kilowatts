import { AppState } from "react-native";
import { getSettlementPeriod } from "../common/utils";
import log from "../services/log";
import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { ElexonRangeParams } from "../common/types";

/*
useNowTime
*/
export const useNowTime = (updateIntervalSecs: number) => {
  const [nowTime, setNowTime] = React.useState(new Date());
  React.useEffect(() => {
    log.debug(`useUnitGroupLiveQuery: mounting`);
    const interval = setInterval(() => {
      log.debug(`useUnitGroupLiveQuery: updating nowTime`);
      setNowTime(new Date());
    }, updateIntervalSecs * 1000);
    return () => {
      log.debug(`useUnitGroupLiveQuery: dismounting`);
      clearInterval(interval);
    };
  }, []);
  return nowTime;
};

/*
useNowSettlementPeriod
*/
export const useNowSettlementPeriod = (updateIntervalSecs: number) => {
  const now = useNowTime(updateIntervalSecs);
  return {
    now,
    settlementPeriod: getSettlementPeriod(now.toISOString()),
  };
};

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
  // retry if internet restored

  // React.useEffect(() => {
  //   const netInfoListener = NetInfo.addEventListener((state) => {
  //     if (state.isConnected && !isLoading) {
  //       log.debug(
  //         `useUnitGroupLiveQuery: netInfoListener: reconnected, refetching`
  //       );
  //       refetch();
  //     }
  //   });
  //   return () => {
  //     netInfoListener();
  //   };
  // });
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