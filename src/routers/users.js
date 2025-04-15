import express from 'express';
import usersService from '../services/users.js';
import { StatusCodes } from 'http-status-codes';
import { UserAlreadyExist, UserDoesntExist, InputErrors } from '../errors.js';
import logger from '../logger.js';

const router = express.Router();
const generalErrorMessage = 'General error';

router.post('/', async (req, res) => {
  const { username, first_name, last_name, birthdate } = req.body;

  try {
    const result = await usersService.newUsers({
      username,
      first_name,
      last_name,
      birthdate: new Date(birthdate)
    });
    logger.info(`[USERS] - [POST] - [${StatusCodes.CREATED}] - User created!`);
    res.status(StatusCodes.CREATED).send(result);
  } catch (error) {
    if (error instanceof InputErrors) {
      logger.info(`[USERS] - [POST] - [${StatusCodes.BAD_REQUEST}] - ${error.message}`);
      res.status(StatusCodes.BAD_REQUEST).send(error.message);
    } else if (error instanceof UserAlreadyExist) {
      logger.info(`[USERS] - [POST] - [${StatusCodes.CONFLICT}] - User ${username} already exists.`);
      res.status(StatusCodes.CONFLICT).send(`User ${username} already exists.`);
    } else {
      logger.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(generalErrorMessage);
    }
  }
});

router.get('/:username', async (req, res) => {
  try {
    const userDetails = await usersService.usersDetails(req.params.username);
    logger.info(`[USERS] - [GET] - [${StatusCodes.OK}] - ${req.params.username}`);
    res.status(StatusCodes.OK).send(userDetails);
  } catch (error) {
    if (error instanceof UserDoesntExist) {
      logger.info(`[USERS] - [GET] - [${StatusCodes.NOT_FOUND}] - ${req.params.username}`);
      res.status(StatusCodes.NOT_FOUND).send(`Error: User ${req.params.username} doesn't exist.`);
    } else {
      logger.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(generalErrorMessage);
    }
  }
});

router.delete('/:username', async (req, res) => {
  try {
    const deletedUser = await usersService.deleteUser(req.params.username);
    logger.info(`[USERS] - [DELETE] - [${StatusCodes.OK}] - User ${req.params.username} deleted!`);
    res.status(StatusCodes.OK).send(deletedUser);
  } catch (error) {
    if (error instanceof UserDoesntExist) {
      logger.info(`[USERS] - [DELETE] - [${StatusCodes.NOT_FOUND}] - ${error.message}`);
      res.status(StatusCodes.NOT_FOUND).send(error.message);
    } else {
      logger.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(generalErrorMessage);
    }
  }
});

export default router;
