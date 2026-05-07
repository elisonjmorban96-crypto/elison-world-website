import { useState } from 'react';
import { Send, Mail } from 'lucide-react';

const NEWSLETTER_ENDPOINT = 'https://formspree.io/f/xqewbelg';

const PostcardSignup = () => {
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          source: "elison's world clearing",
        }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setSubmitState('success');
      setSubmitMessage("You're in. Watch for the next clue.");
      setEmail('');
    } catch {
      setSubmitState('error');
      setSubmitMessage('Something went wrong. Try again.');
    }
  };

  return (
    <div 
      className="rounded-xl border p-6"
      style={{ 
        borderColor: 'rgba(212, 168, 83, 0.2)', 
        background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(212, 168, 83, 0.05) 100%)' 
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-4 h-4" style={{ color: '#D4A853' }} />
        <h3 className="font-oswald text-sm tracking-[0.15em]" style={{ color: '#D4A853' }}>
          Postcards from Elison's World
        </h3>
      </div>
      
      <p className="font-inter text-xs leading-relaxed mb-4" style={{ color: '#7A7060' }}>
        Get the next clue. New rooms, new songs, new secrets.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-3 py-2 bg-white/[0.03] border font-inter text-xs placeholder:text-white/20 focus:outline-none transition-colors"
          style={{ borderColor: 'rgba(212, 168, 83, 0.2)', color: '#E8E0D0' }}
        />
        <button
          type="submit"
          disabled={submitState === 'submitting'}
          className="px-4 py-2 transition-all hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-70"
          style={{ background: '#D4A853', color: 'white' }}
        >
          <Send className="w-3 h-3" />
          <span className="font-inter text-[10px] uppercase tracking-[0.12em]">
            {submitState === 'submitting' ? 'Sending...' : 'Join'}
          </span>
        </button>
      </form>

      {submitMessage && (
        <p 
          className="mt-2 font-inter text-xs"
          style={{ color: submitState === 'error' ? '#E86A33' : '#D4A853' }}
        >
          {submitMessage}
        </p>
      )}
    </div>
  );
};

export default PostcardSignup;
