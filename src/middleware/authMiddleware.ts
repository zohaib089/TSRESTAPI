import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
// import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
// import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import {DataStoredInToken} from '../constants/TokenInterface';
import {RequestWithUser} from '../models/Users/UserInterface';
import userModel from '../models/Users/UserModel';
 
async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, 'Alicealbertin') as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        // next(new WrongAuthenticationTokenException());
        response.send({err:"Token Authentication Failed"})
      }
    } catch (error) {
        response.send({err:"Token Authentication Failed"})
    }
  } else {
    response.send({err:"Token Missing"})
  }
}
 
export default authMiddleware;