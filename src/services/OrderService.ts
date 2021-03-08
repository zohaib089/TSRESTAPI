import {IOrder} from '../models/Order/OrderInterface'
import {Order} from '../models/Order/OrderModel';

export class OrderService {
 
    public findAll(): Promise<IOrder[]> {
        return Order.find({}).exec();
      }

    public add(order: IOrder): Promise<IOrder> {
        
        const newOrder = new Order(order);
        return newOrder.save();
      }

    public async delete(id:string){
        const deletedParams:IOrder|null = await Order.findByIdAndDelete(
            id
          ).exec();
      
        if (!deletedParams) {
            throw new Error(`id '${id}' not found`);
        }
        return deletedParams;
    }  
    public async update(id: string, order: IOrder) {

    const updatedOrder:IOrder|null = await Order.findByIdAndUpdate(
          id,
          order
        ).exec();
    
        if (!updatedOrder) {
          throw new Error(`id '${id}' not found`);
        }
    
        return updatedOrder;
      }
      public async find(id: string) {

        const updatedOrder:IOrder|null = await Order.findById(
              id,
            
            ).exec();
        
            if (!updatedOrder) {
              throw new Error(`id '${id}' not found`);
            }
        
            return updatedOrder;
          }

          public async search(query: string) {
            let updatedOrder:IOrder[]|null
            console.log('query-->', query)
            if(query == '*'){
              updatedOrder = await this.findAll()
            }else{
              updatedOrder = await Order.find(
                {
                code:query
                }).exec();
            }
           
                if (!updatedOrder) {
                  throw new Error(`not found`);
                }
            
                return updatedOrder;
              }
      
  }
