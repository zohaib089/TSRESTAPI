import { Document } from "mongoose";

export interface IProduct extends Document {
  code: string;
  category: string;
  price: string;
  size: string;
  color:string;
  quantity:number;
  image:Array<[]>;
  brand:string;
}