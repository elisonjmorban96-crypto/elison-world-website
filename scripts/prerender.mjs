import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js');
const routes = ['/', '/la-primera/', '/decisions/', '/epk/'];

const { render } = await import(pathToFileURL(serverEntryPath).href);
const template = await fs.readFile(indexPath, 'utf8');

const replaceMeta = (html, metadata) => html
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${metadata.title}</title>`)
  .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${metadata.description}" />`)
  .replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/, `<meta name="keywords" content="${metadata.keywords}" />`)
  .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${metadata.canonical}" />`)
  .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${metadata.ogTitle}" />`)
  .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${metadata.ogDescription}" />`)
  .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${metadata.canonical}" />`)
  .replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/, `<meta property="og:image" content="${metadata.ogImage}" />`)
  .replace(/<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/>/, `<meta property="og:image:alt" content="${metadata.ogImageAlt}" />`)
  .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${metadata.twitterTitle}" />`)
  .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${metadata.twitterDescription}" />`)
  .replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${metadata.twitterImage}" />`)
  .replace(/<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:image:alt" content="${metadata.ogImageAlt}" />`)
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${metadata.jsonLd}</script>`);

for (const route of routes) {
  const { appHtml, metadata } = await render(route);
  const routeHtml = replaceMeta(
    template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
    metadata,
  );

  if (route === '/') {
    await fs.writeFile(indexPath, routeHtml, 'utf8');
    continue;
  }

  const routeDir = path.join(distDir, route.replace(/^\//, '').replace(/\/$/, ''));
  await fs.mkdir(routeDir, { recursive: true });
  await fs.writeFile(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
}

await fs.rm(path.join(distDir, 'server'), { recursive: true, force: true });
