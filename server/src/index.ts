import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { isMailConfigured } from './services/mailer.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  logger.info(`Server listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
  if (!isMailConfigured()) {
    logger.warn('SMTP is not configured: the contact form will respond with a 503. See server/.env.example');
  }
});

// Graceful shutdown so hosting platforms can restart without dropped requests.
function shutdown(signal: string) {
  logger.info(`${signal} received, shutting down`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
