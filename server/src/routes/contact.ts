import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { contactSchema } from '../schemas/contact.js';
import { sendContactEmail } from '../services/mailer.js';

export const contactRouter = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, message: 'Too many messages. Please try again in a few minutes.' },
});

contactRouter.post('/', limiter, async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        ok: false,
        message: 'Please check the form and try again.',
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    // Honeypot: bots fill hidden fields. Pretend all is well and send nothing.
    if (parsed.data.website) {
      res.json({ ok: true, message: 'Thanks!' });
      return;
    }

    await sendContactEmail(parsed.data);
    res.json({ ok: true, message: 'Message sent. I will reply as soon as I can.' });
  } catch (error) {
    next(error);
  }
});
