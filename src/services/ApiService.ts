import {IApi} from '../models/ApiInterface'
import {Api} from '../models/ApiModel';

export class ApiService {
    public getWelcomeMessage() {
      return 'Welcome to REST TypeScript Api';
    }
    public findAll(): Promise<IApi[]> {
        return Api.find({}).exec();
      }

    public add(user: IApi): Promise<IApi> {
        
        const newuser = new Api(user);
        return newuser.save();
      }

    public async delete(id:string){
        const deletedParams:IApi|null = await Api.findByIdAndDelete(
            id
          ).exec();
      
        if (!deletedParams) {
            throw new Error(`id '${id}' not found`);
        }
        return deletedParams;
    }  
    public async update(id: string, user: IApi) {

    const updateduser:IApi|null = await Api.findByIdAndUpdate(
          id,
          user
        ).exec();
    
        if (!updateduser) {
          throw new Error(`id '${id}' not found`);
        }
    
        return updateduser;
      }
  }
