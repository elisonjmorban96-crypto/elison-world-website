import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const Counter = ({ end, suffix = '', duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { value: 0 };
        gsap.to(obj, {
          value: end,
          duration,
          ease: 'expo.out',
          onUpdate: () => setCount(Math.floor(obj.value)),
        });
      },
    });

    return () => trigger.kill();
  }, [end, duration]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const scrollTriggers: ScrollTrigger[] = [];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      '.about-label',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'expo.out' }
    );

    tl.fromTo(
      '.about-title span',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'expo.out' },
      '-=0.2'
    );

    tl.fromTo(
      '.about-verse',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: 'smooth' },
      '-=0.2'
    );

    tl.fromTo(
      '.about-stat',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'expo.out' },
      '-=0.3'
    );

    tl.fromTo(
      image,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'expo.out' },
      0.3
    );

    // Parallax
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

  const titleWords = ['He', "Wasn't", 'Built', 'in', 'Peace'];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-black overflow-hidden"
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="relative z-10 order-2 lg:order-1">
            <span className="about-label inline-block font-inter text-xs font-semibold uppercase tracking-[0.3em] text-amber-600 mb-8">
              The Story
            </span>

            <h2 className="about-title font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-[1.1] mb-10">
              {titleWords.map((word, index) => (
                <span key={index} className="inline-block mr-3">
                  {word}
                </span>
              ))}
            </h2>

            <div className="space-y-6 mb-12">
              <p className="about-verse font-inter text-base md:text-lg text-white/60 leading-relaxed">
                He was assembled in fragments—late nights, broken plans, near-wins that cut deeper than losses. Every version of him had to die for the next one to exist. And still, he kept going. Not out of hope, but out of something more dangerous: <span className="text-amber-400/80">belief</span>.
              </p>
              <p className="about-verse font-inter text-base md:text-lg text-white/60 leading-relaxed">
                People hear him before they understand him. A voice that feels like confession… or warning. It draws you in, not because it's perfect, but because it sounds like <span className="text-amber-400/80">truth fighting to survive</span>.
              </p>
              <p className="about-verse font-inter text-base md:text-lg text-white/60 leading-relaxed">
                There's light in him, yeah—but it doesn't shine freely. It leaks out through cracks. Through pain. Through love that didn't stay. Through dreams that demanded more than he had at the time.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-4">
              <div className="about-stat">
                <div className="font-oswald text-3xl md:text-4xl font-bold text-amber-500 mb-1">
                  <Counter end={10} suffix="+" />
                </div>
                <div className="font-inter text-[10px] uppercase tracking-[0.15em] text-white/40">
                  Years of Breaking
                </div>
              </div>
              <div className="about-stat">
                <div className="font-oswald text-3xl md:text-4xl font-bold text-amber-500 mb-1">
                  <Counter end={3} />
                </div>
                <div className="font-inter text-[10px] uppercase tracking-[0.15em] text-white/40">
                  Bodies of Work
                </div>
              </div>
              <div className="about-stat">
                <div className="font-oswald text-3xl md:text-4xl font-bold text-amber-500 mb-1">
                  <Counter end={50} suffix="M+" />
                </div>
                <div className="font-inter text-[10px] uppercase tracking-[0.15em] text-white/40">
                  Souls Reached
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-amber-800/10 rounded-full blur-2xl" />

            <div
              ref={imageRef}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <img
                src="/about-elison.jpg"
                alt="Elison"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating quote */}
            <div className="absolute -bottom-6 -left-4 md:bottom-8 md:-left-8 max-w-[200px] bg-black/80 backdrop-blur-sm border border-amber-900/30 p-4">
              <p className="font-inter text-xs text-amber-200/70 italic leading-relaxed">
                "He's transformation. A man walking the line between who he was and who he's becoming."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
