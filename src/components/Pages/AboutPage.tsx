import React from 'react';
import { ShieldCheck, Heart, Users, Globe, Rocket, Award, CheckCircle2 } from 'lucide-react';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="emerald" size="lg">Our Story & Mission</Badge>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Building Africa’s Most Empowering Creator Super Infrastructure
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          ClipKenya was founded in Nairobi with a singular mission: to democratize digital income for African video editors, storytellers, UGC creators, and brands through instant mobile payouts and transparent escrow security.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Paid to Creators', val: '325M+ KES' },
          { label: 'Registered Clippers & Creators', val: '15,800+' },
          { label: 'Completed Bounties & Briefs', val: '24,000+' },
          { label: 'Average M-Pesa Payout Speed', val: '< 30 Seconds' }
        ].map((s, idx) => (
          <Card key={idx} variant="default" padding="md" className="text-center space-y-1">
            <p className="font-heading font-extrabold text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400">{s.val}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default" padding="lg" className="space-y-3">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Escrow Protection</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every bounty and UGC order is pre-funded into escrow, eliminating payment anxiety and ensuring creators get compensated fairly for approved work.
          </p>
        </Card>

        <Card variant="default" padding="lg" className="space-y-3">
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 w-fit">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Pan-African Reach</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Connecting talent across Kenya, Nigeria, South Africa, Rwanda, and Ghana with international brands seeking authentic African narrative voices.
          </p>
        </Card>

        <Card variant="default" padding="lg" className="space-y-3">
          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 w-fit">
            <Rocket className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">AI-Powered Efficiency</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Integrating Google Gemini AI tools natively to help creators generate viral hooks, scripts, and campaign briefs in seconds.
          </p>
        </Card>
      </div>

    </div>
  );
};
