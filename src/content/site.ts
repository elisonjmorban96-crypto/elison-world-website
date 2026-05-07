import type { ElementType } from 'react';
import { Apple, Instagram, Mail, Music2, Twitter, Youtube } from 'lucide-react';

export interface LinkItem {
  name: string;
  url: string;
  icon?: ElementType;
}

export interface Release {
  slug: 'dejame-perderme' | 'decisions' | 'la-primera';
  path: '/dejame-perderme/' | '/decisions/' | '/la-primera/';
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
  isExclusive?: boolean;
  exclusiveTagline?: string;
  audioSrc?: string;
  videoSrc?: string;
  isLegacy?: boolean;
  legacyNote?: string;
}

export const artistName = 'Elison Joel Morban';
export const artistStageName = 'Elison';
export const siteUrl = 'https://elisonworld.com';
export const bookingEmail = 'booking@elisonworld.com';
export const worldName = "Elison's World";

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
    slug: 'dejame-perderme',
    path: '/dejame-perderme/',
    title: 'DÉJAME PERDERME',
    shortTitle: 'Déjame Perderme',
    year: '2026',
    meta: "Afro Latin House · Elison's World Exclusive",
    reflection: 'I was working, watching someone live freely, and it made me want to start again.',
    cover: '/dejame-perderme-cover.jpg',
    embedUrl: '',
    appleUrl: '',
    spotifyUrl: '',
    ogImage: '/og-dejame-perderme.jpg',
    description: "Hear Déjame Perderme by Elison first on Elison's World. A new independent Afro Latin House chapter begins here.",
    summary: "The first sound from Elison's World. A song about getting lost in someone's freedom and finding yourself again through rhythm, love, and inspiration.",
    credits: [
      'Artist: Elison',
      'Release: Déjame Perderme',
      "Label: Elison's World / OneTime Music Inc",
      'Genre: Afro Latin House',
      "First exclusive release on Elison's World",
    ],
    isExclusive: true,
    exclusiveTagline: 'Available here first. Before the rest of the world.',
    audioSrc: '/audio/dejame-perderme.mp3',
    videoSrc: '/video/dejame-perderme-loop.mp4',
  },
  {
    slug: 'decisions',
    path: '/decisions/',
    title: 'DECISIONS (REMASTERED)',
    shortTitle: 'Decisions',
    year: '2016',
    meta: 'Latin R&B · Remastered 2025',
    reflection: 'The first song that made me believe I could do this. Raw, honest, and completely independent.',
    cover: '/album-midnight.jpg',
    embedUrl: 'https://embed.music.apple.com/us/album/decisions-remastered-single/1811878413',
    appleUrl: 'https://music.apple.com/us/album/decisions-remastered-single/1811878413',
    spotifyUrl: 'https://open.spotify.com/track/3x5K3v3Z8Yq7X9X9X9X9X9',
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    ogImage: '/og-decisions.jpg',
    description: 'The 2016 breakthrough, remastered. The song that started the journey from Dominican roots to independent artistry.',
    summary: 'Raw Latin R&B born from late nights and early mornings. The first chapter of a story still being written.',
    credits: [
      'Artist: Elison',
      'Release: Decisions (Remastered)',
      'Label: OneTime Music Inc',
      'Genre: Latin R&B',
      'Originally released: 2016',
      'Remastered: 2025',
    ],
    isLegacy: true,
    legacyNote: 'From the archives. The beginning of the sound.',
  },
  {
    slug: 'la-primera',
    path: '/la-primera/',
    title: 'LA PRIMERA',
    shortTitle: 'La Primera',
    year: '2025',
    meta: 'Latin R&B · Debut Single',
    reflection: 'The first step into the world I was building. The song that taught me confidence is a practice, not a gift.',
    cover: '/album-firstlight.jpg',
    embedUrl: 'https://embed.music.apple.com/us/album/la-primera-remastered-single/1812806221',
    appleUrl: 'https://music.apple.com/us/album/la-primera-remastered-single/1812806221',
    spotifyUrl: 'https://open.spotify.com/track/4y6K4v4Z8Yq7X9X9X9X9X9',
    youtubeUrl: 'https://www.youtube.com/watch?v=example2',
    ogImage: '/og-la-primera.jpg',
    description: 'The debut. The statement. The first official step into Elison\'s World.',
    summary: 'A declaration of arrival. Latin R&B with Dominican soul, Miami heat, and New York ambition.',
    credits: [
      'Artist: Elison',
      'Release: LA PRIMERA',
      'Label: OneTime Music Inc',
      'Genre: Latin R&B',
      'Released: 2025',
    ],
    isLegacy: true,
    legacyNote: 'The debut that announced the arrival.',
  },
];

export const releaseBySlug = Object.fromEntries(releases.map((release) => [release.slug, release])) as Record<Release['slug'], Release>;
