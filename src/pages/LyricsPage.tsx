import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Music } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';
import type { Release } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

interface LyricsPageProps {
  release: Release;
}

const lyricsData = {
  title: 'Déjame Perderme',
  verses: [
    {
      section: 'Intro',
      lines: [
        'Déjame perderme en tu libertad',
        'Déjame encontrarme en tu verdad',
      ],
    },
    {
      section: 'Verso 1',
      lines: [
        'Estaba trabajando, viendo alguien vivir libre',
        'Y me hizo querer empezar de nuevo',
        'No sé si fue la forma en que se movía',
        'O la paz que llevaba dentro',
      ],
    },
    {
      section: 'Pre-Coro',
      lines: [
        'No quiero controlar esto',
        'Solo quiero sentirlo',
        'No quiero entenderlo',
        'Solo quiero vivirlo',
      ],
    },
    {
      section: 'Coro',
      lines: [
        'Déjame perderme en tu libertad',
        'Déjame encontrarme en tu verdad',
        'Que el ritmo me lleve donde tú estás',
        'Déjame perderme, déjame perderme',
      ],
    },
    {
      section: 'Verso 2',
      lines: [
        'Cada nota que toco tiene tu nombre',
        'Cada canción que escribo tiene tu piel',
        'No es obsesión, es reconocimiento',
        'De que en tu libertad encontré la miel',
      ],
    },
    {
      section: 'Puente',
      lines: [
        'No fue casualidad',
        'No fue solo un momento',
        'Fue el universo conspirando',
        'Para que yo te sienta',
        'Para que tú me sientas',
      ],
    },
    {
      section: 'Outro',
      lines: [
        'Déjame perderme...',
        'Déjame perderme...',
        'En tu libertad...',
      ],
    },
  ],
  notes: [
    'Written in Miami, 2025',
    'Produced by Elison',
    'First exclusive release on Elison\'s World',
  ],
};

const LyricsPage = ({ release }: LyricsPageProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const lines = section.querySelectorAll('.lyric-line');
    lines.forEach((line) => {
      gsap.fromTo(line, { opacity: 0.3, x: -10 }, {
        opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-20 md:py-32" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-[800px] mx-auto px-5 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Music className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
          <span className="font-inter text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--accent-gold)' }}>
            Lyrics
          </span>
        </div>

        <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl tracking-[0.08em] mb-6" style={{ color: 'var(--text-primary)' }}>
          {lyricsData.title}
        </h1>

        {/* Audio Player */}
        {release.audioSrc && (
          <div className="flex items-center gap-4 mb-12 p-4 border rounded-xl" style={{ borderColor: 'var(--text-dim)', background: 'rgba(8,8,8,0.6)' }}>
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--accent-gold)' }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>
            <div>
              <p className="font-oswald text-sm tracking-[0.05em]" style={{ color: 'var(--text-primary)' }}>
                {release.shortTitle}
              </p>
              <p className="font-inter text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                Listen while reading
              </p>
            </div>
          </div>
        )}

        {/* Lyrics */}
        <div className="space-y-12">
          {lyricsData.verses.map((verse) => (
            <div
              key={verse.section}
              className="group"
              onMouseEnter={() => setActiveSection(verse.section)}
              onMouseLeave={() => setActiveSection(null)}
            >
              <span
                className="font-inter text-[10px] uppercase tracking-[0.2em] mb-4 block transition-colors duration-300"
                style={{
                  color: activeSection === verse.section ? 'var(--accent-gold)' : 'var(--text-tertiary)',
                }}
              >
                {verse.section}
              </span>
              <div className="space-y-2">
                {verse.lines.map((line, idx) => (
                  <p
                    key={idx}
                    className="lyric-line font-inter text-lg sm:text-xl md:text-2xl leading-[1.6] font-light transition-all duration-300"
                    style={{
                      color: activeSection === verse.section ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--text-dim)' }}>
          <span className="font-inter text-[10px] uppercase tracking-[0.2em] mb-4 block" style={{ color: 'var(--text-tertiary)' }}>
            Behind the Song
          </span>
          <div className="space-y-2">
            {lyricsData.notes.map((note, idx) => (
              <p key={idx} className="font-inter text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <a
            href={release.path}
            className="inline-flex items-center gap-2 font-inter text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 hover:text-[var(--accent-gold)]"
            style={{ color: 'var(--text-primary)' }}
          >
            ← Back to release
          </a>
        </div>
      </div>
    </section>
  );
};

export default LyricsPage;
