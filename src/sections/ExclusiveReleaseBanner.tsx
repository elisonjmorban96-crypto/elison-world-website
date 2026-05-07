import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const ExclusiveReleaseBanner = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo('.exclusive-label', { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
    });

    gsap.fromTo('.exclusive-title', { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
      delay: 0.1,
    });

    gsap.fromTo('.exclusive-subtitle', { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
      delay: 0.2,
    });

    gsap.fromTo('.exclusive-cta', { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none none' },
      delay: 0.3,
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Warm gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(184, 134, 11, 0.08) 0%, rgba(139, 69, 19, 0.05) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(0, 128, 128, 0.05) 50%, rgba(184, 134, 11, 0.08) 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20 text-center">
        {/* Label */}
        <div className="exclusive-label inline-flex items-center gap-2 px-3 py-1.5 border mb-6" style={{ borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-gold)' }} />
          <span className="font-inter text-[10px] uppercase tracking-[0.2em] font-medium">
            Elison's World Exclusive
          </span>
        </div>

        {/* Title */}
        <h2
          className="exclusive-title font-oswald text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.06em] leading-[1.1] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          THE FIRST SOUND FROM ELISONWORLD
        </h2>

        {/* Subtitle */}
        <p
          className="exclusive-subtitle font-inter text-sm sm:text-base md:text-lg leading-[1.8] mb-8 max-w-xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          Déjame Perderme will live here first.
        </p>

        {/* CTA */}
        <a
          href="/dejame-perderme/"
          className="exclusive-cta inline-flex items-center gap-3 px-6 py-3 font-inter text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-300 hover:brightness-110 group"
          style={{ background: 'var(--accent-gold)', color: 'white' }}
        >
          Enter Déjame Perderme
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(184, 134, 11, 0.2), transparent)' }} />
    </section>
  );
};

export default ExclusiveReleaseBanner;
