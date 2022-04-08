import type { NextApiRequest, NextApiResponse } from "next";
import getUser from "../../lib/getUser";
import { getUserModel } from "../../lib/models";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const User = getUserModel();
  const user = await getUser(req);
  if (user) {
    switch (method) {
      case "GET":
        try {
          // const user = await User.findOne(req.query);
          // // console.log(user);

          res.status(200).json({ success: true, data: user.inventory });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case "PUT":
        try {
          // const user = await User.findOne(req.query);
          // // console.log(user);
          const { inventory } = await User.findOneAndUpdate(
            user,
            {
              inventory: req.body.inventory,
            },
            { new: true }
          );
          res.status(200).json({ success: true, data: inventory });
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
  } else res.status(401).json({ success: false });
}
