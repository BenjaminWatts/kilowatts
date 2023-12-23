import React from "react";
import { Button, Card, Text } from "@rneui/themed";
import { Linking, SafeAreaView, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import log from "../services/log";
import { urls } from "../services/nav";
import { londonTimeHHMMSS } from "../common/utils";
import { useRouter } from "expo-router";
import { FuelTypeLiveCompleteness } from "../common/types";

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
        onPress={() => Linking.openURL(urls.githubRepo)}
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

type FuelTypeNotAllowedProps = {
  fuelType: string;
};
/*
FuelTypeNotAllowed
Render a card with a message saying we can't find the unit group.
*/
export const FuelTypeNotAllowed: React.FC<FuelTypeNotAllowedProps> = ({
  fuelType,
}) => {
  log.debug(`FuelTypeNotAllowed`);
  return (
    <SafeAreaView>
      <Card>
        <Card.Title>
          <Text>{fuelType} not available</Text>
        </Card.Title>
        <Card.Divider />
        <Text>
          Cannot view live generation for {fuelType} unitsd. Please check the URL and try again.
        </Text>
      </Card>
    </SafeAreaView>
  );
};

/*
MissingScreen
Render a card with a message saying the screen doesn't exist.
*/
export const MissingScreen: React.FC = () => {
  log.debug(`MissingScreen`);
  const router = useRouter();
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
          router.replace(urls.home);
        }}
        title='Go to Home Screen'
      />
    </Card>
  );
};

type UnitListHeaderProps = {
  now?: Date;
};

/*
UnitListHeader
Render a card with either a loading message or the london time of the latest update
*/
export const UnitListHeader: React.FC<UnitListHeaderProps> = ({ now }) => {
  const props = { testID: "unit-list-header-text" };
  return (
    <Card containerStyle={styles.listHeaderCard}>
      {now ? (
        <Text {...props} testID="unit-list-header-text">
         Live Output: {londonTimeHHMMSS(now)}
        </Text>
      ) : (
        <Text {...props}>Loading individual unit data</Text>
      )}
    </Card>
  );
};

type UnitGroupHistoryListHeaderComponentProps = {
  bmUnit: string;
};

/*
UnitGroupScheduleHeader
Render a card with the unit group name and the words "Upcoming Schedule"
*/
export const UnitGroupScheduleHeader: React.FC<
  UnitGroupHistoryListHeaderComponentProps
> = ({ bmUnit }) => {
  return (
    <Card containerStyle={styles.listHeaderCard}>
      <Text>Unit {bmUnit} schedule</Text>
    </Card>
  );
};

/*
EmptyScheduleCard

*/
export const EmptyScheduleCard: React.FC = () => {
  return (
    <Card containerStyle={styles.listHeaderCard}>
      <Card.Title>No Scheduled Output</Card.Title>
      <Card.Divider />
      <Text>
        None of the units are expected to generate/consume of the coming hours
      </Text>
      <View style={styles.spacer} />
      <Text>They may be under maintenance.</Text>
    </Card>
  );
};

/*
No Live Units Found

*/
export const NoLiveUnits: React.FC = () => {
  return (
    <Card containerStyle={styles.listHeaderCard}>
      <Card.Title>No Units Found</Card.Title>
      <Card.Divider />
      <Text>There are no units available with live data.</Text>
      <View style={styles.spacer} />
      <Text>
        At the present time, many smaller generators connected to local
        distribution grids do not publish live information.
      </Text>
    </Card>
  );
};

/*
ApiError
*/
type ApiErrorProps = {
  refetch: () => void;
};
export const ApiErrorCard: React.FC<ApiErrorProps> = ({ refetch }) => {
  return (
    <Card>
      <Card.Title>
        <Text>API Error</Text>
      </Card.Title>
      <View style={styles.spacer} />

      <Text>
        There was an error fetching/interpreting data from the Elexon API.
        Please try again later.
      </Text>

      <View style={styles.spacer} />

      <Button onPress={refetch} title='Try Again'/>
    </Card>
  );
};

export const NoInternetConnectionCard: React.FC = () => {
  return (
    <SafeAreaView>
      <Card>
        <Card.Title>
          <Text>No Internet Connection</Text>
        </Card.Title>
        <View style={styles.spacer} />

        <Text>
          To function, the app needs a live internet connection to get the
          latest market information.
        </Text>
        <Text>Please check your internet connection and try again.</Text>

        <View style={styles.spacer} />
      </Card>
    </SafeAreaView>
  );
};

export const FuelTypeCompletenessListHeader: React.FC<{completeness: FuelTypeLiveCompleteness}> = ({completeness}) => {
  const {bm, embedded} = completeness;
  return (
    <Card containerStyle={styles.listHeaderCard}>
      {(bm && embedded) && <Text>Includes Balancing Mechanism units and latest ESO embedded wind/solar forecast volumes.</Text>}
      {(bm && !embedded) && <Text>Includes units participating in the Balancing Mechanism.</Text>}
    </Card>
  );
}

const styles = StyleSheet.create({
  spacer: { height: 10 },
  listHeaderCard: {
    margin: 0,
    // padding: 0,
  },
});
