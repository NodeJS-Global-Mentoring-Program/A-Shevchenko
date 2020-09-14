import express from 'express';
import { createValidator } from 'express-joi-validation';
import 'joi-extract-type';

import { AuthQuerySchema } from './../validation';
import { AuthService } from './../services';
import { UserModel } from './../models';
import { errorMiddleware } from './../middlewares';
import { errorHandler } from './../utils';

const app = express();
const validator = createValidator({ passError: true });

const UModel = new UserModel();
const AService = new AuthService(UModel);

app.post('/auth', validator.body(AuthQuerySchema), async (req, res) => {
    const { login, password } = req.body;

    const token = await AService.login(login, password).catch(err => errorHandler(req, res, err));
    const resMessage = token || "Not valid login/password";

    return res.json(resMessage);
});

app.use(errorMiddleware);

export const authRouter = app;
