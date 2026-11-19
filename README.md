# Arish Ahmad — Portfolio

React + TypeScript frontend (Vite) and Node.js + Express + TypeScript backend.
In production, one Node process serves both the API and the built site.

```
arish-portfolio/
├─ client/                 React app
│  ├─ public/              favicon, theme-init.js, put resume + certificate images here
│  └─ src/
│     ├─ config/           ALL content (site.ts, projects.ts, skills.ts, certifications.ts, experience.ts)
│     ├─ components/
│     │  ├─ layout/        Header, Footer, navigation
│     │  ├─ sections/      Hero, About, Skills, Projects, Experience, Certifications, Mindset, Contact
│     │  └─ ui/            Button, Chip, Section, Reveal, StatusPill
│     ├─ hooks/            useTheme, useClock, useScrollSpy, useInView, useReducedMotion
│     ├─ lib/              api.ts, validation.ts
│     └─ styles/           tokens.css (colours/fonts), base.css, ui.css
└─ server/                 Express API
   └─ src/
      ├─ config/           env.ts (validated env vars), logger.ts
      ├─ routes/           contact.ts, health.ts
      ├─ schemas/          contact.ts (Zod)
      ├─ services/         mailer.ts (SMTP via Nodemailer)
      ├─ middleware/       errorHandler.ts
      └─ __tests__/        API tests (Vitest + Supertest)
```

## Run it

Requires Node.js 20 or newer.

```bash
npm install
cp server/.env.example server/.env     # then fill in the SMTP values (see below)
npm run dev                            # client: http://localhost:5173  ·  API: http://localhost:4000
```

Production:

```bash
npm run build
npm start                              # serves site + API on http://localhost:4000
```

Other commands: `npm test` (API tests), `npm run typecheck`.

## What you must change (search the code for `TODO(Arish)`)

| What | Where |
|---|---|
| LinkedIn URL (hidden until set) | `client/src/config/site.ts` → `linkedinUrl` |
| Resume PDF (button hidden until set) | put the PDF in `client/public/`, then set `resumeUrl: '/Arish-Ahmad-Resume.pdf'` in `site.ts` |
| Availability pill | `site.ts` → `availability` |
| GitHub links for 4 projects | `client/src/config/projects.ts` → `githubUrl` |
| Live demo links (button appears automatically) | `projects.ts` → `liveUrl` |
| ZyloStays / Alprint status | `projects.ts` → `status` |
| Tutor dates | `client/src/config/experience.ts` → `period` |
| Certificate images / IDs / verify links | `client/src/config/certifications.ts` (images go in `client/public/certificates/`) |
| Email address shown on the site | `site.ts` → `email` |

Anything left as `null` is hidden or shown as "not added yet". Nothing is invented.

## Make the contact form send real email

Edit `server/.env`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=<Google App Password>      # Google Account → Security → 2-Step Verification → App passwords
CONTACT_TO_EMAIL=ahmad.aris0987@gmail.com
```

Until these are set, the form shows a clear "not configured" message and the visitor sees your email as a fallback. The site never shows a fake success.

Built-in protection: server-side validation, honeypot field, rate limit (5 per 15 minutes per IP), header-injection-safe emails, body size limit.

## Common edits

- **Change the accent colour or fonts:** `client/src/styles/tokens.css`.
- **Add a project:** add an object to `client/src/config/projects.ts`. Pick one of the five cover styles (`print`, `forecast`, `roc`, `tokens`, `map`) or add a new one in `ProjectCover.tsx` and `config/types.ts`.
- **Add a skill:** `client/src/config/skills.ts`. If a project's `stack` uses the same name, hovering links them automatically.
- **Add a terminal command:** `client/src/components/sections/terminalCommands.ts`.
- **Add a section:** create a component in `components/sections/`, wrap it in `<Section>`, add it to `App.tsx` and `navigation.ts`.

## Deploying

Any host that runs Node works (Render, Railway, Fly.io, a VPS).

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Set the `SMTP_*` and `CONTACT_*` environment variables in the host's dashboard and set `NODE_ENV=production`.

## Notes

- The site is a single-page app; unknown URLs fall back to the home page.
- Security headers (helmet, strict CSP) are on. Fonts are self-hosted, so no third-party requests are made.
- `prefers-reduced-motion` is respected throughout.
