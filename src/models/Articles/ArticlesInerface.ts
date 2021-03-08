import { Document } from "mongoose";

export interface IArticle extends Document {
  code: string;
  type: string;
  famtype: string;
  customertype: string;
  weight: number;
  quantity:number;
  desc:string;
  desc_extra:string;
  image:string;
}