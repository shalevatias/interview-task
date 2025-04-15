import db from '../data/db.js';
import querys from '../messages/messagesQuery.js';

const allMessages = async () => {
  const result = await db.query(querys.allMessages);
  return result.rows;

};

const usersMessages = async (username) => (await db.query(querys.usersMessages, [ username ])).rows;

const newMessage = async (message) => {
  const {from, to, content} = message; 
  return (await db.query(querys.newMessage, [from, to, content])).rows;

};

const deleteMessage = async (messageID) => (await db.query(querys.deleteMessage, [ messageID ])).rows;

export default {
  allMessages,
  usersMessages,
  newMessage,
  deleteMessage,
};
