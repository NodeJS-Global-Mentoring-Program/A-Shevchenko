import { Model, Op } from 'sequelize';
import md5 from 'md5';

import { IUser, IUserDB } from './../types';
import { random } from './../utils';

export class UserModel {
	private transformData (userData: IUser): IUser {
		const { password } = userData;

		return {
			...userData,
			password: md5(password)
		};
	}

	async initUsers (limit: number): Promise<void> {
		for (let i = 1; i <= limit; i++) {
			await IUserDB.create({
				login: `User${i}`,
				password: md5(`password${i}`),
				age: random()
			});
		}
	}

	async getById (id: string): Promise<Model<IUser, IUser>[]> {
		const users = await IUserDB.findAll({
			where: {
				isDeleted: false,
				id: id
			}
		});
	
		return users;
	}

	async getAll (): Promise<Model<IUser, IUser>[]> {
		const users = await IUserDB.findAll({
			where: {
				isDeleted: false
			}
		});
	
		return users;
	}

	async getAutoSuggests (loginSubstring = '', limit = 10): Promise<Model<IUser, IUser>[]> {
		const users = await IUserDB.findAll({
			where: {
				isDeleted: false,
				login: {
					[Op.substring]: loginSubstring
				}
			},
			limit: limit,
			order: [
				['login', 'DESC']
			]
		});
	
		return users;
	}

	async remove (id: string): Promise<number> {
		const users = await IUserDB.destroy({
			where: {
				id: id
			}
		});
	
		return users;
	}

	async create (userData: IUser): Promise<Model<IUser, IUser>> {
		const data = this.transformData(userData);
		const users = await IUserDB.create(data);
	
		return users;	
	}

	async update(id: string, userData: IUser): Promise<[number, Model<IUser, IUser>[]]> {
		const data = this.transformData(userData);
		const users = await IUserDB.update(data, {
			where: {
				id: id
			}
		});
	
		return users;	
	}
}
