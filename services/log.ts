import { logger, sentryTransport } from "react-native-logs";
import { getSentry } from "./platform";

/* Configure sentry to send info (and above) level logs */
const config = {
  severity: "info",
  transport: sentryTransport,
  transportOptions: {
    SENTRY: getSentry()
  },
};

const log = logger.createLogger(config);

export default log;
