import React from "react";
import MV, { MapViewProps, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  UnitGroupMapProps,
  UnitGroupMarker,
  UnitsGroupMapProps,
} from "../common/types";
import { Platform, StyleSheet, useWindowDimensions } from "react-native";
import formatters from "../common/formatters";
import { FuelTypeIcon } from "./icons";
import { getUnitGroupUrl } from "../services/nav";
import { useRouter } from "expo-router";
import log from "../services/log";

const getMapProvider = () => {
  if (Platform.OS === "android") {
    return PROVIDER_GOOGLE;
  }
  return undefined;
};

const MapView = (props: MapViewProps) => {
  return (
    <MV
      provider={getMapProvider()}
      {...props}
      // liteMode={true}
      mapType={Platform.select({
        ios: "mutedStandard",
        android: "hybrid",
      })}
    />
  );
};

export const UnitGroupMap: React.FC<UnitGroupMapProps> = ({ ug }) => {
  log.info(`UnitGroupMap: ${ug.details.name}`);
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
  log.debug(`UnitsGroupMap: ${markers.length}`);
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const LATITUDE_DELTA = 9;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / (height * 0.5));

  const onPress = React.useCallback(
    (marker: UnitGroupMarker) => {
      () => {
        const url = getUnitGroupUrl(marker);
        if (!url) return;
        router.push(url as any);
      };
    },
    [router]
  );

  const renderMarker = React.useCallback(
    (marker: UnitGroupMarker) => {
      return (
        <Marker
          key={marker.code}
          onPress={() => onPress(marker)}
          {...marker}
          description={`${formatters.fuelType(marker.fuelType)}`}
        >
          <FuelTypeIcon fuelType={marker.fuelType} size={20} />
        </Marker>
      );
    },
    [router]
  );

  return (
    <MapView
      scrollEnabled={false}
      zoomEnabled={false}
      rotateEnabled={false}
      zoomTapEnabled={false}
      style={styles.mapCardContainer}
      initialRegion={{
        latitude: 54.25,
        longitude: -2,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
    >
      {markers.map((marker) => renderMarker(marker))}
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
