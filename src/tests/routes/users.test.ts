import request from "supertest";
import { UserModel, GroupModel } from './../../models';
import { initDB } from './../../loaders';
import { IUser } from './../../types';
import { usersRouter } from "./../../routers/users";

describe("Users controller", () => {
    const UModel = new UserModel();
    const GModel = new GroupModel();

    beforeAll(async done => {
        await initDB(UModel, GModel, true);
        done();
    });

    test("Auto-suggest", done => {
        request(usersRouter)
            .get("/auto-suggest")
            .send({
                str: "User",
                limit: 2
            })
            .then(response => {
                expect(response.body.length).toBe(2);
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Get all users", done => {
        request(usersRouter)
            .get("/")
            .then(response => {
                expect(response.body.length).toBe(3);
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Create user", done => {
        const user = {
            login: 'User4',
            password: 'password4',
            age: 43
        };

        request(usersRouter)
            .post('/')
            .send(user)
            .then(response => {
                expect(response.body.length).toBe(4);
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Get user", done => {
        request(usersRouter)
            .get("/1")
            .then(response => {
                expect(response.body[0].id).toBe(1);
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Update user", done => {
        const userId = 1;
        const user = {
            login: 'User11',
            password: 'password11',
            age: 33
        };

        request(usersRouter)
            .put(`/${userId}`)
            .send(user)
            .then(response => {
                expect(response.body.find((el: IUser) => el.id === userId).login).toBe(user.login);
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Delete user", done => {
        const userId = 1;

        request(usersRouter)
            .delete(`/${userId}`)
            .then(response => {
                expect(response.body.some((el: IUser) => el.id === userId)).toBeFalsy();
                expect(response.status).toBe(200);
                done();
            });
    });
});
