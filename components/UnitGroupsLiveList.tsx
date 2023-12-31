import React from "react";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import log from "../services/log";
import { getUnitGroupUrl, urls } from "../services/nav";
import { NoLiveUnits } from "../atoms/cards";
import { Refresh } from "../atoms/controls";
import { UnitGroupLive as ListItem } from "../atoms/list-items";
import { UnitGroupLevel, UnitGroupMarker } from "../common/types";
import { View, StyleSheet, useWindowDimensions, Alert } from "react-native";
import { UnitsGroupMap } from "../atoms/maps";
import * as t from "../common/types";

type UnitGroupsLiveListProps = {
  hideMap: boolean;
  isLoading: boolean;
  refetch?: () => void;
  data: UnitGroupLevel[] | undefined | null;
};

const readViewableItems = (items: any[]) =>
  items.reduce((acc, item) => {
    const { coords, code, name, fuelType } = item.item.details;
    if (coords && code && name) {
      acc.push({
        code,
        title: name,
        fuelType,
        coordinate: {
          latitude: coords.lat,
          longitude: coords.lng,
        },
      });
    }
    return acc;
  }, []);

const readInitialItems = (items: any[]) =>
  items.reduce((acc, item) => {
    const { coords, code, name, fuelType } = item.details;
    if (coords && code && name) {
      acc.push({
        code,
        title: name,
        fuelType,
        coordinate: {
          latitude: coords.lat,
          longitude: coords.lng,
        },
      });
    }
    return acc;
  }, []);

export const UnitGroupsLiveList: React.FC<UnitGroupsLiveListProps> = ({
  hideMap,
  isLoading,
  refetch,
  data,
}) => {
  const router = useRouter();
  const [highlighted, setHighlighted] = React.useState<UnitGroupMarker | null>(
    null
  );
  const [mapItems, setMapItems] = React.useState<UnitGroupMarker[]>(
    data ? readInitialItems(data.slice(0, 10)) : []
  );
  const mapHeight = useWindowDimensions().height / 2;
  const onViewableItemsChanged = React.useCallback((info: any) => {
    log.debug("onViewableItemsChanged");
    setMapItems(readViewableItems(info.viewableItems));
  }, []);

  return (
    <>
      <>
        {!hideMap && (
          <View style={{ height: mapHeight }}>
            {data && (
              <UnitsGroupMap markers={mapItems} highlighted={highlighted} />
            )}
          </View>
        )}
      </>
      <FlashList
        testID="unit-groups-live-list"
        refreshControl={<Refresh refreshing={isLoading} onRefresh={refetch} />}
        estimatedItemSize={30}
        ListEmptyComponent={NoLiveUnits}
        data={data}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({ item, index }) => (
          <ListItem
            index={index}
            onHoverIn={() => {
              if (item.details.coords) {
                setHighlighted({
                  code: item.details.code,
                  title: item.details.name,
                  fuelType: item.details.fuelType,
                  coordinate: {
                    latitude: item.details.coords.lat,
                    longitude: item.details.coords.lng,
                  },
                });
              } else {
                setHighlighted(null);
              }
            }}
            onHoverOut={() => setHighlighted(null)}
            delta={item.delta}
            fuelType={item.details.fuelType}
            name={item.details.name}
            level={item.level}
            onPress={() => {
              const url = getUnitGroupUrl(item.details);
              if (url) {
                router.push(url as any);
              } else {
                Alert.alert('Sorry!', "We are working on providing a more detailed view for this in the future. ")
              }
            }}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  linkWrapper: {
    width: "100%",
  },
  listWrapper: {
    height: "50%",
  },
  listWrapperNoMap: {
    height: "100%",
  },
  mapWrapper: {
    height: 300,
    backgroundColor: "red",
  },
});
