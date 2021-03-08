import { IArticle } from "./ArticlesInerface";
import { Schema, model } from "mongoose";

const ArticleSchema = new Schema(
  {
    code: { type: String, required: [true, "Field is required"] },
    type: { type: String, required: [true, "Field is required"] },

    famtype: { type: String, required: [true, "Field is required"] },
    customertype: { type: String, required: [true, "Field is required"] },
    desc_extra: { type: String, required: [true, "Field is required"] },
    desc: { type: String, required: [true, "Field is required"] },
    image: { type: String, required: [true, "Field is required"] },
    weight: { type: Number, required: [true, "Field is required"] },
    quantity: { type: Number, required: [true, "Field is required"] },
  },
  { versionKey: false }
);

export const Article = model<IArticle>("ArticleDatabase", ArticleSchema);
