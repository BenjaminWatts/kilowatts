import React from "react";
import MV, { MapViewProps, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { UnitGroup, UnitGroupLevel } from "../common/types";
import log from "../services/log";
import { Platform, StyleSheet } from "react-native";
import formatters from "../common/formatters";
import { FuelTypeIcon } from "./icons";
import { useRouter } from "expo-router";
import { urls } from "../services/nav";

type UnitGroupMapProps = {
  ug: UnitGroup;
};

const getMapProvider = () => {
  if (Platform.OS === "android") {
    return PROVIDER_GOOGLE;
  }
  return undefined;
};

const MapView = (props: MapViewProps) => (
  <MV provider={getMapProvider()} {...props} />
);

export const UnitGroupMap: React.FC<UnitGroupMapProps> = ({ ug }) => {
  log.debug(`UnitGroupMap: ${ug.details.name}`);
  const { coords, name } = ug.details;
  if (!coords || !name) return <></>;
  const coordinate = {
    latitude: coords.lat,
    longitude: coords.lng,
  };
  return (
    <MapView
      scrollEnabled={false}
      style={styles.mapCardContainer}
      initialRegion={{
        ...coordinate,
        latitudeDelta: 0.0922 * 15,
        longitudeDelta: 0.0421 * 15,
      }}
    >
      <Marker
        coordinate={coordinate}
        title={ug.details.name}
        description={ug.details.fuelType}
      />
    </MapView>
  );
};

type UnitsGroupMapProps = {
  ugs: UnitGroupLevel[];
};

export const UnitsGroupMap: React.FC<UnitsGroupMapProps> = ({ ugs }) => {
  const router = useRouter();
  return (
    <MapView
      scrollEnabled={false}
      zoomEnabled={false}
      rotateEnabled={false}
      zoomTapEnabled={false}
      // cacheEnabled={true}
      style={styles.mapCardContainer}
      initialRegion={{
        latitude: 54.5,
        longitude: -2,
        latitudeDelta: 9,
        longitudeDelta: 12,
      }}
    >
      {ugs
        .filter((ugs) => ugs.details.coords !== undefined)
        .map((ugs) => {
          const { coords, code, name } = ugs.details;
          if (!coords || !code || !name) return null;
          return (
            <Marker
              onPress={() => {
                router.push(urls.unitGroup(ugs.details.code));
              }}
              key={ugs.details.code ? ugs.details.code : ugs.details.name}
              coordinate={{
                latitude: coords.lat,
                longitude: coords.lng,
              }}
              title={ugs.details.name}
              description={`${formatters.fuelType(ugs.details.fuelType)}`}
            >
              <FuelTypeIcon fuelType={ugs.details.fuelType} size={20} />
            </Marker>
          );
        })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapCardContainer: {
    display: "flex",
    flex: 1,
    height: "50%",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
