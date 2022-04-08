import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import type { Connection } from "mongoose";

import { userSchema } from "../../../lib/models";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const db: Connection = dbConnect();
  if (!db.models.User) {
    db.model("User", userSchema);
  }
  const User = db.models.User;

  switch (method) {
    case "GET":
      try {
        const user = await User.findOne(req.query);
        // console.log(user);

        user
          ? res.status(200).json({ success: true, data: user })
          : res.status(404).json({ success: false });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    // case "POST":
    //   try {
    //     const user = await User.create(req.body);
    //     res.status(201).json({ success: true, data: user });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
