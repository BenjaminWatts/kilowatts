import * as updates from "expo-updates";
import log from "./log";
import * as Updates from "expo-updates";
import { Alert } from "react-native";

/* Get the release channel from expo-updates or fallback to default */
export const getReleaseChannel = () => {
  const releaseChannel = updates.releaseChannel;
  return releaseChannel;
};

/*
onFetchUpdateAsync() checks for updates from expo and downloads them if available.
*/
export async function onFetchUpdateAsync() {
  log.debug("Checking for Expo updates...");
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      log.debug("Downloading Expo update...");
      await Updates.fetchUpdateAsync();
      log.debug("Reloading app...");
      Alert.alert("App updated", "The app will now reload.", [
        {
          text: "OK",
          onPress: () => Updates.reloadAsync(),
        },
      ]);
    } else {
      log.debug("No Expo update available.");
    }
  } catch (error) {
    // You can also add an alert() to see the error message in case of an error when fetching updates.
    log.error(`Error fetching latest Expo update: ${error}`);
  }
}
