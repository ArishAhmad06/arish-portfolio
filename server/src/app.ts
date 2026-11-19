import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { env, isProduction } from './config/env.js';
import { logger } from './config/logger.js';
import { contactRouter } from './routes/contact.js';
import { healthRouter } from './routes/health.js';
import { apiNotFound, errorHandler } from './middleware/errorHandler.js';

const here = path.dirname(fileURLToPath(import.meta.url));

/** Locates the built React client (client/dist) so one process can serve everything. */
function resolveClientDist(): string {
  return env.CLIENT_DIST ?? path.resolve(here, '../../client/dist');
}

export function createApp() {
  const app = express();

  // Needed so rate limiting sees the real client IP behind a proxy (Render, Railway, Nginx...).
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(pinoHttp({ logger, autoLogging: isProduction }));
  app.use(
    helmet({
      // "upgrade-insecure-requests" breaks plain-http localhost in some browsers, so only use it in production.
      contentSecurityPolicy: isProduction ? undefined : { directives: { 'upgrade-insecure-requests': null } },
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: '10kb' }));

  // In production the client is served by this same server, so CORS is only a dev concern.
  if (!isProduction) {
    app.use('/api', cors({ origin: env.CLIENT_ORIGIN.split(',').map((o) => o.trim()) }));
  }

  app.use('/api/health', healthRouter);
  app.use('/api/contact', contactRouter);
  app.use('/api', apiNotFound);

  // Serve the built client with an SPA fallback.
  const clientDist = resolveClientDist();
  if (fs.existsSync(clientDist)) {
    app.use(
      express.static(clientDist, {
        index: false,
        setHeaders: (res, filePath) => {
          // Hashed build assets can be cached forever; everything else must revalidate.
          const immutable = filePath.includes(`${path.sep}assets${path.sep}`);
          res.setHeader(
            'Cache-Control',
            immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
          );
        },
      }),
    );
    app.get('*', (_req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  }

  app.use(errorHandler);
  return app;
}
