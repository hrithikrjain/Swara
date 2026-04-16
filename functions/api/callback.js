/**
 * Cloudflare Pages Function: /api/callback
 *
 * Handles the GitHub OAuth callback for Decap CMS.
 *
 * Protocol (Decap CMS two-step handshake):
 *   1. Popup sends  →  "authorizing:github"                         (target: "*")
 *   2. CMS responds →  any message back to popup                    (confirms it's listening)
 *   3. Popup sends  →  "authorization:github:success:{token,provider}" (target: e.origin)
 *   4. Popup closes itself.
 *   Fallback: if CMS never responds within 4 s, send token with target "*".
 *
 * Environment Variables (set in Cloudflare Pages dashboard):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 */
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  /* ── Validate incoming params ─────────────────────────────────── */
  const code  = url.searchParams.get('code');
  const state = url.searchParams.get('state') ?? '';
  const error = url.searchParams.get('error');

  if (error) {
    return errorPage(`GitHub denied authorization: ${url.searchParams.get('error_description') ?? error}`);
  }

  if (!code) {
    return errorPage('No authorization code was received from GitHub. Please try again.');
  }

  const clientId     = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return errorPage(
      'GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set as environment variables ' +
      'in your Cloudflare Pages project settings.'
    );
  }

  /* ── Exchange code for access token ───────────────────────────── */
  let accessToken;
  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept'       : 'application/json',
      },
      body: JSON.stringify({
        client_id    : clientId,
        client_secret: clientSecret,
        code,
        state,
      }),
    });

    if (!tokenRes.ok) {
      return errorPage(`GitHub token endpoint returned HTTP ${tokenRes.status}.`);
    }

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return errorPage(
        `GitHub returned an error: ${tokenData.error_description ?? tokenData.error}`
      );
    }

    accessToken = tokenData.access_token;

    if (!accessToken) {
      return errorPage('GitHub did not return an access token. The authorization code may have expired.');
    }
  } catch (err) {
    return errorPage(`Network error while contacting GitHub: ${err.message}`);
  }

  /* ── Build the callback HTML ──────────────────────────────────── */
  /*
   * IMPORTANT: We use JSON.stringify(accessToken) so the token is safely
   * embedded as a JS value regardless of any special characters it may contain.
   * This produces e.g.  var _t = "gho_XXXXXXXXXXXX";
   */
  const safeToken = JSON.stringify(accessToken); // e.g. "\"gho_xxx\""

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex,nofollow">
  <title>Authenticating — Swara CMS</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Georgia, serif;
      background: linear-gradient(135deg, #1A0800 0%, #3A1A06 55%, #5C2D0E 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      background: rgba(253,246,239,0.08);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 16px;
      padding: 48px 40px;
      text-align: center;
      width: min(380px, 90vw);
    }
    .icon {
      width: 60px; height: 60px;
      background: rgba(37,211,102,0.15);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 24px;
      font-size: 26px;
    }
    h1 { font-size: 26px; font-weight: 400; color: #FDF6EF; margin-bottom: 10px; }
    p  { font-family: system-ui, sans-serif; font-size: 13px; color: rgba(253,246,239,.6); line-height: 1.6; }
    .spinner {
      width: 20px; height: 20px;
      border: 2px solid rgba(196,123,58,.25);
      border-top-color: #C47B3A;
      border-radius: 50%;
      animation: spin .7s linear infinite;
      margin: 20px auto 0;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .brand {
      font-family: system-ui, sans-serif;
      font-size: 10px; letter-spacing: .3em;
      text-transform: uppercase;
      color: #C47B3A; margin-top: 28px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✓</div>
    <h1>Login Successful</h1>
    <p>GitHub authentication complete. Passing credentials to the CMS…</p>
    <div class="spinner"></div>
    <p class="brand">Swara Ethnic Wear</p>
  </div>

  <script>
  /* ─────────────────────────────────────────────────────────────
   * Decap CMS two-step postMessage handshake
   *
   * Step 1 → Popup sends "authorizing:github" to opener (target "*").
   *           This is what Decap CMS is waiting for before it starts
   *           listening for the token.
   *
   * Step 2 → CMS sends ANY message back to the popup (just to confirm
   *           its origin so we know where to aim the token).
   *
   * Step 3 → Popup sends the token message to opener at e.origin.
   *           Using e.origin (not "*") is both more secure and more
   *           reliable with strict browser policies.
   *
   * Fallback → If CMS never responds within 4 s (e.g. popup blocker
   *            forced a new-tab flow), we broadcast with "*" so the
   *            token is not silently dropped.
   * ───────────────────────────────────────────────────────────── */
  (function () {
    /* The token is injected server-side via JSON.stringify so it is
     * correctly escaped for any character the token might contain.  */
    var _token    = ${safeToken};
    var _provider = 'github';

    /* The message Decap CMS expects ───────────────────────────── */
    function buildMessage() {
      return (
        'authorization:' + _provider + ':success:' +
        JSON.stringify({ token: _token, provider: _provider })
      );
    }

    if (!window.opener) {
      /* Popup was opened in a new tab that lost its opener reference.
       * Nothing we can do here — the user needs to allow popups.     */
      document.querySelector('p').textContent =
        'Could not communicate with the CMS window. ' +
        'Please allow popups for this site and try again.';
      document.querySelector('.spinner').style.display = 'none';
      return;
    }

    var _sent   = false;
    var _timer  = null;

    /* ── Step 3 listener ── */
    function onCmsReply(evt) {
      if (evt.source !== window.opener) return;   // ignore unrelated messages
      if (_sent) return;
      _sent = true;
      clearTimeout(_timer);
      window.removeEventListener('message', onCmsReply, false);

      window.opener.postMessage(buildMessage(), evt.origin);
      setTimeout(function () { window.close(); }, 600);
    }

    window.addEventListener('message', onCmsReply, false);

    /* ── Step 1: announce ── */
    window.opener.postMessage('authorizing:' + _provider, '*');

    /* ── Fallback: broadcast after 4 s if CMS never replied ── */
    _timer = setTimeout(function () {
      if (_sent) return;
      _sent = true;
      window.removeEventListener('message', onCmsReply, false);
      window.opener.postMessage(buildMessage(), '*');
      setTimeout(function () { window.close(); }, 800);
    }, 4000);

  }());
  </script>
</body>
</html>`;

  return new Response(html, {
    status : 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

/* ── Error page helper ──────────────────────────────────────────────────── */
function errorPage(message) {
  /* Also attempt to notify the opener so the CMS doesn't hang */
  const safeMsg = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Auth Error — Swara CMS</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, sans-serif;
      background: #1A0800;
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
    }
    .card {
      background: rgba(200,50,50,.1);
      border: 1px solid rgba(200,80,80,.3);
      border-radius: 12px;
      padding: 40px;
      max-width: 480px; width: 90%;
      text-align: center;
    }
    h1  { font-size: 18px; color: #ff9090; margin-bottom: 14px; }
    p   { font-size: 13px; color: rgba(253,246,239,.65); line-height: 1.6; }
    a   { color: #C47B3A; text-decoration: none; display: inline-block; margin-top: 22px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>⚠ Authentication Failed</h1>
    <p>${safeMsg}</p>
    <a href="/admin">← Back to Admin Panel</a>
  </div>
  <script>
    /* Notify CMS so it shows an error rather than hanging */
    if (window.opener) {
      window.opener.postMessage(
        'authorization:github:error:' + ${JSON.stringify(message)},
        '*'
      );
    }
  </script>
</body>
</html>`;

  return new Response(html, {
    status : 400,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
