import { isHttpError } from 'http-errors';
import { isAxiosError } from 'axios';
import { handleAxiosError, handleDBInvalidValue, handleDBDuplicateFields, handleDBValidationError } from '#utils/error';

export const formatError = (caughtError, _req, _res, next) => {
  let error = caughtError;
  const { name, code } = caughtError;

  if (isAxiosError(caughtError)) error = handleAxiosError(caughtError);
  if (name === 'CastError') error = handleDBInvalidValue(caughtError);
  if (name === 'ValidationError') error = handleDBValidationError(caughtError);
  if (code === 11000) error = handleDBDuplicateFields(caughtError);

  next(error);
};

export const handleError = (error, _req, res, _next) => {
  let statusCode = 500;
  let errorMessage = 'Oops, something went wrong. Please try again later.';

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({
    status: statusCode >= 500 ? 'error' : 'fail',
    statusCode,
    message: errorMessage,
  });
};
