import users from '../data/users.js';

const allUsers = () => users.data;

const checkUserExist = (username) => allUsers().map((user) => user.username).includes(username);

const usersDetails = (username) => allUsers().filter((user) => user.username === username);

const newUsers = (user) => {
  users.data.push(user);

  return allUsers().filter((newUser) => newUser.username === user.username);
};

const deleteUser = (username) => {
  const index = users.data.findIndex((user) => user.username === username);
  if (index !== -1) {
    return users.data.splice(index, 1);
  }
  return [];
};

export default { usersDetails, newUsers, deleteUser, allUsers, checkUserExist, users };
