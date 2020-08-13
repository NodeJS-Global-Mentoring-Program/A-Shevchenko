import { User } from './../models';
import { users } from './../data';
import { userComparator } from './userComparator';

export const getAutoSuggestUsers = (loginSubstring = '', limit = 10): User[] => {
	return users
		.filter(({ login }) => login.toLowerCase().includes(loginSubstring.toLowerCase()))
		.filter((_, i) => i < limit)
		.sort(userComparator);
};
