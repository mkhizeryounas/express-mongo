import HttpStatus from 'http-status-codes';

const COMMON_MESSAGES = {
  200: 'Request processed successfully.',
  201: 'New entry has been created.',
  400: 'The request by the client was not processed, as the server could not understand what the client is asking for.',
  401: 'The client is not allowed to access resources, and should re-request with the required credentials.',
  403: 'The client is not allowed access the resource.',
  404: 'The requested resource is not available.',
  500: 'Request can not be processed due to unexpected internal server error.',
  503: 'Server is down or unavailable to receive and process the request',
};

const generateMessage = (code) => {
  const message = COMMON_MESSAGES.hasOwnProperty(code)
    ? COMMON_MESSAGES[code]
    : null;
  return message;
};

module.exports = function (req, res, next) {
  res.reply = (responseJson) => {
    const data =
      typeof responseJson.data === 'undefined' ? {} : responseJson.data;
    const statusCode =
      typeof responseJson.statusCode === 'undefined'
        ? 200
        : responseJson.statusCode;
    let message =
      typeof responseJson.message === 'undefined'
        ? generateMessage(statusCode)
        : responseJson.message;

    const statusCodeText = HttpStatus.getStatusText(statusCode);
    message = message !== null ? message : statusCodeText;
    const result = {
      status: statusCodeText.toUpperCase().split(' ').join('_'),
      message,
    };
    if (statusCode >= 400) {
      return res.status(statusCode).send({ ...result, error: data });
    }
    return res.status(statusCode).send(data); // { ...result, success: true, data }
  };
  next();
};
