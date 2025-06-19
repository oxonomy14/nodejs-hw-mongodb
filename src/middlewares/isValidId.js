import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (idName='id') => (req, res, next) => {
  const { contactId } = req.params[idName];
  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'Invalid MongoDB id');
  }

  next();
};