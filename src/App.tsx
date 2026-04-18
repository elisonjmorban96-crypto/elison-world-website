import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Story from './sections/Story';
import Music from './sections/Music';
import Gallery from './sections/Gallery';
import Connection from './sections/Connection';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      <Navigation />

      {/* Scene progress line */}
      <div ref={progressRef} className="scene-progress" />

      {/* Film grain overlay */}
      <div className="film-grain" />

      <main>
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
