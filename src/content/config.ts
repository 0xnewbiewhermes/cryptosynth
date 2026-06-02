import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Gideon'),
    category: z.string().default('Berita'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    faq: z.string().default(''),
  }),
});

export const collections = { blog };
