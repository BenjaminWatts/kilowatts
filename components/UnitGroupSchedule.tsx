import React from "react";
import { UnitGroup } from "../common/types";
import log from "../services/log";
import { useUnitGroupScheduleQuery } from "../services/state/elexon-insights-api.hooks";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";
import { ApiErrorCard, UnitGroupScheduleHeader } from "../atoms/cards";
import { UnitLevelListItem } from "../atoms/list-items";
import { View } from "react-native";

type UnitGroupScheduleProps = {
  ug: UnitGroup;
};

export const UnitGroupSchedule: React.FC<UnitGroupScheduleProps> = ({ ug }) => {
  log.info(`UnitGroupSchedule ${ug.details}`);
  const query = useUnitGroupScheduleQuery(ug);
  if (query.isError) return <ApiErrorCard refetch={query.refetch} />

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={query.isLoading}
          onRefresh={query.refetch}
        />
      }
    >
      {query.data && query.data.length > 0 && (
        <>
          {query.data.map((unit, i) => {
            return (
              <View key={i}>
                <UnitGroupScheduleHeader bmUnit={unit.details.bmUnit} />
                <>
                  {unit.data.levels.map((level) => {
                    return (
                      <UnitLevelListItem
                        key={`${unit.details.bmUnit}-${level.time}`}
                        {...level}
                      />
                    )
                  })}
                </>
              </View>

            );
          })}
        </>
      )}
    </ScrollView>
  );
};
