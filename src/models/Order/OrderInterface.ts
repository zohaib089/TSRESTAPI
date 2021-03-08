import { Document } from "mongoose";

export interface IOrder extends Document {
  code: string;
  price: number;
  quatity: number;
  delivery:string;
  delivery_plant:string;
  dilvery_date:string;
  dilvery_method:string;
  Itemname:string;
  image:Array<[]>;
  customername:string;
  customerAddress:string;
  customerTel:string;
  courier:string;
  
}