import type { Connection } from "mongoose";
import { createConnection } from "mongoose";

let conn: Connection;
const MONGODB_URI = process.env.MONGODB_URI;

export default function dbConnect() {
  if (conn) {
    return conn;
  }

  conn = createConnection(MONGODB_URI);
  return conn;
}
