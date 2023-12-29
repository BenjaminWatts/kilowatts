import React from "react";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import log from "../services/log";
import { getUnitGroupUrl, urls } from "../services/nav";
import { NoLiveUnits } from "../atoms/cards";
import { Refresh } from "../atoms/controls";
import { UnitGroupLive as ListItem } from "../atoms/list-items";
import { UnitGroupLevel, UnitGroupMarker } from "../common/types";
import { View, StyleSheet, useWindowDimensions } from "react-native";
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
  const [mapItems, setMapItems] = React.useState<UnitGroupMarker[]>(
    data ? readInitialItems(data.slice(0, 10)) : []
  );
  const mapHeight = useWindowDimensions().height / 2;
  const onViewableItemsChanged = React.useCallback((info: any) => {
    console.log("onViewableItemsChanged");
    setMapItems(readViewableItems(info.viewableItems));
  }, []);

  return (
    <>
      <>
        {!hideMap && (
          <View style={{ height: mapHeight }}>
            {data && <UnitsGroupMap markers={mapItems} />}
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
            fuelType={item.details.fuelType}
            name={item.details.name}
            level={item.level}
            onPress={() => {
              const url = getUnitGroupUrl(item.details);
              if (url) {
                router.push(url as any);
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
