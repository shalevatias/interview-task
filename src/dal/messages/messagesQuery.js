const allMessages = 'SELECT * FROM messages';

const newMessage = 'INSERT INTO messages ("from", "to", content) VALUES ($1, $2, $3) RETURNING *';

const deleteMessage = 'DELETE FROM messages WHERE id=$1 RETURNING *';

const usersMessages = 'SELECT * FROM messages WHERE messages.to=$1';

export default {
  allMessages,
  newMessage,
  deleteMessage,
  usersMessages,
};
