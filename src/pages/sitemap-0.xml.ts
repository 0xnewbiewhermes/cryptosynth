import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { toTagSlug } from '../utils/tagSlug';

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export async function GET(context: APIContext) {
  const site = (context.site?.href || 'https://cryptosynth.id/').replace(/\/+$/, '');
  const now = Date.now();
  const posts = (await getCollection('blog')).filter(
    (post) => !post.data.draft && new Date(post.data.pubDate).getTime() <= now
  );

  const staticPages = [
    '/',
    '/about',
    '/about/gideon',
    '/disclaimer',
    '/privacy',
    '/airdrop',
    '/articles',
    '/tools',
  ];

  const tagCounts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags || []) {
      const slug = toTagSlug(tag);
      if (slug) tagCounts.set(slug, (tagCounts.get(slug) || 0) + 1);
    }
  }
  const tagPages = Array.from(tagCounts.entries())
    .filter(([, count]) => count >= 2)
    .map(([slug]) => `/tag/${slug}`);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  for (const path of [...staticPages, ...tagPages]) {
    xml += `  <url>
    <loc>${escapeXml(site + path)}</loc>
  </url>
`;
  }

  for (const post of posts) {
    const lastmod = new Date(post.data.updatedDate || post.data.pubDate).toISOString();
    const postUrl = `${site}/blog/${post.id}`;
    const imagePath = post.data.ogImage || post.data.heroImage || `/images/og/${post.id}.png`;
    const imageUrl = imagePath.startsWith('http') ? imagePath : `${site}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;

    xml += `  <url>
    <loc>${escapeXml(postUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(post.data.title)}</image:title>
    </image:image>
  </url>
`;
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
