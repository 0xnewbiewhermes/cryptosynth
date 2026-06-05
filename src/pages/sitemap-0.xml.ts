import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const site = context.site?.href || 'https://cryptosynth.id';
  const posts = await getCollection('blog');

  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/about/', changefreq: 'monthly', priority: '0.5' },
    { url: '/disclaimer/', changefreq: 'yearly', priority: '0.3' },
    { url: '/privacy/', changefreq: 'yearly', priority: '0.3' },
    { url: '/category/airdrop/', changefreq: 'daily', priority: '0.8' },
    { url: '/category/tutorial/', changefreq: 'weekly', priority: '0.7' },
    { url: '/airdrop/', changefreq: 'daily', priority: '0.8' },
    { url: '/articles/', changefreq: 'daily', priority: '0.8' },
    { url: '/tools/', changefreq: 'weekly', priority: '0.7' },
  ];

  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Static pages
  for (const page of staticPages) {
    xml += `  <url>
    <loc>${site}${page.url.slice(1)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // Blog posts with actual pubDate/updatedDate as lastmod
  for (const post of posts) {
    const lastmod = post.data.updatedDate || post.data.pubDate;
    const postDate = new Date(lastmod).toISOString().split('T')[0];
    // WIB timezone for Google News
    const postDateWIB = new Date(new Date(post.data.pubDate).getTime() + 7 * 60 * 60 * 1000);
    const postDateTime = postDateWIB.toISOString().replace('Z', '+07:00');
    const postUrl = `${site}blog/${post.id}/`;

    xml += `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${site}images/og/${post.id}.png</image:loc>
      <image:title>${post.data.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
    </image:image>
    <news:news>
      <news:publication>
        <news:name>CryptoSynth.id</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${postDateTime}</news:publication_date>
      <news:title>${post.data.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
    </news:news>
  </url>
`;
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
