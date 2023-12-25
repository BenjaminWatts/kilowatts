import React, { useState, useEffect, useMemo } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useUnitGroupsLiveQuery } from "../services/state/elexon-insights-api.hooks";
import { FlashList } from "@shopify/flash-list";
import * as at from "../atoms";
import { CallForContributions, NoLiveUnits } from "../atoms/cards";
import { SearchUnitGroups } from "../atoms/inputs";
import log from "../services/log";
import { StyleSheet, View } from "react-native";
import { urls } from "../services/nav";
import { Refresh } from "../atoms/controls";
import { FuelType, UnitGroupLevel } from "../common/types";
import formatters from "../common/formatters";
import { ALLOW_LINK_FUELTYPES, londonTimeHHMMSS } from "../common/utils";
import { UnitsGroupMap } from "../atoms/maps";

type UnitGroupsLiveProps = {
  fuelType?: FuelType;
};
export const UnitGroupsLive: React.FC<UnitGroupsLiveProps> = ({ fuelType }) => {
  log.debug(`UnitGroupsLive`);
  const nav = useNavigation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    nav.setOptions({
      title: fuelType
        ? `${formatters.fuelType(fuelType)} Live Output`
        : "Live Output",
    });
  }, []);

  return (
    <>
      <SearchUnitGroups value={search} onChangeText={setSearch} />
      <UnitGroupLiveWithSearch search={search} fuelType={fuelType} />
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

  useEffect(() => {
    if (now) {
      nav.setOptions({
        title: `Live Output: ${londonTimeHHMMSS(now)}`,
      });
    }
  }, [query.now]);

  return (
    <UnitGroupsLiveList
      hideMap={search !== ""}
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
  const [items, setItems] = useState<UnitGroupLevel[]>([]);

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
              <at.listItems.GeneratorLive
                index={index}
                fuelType={fuelType}
                name={item.details.name}
                level={item.level}
                onPress={() => {
                  if (code && ALLOW_LINK_FUELTYPES.includes(fuelType)) {
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
    paddingBottom: 30,
  },
  listWrapperNoMap: {
    height: "100%",
  },
  mapWrapper: {
    height: "50%",
  },
});
