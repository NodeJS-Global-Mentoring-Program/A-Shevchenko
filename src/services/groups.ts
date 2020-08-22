import { Model } from 'sequelize';

import { IGroup } from './../types';
import { GroupModel } from './../models';

export class GroupService {
    private GroupModel: GroupModel;

    constructor(GroupModel: GroupModel) {
        this.GroupModel = GroupModel;
    }

    async getById(id: string): Promise<Model<IGroup, IGroup>[]> {
        const groups = await this.GroupModel.getById(id);

        return groups;
    }

    async getAll(): Promise<Model<IGroup, IGroup>[]> {
        const groups = await this.GroupModel.getAll();

        return groups;
    }

    async remove(id: string): Promise<Model<IGroup, IGroup>[]> {
        const isRemoved = await this.GroupModel.remove(id);
        const groups = await this.GroupModel.getAll();

        return groups;
    }

    async update(id: string, userData: IGroup): Promise<Model<IGroup, IGroup>[]> {
        const isUpdated = await this.GroupModel.update(id, userData);
        const groups = await this.GroupModel.getAll();

        return groups;
    }

    async create(userData: IGroup): Promise<Model<IGroup, IGroup>[]> {
        const isCreated = await this.GroupModel.create(userData);
        const groups = await this.getAll();

        return groups;
    }
}
