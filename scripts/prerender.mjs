import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js');

const template = await fs.readFile(indexPath, 'utf8');
const { render } = await import(pathToFileURL(serverEntryPath).href);
const appHtml = await render();

await fs.writeFile(
  indexPath,
  template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
  'utf8',
);

await fs.rm(path.join(distDir, 'server'), { recursive: true, force: true });
