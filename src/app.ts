import express from 'express';

import { usersRouter } from './users/routes';

const port = process.env.PORT || 3000;

const app = express();
const jsonParser = express.json();

app.use(jsonParser);
app.use('/users/', usersRouter);

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
