import { renderToString } from 'react-dom/server';
import App from './App';
import { getPageMetadata } from './lib/metadata';

export const render = (pathname = '/') => ({
  appHtml: renderToString(<App initialPath={pathname} />),
  metadata: getPageMetadata(pathname),
});
