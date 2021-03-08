import {IProduct} from '../models/Product/ProductInterface'
import {Product} from '../models/Product/ProductModel';

export class ProductService {
 
    public findAll(): Promise<IProduct[]> {
        return Product.find({}).exec();
      }

    public add(product: IProduct): Promise<IProduct> {
        
        const newProduct = new Product(product);
        return newProduct.save();
      }

    public async delete(id:string){
        const deletedParams:IProduct|null = await Product.findByIdAndDelete(
            id
          ).exec();
      
        if (!deletedParams) {
            throw new Error(`id '${id}' not found`);
        }
        return deletedParams;
    }  
    public async update(id: string, product: IProduct) {

    const updatedProduct:IProduct|null = await Product.findByIdAndUpdate(
          id,
          product
        ).exec();
    
        if (!updatedProduct) {
          throw new Error(`id '${id}' not found`);
        }
    
        return updatedProduct;
      }
      public async find(id: string) {

        const updatedProduct:IProduct|null = await Product.findById(
              id,
            
            ).exec();
        
            if (!updatedProduct) {
              throw new Error(`id '${id}' not found`);
            }
        
            return updatedProduct;
          }

          public async search(query: string) {
            let updatedProduct:IProduct[]|null
            console.log('query-->', query)
            if(query == '*'){
              updatedProduct = await this.findAll()
            }else{
              updatedProduct = await Product.find(
                {
                code:query
                }).exec();
            }
           
                if (!updatedProduct) {
                  throw new Error(`not found`);
                }
            
                return updatedProduct;
              }
      
  }
