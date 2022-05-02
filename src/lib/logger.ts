import loglevel, { LogLevelDesc } from "loglevel";

var level: LogLevelDesc;
switch (process.env.LOG_LEVEL) {
  case "TRACE":
    level = loglevel.levels.TRACE;
    break;
  case "DEBUG":
    level = loglevel.levels.DEBUG;
    break;
  case "INFO":
    level = loglevel.levels.INFO;
    break;
  case "WARN":
    level = loglevel.levels.WARN;
    break;
  case "ERROR":
    level = loglevel.levels.ERROR;
    break;
  case "SILENT":
    level = loglevel.levels.SILENT;
    break;

  default:
    level = loglevel.levels.WARN;
    break;
}

var log = loglevel.getLogger("cerberus");
log.setLevel(level);
export default log;
