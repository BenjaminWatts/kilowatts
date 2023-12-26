import NetInfo from "@react-native-community/netinfo";

/*
useInternetConnection
*/
export const useInternetConnection = (): boolean | null => {
    return NetInfo.useNetInfo().isConnected
  }