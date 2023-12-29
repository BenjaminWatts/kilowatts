import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { FuelType } from "../../common/types";
import { UnitGroupsLive } from "../../components/UnitGroupsLive";
import { ALLOW_LINK_FUELTYPES } from "../../common/utils";
import { FuelTypeNotAllowed } from "../../atoms/cards";
import { SmartAppBanner } from "../../components/SmartAppBanner.web";
import log from "../../services/log";
import { urls } from "../../services/nav";
import formatters from "../../common/formatters";

export const FuelTypeLiveScreen = () => {
  const { fuelType } = useLocalSearchParams<{ fuelType: FuelType }>();
  // check in fueltypes
  if (!ALLOW_LINK_FUELTYPES.includes(fuelType) && !__DEV__) {
    log.debug(`FuelTypeLiveScreen: ${fuelType} not allowed`);
    return <FuelTypeNotAllowed fuelType={fuelType} />
  }

  log.debug(`FuelTypeLiveScreen: ${fuelType} allowed`);

  return (
    <>
      <Stack.Screen options={{title: formatters.fuelType(fuelType)}} />
      <SmartAppBanner url={urls.fuelType(fuelType)} />
      <UnitGroupsLive fuelType={fuelType} />
    </>
  );
};

export default FuelTypeLiveScreen;
