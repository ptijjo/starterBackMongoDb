/**
 * @UserRoute est une classe qui définira toutes les routes possibles pour nos utilisateurs et qui héritera de l'interface Route
 * cette classe nous permettra d'utiliser les CRUD pour un utilisateur
 */

import { Router } from "express";
import { Route } from ".";


export class UserRoute implements Route{
    path="/users"
    router=Router();

    constructor(){
        this.router
            .get(`${this.path}`)
            .get(`${this.path}/:id`)
            .post(`${this.path}`)
            .put(`${this.path}/:id`)
            .delete(`${this.path}/:id`)
    }
}