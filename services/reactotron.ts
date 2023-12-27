import Reactotron from "reactotron-react-native";

export const reactotron = Reactotron.configure({
  name: "React Native Demo",
})
  .useReactNative()
  .connect();

export default reactotron;
