const allUsers = 'SELECT * FROM users';
const newUsers = 'INSERT INTO users (username, first_name, last_name, birthdate) VALUES ($1, $2, $3, $4) RETURNING username';
const deleteUser = 'DELETE FROM users WHERE username=$1 RETURNING username';
const usersDetails = 'SELECT * FROM users WHERE username=$1';

export default {
  allUsers,
  newUsers,
  deleteUser,
  usersDetails,
};
