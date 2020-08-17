import { Sequelize, DataTypes } from 'sequelize';

import { initUsers } from './../controllers';

const sequelize = new Sequelize({
    username: 'postgres',
    password: '1',
    host: 'localhost',
    dialect: 'postgres',
    database: 'nodejs',
    port: 5432
});

export const UserDB = sequelize.define('user', {
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
        type: DataTypes.STRING(20),
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
});

const connect = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

const sync = async () : Promise<void> => {
    try {
        await sequelize.sync();
        console.log('DB synced up');
    } catch (error) {
        console.error('Unable to sync the database:', error);
    }
};

export const initDB = async () : Promise<void> => {
    await sync();
    await connect();
    await initUsers(10);
};
