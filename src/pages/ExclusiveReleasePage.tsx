import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Play, Pause, Volume2, VolumeX, Twitter, Link2 } from 'lucide-react';
import PageFooter from '../components/PageFooter';
import type { Release } from '../content/site';

interface ExclusiveReleasePageProps {
  release: Release;
}

const ExclusiveReleasePage = ({ release }: ExclusiveReleasePageProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const hasAudio = !!release.audioSrc;
  const hasVideo = !!release.videoSrc;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;

    const handleCanPlay = () => setAudioLoaded(true);
    const handleError = () => setAudioError(true);
    const handleStalled = () => {
      // Retry loading once if stalled
      setTimeout(() => {
        if (audio.readyState < 3) {
          audio.load();
        }
      }, 1000);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('stalled', handleStalled);

    // Force load
    audio.load();

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('stalled', handleStalled);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Ensure audio context is resumed (browser autoplay policy)
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Reset if ended
      if (audio.ended) {
        audio.currentTime = 0;
      }
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error('Audio play failed:', err);
            setAudioError(true);
            // Retry once after user interaction
            setTimeout(() => {
              audio.play().catch(() => {});
            }, 100);
          });
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <main id="main-content" tabIndex={-1} className="pt-28 md:pt-32">
      {/* Hero Section with Video Background */}
      <section className="relative overflow-hidden min-h-[60vh] md:min-h-[70vh] flex items-center">
        {/* Video Background */}
        {hasVideo && release.videoSrc ? (
          <div className="absolute inset-0 z-[1]">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              poster={release.cover}
            >
              {release.videoSrc && <source src={release.videoSrc} type="video/mp4" />}
            </video>
            <div 
              className="absolute inset-0" 
              style={{ 
                background: 'linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.6) 50%, rgba(5,5,5,0.95) 100%)' 
              }} 
            />
          </div>
        ) : null}

        {/* Fallback gradient if no video */}
        {!hasVideo && (
          <div 
            className="absolute inset-0 z-[1]" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.3) 0%, rgba(184, 134, 11, 0.2) 50%, rgba(0, 128, 128, 0.15) 100%)' 
            }} 
          />
        )}

        {/* Content */}
        <div className="relative z-[2] max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-3xl">
            {/* Exclusive Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border mb-6" style={{ borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-gold)' }} />
              <span className="font-inter text-[10px] uppercase tracking-[0.2em] font-medium">Elison's World Exclusive</span>
            </div>

            <p className="font-inter text-[11px] uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--accent-gold)' }}>
              {release.year} · {release.meta}
            </p>

            <h1 
              className="font-oswald text-4xl sm:text-5xl lg:text-7xl tracking-[0.08em] leading-[0.95] mb-6" 
              style={{ color: 'var(--text-primary)' }}
            >
              {release.title}
            </h1>

            <p 
              className="font-inter text-base sm:text-lg md:text-xl leading-[1.8] max-w-2xl mb-4" 
              style={{ color: 'var(--text-secondary)' }}
            >
              {release.exclusiveTagline}
            </p>

            <p 
              className="font-inter text-sm sm:text-base leading-[1.8] max-w-xl" 
              style={{ color: 'var(--text-tertiary)' }}
            >
              {release.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Audio Player Section */}
      <section className="py-10 md:py-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Player */}
            <div>
              <p className="scene-label mb-4">Listen</p>
              
              <div 
                className="rounded-xl border p-6 md:p-8" 
                style={{ borderColor: 'var(--text-dim)', background: 'rgba(8,8,8,0.6)' }}
              >
                {hasAudio && release.audioSrc ? (
                  <>
                    <audio ref={audioRef} src={release.audioSrc} preload="metadata" />
                    
                    <div className="flex items-center gap-4 mb-6">
                      <button
                        onClick={togglePlay}
                        disabled={!audioLoaded && !audioError}
                        className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 disabled:opacity-50"
                        style={{ background: 'var(--accent-gold)' }}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white ml-0.5" />
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <p className="font-oswald text-lg tracking-[0.05em]" style={{ color: 'var(--text-primary)' }}>
                          {release.shortTitle}
                        </p>
                        <p className="font-inter text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                          {audioLoaded ? 'Ready to play' : audioError ? 'Loading failed' : 'Loading...'}
                        </p>
                      </div>
                      
                      <button
                        onClick={toggleMute}
                        className="p-2 transition-colors duration-300 hover:text-[var(--accent-gold)]"
                        style={{ color: 'var(--text-secondary)' }}
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Progress bar visual */}
                    <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: isPlaying ? '100%' : '0%',
                          background: 'linear-gradient(to right, var(--accent-gold), rgba(184,134,11,0.5))',
                          transitionDuration: isPlaying ? 'var(--duration, 180s)' : '0.3s'
                        }}
                      />
                    </div>
                  </>
                ) : null}
                {!hasAudio && (
                  <div className="text-center py-8">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ background: 'rgba(184,134,11,0.1)', border: '1px solid rgba(184,134,11,0.2)' }}
                    >
                      <Play className="w-8 h-8" style={{ color: 'var(--accent-gold)' }} />
                    </div>
                    <p className="font-oswald text-lg tracking-[0.05em] mb-2" style={{ color: 'var(--text-primary)' }}>
                      Coming Soon
                    </p>
                    <p className="font-inter text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      This track will be available exclusively on Elison's World.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Release Notes */}
            <div>
              <p className="scene-label mb-4">Release Notes</p>
              <div className="space-y-5">
                <p className="font-inter text-sm leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
                  {release.description}
                </p>
                <p className="pull-quote text-base sm:text-lg leading-[1.8]" style={{ color: 'var(--text-primary)' }}>
                  "{release.reflection}"
                </p>
                <ul className="space-y-3">
                  {release.credits.map((credit) => (
                    <li 
                      key={credit} 
                      className="font-inter text-sm leading-relaxed" 
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {credit}
                    </li>
                  ))}
                </ul>
                <a
                  href="/epk/"
                  className="inline-flex items-center gap-2 font-inter text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 hover:text-[var(--accent-gold)]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Open EPK
                  <ExternalLink className="w-3 h-3" />
                </a>

                {/* Share */}
                <div className="mt-8 pt-6 border-t flex items-center gap-4" style={{ borderColor: 'var(--text-dim)' }}>
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-tertiary)' }}>
                    Share
                  </span>
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      const text = encodeURIComponent(`Listen to ${release.title} by Elison`);
                      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
                    }}
                    className="p-2 transition-colors duration-300 hover:text-[var(--accent-gold)]"
                    style={{ color: 'var(--text-tertiary)' }}
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    className="p-2 transition-colors duration-300 hover:text-[var(--accent-gold)]"
                    style={{ color: 'var(--text-tertiary)' }}
                    aria-label="Copy link"
                  >
                    <Link2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-10 md:py-16">
        <div className="max-w-[800px] mx-auto px-5 sm:px-6 md:px-12 text-center">
          <div 
            className="rounded-xl border p-8 md:p-12"
            style={{ 
              borderColor: 'rgba(184,134,11,0.2)', 
              background: 'linear-gradient(135deg, rgba(139,69,19,0.1) 0%, rgba(184,134,11,0.05) 100%)' 
            }}
          >
            <h2 
              className="font-oswald text-2xl sm:text-3xl md:text-4xl tracking-[0.06em] mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Join Elison's World
            </h2>
            <p className="font-inter text-sm sm:text-base leading-[1.8] mb-6 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Hear new music first, before it reaches the rest of the world.
            </p>
            <a
              href="/#connect"
              className="inline-flex items-center gap-2 px-6 py-3 font-inter text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-300 hover:brightness-110"
              style={{ background: 'var(--accent-gold)', color: 'white' }}
            >
              Subscribe for Early Access
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  );
};

export default ExclusiveReleasePage;
