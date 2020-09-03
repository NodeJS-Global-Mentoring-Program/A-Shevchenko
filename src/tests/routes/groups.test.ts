import request from "supertest";
import { UserModel, GroupModel } from './../../models';
import { initDB } from './../../loaders';
import { IGroup } from './../../types';
import { groupsRouter } from "./../../routers/groups";

describe("Groups controller", () => {
    const UModel = new UserModel();
    const GModel = new GroupModel();

    beforeAll(async done => {
        await initDB(UModel, GModel, true);
        done();
    });

    test("Get all groups", done => {
        request(groupsRouter)
            .get("/")
            .then(response => {
                expect(response.body.length).toBe(3);
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Create group", done => {
        const group = {
            name: 'Group4'
        };

        request(groupsRouter)
            .post('/')
            .send(group)
            .then(response => {
                expect(response.body.length).toBe(4);
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Get group", done => {
        request(groupsRouter)
            .get("/1")
            .then(response => {
                expect(response.body[0].id).toBe(1);
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Update group", done => {
        const groupId = 1;
        const group = {
            name: 'Group11'
        };

        request(groupsRouter)
            .put(`/${groupId}`)
            .send(group)
            .then(response => {
                expect(response.body.find((el: IGroup) => el.id === groupId).name).toBe(group.name);
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Delete group", done => {
        const groupId = 1;

        request(groupsRouter)
            .delete(`/${groupId}`)
            .then(response => {
                expect(response.body.some((el: IGroup) => el.id === groupId)).toBeFalsy();
                expect(response.status).toBe(200);
                done();
            });
    });
});
