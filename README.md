# Arish Ahmad — Portfolio

A full-stack personal portfolio built with **React, TypeScript, Node.js, and Express**.

The application uses a React + TypeScript frontend powered by Vite and a Node.js + Express + TypeScript backend. In production, a single Node.js process serves both the built frontend and backend API.

## Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- CSS

**Backend**
- Node.js
- Express.js
- TypeScript
- Zod
- Nodemailer

**Testing & Tooling**
- Vitest
- Supertest
- npm

## Project Structure

```text
arish-portfolio/
│
├── client/
│   ├── public/
│   │   ├── certificates/
│   │   ├── Arish-Ahmad-Resume.pdf
│   │   ├── favicon.svg
│   │   └── theme-init.js
│   │
│   └── src/
│       ├── components/
│       │   ├── layout/
│       │   ├── sections/
│       │   └── ui/
│       │
│       ├── config/
│       ├── hooks/
│       ├── lib/
│       ├── styles/
│       ├── App.tsx
│       └── main.tsx
│
├── server/
│   └── src/
│       ├── config/
│       ├── middleware/
│       ├── routes/
│       ├── schemas/
│       ├── services/
│       ├── __tests__/
│       ├── app.ts
│       └── index.ts
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- Gmail account (optional, for contact form email functionality)

### Installation

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd arish-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Create your environment file:

```bash
cp server/.env.example server/.env
```

On Windows PowerShell, use:

```powershell
Copy-Item server/.env.example server/.env
```

4. Configure the environment variables in `server/.env`.

5. Start the development servers:

```bash
npm run dev
```

The application runs at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start frontend and backend in development mode |
| `npm run build` | Build the application for production |
| `npm start` | Start the production server |
| `npm test` | Run backend API tests |
| `npm run typecheck` | Check TypeScript types |

## Production Build

Build the frontend and backend:

```bash
npm run build
```

Start the production application:

```bash
npm start
```

The production server serves the frontend and API from:

```text
http://localhost:4000
```

## Personalization

Search the project for `TODO(Arish)` to identify the remaining personal configuration points.

| Configuration | File | Required Change |
|---|---|---|
| LinkedIn profile | `client/src/config/site.ts` | Set `linkedinUrl` |
| Resume | `client/src/config/site.ts` | Set `resumeUrl` |
| Availability | `client/src/config/site.ts` | Update `availability` |
| Email address | `client/src/config/site.ts` | Set `email` |
| Project GitHub links | `client/src/config/projects.ts` | Set `githubUrl` |
| Project live demos | `client/src/config/projects.ts` | Set `liveUrl` |
| Project status | `client/src/config/projects.ts` | Update `status` |
| Tutor experience dates | `client/src/config/experience.ts` | Update `period` |
| Certifications | `client/src/config/certifications.ts` | Add certificate details and verification links |

### Resume

Place your resume PDF inside:

```text
client/public/
```

Then configure:

```ts
resumeUrl: '/Arish-Ahmad-Resume.pdf'
```

### Certificates

Place certificate images inside:

```text
client/public/certificates/
```

Update their details, IDs, image paths, and verification links in:

```text
client/src/config/certifications.ts
```

Values left as `null` are hidden or displayed as not added yet. No personal information or achievements are invented automatically.

## Contact Form & Email Configuration

The contact form uses a backend email service powered by Nodemailer and SMTP.

To enable email delivery, configure `server/.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-google-app-password
CONTACT_TO_EMAIL=your-receiving-email@gmail.com
```

### Gmail App Password Setup

1. Open your Google Account security settings.
2. Enable 2-Step Verification.
3. Open the App Passwords section.
4. Generate an app password.
5. Add the generated password to `SMTP_PASS`.

**Important:** Use a Google App Password instead of your regular Gmail password. Never commit your `.env` file or expose credentials publicly.

Until SMTP is configured, the contact form displays a clear configuration message and provides the visitor with an email fallback. It does not display a fake success response.

### Built-in Security

The contact API includes:

- Server-side request validation using Zod.
- Honeypot spam protection.
- Rate limiting (5 requests per 15 minutes per IP).
- Protection against email header injection.
- Request body size limits.
- Centralized error handling.
- Security headers and Content Security Policy.

## Customization Guide

### Change Colors and Fonts

Edit:

```text
client/src/styles/tokens.css
```

### Add a New Project

Add a project object to:

```text
client/src/config/projects.ts
```

Available project cover styles:

- `print`
- `forecast`
- `roc`
- `tokens`
- `map`

To introduce another cover style, update `ProjectCover.tsx` and `config/types.ts`.

### Add a Skill

Edit:

```text
client/src/config/skills.ts
```

If a project's technology stack uses the same skill name, the corresponding elements are automatically linked on hover.

### Add a Terminal Command

Edit:

```text
client/src/components/sections/terminalCommands.ts
```

### Add a New Section

1. Create a component inside `client/src/components/sections/`.
2. Wrap the component with `<Section>`.
3. Import and add it to `App.tsx`.
4. Update `navigation.ts` if the section should appear in navigation.

## Deployment

The application supports Node.js hosting platforms such as:

- Render
- Railway
- Fly.io
- VPS hosting

### Build Command

```bash
npm install && npm run build
```

### Start Command

```bash
npm start
```

### Environment Variables

Configure the following variables in your hosting provider's dashboard:

- `NODE_ENV=production`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`

Do not upload `.env` files or credentials to your repository.

## Additional Notes

- The portfolio is a single-page application.
- Unknown frontend URLs fall back to the home page.
- Security headers and a strict Content Security Policy are enabled.
- Fonts are self-hosted, avoiding third-party font requests.
- The application respects the `prefers-reduced-motion` accessibility preference.

---

**Built by Arish Ahmad**

GitHub: https://github.com/ArishAhmad06
