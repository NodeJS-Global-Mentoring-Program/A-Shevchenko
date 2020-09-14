import * as jwt from 'jsonwebtoken';

import { UserModel } from './../models';
import { secretKey } from './../config';

export class AuthService {
    private userModel: UserModel;

    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    private generateToken(username: string) {
        const data =  {
            user: username,
            time: +new Date()
        };
        const expiration = '6h';
    
        return jwt.sign({ data, }, secretKey, { expiresIn: expiration });
    }

    async login(login: string, password: string): Promise<string> {
        const user = await this.userModel.getByAuth(login, password);

        return user
            ? this.generateToken(login)
            : null;
    }
}
