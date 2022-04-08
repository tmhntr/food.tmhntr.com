import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import type { Connection, Query } from "mongoose";
import dbConnect from "./dbConnect";
import { getUserModel, User as UserType, userSchema } from "./models";

const getUser = async (req: NextApiRequest): Promise<UserType | null> => {
  const session = await getSession({ req });

  if (session) {
    const User = getUserModel();

    const user = await User.findOne({ email: session.user.email });
    // console.log(user);

    return user;
  }

  return null;
};

export default getUser;
