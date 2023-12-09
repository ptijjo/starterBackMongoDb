import { Request,Response,NextFunction } from "express"
import {User} from "../models/user.model";
import { UserInterface } from "../models/user.interface";


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

    public newUser = async (req: Request, res: Response): Promise<void> => {
        try {

          
            const newUser = await User.create({
                
            })
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    }
}