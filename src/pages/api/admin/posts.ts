export const prerender = false;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || '0xnewbiewhermes/cryptosynth';
const BLOG_DIR = 'src/content/blog';

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

// GET /api/admin/posts — list all posts, or ?slug=xxx to get one
export async function GET({ request }: { request: Request }) {
  if (!checkAuth(request)) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  if (!GITHUB_TOKEN) return new Response(JSON.stringify({ error: 'GITHUB_TOKEN missing' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  try {
    if (slug) {
      // Get single post
      const filePath = `${BLOG_DIR}/${slug}.md`;
      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, { headers: ghHeaders() });
      if (!res.ok) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      const file = await res.json();
      const content = atob(file.content.replace(/\n/g, ''));
      return new Response(JSON.stringify({ slug, content, sha: file.sha }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // List all posts
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${BLOG_DIR}`, { headers: ghHeaders() });
    if (!res.ok) return new Response(JSON.stringify({ error: 'GitHub error: ' + res.status }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    const files = await res.json();
    const posts = files.filter((f: any) => f.name.endsWith('.md')).map((f: any) => ({
      slug: f.name.replace('.md', ''),
      filename: f.name,
      sha: f.sha,
      size: f.size,
    }));
    return new Response(JSON.stringify({ posts }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// PUT /api/admin/posts — update a post
export async function PUT({ request }: { request: Request }) {
  if (!checkAuth(request)) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  if (!GITHUB_TOKEN) return new Response(JSON.stringify({ error: 'GITHUB_TOKEN missing' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

  try {
    const { slug, content, sha, message } = await request.json();
    if (!slug || !content || !sha) return new Response(JSON.stringify({ error: 'Missing slug, content, or sha' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

    const filePath = `${BLOG_DIR}/${slug}.md`;
    const encoded = btoa(unescape(encodeURIComponent(content)));
    const commitMsg = message || `admin: update ${slug}`;

    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
      method: 'PUT',
      headers: { ...ghHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: commitMsg, content: encoded, sha }),
    });

    if (!res.ok) {
      const errBody = await res.json();
      return new Response(JSON.stringify({ error: errBody.message || 'GitHub error' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    const result = await res.json();
    return new Response(JSON.stringify({ success: true, newSha: result.content.sha, message: 'Tersimpan! Auto-deploy ~30 detik.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// POST /api/admin/posts — create new post
export async function POST({ request }: { request: Request }) {
  if (!checkAuth(request)) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  if (!GITHUB_TOKEN) return new Response(JSON.stringify({ error: 'GITHUB_TOKEN missing' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

  try {
    const { slug, content, message } = await request.json();
    if (!slug || !content) return new Response(JSON.stringify({ error: 'Missing slug or content' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

    const filePath = `${BLOG_DIR}/${slug}.md`;
    const encoded = btoa(unescape(encodeURIComponent(content)));
    const commitMsg = message || `admin: new post ${slug}`;

    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
      method: 'PUT',
      headers: { ...ghHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: commitMsg, content: encoded }),
    });

    if (!res.ok) {
      const errBody = await res.json();
      return new Response(JSON.stringify({ error: errBody.message || 'GitHub error' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    const result = await res.json();
    return new Response(JSON.stringify({ success: true, newSha: result.content.sha, message: 'Catatan baru dibuat!' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
