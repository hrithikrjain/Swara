/**
 * Cloudflare Pages Function: /api/auth
 *
 * Initiates GitHub OAuth flow for Decap CMS.
 * Redirects the user to GitHub's OAuth authorization endpoint.
 *
 * Environment Variables Required (set in Cloudflare Pages dashboard):
 *   GITHUB_CLIENT_ID     — Your GitHub OAuth App's client ID
 *   GITHUB_CLIENT_SECRET — Your GitHub OAuth App's client secret (used in callback)
 */
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Allow CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  const clientId = env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new Response(
      JSON.stringify({ error: 'GITHUB_CLIENT_ID is not configured in Cloudflare Pages environment variables.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Build GitHub OAuth URL
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', clientId);
  githubAuthUrl.searchParams.set('scope', 'repo,user');
  githubAuthUrl.searchParams.set('redirect_uri', `${url.origin}/api/callback`);

  // Pass through state if provided by Decap CMS
  const state = url.searchParams.get('state') || url.searchParams.get('random');
  if (state) {
    githubAuthUrl.searchParams.set('state', state);
  }

  return Response.redirect(githubAuthUrl.toString(), 302);
}
