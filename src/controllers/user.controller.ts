import { Request,Response,NextFunction } from "express"
import {User} from "../models/user.model";
import { UserInterface } from "../models/user.interface";
import bcrypt from "bcrypt";


export class userController{

    public findAll = async (req: Request, res: Response): Promise<void> => {
        
        try {
            const allUser: UserInterface[] = await User.find();

            res.status(200).json({
                message: "status ok! 👍",
                length: allUser.length,
                response: allUser
            })
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    };

    public findOne = async (req: Request, res: Response):Promise<void> => {
        try {
            const userId = Number(req.params.id);
            const oneUser = await User.findById(userId);

            res.status(200).json({
                message: "status ok! 👍",
                response: oneUser
            })
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    };

    public newUser = async (req: Request, res: Response) => {
        try {
            // Choix de l'avatar en fonction du genre choisi
            let urlPicture: string;
            const urlFemme = `${req.protocol}://${req.get('host')}/src/assets/defaultPicture/avatarFemme.png`;
            const urlHomme = `${req.protocol}://${req.get('host')}/src/assets/defaultPicture/avatarHomme.png`;
            (req.body.genre === "Homme") ? urlPicture = urlHomme : urlPicture = urlFemme;


            // Vérifier si l'email existe déja dans la base de données
            const existUser = await User.findOne({ email: req.body.email });
            //Si l'email existe on retourne un message
            if (existUser !== null) { return res.json({ response: "Email déja existant !" }) };

            //cryptage du mot de passe avec bcrypt
            const mdpCrypte = await bcrypt.hash(req.body.password, 10);

            //Creation du nouvel utilisateur
            const newUser = await User.create({
                ...req.body,
                password: mdpCrypte,
                picture: urlPicture,
            });

            res.status(201).json({
                message: "status ok! 👍",
                reponse: newUser
            });
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    }
}