
import { Request, Response, Router } from "express";
import { ArticleService } from "../services/ArticleService";

export class ArticleController {
    public router = Router();
    
    constructor(private ArticleService:ArticleService) {
        this.setRoutes()
    }
    /**
   * setRoutes
   */
  public setRoutes() {
    this.router.get('/article',this.findAll);
    this.router.route('/article/add').post(this.add);
    this.router.route("/article/:id").delete(this.delete).put(this.update).get(this.findone);
}

  private findAll = async (_: Request, res: Response) => {
      console.log('triggerd')
    try {
      const article = await this.ArticleService.findAll();
      res.send(article);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  
  // Our new add method
  private add = async (req: Request, res: Response) => {
   
    try {
      const addarticleResult = await this.ArticleService.add(req.body);
      res.send(addarticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }

}
private delete = async (req: Request, res: Response) => {
    try {
      const deletearticleResult = await this.ArticleService.delete(
        req.params.id
      );
      res.send(deletearticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };


  private update = async (req: Request, res: Response) => {
    try {
      const updatearticleResult = await this.ArticleService.update(
        req.params.id,
        req.body
      );
      res.send(updatearticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };  
  private findone = async (req: Request, res: Response) => {
    try {
      const updatearticleResult = await this.ArticleService.find(
        req.params.id
      );
      res.send(updatearticleResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };  

}