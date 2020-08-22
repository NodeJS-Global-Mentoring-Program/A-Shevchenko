import { DataTypes } from 'sequelize';

import { sequelize } from './../config';

export type GroupPermision = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type IGroup = {
	id: string,
	name: string,
	permissions: GroupPermision[]
}

export const IGroupDB = sequelize.define('group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
	name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

export const IGroupPermissionsDB = sequelize.define('groups_permission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
	gId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'groups',
            key: 'id',
        }
    },
	pId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'permissions',
            key: 'id',
        }
    }
})
