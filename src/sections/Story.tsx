import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    // Portrait parallax — slow, subtle
    const st = ScrollTrigger.create({
      trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.6,
      onUpdate: (self) => { gsap.set(image, { y: (self.progress - 0.5) * -40 }); },
    });

    // Each pull quote reveals on scroll — like subtitles appearing
    const pulls = section.querySelectorAll('.story-pull');
    pulls.forEach((pull) => {
      gsap.fromTo(pull, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: pull, start: 'top 82%', toggleActions: 'play none none none' },
      });
    });

    gsap.fromTo('.story-cta', { opacity: 0 }, {
      opacity: 1, duration: 0.8,
      scrollTrigger: { trigger: '.story-cta', start: 'top 88%', toggleActions: 'play none none none' },
    });

    return () => { st.kill(); };
  }, []);

  return (
    <section id="story" ref={sectionRef} className="relative w-full py-20 md:py-40 overflow-hidden" style={{ background: '#050505' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Portrait — left column, sticky */}
          <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
            <div ref={imageRef} className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/about-elison.jpg"
                  alt="Elison portrait in shadow"
                  width={864}
                  height={1184}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.85)' }}
                />
              </div>
              {/* Quote card overlapping the image edge */}
              <div className="relative mt-4 ml-auto max-w-[220px] p-4 border md:absolute md:mt-0 md:-bottom-4 md:-right-2 lg:bottom-6 lg:-right-6" style={{ background: 'rgba(8,8,8,0.92)', borderColor: 'rgba(184,134,11,0.15)' }}>
                <p className="font-inter text-[10px] leading-relaxed italic" style={{ color: '#9a8a6a' }}>
                  "Every version of me had to go quiet so this one could sing."
                </p>
              </div>
            </div>
          </div>

          {/* Story — right column */}
          <div className="lg:col-span-3 space-y-0 pt-4 lg:pt-12">
            <span className="story-pull font-inter text-[10px] font-medium uppercase tracking-[0.3em] block mb-12" style={{ color: '#5a4a2a' }}>2015 - La Banda</span>

            <div className="story-pull mb-14">
              <p className="font-inter text-base sm:text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#b8a88a' }}>
                I stood in front of Ricky Martin, Laura Pausini, and Alejandro Sanz.
              </p>
              <p className="font-inter text-base sm:text-lg md:text-xl leading-[1.7] mt-3 font-light" style={{ color: '#e8e0d0' }}>
                Out of thousands, I made Top 20.
              </p>
              <p className="font-inter text-base sm:text-lg md:text-xl leading-[1.7] mt-3 font-light" style={{ color: '#e8e0d0' }}>
                I did not make Top 12.
              </p>
            </div>

            <div className="story-pull mb-14">
              <p className="font-inter text-base md:text-lg leading-[1.7] font-light" style={{ color: '#7a7060' }}>
                My bandmate won the show, joined CNCO, and went global.
              </p>
              <p className="font-inter text-base md:text-lg leading-[1.7] mt-3 font-light" style={{ color: '#e8e0d0' }}>
                I had to watch that from the outside.
              </p>
            </div>

            {/* Silence break — visual spacer */}
            <div className="py-10 flex items-center gap-4">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(184,134,11,0.15), transparent)' }} />
            </div>

            <span className="story-pull font-inter text-[10px] font-medium uppercase tracking-[0.3em] block mb-10" style={{ color: '#5a4a2a' }}>2016 — 2024</span>

            <div className="story-pull mb-14">
              <p className="font-inter text-base md:text-lg leading-[1.7] font-light" style={{ color: '#7a7060' }}>
                I released "Decisions."
              </p>
              <p className="font-inter text-base md:text-lg leading-[1.7] mt-3 font-light" style={{ color: '#7a7060' }}>
                Then things went quiet.
              </p>
              <p className="font-inter text-base md:text-lg leading-[1.7] mt-3 font-light" style={{ color: '#7a7060' }}>
                For a long time.
              </p>
            </div>

            <div className="story-pull mb-14">
              <p className="font-inter text-base sm:text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#e8e0d0' }}>
                For nearly a decade, the industry forgot my name.
              </p>
              <p className="font-inter text-base sm:text-lg md:text-xl leading-[1.7] mt-3 font-light" style={{ color: '#e8e0d0' }}>
                I kept working anyway.
              </p>
            </div>

            {/* Tension release — wider spacer with gold accent */}
            <div className="py-12 flex items-center gap-6">
              <div className="w-12 h-px" style={{ background: '#b8860b' }} />
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(184,134,11,0.2), transparent)' }} />
            </div>

            <span className="story-pull font-inter text-[10px] font-medium uppercase tracking-[0.3em] block mb-10" style={{ color: '#b8860b' }}>2025</span>

            <div className="story-pull mb-16">
              <p className="font-inter text-lg sm:text-xl md:text-2xl leading-[1.6] font-light" style={{ color: '#e8e0d0' }}>
                <em style={{ color: '#b8860b' }}>"LA PRIMERA"</em> is the return. Ten years later. Still here. Still making music between Miami and New York.
              </p>
            </div>

            <button
              type="button"
              onClick={() => document.querySelector('#music')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Jump to the music section"
              className="story-cta font-inter text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 hover:text-[#d4a853]"
              style={{ color: '#4a4030' }}
            >
              Listen now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
