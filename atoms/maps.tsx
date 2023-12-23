import React from "react";
import MapView, { Marker } from "react-native-maps";
import { UnitGroup } from "../common/types";
import log from "../services/log";
import { StyleSheet } from "react-native";

type UnitGroupMapProps = {
  ug: UnitGroup;
};

export const UnitGroupMap: React.FC<UnitGroupMapProps> = ({ ug }) => {
  log.debug(`UnitGroupMap: ${ug.details.name}`);
  const { coords } = ug.details;
  if (!coords) return <></>;
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
        description={ug.details.name}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapCardContainer: {
    display: 'flex',
    flex: 1,
    height: '50%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
