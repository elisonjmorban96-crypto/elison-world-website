import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      '.video-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      '.video-subtext',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'smooth',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        delay: 0.15,
      }
    );

    gsap.fromTo(
      '.video-container',
      { scale: 0.97, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
        delay: 0.3,
      }
    );

    gsap.fromTo(
      '.play-button-main',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
        delay: 0.7,
      }
    );

    gsap.fromTo(
      '.video-info',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'smooth',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
        delay: 0.9,
      }
    );
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsPlaying(false);
    document.body.style.overflow = '';
  };

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-black overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-900/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="video-header font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-[0.05em] mb-4">
            Latest Visual
          </h2>
          <p className="video-subtext font-inter text-base md:text-lg text-white/50 max-w-xl mx-auto">
            See what words can't explain.
          </p>
        </div>

        <div className="video-container relative max-w-5xl mx-auto">
          <div
            className="relative aspect-video overflow-hidden cursor-pointer group"
            onClick={handlePlay}
          >
            {/* Use a real Elison photo as the thumbnail base */}
            <img
              src="/gallery-performance.jpg"
              alt="Midnight Confessions Video"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

            {/* Play Button */}
            <div className="play-button-main absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlay}
                className="relative w-20 h-20 md:w-24 md:h-24 bg-amber-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-amber-600"
              >
                <span className="absolute inset-0 rounded-full border-2 border-amber-400/40 animate-ripple" />
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
              </button>
            </div>

            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 text-amber-200/70 font-inter text-xs">
              4:32
            </div>
          </div>

          <div className="video-info mt-6 text-center">
            <h3 className="font-oswald text-xl md:text-2xl font-bold text-white uppercase tracking-wide mb-2">
              Midnight Confessions
            </h3>
            <p className="font-inter text-sm text-white/40">
              Official Music Video
            </p>
          </div>
        </div>
      </div>

      {isPlaying && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="w-full max-w-5xl aspect-video mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full bg-black flex flex-col items-center justify-center border border-amber-900/20">
              <Play className="w-16 h-16 text-amber-700/40 mx-auto mb-4" />
              <p className="font-inter text-white/40 text-lg">Coming Soon</p>
              <p className="font-inter text-sm text-white/25 mt-2">
                The visual for "Midnight Confessions" drops soon.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Video;
