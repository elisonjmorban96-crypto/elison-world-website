export type AppPath = '/' | '/dejame-perderme/' | '/fragment/' | '/epk/' | '/game/' | '/lyrics/';

export const staticPaths: AppPath[] = ['/', '/dejame-perderme/', '/fragment/', '/epk/', '/game/', '/lyrics/'];

export const normalizePathname = (pathname: string): AppPath => {
  if (pathname === '/dejame-perderme' || pathname === '/dejame-perderme/') {
    return '/dejame-perderme/';
  }

  if (pathname === '/fragment' || pathname === '/fragment/') {
    return '/fragment/';
  }

  if (pathname === '/epk' || pathname === '/epk/') {
    return '/epk/';
  }

  if (pathname === '/game' || pathname === '/game/') {
    return '/game/';
  }

  if (pathname === '/lyrics' || pathname === '/lyrics/') {
    return '/lyrics/';
  }

  return '/';
};
