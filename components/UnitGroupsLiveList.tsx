import React from "react";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import log from "../services/log";
import { urls } from "../services/nav";
import { CallForContributions, NoLiveUnits } from "../atoms/cards";
import { Refresh } from "../atoms/controls";
import { UnitGroupLive as ListItem } from "../atoms/list-items";
import { UnitGroupLevel } from "../common/types";
import { View, StyleSheet } from "react-native";
import { UnitsGroupMap } from "../atoms/maps";

type UnitGroupsLiveListProps = {
  hideMap: boolean;
  isLoading: boolean;
  refetch?: () => void;
  data: UnitGroupLevel[] | undefined | null;
};

export const UnitGroupsLiveList: React.FC<UnitGroupsLiveListProps> = ({
  hideMap,
  isLoading,
  refetch,
  data,
}) => {
  const router = useRouter();
  const [items, setItems] = React.useState<UnitGroupLevel[]>([]);

  return (
    <>
      {!hideMap && (
        <View style={styles.mapWrapper}>
          <UnitsGroupMap ugs={items} />
        </View>
      )}
      <View style={!hideMap ? styles.listWrapper : styles.listWrapperNoMap}>
        <FlashList
          testID='unit-groups-live-list'
          refreshControl={
            <Refresh refreshing={isLoading} onRefresh={refetch} />
          }
          ListEmptyComponent={NoLiveUnits}
          ListFooterComponent={CallForContributions}
          data={data}
          estimatedItemSize={1000}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 100,
          }}
          onViewableItemsChanged={(info) => 
            setItems(info.viewableItems.map((i) => i.item))
          }
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
      </View>
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
    height: "50%",
  },
});
