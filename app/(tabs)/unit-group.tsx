import { SmartAppBanner } from "../../components/SmartAppBanner.web";
import { UnitGroupsLive } from "../../components/UnitGroupsLive";
import log from "../../services/log";
import { urls } from "../../services/nav";

export default function UnitGroupLiveScreen() {
  log.debug("UnitGroupLiveScreen");
  return (
    <>
      <SmartAppBanner url={urls.unitGroups} />
      <UnitGroupsLive />
    </>
  );
}
