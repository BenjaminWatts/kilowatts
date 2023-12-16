import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import { ConsentDialog } from '../../atoms/dialogs';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  testID: string;
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const colorScheme = useColorScheme();

  return (
    <>
   <ConsentDialog isVisible={modalVisible} onAccept={() => setModalVisible(false)} />
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarLabel: '',
        headerRight: () => (
          <FontAwesome
            name="info-circle"
            size={25}
            color={Colors[colorScheme ?? 'light'].text}
            style={{ marginRight: 15 }}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Category',
          tabBarIcon: ({ color }) => <TabBarIcon testID='categories-tab-icon' name="pie-chart" color={color} />,
        }}
      />
            <Tabs.Screen
        name="maps"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <TabBarIcon testID='map-tab-icon' name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="unit-group"
        options={{
          title: 'Breakdown',
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <TabBarIcon testID='list-tab-icon' name="list" color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />

    </Tabs>
    </>
  );
}
