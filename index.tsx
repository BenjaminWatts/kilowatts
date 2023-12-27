import React from "react";
import { registerRootComponent } from "expo";
import { theme, ThemeProvider } from "./services/theme";
import { InternetConnection } from "./components/InternetConnection";
import { ReduxProvider } from "./services/state";
import { useCheckUpdates } from "./services/hooks";
import { useInitMonitoring } from "./services/hooks/useInitMonitoring";
import { useSplash } from "./services/hooks/splash";

export const App = () => {
  useSplash();
  useInitMonitoring();
  useCheckUpdates();

  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider>
        <InternetConnection />
      </ReduxProvider>
    </ThemeProvider>
  );
};

registerRootComponent(App);
