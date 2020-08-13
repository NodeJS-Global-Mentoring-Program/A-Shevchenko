import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { createValidator, ExpressJoiError } from 'express-joi-validation';
import 'joi-extract-type';

import { getUserById, getUsers, removeUser, createUser, updateUser } from './../controllers';
import { getAutoSuggestUsers } from './../utils';
import { User } from './../models';
import { userQuerySchema, errorHandler } from './../validation';

const app = express();
const validator = createValidator({ passError: true });

app.get('/auto-suggest', async (req, res) => {
    const { str, limit } = req.body;
    const result = await getAutoSuggestUsers(str, limit);

    errorHandler(!!result, res, result);
});

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await getUserById(id);

    errorHandler(!!result, res, result);
});

app.get('/', async (req, res) => {
    const result = await getUsers();

    errorHandler(!!result, res, result);
});

app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await removeUser(id);
    const users = await getUsers();

    errorHandler(result, res, users);
});

app.put('/:id', validator.body(userQuerySchema), async (req, res) => {
    const { params, body } = req;
    const { id } = params;
    const result = await updateUser(id, body);
    const users = await getUsers();

    errorHandler(result, res, users);
});

app.post('/', validator.body(userQuerySchema), async (req, res) => {
    const userData: User = {
        ...req.body,
        id: uuid(),
        isDeleted: false
    };
    const result = await createUser(userData);
    const users = await getUsers();

    errorHandler(result, res, users);
});

app.use((err: ExpressJoiError, req: Request, res: Response, next: NextFunction) => {
    const { error, type } = err || {};

    if (error && error.isJoi) {
        res.status(400).json({
            type: type,
            message: error.toString()
        });
    } else {
        next(err);
    }
});

export const usersRouter = app;
