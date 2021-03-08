import { IOrder } from "./OrderInterface";
import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    code: { type: String, required: [true, "Field is required"] },
    delivery: { type: String, required: [true, "Field is required"] },
    price: { type: Number, required: [true, "Field is required"] },
    size: { type: String, required: [true, "Field is required"] },
    quantity: { type: Number, required: [true, "Field is required"] },
    image: { type: Array, required: [true, "Field is required"] },
    Itemname: { type: String, required: [true, "Field is required"] },
    delivery_plant: { type: String, required: [true, "Field is required"] },
    dilvery_date: { type: String, required: [true, "Field is required"] },
    dilvery_method: { type: String, required: [true, "Field is required"] },
    customername: { type: String, required: [true, "Field is required"] },
    customerAddress: { type: String, required: [true, "Field is required"] },
    customerTel: { type: String, required: [true, "Field is required"] },
    courier: { type: String, required: [true, "Field is required"] },
  },
  { versionKey: false }
);

export const Order = model<IOrder>("OrderDatabase", OrderSchema);
