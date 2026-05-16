export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = import.meta.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return new Response(JSON.stringify({ error: 'Admin not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (password !== adminPassword) {
      return new Response(JSON.stringify({ error: 'Password salah' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Simple token = base64 of password hash (not JWT, just enough for this use case)
    const token = btoa('admin:' + Date.now() + ':' + password.slice(0, 4));

    return new Response(JSON.stringify({ success: true, token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
