import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import { getRecipeModel } from "../../../lib/models";
import getUser from "../../../lib/getUser";

const Recipe = getRecipeModel();

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.single("imageFile");

// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware);

// Process a GET request
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false, message: error });
  }
});
// Process a POST request
apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = await getUser(req);
    // const _id = "624fb17449de36b8ce2c6bf4";
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
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
