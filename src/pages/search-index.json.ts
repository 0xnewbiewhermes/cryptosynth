import { getCollection } from 'astro:content';

export async function GET() {
  const posts = (await getCollection('blog')).filter(
    (post) => !post.data.draft && new Date(post.data.pubDate).getTime() <= Date.now()
  );
  const searchIndex = posts
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime())
    .map((post) => ({
      id: post.id,
      title: post.data.title,
      description: post.data.description || '',
      excerpt: post.data.excerpt || '',
      content: (post.body || '').replace(/<[^>]*>/g, '').substring(0, 300),
      category: post.data.category || 'Berita',
      tags: post.data.tags || [],
      pubDate: new Date(post.data.pubDate).toISOString(),
    }));

  return new Response(JSON.stringify(searchIndex), {
    headers: { 'Content-Type': 'application/json' },
  });
}
