import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Users, Send, Lock, Unlock } from 'lucide-react';

interface Fragment {
  id: string;
  author: string;
  location: string;
  story: string;
  date: string;
  approved: boolean;
}

const mockFragments: Fragment[] = [
  {
    id: '1',
    author: 'Maya',
    location: 'Miami',
    story: 'I met someone at 3 AM in a diner. We talked until sunrise. Never saw them again. But that conversation changed how I listen to music forever.',
    date: '2026-04-15',
    approved: true,
  },
  {
    id: '2',
    author: 'Jonas',
    location: 'Berlin',
    story: 'The scar on my left hand is from a guitar string that snapped while I was learning Déjame Perderme. Now every time I play, I remember — pain is just the price of becoming.',
    date: '2026-04-22',
    approved: true,
  },
  {
    id: '3',
    author: 'Sofia',
    location: 'Santo Domingo',
    story: 'My grandmother used to sing while cooking. I thought she was just making noise. Now I realize she was praying. Every meal was a ceremony.',
    date: '2026-05-01',
    approved: true,
  },
];

const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState<'clearing' | 'fragments'>('clearing');
  const [fragmentCount, setFragmentCount] = useState(mockFragments.length);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newFragment, setNewFragment] = useState({ author: '', location: '', story: '' });
  const [fragments, setFragments] = useState<Fragment[]>(mockFragments);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setFragmentCount(fragments.length);
  }, [fragments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFragment.author || !newFragment.story) return;
    
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      const fragment: Fragment = {
        id: String(Date.now()),
        author: newFragment.author,
        location: newFragment.location || 'Unknown',
        story: newFragment.story,
        date: new Date().toISOString().split('T')[0],
        approved: false,
      };
      setFragments([fragment, ...fragments]);
      setNewFragment({ author: '', location: '', story: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="community" className="relative w-full py-20 md:py-32 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background molecule */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 200 200">
          <polygon points="100,40 140,60 140,100 100,120 60,100 60,60" fill="none" stroke="#b8860b" strokeWidth="0.5" />
          <polygon points="100,20 120,30 120,50 100,60 80,50 80,30" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="0.3" />
          <polygon points="140,40 160,50 160,70 140,80 120,70 120,50" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="0.3" />
          <polygon points="140,80 160,90 160,110 140,120 120,110 120,90" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="0.3" />
          <polygon points="100,100 120,110 120,130 100,140 80,130 80,110" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="0.3" />
          <polygon points="60,80 80,90 80,110 60,120 40,110 40,90" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="0.3" />
          <polygon points="60,40 80,50 80,70 60,80 40,70 40,50" fill="none" stroke="rgba(184,134,11,0.3)" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <MessageCircle className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
          <span className="font-inter text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--accent-gold)' }}>
            The Clearing
          </span>
        </div>

        <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.06em] mb-6" style={{ color: 'var(--text-primary)' }}>
          ENTER THE WORLD
        </h2>

        <p className="font-inter text-base sm:text-lg leading-[1.8] mb-12 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          This is where the fragments come together. Where strangers recognize each other. 
          Where nothing was random becomes everything was connected.
        </p>

        {/* Stats Bar */}
        <div className="flex items-center gap-6 mb-12 pb-8 border-b" style={{ borderColor: 'var(--text-dim)' }}>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
            <span className="font-inter text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-oswald text-lg" style={{ color: 'var(--accent-gold)' }}>{fragmentCount}</span> fragments shared
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
            <span className="font-inter text-sm" style={{ color: 'var(--text-tertiary)' }}>
              <span className="font-oswald text-lg" style={{ color: 'var(--accent-gold)' }}>3</span> rooms unlocked
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-12">
          <button
            onClick={() => setActiveTab('clearing')}
            className="font-inter text-[11px] uppercase tracking-[0.2em] pb-2 transition-all duration-300"
            style={{ 
              color: activeTab === 'clearing' ? 'var(--accent-gold)' : 'var(--text-tertiary)',
              borderBottom: activeTab === 'clearing' ? '2px solid var(--accent-gold)' : '2px solid transparent'
            }}
          >
            Live Clearing
          </button>
          <button
            onClick={() => setActiveTab('fragments')}
            className="font-inter text-[11px] uppercase tracking-[0.2em] pb-2 transition-all duration-300"
            style={{ 
              color: activeTab === 'fragments' ? 'var(--accent-gold)' : 'var(--text-tertiary)',
              borderBottom: activeTab === 'fragments' ? '2px solid var(--accent-gold)' : '2px solid transparent'
            }}
          >
            Your Fragments
          </button>
        </div>

        {/* Live Clearing Tab */}
        {activeTab === 'clearing' && (
          <div className="grid lg:grid-cols-[1fr_0.4fr] gap-8">
            {/* Discord Widget */}
            <div 
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: 'var(--text-dim)', background: 'rgba(8,8,8,0.6)', minHeight: '500px' }}
            >
              <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--text-dim)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#43b581' }} />
                  <span className="font-inter text-sm" style={{ color: 'var(--text-primary)' }}>
                    The Clearing — Live
                  </span>
                </div>
                <a 
                  href="https://discord.gg/clawd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-[10px] uppercase tracking-[0.15em] transition-colors hover:text-[var(--accent-gold)]"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  Open in Discord →
                </a>
              </div>
              <iframe
                ref={iframeRef}
                src="https://discord.com/widget?id=1502104667566375123&theme=dark"
                width="100%"
                height="450"
                title="Discord The Clearing"
                className="w-full"
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div 
                className="rounded-xl border p-6"
                style={{ borderColor: 'var(--text-dim)', background: 'rgba(8,8,8,0.6)' }}
              >
                <h3 className="font-oswald text-lg tracking-[0.05em] mb-3" style={{ color: 'var(--text-primary)' }}>
                  How to Enter
                </h3>
                <ol className="space-y-3 font-inter text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex gap-3">
                    <span className="font-oswald text-xs" style={{ color: 'var(--accent-gold)' }}>01</span>
                    Join the Discord — link above
                  </li>
                  <li className="flex gap-3">
                    <span className="font-oswald text-xs" style={{ color: 'var(--accent-gold)' }}>02</span>
                    Introduce yourself in #the-clearing
                  </li>
                  <li className="flex gap-3">
                    <span className="font-oswald text-xs" style={{ color: 'var(--accent-gold)' }}>03</span>
                    Share your fragment when ready
                  </li>
                </ol>
              </div>

              <div 
                className="rounded-xl border p-6"
                style={{ borderColor: 'rgba(184,134,11,0.2)', background: 'linear-gradient(135deg, rgba(139,69,19,0.1) 0%, rgba(184,134,11,0.05) 100%)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Unlock className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--accent-gold)' }}>
                    Next Unlock
                  </span>
                </div>
                <p className="font-oswald text-2xl tracking-[0.05em] mb-2" style={{ color: 'var(--text-primary)' }}>
                  The Love Room
                </p>
                <p className="font-inter text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Opens when <span className="font-oswald" style={{ color: 'var(--accent-gold)' }}>100</span> fragments are shared
                </p>
                <div className="mt-4 w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min((fragmentCount / 100) * 100, 100)}%`,
                      background: 'linear-gradient(to right, var(--accent-gold), rgba(184,134,11,0.5))'
                    }}
                  />
                </div>
                <p className="font-inter text-[10px] mt-2" style={{ color: 'var(--text-tertiary)' }}>
                  {fragmentCount} / 100 fragments
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Fragments Tab */}
        {activeTab === 'fragments' && (
          <div className="grid lg:grid-cols-[1fr_0.35fr] gap-8">
            {/* Fragments List */}
            <div className="space-y-6">
              {fragments.filter(f => f.approved).map((fragment) => (
                <article 
                  key={fragment.id}
                  className="rounded-xl border p-6 md:p-8 transition-all duration-300 hover:border-[var(--accent-gold)]"
                  style={{ borderColor: 'var(--text-dim)', background: 'rgba(8,8,8,0.4)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center font-oswald text-xs"
                      style={{ background: 'var(--accent-gold)', color: 'white' }}
                    >
                      {fragment.author[0]}
                    </div>
                    <div>
                      <p className="font-inter text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {fragment.author}
                      </p>
                      <p className="font-inter text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                        {fragment.location} · {fragment.date}
                      </p>
                    </div>
                  </div>
                  <p className="font-inter text-base leading-[1.7] italic" style={{ color: 'var(--text-secondary)' }}>
                    "{fragment.story}"
                  </p>
                </article>
              ))}

              {fragments.filter(f => !f.approved).length > 0 && (
                <div className="text-center py-8">
                  <p className="font-inter text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    {fragments.filter(f => !f.approved).length} fragment(s) pending approval...
                  </p>
                </div>
              )}
            </div>

            {/* Submit Form */}
            <div 
              className="rounded-xl border p-6 h-fit sticky top-24"
              style={{ borderColor: 'var(--text-dim)', background: 'rgba(8,8,8,0.6)' }}
            >
              <h3 className="font-oswald text-xl tracking-[0.05em] mb-2" style={{ color: 'var(--text-primary)' }}>
                Share Your Fragment
              </h3>
              <p className="font-inter text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                What moment made you who you are?
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-inter text-[10px] uppercase tracking-[0.15em] block mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={newFragment.author}
                    onChange={(e) => setNewFragment({ ...newFragment, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg font-inter text-sm border transition-colors focus:border-[var(--accent-gold)] outline-none"
                    style={{ 
                      background: 'rgba(5,5,5,0.8)', 
                      borderColor: 'var(--text-dim)', 
                      color: 'var(--text-primary)' 
                    }}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="font-inter text-[10px] uppercase tracking-[0.15em] block mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={newFragment.location}
                    onChange={(e) => setNewFragment({ ...newFragment, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg font-inter text-sm border transition-colors focus:border-[var(--accent-gold)] outline-none"
                    style={{ 
                      background: 'rgba(5,5,5,0.8)', 
                      borderColor: 'var(--text-dim)', 
                      color: 'var(--text-primary)' 
                    }}
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="font-inter text-[10px] uppercase tracking-[0.15em] block mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    Your Story
                  </label>
                  <textarea
                    value={newFragment.story}
                    onChange={(e) => setNewFragment({ ...newFragment, story: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg font-inter text-sm border transition-colors focus:border-[var(--accent-gold)] outline-none resize-none"
                    style={{ 
                      background: 'rgba(5,5,5,0.8)', 
                      borderColor: 'var(--text-dim)', 
                      color: 'var(--text-primary)' 
                    }}
                    rows={4}
                    placeholder="Nothing was random..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-inter text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-300 hover:brightness-110 disabled:opacity-50"
                  style={{ background: 'var(--accent-gold)', color: 'white' }}
                >
                  {isSubmitting ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Share Fragment
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityHub;