import React, { useState, useEffect } from "react";
import { useNavigation } from "expo-router";
import log from "../services/log";
import { FuelType } from "../common/types";
import formatters from "../common/formatters";
import { UnitGroupLiveList } from "./UnitGroupsLiveList";
import { SearchUnitGroups } from "../atoms/inputs";

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
      <UnitGroupLiveList search={search} fuelType={fuelType} />
    </>
  );
};

