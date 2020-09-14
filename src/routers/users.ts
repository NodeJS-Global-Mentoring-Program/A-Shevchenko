import express from 'express';
import { createValidator } from 'express-joi-validation';
import 'joi-extract-type';

import { UserQuerySchema } from './../validation';
import { UserService } from './../services';
import { UserModel } from './../models';
import { errorMiddleware, logMiddleware, authMiddleware } from './../middlewares';
import { errorHandler } from './../utils';

const app = express();
const validator = createValidator({ passError: true });
const jsonParser = express.json();

const UModel = new UserModel();
const UService = new UserService(UModel);

app.use(jsonParser);

app.get('/auto-suggest', logMiddleware, authMiddleware, async (req, res) => {
    const { str, limit } = req.body;

    const users = await UService.getAutoSuggests(str, limit).catch(err => errorHandler(req, res, err));

    return res.json(users);
});

app.route('/:id')
    .get(logMiddleware, authMiddleware, async (req, res) => {
        const { id } = req.params;

        const users = await UService.getById(id).catch(err => errorHandler(req, res, err));

        return res.json(users);
    })
    .delete(logMiddleware, authMiddleware, async (req, res) => {
        const { id } = req.params;
    
        const users = await UService.remove(id).catch(err => errorHandler(req, res, err));
    
        return res.json(users);
    })
    .put(logMiddleware, authMiddleware, validator.body(UserQuerySchema), async (req, res) => {
        const { params, body } = req;
        const { id } = params;
    
        const users = await UService.update(id, body).catch(err => errorHandler(req, res, err));
    
        return res.json(users);
    });

app.route('/')
    .get(logMiddleware, authMiddleware, async (req, res) => {
        const users = await UService.getAll().catch(err => errorHandler(req, res, err));

        return res.json(users);
    })
    .post(logMiddleware, authMiddleware, validator.body(UserQuerySchema), async (req, res) => {
        const { body } = req;
    
        const users = await UService.create(body).catch(err => errorHandler(req, res, err));
    
        return res.json(users);
    });

app.use(errorMiddleware);

export const usersRouter = app;
