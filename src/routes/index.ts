import { Router } from "express";

export interface Route{
    /**
     * @path sera le chemin du router
     * @router sera un Router d'express
     */
    path:string;
    router:Router;
}