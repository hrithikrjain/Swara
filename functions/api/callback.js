/**
 * Cloudflare Pages Function: /api/callback
 *
 * Handles GitHub OAuth callback for Decap CMS.
 * Exchanges the authorization code for an access token and
 * sends it back to the CMS window via postMessage.
 *
 * Environment Variables Required:
 *   GITHUB_CLIENT_ID     — Your GitHub OAuth App's client ID
 *   GITHUB_CLIENT_SECRET — Your GitHub OAuth App's client secret
 */
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state') || '';

  if (!code) {
    return errorPage('No authorization code received from GitHub. Please try again.');
  }

  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return errorPage(
      'GitHub OAuth credentials are not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in your Cloudflare Pages environment variables.'
    );
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        state,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return errorPage(`GitHub OAuth error: ${tokenData.error_description || tokenData.error}`);
    }

    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return errorPage('Failed to obtain access token from GitHub.');
    }

    // Return success HTML that sends token to Decap CMS via postMessage
    const successHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Swara CMS — Authenticated</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Georgia', serif;
      background: linear-gradient(135deg, #3A1A06 0%, #5C2D0E 50%, #C47B3A 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FDF6EF;
    }
    .card {
      background: rgba(253, 246, 239, 0.08);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 16px;
      padding: 48px 40px;
      text-align: center;
      max-width: 380px;
      width: 90%;
    }
    .checkmark {
      width: 64px;
      height: 64px;
      background: rgba(37, 211, 102, 0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 28px;
    }
    h1 { font-size: 28px; font-weight: 400; margin-bottom: 8px; }
    p { font-family: system-ui, sans-serif; font-size: 14px; opacity: 0.7; line-height: 1.6; margin-top: 12px; }
    .brand { font-size: 13px; opacity: 0.5; margin-top: 24px; letter-spacing: 0.15em; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="card">
    <div class="checkmark">✓</div>
    <h1>Login Successful</h1>
    <p>You're now authenticated with GitHub. The Swara CMS admin panel is ready. This window will close automatically.</p>
    <p class="brand">Swara Ethnic Wear</p>
  </div>
  <script>
    (function() {
  const message = {
    token: '${accessToken}',
    provider: 'github'
  };

  function sendMessage(targetOrigin) {
    window.opener.postMessage(
      'authorization:github:success:' + JSON.stringify(message),
      targetOrigin
    );
  }

  if (window.opener) {
    // Try sending to same origin
    sendMessage(window.location.origin);

    // Also fallback (important for Decap)
    sendMessage('*');

    setTimeout(() => window.close(), 1000);
  }
})();
  </script>
</body>
</html>`;

    return new Response(successHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });

  } catch (err) {
    return errorPage(`An unexpected error occurred: ${err instanceof Error ? err.message : String(err)}`);
  }
}

function errorPage(message) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Auth Error — Swara CMS</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, sans-serif;
      background: #1A0800;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FDF6EF;
    }
    .card {
      background: rgba(200, 50, 50, 0.1);
      border: 1px solid rgba(200, 80, 80, 0.3);
      border-radius: 12px;
      padding: 40px;
      max-width: 440px;
      text-align: center;
    }
    h1 { font-size: 20px; font-weight: 500; margin-bottom: 12px; color: #ff8080; }
    p { font-size: 14px; opacity: 0.7; line-height: 1.6; }
    a { color: #C47B3A; text-decoration: none; display: inline-block; margin-top: 20px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>⚠ Authentication Failed</h1>
    <p>${message}</p>
    <a href="/admin">← Back to Admin Panel</a>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 400,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
