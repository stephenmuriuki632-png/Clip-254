import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from './UI/Card';
import { Input } from './UI/Input';
import { Button } from './UI/Button';

export const LandingNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <Mail className="w-3.5 h-3.5" />
          <span>ClipKenya Creator Dispatch</span>
        </div>

        <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Stay Ahead of Africa’s Creator Bounties
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Get weekly alerts on high-paying video clipping bounties, viral TikTok editing trends, and new brand UGC campaign briefs.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-2 max-w-md mx-auto">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold">You're subscribed! Check your inbox for high-paying bounty alerts.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <div className="flex-1 w-full">
              <Input
                type="email"
                placeholder="Enter your M-Pesa or work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                className="bg-slate-900/80 border-slate-700 text-white placeholder-slate-400"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto shrink-0"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Subscribe Free
            </Button>
          </form>
        )}

      </div>
    </section>
  );
};
