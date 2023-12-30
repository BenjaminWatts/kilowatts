import { MixScheduleCard } from "../../atoms/cards";
import { FuelTypeLive } from "../../components/FuelTypeLive";
import { FuelTypeRange } from "../../components/FuelTypeRange";
import { SmartAppBanner } from "../../components/SmartAppBanner.web";
import { urls } from "../../services/nav";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <>
      <SmartAppBanner url={urls.home} />
      <FuelTypeLive />
      <View style={styles.chartView}>
        <MixScheduleCard />
        <FuelTypeRange />
      </View>
    </>
  );
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  chartView: {
    flex: 1,
    // backgroundColor: "red",
  }
})