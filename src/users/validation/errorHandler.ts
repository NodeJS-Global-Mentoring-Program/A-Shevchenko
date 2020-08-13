import { Response } from 'express';

import { User } from '../models';

export const errorHandler = (result: boolean, res: Response, data: User[] | User): void => {
    if (result) {
        res.send(data);
    } else {
        res.status(400).json({ error: result });
    }
};
