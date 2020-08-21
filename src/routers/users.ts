import express from 'express';
import { createValidator } from 'express-joi-validation';
import 'joi-extract-type';

import { UserQuerySchema } from './../validation';
import { UserService } from './../services';
import { UserModel } from './../models';
import { errorMiddleware } from './main';

const app = express();
const validator = createValidator({ passError: true });

const UModel = new UserModel();
const UService = new UserService(UModel);

app.get('/auto-suggest', async (req, res) => {
    const { str, limit } = req.body;

    const users = await UService.getAutoSuggests(str, limit);

    return res.json(users);
});

app.route('/:id')
    .get(async (req, res) => {
        const { id } = req.params;

        const users = await UService.getById(id);

        return res.json(users);
    })
    .delete(async (req, res) => {
        const { id } = req.params;
    
        const users = await UService.remove(id);
    
        return res.json(users);
    })
    .put(validator.body(UserQuerySchema), async (req, res) => {
        const { params, body } = req;
        const { id } = params;
    
        const users = await UService.update(id, body);
    
        return res.json(users);
    });

app.route('/')
    .get(async (req, res) => {
        const users = await UService.getAll();

        return res.json(users);
    })
    .post(validator.body(UserQuerySchema), async (req, res) => {
        const { body } = req;
    
        const users = await UService.create(body);
    
        return res.json(users);
    });

app.use(errorMiddleware);

export const usersRouter = app;
