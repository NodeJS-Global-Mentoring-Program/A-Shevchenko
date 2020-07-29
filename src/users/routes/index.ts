import express from 'express';

import { getUserById, getUsers, removeUser, createUser, updateUser } from './../controllers';
import { getAutoSuggestUsers } from './../utils';

const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await getUserById(id);

    res.send(result);
});

router.get('/', async (req, res) => {
    const result = await getUsers();

    res.send(result);
});

router.get('/auto-suggest', async (req, res) => {
    const { str, limit } = req.body;
    const result = await getAutoSuggestUsers(str, limit);

    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await removeUser(id);

    if (result) {
        const users = await getUsers();

        res.send(users);
    } else {
        res.status(400).end();
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await updateUser(id, req.body);

    if (result) {
        const users = await getUsers();

        res.send(users);
    } else {
        res.status(400).end();
    }
});

router.post('/', async (req, res) => {
    const result = await createUser(req.body);

    if (result) {
        const users = await getUsers();

        res.send(users);
    } else {
        res.status(400).end();
    }
});

export const usersRouter = router;
