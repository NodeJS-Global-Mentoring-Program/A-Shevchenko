import express from 'express';
import bunyan from 'bunyan';

import { usersRouter, groupsRouter } from './routers';
import { UserModel, GroupModel } from './models';
import { initDB } from './loaders';

const log = bunyan.createLogger({ name: "NodeJS" });
const port = process.env.PORT || 3000;

const app = express();
const jsonParser = express.json();

const UModel = new UserModel();
const GModel = new GroupModel();
const db = initDB(UModel, GModel);

app.use(jsonParser);
app.use('/users/', usersRouter);
app.use('/groups/', groupsRouter);

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});

process.on('uncaughtException', (err) => {
    log.error(err);
});
