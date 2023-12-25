const getGoogleMapsApiKey = () => {
  if (process.env.GOOGLE_MAPS_API_KEY) {
    return process.env.GOOGLE_MAPS_API_KEY;
  }
  throw new Error("env GOOGLE_MAPS_API_KEY is not defined");
}

const expoConfig = {
  expo: {
    name: "kilowatts",
    slug: "kilowatts",
    version: "1.0.1",
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
      jsEngine: "jsc",
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
      [
        "expo-build-properties",
        {
          android: {
            gradleVersion: "7.5.1",
            // compileSdkVersion: 31,
            // targetSdkVersion: 31,
            // buildToolsVersion: "31.0.0",
          },
          ios: {
            // deploymentTarget: "13.0",
          },
        },
      ],
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
    runtimeVersion: "1.0.1",
    updates: {
      url: "https://u.expo.dev/06a9e672-4ff0-4f7d-9373-6c4c8dcbdf91",
    },
    owner: "benjaminwatts",
  },
};

module.exports = expoConfig;
