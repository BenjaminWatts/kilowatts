import React, { useMemo } from "react";
import log from "../services/log";
import { UnitGroupLiveList } from "./UnitGroupsLiveList";
import { SearchUnitGroups } from "../atoms/inputs";
import { Platform, StyleSheet, View } from "react-native";
import { urls } from "../services/nav";
import { Refresh } from "../atoms/controls";
import { FuelType, UnitGroupLevel } from "../common/types";
import { londonTimeHHMMSS } from "../common/utils";
import { UnitsGroupMap } from "../atoms/maps";
import {useNavigation, useRouter} from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { NoLiveUnits, CallForContributions } from "../atoms/cards";
import {UnitGroupLive as ListItem} from "../atoms/list-items";
import { useUnitGroupsLiveQuery } from "../services/state/api/elexon-insights-api.hooks";

type UnitGroupsLiveProps = {
  fuelType?: FuelType;
};
export const UnitGroupsLive: React.FC<UnitGroupsLiveProps> = ({ fuelType }) => {
  log.debug(`UnitGroupsLive`);
  const [search, setSearch] = React.useState("");

  return (
    <>
      <SearchUnitGroups value={search} onChangeText={setSearch} />
      <UnitGroupLiveList search={search} fuelType={fuelType} />
    </>
  );
};

type UnitGroupLiveWithSearchProps = UnitGroupsLiveProps & {
  search: string;
};

export const UnitGroupLiveWithSearch: React.FC<
  UnitGroupLiveWithSearchProps
> = ({ search, fuelType }) => {
  const query = useUnitGroupsLiveQuery();

  const { data, now, isLoading, refetch } = query;
  const filteredData = useMemo(() => {
    if (!data) return data;

    return data.filter((d) => {
      const nameMatch =
        search === "" ||
        d.details.name.toLowerCase().includes(search.toLowerCase());
      const fuelTypeMatch = !fuelType || d.details.fuelType === fuelType;
      return nameMatch && fuelTypeMatch;
    });
  }, [data, search, fuelType]);

  const nav = useNavigation();

  React.useEffect(() => {
    if (now) {
      nav.setOptions({
        title: `Live Output: ${londonTimeHHMMSS(now)}`,
      });
    }
  }, [query.now]);

  return (
    <UnitGroupsLiveList
      hideMap={search !== "" || Platform.OS === "web"}
      isLoading={isLoading}
      refetch={refetch}
      data={filteredData}
    />
  );
};

type UnitGroupsLiveListProps = {
  hideMap: boolean;
  isLoading: boolean;
  refetch?: () => void;
  data: UnitGroupLevel[] | undefined | null;
};

const UnitGroupsLiveList: React.FC<UnitGroupsLiveListProps> = ({
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
          onViewableItemsChanged={(info) => {
            setItems(info.viewableItems.map((i) => i.item));
          }}
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
