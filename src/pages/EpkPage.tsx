import { ExternalLink } from 'lucide-react';
import PageFooter from '../components/PageFooter';
import { bookingEmail, releases, socialLinks, streamLinks } from '../content/site';

const bullets = [
  'Dominican Latin R&B artist.',
  'La Banda Season 1 Top 20 in 2015.',
  'Did not make the Top 12.',
  'Released "Decisions" in 2016.',
  'Returned with "LA PRIMERA" in 2025.',
  'Based between Miami and New York.',
];

const EpkPage = () => {
  return (
    <main id="main-content" tabIndex={-1} className="pt-28 md:pt-32">
      <section className="py-14 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at top right, rgba(184,134,11,0.18), transparent 45%)' }} />
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20 relative">
          <p className="scene-label mb-4">Official EPK</p>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="overflow-hidden border border-white/10 max-w-[460px]">
              <img
                src="/hero-elison.jpg"
                alt="Elison portrait"
                width={1344}
                height={768}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="font-oswald text-4xl sm:text-5xl lg:text-6xl tracking-[0.08em] leading-[0.95]" style={{ color: 'var(--text-primary)' }}>
                Elison EPK
              </h1>
              <p className="font-inter text-base sm:text-lg leading-[1.8] mt-6 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                Elison Joel Morban is a Dominican Latin R&B artist building between Miami and New York. This page is the clean reference for press, collaborators, promoters, and booking inquiries.
              </p>
              <p className="pull-quote text-base sm:text-lg leading-[1.8] mt-6 max-w-2xl" style={{ color: 'var(--text-primary)' }}>
                “The story is not that I almost made it. The story is that I kept going after it went quiet.”
              </p>
              <a
                href={`mailto:${bookingEmail}`}
                className="inline-flex items-center gap-2 mt-8 font-inter text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 hover:text-[var(--accent-gold)]"
                style={{ color: 'var(--text-primary)' }}
              >
                Contact for booking or press
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="scene-label mb-4">Artist Facts</p>
            <ul className="space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="font-inter text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="scene-label mb-4">Short Bio</p>
            <div className="space-y-4">
              <p className="font-inter text-sm sm:text-base leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
                Elison came through La Banda in 2015, reached the Top 20, and missed the Top 12. The public version of the story kept moving without him. One bandmate won the show and went on to global visibility through CNCO.
              </p>
              <p className="font-inter text-sm sm:text-base leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
                In 2016 he released “Decisions.” Then the gap. Then the work nobody saw. “LA PRIMERA” marks the return and the sound of the current chapter.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="scene-label mb-4">Releases</p>
            <div className="space-y-6">
              {releases.map((release) => (
                <article key={release.slug} className="border border-white/10 p-5">
                  <p className="font-inter text-[11px] uppercase tracking-[0.16em] mb-2" style={{ color: 'var(--accent-gold)' }}>
                    {release.year}
                  </p>
                  <h2 className="font-oswald text-2xl tracking-[0.08em]" style={{ color: 'var(--text-primary)' }}>
                    {release.title}
                  </h2>
                  <p className="font-inter text-sm leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>
                    {release.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <a href={release.path} className="font-inter text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-primary)' }}>
                      Release page
                    </a>
                    <a href={release.appleUrl} target="_blank" rel="noopener noreferrer" className="font-inter text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-secondary)' }}>
                      Apple Music
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="scene-label mb-4">Official Links</p>
            <div className="space-y-6">
              <div>
                <h2 className="font-oswald text-2xl tracking-[0.08em] mb-3" style={{ color: 'var(--text-primary)' }}>
                  Streaming
                </h2>
                <div className="flex flex-wrap gap-4">
                  {streamLinks.map((link) => (
                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="font-inter text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-secondary)' }}>
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-oswald text-2xl tracking-[0.08em] mb-3" style={{ color: 'var(--text-primary)' }}>
                  Social
                </h2>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link) => (
                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="font-inter text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-secondary)' }}>
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-oswald text-2xl tracking-[0.08em] mb-3" style={{ color: 'var(--text-primary)' }}>
                  Booking
                </h2>
                <a href={`mailto:${bookingEmail}`} className="font-inter text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {bookingEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  );
};

export default EpkPage;
