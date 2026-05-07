import { bookingEmail, releaseBySlug, siteUrl } from '../content/site';
import { normalizePathname, type AppPath } from './routing';

const absoluteUrl = (path: string) => `${siteUrl}${path === '/' ? '/' : path}`;

const sharedProfiles = [
  'https://www.instagram.com/elison.wav',
  'https://www.tiktok.com/@elison.wav',
  'https://www.x.com/elisonjoel',
  'https://music.apple.com/us/artist/elison/1810625015',
  'https://open.spotify.com/artist/59g2fpjNdXZQzgQjiaHkRa',
  'https://www.youtube.com/@elisonjoel',
];

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  jsonLd: string;
}

const homeMetadata = (): PageMetadata => ({
  title: "Elison's World",
  description:
    "Nothing was random. It was all connected. Enter the inner world of Elison through music, memory, faith, love, pain, and becoming.",
  keywords:
    'Elison, Elison Joel Morban, Elison\'s World, Latin R&B, Afro Latin House, Dominican artist, Miami, New York, music, faith, love, pain, healing',
  canonical: absoluteUrl('/'),
  ogTitle: "Elison's World",
  ogDescription: 'Nothing was random. It was all connected. Enter the inner world of Elison.',
  ogImage: absoluteUrl('/og-home.jpg'),
  ogImageAlt: 'Elison portrait in dramatic low-key lighting',
  twitterTitle: "Elison's World",
  twitterDescription: 'Nothing was random. It was all connected.',
  twitterImage: absoluteUrl('/og-home.jpg'),
  jsonLd: JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Elison's World",
        description: "Nothing was random. It was all connected. Enter the inner world of Elison through music, memory, faith, love, pain, and becoming.",
        inLanguage: 'en-US',
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#artist`,
        name: 'Elison Joel Morban',
        alternateName: 'Elison',
        url: `${siteUrl}/`,
        image: absoluteUrl('/hero-elison.jpg'),
        description: 'Artist behind Elison\'s World. Dominican Latin R&B and Afro Latin House.',
        email: bookingEmail,
        jobTitle: 'Artist',
        knowsAbout: ['Latin R&B', 'Afro Latin House', 'Music', 'Faith', 'Love', 'Healing'],
        sameAs: sharedProfiles,
      },
      {
        '@type': 'MusicGroup',
        '@id': `${siteUrl}/#project`,
        name: 'Elison',
        url: `${siteUrl}/`,
        image: absoluteUrl('/hero-elison.jpg'),
        genre: ['Latin R&B', 'Afro Latin House'],
        member: { '@id': `${siteUrl}/#artist` },
        sameAs: sharedProfiles,
      },
      {
        '@type': 'MusicRecording',
        '@id': `${siteUrl}/#track-dejame-perderme`,
        name: 'DÉJAME PERDERME',
        url: `${siteUrl}/dejame-perderme/`,
        image: absoluteUrl('/dejame-perderme-cover.jpg'),
        byArtist: { '@id': `${siteUrl}/#project` },
        publisher: { '@type': 'Organization', name: "Elison's World" },
        description: "First exclusive release on Elison's World. Afro Latin House.",
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: "Elison's World",
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#artist` },
        description: "Nothing was random. It was all connected. Enter the inner world of Elison.",
      },
    ],
  }),
});

const releaseMetadata = (path: AppPath) => {
  const release = releaseBySlug['dejame-perderme'];
  const pageUrl = absoluteUrl(path);

  return {
    title: `${release.title} | Elison`,
    description: release.description,
    keywords: `${release.title}, Elison, Elison Joel Morban, Latin R&B, OneTime Music Inc, official release page`,
    canonical: pageUrl,
    ogTitle: `${release.title} | Elison`,
    ogDescription: release.summary,
    ogImage: absoluteUrl(release.ogImage),
    ogImageAlt: `${release.title} cover art`,
    twitterTitle: `${release.title} | Elison`,
    twitterDescription: release.summary,
    twitterImage: absoluteUrl(release.ogImage),
    jsonLd: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: `${release.title} | Elison`,
          description: release.description,
          inLanguage: 'en-US',
        },
        {
          '@type': 'MusicRecording',
          '@id': `${pageUrl}#recording`,
          name: release.title,
          url: pageUrl,
          image: absoluteUrl(release.cover),
          description: release.summary,
          byArtist: {
            '@type': 'MusicGroup',
            name: 'Elison',
            url: `${siteUrl}/`,
            sameAs: sharedProfiles,
          },
          publisher: {
            '@type': 'Organization',
            name: 'OneTime Music Inc',
          },
          sameAs: [release.appleUrl, release.spotifyUrl, ...(release.youtubeUrl ? [release.youtubeUrl] : [])].filter(Boolean),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: release.title, item: pageUrl },
          ],
        },
      ],
    }),
  } satisfies PageMetadata;
};

const epkMetadata = (): PageMetadata => ({
  title: 'About | Elison',
  description: 'The story behind Elison\'s World. How every broken piece finally connected.',
  keywords: 'Elison, Elison Joel Morban, Elison\'s World, story, faith, love, pain, healing, music',
  canonical: absoluteUrl('/epk/'),
  ogTitle: 'About | Elison',
  ogDescription: 'The story behind Elison\'s World.',
  ogImage: absoluteUrl('/og-epk.jpg'),
  ogImageAlt: 'Elison portrait',
  twitterTitle: 'About | Elison',
  twitterDescription: 'The story behind Elison\'s World.',
  twitterImage: absoluteUrl('/og-epk.jpg'),
  jsonLd: JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/epk/#webpage`,
        url: `${siteUrl}/epk/`,
        name: 'About | Elison',
        description: 'The story behind Elison\'s World.',
        about: {
          '@type': 'Person',
          name: 'Elison Joel Morban',
          alternateName: 'Elison',
          url: `${siteUrl}/`,
          email: bookingEmail,
          sameAs: sharedProfiles,
        },
      },
    ],
  }),
});

const worldMetadata = (): PageMetadata => ({
  title: "Elison's World | The Clearing",
  description: "Enter Elison's World — a hidden music universe. Explore The Clearing, find fragments, and unlock exclusive music.",
  keywords: "Elison's World, hidden music, puzzle, treasure hunt, Déjame Perderme, exclusive release, Afro Latin House",
  canonical: absoluteUrl('/world/'),
  ogTitle: "Elison's World | The Clearing",
  ogDescription: 'A hidden music universe. Find the fragments. Unlock the song.',
  ogImage: absoluteUrl('/og-world.jpg'),
  ogImageAlt: "Elison's World — The Clearing",
  twitterTitle: "Elison's World | The Clearing",
  twitterDescription: 'A hidden music universe. Find the fragments. Unlock the song.',
  twitterImage: absoluteUrl('/og-world.jpg'),
  jsonLd: JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/world/#webpage`,
        url: `${siteUrl}/world/`,
        name: "Elison's World | The Clearing",
        description: "Enter Elison's World — a hidden music universe.",
        inLanguage: 'en-US',
      },
    ],
  }),
});

export const getPageMetadata = (pathname: string): PageMetadata => {
  const route = normalizePathname(pathname);

  if (route === '/dejame-perderme/') {
    return releaseMetadata(route);
  }

  if (route === '/world/') {
    return worldMetadata();
  }

  if (route === '/epk/') {
    return epkMetadata();
  }

  return homeMetadata();
};
