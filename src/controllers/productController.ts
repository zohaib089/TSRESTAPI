
import { Request, Response, Router } from "express";
import { ProductService } from "../services/ProductService";

export class ProductController {
    public router = Router();
    
    constructor(private ProductService:ProductService) {
        this.setRoutes()
    }
    /**
   * setRoutes
   */
  public setRoutes() {
    this.router.get('/product',this.findAll);
    this.router.route('/product/search').post(this.search);
    this.router.route('/product/add').post(this.add);
    this.router.route("/product/:id").delete(this.delete).put(this.update).get(this.findone);
}

  private findAll = async (_: Request, res: Response) => {
    try {
      const article = await this.ProductService.findAll();
      res.send(article);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  
  // Our new add method
  private add = async (req: Request, res: Response) => {
   
    try {
      const addarticleResult = await this.ProductService.add(req.body);
      res.send(addarticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }

}
private delete = async (req: Request, res: Response) => {
    try {
      const deletearticleResult = await this.ProductService.delete(
        req.params.id
      );
      res.send(deletearticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };


  private update = async (req: Request, res: Response) => {
    try {
      const updatearticleResult = await this.ProductService.update(
        req.params.id,
        req.body
      );
      res.send(updatearticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };  
  private search = async (req: Request, res: Response) => {
console.log('req.body', req.body.code)
    try {
      const updatearticleResult = await this.ProductService.search(
        req.body.code
      );
      res.send(updatearticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
  private findone = async (req: Request, res: Response) => {
    try {
      const updatearticleResult = await this.ProductService.find(
        req.params.id
      );
      res.send(updatearticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };  

}