import { logger, sentryTransport, consoleTransport } from "react-native-logs";
import { getSentry } from "./platform";

const get_debug_log_level = () => {
  const debug_log_level = process.env.DEBUG_LOG_LEVEL;
  if (debug_log_level) {
    return debug_log_level;
  }
  return "info";
}

/* Configure sentry to send info (and above) level logs */
const config = {
  severity: __DEV__ ? get_debug_log_level() : "info",
  transport: __DEV__ ? consoleTransport : sentryTransport,
  transportOptions: {
    SENTRY: getSentry(),
  },
};

const log = logger.createLogger(config);

export default log;
