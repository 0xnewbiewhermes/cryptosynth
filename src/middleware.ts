import { defineMiddleware } from 'astro:middleware';

const disabledAdminRoutes = ['/admin', '/api/admin'];

export const onRequest = defineMiddleware(({ url }, next) => {
  if (disabledAdminRoutes.some((route) => url.pathname === route || url.pathname.startsWith(`${route}/`))) {
    return new Response('Not Found', { status: 404 });
  }

  return next();
});
