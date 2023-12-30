const getGoogleMapsApiKey = () => {
  if (process.env.GOOGLE_MAPS_API_KEY) {
    return process.env.GOOGLE_MAPS_API_KEY;
  }
  throw new Error("env GOOGLE_MAPS_API_KEY is not defined");
}

const expoConfig = {
  expo: {
    jsEngine: "hermes",
    name: "kilowatts",
    slug: "kilowatts",
    version: "1.0.2",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "kilowatts",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.benjaminwatts.kilowatts",
      config: {
        usesNonExemptEncryption: false,
      },
      jsEngine: "hermes",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.benjaminwatts.kilowatts",
      versionCode: 2,
      config: {
        googleMaps: {
          apiKey: getGoogleMapsApiKey(),
        },
      },
    },
    web: {
      bundler: "metro",
      output: "single",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "06a9e672-4ff0-4f7d-9373-6c4c8dcbdf91",
      },
    },
    runtimeVersion: "1.0.2",
    updates: {
      url: "https://u.expo.dev/06a9e672-4ff0-4f7d-9373-6c4c8dcbdf91",
    },
    owner: "benjaminwatts",
  },
};

module.exports = expoConfig;
