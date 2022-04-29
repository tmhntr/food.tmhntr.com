import loglevel, { LogLevelDesc } from "loglevel";

var level: LogLevelDesc =
  process.env.NODE_ENV === "production" ? "INFO" : "DEBUG";
var log = loglevel.getLogger("cerberus");
log.setLevel(level);
export default log;
