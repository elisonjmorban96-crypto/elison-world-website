import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Youtube, Music2, Apple, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.fromTo(
      '.footer-logo',
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      '.footer-tagline',
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'smooth',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        delay: 0.1,
      }
    );

    gsap.fromTo(
      '.footer-link',
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'smooth',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        delay: 0.2,
      }
    );

    gsap.fromTo(
      '.footer-contact',
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'smooth',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        delay: 0.4,
      }
    );

    gsap.fromTo(
      '.footer-newsletter',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        delay: 0.5,
      }
    );

    gsap.fromTo(
      '.social-icon',
      { scale: 0 },
      {
        scale: 1,
        duration: 0.3,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        delay: 0.6,
      }
    );
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Story', href: '#about' },
    { name: 'Music', href: '#discography' },
    { name: 'Shows', href: '#events' },
    { name: 'Frames', href: '#gallery' },
    { name: 'Connect', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Music2, href: 'https://open.spotify.com/artist/59g2fpjNdXZQzgQjiaHkRa', label: 'Spotify', color: 'hover:text-[#1DB954]' },
    { icon: Apple, href: 'https://music.apple.com/us/artist/elison/1810625015', label: 'Apple Music', color: 'hover:text-[#FA57C1]' },
    { icon: Youtube, href: 'https://www.youtube.com/@elisonjoel', label: 'YouTube', color: 'hover:text-[#FF0000]' },
    { icon: Instagram, href: 'https://www.instagram.com/elison.wav', label: 'Instagram', color: 'hover:text-[#E4405F]' },
    { icon: Twitter, href: 'https://www.x.com/elisonjoel', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black border-t border-amber-900/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="footer-logo inline-block font-oswald text-3xl font-bold tracking-[0.2em] text-white mb-4"
            >
              ELISON
            </a>
            <p className="footer-tagline font-inter text-sm text-white/30 italic">
              "Maybe that's why he never stops moving."
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="footer-link font-inter text-sm text-white/40 hover:text-amber-400 hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-6">
              Reach Out
            </h4>
            <div className="footer-contact space-y-3">
              <a
                href="mailto:booking@elison-music.com"
                className="block font-inter text-sm text-white/40 hover:text-amber-400 transition-colors"
              >
                booking@elison-music.com
              </a>
              <a
                href="mailto:management@elison-music.com"
                className="block font-inter text-sm text-white/40 hover:text-amber-400 transition-colors"
              >
                management@elison-music.com
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-6">
              Stay in the Loop
            </h4>
            <form onSubmit={handleSubscribe} className="footer-newsletter">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-white/[0.03] border border-white/10 text-white font-inter text-sm placeholder:text-white/25 focus:outline-none focus:border-amber-800/50 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-amber-800 text-amber-100 hover:bg-amber-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {isSubscribed && (
                <p className="mt-2 font-inter text-xs text-amber-500/70">
                  You're in. Welcome to the journey.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Social Bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`social-icon w-10 h-10 flex items-center justify-center bg-white/[0.03] border border-white/5 text-white/40 ${social.color} hover:scale-110 transition-all duration-200`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="font-inter text-[11px] text-white/25">
                © 2025 Elison. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="font-inter text-[11px] text-white/25 hover:text-white/50 transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="font-inter text-[11px] text-white/25 hover:text-white/50 transition-colors"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
