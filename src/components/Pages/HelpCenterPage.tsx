import React, { useState } from 'react';
import { Search, HelpCircle, Shield, CreditCard, Video, FileText } from 'lucide-react';
import { Card } from '../UI/Card';
import { Input } from '../UI/Input';
import { Badge } from '../UI/Badge';

export const HelpCenterPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const categories = [
    { icon: <CreditCard className="w-5 h-5 text-emerald-500" />, title: 'M-Pesa & Payouts', articles: '12 articles' },
    { icon: <Video className="w-5 h-5 text-indigo-500" />, title: 'Submitting Video Clips', articles: '18 articles' },
    { icon: <Shield className="w-5 h-5 text-purple-500" />, title: 'Escrow & Dispute Safety', articles: '9 articles' },
    { icon: <FileText className="w-5 h-5 text-amber-500" />, title: 'Posting Brand Briefs', articles: '15 articles' }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="emerald" size="lg">Help & Knowledge Base</Badge>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How Can We Help You Today?
        </h1>
        <div className="pt-2">
          <Input
            placeholder="Search help topics (e.g., M-Pesa withdrawal, clip guidelines, escrow)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c, idx) => (
          <Card key={idx} variant="default" padding="md" className="space-y-2 hover:border-emerald-500/50 cursor-pointer transition-colors">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit">{c.icon}</div>
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">{c.title}</h3>
            <p className="text-[11px] text-slate-500">{c.articles}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
