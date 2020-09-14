import express from 'express';
import cors from 'cors';
import bunyan from 'bunyan';

import { usersRouter, groupsRouter, authRouter } from './routers';
import { UserModel, GroupModel } from './models';
import { initDB } from './loaders';

const log = bunyan.createLogger({ name: "NodeJS" });
const { PORT } = process.env;

const app = express();
const jsonParser = express.json();

const UModel = new UserModel();
const GModel = new GroupModel();
const db = initDB(UModel, GModel);

app.use(cors({
    "origin": true,
    "methods": "GET, PUT, POST, DELETE",
    "optionsSuccessStatus": 200
}));
app.use(jsonParser);
app.use(authRouter);
app.use('/users/', usersRouter);
app.use('/groups/', groupsRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
    log.error(err);
});
