import express from 'express';

import { usersRouter, groupsRouter } from './routers';
import { UserModel, GroupModel } from './models';
import { initDB } from './loaders';

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
