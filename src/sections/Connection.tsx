import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const Connection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => {
        gsap.set(image, { y: (self.progress - 0.5) * -40 });
      },
    });

    gsap.fromTo('.connect-title span', { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none none' },
      delay: 0.3,
    });

    gsap.fromTo('.connect-sub', { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none none' },
      delay: 0.8,
    });

    return () => { st.kill(); };
  }, []);

  return (
    <section id="connect" ref={sectionRef} className="mobile-screen relative w-full flex items-center justify-center overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[115%] -top-[7%]">
        <img
          src="/gallery-rooftop.jpg"
          alt=""
          width={1344}
          height={768}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(0.8)' }}
        />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 15%, transparent 70%, var(--bg-primary) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(184,134,11,0.08) 0%, transparent 60%)' }} />

      {/* Content */}
      <div className="safe-block relative z-10 max-w-[800px] mx-auto px-5 sm:px-6 md:px-12 py-20 md:py-24 text-center">
        <h2 className="connect-title font-oswald text-[34px] leading-[0.95] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.05em] md:tracking-[0.06em] mb-5" style={{ color: 'var(--text-primary)' }}>
          {'STAY CLOSE'.split('').map((char, i) => (
            <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>
        <p className="connect-sub font-inter text-sm sm:text-base md:text-lg mb-12 md:mb-16 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          If you found me here, you are early.
        </p>

        <div className="connect-footer max-w-md mx-auto mb-14 md:mb-16">
          <p className="font-inter text-[11px] uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--text-tertiary)' }}>
            Enter your email to join Elison's World. New music arrives here first.
          </p>
          <form
            action="https://formspree.io/f/xqewbelg"
            method="POST"
            className="flex flex-col sm:flex-row gap-3 sm:gap-0"
          >
            <input type="hidden" name="source" value="elisonworld.com" />
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              className="flex-1 px-4 py-3 bg-white/[0.03] border font-inter text-sm placeholder:text-white/20 focus:outline-none transition-colors"
              style={{ borderColor: 'var(--text-dim)', color: 'var(--text-primary)' }}
              required
            />
            <button
              type="submit"
              aria-label="Join Elison's World"
              className="px-5 py-3 sm:px-5 transition-colors hover:brightness-110 min-h-12 flex items-center justify-center"
              style={{ background: 'var(--accent-gold)' }}
            >
              <span className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white">
                Join
              </span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="connect-footer pt-8 border-t" style={{ borderColor: 'var(--text-dim)' }}>
          <p className="font-oswald text-2xl font-bold tracking-[0.2em] mb-2" style={{ color: 'var(--text-primary)' }}>ELISON</p>
          <p className="font-inter text-[10px] tracking-wider" style={{ color: 'var(--text-dim)' }}>
            © {new Date().getFullYear()} Elison's World
          </p>
        </div>
      </div>
    </section>
  );
};

export default Connection;