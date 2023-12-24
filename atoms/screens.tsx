import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, View } from "react-native";
import log from "../services/log";

/*
BackgroundScreen
Rendered when the app is in the background.
*/
export const BackgroundScreen: React.FC = () => {
  log.info(`Rendering BackgroundScreen`);
  return (
    <SafeAreaView style={styles.container} testID="background-screen">
      <View
        style={styles.imageWrapper}
        testID="background-screen-image-wrapper"
      >
        <Image
          testID="background-screen-image"
          style={styles.image}
          source={require("../assets/images/icon.png")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },
  imageWrapper: { height: "50%", width: "100%" },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
