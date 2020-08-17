import express, { Request, Response, NextFunction } from 'express';
import { createValidator, ExpressJoiError } from 'express-joi-validation';
import 'joi-extract-type';

import { getUserById, getUsers, removeUser, createUser, updateUser, getAutoSuggestUsers } from './../controllers';
import { userQuerySchema, errorHandler } from './../validation';

const app = express();
const validator = createValidator({ passError: true });

app.get('/auto-suggest', async (req, res) => {
    const { str, limit } = req.body;

    await getAutoSuggestUsers(str, limit).then(data => {
        errorHandler(!!data, res, data);
    });
});

app.get('/:id', async (req, res) => {
    const { id } = req.params;

    await getUserById(id).then(data => {
        errorHandler(!!data, res, data);
    });
});

app.get('/', async (req, res) => {
    await getUsers().then(data => {
        errorHandler(!!data, res, data);
    });
});

app.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await removeUser(id);
    await getUsers().then(data => {
        errorHandler(!!data, res, data);
    });
});

app.put('/:id', async (req, res) => {
    const { params, body } = req;
    const { id } = params;
    
    await updateUser(id, body);
    await getUsers().then(data => {
        errorHandler(!!data, res, data);
    });
});

app.post('/', validator.body(userQuerySchema), async (req, res) => {
    const { body } = req;

    await createUser(body);
    await getUsers().then(data => {
        errorHandler(!!data, res, data);
    });
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
