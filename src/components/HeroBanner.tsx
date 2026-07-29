import React from 'react';
import { useApp } from '../context/AppContext';
import { Scissors, Sparkles, ShieldCheck, ArrowRight, TrendingUp, CheckCircle, Flame, Layers } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Ticker Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>M-Pesa Instant Payouts Active</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>150,000 KES Bounty Pool Live</span>
          </span>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
            Africa’s Creator Economy <br className="hidden sm:inline" />
            <span className="text-indigo-600 dark:text-indigo-400">
              Super Platform
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The all-in-one ecosystem connecting African Creators, Video Editors, UGC Creators, Brands, and Agencies. Monikered as the African Fiverr + Upwork + JoinBrands + TikTok Creator Marketplace combined.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('clipping')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Scissors className="w-4 h-4 text-white" />
              <span>Explore Video Bounties</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => setActiveTab('ai-tools')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Launch AI Viral Suite</span>
            </button>

            <button
              onClick={() => setActiveTab('creators')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center justify-center gap-2 transition-colors"
            >
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Browse 15k+ Creators</span>
            </button>
          </div>

        </div>

        {/* Key Platform Stats Strip */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center sm:text-left shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Total Creator Earnings</p>
            <p className="font-heading font-extrabold text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400 mt-1">
              $2.5M+ <span className="text-xs text-slate-500 font-normal dark:text-slate-400">(325M+ KES)</span>
            </p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>Paid via M-Pesa & Bank</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center sm:text-left shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Active Bounties & Briefs</p>
            <p className="font-heading font-extrabold text-xl sm:text-2xl text-amber-600 dark:text-amber-400 mt-1">
              1,240+
            </p>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
              <CheckCircle className="w-3 h-3 text-amber-500" />
              <span>100% Escrow Protection</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center sm:text-left shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Verified Creators</p>
            <p className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white mt-1">
              15,800+
            </p>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
              <ShieldCheck className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
              <span>Kenya, Nigeria, SA, Rwanda</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center sm:text-left shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Brands & Agencies</p>
            <p className="font-heading font-extrabold text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400 mt-1">
              420+
            </p>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
              <span>Safaricom, Jumia, Equity...</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
