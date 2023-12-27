import * as Sentry from "@sentry/react-native";
import { getReleaseChannel } from "./updates";

/* initialise sentry using the Sentry SDK for react native */
export const initSentry = () => {
  Sentry.init({
    dsn: "https://138c61a058da7beace9f46fab06e3f58@o4505890996748288.ingest.sentry.io/4506466896314368",
    environment: getReleaseChannel(),
    tracesSampleRate: 1.0,
  });
}

export default Sentry;