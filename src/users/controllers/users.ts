import { users, setNewData } from './../data';
import { User } from './../models';

export const getUserById = (id: string): User | undefined => {
	return users
		.filter(({ isDeleted }) => !isDeleted)
		.find(item => item.id === id);
};

export const getUsers = (): User[] => {
    return users.filter(({ isDeleted }) => !isDeleted);
};

export const removeUser = (id: string): boolean => {
	const user = getUserById(id);

	if (user) {
		const newData = users.filter(el => el.id !== id);

		setNewData(newData);

		return true;
	}

	return false;	
};

export const createUser = (userData: User): boolean => {
	users.push({
		...userData,
		isDeleted: false
	});

	return true;	
};

export const updateUser = (id: string, userData: User): boolean => {
	const user = getUserById(id);

	if (user) {
		const newData = users.map(el => {
			if (el.id === id) {
				return {
					...el,
					...userData
				};
			}
			
			return el;
		});

		setNewData(newData);

		return true;
	}

	return false;	
};
