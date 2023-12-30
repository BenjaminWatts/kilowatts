import React from "react";
import { registerRootComponent } from "expo";
import { theme, ThemeProvider } from "./services/theme";
import { ReduxProvider } from "./services/state";
import { useCheckUpdates } from "./services/hooks";
import { useInitMonitoring } from "./services/hooks/useInitMonitoring";
import { useSplash } from "./services/hooks/splash";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ExpoRoot } from "expo-router";

export const App = () => {
  useSplash();
  useInitMonitoring();
  useCheckUpdates();
  const ctx = require.context("./app");
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <ReduxProvider>
            <ExpoRoot context={ctx} />
        </ReduxProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

registerRootComponent(App);
