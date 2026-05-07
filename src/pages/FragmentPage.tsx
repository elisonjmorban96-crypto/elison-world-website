import { useState } from 'react';
import { Send, CheckCircle, Lock, Eye, ArrowLeft } from 'lucide-react';
import PageFooter from '../components/PageFooter';

interface Submission {
  id: string;
  name: string;
  email: string;
  story: string;
  song?: string;
  timestamp: string;
}

const ADMIN_PASSWORD = 'elisonworld2026'; // Simple password protection for admin view

const FragmentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    story: '',
    song: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [passwordError, setPasswordError] = useState(false);

  // Load submissions from localStorage on admin access
  const loadSubmissions = () => {
    const stored = localStorage.getItem('fragment-submissions');
    if (stored) {
      try {
        setSubmissions(JSON.parse(stored));
      } catch {
        setSubmissions([]);
      }
    }
  };

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setFormData(prev => ({ ...prev, story: text }));
    setWordCount(countWords(text));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store submission in localStorage (in production, this would go to Formspree or similar)
    const newSubmission: Submission = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      story: formData.story,
      song: formData.song || undefined,
      timestamp: new Date().toISOString(),
    };

    const existing = localStorage.getItem('fragment-submissions');
    const allSubmissions = existing ? JSON.parse(existing) : [];
    allSubmissions.push(newSubmission);
    localStorage.setItem('fragment-submissions', JSON.stringify(allSubmissions));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setPasswordError(false);
      loadSubmissions();
    } else {
      setPasswordError(true);
    }
  };

  const isValidForm = 
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.email.includes('@') &&
    wordCount >= 100 &&
    wordCount <= 500;

  if (showAdmin) {
    return (
      <main id="main-content" tabIndex={-1} className="pt-28 md:pt-32 min-h-screen">
        <section className="py-14 md:py-24 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-30" 
            style={{ background: 'radial-gradient(circle at top right, rgba(184,134,11,0.15), transparent 50%)' }} 
          />
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20 relative">
            <button
              onClick={() => {
                setShowAdmin(false);
                setIsAdminAuthenticated(false);
                setAdminPassword('');
              }}
              className="inline-flex items-center gap-2 mb-8 font-inter text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 hover:text-[var(--accent-gold)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Form
            </button>

            {!isAdminAuthenticated ? (
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <Lock className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--accent-gold)' }} />
                  <h1 className="font-oswald text-3xl tracking-[0.08em]" style={{ color: 'var(--text-primary)' }}>
                    Admin Access
                  </h1>
                  <p className="font-inter text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                    Enter password to view submissions
                  </p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => {
                        setAdminPassword(e.target.value);
                        setPasswordError(false);
                      }}
                      placeholder="Password"
                      className="w-full px-4 py-3 bg-transparent border font-inter text-sm transition-colors duration-300 focus:outline-none"
                      style={{ 
                        borderColor: passwordError ? 'var(--error)' : 'rgba(255,255,255,0.15)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    {passwordError && (
                      <p className="font-inter text-xs mt-2" style={{ color: 'var(--error)' }}>
                        Incorrect password
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 font-inter text-[11px] uppercase tracking-[0.14em] transition-all duration-300 hover:brightness-110"
                    style={{ background: 'var(--accent-gold)', color: 'white' }}
                  >
                    Access Submissions
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="font-oswald text-3xl tracking-[0.08em]" style={{ color: 'var(--text-primary)' }}>
                      Fragment Submissions
                    </h1>
                    <p className="font-inter text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {submissions.length} submission{submissions.length !== 1 ? 's' : ''} received
                    </p>
                  </div>
                  <button
                    onClick={loadSubmissions}
                    className="inline-flex items-center gap-2 px-4 py-2 font-inter text-[11px] uppercase tracking-[0.14em] border transition-colors duration-300 hover:border-[var(--accent-gold)]"
                    style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-secondary)' }}
                  >
                    <Eye className="w-4 h-4" />
                    Refresh
                  </button>
                </div>

                {submissions.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="font-inter text-base" style={{ color: 'var(--text-secondary)' }}>
                      No submissions yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {submissions.map((submission) => (
                      <div 
                        key={submission.id} 
                        className="border p-6 rounded-lg"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(8,8,8,0.4)' }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-oswald text-xl tracking-[0.05em]" style={{ color: 'var(--text-primary)' }}>
                              {submission.name}
                            </h3>
                            <p className="font-inter text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                              {submission.email}
                            </p>
                          </div>
                          <span className="font-inter text-[10px] uppercase tracking-[0.1em]" style={{ color: 'var(--text-tertiary)' }}>
                            {new Date(submission.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="font-inter text-sm leading-[1.8] mb-3" style={{ color: 'var(--text-secondary)' }}>
                          {submission.story}
                        </p>
                        {submission.song && (
                          <p className="font-inter text-xs" style={{ color: 'var(--accent-gold)' }}>
                            Connected song: {submission.song}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        <PageFooter />
      </main>
    );
  }

  return (
    <main id="main-content" tabIndex={-1} className="pt-28 md:pt-32 min-h-screen">
      {/* Hero Section */}
      <section className="py-14 md:py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30" 
          style={{ background: 'radial-gradient(circle at top right, rgba(184,134,11,0.15), transparent 50%)' }} 
        />
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <p className="scene-label mb-4">Your Fragment</p>
            <h1 
              className="font-oswald text-4xl sm:text-5xl lg:text-6xl tracking-[0.08em] leading-[0.95] mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Nothing Was Random
            </h1>
            <p 
              className="font-inter text-base sm:text-lg leading-[1.8] mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              Every moment that shaped you — the ones that hurt, the ones that healed, the ones you still carry — 
              they were all connected. Share your fragment. Tell us what moment made you who you are.
            </p>
            <p 
              className="font-inter text-sm italic leading-[1.8]"
              style={{ color: 'var(--accent-gold)' }}
            >
              "It was all connected."
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-10 md:py-16">
        <div className="max-w-[800px] mx-auto px-5 sm:px-6 md:px-12">
          {isSubmitted ? (
            <div 
              className="text-center py-16 px-8 border rounded-xl"
              style={{ borderColor: 'rgba(184,134,11,0.2)', background: 'rgba(8,8,8,0.4)' }}
            >
              <CheckCircle className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--accent-gold)' }} />
              <h2 
                className="font-oswald text-3xl tracking-[0.08em] mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Fragment Received
              </h2>
              <p 
                className="font-inter text-base leading-[1.8] max-w-lg mx-auto mb-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                Thank you for sharing your story. Every fragment matters. Every connection is real. 
                Your story has been added to the tapestry of Elison's World.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', story: '', song: '' });
                  setWordCount(0);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 font-inter text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-300 hover:brightness-110"
                style={{ background: 'var(--accent-gold)', color: 'white' }}
              >
                Share Another Fragment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div>
                <label 
                  htmlFor="name"
                  className="block font-inter text-[11px] uppercase tracking-[0.14em] mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 bg-transparent border font-inter text-sm transition-colors duration-300 focus:outline-none"
                  style={{ 
                    borderColor: 'rgba(255,255,255,0.15)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email"
                  className="block font-inter text-[11px] uppercase tracking-[0.14em] mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 bg-transparent border font-inter text-sm transition-colors duration-300 focus:outline-none"
                  style={{ 
                    borderColor: 'rgba(255,255,255,0.15)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              {/* Story Field */}
              <div>
                <label 
                  htmlFor="story"
                  className="block font-inter text-[11px] uppercase tracking-[0.14em] mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Your Story
                </label>
                <textarea
                  id="story"
                  value={formData.story}
                  onChange={handleStoryChange}
                  placeholder="Share the moment that changed everything. What happened? How did it connect to where you are now? (100-500 words)"
                  required
                  rows={10}
                  className="w-full px-4 py-3 bg-transparent border font-inter text-sm transition-colors duration-300 focus:outline-none resize-y"
                  style={{ 
                    borderColor: wordCount > 500 || (wordCount > 0 && wordCount < 100) 
                      ? 'rgba(220,80,80,0.5)' 
                      : 'rgba(255,255,255,0.15)',
                    color: 'var(--text-primary)'
                  }}
                />
                <div className="flex items-center justify-between mt-2">
                  <span 
                    className="font-inter text-xs"
                    style={{ 
                      color: wordCount > 500 || (wordCount > 0 && wordCount < 100) 
                        ? 'var(--error)' 
                        : 'var(--text-tertiary)'
                    }}
                  >
                    {wordCount} words
                  </span>
                  <span className="font-inter text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    100-500 words
                  </span>
                </div>
              </div>

              {/* Song Field */}
              <div>
                <label 
                  htmlFor="song"
                  className="block font-inter text-[11px] uppercase tracking-[0.14em] mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Song That Connects <span style={{ color: 'var(--text-tertiary)' }}>(Optional)</span>
                </label>
                <input
                  type="text"
                  id="song"
                  value={formData.song}
                  onChange={(e) => setFormData(prev => ({ ...prev, song: e.target.value }))}
                  placeholder="What song captures this moment for you?"
                  className="w-full px-4 py-3 bg-transparent border font-inter text-sm transition-colors duration-300 focus:outline-none"
                  style={{ 
                    borderColor: 'rgba(255,255,255,0.15)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isValidForm || isSubmitting}
                  className="w-full py-4 font-inter text-[11px] font-medium uppercase tracking-[0.14em] transition-all duration-300 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  style={{ background: 'var(--accent-gold)', color: 'white' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Fragment...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Your Fragment
                    </>
                  )}
                </button>
                {!isValidForm && (
                  <p className="font-inter text-xs text-center mt-3" style={{ color: 'var(--text-tertiary)' }}>
                    Please fill in all required fields and ensure your story is 100-500 words
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Admin Link */}
      <section className="py-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-[800px] mx-auto px-5 sm:px-6 md:px-12 text-center">
          <button
            onClick={() => setShowAdmin(true)}
            className="inline-flex items-center gap-2 font-inter text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 hover:text-[var(--accent-gold)]"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <Lock className="w-3 h-3" />
            Admin Access
          </button>
        </div>
      </section>

      <PageFooter />
    </main>
  );
};

export default FragmentPage;
