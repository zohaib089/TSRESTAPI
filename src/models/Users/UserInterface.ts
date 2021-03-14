import { Request } from 'express';
import User from './UserModel';

export interface User {
    _id:string;
    name: string;
    email: string;
    password: string;
  }
   



 
export interface RequestWithUser extends Request {
  user: User;
}
 
