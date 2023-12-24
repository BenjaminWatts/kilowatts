// component to dismount live components when the app is in background

import React from "react";
import { AppState } from "react-native";
import { BackgroundScreen } from "../atoms/screens";
import log from "../services/log";


type ForegroundComponentProps = {
  children: React.ReactNode;
};

/*
ForegroundComponent
Uses the AppState API to determine if the app is in the foreground or background.
If in the background, renders BackgroundScreen.
If in the foreground, renders children.
*/
export const ForegroundComponent: React.FC<ForegroundComponentProps> = ({
  children,
}) => {
  const [appState, setAppState] = React.useState<string>(AppState.currentState);
  React.useEffect(() => {
    AppState.addEventListener("change", setAppState);
  }, []);
  if (appState !== "active") {
    log.info(`App is in background, rendering BackgroundScreen`);
    return <BackgroundScreen />;
  }
  log.info(`App is in foreground, rendering children`);
  return <>{children}</>;
};
