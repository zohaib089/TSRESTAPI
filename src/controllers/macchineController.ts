
import { Request, Response, Router } from "express";
import { MacchineService } from "../services/MacchineService";

export class MacchineController {
    public router = Router();
    
    constructor(private MacchineService:MacchineService) {
        this.setRoutes()
    }
    /**
   * setRoutes
   */
  public setRoutes() {
    this.router.get('/macchine',this.findAll);
    this.router.route('/macchine/add').post(this.add);
    this.router.route("/macchine/:id").delete(this.delete).put(this.update).get(this.findone);
}

  private findAll = async (_: Request, res: Response) => {
    try {
      const macchine = await this.MacchineService.findAll();
      res.send(macchine);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  
  // Our new add method
  private add = async (req: Request, res: Response) => {
   
    try {
      const addmacchineResult = await this.MacchineService.add(req.body);
      res.send(addmacchineResult);
    } catch (e) {
      res.status(500).send(e.message);
    }

}
private delete = async (req: Request, res: Response) => {
    try {
      const deletemacchineResult = await this.MacchineService.delete(
        req.params.id
      );
      res.send(deletemacchineResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };


  private update = async (req: Request, res: Response) => {
    try {
      const updatemacchineResult = await this.MacchineService.update(
        req.params.id,
        req.body
      );
      res.send(updatemacchineResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };  
  private findone = async (req: Request, res: Response) => {
    try {
      const updatemacchineResult = await this.MacchineService.find(
        req.params.id
      );
      res.send(updatemacchineResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };  

}