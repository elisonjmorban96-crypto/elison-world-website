import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const scrollTriggers: ScrollTrigger[] = [];

    gsap.fromTo(
      image,
      { scale: 1.1, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'smooth',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    const titleChars = section.querySelectorAll('.cta-title span');
    gsap.fromTo(
      titleChars,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
        delay: 0.5,
      }
    );

    gsap.fromTo(
      '.cta-subtitle span',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: 'smooth',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
        delay: 1.2,
      }
    );

    gsap.fromTo(
      '.cta-button',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
        delay: 1.8,
      }
    );

    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(image, { y: (progress - 0.5) * 60 });
        },
      })
    );

    return () => {
      scrollTriggers.forEach((st) => st.kill());
    };
  }, []);

  const title = "HE NEVER STOPS MOVING";
  const subtitle = "Be there when the next chapter begins. Exclusive access to new music, tour dates, and the moments that don't make the highlights.";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src="/gallery-rooftop.jpg"
          alt="Elison"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Subtle warm tint */}
      <div className="absolute inset-0 bg-amber-950/20" />

      {/* Slow rotating light effect */}
      <div
        className="absolute inset-0 opacity-20 animate-spin-slow"
        style={{
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(180, 83, 9, 0.05) 15deg,
            transparent 30deg,
            transparent 180deg,
            rgba(180, 83, 9, 0.05) 195deg,
            transparent 210deg,
            transparent 360deg
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-12 text-center py-24">
        <h2 className="cta-title font-oswald text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-[0.05em] mb-6">
          {title.split('').map((char, index) => (
            <span key={index} className="inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        <p className="cta-subtitle font-inter text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          {subtitle.split(' ').map((word, index) => (
            <span key={index} className="inline-block mr-1.5">
              {word}
            </span>
          ))}
        </p>

        <a
          href="mailto:connect@elison-music.com"
          className="cta-button inline-flex items-center gap-3 px-10 py-5 bg-amber-700 text-white font-inter text-sm md:text-base font-semibold uppercase tracking-[0.15em] hover:bg-amber-600 hover:scale-105 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #b45309 0%, #92400e 100%)',
            transitionTimingFunction: 'var(--ease-spring)',
          }}
        >
          <Mail className="w-5 h-5" />
          Join the Journey
        </a>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/30">
          <a
            href="mailto:booking@elison-music.com"
            className="flex items-center gap-2 font-inter text-sm hover:text-amber-400/60 transition-colors"
          >
            booking@elison-music.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
