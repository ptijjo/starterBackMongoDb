import jwt from 'jsonwebtoken';
import { Response,response,NextFunction } from 'express';

module.exports = (req:Response, res:Response, next:NextFunction) => {
    try {

        if (!req.headers.authorization) {
            throw new Error('Authorization header is missing');
          }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    }

    catch (error) {
        res.status(401).json({ error });
    }


}