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
  title: 'Elison | Latin R&B Artist | LA PRIMERA',
  description:
    'Official website of Elison, a Dominican Latin R&B artist. Follow the story from La Banda Top 20 to LA PRIMERA, with music, visuals, and direct links to Spotify, Apple Music, YouTube, and social platforms.',
  keywords:
    'Elison, Elison Joel Morban, Latin R&B artist, Dominican singer, LA PRIMERA, La Banda, Miami artist, New York artist, independent artist',
  canonical: absoluteUrl('/'),
  ogTitle: 'Elison | Latin R&B Artist | LA PRIMERA',
  ogDescription: 'A cinematic one-page story from La Banda to LA PRIMERA. Explore Elison\'s music, gallery, and direct artist links.',
  ogImage: absoluteUrl('/og-home.jpg'),
  ogImageAlt: 'Elison portrait in dramatic low-key lighting',
  twitterTitle: 'Elison | Latin R&B Artist | LA PRIMERA',
  twitterDescription: 'Official website of Elison. Music, visuals, and the story behind LA PRIMERA.',
  twitterImage: absoluteUrl('/og-home.jpg'),
  jsonLd: JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: 'Elison',
        description: 'Official website of Elison, a Dominican Latin R&B artist.',
        inLanguage: 'en-US',
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#artist`,
        name: 'Elison Joel Morban',
        alternateName: 'Elison',
        url: `${siteUrl}/`,
        image: absoluteUrl('/hero-elison.jpg'),
        description: 'Dominican Latin R&B artist behind Decisions (Remastered) and LA PRIMERA.',
        email: bookingEmail,
        jobTitle: 'Singer-songwriter',
        knowsAbout: ['Latin R&B', 'Independent music', 'Songwriting', 'Performance'],
        sameAs: sharedProfiles,
      },
      {
        '@type': 'MusicGroup',
        '@id': `${siteUrl}/#project`,
        name: 'Elison',
        url: `${siteUrl}/`,
        image: absoluteUrl('/hero-elison.jpg'),
        genre: ['Latin R&B', 'R&B', 'Latin Pop'],
        member: { '@id': `${siteUrl}/#artist` },
        sameAs: sharedProfiles,
      },
      {
        '@type': 'MusicRecording',
        '@id': `${siteUrl}/#track-decisions-remastered`,
        name: 'Decisions (Remastered)',
        url: `${siteUrl}/decisions/`,
        image: absoluteUrl('/album-midnight.jpg'),
        byArtist: { '@id': `${siteUrl}/#project` },
        publisher: { '@type': 'Organization', name: 'OneTime Music Inc' },
        sameAs: [releaseBySlug.decisions.appleUrl],
      },
      {
        '@type': 'MusicRecording',
        '@id': `${siteUrl}/#track-la-primera`,
        name: 'LA PRIMERA',
        url: `${siteUrl}/la-primera/`,
        image: absoluteUrl('/album-firstlight.jpg'),
        byArtist: { '@id': `${siteUrl}/#project` },
        publisher: { '@type': 'Organization', name: 'OneTime Music Inc' },
        sameAs: [releaseBySlug['la-primera'].appleUrl],
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: 'Elison | Latin R&B Artist | LA PRIMERA',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#artist` },
        description: 'A cinematic one-page artist website featuring Elison\'s story, music, gallery, and contact information.',
      },
    ],
  }),
});

const releaseMetadata = (path: AppPath) => {
  const release = path === '/decisions/' ? releaseBySlug.decisions : releaseBySlug['la-primera'];
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
          sameAs: [release.appleUrl, release.spotifyUrl, ...(release.youtubeUrl ? [release.youtubeUrl] : [])],
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
  title: 'EPK | Elison',
  description: 'Official EPK for Elison with artist bio, release context, streaming links, social links, and booking contact.',
  keywords: 'Elison EPK, Elison press kit, Elison Joel Morban, Latin R&B artist bio, booking Elison, official artist EPK',
  canonical: absoluteUrl('/epk/'),
  ogTitle: 'EPK | Elison',
  ogDescription: 'Official EPK for Elison, including bio, release facts, links, and booking contact.',
  ogImage: absoluteUrl('/og-epk.jpg'),
  ogImageAlt: 'Elison portrait for the official EPK',
  twitterTitle: 'EPK | Elison',
  twitterDescription: 'Official EPK for Elison, including bio, release facts, links, and booking contact.',
  twitterImage: absoluteUrl('/og-epk.jpg'),
  jsonLd: JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/epk/#webpage`,
        url: `${siteUrl}/epk/`,
        name: 'EPK | Elison',
        description: 'Official EPK for Elison with artist bio, release context, streaming links, social links, and booking contact.',
        about: {
          '@type': 'Person',
          name: 'Elison Joel Morban',
          alternateName: 'Elison',
          url: `${siteUrl}/`,
          email: bookingEmail,
          sameAs: sharedProfiles,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'EPK', item: `${siteUrl}/epk/` },
        ],
      },
    ],
  }),
});

export const getPageMetadata = (pathname: string): PageMetadata => {
  const route = normalizePathname(pathname);

  if (route === '/la-primera/' || route === '/decisions/') {
    return releaseMetadata(route);
  }

  if (route === '/epk/') {
    return epkMetadata();
  }

  return homeMetadata();
};
