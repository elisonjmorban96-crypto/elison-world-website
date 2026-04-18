import { ExternalLink, Mail } from 'lucide-react';
import { bookingEmail, socialLinks, streamLinks } from '../content/site';

const footerLinks = [
  ...streamLinks.map((link) => ({ name: link.name, url: link.url })),
  ...socialLinks.map((link) => ({ name: link.name, url: link.url })),
];

const PageFooter = () => {
  return (
    <footer className="border-t border-white/10 py-12 mt-20">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="scene-label mb-4">Stay Close</p>
            <h2 className="font-oswald text-3xl sm:text-4xl tracking-[0.08em] mb-4" style={{ color: 'var(--text-primary)' }}>
              Official Links And Contact
            </h2>
            <p className="font-inter text-sm sm:text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              For bookings, press, collaborations, or direct artist links, use the official channels below.
            </p>
          </div>

          <a
            href={`mailto:${bookingEmail}`}
            className="inline-flex items-center gap-2 justify-start md:justify-end font-inter text-sm uppercase tracking-[0.12em] transition-colors duration-300 hover:text-[var(--accent-gold)]"
            style={{ color: 'var(--text-primary)' }}
          >
            <Mail className="w-4 h-4" />
            {bookingEmail}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-5 gap-y-4">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-inter text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 hover:text-[var(--accent-gold)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.name}
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>

        <p className="font-inter text-[10px] tracking-wider mt-10" style={{ color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} Elison Joel Morban · OneTime Music Inc
        </p>
      </div>
    </footer>
  );
};

export default PageFooter;
