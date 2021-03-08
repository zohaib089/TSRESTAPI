import { IMacchine } from "./MecchineInterface";
import { Schema, model } from "mongoose";

const MacchineSchema = new Schema(
  {
    name: { type: String, required: [true, "Field is required"] },
    gender: { type: String, required: [true, "Field is required"] },
    type: { type: String, required: [true, "Field is required"] },
    height: { type: Number, required: [true, "Field is required"] },
    weight: { type: Number, required: [true, "Field is required"] },
    modal: { type: String, required: [true, "Field is required"] },
    functionality: { type: String, required: [true, "Field is required"] },
    state: { type: String, required: [true, "Field is required"] },
    code: { type: String, required: [true, "Field is required"] },
    manufacturer: { type: String, required: [true, "Field is required"] },
    workinghour: { type: Number, required: [true, "Field is required"] },
  },
  { versionKey: false }
);

export const Macchine = model<IMacchine>("MacchineDatabase", MacchineSchema);
