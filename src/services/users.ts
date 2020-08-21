import { Model } from 'sequelize';

import { IUser } from './../types';
import { UserModel } from './../models';

export class UserService {
    private userModel: UserModel;

    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    async getAutoSuggests(str: string, limit: number): Promise<Model<IUser, IUser>[]> {
        const users = await this.userModel.getAutoSuggests(str, limit);

        return users;
    }

    async getById(id: string): Promise<Model<IUser, IUser>[]> {
        const users = await this.userModel.getById(id);

        return users;
    }

    async getAll(): Promise<Model<IUser, IUser>[]> {
        const users = await this.userModel.getAll();

        return users;
    }

    async remove(id: string): Promise<Model<IUser, IUser>[]> {
        const isRemoved = await this.userModel.remove(id);
        const users = await this.userModel.getAll();

        return users;
    }

    async update(id: string, userData: IUser): Promise<Model<IUser, IUser>[]> {
        const isUpdated = await this.userModel.update(id, userData);
        const users = await this.userModel.getAll();

        return users;
    }

    async create(userData: IUser): Promise<Model<IUser, IUser>[]> {
        const isCreated = await this.userModel.create(userData);
        const users = await this.getAll();

        return users;
    }
}
