import type { Types } from "mongoose";
import { Schema } from "mongoose";

// Interface representing a document in MongoDB.
export type FoodUnits =
  | "pc"
  | "cup"
  | "tbsp"
  | "tsp"
  | "g"
  | "kg"
  | "oz"
  | "l"
  | "ml"
  | "fl-oz"
  | "gal"
  | "lb";

export const foodUnitList: FoodUnits[] = [
  "pc",
  "cup",
  "tbsp",
  "tsp",
  "g",
  "kg",
  "oz",
  "l",
  "ml",
  "fl-oz",
  "gal",
  "lb",
];

export interface Food {
  name: string;
  amount: number;
  units: FoodUnits;
}

interface User {
  _id: Types.ObjectId;
  __v: string;
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  inventory: Food[];
}

interface Rating {
  userId: Types.ObjectId;
  value: number;
}

export interface Recipe {
  _id?: Types.ObjectId;
  __v?: string;
  id?: string;
  cookTime: number;
  servings: number;
  name: string;
  ratings?: Rating[];
  description: string;
  ingredients: Food[];
  directions: string[];
  notes?: string;
  author?: Types.ObjectId;
}

interface Account {
  _id: Types.ObjectId;
  __v: string;
  id: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string;
  id_token: string;
  userId: Types.ObjectId;
  oauth_token_secret: string;
  oauth_token: string;
  session_state: string;
}

interface Session {
  _id: Types.ObjectId;
  __v: string;
  id: string;
  expires: Date;
  sessionToken: string;
  userId: Types.ObjectId;
}

interface VerificationToken {
  _id: Types.ObjectId;
  __v: string;
  token: string;
  expires: Date;
  identifier: string;
}

const foodSchema = new Schema<Food>({
  name: {
    type: String,
    required: [true, "Must provide name."],
    trim: true,
    maxlength: [64, "Cannot be longer than 64 chars."],
  },
  amount: {
    type: Number,
    required: [true, "Must provide amount."],
  },
  units: {
    type: String,
    required: [true, "Must provide units."],
    trim: true,
    enum: [
      "pc",
      "cup",
      "tbsp",
      "tsp",
      "g",
      "kg",
      "oz",
      "l",
      "ml",
      "fl-oz",
      "gal",
      "lb",
    ],
  },
});

// Schema corresponding to the document interface.
const userSchema = new Schema<User>({
  name: { type: String },
  email: { type: String, unique: true },
  emailVerified: { type: Date },
  image: { type: String },
  inventory: {
    type: [foodSchema],
    default: [],
  },
});

const recipeSchema = new Schema<Recipe>({
  cookTime: Number,
  servings: Number,
  name: String,
  ratings: {
    type: [
      { userId: { type: Schema.Types.ObjectId, ref: "User" }, value: Number },
    ],
    default: [],
  },
  description: String,
  ingredients: [foodSchema],
  directions: { type: [String] },
  notes: { type: String, default: "" },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const accountSchema = new Schema<Account>({
  type: { type: String },
  provider: { type: String },
  providerAccountId: { type: String },
  refresh_token: { type: String },
  access_token: { type: String },
  expires_at: { type: Number },
  token_type: { type: String },
  scope: { type: String },
  id_token: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  oauth_token_secret: { type: String },
  oauth_token: { type: String },
  session_state: { type: String },
});

const sessionSchema = new Schema<Session>({
  expires: { type: Date },
  sessionToken: { type: String, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const verificationTokenSchema = new Schema<VerificationToken>({
  token: { type: String },
  expires: { type: Date },
  identifier: { type: String },
});

// Export schemas.
export {
  userSchema,
  accountSchema,
  sessionSchema,
  verificationTokenSchema,
  recipeSchema,
};
