export type AppPath = '/' | '/la-primera/' | '/decisions/' | '/dejame-perderme/' | '/fragment/' | '/epk/';

export const staticPaths: AppPath[] = ['/', '/la-primera/', '/decisions/', '/dejame-perderme/', '/fragment/', '/epk/'];

export const normalizePathname = (pathname: string): AppPath => {
  if (pathname === '/la-primera' || pathname === '/la-primera/') {
    return '/la-primera/';
  }

  if (pathname === '/decisions' || pathname === '/decisions/') {
    return '/decisions/';
  }

  if (pathname === '/dejame-perderme' || pathname === '/dejame-perderme/') {
    return '/dejame-perderme/';
  }

  if (pathname === '/fragment' || pathname === '/fragment/') {
    return '/fragment/';
  }

  if (pathname === '/epk' || pathname === '/epk/') {
    return '/epk/';
  }

  return '/';
};
