import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const pulls = section.querySelectorAll('.story-pull');
    pulls.forEach((pull) => {
      gsap.fromTo(pull, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: pull, start: 'top 82%', toggleActions: 'play none none none' },
      });
    });
  }, []);

  return (
    <section id="story" ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#050505' }}>
      {/* Molecule background — subtle, breathing */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 200 200" className="animate-pulse-slow">
          <defs>
            <linearGradient id="bgGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b8860b" stopOpacity="1" />
              <stop offset="100%" stopColor="#daa520" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <polygon points="100,40 140,60 140,100 100,120 60,100 60,60" fill="none" stroke="url(#bgGold)" strokeWidth="0.5" />
          <polygon points="100,20 120,30 120,50 100,60 80,50 80,30" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="0.3" />
          <polygon points="140,40 160,50 160,70 140,80 120,70 120,50" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="0.3" />
          <polygon points="140,80 160,90 160,110 140,120 120,110 120,90" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="0.3" />
          <polygon points="100,100 120,110 120,130 100,140 80,130 80,110" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="0.3" />
          <polygon points="60,80 80,90 80,110 60,120 40,110 40,90" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="0.3" />
          <polygon points="60,40 80,50 80,70 60,80 40,70 40,50" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="max-w-[900px] mx-auto px-5 sm:px-6 md:px-12 py-20 md:py-32 text-center">
        <span className="story-pull font-inter text-[10px] font-medium uppercase tracking-[0.3em] block mb-16" style={{ color: '#5a4a2a' }}>The Origin</span>

        <div className="story-pull mb-16">
          <p className="font-oswald text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.06em] leading-[1.3]" style={{ color: '#e8e0d0' }}>
            For years, the pieces refused to fit.
          </p>
        </div>

        <div className="story-pull mb-16 space-y-4">
          <p className="font-inter text-base sm:text-lg md:text-xl leading-[1.8] font-light" style={{ color: '#7a7060' }}>
            A song. A scar. A prayer. A woman. A city. A dream. A loss.
          </p>
          <p className="font-inter text-base sm:text-lg md:text-xl leading-[1.8] font-light" style={{ color: '#7a7060' }}>
            Each one felt separate. Random. Broken.
          </p>
        </div>

        <div className="py-12 flex items-center justify-center gap-4">
          <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, #b8860b)' }} />
          <div className="w-2 h-2 rotate-45" style={{ background: '#b8860b', opacity: 0.4 }} />
          <div className="w-16 h-px" style={{ background: 'linear-gradient(to left, transparent, #b8860b)' }} />
        </div>

        <div className="story-pull mb-16 space-y-4">
          <p className="font-inter text-base sm:text-lg md:text-xl leading-[1.8] font-light" style={{ color: '#b8a88a' }}>
            Then the melody he wrote after the heartbreak
          </p>
          <p className="font-inter text-base sm:text-lg md:text-xl leading-[1.8] font-light" style={{ color: '#e8e0d0' }}>
            carried the same notes as the prayer whispered years before.
          </p>
        </div>

        <div className="story-pull mb-16">
          <p className="font-inter text-base sm:text-lg md:text-xl leading-[1.8] font-light" style={{ color: '#e8e0d0' }}>
            The pain taught him what healing would later complete.
            <br />
            The women became the colors. The cities became the rhythm.
          </p>
        </div>

        <div className="py-12 flex items-center justify-center gap-4">
          <div className="w-24 h-px" style={{ background: '#b8860b' }} />
        </div>

        <div className="story-pull">
          <p className="font-oswald text-2xl sm:text-3xl md:text-4xl tracking-[0.06em] leading-[1.4]" style={{ color: '#b8860b' }}>
            Nothing was random.
          </p>
          <p className="font-oswald text-2xl sm:text-3xl md:text-4xl tracking-[0.06em] leading-[1.4] mt-2" style={{ color: '#b8860b' }}>
            It was all connected.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Story;
