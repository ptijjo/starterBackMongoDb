import express from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import "dotenv/config";
import { Route } from "./routes";

export class App{

    private port: number | string;
    private app: express.Application;
    private  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

    constructor(routes:Route[]){
        this.app = express(); 
        this.port = process.env.PORT || 8585;
        this.server = http.createServer(this.app);

        this.listen();
        this.initilizeServer();
        this.mongodbCOnnection();
        this.initializeRoutes(routes)

    }

    //Méthode pour écouter sur quel port notre serveur tourne
    private listen():void{
        this.server.listen(this.port, ()=>{
            console.log(`🚀 Notre serveur tourne sur le port : ${this.port}`)   
        })
    }

    //Méthode qui initialise notre serveur
    private initilizeServer():void{
        this.app
        .use(cors())
        .use(morgan("dev"))
        .use(express.json())
    }

    //Méthode pour la connection a mongodb
    private mongodbCOnnection = async ()=>{
        try {
            
            await mongoose.connect(`mongodb+srv://${process.env.ID}:${process.env.PASSwORD}@${process.env.SERVER_MONGODB}.mongodb.net/?retryWrites=true&w=majority`)

            console.log(`Connection à mongoDB réussie !!! 👍`);
            
        } catch (error) {
            console.log(`Connection à mongoDb échouée !!! 🤯 : ${error}`);
            
        }
    }

    //Méthode pour les différentes routes
    private initializeRoutes(routes:Route[]){
        routes.forEach(route =>{
            this.app.use("/",route.router)
        })
    }
    
}