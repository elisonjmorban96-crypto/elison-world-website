import { useEffect, useRef, useState } from 'react';
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
      {/* Particle Field */}
      <ParticleField className="z-0" />

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

      {/* Light Rays - appear during molecule phase */}
      {(phase === 'molecule' || phase === 'text' || phase === 'cta') && (
        <LightRays active={true} color="#b8860b" rayCount={16} />
      )}

      {/* Molecule */}
      {phase === 'molecule' || phase === 'text' || phase === 'cta' ? (
        <div 
          className="absolute inset-0 transition-all duration-[2500ms] ease-out"
          style={{
            opacity: moleculeOpacity,
            transform: `scale(${moleculeScale})`,
          }}
        >
          <MoleculeCanvas />
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
