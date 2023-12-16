import React from "react";
import MapView, { Marker, Callout, Region } from "react-native-maps";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { unitGroups } from "../assets/data/units";
import { FuelTypeIcon } from "../atoms/icons";
import { Card, Text } from "@rneui/themed";
import { FuelType, UnitGroup } from "../common/types";
import log from "../services/log";
import { useUnitGroupLiveQuery } from "../services/state/elexon-insights-api.hooks";
import formatters from "../common/formatters";

const ICON_SIZE = 15;

/*
getIconBackgroundColor

Returns a colour for the background of the icon based on the fuel type.
  if renewable return green
  if nuclear or interconnector return white
  if fossil return red

@param fuelType FuelType

@return string

*/

const getIconBackgroundColor = (fuelType: FuelType): string => {
  switch (fuelType) {
    case "gas":
    case "oil":
    case "coal":
      return "rgba(255, 0, 0, 0.5)";
    case "biomass":
    case "wind":
    case "hydro":
    case "solar":
    case "battery":
      return "rgba(0, 255, 0, 0.5)";
    case "nuclear":
    case "interconnector":
      return "rgba(255, 255, 255, 0.5)";
    default:
      return "rgba(255, 255, 255, 0.5)";
  }
};

/*
initialRegion

The initial region for the map - spanning great britain

*/
const INITIAL_REGION_GB = {
  latitude: 54.2379, // Center latitude for Great Britain
  longitude: -2.3704, // Center longitude for Great Britain
  latitudeDelta: 5, // Adjust this value to control the zoom level
  longitudeDelta: 5, // Adjust this value to control the zoom level
};

type CustomMarkerProps = {
  unitGroup: UnitGroup;
};

const CustomMarkerCallout: React.FC<CustomMarkerProps> = ({ unitGroup }) => {
  log.debug(`CustomMarkerCallout`);
  const { data, isLoading } = useUnitGroupLiveQuery({ unitGroup });
  return (
    <Callout>
      <Card>
        <Card.Title>
          {unitGroup.details.name} {data && formatters.mw(data.level)}
        </Card.Title>
        <Card.Divider />
        {isLoading && <ActivityIndicator />}
        {data && (
          <>
            {data.units.map((unit) => {
              <Text>
                {unit.unit.name ? unit.unit.name : unit.unit.bmUnit}{" "}
                {formatters.mw(unit.level)}
                {unit.level}
              </Text>;
            })}
          </>
        )}
      </Card>
    </Callout>
  );
};

const CustomMarker: React.FC<CustomMarkerProps> = ({ unitGroup }) => {
  log.debug(`CustomMarker`);
  const { coords, fuelType } = unitGroup.details;
  const coordinate = {
    latitude: coords.lat,
    longitude: coords.lng,
  };

  return (
    <Marker coordinate={coordinate} title={unitGroup.details.name}>
      <View
        style={[
          styles.markerContainer,
          { backgroundColor: getIconBackgroundColor(fuelType) },
        ]}
      >
        <FuelTypeIcon fuelType={fuelType} size={ICON_SIZE} />
      </View>
      <CustomMarkerCallout unitGroup={unitGroup} />
    </Marker>
  );
};

/*
handleRegionChange
@param newRegion Region
@param setCurrentRegion (region: Region) => void

takes newly requested region and checks if it is outside of the initial region.
if so, reverts to the initial region.
if not, updates the current region.

*/
const handleRegionChange = (
  newRegion: Region,
  setCurrentRegion: (region: Region) => void
) => {
  log.debug(`handleRegionChange`);
  // Check if the new region is outside of the initial region
  if (
    newRegion.latitude <
      INITIAL_REGION_GB.latitude - INITIAL_REGION_GB.latitudeDelta / 2 ||
    newRegion.latitude >
      INITIAL_REGION_GB.latitude + INITIAL_REGION_GB.latitudeDelta / 2 ||
    newRegion.longitude <
      INITIAL_REGION_GB.longitude - INITIAL_REGION_GB.longitudeDelta / 2 ||
    newRegion.longitude >
      INITIAL_REGION_GB.longitude + INITIAL_REGION_GB.longitudeDelta / 2
  ) {
    log.debug(`handleRegionChange: outside of initial region -- do nothing`);
    // If outside, revert to the initial region
    // setCurrentRegion(INITIAL_REGION_GB);
  } else {
    log.debug(
      `handleRegionChange: inside initial region -- update current region`
    );
    // If inside, update the current region
    setCurrentRegion(newRegion);
  }
};

export type UnitGroupsMapProps = {};

export const UnitGroupsMap: React.FC<UnitGroupsMapProps> = () => {
  const [region, setRegion] = React.useState(INITIAL_REGION_GB);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={(newRegion) => handleRegionChange(newRegion, setRegion)}
      >
        {unitGroups.map((unitGroup, index) => (
          <CustomMarker key={index} unitGroup={unitGroup} />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
});
