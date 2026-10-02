import { defineMiddleware } from 'astro:middleware';

const PROTECTED_PREFIX = '/case-studies';
const AUTH_COOKIE = 'auth_token';
const AUTH_VALUE = 'authenticated';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Only guard case-studies routes; let /login and /api/* through always
  if (!path.startsWith(PROTECTED_PREFIX)) {
    return next();
  }

  // Parse the auth_token cookie from the Cookie header
  const cookieHeader = context.request.headers.get('cookie') ?? '';
  const authToken = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${AUTH_COOKIE}=`))
    ?.split('=')[1];

  if (authToken === AUTH_VALUE) {
    return next();
  }

  // Not authenticated — redirect to /login preserving the original destination
  const loginUrl = new URL('/login', url.origin);
  loginUrl.searchParams.set('redirect', path);
  return context.redirect(loginUrl.toString(), 302);
});
