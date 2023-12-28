import React from "react";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import log from "../services/log";
import { urls } from "../services/nav";
import { CallForContributions, NoLiveUnits } from "../atoms/cards";
import { Refresh } from "../atoms/controls";
import { UnitGroupLive as ListItem } from "../atoms/list-items";
import { UnitGroupLevel, UnitGroupMarker } from "../common/types";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { UnitsGroupMap } from "../atoms/maps";

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

  // const onLoad = React.useCallback(() => {
  //   if (data) {
  //     const max = Math.min(data.length, 10);
  //     setMapItems(readInitialItems(data.slice(0, max)));
  //   }
  // }, [data]);

  const onViewableItemsChanged = React.useCallback((info: any) => {
    console.log("onViewableItemsChanged");
    setMapItems(readViewableItems(info.viewableItems));
  }, [])

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
        ListFooterComponent={CallForContributions}
        // onLoad={onLoad}
        data={data}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}

        onViewableItemsChanged={onViewableItemsChanged}
        
        // onScrollEndDrag={onScrollEndDrag}
        // onMomentumScrollBegin={onMomentumScrollBegin}
        // onMomentumScrollEnd={onMomentumScrollEnd}


        renderItem={({ item, index }) => {
          const { fuelType, code } = item.details;
          return (
            <ListItem
              index={index}
              fuelType={fuelType}
              name={item.details.name}
              level={item.level}
              onPress={() => {
                if (code && fuelType !== "interconnector") {
                  router.push(urls.unitGroup(code));
                } else {
                  log.info(
                    `UnitGroupLiveWithSearch: not possible as no code or interconnector`
                  );
                }
              }}
            />
          );
        }}
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
