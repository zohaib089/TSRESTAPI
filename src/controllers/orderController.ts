
import { Request, Response, Router } from "express";
import { OrderService } from "../services/OrderService";

export class OrderController {
    public router = Router();
    
    constructor(private orderService:OrderService) {
        this.setRoutes()
    }
    /**
   * setRoutes
   */
  public setRoutes() {
    this.router.get('/order',this.findAll);
    this.router.route('/order/search').post(this.search);
    this.router.route('/order/add').post(this.add);
    this.router.route("/order/:id").delete(this.delete).put(this.update).get(this.findone);
}

  private findAll = async (_: Request, res: Response) => {
    try {
      const article = await this.orderService.findAll();
      res.send(article);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  
  // Our new add method
  private add = async (req: Request, res: Response) => {
   
    try {
      const addarticleResult = await this.orderService.add(req.body);
      res.send(addarticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }

}
private delete = async (req: Request, res: Response) => {
    try {
      const deletearticleResult = await this.orderService.delete(
        req.params.id
      );
      res.send(deletearticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };


  private update = async (req: Request, res: Response) => {
    try {
      const updatearticleResult = await this.orderService.update(
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
      const updatearticleResult = await this.orderService.search(
        req.body.code
      );
      res.send(updatearticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
  private findone = async (req: Request, res: Response) => {
    try {
      const updatearticleResult = await this.orderService.find(
        req.params.id
      );
      res.send(updatearticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };  

}