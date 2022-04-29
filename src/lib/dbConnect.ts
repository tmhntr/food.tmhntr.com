import type { Connection } from "mongoose";
import mongoose, { createConnection } from "mongoose";
// import log from "loglevel";
import log from "./logger";

let conn: Connection;
const MONGODB_URI = process.env.MONGODB_URI;
// mongoose.set("useUnifiedTopology", true);
export default function dbConnect() {
  if (conn) {
    return conn;
  }

  log.debug("Connecting to db: ", MONGODB_URI);
  conn = createConnection(MONGODB_URI);
  log.debug("Connected successfully");
  return conn;
}
