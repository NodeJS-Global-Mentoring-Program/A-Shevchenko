import express from 'express';
import { createValidator } from 'express-joi-validation';
import 'joi-extract-type';

import { GroupQuerySchema } from './../validation';
import { GroupService } from './../services';
import { GroupModel } from './../models';
import { errorMiddleware, logMiddleware } from './../middlewares';
import { errorHandler } from './../utils';

const app = express();
const validator = createValidator({ passError: true });

const UModel = new GroupModel();
const GService = new GroupService(UModel);

app.route('/:id')
    .get(logMiddleware, async (req, res) => {
        const { id } = req.params;

        const groups = await GService.getById(id).catch(err => errorHandler(req, res, err));

        return res.json(groups);
    })
    .delete(logMiddleware, async (req, res) => {
        const { id } = req.params;
    
        const groups = await GService.remove(id).catch(err => errorHandler(req, res, err));
    
        return res.json(groups);
    })
    .put(logMiddleware, validator.body(GroupQuerySchema), async (req, res) => {
        const { params, body } = req;
        const { id } = params;
    
        const groups = await GService.update(id, body).catch(err => errorHandler(req, res, err));
    
        return res.json(groups);
    });

app.route('/')
    .get(logMiddleware, async (req, res) => {
        const groups = await GService.getAll().catch(err => errorHandler(req, res, err));

        return res.json(groups);
    })
    .post(logMiddleware, validator.body(GroupQuerySchema), async (req, res) => {
        const { body } = req;
    
        const groups = await GService.create(body).catch(err => errorHandler(req, res, err));
    
        return res.json(groups);
    });

app.use(errorMiddleware);

export const groupsRouter = app;
