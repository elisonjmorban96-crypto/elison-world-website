import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface Chapter {
  id: string;
  label: string;
  title: string;
  verses: string[];
  quote: string;
}

const chapters: Chapter[] = [
  {
    id: 'faith',
    label: 'The Foundation',
    title: 'FAITH',
    verses: [
      'Before the music, there was the prayer.',
      'Before the stage, there was the whisper in the dark.',
      'I did not know what I was praying to.',
      'Only that something had to hold me when nothing else did.',
    ],
    quote: 'Faith is not knowing the path. It is walking anyway.',
  },
  {
    id: 'love',
    label: 'The Fire',
    title: 'LOVE',
    verses: [
      'She taught me what freedom looked like.',
      'Not the kind in songs. The real kind.',
      'The kind that makes you want to burn your old self down',
      'and build something honest from the ash.',
    ],
    quote: 'Love is not possession. It is recognition.',
  },
  {
    id: 'pain',
    label: 'The Teacher',
    title: 'PAIN',
    verses: [
      'I used to run from it.',
      'Now I sit with it. Ask it questions.',
      'Pain does not visit without a lesson.',
      'The trick is being still enough to hear it.',
    ],
    quote: 'Pain is the price of becoming.',
  },
  {
    id: 'healing',
    label: 'The Return',
    title: 'HEALING',
    verses: [
      'I am not healed. I am healing.',
      'Every day. Every song. Every breath.',
      'The wound became the instrument.',
      'The silence became the melody.',
    ],
    quote: 'Healing is not forgetting. It is remembering differently.',
  },
];

const StoryChapters = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const chapterEls = section.querySelectorAll('.chapter-block');
    chapterEls.forEach((el) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
      });
    });
  }, []);

  return (
    <section id="chapters" ref={sectionRef} className="relative w-full py-20 md:py-32 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-[900px] mx-auto px-5 sm:px-6 md:px-12">
        <span className="scene-label block mb-4">The Journey</span>
        <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.06em] mb-16 md:mb-24" style={{ color: 'var(--text-primary)' }}>
          THE ROOMS
        </h2>

        <div className="space-y-24 md:space-y-32">
          {chapters.map((chapter, idx) => (
            <div key={chapter.id} className="chapter-block">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-inter text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--accent-gold)' }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, var(--accent-gold), transparent)' }} />
                <span className="font-inter text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-tertiary)' }}>
                  {chapter.label}
                </span>
              </div>

              <h3 className="font-oswald text-2xl sm:text-3xl md:text-5xl tracking-[0.08em] mb-4 md:mb-8" style={{ color: 'var(--text-primary)' }}>
                {chapter.title}
              </h3>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-10">
                {chapter.verses.map((verse, vIdx) => (
                  <p
                    key={vIdx}
                    className="font-inter text-base sm:text-lg md:text-xl leading-[1.8] font-light"
                    style={{ color: vIdx % 2 === 0 ? 'var(--text-secondary)' : 'var(--text-tertiary)' }}
                  >
                    {verse}
                  </p>
                ))}
              </div>

              <blockquote className="border-l-2 pl-6 py-2" style={{ borderColor: 'var(--accent-gold)' }}>
                <p className="font-inter text-sm sm:text-base italic leading-[1.6]" style={{ color: 'var(--accent-gold-light)' }}>
                  {chapter.quote}
                </p>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoryChapters;
