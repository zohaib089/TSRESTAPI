import {IApi} from './ApiInterface';
import {Schema,model} from "mongoose";

const ApiSchema = new Schema({
  name: { type: String, required: [true, "Field is required"] },
  gender: { type: String, required: [true, "Field is required"] },
  type: { type: String, required: [true, "Field is required"] },
  height: { type: Number, required: [true, "Field is required"] },
  weight: { type: Number, required: [true, "Field is required"] },
  photo: { type: String, required: [true, "Field is required"] },
  email: { type: String, required: [true, "Field is required"] },
  age: { type: Number, required: [true, "Field is required"] },
  dob: { type: String, required: [true, "Field is required"] },
  
},{ versionKey: false });

export const Api = model<IApi>("ApiDatabase", ApiSchema);