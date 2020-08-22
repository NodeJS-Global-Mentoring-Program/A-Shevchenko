import { Model } from 'sequelize';

import { IGroup, IGroupDB, IGroupPermissionsDB } from './../types';

export class GroupModel {
	async initGroups (limit: number): Promise<void> {
		for (let i = 1; i <= limit; i++) {
			await IGroupDB.create({
				name: `Group${i}`
			});

			for (let j = 1; j <= limit; j++) {
				await IGroupPermissionsDB.create({
					gId: i,
					pId: j
				});
			}
		}
	}

	async getById (id: string): Promise<Model<IGroup, IGroup>[]> {
		const groups = await IGroupDB.findAll({
			where: {
				id: id
			}
		});
	
		return groups;
	}

	async getAll (): Promise<Model<IGroup, IGroup>[]> {
		const groups = await IGroupDB.findAll();
	
		return groups;
	}

	async remove (id: string): Promise<number> {
		const groups = await IGroupDB.destroy({
			where: {
				id: id
			}
		});
	
		return groups;
	}

	async create (groupData: IGroup): Promise<Model<IGroup, IGroup>> {
		const groups = await IGroupDB.create(groupData);
	
		return groups;	
	}

	async update(id: string, groupData: IGroup): Promise<[number, Model<IGroup, IGroup>[]]> {
		const groups = await IGroupDB.update(groupData, {
			where: {
				id: id
			}
		});
	
		return groups;	
	}
}
