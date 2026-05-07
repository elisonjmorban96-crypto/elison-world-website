import { useEffect, useRef, useState } from 'react';
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

export default function HeroSequence() {
  const [phase, setPhase] = useState<'black' | 'fragments' | 'connecting' | 'molecule' | 'text' | 'cta'>('black');
  const [fragmentStates, setFragmentStates] = useState<Fragment[]>(fragments);
  const [moleculeOpacity, setMoleculeOpacity] = useState(0);
  const [moleculeScale, setMoleculeScale] = useState(0.5);
  const [textOpacity, setTextOpacity] = useState(0);
  const [ctaOpacity, setCtaOpacity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setPhase('fragments'), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== 'fragments') return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    fragments.forEach((fragment, index) => {
      const timer = setTimeout(() => {
        setFragmentStates(prev => prev.map((f, i) => 
          i === index ? { ...f, opacity: 1, scale: 1 } : f
        ));
        
        if (index === fragments.length - 1) {
          setTimeout(() => setPhase('connecting'), 1200);
        }
      }, fragment.delay * 1000);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'connecting') return;

    // Fragments drift to center
    setFragmentStates(prev => prev.map(f => ({
      ...f,
      x: 50,
      y: 50,
      opacity: 0,
      scale: 0.5,
    })));

    const timer = setTimeout(() => setPhase('molecule'), 2000);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'molecule') return;

    setMoleculeOpacity(1);
    setMoleculeScale(1);

    const timer = setTimeout(() => setPhase('text'), 2500);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'text') return;

    setTextOpacity(1);

    const timer = setTimeout(() => setPhase('cta'), 3000);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'cta') return;

    setCtaOpacity(1);
  }, [phase]);

  const handleEnter = () => {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: '#050505' }}
    >
      {/* Fragments */}
      {phase === 'fragments' || phase === 'connecting' ? (
        <div className="absolute inset-0">
          {fragmentStates.map((fragment) => (
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

      {/* Molecule */}
      {phase === 'molecule' || phase === 'text' || phase === 'cta' ? (
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-[2500ms] ease-out"
          style={{
            opacity: moleculeOpacity,
            transform: `scale(${moleculeScale})`,
          }}
        >
          <MoleculeSVG />
        </div>
      ) : null}

      {/* Core Text */}
      {phase === 'text' || phase === 'cta' ? (
        <div 
          className="relative z-10 text-center px-6 transition-opacity duration-[2000ms]"
          style={{ opacity: textOpacity }}
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
      {phase === 'cta' ? (
        <div 
          className="absolute bottom-12 left-0 right-0 text-center transition-opacity duration-[2000ms]"
          style={{ opacity: ctaOpacity }}
        >
          <button
            onClick={handleEnter}
            className="group inline-flex flex-col items-center gap-3 font-inter text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:opacity-80"
            style={{ color: 'var(--accent-gold)' }}
          >
            <span>Enter Elison's World</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      ) : null}
    </section>
  );
}

function MoleculeSVG() {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      className="animate-pulse-slow"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8860b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#daa520" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      
      {/* Central hexagon */}
      <polygon 
        points="100,40 140,60 140,100 100,120 60,100 60,60" 
        fill="none" 
        stroke="url(#goldGradient)" 
        strokeWidth="1"
        opacity="0.6"
      />
      
      {/* Connected hexagons */}
      <polygon 
        points="100,20 120,30 120,50 100,60 80,50 80,30" 
        fill="none" 
        stroke="rgba(184,134,11,0.3)" 
        strokeWidth="0.5"
      />
      <polygon 
        points="140,40 160,50 160,70 140,80 120,70 120,50" 
        fill="none" 
        stroke="rgba(184,134,11,0.3)" 
        strokeWidth="0.5"
      />
      <polygon 
        points="140,80 160,90 160,110 140,120 120,110 120,90" 
        fill="none" 
        stroke="rgba(184,134,11,0.3)" 
        strokeWidth="0.5"
      />
      <polygon 
        points="100,100 120,110 120,130 100,140 80,130 80,110" 
        fill="none" 
        stroke="rgba(184,134,11,0.3)" 
        strokeWidth="0.5"
      />
      <polygon 
        points="60,80 80,90 80,110 60,120 40,110 40,90" 
        fill="none" 
        stroke="rgba(184,134,11,0.3)" 
        strokeWidth="0.5"
      />
      <polygon 
        points="60,40 80,50 80,70 60,80 40,70 40,50" 
        fill="none" 
        stroke="rgba(184,134,11,0.3)" 
        strokeWidth="0.5"
      />
      
      {/* Connection lines */}
      <line x1="100" y1="60" x2="100" y2="40" stroke="rgba(184,134,11,0.2)" strokeWidth="0.5" />
      <line x1="120" y1="70" x2="140" y2="60" stroke="rgba(184,134,11,0.2)" strokeWidth="0.5" />
      <line x1="120" y1="90" x2="140" y2="80" stroke="rgba(184,134,11,0.2)" strokeWidth="0.5" />
      <line x1="100" y1="100" x2="100" y2="120" stroke="rgba(184,134,11,0.2)" strokeWidth="0.5" />
      <line x1="80" y1="90" x2="60" y2="80" stroke="rgba(184,134,11,0.2)" strokeWidth="0.5" />
      <line x1="80" y1="70" x2="60" y2="60" stroke="rgba(184,134,11,0.2)" strokeWidth="0.5" />
    </svg>
  );
}
