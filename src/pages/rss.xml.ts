import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft && new Date(post.data.pubDate).getTime() <= Date.now())
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());
  return rss({
    title: 'CryptoSynth.id',
    description: 'CryptoSynth — catatan crypto pribadi dari Kalimantan. Node logs, portfolio, DeFi, dan farming airdrop.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.excerpt || post.data.description,
      link: `/blog/${post.id}/`,
    })),
  });
}
