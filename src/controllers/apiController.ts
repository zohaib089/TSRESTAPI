import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { ApiService } from "../services/ApiService";
import User from "../models/Users/UserModel";

export class ApiController {
  public router = Router();

  constructor(private ApiService: ApiService) {
    this.setRoutes();
  }
  /**
   * setRoutes
   */
  public setRoutes() {
    this.router.get("/", this.sayHello);
    this.router.route("/add").post(this.add);
    this.router.get("/all", this.findAll);
    this.router.route("/:id").delete(this.delete).put(this.update);
  }

  private sayHello = (_: Request, res: Response) => {
    const welcomeMessage = this.ApiService.getWelcomeMessage();
    res.send(welcomeMessage);
  };

  private findAll = async (
    req: Request,

    res: Response
  ) => {
    try {
      let token: any = req.header("authorization");
      let secret = "zohaibmirza";
      const verifyToken: any = await jwt.verify(token, secret);
      const pokemon = await this.ApiService.findAll();
      res.send(pokemon);
    } catch (e) {
      res.status(500).send({ msg: "No Authorized" });
    }
  };

  private checkToken = () => {};

  // Our new add method
  private add = async (req: Request, res: Response) => {
    try {
      const addPokemonResult = await this.ApiService.add(req.body);
      res.send(addPokemonResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
  private delete = async (req: Request, res: Response) => {
    try {
      const deletePokemonResult = await this.ApiService.delete(req.params.id);
      res.send(deletePokemonResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      const updatePokemonResult = await this.ApiService.update(
        req.params.id,
        req.body
      );
      res.send(updatePokemonResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}
