import React from "react";
import { UnitGroup } from "../common/types";
import { useUnitGroupLiveQuery } from "../services/state/unitGroupLive";
import log from "../services/log";
import { UnitLive } from "../atoms/list-items";
import { ApiErrorCard, UnitListHeader } from "../atoms/cards";
import { StyleSheet, View } from "react-native";
import { Loader } from "../atoms/loaders";
import { useNavigation } from "expo-router";
import { londonTimeHHMMSS } from "../common/utils";

type UnitGroupLiveProps = {
  ug: UnitGroup;
};
export const UnitGroupLive: React.FC<UnitGroupLiveProps> = ({ ug }) => {
  log.debug(`UnitGroupLive ${ug.details.name}`);
  const query = useUnitGroupLiveQuery(ug);
  const nav = useNavigation();
  React.useEffect(() => {
    nav.setOptions({
      title: `${ug.details.name}: ${londonTimeHHMMSS(query.now)}`,
    });
  }, [query.now, ug.details.name]);
  return (
    <View style={styles.listHalf}>
      <>{query.isError && <ApiErrorCard refetch={query.refetch} />}</>
      {query.data ? (
        <>
          <UnitListHeader now={query.now} />
          {query.data.map((item, index) => (
            <UnitLive key={index} index={index} {...item} />
          ))}
        </>
      ) : (
        <Loader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHalf: {
    minHeight: 50,
  },
});
