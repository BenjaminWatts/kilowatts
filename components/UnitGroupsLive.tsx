import React from "react";
import log from "../services/log";
import { SearchUnitGroups } from "../atoms/inputs";
import { UnitGroupLiveWithSearch } from "./UnitGroupsLiveWithSearch";
import { FuelType } from "../common/types";

type UnitGroupsLiveProps = {
  fuelType?: FuelType;
};

export const UnitGroupsLive: React.FC<UnitGroupsLiveProps> = ({ fuelType }) => {
  log.debug(`UnitGroupsLive`);
  const [search, setSearch] = React.useState("");

  return (
    <>
      <SearchUnitGroups value={search} onChangeText={setSearch} />
      <UnitGroupLiveWithSearch search={search} fuelType={fuelType} />
    </>
  );
};
