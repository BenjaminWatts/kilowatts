import React, { useContext } from "react";
import { UnitGroupContext } from "../../../services/contexts";
import log from "../../../services/log";
import { SmartAppBanner } from "../../../components/SmartAppBanner.web";
import { urls } from "../../../services/nav";
import { UnitGroupMap } from "../../../atoms/maps";

type UnitGroupHistoryScreenProps = {};

/*
UnitGroupHistory is a placeholder for the UnitGroupHistory screen.

*/
export const UnitGroupHistoryScreen: React.FC<
  UnitGroupHistoryScreenProps
> = () => {
  log.debug("UnitGroupHistoryScreen");
  const unitGroup = useContext(UnitGroupContext);
  if (!unitGroup) {
    log.debug("UnitGroupHistoryScreen: No unitGroup found in context");
  } else {
    log.debug(
      `UnitGroupHistoryScreen: Found unitGroup ${unitGroup.details.name}`
    );
    return (
      <>
        {unitGroup.details.code && (
          <SmartAppBanner
            url={urls.unitGroupSchedule(unitGroup.details.code)}
          />
        )}
        <UnitGroupMap 
          ug={unitGroup}
        />

      </>
    );
  }
};

export default UnitGroupHistoryScreen;
