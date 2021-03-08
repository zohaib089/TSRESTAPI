import {IMacchine} from '../models/Macchine/MecchineInterface'
import {Macchine} from '../models/Macchine/MacchineModel';

export class MacchineService {
    public getWelcomeMessage() {
      return 'Welcome to REST TypeScript Macchine';
    }
    public findAll(): Promise<IMacchine[]> {
        return Macchine.find({}).exec();
      }

    public add(macchine: IMacchine): Promise<IMacchine> {
        
        const newmacchine = new Macchine(macchine);
        return newmacchine.save();
      }

    public async delete(id:string){
        const deletedParams:IMacchine|null = await Macchine.findByIdAndDelete(
            id
          ).exec();
      
        if (!deletedParams) {
            throw new Error(`id '${id}' not found`);
        }
        return deletedParams;
    }  
    public async update(id: string, macchine: IMacchine) {

    const updatedmacchine:IMacchine|null = await Macchine.findByIdAndUpdate(
          id,
          macchine
        ).exec();
    
        if (!updatedmacchine) {
          throw new Error(`id '${id}' not found`);
        }
    
        return updatedmacchine;
      }
      public async find(id: string) {

        const updatedmacchine:IMacchine|null = await Macchine.findById(
              id,
            
            ).exec();
        
            if (!updatedmacchine) {
              throw new Error(`id '${id}' not found`);
            }
        
            return updatedmacchine;
          }
      
  }
