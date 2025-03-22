import createHttpError from 'http-errors';

export const handleNotFound = (req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
};
