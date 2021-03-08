import { Document } from "mongoose";

export interface IApi extends Document {
  name: string;
  gender: string;
  type: string;
  height: number;
  weight: number;
  photo: string;
  email:string;
  age:number;
  dob:string;
  
}