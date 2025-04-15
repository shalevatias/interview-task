import dal from '../dal/messages/messages.js';
import users from '../dal/users/users.js';
import Joi from 'joi';
import { UserDoesntExist, InputErrors, MessageDoesntExist, NoMessagesToUser } from '../errors.js';

const newMessageSchema = Joi.object().keys({
  from: Joi.string().trim().required(),
  to: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
});

const usersMessages = async (username) => {
  const messages = await dal.usersMessages(username);
  if ((messages).length === 0) 
    throw new NoMessagesToUser(username);

  return messages;

};

const newMessage = async (message) => {
  const { error } = newMessageSchema.validate(message);

  if (error != null) 
    throw new InputErrors(error.message);

  if (!(await users.checkUserExist(message.from)))
      throw new UserDoesntExist(message.from);

  if (!(await users.checkUserExist(message.to)))
      throw new UserDoesntExist(message.to);

  const created = await dal.newMessage(message);
  return created[0].id;
};

const deleteMessage = async (messageID) => {
  const deletedMessage = (await dal.deleteMessage(messageID));
  if ((deletedMessage).length === 0)
      throw new MessageDoesntExist(messageID);

  return deletedMessage[0];

};

export default { usersMessages, newMessage, deleteMessage };
