import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import type { Connection } from "mongoose";
import dbConnect from "./dbConnect";
import { userSchema } from "./models";

const getUser = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (session) {
    const db: Connection = dbConnect();
    if (!db.models.User) {
      db.model("User", userSchema);
    }
    const User = db.models.User;

    const user = await User.findOne({ email: session.user.email });
    console.log(user);

    return user;
  }

  return null;
};

export default getUser;
