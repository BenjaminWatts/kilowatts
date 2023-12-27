import * as SplashScreen from "expo-splash-screen";


export const init = () => SplashScreen.preventAutoHideAsync()
    .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
    .catch(console.warn); // it's good to explicitly catch and inspect any error

export const hide = () => SplashScreen.hideAsync()