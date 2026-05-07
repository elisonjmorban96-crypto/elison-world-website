import { useEffect, useRef, useState, useCallback } from 'react';
import ParticleField from '../components/ParticleField';
import MoleculeCanvas from '../components/MoleculeCanvas';
import LightRays from '../components/LightRays';
import { ArrowDown } from 'lucide-react';

interface Fragment {
  id: number;
  text: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  delay: number;
}

const fragments: Fragment[] = [
  { id: 1, text: 'a voice', x: 15, y: 25, opacity: 0, scale: 0.8, delay: 0 },
  { id: 2, text: 'a prayer', x: 75, y: 20, opacity: 0, scale: 0.8, delay: 0.8 },
  { id: 3, text: 'a scar', x: 20, y: 60, opacity: 0, scale: 0.8, delay: 1.6 },
  { id: 4, text: 'a city', x: 70, y: 55, opacity: 0, scale: 0.8, delay: 2.4 },
  { id: 5, text: 'a woman', x: 45, y: 75, opacity: 0, scale: 0.8, delay: 3.2 },
  { id: 6, text: 'a dream', x: 80, y: 80, opacity: 0, scale: 0.8, delay: 4.0 },
];

interface HeroState {
  phase: 'black' | 'fragments' | 'connecting' | 'molecule' | 'text' | 'cta';
  fragmentStates: Fragment[];
  moleculeOpacity: number;
  moleculeScale: number;
  textOpacity: number;
  ctaOpacity: number;
}

export default function HeroSequence() {
  const [state, setState] = useState<HeroState>({
    phase: 'black',
    fragmentStates: fragments,
    moleculeOpacity: 0,
    moleculeScale: 0.5,
    textOpacity: 0,
    ctaOpacity: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, phase: 'fragments' }));
    }, 300);
    timersRef.current.push(timer);
    return () => clearAllTimers();
  }, [clearAllTimers]);

  useEffect(() => {
    if (state.phase !== 'fragments') return;

    fragments.forEach((fragment, index) => {
      const timer = setTimeout(() => {
        setState(prev => ({
          ...prev,
          fragmentStates: prev.fragmentStates.map((f, i) => 
            i === index ? { ...f, opacity: 1, scale: 1 } : f
          ),
        }));
        
        if (index === fragments.length - 1) {
          const t = setTimeout(() => {
            setState(prev => ({ ...prev, phase: 'connecting' }));
          }, 1200);
          timersRef.current.push(t);
        }
      }, fragment.delay * 1000);
      timersRef.current.push(timer);
    });

    return () => clearAllTimers();
  }, [state.phase, clearAllTimers]);

  useEffect(() => {
    if (state.phase !== 'connecting') return;

    setState(prev => ({
      ...prev,
      fragmentStates: prev.fragmentStates.map(f => ({
        ...f,
        x: 50,
        y: 50,
        opacity: 0,
        scale: 0.5,
      })),
    }));

    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, phase: 'molecule' }));
    }, 1500);
    timersRef.current.push(timer);

    return () => clearAllTimers();
  }, [state.phase, clearAllTimers]);

  useEffect(() => {
    if (state.phase !== 'molecule') return;

    setState(prev => ({
      ...prev,
      moleculeOpacity: 1,
      moleculeScale: 1,
    }));

    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, phase: 'text' }));
    }, 2000);
    timersRef.current.push(timer);

    return () => clearAllTimers();
  }, [state.phase, clearAllTimers]);

  useEffect(() => {
    if (state.phase !== 'text') return;

    setState(prev => ({ ...prev, textOpacity: 1 }));

    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, phase: 'cta' }));
    }, 2500);
    timersRef.current.push(timer);

    return () => clearAllTimers();
  }, [state.phase, clearAllTimers]);

  useEffect(() => {
    if (state.phase !== 'cta') return;

    setState(prev => ({ ...prev, ctaOpacity: 1 }));
  }, [state.phase]);

  const handleEnter = useCallback(() => {
    // Force scroll past the fixed hero
    document.body.style.overflow = 'auto';
    window.scrollTo({ top: window.innerHeight + 100, behavior: 'smooth' });
    
    // Fallback: scroll to main content
    setTimeout(() => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center"
      style={{ background: '#050505' }}
    >
      {/* Particle Field */}
      <ParticleField className="z-0" />

      {/* Fragments */}
      {state.phase === 'fragments' || state.phase === 'connecting' ? (
        <div className="absolute inset-0">
          {state.fragmentStates.map((fragment) => (
            <div
              key={fragment.id}
              className="absolute font-inter text-sm tracking-[0.2em] uppercase transition-all duration-[2000ms] ease-out"
              style={{
                left: `${fragment.x}%`,
                top: `${fragment.y}%`,
                transform: `translate(-50%, -50%) scale(${fragment.scale})`,
                opacity: fragment.opacity,
                color: 'rgba(184, 134, 11, 0.6)',
              }}
            >
              {fragment.text}
            </div>
          ))}
        </div>
      ) : null}

      {/* Light Rays - appear during molecule phase */}
      {(state.phase === 'molecule' || state.phase === 'text' || state.phase === 'cta') && (
        <LightRays active={true} color="#b8860b" rayCount={16} />
      )}

      {/* Molecule */}
      {state.phase === 'molecule' || state.phase === 'text' || state.phase === 'cta' ? (
        <div 
          className="absolute inset-0 transition-all duration-[2500ms] ease-out"
          style={{
            opacity: state.moleculeOpacity,
            transform: `scale(${state.moleculeScale})`,
          }}
        >
          <MoleculeCanvas />
        </div>
      ) : null}

      {/* Core Text */}
      {state.phase === 'text' || state.phase === 'cta' ? (
        <div 
          className="relative z-10 text-center px-6 transition-opacity duration-[2000ms]"
          style={{ opacity: state.textOpacity }}
        >
          <h1 className="font-oswald text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.08em] leading-[1.4] mb-4" style={{ color: 'var(--text-primary)' }}>
            Nothing was random.
          </h1>
          <h1 className="font-oswald text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.08em] leading-[1.4]" style={{ color: 'var(--text-primary)' }}>
            It was all connected.
          </h1>
        </div>
      ) : null}

      {/* CTA */}
      {state.phase === 'cta' && (
        <div 
          className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center gap-4 transition-opacity duration-[1500ms]"
          style={{ opacity: state.ctaOpacity }}
        >
          <button
            onClick={handleEnter}
            className="group flex flex-col items-center gap-2 cursor-pointer"
            aria-label="Enter the world"
          >
            <span className="font-inter text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--accent-gold)' }}>
              Enter the World
            </span>
            <ArrowDown className="w-5 h-5 animate-bounce" style={{ color: 'var(--accent-gold)' }} />
          </button>
          <span className="font-inter text-[10px] tracking-[0.15em] uppercase mt-2" style={{ color: 'var(--text-tertiary)' }}>
            Scroll to explore
          </span>
        </div>
      )}
    </section>
  );
}
