import React from "react";
import { useFonts } from "expo-font";
import * as splash from "../splash";
import FontAwesome from "@expo/vector-icons/FontAwesome";



/* a reusable hook to load fonts and then hide the splash screen */
export const useSplash = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  React.useEffect(() => {
    if (loaded) {
      splash.hide();
    }
  }, [loaded]);

  return loaded;
};
