import Joi from '@hapi/joi';

export const UserQuerySchema = Joi.object({
	login: Joi.string().alphanum().min(3).max(20).required(),
	password: Joi.string().min(5).max(20).pattern(/^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/).required(),
	age: Joi.number().integer().min(4).max(130).required()
});
