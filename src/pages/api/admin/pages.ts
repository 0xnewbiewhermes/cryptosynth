export const prerender = false;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || '0xnewbiewhermes/cryptosynth';

const EDITABLE_PAGES = [
  { path: 'src/pages/about.astro', label: 'Tentang', slug: 'about' },
  { path: 'src/pages/disclaimer.astro', label: 'Disclaimer', slug: 'disclaimer' },
  { path: 'src/pages/privacy.astro', label: 'Privacy', slug: 'privacy' },
  { path: 'src/pages/tools.astro', label: 'Tools', slug: 'tools' },
  { path: 'src/pages/index.astro', label: 'Homepage', slug: 'index' },
  { path: 'src/pages/404.astro', label: '404 Page', slug: '404' },
  { path: 'src/pages/articles.astro', label: 'Arsip', slug: 'articles' },
  { path: 'src/pages/airdrop.astro', label: 'Airdrop', slug: 'airdrop' },
  { path: 'src/layouts/BaseLayout.astro', label: 'Layout (BaseLayout)', slug: 'BaseLayout' },
];

function checkAuth(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  try { return atob(authHeader.slice(7)).startsWith('admin:'); } catch { return false; }
}

function ghHeaders() {
  return {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'CryptoSynth-Admin',
  };
}

// GET /api/admin/pages — list, or ?slug=xxx to get content
export async function GET({ request }: { request: Request }) {
  if (!checkAuth(request)) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  if (!GITHUB_TOKEN) return new Response(JSON.stringify({ error: 'GITHUB_TOKEN missing' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  try {
    if (slug) {
      const page = EDITABLE_PAGES.find(p => p.slug === slug);
      if (!page) return new Response(JSON.stringify({ error: 'Page not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });

      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${page.path}`, { headers: ghHeaders() });
      if (!res.ok) return new Response(JSON.stringify({ error: 'GitHub error: ' + res.status }), { status: 502, headers: { 'Content-Type': 'application/json' } });
      const file = await res.json();
      const content = atob(file.content.replace(/\n/g, ''));
      return new Response(JSON.stringify({ slug, path: page.path, label: page.label, content, sha: file.sha }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // List with sizes
    const results = await Promise.all(EDITABLE_PAGES.map(async (page) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${page.path}?ref=main`, { headers: ghHeaders() });
        if (!res.ok) return { ...page, sha: null, size: 0, exists: false };
        const file = await res.json();
        return { ...page, sha: file.sha, size: file.size, exists: true };
      } catch {
        return { ...page, sha: null, size: 0, exists: false };
      }
    }));

    return new Response(JSON.stringify({ pages: results }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// PUT /api/admin/pages — update a page
export async function PUT({ request }: { request: Request }) {
  if (!checkAuth(request)) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  if (!GITHUB_TOKEN) return new Response(JSON.stringify({ error: 'GITHUB_TOKEN missing' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

  try {
    const { slug, content, sha, message } = await request.json();
    if (!slug || !content || !sha) return new Response(JSON.stringify({ error: 'Missing slug, content, or sha' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

    const page = EDITABLE_PAGES.find(p => p.slug === slug);
    if (!page) return new Response(JSON.stringify({ error: 'Page not editable' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

    const encoded = btoa(unescape(encodeURIComponent(content)));
    const commitMsg = message || `admin: update ${page.label}`;

    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${page.path}`, {
      method: 'PUT',
      headers: { ...ghHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: commitMsg, content: encoded, sha }),
    });

    if (!res.ok) {
      const errBody = await res.json();
      return new Response(JSON.stringify({ error: errBody.message || 'GitHub error' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    const result = await res.json();
    return new Response(JSON.stringify({ success: true, newSha: result.content.sha, message: `${page.label} tersimpan! Auto-deploy ~30 detik.` }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
