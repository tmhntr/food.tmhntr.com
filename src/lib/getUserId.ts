import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import type { Connection } from "mongoose";
import dbConnect from "./dbConnect";
import { userSchema } from "./models";

const getUserId = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  const db: Connection = dbConnect();
  if (!db.models.User) {
    db.model("User", userSchema);
  }
  const User = db.models.User;

  const { _id } = await User.findOne({ ...session.user }).exec();

  return _id;
};

export default getUserId;
