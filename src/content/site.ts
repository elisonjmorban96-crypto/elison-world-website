import type { ElementType } from 'react';
import { Apple, Instagram, Mail, Music2, Twitter, Youtube } from 'lucide-react';

export interface LinkItem {
  name: string;
  url: string;
  icon?: ElementType;
}

export interface Release {
  slug: 'decisions' | 'la-primera';
  path: '/decisions/' | '/la-primera/';
  title: string;
  shortTitle: string;
  year: string;
  meta: string;
  reflection: string;
  cover: string;
  embedUrl: string;
  appleUrl: string;
  spotifyUrl: string;
  youtubeUrl?: string;
  ogImage: string;
  description: string;
  summary: string;
  credits: string[];
}

export const artistName = 'Elison Joel Morban';
export const artistStageName = 'Elison';
export const siteUrl = 'https://elisonworld.com';
export const bookingEmail = 'booking@elisonworld.com';

export const streamLinks: LinkItem[] = [
  { name: 'Spotify', url: 'https://open.spotify.com/artist/59g2fpjNdXZQzgQjiaHkRa', icon: Music2 },
  { name: 'Apple Music', url: 'https://music.apple.com/us/artist/elison/1810625015', icon: Apple },
  { name: 'YouTube', url: 'https://www.youtube.com/@elisonjoel', icon: Youtube },
];

export const socialLinks: LinkItem[] = [
  { name: 'Instagram', url: 'https://www.instagram.com/elison.wav', icon: Instagram },
  { name: 'TikTok', url: 'https://www.tiktok.com/@elison.wav', icon: Music2 },
  { name: 'Twitter / X', url: 'https://www.x.com/elisonjoel', icon: Twitter },
];

export const contactLinks: LinkItem[] = [
  ...streamLinks,
  ...socialLinks,
  { name: 'Booking', url: `mailto:${bookingEmail}`, icon: Mail },
];

export const releases: Release[] = [
  {
    slug: 'decisions',
    path: '/decisions/',
    title: 'Decisions (Remastered)',
    shortTitle: 'Decisions',
    year: '2016',
    meta: '74 BPM · OneTime Music Inc',
    reflection: 'My first release. It did not move the way I wanted, but it still mattered.',
    cover: '/album-midnight.jpg',
    embedUrl: 'https://embed.music.apple.com/us/album/decisions-remastered-single/1811878413',
    appleUrl: 'https://music.apple.com/us/album/decisions-remastered-single/1811878413',
    spotifyUrl: 'https://open.spotify.com/artist/59g2fpjNdXZQzgQjiaHkRa',
    ogImage: '/og-decisions.jpg',
    description: 'Official release page for Decisions (Remastered) by Elison, with the track story, player, and direct streaming links.',
    summary: 'The first release. The part of the story that came out before the long quiet stretch.',
    credits: [
      'Artist: Elison',
      'Release: Decisions (Remastered)',
      'Label: OneTime Music Inc',
      'Official Apple Music release linked from this page',
    ],
  },
  {
    slug: 'la-primera',
    path: '/la-primera/',
    title: 'LA PRIMERA',
    shortTitle: 'LA PRIMERA',
    year: '2025',
    meta: 'Latin R&B · OneTime Music Inc',
    reflection: 'Ten years later, this sounds more like me. Less trying. More direct.',
    cover: '/album-firstlight.jpg',
    embedUrl: 'https://embed.music.apple.com/us/album/la-primera-remastered-single/1812806221',
    appleUrl: 'https://music.apple.com/us/album/la-primera-remastered-single/1812806221',
    spotifyUrl: 'https://open.spotify.com/artist/59g2fpjNdXZQzgQjiaHkRa',
    youtubeUrl: 'https://www.youtube.com/@elisonjoel',
    ogImage: '/og-la-primera.jpg',
    description: 'Official release page for LA PRIMERA by Elison, with the single story, credits, and direct streaming links.',
    summary: 'The return. Ten years after the first release, this is the track that marks the new chapter.',
    credits: [
      'Artist: Elison',
      'Release: LA PRIMERA',
      'Label: OneTime Music Inc',
      'Official Apple Music release linked from this page',
    ],
  },
];

export const releaseBySlug = Object.fromEntries(releases.map((release) => [release.slug, release])) as Record<Release['slug'], Release>;
