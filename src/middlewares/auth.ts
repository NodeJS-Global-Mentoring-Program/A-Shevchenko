import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { secretKey } from './../config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization;
    const jwttoken = token ? token.split(' ')[1].trim() : null;

    if (jwttoken) {
        jwt.verify(jwttoken, secretKey, (err: Error) => {
            if (err) {
                res.status(403).send({ success: false, message: 'Invalid token' });
            } else {
                next();
            }
        })
    } else {
        res.status(401).send({ success: false, message: 'Unauthorized' });
    }
};
