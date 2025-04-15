export class UserDoesntExist extends Error {
  constructor(user) {
    super(`User ${user} doesn't exist.`);
    this.name = 'UserDoesntExist';
  }
}

export class UserAlreadyExist extends Error {
  constructor(user) {
    super(`User ${user} already exists.`);
    this.name = 'UserAlreadyExist';
  }
}

export class InputErrors extends Error {
  constructor(message) {
    super(message);
    this.name = 'InputErrors';
  }
}

export class MessageDoesntExist extends Error {
  constructor(messageId) {
    super(`Message ${messageId} doesn't exist.`);
    this.name = 'MessageDoesntExist';
  }
}

export class NoMessagesToUser extends Error {
  constructor(user) {
    super(`There are no messages to ${user}.`);
    this.name = 'NoMessagesToUser';
  }
}
