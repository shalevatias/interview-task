import express from 'express';
import messagesService from '../services/messages.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../logger.js';
import {
  MessageDoesntExist,
  UserDoesntExist,
  InputErrors,
  NoMessagesToUser
} from '../errors.js';

const router = express.Router();
const generalErrorMessage = 'General error';

router.get('/:username', async (req, res) => {
  try {
    const messages = await messagesService.usersMessages(req.params.username);
    logger.info(`[MESSAGES] - [GET] - [${StatusCodes.OK}] - ${req.params.username}`);
    res.status(StatusCodes.OK).json(messages);
  } catch (error) {
    if (error instanceof UserDoesntExist) {
      res.status(StatusCodes.NOT_FOUND).send(`Error: User ${req.params.username} doesn't exist.`);
      logger.info(`[MESSAGES] - [GET] - [${StatusCodes.NOT_FOUND}] - ${req.params.username}`);
    } else if (error instanceof NoMessagesToUser) {
      res.status(StatusCodes.NOT_FOUND).send(`Error: There are no messages to ${req.params.username}.`);
      logger.info(`[MESSAGES] - [GET] - [${StatusCodes.NOT_FOUND}] - ${error.message}`);
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(generalErrorMessage);
      logger.error(error);
    }
  }
});

router.post('/', async (req, res) => {
  const { from, to, content } = req.body;

  try {
    const newMessageId = await messagesService.newMessage({ from, to, content });
    logger.info(
      `[MESSAGES] - [POST] - [${StatusCodes.CREATED}] - New message sent (ID ${newMessageId}).`
    );
    res.status(StatusCodes.CREATED).json({ id: newMessageId });
  } catch (error) {
    if (error instanceof InputErrors) {
      logger.info(`[MESSAGES] - [POST] - [${StatusCodes.BAD_REQUEST}] - ${error.message}`);
      res.status(StatusCodes.BAD_REQUEST).send(error.message);
    } else if (error instanceof UserDoesntExist) {
      logger.info(`[MESSAGES] - [POST] - [${StatusCodes.NOT_FOUND}] - ${error.message}`);
      res.status(StatusCodes.NOT_FOUND).send(error.message);
    } else {
      logger.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(generalErrorMessage);
    }
  }
});

router.delete('/:messageID', async (req, res) => {
  try {
    const deletedMessage = await messagesService.deleteMessage(req.params.messageID);
    logger.info(
      `[MESSAGES] - [DELETE] - [${StatusCodes.OK}] - Message ${req.params.messageID} deleted.`
    );
    res.status(StatusCodes.OK).json(deletedMessage);
  } catch (error) {
    if (error instanceof MessageDoesntExist) {
      res.status(StatusCodes.NOT_FOUND).send(error.message);
      logger.info(`[MESSAGES] - [DELETE] - [${StatusCodes.NOT_FOUND}] - ${error.message}`);
    } else {
      logger.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(generalErrorMessage);
    }
  }
});

export default router;
