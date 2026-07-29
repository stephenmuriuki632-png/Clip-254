import React from 'react';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

export const BlogPage: React.FC = () => {
  const posts = [
    {
      title: 'How Kenyan Editors Made $50k in 30 Days Clipping Podcast Shorts',
      date: 'July 24, 2026',
      readTime: '4 min read',
      category: 'Creator Earnings',
      snippet: 'Short-form video clipping is exploding across East Africa. Learn the exact hooks and CapCut templates driving millions of views.'
    },
    {
      title: 'Introducing M-Pesa STK Push Instant Escrow Settlements',
      date: 'July 18, 2026',
      readTime: '3 min read',
      category: 'Product Updates',
      snippet: 'We upgraded our Safaricom Daraja integration to support sub-30 second disbursements directly to creator M-Pesa wallets.'
    },
    {
      title: 'Why Brands are Shifting Budget from Static Ads to TikTok UGC Briefs',
      date: 'July 10, 2026',
      readTime: '6 min read',
      category: 'Brand Strategy',
      snippet: 'Authenticity converts 3x higher than studio ads. Discover how brands leverage ClipKenya micro-creators for high ROAS.'
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="emerald" size="lg">ClipKenya Insights</Badge>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Creator Economy News & Editing Playbooks
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          In-depth guides, product release notes, and case studies from top African video creators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((p, idx) => (
          <Card key={idx} variant="default" padding="lg" className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                {p.category}
              </span>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white leading-snug hover:text-emerald-500 cursor-pointer transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.snippet}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{p.readTime}</span>
              </span>
              <span>{p.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
