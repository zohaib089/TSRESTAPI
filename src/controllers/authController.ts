import * as bcrypt from 'bcrypt';
import {Request, Response, Router,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {TokenData,DataStoredInToken,LogInDto } from '../constants/TokenInterface'
import {User} from '../models/Users/UserInterface';
import userModel from '../models/Users/UserModel';

 
export class AuthController  {
  public path = '/auth';
  public router = Router();
  private user = userModel;
 
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post(`${this.path}/register`,  this.registration);
    this.router.post(`${this.path}/login`,  this.loggingIn);
  }
 
  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, 'Alicealbertin', { expiresIn }),
    };
  }


  private registration = async (request: Request, response: Response, next: NextFunction) => {
    const userData: User = request.body;
    
     const userExist =  await this.user.findOne({ email: userData.email })
    
     if (!userExist) {
        //  console.log(`userData`, userData)
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.user.create({
          ...userData,
          password: hashedPassword,
        });
        user.password = '';
        const tokenData = this.createToken(user);
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        response.send(user);
         
     } else {
         response.send({
             err:"Email already registed"
         })
     }
 
     
    
  }
   
  private loggingIn = async (request: Request, response: Response,next: NextFunction) => {
    const logInData: LogInDto = request.body;
    // console.log(`logInData`, logInData)
    const user = await this.user.findOne({ email: logInData.email });
    // console.log(`user`, user)
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
      if (isPasswordMatching) {
        user.password = '';
        const tokenData = this.createToken(user);
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        // console.log(`response`, response)
       
        response.send(
            {
                user:user.email,
                token:tokenData.token
            }
          
            );
      } else {
       response.send({err:"Wrong Credentials Try Agrain"})
      }
    } else {
        response.send({err:"Wrong Credentials Try Agrain"})
    }
  }
   
  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}
 

