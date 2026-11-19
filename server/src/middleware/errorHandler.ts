import type { ErrorRequestHandler, RequestHandler } from 'express';
import { HttpError } from '../lib-errors.js';
import { logger } from '../config/logger.js';

export const apiNotFound: RequestHandler = (_req, res) => {
  res.status(404).json({ ok: false, message: 'Not found.' });
};

/** Central error handler: never leaks stack traces or internals to the client. */
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ ok: false, message: error.message });
    return;
  }

  // Malformed JSON bodies
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({ ok: false, message: 'Invalid request body.' });
    return;
  }

  logger.error({ err: error }, 'Unhandled error');
  res.status(500).json({ ok: false, message: 'Something went wrong. Please try again.' });
};
