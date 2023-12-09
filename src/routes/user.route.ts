/**
 * @UserRoute est une classe qui définira toutes les routes possibles pour nos utilisateurs et qui héritera de l'interface Route
 * cette classe nous permettra d'utiliser les CRUD pour un utilisateur
 */

import { Router } from "express";
import { Route } from ".";
import { userController } from "../controllers/user.controller";


export class UserRoute implements Route{
    path="/users"
    router = Router();
    userCtrl = new userController();

    constructor(){
        this.router
            .get(`${this.path}`,this.userCtrl.findAll)
            .get(`${this.path}/:id`,this.userCtrl.findOne)
            .post(`${this.path}`)
            .put(`${this.path}/:id`)
            .delete(`${this.path}/:id`)
    }
}