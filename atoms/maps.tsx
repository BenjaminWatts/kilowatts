import React from "react";
import MV, { MapViewProps, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  UnitGroupMapProps,
  UnitGroupMarker,
  UnitsGroupMapProps,
} from "../common/types";
import { Platform, StyleSheet } from "react-native";
import formatters from "../common/formatters";
import { FuelTypeIcon } from "./icons";
import { getUnitGroupUrl } from "../services/nav";
import { useRouter } from "expo-router";

const getMapProvider = () => {
  if (Platform.OS === "android") {
    return PROVIDER_GOOGLE;
  }
  return undefined;
};

const MapView = (props: MapViewProps) => (
  <MV
    provider={getMapProvider()}
    {...props}
    // cacheEnabled={true}
    liteMode={true}
    mapType={Platform.select({
      ios: "mutedStandard",
      android: "satellite",
    })}
  />
);

export const UnitGroupMap: React.FC<UnitGroupMapProps> = ({ ug }) => {
  console.log(`UnitGroupMap: ${ug.details.name}`);
  const { coords, name, fuelType } = ug.details;
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
      >
        <FuelTypeIcon fuelType={fuelType} size={20} />
      </Marker>
    </MapView>
  );
};

export const UnitsGroupMap: React.FC<UnitsGroupMapProps> = ({ markers }) => {
  const router = useRouter();

  return (
    <MapView
      scrollEnabled={false}
      zoomEnabled={false}
      rotateEnabled={false}
      zoomTapEnabled={false}
      style={styles.mapCardContainer}
      initialRegion={{
        latitude: 54.5,
        longitude: -2,
        latitudeDelta: 9,
        longitudeDelta: 12,
      }}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.code}
          onPress={() => {
            const url = getUnitGroupUrl(marker);
            if (!url) return;
            router.push(url as any);
          }}
          {...marker}
          description={`${formatters.fuelType(marker.fuelType)}`}
        >
          <FuelTypeIcon fuelType={marker.fuelType} size={20} />
        </Marker>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapCardContainer: {
    display: "flex",
    flex: 1,
    height: "50%",
  },
});
