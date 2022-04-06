import type { NextApiRequest, NextApiResponse } from "next";
import type { Connection } from "mongoose";

import dbConnect from "../../../lib/dbConnect";
import { recipeSchema } from "../../../lib/models";

import { _id } from "../../../lib/mongoose-adapter";

const recipeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  let {
    query: { id },
    method,
  } = req;

  // get the id as a single string
  let id_str: string;
  id_str = Array.isArray(id) ? id[0] : id;

  // create or get connection to User resources
  const db: Connection = dbConnect();
  if (!db.models.Recipe) {
    db.model("Recipe", recipeSchema);
  }
  const Recipe = db.models.Recipe;

  switch (method) {
    case "GET":
      try {
        const recipe = await Recipe.findById(id_str).exec();
        recipe
          ? res.status(201).json({ success: true, data: recipe })
          : res.status(404).json({ success: false });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const recipe = await Recipe.findByIdAndUpdate(id_str, req.body).exec();
        recipe
          ? res.status(201).json({ success: true, data: recipe })
          : res.status(404).json({ success: false });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const recipe = await Recipe.findByIdAndDelete(id_str).exec();
        recipe
          ? res.status(201).json({ success: true, data: recipe })
          : res.status(404).json({ success: false });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default recipeHandler;
