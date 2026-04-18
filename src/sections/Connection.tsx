import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music2, Apple, Youtube, Instagram, Twitter, Send, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Connection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 4000); }
  };

  const title = 'STAY IN THE STORY';

  const streamLinks = [
    { name: 'Spotify', url: 'https://open.spotify.com/artist/59g2fpjNdXZQzgQjiaHkRa', icon: Music2 },
    { name: 'Apple Music', url: 'https://music.apple.com/us/artist/elison/1810625015', icon: Apple },
    { name: 'YouTube', url: 'https://www.youtube.com/@elisonjoel', icon: Youtube },
  ];

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/elison.wav', icon: Instagram },
    { name: 'TikTok', url: 'https://www.tiktok.com/elison.wav', icon: Music2 },
    { name: 'Twitter / X', url: 'https://www.x.com/elisonjoel', icon: Twitter },
  ];

  return (
    <section id="connect" ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[115%] -top-[7%]">
        <img src="/gallery-rooftop.jpg" alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.35) saturate(0.8)' }} />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 15%, transparent 70%, var(--bg-primary) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(184,134,11,0.08) 0%, transparent 60%)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-12 py-24 text-center">
        <h2 className="connect-title font-oswald text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.06em] mb-5" style={{ color: 'var(--text-primary)' }}>
          {title.split('').map((char, i) => (
            <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>
        <p className="connect-sub font-inter text-base md:text-lg mb-16 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          If you found me here, you are early. Stay close.
        </p>

        <div className="connect-cols grid md:grid-cols-3 gap-8 md:gap-10 mb-20">
          {/* Stream */}
          <div className="connect-col text-left md:text-center">
            <h3 className="font-oswald text-lg font-bold tracking-[0.1em] mb-3" style={{ color: 'var(--accent-gold)' }}>STREAM</h3>
            <p className="font-inter text-xs leading-relaxed mb-5" style={{ color: 'var(--text-tertiary)' }}>
              Start with the songs. That is where I leave fingerprints.
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
              If you want the next scene before the lights come up, stay near me.
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
              Bookings, press, collaborations, or a real note. Knock.
            </p>
            <a href="mailto:booking@elison-music.com"
              className="inline-flex items-center gap-2 font-inter text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 hover:text-[var(--accent-gold)]"
              style={{ color: 'var(--text-secondary)' }}>
              <Mail className="w-3.5 h-3.5" /> booking@elison-music.com
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="connect-footer max-w-md mx-auto mb-16">
          <p className="font-inter text-[11px] uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--text-tertiary)' }}>
            Get the next chapter before the world does
          </p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-white/[0.03] border font-inter text-sm placeholder:text-white/20 focus:outline-none transition-colors"
              style={{ borderColor: 'var(--text-dim)', color: 'var(--text-primary)' }}
              required
            />
            <button type="submit" className="px-4 py-3 transition-colors hover:brightness-110" style={{ background: 'var(--accent-gold)' }}>
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
          {subscribed && (
            <p className="mt-3 font-inter text-xs" style={{ color: 'var(--accent-gold)' }}>
              You are in. I will find you when it moves.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="connect-footer pt-8 border-t" style={{ borderColor: 'var(--text-dim)' }}>
          <p className="font-oswald text-2xl font-bold tracking-[0.2em] mb-2" style={{ color: 'var(--text-primary)' }}>ELISON</p>
          <p className="font-inter text-[10px] tracking-wider" style={{ color: 'var(--text-dim)' }}>
            © 2025 Elison Joel Morban · OneTime Music Inc
          </p>
        </div>
      </div>
    </section>
  );
};

export default Connection;
