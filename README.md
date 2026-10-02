# Portfolio of Experience

Harri Kilpiö — Designer & Design Engineer portfolio site, built with [Astro](https://astro.build) and deployed on [Vercel](https://vercel.com).

---

## Getting started

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

---

## Environment Variables

The case studies section is password-protected. One environment variable is required:

| Variable | Description |
|---|---|
| `SITE_PASSWORD` | The password visitors must enter to access `/case-studies` |

### Local development

Copy `.env.example` to `.env` and set your password:

```bash
cp .env.example .env
# then edit .env:
# SITE_PASSWORD=your-password-here
```

The `.env` file is listed in `.gitignore` and must never be committed.

### Vercel deployment

Add `SITE_PASSWORD` in your Vercel project settings:

1. Go to your project in the [Vercel dashboard](https://vercel.com/dashboard).
2. Navigate to **Settings → Environment Variables**.
3. Add `SITE_PASSWORD` with your chosen password value.
4. Redeploy the project for the variable to take effect.

---

## How password protection works

- All routes under `/case-studies` are protected by Astro middleware (`src/middleware.ts`).
- Visitors without a valid session cookie are redirected to `/login`.
- On the login page, the visitor enters the password.
- The `POST /api/auth` endpoint compares the submitted password to `SITE_PASSWORD`.
- On success, a session cookie (`auth_token`, `HttpOnly; Secure; SameSite=Strict`) is set and the visitor is redirected to the page they originally requested.
- The cookie is session-scoped — it clears when the browser closes.
- All other pages (homepage, about, contact, etc.) are publicly accessible.
