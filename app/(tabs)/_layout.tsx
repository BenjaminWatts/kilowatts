import React from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from "../../atoms/icons";
import { TabsWithInfoIcon } from "../../components/TabsWithInfoIcon";
import log from "../../services/log";


export default function RootTabLayout() {
  log.debug("RootTabLayout");
  return (
    <TabsWithInfoIcon
      headerShown={true}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Generation Mix",          
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              testID="categories-tab-icon"
              name="pie-chart"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="unit-group"
        options={{
          title: "Breakdown",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              testID="list-tab-icon"
              name="list"
              color={color}
            />
          ),
        }}
      />
    </TabsWithInfoIcon>
  );
}
