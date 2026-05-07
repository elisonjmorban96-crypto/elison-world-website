import { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { useWorld } from '../WorldContext';
import { useAudioManager } from '../AudioManager';
import { useParticles } from '../useParticles';
import PostcardSignup from './PostcardSignup';

interface InteractiveObjectProps {
  id: string;
  x: string;
  y: string;
  revealedContent: {
    lyric?: string;
    message?: string;
    soundName: string;
  };
  fragmentId: string;
  onInteract: (id: string, fragmentId: string) => void;
  children: React.ReactNode;
}

const InteractiveObject = ({ 
  id, x, y, revealedContent, fragmentId, onInteract, children 
}: InteractiveObjectProps) => {
  const { hasDiscovered } = useWorld();
  const [isHovered, setIsHovered] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const isDiscovered = hasDiscovered(id);

  const handleClick = () => {
    if (!isDiscovered) {
      onInteract(id, fragmentId);
      setShowReveal(true);
      setTimeout(() => setShowReveal(false), 4000);
    } else {
      setShowReveal(true);
      setTimeout(() => setShowReveal(false), 3000);
    }
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y, zIndex: 20 }}
    >
      {/* Revealed content bubble */}
      {showReveal && (
        <div 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-52 p-3 rounded-lg text-center animate-in fade-in slide-in-from-bottom-2 duration-500"
          style={{ 
            background: 'rgba(8, 16, 16, 0.95)', 
            border: '1px solid rgba(212, 168, 83, 0.25)',
            backdropFilter: 'blur(10px)',
            zIndex: 50,
          }}
        >
          {revealedContent.lyric && (
            <p className="font-inter text-xs italic leading-relaxed mb-1" style={{ color: '#D4A853' }}>
              "{revealedContent.lyric}"
            </p>
          )}
          {revealedContent.message && (
            <p className="font-inter text-[10px] uppercase tracking-wider" style={{ color: '#6A5A4A' }}>
              {revealedContent.message}
            </p>
          )}
          <div className="mt-2 flex items-center justify-center gap-1">
            <Music className="w-3 h-3" style={{ color: '#4A3A2A' }} />
            <span className="font-inter text-[9px]" style={{ color: '#4A3A2A' }}>
              {revealedContent.soundName}
            </span>
          </div>
        </div>
      )}

      {/* Object container */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-all duration-700"
        style={{
          transform: isHovered ? 'scale(1.15) translateY(-6px)' : 'scale(1)',
          filter: isDiscovered 
            ? 'drop-shadow(0 0 25px rgba(212, 168, 83, 0.6))' 
            : 'drop-shadow(0 0 12px rgba(212, 168, 83, 0.2))',
          cursor: 'pointer',
        }}
        aria-label={`Discover ${id}`}
      >
        {/* Idle float animation */}
        <div 
          className="absolute inset-0 animate-float"
          style={{ animationDelay: `${Math.random() * 3}s`, animationDuration: '5s' }}
        >
          {children}
        </div>

        {/* Discovered glow ring */}
        {isDiscovered && (
          <div 
            className="absolute inset-0 rounded-full animate-pulse-glow"
            style={{
              background: 'radial-gradient(circle, rgba(212, 168, 83, 0.2) 0%, transparent 70%)',
            }}
          />
        )}
      </button>
    </div>
  );
};

const UnlockHeart = ({ onUnlock, isReady }: { onUnlock: () => void; isReady: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: 25 }}
    >
      <button
        onClick={isReady ? onUnlock : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transition-all duration-1000"
        style={{
          transform: isHovered && isReady ? 'scale(1.2)' : 'scale(1)',
          cursor: isReady ? 'pointer' : 'default',
          filter: isReady 
            ? 'drop-shadow(0 0 40px rgba(232, 106, 51, 0.8))' 
            : 'drop-shadow(0 0 15px rgba(100, 100, 100, 0.3))',
        }}
        aria-label={isReady ? "Unlock the song" : "Heart locked"}
      >
        {/* Heart SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <radialGradient id="heartGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor={isReady ? '#E86A33' : '#2A1A0A'} />
              <stop offset="50%" stopColor={isReady ? '#D4A853' : '#1A0A0A'} />
              <stop offset="100%" stopColor={isReady ? '#8B6914' : '#0A0A0A'} />
            </radialGradient>
            <filter id="heartGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Main heart shape */}
          <path
            d="M50 85 C50 85, 20 60, 20 40 C20 25, 30 15, 42 15 C48 15, 50 20, 50 20 C50 20, 52 15, 58 15 C70 15, 80 25, 80 40 C80 60, 50 85, 50 85Z"
            fill="url(#heartGrad)"
            stroke={isReady ? '#E86A33' : '#3A2A1A'}
            strokeWidth="1.5"
            filter={isReady ? 'url(#heartGlow)' : undefined}
          />
          
          {/* Crack lines when locked */}
          {!isReady && (
            <>
              <path d="M35 35 L42 42 L38 48" stroke="#4A3A2A" strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M65 38 L58 45 L62 52" stroke="#4A3A2A" strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M50 25 L48 32 L52 38" stroke="#4A3A2A" strokeWidth="1" fill="none" opacity="0.5" />
            </>
          )}
          
          {/* Lock icon when locked */}
          {!isReady && (
            <g transform="translate(42, 38)">
              <rect x="4" y="8" width="12" height="10" rx="2" fill="#4A3A2A" opacity="0.8" />
              <path d="M6 8 V5 A4 4 0 0 1 14 5 V8" stroke="#4A3A2A" strokeWidth="2" fill="none" opacity="0.8" />
            </g>
          )}
          
          {/* Glow ring when ready */}
          {isReady && (
            <circle cx="50" cy="50" r="45" fill="none" stroke="#E86A33" strokeWidth="0.5" opacity="0.3">
              <animate attributeName="r" values="42;48;42" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>

        {/* Pulse animation when ready */}
        {isReady && (
          <div className="absolute inset-0 animate-pulse-slow">
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(232, 106, 51, 0.15) 0%, transparent 70%)',
              }}
            />
          </div>
        )}
      </button>

      {/* Unlock text */}
      {isReady && (
        <p 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-inter text-[10px] uppercase tracking-[0.2em] whitespace-nowrap animate-pulse"
          style={{ color: '#E86A33' }}
        >
          Touch to Unlock
        </p>
      )}
    </div>
  );
};

const UnlockModal = ({ onClose }: { onClose: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/dejame-perderme.mp3');
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(6, 13, 13, 0.95)', backdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-md w-full text-center space-y-8">
        {/* Phoenix reveal */}
        <div className="relative w-48 h-48 mx-auto">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="phoenixGrad" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="#E86A33" />
                <stop offset="40%" stopColor="#D4A853" />
                <stop offset="100%" stopColor="#8B6914" />
              </radialGradient>
            </defs>
            
            {/* Phoenix wings */}
            <path
              d="M50 70 Q20 50 10 30 Q15 45 30 55 Q20 50 15 40 Q25 55 40 60"
              fill="url(#phoenixGrad)"
              opacity="0.9"
            />
            <path
              d="M50 70 Q80 50 90 30 Q85 45 70 55 Q80 50 85 40 Q75 55 60 60"
              fill="url(#phoenixGrad)"
              opacity="0.9"
            />
            
            {/* Phoenix body */}
            <path
              d="M50 75 Q45 60 50 45 Q55 60 50 75"
              fill="#E86A33"
            />
            
            {/* Flame wisps */}
            <path d="M30 55 Q25 45 28 35" stroke="#E86A33" strokeWidth="1" fill="none" opacity="0.6">
              <animate attributeName="d" values="M30 55 Q25 45 28 35;M30 55 Q22 40 25 30;M30 55 Q25 45 28 35" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M70 55 Q75 45 72 35" stroke="#E86A33" strokeWidth="1" fill="none" opacity="0.6">
              <animate attributeName="d" values="M70 55 Q75 45 72 35;M70 55 Q78 40 75 30;M70 55 Q75 45 72 35" dur="2.5s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        <div className="space-y-4">
          <h2 
            className="font-oswald text-2xl md:text-3xl tracking-[0.1em]"
            style={{ color: '#D4A853' }}
          >
            The Phoenix Rises
          </h2>
          <p className="font-inter text-sm leading-relaxed" style={{ color: '#8A7A6A' }}>
            You have found all the fragments. The song is yours.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handlePlay}
            className="w-full px-6 py-3 font-inter text-[11px] uppercase tracking-[0.12em] transition-all hover:brightness-110 flex items-center justify-center gap-2"
            style={{ background: '#E86A33', color: 'white' }}
          >
            <Music className="w-4 h-4" />
            Play Déjame Perderme
          </button>
          
          {isPlaying && (
            <div className="flex items-center justify-center gap-1 h-6">
              {[0, 0.2, 0.4, 0.1, 0.3].map((delay, i) => (
                <div 
                  key={i}
                  className="w-1 bg-[#E86A33] animate-pulse"
                  style={{ 
                    height: `${20 + Math.random() * 30}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: '0.8s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={onClose}
          className="font-inter text-[11px] uppercase tracking-[0.12em] hover:text-[#D4A853] transition-colors"
          style={{ color: '#5A4A3A' }}
        >
          Keep Exploring
        </button>
      </div>
    </div>
  );
};

const Clearing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { discoverObject, hasDiscovered, unlock } = useWorld();
  const [showUnlock, setShowUnlock] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const { playFragment, startAmbient, setMuted } = useAudioManager({
    ambientSrc: '/audio/ambient-clearing.mp3',
    fragments: {
      feather: '/audio/fragment-vocal.mp3',
      shell: '/audio/fragment-bass.mp3',
      mask: '/audio/fragment-percussion.mp3',
      key: '/audio/fragment-synth.mp3',
    },
  });

  const { spawnParticles } = useParticles(canvasRef, true);

  useEffect(() => {
    startAmbient();
  }, [startAmbient]);

  const handleObjectClick = (id: string, fragmentId: string) => {
    if (!hasDiscovered(id)) {
      discoverObject(id);
      playFragment(fragmentId);
      spawnParticles(50, 50, 15, '#D4A853');
    }
  };

  const handleUnlock = () => {
    unlock();
    setShowUnlock(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setMuted(!isMuted);
  };

  const allDiscovered = ['feather', 'shell', 'mask', 'key'].every(id => hasDiscovered(id));

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ background: '#060D0D' }}>
      {/* ===== SKY LAYERS ===== */}
      
      {/* Base sky - deep navy to teal */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #0A1628 0%, #0F2A3A 40%, #0A3A3A 70%, #061414 100%)'
      }} />

      {/* Subtle nebula/moon haze */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 opacity-30" style={{
        background: 'radial-gradient(ellipse at 70% 30%, rgba(200, 180, 140, 0.08) 0%, transparent 60%)'
      }} />

      {/* ===== STARS ===== */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => {
          const size = Math.random() * 2 + 0.5;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size + 'px',
                height: size + 'px',
                background: i % 3 === 0 ? '#D4A853' : i % 3 === 1 ? '#8AA0B0' : '#C0C8D0',
                top: Math.random() * 55 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.1,
                animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          );
        })}
      </div>

      {/* ===== MOON ===== */}
      <div className="absolute top-12 right-16 md:top-16 md:right-24">
        <div 
          className="w-12 h-12 md:w-16 md:h-16 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(240, 230, 200, 0.3) 0%, rgba(200, 180, 140, 0.1) 50%, transparent 70%)',
            boxShadow: '0 0 40px rgba(200, 180, 140, 0.15), 0 0 80px rgba(200, 180, 140, 0.05)',
          }}
        />
      </div>

      {/* ===== HORIZON / OCEAN ===== */}
      
      {/* Distant ocean shimmer */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-20" style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(10, 120, 120, 0.3) 0%, rgba(10, 60, 60, 0.1) 40%, transparent 70%)'
      }} />

      {/* Warm sunset remnants at horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 opacity-25" style={{
        background: 'linear-gradient(to top, rgba(200, 140, 80, 0.15) 0%, rgba(180, 120, 60, 0.08) 30%, transparent 70%)'
      }} />

      {/* ===== MIDGROUND - RUINS & STONES ===== */}

      {/* Broken stone arch left */}
      <div 
        className="absolute bottom-32 left-8 md:left-16 opacity-10"
        style={{
          width: '80px',
          height: '100px',
          background: 'linear-gradient(180deg, rgba(60, 50, 40, 0.3) 0%, transparent 100%)',
          clipPath: 'polygon(30% 0%, 35% 15%, 25% 30%, 30% 50%, 20% 70%, 25% 100%, 0% 100%, 0% 0%)',
        }}
      />

      {/* Fallen pillar right */}
      <div 
        className="absolute bottom-28 right-6 md:right-12 opacity-8"
        style={{
          width: '60px',
          height: '80px',
          background: 'linear-gradient(90deg, rgba(50, 45, 35, 0.25), transparent)',
          transform: 'rotate(15deg)',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Small stone fragments */}
      <div className="absolute bottom-24 left-1/4 w-4 h-3 opacity-10 rounded-sm" style={{ background: '#3A3028' }} />
      <div className="absolute bottom-20 right-1/3 w-3 h-4 opacity-8 rounded-sm" style={{ background: '#2A2018' }} />

      {/* ===== SACRED CIRCLE - where relics live ===== */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 83, 0.1) 0%, rgba(10, 60, 60, 0.15) 40%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 opacity-10"
        style={{
          border: '1px solid rgba(212, 168, 83, 0.15)',
          borderRadius: '50%',
        }}
      />

      {/* ===== PALM SILHOUETTES ===== */}

      {/* Left palm - tall */}
      <div className="absolute bottom-0 left-0 w-48 h-[50vh] opacity-15">
        <svg viewBox="0 0 100 200" className="w-full h-full" preserveAspectRatio="none">
          <path d="M50 200 L48 180 Q30 150 20 120 Q15 100 25 80 Q20 60 30 40 Q35 25 40 15" 
            stroke="#080808" strokeWidth="3" fill="none"/>
          <path d="M48 160 Q60 140 75 130 Q85 125 80 120" stroke="#080808" strokeWidth="2" fill="none"/>
          <path d="M46 140 Q30 125 15 115 Q10 110 20 105" stroke="#080808" strokeWidth="1.5" fill="none"/>
          <path d="M47 120 Q55 105 70 95 Q75 90 65 85" stroke="#080808" strokeWidth="1.5" fill="none"/>
          <path d="M49 100 Q35 85 25 75 Q20 70 30 65" stroke="#080808" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* Right palm - leaning */}
      <div className="absolute bottom-0 right-0 w-56 h-[45vh] opacity-12">
        <svg viewBox="0 0 100 200" className="w-full h-full" preserveAspectRatio="none">
          <path d="M60 200 L62 185 Q80 160 90 130 Q95 110 85 90 Q90 70 80 50 Q75 35 70 20" 
            stroke="#080808" strokeWidth="3" fill="none"/>
          <path d="M63 170 Q50 150 35 140 Q25 135 30 130" stroke="#080808" strokeWidth="2" fill="none"/>
          <path d="M65 145 Q80 130 90 120 Q95 115 85 110" stroke="#080808" strokeWidth="1.5" fill="none"/>
          <path d="M64 125 Q55 110 45 100 Q40 95 50 90" stroke="#080808" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>

      {/* Small left palm */}
      <div className="absolute bottom-0 left-[15%] w-32 h-[35vh] opacity-10">
        <svg viewBox="0 0 100 200" className="w-full h-full" preserveAspectRatio="none">
          <path d="M50 200 L49 185 Q35 160 30 140 Q28 125 35 110 Q32 95 38 80 Q40 70 42 60" 
            stroke="#080808" strokeWidth="2" fill="none"/>
          <path d="M49 165 Q60 150 70 140" stroke="#080808" strokeWidth="1" fill="none"/>
          <path d="M48 145 Q38 130 28 120" stroke="#080808" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* Large tropical leaves - left */}
      <div className="absolute bottom-0 left-0 w-40 h-48 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M10 100 Q20 60 15 30 Q18 40 30 45 Q25 55 20 70 Q18 85 15 100" fill="#080808"/>
          <path d="M25 100 Q35 70 30 40 Q33 50 45 55 Q40 65 35 80 Q32 90 30 100" fill="#080808"/>
        </svg>
      </div>

      {/* Large tropical leaves - right */}
      <div className="absolute bottom-0 right-0 w-44 h-52 opacity-8">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M90 100 Q80 60 85 25 Q82 35 70 40 Q75 50 80 65 Q82 80 85 100" fill="#080808"/>
          <path d="M75 100 Q65 70 70 35 Q67 45 55 50 Q60 60 65 75 Q68 85 70 100" fill="#080808"/>
        </svg>
      </div>

      {/* ===== MIST & FOG ===== */}

      {/* Low mist layer */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-20" style={{
        background: 'linear-gradient(to top, rgba(10, 40, 40, 0.15), transparent)'
      }} />

      {/* Second mist layer */}
      <div className="absolute bottom-0 left-0 right-0 h-24 opacity-15" style={{
        background: 'linear-gradient(to top, rgba(20, 50, 50, 0.1), transparent)'
      }} />

      {/* Ground fog wisps */}
      <div className="absolute bottom-16 left-1/4 w-32 h-8 opacity-10 rounded-full blur-xl" style={{ background: '#0A3A3A' }} />
      <div className="absolute bottom-20 right-1/4 w-40 h-6 opacity-8 rounded-full blur-xl" style={{ background: '#0A2A2A' }} />

      {/* ===== FIREFLY PARTICLES ===== */}

      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* ===== AMBIENT GLOW OVERLAY ===== */}

      {/* Soft gold ambient from center */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 83, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Minimal header */}
        <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-start">
          <div>
            <p className="font-inter text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: '#4A3A2A' }}>
              Elison's World
            </p>
            <h1 className="font-oswald text-sm tracking-[0.15em]" style={{ color: '#6A5A4A' }}>
              ROOM 001: THE CLEARING
            </h1>
          </div>
          <button 
            onClick={toggleMute} 
            className="p-2 rounded-full transition-colors hover:bg-white/5"
            style={{ color: '#4A3A2A' }}
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Room subtitle */}
        <div className="text-center mb-6 mt-24">
          <p className="font-inter text-xs max-w-xs mx-auto leading-relaxed italic" style={{ color: '#5A4A3A' }}>
            "Something is hidden here. Tap the relics. Listen closely."
          </p>
        </div>

        {/* Interactive room */}
        <div className="relative w-full max-w-lg aspect-square max-h-[55vh]">
          
          {/* Broken Phoenix Feather */}
          <InteractiveObject
            id="feather"
            x="28%"
            y="22%"
            revealedContent={{
              lyric: "She don't need a map...",
              soundName: 'Chorus Vocal',
            }}
            fragmentId="feather"
            onInteract={handleObjectClick}
          >
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <defs>
                <linearGradient id="featherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#E8D5A3" />
                  <stop offset="100%" stopColor="#C4A052" />
                </linearGradient>
              </defs>
              {/* Main feather shape */}
              <path 
                d="M30 55 Q25 45 20 35 Q18 25 22 18 Q25 12 30 8 Q35 12 38 18 Q42 25 40 35 Q35 45 30 55Z" 
                fill="url(#featherGrad)"
                opacity="0.9"
              />
              {/* Feather barb lines */}
              <path d="M30 50 Q25 40 22 30" stroke="#B88A0A" strokeWidth="0.5" fill="none" opacity="0.5"/>
              <path d="M30 45 Q35 35 38 25" stroke="#B88A0A" strokeWidth="0.5" fill="none" opacity="0.5"/>
              <path d="M30 40 Q26 32 24 25" stroke="#B88A0A" strokeWidth="0.5" fill="none" opacity="0.5"/>
              <path d="M30 35 Q34 28 36 22" stroke="#B88A0A" strokeWidth="0.5" fill="none" opacity="0.5"/>
              {/* Crack line */}
              <path d="M28 30 L32 32 L30 36" stroke="#4A3A2A" strokeWidth="1" fill="none" opacity="0.7"/>
              <path d="M30 36 L28 40" stroke="#4A3A2A" strokeWidth="0.5" fill="none" opacity="0.5"/>
              {/* Glowing tip */}
              <circle cx="30" cy="8" r="3" fill="#FFD700" opacity="0.6">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </InteractiveObject>

          {/* Glowing Shell */}
          <InteractiveObject
            id="shell"
            x="74%"
            y="26%"
            revealedContent={{
              lyric: 'She makes love feel like home...',
              soundName: 'Sub-bass + Dembow',
            }}
            fragmentId="shell"
            onInteract={handleObjectClick}
          >
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <defs>
                <linearGradient id="shellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E5E5" />
                  <stop offset="50%" stopColor="#00AAAA" />
                  <stop offset="100%" stopColor="#006666" />
                </linearGradient>
              </defs>
              {/* Spiral shell */}
              <path 
                d="M30 50 Q20 45 18 35 Q16 25 22 18 Q28 12 35 15 Q42 18 40 25 Q38 32 32 30 Q28 28 30 24 Q32 20 35 22" 
                fill="none"
                stroke="url(#shellGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Shell body */}
              <path 
                d="M30 50 Q25 48 22 42 Q20 35 24 28 Q28 22 35 20 Q42 22 44 30 Q46 38 40 45 Q36 50 30 50Z" 
                fill="url(#shellGrad)"
                opacity="0.7"
              />
              {/* Inner glow */}
              <circle cx="32" cy="32" r="8" fill="#00E5E5" opacity="0.2">
                <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Texture dots */}
              <circle cx="28" cy="38" r="1" fill="#00AAAA" opacity="0.6"/>
              <circle cx="34" cy="36" r="1" fill="#00AAAA" opacity="0.6"/>
              <circle cx="30" cy="42" r="0.8" fill="#00AAAA" opacity="0.5"/>
            </svg>
          </InteractiveObject>

          {/* Gold Mask */}
          <InteractiveObject
            id="mask"
            x="22%"
            y="72%"
            revealedContent={{
              lyric: 'No sé qué tiene pero se siente real...',
              soundName: 'Verse 1',
            }}
            fragmentId="mask"
            onInteract={handleObjectClick}
          >
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <defs>
                <linearGradient id="maskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4A853" />
                  <stop offset="50%" stopColor="#B88A0A" />
                  <stop offset="100%" stopColor="#8B6914" />
                </linearGradient>
              </defs>
              {/* Mask face */}
              <path 
                d="M15 20 Q15 15 20 12 Q30 8 40 12 Q45 15 45 20 Q45 35 40 45 Q35 52 30 52 Q25 52 20 45 Q15 35 15 20Z" 
                fill="url(#maskGrad)"
                opacity="0.85"
              />
              {/* Eye holes */}
              <ellipse cx="24" cy="28" rx="4" ry="3" fill="#0A0A0A" opacity="0.7"/>
              <ellipse cx="36" cy="28" rx="4" ry="3" fill="#0A0A0A" opacity="0.7"/>
              {/* Eye glow */}
              <circle cx="24" cy="28" r="2" fill="#E86A33" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="36" cy="28" r="2" fill="#E86A33" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" />
              </circle>
              {/* Nose ridge */}
              <path d="M30 32 L28 38 L30 40 L32 38 Z" fill="#B88A0A" opacity="0.6"/>
              {/* Mouth line - mysterious smile */}
              <path d="M25 44 Q30 47 35 44" stroke="#6B5014" strokeWidth="1" fill="none" opacity="0.6"/>
              {/* Forehead ornament */}
              <path d="M30 12 L28 8 L30 6 L32 8 Z" fill="#D4A853" opacity="0.8"/>
              {/* Cheek markings */}
              <path d="M18 35 L22 33" stroke="#6B5014" strokeWidth="0.5" opacity="0.4"/>
              <path d="M42 35 L38 33" stroke="#6B5014" strokeWidth="0.5" opacity="0.4"/>
            </svg>
          </InteractiveObject>

          {/* Floating Key */}
          <InteractiveObject
            id="key"
            x="78%"
            y="68%"
            revealedContent={{
              lyric: 'Let me get lost where she goes...',
              soundName: 'Bridge',
            }}
            fragmentId="key"
            onInteract={handleObjectClick}
          >
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <defs>
                <linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C4A0C4" />
                  <stop offset="50%" stopColor="#7A5A7A" />
                  <stop offset="100%" stopColor="#4A3A4A" />
                </linearGradient>
              </defs>
              {/* Key bow (top) */}
              <circle cx="30" cy="18" r="10" fill="none" stroke="url(#keyGrad)" strokeWidth="2.5" opacity="0.9"/>
              <circle cx="30" cy="18" r="4" fill="url(#keyGrad)" opacity="0.7"/>
              {/* Key shaft */}
              <rect x="28" y="28" width="4" height="22" rx="1" fill="url(#keyGrad)" opacity="0.85"/>
              {/* Key bitting (teeth) */}
              <path d="M32 40 L38 40 L38 42 L35 42 L35 44 L38 44 L38 46 L32 46Z" fill="url(#keyGrad)" opacity="0.8"/>
              {/* Glow aura */}
              <circle cx="30" cy="30" r="18" fill="#C4A0C4" opacity="0.08">
                <animate attributeName="opacity" values="0.05;0.15;0.05" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Sparkle accents */}
              <path d="M20 15 L20 12 M18 13.5 L22 13.5" stroke="#D4A0D4" strokeWidth="0.8" opacity="0.5">
                <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M42 20 L42 17 M40 18.5 L44 18.5" stroke="#D4A0D4" strokeWidth="0.8" opacity="0.5">
                <animate attributeName="opacity" values="0;0.6;0" dur="2.5s" repeatCount="indefinite" />
              </path>
            </svg>
          </InteractiveObject>

          {/* Cracked Heart - Center */}
          <UnlockHeart onUnlock={handleUnlock} isReady={allDiscovered} />
        </div>

        {/* Progress dots */}
        <div className="flex gap-3 mt-8 mb-4">
          {['feather', 'shell', 'mask', 'key'].map((id) => (
            <div
              key={id}
              className="w-2 h-2 rounded-full transition-all duration-500"
              style={{
                background: hasDiscovered(id) ? '#D4A853' : '#2A1A0A',
                boxShadow: hasDiscovered(id) ? '0 0 8px rgba(212, 168, 83, 0.5)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Postcard signup */}
        <div className="mt-4 w-full max-w-sm">
          <PostcardSignup />
        </div>
      </div>

      {/* Unlock modal */}
      {showUnlock && <UnlockModal onClose={() => setShowUnlock(false)} />}
    </div>
  );
};

export default Clearing;
