/**
 * @UserRoute est une classe qui définira toutes les routes possibles pour nos utilisateurs et qui héritera de l'interface Route
 * cette classe nous permettra d'utiliser les CRUD pour un utilisateur
 */

import { Router } from "express";
import { Route } from ".";
import { userController } from "../controllers/user.controller";
import {pictureMulter} from "../middleware/picture-multer";


export class UserRoute implements Route{
    path="/users"
    router = Router();
    userCtrl = new userController();

    constructor(){
        this.router
            .get(`${this.path}`,this.userCtrl.findAll)
            .get(`${this.path}/:id`,this.userCtrl.findOne)
            .post(`${this.path}`, this.userCtrl.newUser)
            .post(`${this.path}/connection`, this.userCtrl.connectionUser)
            .put(`${this.path}/:id`,pictureMulter)
            .delete(`${this.path}/:id`,this.userCtrl.deleteUser)
    }
}