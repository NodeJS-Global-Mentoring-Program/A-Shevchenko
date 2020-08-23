import { sequelize } from './../config';
import { UserModel, GroupModel } from './../models';

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
        await sequelize.sync({ logging: false });
        console.log('DB synced up');
    } catch (error) {
        console.error('Unable to sync the database:', error);
    }
};

export const initDB = async (userModel: UserModel, groupModel: GroupModel, init = false) : Promise<void> => {
    await sync();
    await connect();

    if (init) {
        await groupModel.initGroups(3);
        await userModel.initUsers(3);
    }
};