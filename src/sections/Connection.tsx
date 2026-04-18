import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music2, Apple, Youtube, Instagram, Twitter, Send, Mail } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const NEWSLETTER_ENDPOINT = 'https://formspree.io/f/xqewbelg';

const Connection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => {
        gsap.set(image, { y: (self.progress - 0.5) * -40 });
      },
    });

    gsap.fromTo('.connect-title span', { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none none' },
      delay: 0.3,
    });

    gsap.fromTo('.connect-sub', { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none none' },
      delay: 0.8,
    });

    gsap.fromTo('.connect-col', { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.connect-cols', start: 'top 75%', toggleActions: 'play none none none' },
      delay: 1,
    });

    gsap.fromTo('.connect-footer', { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: '.connect-footer', start: 'top 90%', toggleActions: 'play none none none' },
    });

    return () => { st.kill(); };
  }, []);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'elisonworld.com newsletter',
        }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setSubmitState('success');
      setSubmitMessage("You're on the list.");
      setEmail('');
    } catch {
      setSubmitState('error');
      setSubmitMessage('Something went wrong. Try again or email booking@elisonworld.com.');
    }
  };

  const title = 'STAY CLOSE';

  const streamLinks = [
    { name: 'Spotify', url: 'https://open.spotify.com/artist/59g2fpjNdXZQzgQjiaHkRa', icon: Music2 },
    { name: 'Apple Music', url: 'https://music.apple.com/us/artist/elison/1810625015', icon: Apple },
    { name: 'YouTube', url: 'https://www.youtube.com/@elisonjoel', icon: Youtube },
  ];

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/elison.wav', icon: Instagram },
    { name: 'TikTok', url: 'https://www.tiktok.com/@elison.wav', icon: Music2 },
    { name: 'Twitter / X', url: 'https://www.x.com/elisonjoel', icon: Twitter },
  ];

  return (
    <section id="connect" ref={sectionRef} className="mobile-screen relative w-full flex items-center justify-center overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[115%] -top-[7%]">
        <img
          src="/gallery-rooftop.jpg"
          alt=""
          width={1344}
          height={768}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(0.8)' }}
        />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 15%, transparent 70%, var(--bg-primary) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(184,134,11,0.08) 0%, transparent 60%)' }} />

      {/* Content */}
      <div className="safe-block relative z-10 max-w-[1000px] mx-auto px-5 sm:px-6 md:px-12 py-20 md:py-24 text-center">
        <h2 className="connect-title font-oswald text-[34px] leading-[0.95] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.05em] md:tracking-[0.06em] mb-5" style={{ color: 'var(--text-primary)' }}>
          {title.split('').map((char, i) => (
            <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>
        <p className="connect-sub font-inter text-sm sm:text-base md:text-lg mb-12 md:mb-16 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          If you found me here, you are early.
        </p>

        <div className="connect-cols grid md:grid-cols-3 gap-8 md:gap-10 mb-14 md:mb-20">
          {/* Stream */}
          <div className="connect-col text-left md:text-center">
            <h3 className="font-oswald text-lg font-bold tracking-[0.1em] mb-3" style={{ color: 'var(--accent-gold)' }}>STREAM</h3>
            <p className="font-inter text-xs leading-relaxed mb-5" style={{ color: 'var(--text-tertiary)' }}>
              Start with the songs.
            </p>
            <div className="flex flex-col gap-2">
              {streamLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-inter text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 hover:text-[var(--accent-gold)]"
                  style={{ color: 'var(--text-secondary)' }}>
                  <link.icon className="w-3.5 h-3.5" /> {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Follow */}
          <div className="connect-col text-left md:text-center">
            <h3 className="font-oswald text-lg font-bold tracking-[0.1em] mb-3" style={{ color: 'var(--accent-gold)' }}>FOLLOW</h3>
            <p className="font-inter text-xs leading-relaxed mb-5" style={{ color: 'var(--text-tertiary)' }}>
              For new music, clips, and updates.
            </p>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-inter text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 hover:text-[var(--accent-gold)]"
                  style={{ color: 'var(--text-secondary)' }}>
                  <link.icon className="w-3.5 h-3.5" /> {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="connect-col text-left md:text-center">
            <h3 className="font-oswald text-lg font-bold tracking-[0.1em] mb-3" style={{ color: 'var(--accent-gold)' }}>CONNECT</h3>
            <p className="font-inter text-xs leading-relaxed mb-5" style={{ color: 'var(--text-tertiary)' }}>
              Bookings, press, collaborations, or a real note.
            </p>
            <a href="mailto:booking@elisonworld.com"
              className="inline-flex items-center gap-2 font-inter text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 hover:text-[var(--accent-gold)]"
              style={{ color: 'var(--text-secondary)' }}>
              <Mail className="w-3.5 h-3.5" /> booking@elisonworld.com
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="connect-footer max-w-md mx-auto mb-14 md:mb-16">
          <p className="font-inter text-[11px] uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--text-tertiary)' }}>
            Get updates when new music lands
          </p>
          <form
            action={NEWSLETTER_ENDPOINT}
            method="POST"
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 sm:gap-0"
          >
            <input type="hidden" name="source" value="elisonworld.com newsletter" />
            <label htmlFor="newsletter-email" className="sr-only">
              Email address for Elison updates
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              className="flex-1 px-4 py-3 bg-white/[0.03] border font-inter text-sm placeholder:text-white/20 focus:outline-none transition-colors"
              style={{ borderColor: 'var(--text-dim)', color: 'var(--text-primary)' }}
              required
            />
            <button
              type="submit"
              aria-label="Subscribe for updates from Elison"
              disabled={submitState === 'submitting'}
              className="px-5 py-3 sm:px-5 transition-colors hover:brightness-110 min-h-12 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
              style={{ background: 'var(--accent-gold)' }}
            >
              <Send className="w-4 h-4 text-white" />
              <span className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white">
                {submitState === 'submitting' ? 'Sending' : 'Join'}
              </span>
            </button>
          </form>
          {submitMessage ? (
            <p
              className="mt-3 font-inter text-xs"
              style={{ color: submitState === 'error' ? '#d4a853' : 'var(--accent-gold)' }}
              aria-live="polite"
            >
              {submitMessage}
            </p>
          ) : null}
        </div>

        {/* Footer */}
        <div className="connect-footer pt-8 border-t" style={{ borderColor: 'var(--text-dim)' }}>
          <p className="font-oswald text-2xl font-bold tracking-[0.2em] mb-2" style={{ color: 'var(--text-primary)' }}>ELISON</p>
          <p className="font-inter text-[10px] tracking-wider" style={{ color: 'var(--text-dim)' }}>
            © {new Date().getFullYear()} Elison Joel Morban · OneTime Music Inc
          </p>
        </div>
      </div>
    </section>
  );
};

export default Connection;
