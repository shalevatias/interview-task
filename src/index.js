import express from 'express';
import messagesRouter from './routers/messages.js';
import usersRouter from './routers/users.js';
import logger from './logger.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/messages', messagesRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});