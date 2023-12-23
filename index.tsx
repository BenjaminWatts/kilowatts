import React from "react";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { Provider } from "react-redux";
import { Platform } from "react-native";
import { store } from "./services/state";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@rneui/themed";
import { WithLicense } from "./components/WithLicense";
import * as Updates from "expo-updates";
import { Alert, AppState, AppStateStatus } from "react-native";
import log from "./services/log";
import theme from "./services/theme";
import { useInternetConnection } from "./services/hooks";
import { Refresh } from "./atoms/controls";
import { NoInternetConnectionCard } from "./atoms/cards";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

/*
onFetchUpdateAsync() checks for updates from expo and downloads them if available.
*/
async function onFetchUpdateAsync() {
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

export const App = () => {
  const {isConnected} = useInternetConnection()

  //   React.useEffect(() => {
  //     if (__DEV__ && Platform.OS !== "web") {
  //       const rt = require("./services/reactotron").initReactotron;
  //       rt();
  //     }
  //   }, []);

  // on initial load, check for updates
  React.useEffect(() => {
    if (!__DEV__) {
      onFetchUpdateAsync();
    }
  }, []);

  // on resuming from background, check for updates
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
    return () => subscription.remove();
  }, []);

  const [loaded, error] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const ctx = require.context("./app");

  if (!loaded) {
    return null;
  }


  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {isConnected === null && <Refresh refreshing={true}/>}
          {isConnected === false && <NoInternetConnectionCard/>}
          {isConnected === true && (
          <WithLicense>
          <ExpoRoot context={ctx} />
        </WithLicense>
          )}
        </Provider>
      </ThemeProvider>
    </>
  );
};

registerRootComponent(App);
