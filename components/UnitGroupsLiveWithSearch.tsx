import React, { useMemo } from "react";
import { londonTimeHHMMSS } from "../common/utils";
import { useNavigation } from "expo-router";
import { useUnitGroupsLiveQuery } from "../services/state/unitGroupsLive";
import { UnitGroupsLiveList } from "./UnitGroupsLiveList";
import { FuelType, UnitGroupLevel } from "../common/types";
import formatters from "../common/formatters";

type FilterDataParams = {
  data: UnitGroupLevel[] | null;
  search: string;
  fuelType?: FuelType;
};

/*
filterData is a function that takes a list of UnitGroupLevels and filters them
*/
export const filterData = ({ data, search, fuelType }: FilterDataParams) => {
  if (!data) return [];

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
  const nav = useNavigation();
  const query = useUnitGroupsLiveQuery();

  const { data, now, isLoading, refetch } = query;

  React.useEffect(() => {
    if (now) {
      const timeString = londonTimeHHMMSS(now);
      const title = fuelType ? `${formatters.fuelType(fuelType)} Live: ${timeString}` : `Generation Live: ${timeString}`;
      nav.setOptions({ title });
    }
  }, [now]);
  const filteredData = useMemo(
    () => filterData({ data, search, fuelType }),
    [data, search, fuelType]
  );

  return (
    <UnitGroupsLiveList
      hideMap={search !== ""}
      isLoading={isLoading}
      refetch={refetch}
      data={filteredData}
    />
  );
};
