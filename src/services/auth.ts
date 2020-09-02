import * as jwt from 'jsonwebtoken';

import { UserModel } from './../models';

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
        const signature = 'Lfd_erle334Wdsd';
        const expiration = '6h';
    
        return jwt.sign({ data, }, signature, { expiresIn: expiration });
    }

    async login(username: string, password: string): Promise<string> {
        const user = await this.userModel.getByAuth(username, password);

        if (!user) {
            return null;
        } else {
            return this.generateToken(username);
        }
    }
}
