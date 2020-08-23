import { Request, Response, NextFunction } from 'express';
import bunyan from 'bunyan';

const log = bunyan.createLogger({ name: "NodeJS" });

export const logMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    log.info({
        method: req.method,
        body: req.body,
        query: req.query,
        params: req.params
    });

    next();
};
