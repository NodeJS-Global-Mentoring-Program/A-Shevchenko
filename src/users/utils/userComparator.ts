import { User } from './../models';

export const userComparator = (user1: User, user2: User): number => {
    if (user1.login < user2.login) {
        return -1;
    }
    
    if (user1.login > user2.login) {
        return 1;
    }

    return 0;
};
