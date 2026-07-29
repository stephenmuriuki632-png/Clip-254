import React from 'react';
import { Scissors, Video, Sparkles, Wallet, MessageSquare, BarChart3, Shield, GraduationCap, Users } from 'lucide-react';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

export const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <Scissors className="w-6 h-6 text-emerald-500" />,
      title: 'Video Clipping Bounties',
      desc: 'Top podcasters & YouTubers post long-form videos. Editors clip viral moments and earn per view or flat bounty.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: 'Gemini AI Viral Suite',
      desc: 'Generate viral hooks, 45-second scripts, captions, and campaign briefs optimized for African social trends.'
    },
    {
      icon: <Video className="w-6 h-6 text-blue-500" />,
      title: 'Brand UGC Marketplace',
      desc: 'E-commerce & SaaS brands post video briefs. Verified UGC talent records authentic reviews and unboxings.'
    },
    {
      icon: <Wallet className="w-6 h-6 text-emerald-600" />,
      title: 'M-Pesa Instant Wallet',
      desc: 'Seamless STK Push deposits and instant 24/7 withdrawals directly to registered Safaricom phone lines.'
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
      title: 'Real-Time Messaging',
      desc: 'Direct creator-brand chat with file attachment sharing, video revisions, and escrow milestone release triggers.'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-indigo-500" />,
      title: 'Performance Analytics',
      desc: 'Live view count tracking, retention metrics, earnings breakdown, and ROI dashboards for brands.'
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-amber-600" />,
      title: 'Creator Academy',
      desc: 'Free video courses covering CapCut editing, copyright fair-use, viral hook chemistry, and personal branding.'
    },
    {
      icon: <Users className="w-6 h-6 text-rose-500" />,
      title: 'Community Leaderboards',
      desc: 'Weekly & monthly ranking rewards for top clippers with bonus cash payouts and verified badge perks.'
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="purple" size="lg">Platform Architecture</Badge>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Everything You Need to Scale Your Digital Content Empire
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          ClipKenya combines creator bounties, UGC sourcing, freelance services, AI generation, and escrow wallet security in one unified applet.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, idx) => (
          <Card key={idx} variant="default" padding="lg" className="space-y-3 hover:border-emerald-500/50 transition-colors">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 w-fit">
              {f.icon}
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">{f.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
