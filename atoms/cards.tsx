import React from "react";
import { Button, Card, Text } from "@rneui/themed";
import { GITHUB_REPO_LINK } from "../common/links";
import { Linking, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import log from "../services/log";
import { urls } from "../services/nav";

/*
IncompleteUnknownCategories
Render a card with a message asking for help to categorise the unknown balancing mechanism units.
*/
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
        All the Unknown values represents balancing mechanism units we haven't
        yet categorised. We need open-source contributions to complete this
        work.
      </Text>

      <View style={styles.spacer} />

      <Text>Please help us by contributing to the project on GitHub.</Text>

      <View style={styles.spacer} />

      <Button
        testID="github-repo-link"
        onPress={() => Linking.openURL(GITHUB_REPO_LINK)}
        icon={<FontAwesome name="github" size={24} color="white" />}
      />
    </Card>
  );
};

/*
UnknownUnitGroupCode
Render a card with a message saying we can't find the unit group.
*/
export const UnknownUnitGroupCode = () => {
  log.debug(`UnknownUnitGroupCode`);
  return (
    <Card>
      <Card.Title>
        <Text>Error</Text>
      </Card.Title>
      <Card.Divider />
      <Text>
        Cannot find details for this generator. Please check the URL and try
        again.
      </Text>
    </Card>
  );
};

/*
MissingScreen
Render a card with a message saying the screen doesn't exist.
*/
export const MissingScreen: React.FC = () => {
  log.debug(`MissingScreen`);
  return (
    <Card>
      <Card.Title>
        <Text>Error</Text>
      </Card.Title>
      <Card.Divider />
      <Text>This screen does not exist.</Text>
      <Card.Divider />
      <Button
        testID="reset-home-button"
        onPress={() => {
          Linking.openURL(urls.home);
        }}
      >
        Reset to Home screen
      </Button>
    </Card>
  );
};

type UnitListHeaderProps = {
  now?: Date;
};
export const UnitListHeader: React.FC<UnitListHeaderProps> = ({ now }) => {
  return (
    <Card containerStyle={styles.listHeaderCard}>
      {now ? (
        <Text>Live Individual Unit output at: {now.toLocaleTimeString()}</Text>
      ) : (
        <Text>Loading Individual Units</Text>
      )}
    </Card>
  );
};

type UnitGroupHistoryListHeaderComponentProps = {
  bmUnit: string;
  average: number;
};
export const UnitGroupHistoryListHeaderComponent: React.FC<
  UnitGroupHistoryListHeaderComponentProps
> = ({ bmUnit, average }) => {
  return (
    <Card containerStyle={styles.listHeaderCard}>
      <Card.Title>{bmUnit}</Card.Title>
      <Card.Divider />
      <Text>Upcoming Schedule</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  spacer: { height: 10 },
  listHeaderCard: {
    margin: 0,
    // padding: 0,
  },
});
