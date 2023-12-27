import { FuelTypeLive } from "../../components/FuelTypeLive";
import { FuelTypeRange } from "../../components/FuelTypeRange";
import { SmartAppBanner } from "../../components/SmartAppBanner.web";
import { urls } from "../../services/nav";

export default function HomeScreen() {
  return (
    <>
      <SmartAppBanner url={urls.home} />
      <FuelTypeRange/>
      <FuelTypeLive />
    </>
  );
}
