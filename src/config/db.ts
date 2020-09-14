import { Sequelize } from 'sequelize';

const { DB_USER, DB_PASS, DB_HOST } = process.env;

export const sequelize = new Sequelize({
    username: DB_USER,
    password: DB_PASS,
    host: DB_HOST,
    dialect: 'postgres',
    database: 'nodejs',
    port: 5432
});

export const secretKey = 'Lfd_erle334Wdsd';
