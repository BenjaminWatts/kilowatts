import React from "react";
import { Button, Card, Text } from "@rneui/themed";
import { GITHUB_REPO_LINK, GITHUB_UNIT_FILE_LINK } from "../common/links";
import { Linking, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const IncompleteUnknownCategories = () => {
  return (
    <Card>
      <Card.Title>
        <Text>Help us!</Text>
      </Card.Title>
      <Card.Divider />
      <Text>
        This open-source app is incomplete. We need help to categorise the
        hundreds of individual balancing mechnism units into the right
        categories, giving them human readable names and plotting them on the
        map.
      </Text>

      <View style={styles.spacer} />

      <Text>
        All the Unknown values represents balancing mechanism units
       we haven't yet categorised. We need open-source contributions to complete this work.
      </Text>

      <View style={styles.spacer} />

      <Text>Please help us by contributing to the project on GitHub.</Text>

      <View style={styles.spacer} />

      <Button
        onPress={() => Linking.openURL(GITHUB_REPO_LINK)}
        icon={<FontAwesome name="github" size={24} color="white" />}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  spacer: { height: 10 },
});


export const NoMapsonWeb = () => {
  return (
    <Card>
      <Card.Title>
        <Text>Maps not supported on web</Text>
      </Card.Title>
      <Card.Divider />
      <Text>
        Maps are not supported on web. Please use the app on a mobile device.
      </Text>
    </Card>
  );
}