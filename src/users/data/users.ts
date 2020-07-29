import { v4 as uuid } from 'uuid';

import { User } from './../models';

export let users: User[] = [
    { id: uuid(), login: 'User1', password: '111', age: 10, isDeleted: false },
    { id: uuid(), login: 'User2', password: '222', age: 20, isDeleted: false },
    { id: uuid(), login: 'User3', password: '333', age: 30, isDeleted: true  },
    { id: uuid(), login: 'User4', password: '444', age: 40, isDeleted: false },
    { id: uuid(), login: 'User5', password: '555', age: 50, isDeleted: false }
];

export const setNewData = (data: User[]): void => {
    users = data;
};
