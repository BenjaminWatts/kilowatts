import React, { useMemo } from "react";
import { Platform } from "react-native";
import { londonTimeHHMMSS } from "../common/utils";
import { useNavigation } from "expo-router";
import { useUnitGroupsLiveQuery } from "../services/state/api/elexon-insights-api.hooks";
import { UnitGroupsLiveList } from "./UnitGroupsLiveList";
import { FuelType, UnitGroupLevel } from "../common/types";

type FilterDataParams = {
  data: UnitGroupLevel[] | null;
  search: string;
  fuelType?: FuelType;
};

/*
filterData is a function that takes a list of UnitGroupLevels and filters them
*/
export const filterData = ({ data, search, fuelType }: FilterDataParams) => {
  if (!data) return data;

  return data.filter((d) => {
    const nameMatch =
      search === "" ||
      d.details.name.toLowerCase().includes(search.toLowerCase());
    const fuelTypeMatch = !fuelType || d.details.fuelType === fuelType;
    return nameMatch && fuelTypeMatch;
  });
};

type UnitGroupLiveWithSearchProps = {
  fuelType?: FuelType;
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
      hideMap={search !== ""}
      isLoading={isLoading}
      refetch={refetch}
      data={filteredData}
    />
  );
};
