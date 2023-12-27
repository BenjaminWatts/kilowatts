import React from "react";
import { useSplash } from "../services/hooks/splash";
import * as splash from "../services/splash";

type SplashProps = {
  children: React.ReactNode;
};

splash.init();

/*Wrapper to load the splash screen, and then dismount once the fonts have loaded*/
export const Splash: React.FC<SplashProps> = ({ children }) => {
  const loaded = useSplash();
  if (!loaded) return null;
  return <>{children}</>;
};
