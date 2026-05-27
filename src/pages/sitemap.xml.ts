import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site?.href || 'https://cryptosynth.id';
  return new Response(null, {
    status: 301,
    headers: {
      'Location': `${site}sitemap-index.xml`,
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
