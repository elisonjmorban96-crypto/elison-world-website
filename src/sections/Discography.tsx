import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Album {
  id: number;
  title: string;
  year: string;
  tag: string;
  tracks: number;
  image: string;
  description: string;
}

const albums: Album[] = [
  {
    id: 1,
    title: 'Midnight Confessions',
    year: '2024',
    tag: 'Latest',
    tracks: 12,
    image: '/album-midnight.jpg',
    description: 'The unfiltered truth, spoken in the hours when masks come off.',
  },
  {
    id: 2,
    title: 'Urban Soul',
    year: '2022',
    tag: 'Breakthrough',
    tracks: 10,
    image: '/album-urban.jpg',
    description: 'City lights, late drives, and the weight of becoming.',
  },
  {
    id: 3,
    title: 'First Light',
    year: '2020',
    tag: 'Debut',
    tracks: 8,
    image: '/album-firstlight.jpg',
    description: 'The first time the world heard what pain sounds like when it learns to sing.',
  },
  {
    id: 4,
    title: 'Acoustic Sessions',
    year: '2023',
    tag: 'Raw',
    tracks: 6,
    image: '/album-acoustic.jpg',
    description: 'Stripped down. No production, no hiding. Just a man and his ghosts.',
  },
  {
    id: 5,
    title: 'Remixes & Collabs',
    year: '2021',
    tag: 'Collection',
    tracks: 15,
    image: '/album-remixes.jpg',
    description: 'When other voices joined the conversation.',
  },
];

const Discography = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      '.discography-header',
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      '.discography-subtext',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'smooth',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        delay: 0.3,
      }
    );

    gsap.fromTo(
      '.album-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.albums-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id="discography"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-black overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
          <h2 className="discography-header font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-[0.05em] mb-4">
            The Music
          </h2>
          <p className="discography-subtext font-inter text-base md:text-lg text-white/50 max-w-xl">
            Every album is a chapter. Every song, a confession.
          </p>
        </div>

        {/* Albums Grid */}
        <div className="albums-grid max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
            {albums.map((album) => (
              <div
                key={album.id}
                className="album-card group"
              >
                <div className="relative bg-white/[0.02] border border-white/[0.06] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-amber-800/30">
                  {/* Album Cover */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={album.image}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center p-6 text-center">
                      <p className="font-inter text-xs text-amber-200/80 leading-relaxed mb-4">
                        {album.description}
                      </p>
                      <button className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                        <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                      </button>
                    </div>

                    {/* Tag */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-amber-800/90 text-amber-100 font-inter text-[10px] font-semibold uppercase tracking-[0.1em]">
                      {album.tag}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-oswald text-base font-bold text-white uppercase tracking-wide mb-1 truncate">
                      {album.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-inter text-xs text-white/40">
                        {album.year}
                      </span>
                      <span className="font-inter text-xs text-white/40">
                        {album.tracks} tracks
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-12 text-center">
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-amber-800/40 text-amber-200/70 font-inter text-sm font-semibold uppercase tracking-[0.15em] hover:bg-amber-900/20 hover:border-amber-700/50 transition-all duration-300"
          >
            Stream on Spotify
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Discography;
