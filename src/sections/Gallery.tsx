import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { id: 1, src: '/elison-portrait-1.jpg', alt: 'The Gaze', span: 'col-span-2 row-span-2' },
  { id: 2, src: '/gallery-performance.jpg', alt: 'On Stage', span: 'col-span-2' },
  { id: 3, src: '/elison-portrait-2.jpg', alt: 'In the Light', span: '' },
  { id: 4, src: '/gallery-studio.jpg', alt: 'The Studio', span: '' },
  { id: 5, src: '/gallery-closeup.jpg', alt: 'Close Up', span: '' },
  { id: 6, src: '/gallery-rooftop.jpg', alt: 'City Lights', span: 'col-span-2' },
  { id: 7, src: '/gallery-intimate.jpg', alt: 'With the Guitar', span: 'row-span-2' },
  { id: 8, src: '/gallery-street.jpg', alt: 'Night Walk', span: 'col-span-2' },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
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

  const open = (idx: number) => { setCurrentIdx(idx); setLightboxOpen(true); document.body.style.overflow = 'hidden'; };
  const close = () => { setLightboxOpen(false); document.body.style.overflow = ''; };
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
    <section id="gallery" ref={sectionRef} className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <span className="scene-label block mb-4">What The Light Kept</span>
        <h2 className="gallery-header font-oswald text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.06em] mb-12" style={{ color: 'var(--text-primary)' }}>
          IN FRAMES
        </h2>

        <div className="gallery-grid grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {galleryImages.map((img, idx) => (
            <div
              key={img.id}
              className={`gallery-item relative overflow-hidden cursor-pointer group ${img.span}`}
              onClick={() => open(idx)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.85)' }}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {(img.span?.includes('row-span') || img.span?.includes('col-span-2')) && (
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span className="font-inter text-[10px] uppercase tracking-wider" style={{ color: 'var(--accent-gold-light)' }}>{img.alt}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(5,5,5,0.96)', backdropFilter: 'blur(20px)' }} onClick={close}>
          <button onClick={close} className="absolute top-6 right-6 p-2 transition-colors z-10" style={{ color: 'var(--text-tertiary)' }}>
            <X className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-6 p-3 rounded-full transition-all hover:bg-white/5" style={{ color: 'var(--text-tertiary)' }}>
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-6 p-3 rounded-full transition-all hover:bg-white/5" style={{ color: 'var(--text-tertiary)' }}>
            <ChevronRight className="w-7 h-7" />
          </button>
          <div className="max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[currentIdx].src} alt={galleryImages[currentIdx].alt} className="max-w-full max-h-[85vh] object-contain" />
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
