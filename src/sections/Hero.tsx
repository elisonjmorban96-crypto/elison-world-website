import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const section = sectionRef.current;
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!section || !image || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: Array<{ x: number; y: number; size: number; speedY: number; speedX: number; opacity: number; phase: number }> = [];
    let animId: number;

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const count = window.innerWidth < 768 ? 15 : 35;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.2 + 0.2,
          speedY: -Math.random() * 0.12 - 0.02,
          speedX: (Math.random() - 0.5) * 0.06,
          opacity: Math.random() * 0.25 + 0.04,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.speedY; p.x += p.speedX; p.phase += 0.012;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        const flicker = Math.sin(p.phase) * 0.12 + 0.88;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 140, 60, ${p.opacity * flicker})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };

    initCanvas();
    animate();
    window.addEventListener('resize', initCanvas);

    // Opening sequence — slow, deliberate, like a film title card
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(image, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out' });
    tl.fromTo('.hero-label', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.8');

    document.querySelectorAll('.hero-line-1 .hero-word').forEach((word, i) => {
      tl.fromTo(word, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 1.0 + i * 0.12);
    });

    document.querySelectorAll('.hero-line-2 .hero-word').forEach((word, i) => {
      tl.fromTo(word, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 1.5 + i * 0.12);
    });

    tl.fromTo('.hero-sub', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.1');
    tl.fromTo('.hero-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'none' }, '+=0.4');

    // Scroll parallax — image drifts up, content fades out
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '60% top',
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(image, { y: p * -50, scale: 1 + p * 0.015 });
        gsap.set('.hero-content', { opacity: 1 - p * 2.2 });
      },
    });

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', initCanvas); st.kill(); };
  }, []);

  return (
    <section id="home" ref={sectionRef} className="mobile-screen relative w-full overflow-hidden" style={{ background: '#050505' }}>
      <canvas ref={canvasRef} className="absolute inset-0 z-[3] pointer-events-none" aria-hidden="true" />
      <div ref={imageRef} className="absolute inset-0 z-[1]">
        <img src="/hero-elison.jpg" alt="Elison portrait in dramatic stage lighting" className="w-full h-full object-cover object-top" />
      </div>
      <div className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(to right, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.45) 50%, transparent 100%)' }} />
      <div className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(to top, #050505 0%, transparent 30%)' }} />
      <div className="absolute inset-0 z-[2]" style={{ background: 'radial-gradient(ellipse 60% 55% at 30% 50%, transparent 0%, rgba(5,5,5,0.35) 100%)' }} />

      <div className="hero-content safe-block relative z-[4] min-h-[100svh] flex flex-col justify-end px-5 pb-14 pt-28 sm:px-6 sm:pb-16 md:min-h-[100svh] md:px-12 md:pb-28 lg:justify-center lg:pt-20 lg:pb-8 lg:px-20 max-w-[1400px] mx-auto">
        <span className="hero-label font-inter text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.3em] mb-6 sm:mb-8 max-w-[16rem]" style={{ color: '#7a6a4a' }}>Elison Joel Morban · Latin R&B</span>

        <h1 className="font-oswald text-[42px] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[105px] font-bold tracking-[0.04em] sm:tracking-[0.06em] leading-[0.92]" style={{ perspective: '500px' }}>
          <span className="hero-line-1 block">
            <span className="hero-word inline-block mr-2.5 sm:mr-3 md:mr-4" style={{ color: '#e8e0d0' }}>LEFT</span>
            <span className="hero-word inline-block mr-2.5 sm:mr-3 md:mr-4" style={{ color: '#e8e0d0' }}>OUT.</span>
          </span>
          <span className="hero-line-2 block mt-0.5 sm:mt-1 md:mt-2">
            <span className="hero-word inline-block mr-2.5 sm:mr-3 md:mr-4" style={{ color: '#b8860b' }}>STILL</span>
            <span className="hero-word inline-block" style={{ color: '#b8860b' }}>SINGING.</span>
          </span>
        </h1>

        <p className="hero-sub font-inter text-[13px] sm:text-sm md:text-base font-light tracking-[0.02em] mt-6 sm:mt-8 md:mt-10 max-w-[18rem] sm:max-w-md" style={{ color: '#7a7060' }}>
          Dominican. Independent. New music out now.
        </p>

        <div className="hero-scroll-hint hidden md:flex mt-auto md:mt-16 pt-12 md:pt-0 items-center gap-3" aria-hidden="true">
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #b8860b, transparent)' }} />
          <span className="font-inter text-[9px] uppercase tracking-[0.25em]" style={{ color: '#4a4030' }}>Scroll</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 z-[5]" style={{ background: 'linear-gradient(to top, #050505, transparent)' }} />
    </section>
  );
};

export default Hero;
