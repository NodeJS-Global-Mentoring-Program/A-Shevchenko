import { Model, Op } from 'sequelize';

import { User } from './../models';
import { UserDB } from './../database';

export const initUsers = async (limit: number): Promise<void> => {
	for (let i = 1; i <= limit; i++) {
		await UserDB.create({
			login: `User${i}`,
			password: `password${i}`,
			age: i * 10
		});
	}
};

export const getUserById = async (id: string): Promise<Model<User, User>[]> => {
	const users = await UserDB.findAll({
		where: {
			isDeleted: false,
			id: id
		}
	});

	return users;
};

export const getUsers = async (): Promise<Model<User, User>[]> => {
	const users = await UserDB.findAll({
		where: {
			isDeleted: false
		}
	});

    return users;
};

export const getAutoSuggestUsers = async (loginSubstring = '', limit = 10): Promise<Model<User, User>[]> => {
	const users = await UserDB.findAll({
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
};

export const removeUser = async (id: string): Promise<number> => {
	const users = UserDB.destroy({
		where: {
			id: id
		}
	});

	return users;
};

export const createUser = async (userData: User): Promise<Model<User, User>> => {
	const users = UserDB.create(userData);

	return users;	
};

export const updateUser = async (id: string, userData: User): Promise<[number, Model<User, User>[]]> => {
	const users = UserDB.update(userData, {
		where: {
			id: id
		}
	});

	return users;	
};
