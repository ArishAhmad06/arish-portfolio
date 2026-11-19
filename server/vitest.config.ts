import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    // The tests assume SMTP is not configured, so ignore any real .env values.
    env: {
      NODE_ENV: 'test',
      SMTP_HOST: '',
      SMTP_USER: '',
      SMTP_PASS: '',
      CONTACT_TO_EMAIL: '',
    },
  },
});
