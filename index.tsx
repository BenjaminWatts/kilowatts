import React from "react";
import { registerRootComponent } from "expo";
import { theme, ThemeProvider } from "./services/theme";
import { InternetConnection } from "./components/InternetConnection";
import { ReduxProvider } from "./services/state";
import { useCheckUpdates } from "./services/hooks";
import { useInitMonitoring } from "./services/hooks/useInitMonitoring";
import { useSplash } from "./services/hooks/splash";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const App = () => {
  useSplash();
  useInitMonitoring();
  useCheckUpdates();

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <ReduxProvider>
          <InternetConnection />
        </ReduxProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

registerRootComponent(App);
