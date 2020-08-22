import Joi from '@hapi/joi';

export const GroupQuerySchema = Joi.object({
	name: Joi.string().min(3).required()
});
