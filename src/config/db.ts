import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    username: 'postgres',
    password: '1',
    host: 'localhost',
    dialect: 'postgres',
    database: 'nodejs',
    port: 5432
});


