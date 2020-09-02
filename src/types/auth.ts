import { IUser } from './users';

export type IUserAuth = IUser & {
	token: string
}
