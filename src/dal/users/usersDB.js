import db from '../data/db.js';
import querys from '../users/usersQuery.js';

const allUsers = async () => (await db.query(querys.allUsers)).rows;

const checkUserExist = async (username) => {
  const result = await db.query('SELECT 1 FROM users WHERE username = $1', [username]);
  return result.rowCount > 0;
};

const usersDetails = async (username) => (await db.query(querys.usersDetails, [username])).rows;

const newUsers = async (user) => {
  const { username, first_name, last_name, birthdate } = user;

  return (await db.query(querys.newUsers, [username, first_name, last_name, birthdate])).rows;

};

const deleteUser = async (username) => (await db.query(querys.deleteUser, [username])).rows;

export default {
  allUsers,
  checkUserExist,
  usersDetails,
  newUsers,
  deleteUser
};
