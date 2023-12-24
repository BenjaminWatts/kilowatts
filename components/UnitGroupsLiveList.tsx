import React, { useEffect, useMemo } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useUnitGroupsLiveQuery } from "../services/state/api/elexon-insights-api.hooks";
import { FlashList } from "@shopify/flash-list";
import * as at from "../atoms";
import { CallForContributions, NoLiveUnits } from "../atoms/cards";
import log from "../services/log";
import { urls } from "../services/nav";
import { Refresh } from "../atoms/controls";
import { FuelType } from "../common/types";
import { londonTimeHHMMSS } from "../common/utils";

type UnitGroupLiveWithSearchProps = {
  fuelType?: FuelType;
  search: string;
};

export const UnitGroupLiveList: React.FC<
  UnitGroupLiveWithSearchProps
> = ({ search, fuelType }) => {
  const router = useRouter();
  const query = useUnitGroupsLiveQuery();

  const { data, now, isLoading, refetch } = query;
  const filteredData = useMemo(() => {
    if (!data) return data;
  
    return data.filter((d) => {
      const nameMatch = search === "" || d.details.name.toLowerCase().includes(search.toLowerCase());
      const fuelTypeMatch = !fuelType || d.details.fuelType === fuelType;
      return nameMatch && fuelTypeMatch;
    });
  }, [data, search, fuelType]);
  

  const nav = useNavigation();

  useEffect(() => {
    if(now) {
      nav.setOptions({
        title: `Live Output: ${londonTimeHHMMSS(now)}`,
      });
    }
  }, [query.now]);

  return (
    <FlashList
      refreshControl={<Refresh refreshing={isLoading} onRefresh={refetch} />}
      ListEmptyComponent={NoLiveUnits}
      ListFooterComponent={CallForContributions}
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

