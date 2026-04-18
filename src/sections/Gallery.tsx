import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { id: 1, src: '/elison-portrait-1.webp', alt: 'Elison portrait with direct gaze', span: 'sm:col-span-2 sm:row-span-2', width: 1024, height: 1536 },
  { id: 2, src: '/gallery-performance.jpg', alt: 'Elison performing on stage', span: 'sm:col-span-2', width: 1344, height: 768 },
  { id: 3, src: '/elison-portrait-2.jpg', alt: 'Elison portrait in warm light', span: '', width: 1920, height: 1080 },
  { id: 4, src: '/gallery-studio.jpg', alt: 'Elison in the recording studio', span: '', width: 1248, height: 832 },
  { id: 5, src: '/gallery-closeup.jpg', alt: 'Close-up portrait of Elison', span: '', width: 1024, height: 1024 },
  { id: 6, src: '/gallery-rooftop.jpg', alt: 'Elison on a rooftop at night', span: 'sm:col-span-2', width: 1344, height: 768 },
  { id: 7, src: '/gallery-intimate.jpg', alt: 'Elison with a guitar in an intimate setting', span: 'sm:row-span-2', width: 864, height: 1184 },
  { id: 8, src: '/gallery-street.jpg', alt: 'Elison walking at night in the city', span: 'sm:col-span-2', width: 1248, height: 832 },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo('.gallery-header', { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
    });

    gsap.fromTo('.gallery-item', { scale: 0.96, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery-grid', start: 'top 75%', toggleActions: 'play none none none' },
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  const open = (idx: number) => { setCurrentIdx(idx); setLightboxOpen(true); };
  const close = () => { setLightboxOpen(false); };
  const next = () => setCurrentIdx((p) => (p + 1) % galleryImages.length);
  const prev = () => setCurrentIdx((p) => (p - 1 + galleryImages.length) % galleryImages.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen]);

  return (
    <section id="gallery" ref={sectionRef} className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20">
        <span className="scene-label block mb-4">What The Light Kept</span>
        <h2 className="gallery-header font-oswald text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.06em] mb-12" style={{ color: 'var(--text-primary)' }}>
          IN FRAMES
        </h2>

        <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[240px] sm:auto-rows-[180px] md:auto-rows-[220px]">
          {galleryImages.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              className={`gallery-item relative overflow-hidden cursor-pointer group ${img.span}`}
              onClick={() => open(idx)}
              aria-haspopup="dialog"
            >
              <span className="sr-only">{`Open gallery image ${idx + 1}: ${img.alt}`}</span>
              <img
                src={img.src}
                alt=""
                width={img.width}
                height={img.height}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.85)' }}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {(img.span?.includes('row-span') || img.span?.includes('col-span-2')) && (
                <div className="absolute bottom-3 left-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-400">
                  <span className="font-inter text-[10px] uppercase tracking-wider" style={{ color: 'var(--accent-gold-light)' }}>{img.alt}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(5,5,5,0.96)', backdropFilter: 'blur(20px)' }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={galleryImages[currentIdx].alt}
        >
          <button type="button" onClick={close} aria-label="Close gallery image" className="absolute top-4 right-4 md:top-6 md:right-6 p-2 transition-colors z-10" style={{ color: 'var(--text-tertiary)' }}>
            <X className="w-6 h-6" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous gallery image" className="absolute left-2 md:left-6 p-2.5 md:p-3 rounded-full transition-all hover:bg-white/5" style={{ color: 'var(--text-tertiary)' }}>
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next gallery image" className="absolute right-2 md:right-6 p-2.5 md:p-3 rounded-full transition-all hover:bg-white/5" style={{ color: 'var(--text-tertiary)' }}>
            <ChevronRight className="w-7 h-7" />
          </button>
          <div className="max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[currentIdx].src}
              alt={galleryImages[currentIdx].alt}
              width={galleryImages[currentIdx].width}
              height={galleryImages[currentIdx].height}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-inter text-[11px] tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            {currentIdx + 1} / {galleryImages.length} — {galleryImages[currentIdx].alt}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
