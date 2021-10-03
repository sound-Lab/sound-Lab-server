const {
  ERR_NAME,
  ERR_MESSAGE,
  ERR_STATUS,
} = require('../constants/errorMessage');

class DefaultError extends Error {
  constructor() {
    super();
    console.log(this.message);

    this.name = ERR_NAME.SERVER_ERROR;
    this.result = 'error';
    this.message = ERR_MESSAGE.SERVER_ERROR;
    this.status = ERR_STATUS.SERVER_ERROR;
  }
}

class NotFoundError extends DefaultError {
  constructor() {
    super();
    this.name = ERR_NAME.NOT_FOUND;
    this.message = ERR_MESSAGE.NOT_FOUND;
    this.status = ERR_STATUS.NOT_FOUND;
  }
}

class ExistingDataError extends DefaultError {
  constructor() {
    super();
    this.name = ERR_NAME.ALREADY_EXIST;
    this.message = ERR_MESSAGE.ALREADY_EXIST;
    this.status = ERR_STATUS.ALREADY_EXIST;
  }
}

module.exports = {
  DefaultError,
  NotFoundError,
  ExistingDataError,
};
