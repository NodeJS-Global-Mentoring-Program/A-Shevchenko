import { DataTypes } from 'sequelize';

import { sequelize } from './../config';

export type IUser = {
	id: number,
	login: string,
	password: string,
	age: number,
	isDeleted: boolean
}

export const IUserDB = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
	login: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
	password: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
	age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
	isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

export const IUserPermissionsDB = sequelize.define('users_group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
	uId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        }
    },
	gId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'groups',
            key: 'id',
        }
    }
})
