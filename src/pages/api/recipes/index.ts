import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import type { Connection } from "mongoose";

import { recipeSchema } from "../../../lib/models";
import { getSession } from "next-auth/react";
import getUser from "../../../lib/getUser";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const db: Connection = dbConnect();
  if (!db.models.User) {
    db.model("Recipe", recipeSchema);
  }
  const Recipe = db.models.Recipe;

  // const session = await getSession({ req });

  switch (method) {
    case "GET":
      try {
        const recipes = await Recipe.find({});

        res.status(200).json({ success: true, data: recipes });
      } catch (error) {
        console.log(error);

        res.status(400).json({ success: false, message: error });
      }
      break;
    case "POST":
      try {
        const { _id } = await getUser(req);
        if (_id) {
          const recipe = await Recipe.create({
            ...req.body,
            author: _id,
          });
          res.status(201).json({ success: true, data: recipe });
        } else {
          res.status(401).json({ success: false });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
