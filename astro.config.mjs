import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://cryptosynth.id',
  integrations: [mdx()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  image: {
    domains: ['cryptosynth.id'],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
