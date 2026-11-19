import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../app.js';

const app = createApp();

const validBody = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Hello there',
  message: 'This is a valid message body.',
};

describe('GET /api/health', () => {
  it('reports the server is up', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});

describe('POST /api/contact', () => {
  it('rejects invalid input with field errors', async () => {
    const res = await request(app).post('/api/contact').send({ ...validBody, email: 'nope' });
    expect(res.status).toBe(400);
    expect(res.body.errors.email).toBeDefined();
  });

  it('silently accepts honeypot submissions without sending anything', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validBody, website: 'http://spam.example' });
    expect(res.status).toBe(200);
  });

  it('never claims success when email is not configured', async () => {
    const res = await request(app).post('/api/contact').send(validBody);
    expect(res.status).toBe(503);
    expect(res.body.ok).toBe(false);
  });
});

describe('unknown API routes', () => {
  it('return a JSON 404', async () => {
    const res = await request(app).get('/api/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.ok).toBe(false);
  });
});
