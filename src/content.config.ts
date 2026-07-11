import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Gideon'),
    category: z.string().default('Berita'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    faq: z.string().default(''),
    howTo: z.string().default(''),
    heroImage: z.string(),
    ogImage: z.string(),
    canonical: z.string().optional(),
  }),
});

export const collections = { blog };
