const includedItems = [
  { icons: FileText, text: 'Complete blueprint', subtext: '8 chapters, 40+ pages of actionable content' },
  { icons: Code, text: 'Ranking algorithm code', subtext: 'Multi-factor scoring system ready to deploy' },
  { icons: Zap, text: 'AI content pipeline', subtext: '3-5 blog posts per week on autopilot' },
  { icons: TrendingUp, text: 'SEO automation setup', subtext: 'Sitemaps, schema, internal linking' },
  { icons: DollarSign, text: 'Affiliate monetization guide', subtext: 'Setup for 6+ affiliate programs' },
  { icons: Globe, text: 'Cross-site network playbook', subtext: 'Build a portfolio that multiplies traffic' },
];

const whoItsFor = [
  { icons: Users, text: 'Aspiring founders', subtext: 'Launch your first income-generating directory' },
  { icons: Target, text: 'SEO professionals', subtext: 'Add directory sites to your portfolio strategy' },
  { icons: Star, text: 'Side hustlers', subtext: 'Build a passive income stream with affiliate revenue' },
  { icons: Lightbulb, text: 'Agency owners', subtext: 'Offer directory building as a service to clients' },
];

const whatYoullLearn = [
  { icons: Search, text: 'Find profitable niches', subtext: '5-factor validation framework' },
  { icons: Code, text: 'Build with Next.js + Cursor', subtext: 'Scaffold directories in days' },
  { icons: BarChart, text: 'Implement ranking algorithms', subtext: 'Multi-factor scoring system' },
  { icons: DollarSign, text: 'Monetize with affiliates', subtext: '6+ affiliate program integrations' },
];

function CheckoutOverlay({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: 'directory-builder-template' }),
      });
      if (!res.ok) throw new Error('Failed to process purchase');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'directory-builder-template.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setStatus('success');
      setMessage('Purchase successful! Your PDF has been downloaded.');
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-tech-800 border border-tech-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-neon/10">
        <button onClick={onBack} className="absolute top-4 right-4 text-tech-300 hover:text-white transition" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Directory Builder Template</h3>
          <p className="text-sm text-tech-200">Complete PDF Playbook</p>
          <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-lg font-bold text-white">$19</span>
            <span className="text-xs text-tech-200">one-time</span>
          </div>
        </div>
        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-white font-medium mb-1">{message}</p>
            <button onClick={onBack} className="mt-4 text-sm text-emerald-400 hover:underline">Back to playbook</button>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className="space-y-4">
            <div>
              <label htmlFor="checkout-email" className="block text-sm font-medium text-tech-200 mb-1">Email address</label>
              <input id="checkout-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="w-full bg-tech-900 border border-tech-500/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Processing...</>
              ) : (
                <><Download className="w-4 h-4" /> Download PDF &mdash; $19</>
              )}
            </button>
            {status === 'error' && <p className="text-xs text-red-400 text-center">{message}</p>}
            <p className="text-[10px] text-tech-300 text-center">Secure checkout. Your PDF will be available immediately after purchase.<br />You will also receive a download link via email.</p>
          </form>
        )}
      </div>
    </div>
  );
}
