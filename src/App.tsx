import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Story from './sections/Story';
import Music from './sections/Music';
import Gallery from './sections/Gallery';
import Connection from './sections/Connection';
import { prefersReducedMotion } from './lib/motion';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    ScrollTrigger.refresh();

    // Scene progress line
    const progress = progressRef.current;
    if (progress) {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          progress.style.height = `${self.progress * 100}%`;
        },
      });
    }

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative" style={{ background: 'var(--bg-primary)' }}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Navigation />

      {/* Scene progress line */}
      <div ref={progressRef} className="scene-progress" aria-hidden="true" />

      {/* Film grain overlay */}
      <div className="film-grain" aria-hidden="true" />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Story />
        <Music />
        <Gallery />
        <Connection />
      </main>
    </div>
  );
}

export default App;
