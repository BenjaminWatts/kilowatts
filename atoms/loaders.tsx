import React from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "@rneui/themed";

export const Loader = () => {
  return (
    <View style={styles.loader}>
      <Skeleton style={styles.skeleton} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  skeleton: {
    height: "90%",
    width: "90%",
  },
});
