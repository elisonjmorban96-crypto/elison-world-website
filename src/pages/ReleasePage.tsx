import { Apple, ExternalLink, Music2, Youtube } from 'lucide-react';
import PageFooter from '../components/PageFooter';
import type { Release } from '../content/site';

interface ReleasePageProps {
  release: Release;
}

const ReleasePage = ({ release }: ReleasePageProps) => {
  const links = [
    { name: 'Apple Music', url: release.appleUrl, icon: Apple },
    { name: 'Spotify', url: release.spotifyUrl, icon: Music2 },
    ...(release.youtubeUrl ? [{ name: 'YouTube', url: release.youtubeUrl, icon: Youtube }] : []),
  ];

  return (
    <main id="main-content" tabIndex={-1} className="pt-28 md:pt-32">
      <section className="relative overflow-hidden py-14 md:py-24">
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at top right, rgba(184,134,11,0.18), transparent 45%)' }} />
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20 relative">
          <p className="scene-label mb-5">Official Release Page</p>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <div className="max-w-[440px]">
              <div className="overflow-hidden border border-white/10">
                <img
                  src={release.cover}
                  alt={`${release.title} cover art`}
                  width={1024}
                  height={1024}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div>
              <p className="font-inter text-[11px] uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--accent-gold)' }}>
                {release.year} · {release.meta}
              </p>
              <h1 className="font-oswald text-4xl sm:text-5xl lg:text-6xl tracking-[0.08em] leading-[0.95]" style={{ color: 'var(--text-primary)' }}>
                {release.title}
              </h1>
              <p className="font-inter text-base sm:text-lg leading-[1.8] mt-6 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                {release.summary}
              </p>
              <p className="pull-quote text-base sm:text-lg leading-[1.8] mt-6 max-w-2xl" style={{ color: 'var(--text-primary)' }}>
                “{release.reflection}”
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 border text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-300 hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
                    style={{ borderColor: 'var(--text-dim)', color: 'var(--text-secondary)' }}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="scene-label mb-4">Listen</p>
            <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--text-dim)' }}>
              <iframe
                title={`${release.title} Apple Music player`}
                src={release.embedUrl}
                loading="lazy"
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                style={{ width: '100%', height: '450px', border: 0, background: 'transparent' }}
              />
            </div>
          </div>

          <div>
            <p className="scene-label mb-4">Release Notes</p>
            <div className="space-y-5">
              <p className="font-inter text-sm leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
                {release.description}
              </p>
              <ul className="space-y-3">
                {release.credits.map((credit) => (
                  <li key={credit} className="font-inter text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
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
            </div>
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  );
};

export default ReleasePage;
