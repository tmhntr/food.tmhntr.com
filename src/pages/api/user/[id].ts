import type { NextApiRequest, NextApiResponse } from "next";
import type { Connection } from "mongoose";

import dbConnect from "../../../lib/dbConnect";
import { userSchema } from "../../../lib/models";

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  let {
    query: { id_query },
    method,
  } = req;

  // get the id as a single string
  let id: string;
  id = Array.isArray(id_query) ? id[0] : id;

  // create or get connection to User resources
  const db: Connection = dbConnect();
  if (!db.models.User) {
    db.model("User", userSchema);
  }
  const User = db.models.User;

  switch (method) {
    case "GET":
      try {
        const users = await User.findById(id);
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const user = await User.findByIdAndUpdate(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default userHandler;
