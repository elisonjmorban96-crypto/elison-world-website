export type AppPath = '/' | '/la-primera/' | '/decisions/' | '/epk/';

export const staticPaths: AppPath[] = ['/', '/la-primera/', '/decisions/', '/epk/'];

export const normalizePathname = (pathname: string): AppPath => {
  if (pathname === '/la-primera' || pathname === '/la-primera/') {
    return '/la-primera/';
  }

  if (pathname === '/decisions' || pathname === '/decisions/') {
    return '/decisions/';
  }

  if (pathname === '/epk' || pathname === '/epk/') {
    return '/epk/';
  }

  return '/';
};
