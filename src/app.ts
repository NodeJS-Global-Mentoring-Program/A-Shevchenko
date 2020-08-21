import express from 'express';

import { usersRouter } from './routers';
import { initDB } from './loaders';
import { UserModel } from './models';

const port = process.env.PORT || 3000;

const app = express();
const jsonParser = express.json();

const UModel = new UserModel();
const db = initDB(UModel);

app.use(jsonParser);
app.use('/users/', usersRouter);

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
