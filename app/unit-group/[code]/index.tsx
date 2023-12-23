import { useContext } from "react";
import { UnitGroupContext } from "../../../services/contexts";
import log from "../../../services/log";
import { UnitGroupLive } from "../../../components/UnitGroupLive";
import { SmartAppBanner } from "../../../components/SmartAppBanner.web";
import { urls } from "../../../services/nav";

export const UnitGroupScreen = () => {
  log.debug("UnitGroupScreen");
  const unitGroup = useContext(UnitGroupContext);
  if (!unitGroup) {
    log.debug("UnitGroupScreen: No unitGroup found in context");
    return null;
  } else {
    log.debug(`UnitGroupScreen: Found unitGroup ${unitGroup.details.name}`);
    return (
      <>
        {unitGroup.details.code && (
          <SmartAppBanner url={urls.unitGroup(unitGroup.details.code)} />
        )}

        <UnitGroupLive ug={unitGroup} />
      </>
    );
  }
};
export default UnitGroupScreen;
