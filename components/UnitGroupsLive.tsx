import React, { useState, useEffect, useMemo } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useUnitGroupsLiveQuery } from "../services/state/elexon-insights-api.hooks";
import { FlashList } from "@shopify/flash-list";
import * as at from "../atoms";
import { IncompleteUnknownCategories, NoLiveUnits } from "../atoms/cards";
import { SearchUnitGroups } from "../atoms/inputs";
import log from "../services/log";
import { StyleSheet } from "react-native";
import { urls } from "../services/nav";
import { Refresh } from "../atoms/controls";
import { FuelType } from "../common/types";
import formatters from "../common/formatters";
import { londonTimeHHMMSS } from "../common/utils";

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
        : "Major Generators Live Output",
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
  const router = useRouter();
  const query = useUnitGroupsLiveQuery();

  const { data, now, isLoading, refetch } = query;
  const filteredData = useMemo(() => {
    if (!data) return data;
    if (search === "") {
      if (!fuelType) {
        return data;
      } else {
        return data.filter((d) => d.details.fuelType === fuelType);
      }
    }
    return data.filter((d) => {
      const searchMatch = d.details.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const fuelTypeMatch = fuelType ? d.details.fuelType === fuelType : true;
      return searchMatch && fuelTypeMatch;
    });
  }, [data, search]);

  const nav = useNavigation();

  useEffect(() => {
    nav.setOptions({
      title: now
        ? fuelType
          ? `${formatters.fuelType(fuelType)} Output: ${londonTimeHHMMSS(
              now
            )}`
          : `Major Generators Output: ${londonTimeHHMMSS(now)}`
        : "Loading...",
    });
  }, [query.now]);

  return (
    <FlashList
      refreshControl={<Refresh refreshing={isLoading} onRefresh={refetch} />}
      ListEmptyComponent={NoLiveUnits}
      ListFooterComponent={IncompleteUnknownCategories}
      data={filteredData}
      estimatedItemSize={1000}
      renderItem={({ item, index }) => {
        const { fuelType, code } = item.details;

        return (
          <at.listItems.GeneratorLive
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
  );
};

const styles = StyleSheet.create({
  linkWrapper: {
    width: "100%",
  },
});
