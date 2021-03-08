import { Document } from "mongoose";

export interface IMacchine extends Document {
  name: string;
  gender: string;
  type: string;
  height: number;
  weight: number;
  modal: string;
  functionality:string;
  state:string;
  code:string;
  manufacturer:string;
  workinghour:number;
}