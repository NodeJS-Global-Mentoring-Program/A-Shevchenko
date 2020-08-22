import express from 'express';
import { createValidator } from 'express-joi-validation';
import 'joi-extract-type';

import { GroupQuerySchema } from './../validation';
import { GroupService } from './../services';
import { GroupModel } from './../models';
import { errorMiddleware } from './main';

const app = express();
const validator = createValidator({ passError: true });

const UModel = new GroupModel();
const GService = new GroupService(UModel);

app.route('/:id')
    .get(async (req, res) => {
        const { id } = req.params;

        const groups = await GService.getById(id);

        return res.json(groups);
    })
    .delete(async (req, res) => {
        const { id } = req.params;
    
        const groups = await GService.remove(id);
    
        return res.json(groups);
    })
    .put(validator.body(GroupQuerySchema), async (req, res) => {
        const { params, body } = req;
        const { id } = params;
    
        const groups = await GService.update(id, body);
    
        return res.json(groups);
    });

app.route('/')
    .get(async (req, res) => {
        const groups = await GService.getAll();

        return res.json(groups);
    })
    .post(validator.body(GroupQuerySchema), async (req, res) => {
        const { body } = req;
    
        const groups = await GService.create(body);
    
        return res.json(groups);
    });

app.use(errorMiddleware);

export const groupsRouter = app;
