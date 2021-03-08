import { IProduct } from "./ProductInterface";
import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    code: { type: String, required: [true, "Field is required"] },
    category: { type: String, required: [true, "Field is required"] },
    price: { type: String, required: [true, "Field is required"] },
    size: { type: String, required: [true, "Field is required"] },
    quantity: { type: Number, required: [true, "Field is required"] },
    image: { type: Array, required: [true, "Field is required"] },
    brand: { type: String, required: [true, "Field is required"] },
    color: { type: String, required: [true, "Field is required"] },
  },
  { versionKey: false }
);

export const Product = model<IProduct>("ProductDatabase", ProductSchema);
