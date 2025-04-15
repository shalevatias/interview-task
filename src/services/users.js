import dal from '../dal/users/users.js';
import Joi from 'joi';
import { UserAlreadyExist, UserDoesntExist, InputErrors } from '../errors.js';

const allowedKeys = ['username', 'first_name', 'last_name', 'birthdate'];

const newUserSchema = Joi.object({
  username: Joi.string().trim().required(),
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  birthdate: Joi.date().required()
}).unknown(false);

const usersDetails = async (username) => {
  const details = await dal.usersDetails(username);
  if (details.length === 0) throw new UserDoesntExist(username);
  return details;
};

const newUsers = async (user) => {
  const extraKeys = Object.keys(user).filter(key => !allowedKeys.includes(key));
  if (extraKeys.length > 0) throw new InputErrors(`Extra fields not allowed: ${extraKeys.join(', ')}`);
  const { error, value } = newUserSchema.validate(user, { allowUnknown: false });
  if (error != null) throw new InputErrors(error.message);
  if (await dal.checkUserExist(value.username)) throw new UserAlreadyExist(value.username);
  const created = await dal.newUsers(value);
  return created[0].username;
};

const deleteUser = async (username) => {
  const deletedUser = await dal.deleteUser(username);
  if (deletedUser.length !== 1) throw new UserDoesntExist(username);
  return deletedUser[0];
};

export default { usersDetails, newUsers, deleteUser, dal };
