import React from "react";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { TabBarIcon } from "../../../atoms/icons";
import { TabsWithInfoIcon } from "../../../components/TabsWithInfoIcon";
import log from "../../../services/log";
import { UnknownUnitGroupCode } from "../../../atoms/cards";
import { lookups } from "../../../services/nav";
import { InfoModal } from "../../../components/InfoModal";
import { UnitGroupContext } from "../../../services/contexts";

type UnitGroupTabsProps = {};

const UnitGroupTabs: React.FC<UnitGroupTabsProps> = () => {
  log.info(`UnitGroupTabs`);
  const { code } = useLocalSearchParams<{ code: string }>();
  if (!code) {
    log.info(`UnitGroupTabs: No code found in URL`);
    return <UnknownUnitGroupCode />;
  } else {
    log.info(`UnitGroupTabs: Found code ${code}.. now looking up unitGroup`);
    const unitGroup = lookups.unitGroup(code);
    if (!unitGroup) {
      log.info(`UnitGroupTabs: No unitGroup found with code ${code}`);
      return <UnknownUnitGroupCode />;
    } else {
      log.info(`UnitGroupTabs: Found unitGroup ${unitGroup.details.name}`);
      return (
        <>
          <Stack.Screen
            options={{
              title: `${unitGroup.details.name}`,
              headerRight: () => <InfoModal />,
              headerBackTitleVisible: false,
            }}
          />
          <UnitGroupContext.Provider value={unitGroup}>
            <TabsWithInfoIcon headerShown={false}>
              <Tabs.Screen
                name="index"
                options={{
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon
                      testID="unit-group-live-tab-icon"
                      name="live-tv"
                      color={color}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="schedule"
                options={{
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon
                      testID="unit-group-units-tab-icon"
                      name="calendar-today"
                      color={color}
                    />
                  ),
                }}
              />
            </TabsWithInfoIcon>
          </UnitGroupContext.Provider>
        </>
      );
    }
  }
};

export default UnitGroupTabs;
