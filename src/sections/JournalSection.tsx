import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Clock, Tag } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
}

const journalEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2025-01-15',
    title: 'On Freedom',
    excerpt: 'I used to think freedom was the absence of chains. Now I know it is the presence of choice. The choice to stay. The choice to leave. The choice to begin again.',
    tags: ['freedom', 'beginnings'],
    readTime: '2 min',
  },
  {
    id: '2',
    date: '2025-02-03',
    title: 'The Night I Wrote Déjame Perderme',
    excerpt: 'It was 3 AM. Miami was sleeping. I was watching the city breathe through my window and realized that every light was someone else awake, someone else searching.',
    tags: ['creation', 'miami', 'night'],
    readTime: '3 min',
  },
  {
    id: '3',
    date: '2025-03-20',
    title: 'What She Taught Me',
    excerpt: 'She did not teach me love. She taught me presence. The difference between being with someone and being there for someone. Between looking and seeing.',
    tags: ['love', 'presence', 'lessons'],
    readTime: '2 min',
  },
  {
    id: '4',
    date: '2025-04-10',
    title: 'On Pain as Instrument',
    excerpt: 'The wound does not close. It transforms. It becomes the place where the sound resonates deepest. Every artist knows this. Every human forgets it.',
    tags: ['pain', 'healing', 'art'],
    readTime: '2 min',
  },
  {
    id: '5',
    date: '2025-05-01',
    title: 'Building Elison\'s World',
    excerpt: 'I am not creating a brand. I am excavating a world that already exists inside me. The fragments, the rooms, the connections — they were always there. I am just giving them names.',
    tags: ['creation', 'world-building', 'identity'],
    readTime: '4 min',
  },
];

const JournalSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const entries = section.querySelectorAll('.journal-entry');
    entries.forEach((entry) => {
      gsap.fromTo(entry, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: entry, start: 'top 85%', toggleActions: 'play none none none' },
      });
    });
  }, []);

  return (
    <section id="journal" ref={sectionRef} className="relative w-full py-20 md:py-32 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-[1000px] mx-auto px-5 sm:px-6 md:px-12">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
          <span className="font-inter text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--accent-gold)' }}>
            Journal
          </span>
        </div>

        <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.06em] mb-6" style={{ color: 'var(--text-primary)' }}>
          NOTES FROM THE WORLD
        </h2>

        <p className="font-inter text-base sm:text-lg leading-[1.8] mb-16 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Raw thoughts, unfinished ideas, and moments that did not fit into songs.
        </p>

        <div className="space-y-8">
          {journalEntries.map((entry) => (
            <article
              key={entry.id}
              className="journal-entry group border-b pb-8 cursor-pointer transition-all duration-300"
              style={{ borderColor: 'var(--text-dim)' }}
              onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-inter text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                    {entry.date}
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ background: 'var(--text-dim)' }} />
                  <span className="font-inter text-[11px] flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                    <Clock className="w-3 h-3" />
                    {entry.readTime}
                  </span>
                </div>
              </div>

              <h3
                className="font-oswald text-xl sm:text-2xl md:text-3xl tracking-[0.04em] mb-3 transition-colors duration-300 group-hover:text-[var(--accent-gold)]"
                style={{ color: 'var(--text-primary)' }}
              >
                {entry.title}
              </h3>

              <p className="font-inter text-sm sm:text-base leading-[1.7] mb-4" style={{ color: 'var(--text-secondary)' }}>
                {entry.excerpt}
              </p>

              {expandedEntry === entry.id && (
                <div className="mt-4 p-6 rounded-lg" style={{ background: 'rgba(8,8,8,0.6)', border: '1px solid var(--text-dim)' }}>
                  <p className="font-inter text-sm sm:text-base leading-[1.8] italic" style={{ color: 'var(--text-secondary)' }}>
                    Full entry coming soon. This is a preview of the journal system.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 flex-wrap">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 font-inter text-[10px] uppercase tracking-[0.1em]"
                    style={{
                      color: 'var(--text-tertiary)',
                      border: '1px solid var(--text-dim)',
                    }}
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JournalSection;