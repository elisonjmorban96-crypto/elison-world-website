import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion';
import { releases } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

const Music = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo('.music-header', { clipPath: 'inset(0 100% 0 0)' }, {
      clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
    });

    gsap.fromTo('.music-sub', { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
      delay: 0.3,
    });

    gsap.fromTo('.track-card', { x: 60, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.track-cards', start: 'top 75%', toggleActions: 'play none none none' },
    });
  }, []);

  return (
    <section id="music" ref={sectionRef} className="relative w-full min-h-screen flex items-center py-20 md:py-32 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute top-0 right-0 hidden sm:block w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: 'var(--accent-gold)', opacity: 0.04 }} />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20 w-full">
        <span className="scene-label block mb-4">Music</span>
        <h2 className="music-header font-oswald text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.06em] mb-4" style={{ color: 'var(--text-primary)' }}>
          THE SOUND
        </h2>
        <p className="music-sub font-inter text-sm sm:text-base mb-12 md:mb-16 max-w-[24rem]" style={{ color: 'var(--text-secondary)' }}>
          Where the pieces became songs.
        </p>

        <div className="track-cards grid md:grid-cols-2 gap-8 md:gap-12">
          {releases.map((track) => (
            <div
              key={track.slug}
              className="track-card group"
              onMouseEnter={() => setHoveredTrack(track.slug)}
              onMouseLeave={() => setHoveredTrack(null)}
            >
              <div className="relative aspect-square overflow-hidden mb-6" style={{ background: 'var(--bg-secondary)' }}>
                <img
                  src={track.cover}
                  alt={track.title}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: hoveredTrack === track.slug ? 'scale(1.03)' : 'scale(1)' }}
                />
                <div className="absolute top-4 left-4 px-3 py-1" style={{ background: 'var(--accent-gold)' }}>
                  <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.1em] text-white">{track.year}</span>
                </div>
              </div>

              <h3 className="font-oswald text-xl md:text-2xl font-bold tracking-[0.08em] mb-1" style={{ color: 'var(--text-primary)' }}>
                {track.title}
              </h3>
              <span className="font-inter text-xs mb-4 block" style={{ color: 'var(--text-tertiary)' }}>
                {track.meta}
              </span>

              <p className="pull-quote text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                &ldquo;{track.reflection}&rdquo;
              </p>

              {track.embedUrl ? (
                <div className="mb-6 overflow-hidden rounded-xl border" style={{ borderColor: 'var(--text-dim)' }}>
                  <iframe
                    title={`${track.title} Apple Music player`}
                    src={track.embedUrl}
                    loading="lazy"
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                    sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                    style={{ width: '100%', height: '175px', border: 0, background: 'transparent' }}
                  />
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <a
                  href={track.path}
                  className="inline-flex items-center gap-2 px-4 py-2 border text-[10px] font-medium uppercase tracking-[0.12em] transition-all duration-300 hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
                  style={{ borderColor: 'var(--text-dim)', color: 'var(--text-tertiary)' }}
                >
                  Enter the Room
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Music;