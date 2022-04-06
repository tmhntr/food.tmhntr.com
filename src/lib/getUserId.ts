import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import type { Connection } from "mongoose";
import dbConnect from "./dbConnect";
import { userSchema } from "./models";

const getUserId = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (session) {
    const db: Connection = dbConnect();
    if (!db.models.User) {
      db.model("User", userSchema);
    }
    const User = db.models.User;

    const user = await User.findOne({ ...session.user });

    return user._id;
  }

  return null;
};

export default getUserId;
