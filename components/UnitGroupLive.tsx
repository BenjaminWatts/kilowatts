import React from "react";
import { UnitGroup } from "../common/types";
import { useUnitGroupLiveQuery } from "../services/state/elexon-insights-api.hooks";
import log from "../services/log";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native-gesture-handler";
import { UnitLive } from "../atoms/list-items";
import { ApiErrorCard, UnitListHeader } from "../atoms/cards";
import { UnitGroupMap } from "../atoms/maps";
import { StyleSheet, View } from "react-native";

type UnitGroupLiveProps = {
  ug: UnitGroup;
};
export const UnitGroupLive: React.FC<UnitGroupLiveProps> = ({ ug }) => {
  log.debug(`UnitGroupLive ${ug.details.name}`);
  const query = useUnitGroupLiveQuery(ug);
  if (query.isError) return <ApiErrorCard refetch={query.refetch} />;
  return (
    <>
      <View style={styles.listHalf}>
        <FlashList
          estimatedItemSize={50}
          refreshControl={
            <RefreshControl refreshing={query.isLoading} onRefresh={() => {}} />
          }
          ListHeaderComponent={() => <UnitListHeader now={query.now} />}
          data={query.data}
          renderItem={({ item, index }) => <UnitLive index={index} {...item} />}
        />
      </View>
      <UnitGroupMap ug={ug} />
    </>
  );
};

const styles = StyleSheet.create({
  listHalf: {
    height: "50%",
  },
});
