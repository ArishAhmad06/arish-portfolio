import { Router } from 'express';
import { isMailConfigured } from '../services/mailer.js';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.json({ ok: true, uptime: Math.round(process.uptime()), mailConfigured: isMailConfigured() });
});
