import { Stack } from "expo-router";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};


export default function RootLayoutNav() {
  const options = { headerShown: false };
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={options} />
    </Stack>
  );
}
