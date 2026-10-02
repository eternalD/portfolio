import type { APIRoute } from 'astro';

const AUTH_COOKIE = 'auth_token';
const AUTH_VALUE = 'authenticated';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const submitted = (data.get('password') as string | null)?.trim() ?? '';
  const redirect = (data.get('redirect') as string | null)?.trim() || '/case-studies';

  // Validate the redirect path to prevent open-redirect attacks (must start with /)
  const safeRedirect = redirect.startsWith('/') ? redirect : '/case-studies';

  const expected = (import.meta.env.SITE_PASSWORD as string | undefined)?.trim() ?? '';

  if (expected.length > 0 && submitted === expected) {
    return new Response(null, {
      status: 302,
      headers: {
        'Set-Cookie': `${AUTH_COOKIE}=${AUTH_VALUE}; HttpOnly; Secure; SameSite=Strict; Path=/`,
        Location: safeRedirect,
      },
    });
  }

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('error', '1');
  loginUrl.searchParams.set('redirect', safeRedirect);

  return new Response(null, {
    status: 302,
    headers: { Location: loginUrl.toString() },
  });
};
