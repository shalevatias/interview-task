import messages from '../data/messages.js';

const allMessages = () => messages.data;

const usersMessages = (username) => allMessages().filter((message) => message.to === username);

const newMessage = (message) => {
  const messageId = idGenerator();
  message.id = messageId;
  message.date_sent = new Date();
  messages.data.push(message);
  
  return allMessages().filter((element) => element.id === message.id);

};

const deleteMessage = (messageID) => {
  const index = messages.data.findIndex((message) => message.id === parseInt(messageID));
  if (index !== -1) {
    return messages.data.splice(index, 1);
  }
  return [];
};

const messageExist = (messageId) => allMessages().map((message) => message.id).includes(parseInt(messageId));

const idGenerator = () => Math.max(...messages.data.map((message) => message.id)) + 1;

export default { usersMessages, newMessage, deleteMessage, allMessages, messages, idGenerator, messageExist};
