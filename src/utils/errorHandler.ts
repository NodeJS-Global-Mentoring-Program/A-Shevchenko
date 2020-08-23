import bunyan from 'bunyan';
import { Request, Response } from 'express';

const log = bunyan.createLogger({ name: "NodeJS" });

export const errorHandler = (req: Request, res: Response, err: Error): void => {
    log.error({
        method: req.method,
        body: req.body,
        query: req.query,
        params: req.params,
        err: err.message.toString()
    });

    res.status(500).json({
        type: 'Internal Server Error',
        message: err.message.toString()
    });
};
