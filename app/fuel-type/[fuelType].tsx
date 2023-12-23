import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FuelType } from "../../common/types";
import { UnitGroupsLive } from "../../components/UnitGroupsLive";
import { ALLOW_LINK_FUELTYPES } from "../../common/utils";
import { FuelTypeNotAllowed } from "../../atoms/cards";
import { SmartAppBanner } from "../../components/SmartAppBanner.web";

export const FuelTypeLiveScreen = () => {
  const { fuelType } = useLocalSearchParams<{ fuelType: FuelType }>();
  // check in fueltypes
  if (!ALLOW_LINK_FUELTYPES.includes(fuelType)) {
    return <FuelTypeNotAllowed fuelType={fuelType} />;
  }

  return (
    <>
      <SmartAppBanner url={`/fuel-type/${fuelType}`} />
      <UnitGroupsLive fuelType={fuelType} />;
    </>
  );
};

export default FuelTypeLiveScreen;
