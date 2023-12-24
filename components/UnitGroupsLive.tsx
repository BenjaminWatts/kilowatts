import React from "react";
import log from "../services/log";
import { FuelType } from "../common/types";
import { UnitGroupLiveList } from "./UnitGroupsLiveList";
import { SearchUnitGroups } from "../atoms/inputs";

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

