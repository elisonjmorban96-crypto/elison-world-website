import { useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import SubpageNavigation from './components/SubpageNavigation';
import Hero from './sections/Hero';
import Story from './sections/Story';
import Music from './sections/Music';
import Gallery from './sections/Gallery';
import Connection from './sections/Connection';
import ReleasePage from './pages/ReleasePage';
import EpkPage from './pages/EpkPage';
import { releaseBySlug } from './content/site';
import { prefersReducedMotion } from './lib/motion';
import { normalizePathname } from './lib/routing';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

interface AppProps {
  initialPath?: string;
}

function App({ initialPath = '/' }: AppProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const route = normalizePathname(initialPath);
  const isHomePage = route === '/';

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

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
  }, [isHomePage]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const host = window.location.hostname;
      setAnalyticsEnabled(host === 'elisonworld.com' || host.endsWith('.vercel.app'));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative" style={{ background: 'var(--bg-primary)' }}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {isHomePage ? <Navigation /> : <SubpageNavigation />}

      {isHomePage ? <div ref={progressRef} className="scene-progress" aria-hidden="true" /> : null}

      {/* Film grain overlay */}
      <div className="film-grain" aria-hidden="true" />

      {route === '/' ? (
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Story />
          <Music />
          <Gallery />
          <Connection />
        </main>
      ) : null}
      {route === '/la-primera/' ? <ReleasePage release={releaseBySlug['la-primera']} /> : null}
      {route === '/decisions/' ? <ReleasePage release={releaseBySlug.decisions} /> : null}
      {route === '/epk/' ? <EpkPage /> : null}
      {analyticsEnabled ? <Analytics /> : null}
    </div>
  );
}

export default App;
