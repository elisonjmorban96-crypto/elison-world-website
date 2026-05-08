import type { ElementType } from 'react';
import { Apple, Instagram, Mail, Music2, Twitter, Youtube } from 'lucide-react';

export interface LinkItem {
  name: string;
  url: string;
  icon?: ElementType;
}

export interface Release {
  slug: 'dejame-perderme';
  path: '/dejame-perderme/';
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
    cover: '/dejame-perderme-cover.png',
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
    videoSrc: undefined,
  },
];

export const releaseBySlug = Object.fromEntries(releases.map((release) => [release.slug, release])) as Record<Release['slug'], Release>;
