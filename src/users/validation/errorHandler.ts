import { Response } from 'express';
import { Model } from 'sequelize';

import { User } from './../models';

export const errorHandler = (result: boolean, res: Response, data: Model<User, User>[]): void => {
    if (result) {
        res.send(data);
    } else {
        res.status(400).json({ error: result });
    }
};
