import { Request, Response, NextFunction } from 'express';
import { ExpressJoiError } from 'express-joi-validation';
import 'joi-extract-type';

export const errorMiddleware = (err: ExpressJoiError, req: Request, res: Response, next: NextFunction): void => {
    const { error, type } = err || {};
    console.log(err);

    if (error && error.isJoi) {
        res.status(400).json({
            type: type,
            message: error.toString()
        });
    } else if (error) {
        res.status(500).json({
            type: type,
            message: error.toString()
        });
    } else {
        next(err);
    }
};
