
import {ApiController} from './controllers/apiController';
import {ApiService} from './services/ApiService';
import {OrderController} from './controllers/orderController';
import {OrderService} from './services/OrderService';
import {MacchineController} from './controllers/macchineController';
import {MacchineService} from './services/MacchineService';
import {ArticleController} from './controllers/articleController';
import {ArticleService} from './services/ArticleService';
import {ProductController} from './controllers/productController';
import {ProductService} from './services/ProductService';
import { MONGO_URL } from "./constants/apiConstants";
import bodyParser from "body-parser";
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose'

class App {
    public app:express.Application;


    constructor(){
        this.app = express();
        this.setConfig();
        this.setMongoConfig();
        this.setControllers();
    }


    private setConfig(){
        // Allow reqs with json format
        this.app.use(bodyParser.json({limit:"50mb"}));
        // Allow reqs x-form form
        this.app.use(bodyParser.urlencoded({limit:"50mb",extended:true}));
        // Cors usability
        this.app.use(cors());
    }

    private setControllers(){
        const apiController = new ApiController(new ApiService())
        const macchineController = new MacchineController(new MacchineService())
        const articleController = new ArticleController(new ArticleService())
        const productController = new ProductController(new ProductService())
        const orderController = new OrderController(new OrderService())

        this.app.use('',apiController.router)
        this.app.use('',macchineController.router)
        this.app.use('',articleController.router)
        this.app.use('',productController.router)
        this.app.use('',orderController.router)
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        });
        mongoose.set("toJSON", {
            virtuals: true,
            transform: (_: any, converted: any) => {
              delete converted._id;
            },
          });
      }
}


export default new App().app;