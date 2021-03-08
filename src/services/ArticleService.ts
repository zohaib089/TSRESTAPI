import {IArticle} from '../models/Articles/ArticlesInerface'
import {Article} from '../models/Articles/ArtickeModel';

export class ArticleService {
    public getWelcomeMessage() {
      return 'Welcome to REST TypeScript Article';
    }
    public findAll(): Promise<IArticle[]> {
        return Article.find({}).exec();
      }

    public add(article: IArticle): Promise<IArticle> {
        
        const newarticle = new Article(article);
        return newarticle.save();
      }

    public async delete(id:string){
        const deletedParams:IArticle|null = await Article.findByIdAndDelete(
            id
          ).exec();
      
        if (!deletedParams) {
            throw new Error(`id '${id}' not found`);
        }
        return deletedParams;
    }  
    public async update(id: string, article: IArticle) {

    const updatedarticle:IArticle|null = await Article.findByIdAndUpdate(
          id,
          article
        ).exec();
    
        if (!updatedarticle) {
          throw new Error(`id '${id}' not found`);
        }
    
        return updatedarticle;
      }
      public async find(id: string) {

        const updatedarticle:IArticle|null = await Article.findById(
              id,
            
            ).exec();
        
            if (!updatedarticle) {
              throw new Error(`id '${id}' not found`);
            }
        
            return updatedarticle;
          }
      
  }
