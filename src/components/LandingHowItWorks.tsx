import React, { useState } from 'react';
import { Scissors, Video, Sparkles, DollarSign, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from './UI/Card';

export const LandingHowItWorks: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'creators' | 'clippers' | 'brands' | 'ugc'>('clippers');

  const roleData = {
    clippers: {
      title: 'For Video Editors & Clippers',
      subtitle: 'Turn viral creator clips into daily M-Pesa income.',
      steps: [
        {
          num: '01',
          title: 'Browse High-Paying Bounties',
          desc: 'Find campaigns from top African YouTubers and Podcasters offering $10 - $150 per viral video clip.'
        },
        {
          num: '02',
          title: 'Download Source & Edit Viral Shorts',
          desc: 'Access 4K long-form raw episodes. Add captions, hooks, sound effects, and post to TikTok or Reels.'
        },
        {
          num: '03',
          title: 'Submit Link & Get Paid via M-Pesa',
          desc: 'Once approved or view thresholds are hit, escrow funds are instantly released to your ClipKenya M-Pesa Wallet.'
        }
      ]
    },
    creators: {
      title: 'For Content Creators & Streamers',
      subtitle: 'Scale your audience x10 with an army of dedicated video clippers.',
      steps: [
        {
          num: '01',
          title: 'Post Long-form Video Campaign',
          desc: 'Upload your YouTube URL or podcast MP4 and set your bounty budget starting at KES 5,000 in escrow.'
        },
        {
          num: '02',
          title: '1,000+ Clippers Repurpose Content',
          desc: 'Clippers extract your funniest, most engaging moments and flood TikTok, Reels, and Shorts.'
        },
        {
          num: '03',
          title: 'Explode Views & Monitise Audience',
          desc: 'Dominate social feeds without lifting a finger. Only pay for approved high-retention video clips.'
        }
      ]
    },
    brands: {
      title: 'For Brands, Agencies & E-commerce',
      subtitle: 'Launch high-converting video campaigns with authentic African creators.',
      steps: [
        {
          num: '01',
          title: 'Publish Brand UGC Brief',
          desc: 'Specify product deliverables, target demographics, and required video angles in 2 minutes.'
        },
        {
          num: '02',
          title: 'Select Vetted African Creators',
          desc: 'Receive submissions from verified micro & macro creators across Kenya, Nigeria, South Africa & Rwanda.'
        },
        {
          num: '03',
          title: 'Full Commercial Usage Rights',
          desc: 'Download raw video files and ad creatives with built-in usage licensing and ROI tracking.'
        }
      ]
    },
    ugc: {
      title: 'For UGC Talent & Influencers',
      subtitle: 'Monetize your creative voice and partner with global & local brands.',
      steps: [
        {
          num: '01',
          title: 'Build Verified Creator Portfolio',
          desc: 'Link your TikTok, Instagram, and past brand work to unlock exclusive sponsorship briefs.'
        },
        {
          num: '02',
          title: 'Receive Product Samples & Briefs',
          desc: 'Get products delivered or digital access. Record authentic unboxings, reviews, and testimonials.'
        },
        {
          num: '03',
          title: 'Guaranteed Payout Escrow',
          desc: 'No chasing invoices. Payment is held safely in escrow and disbursed immediately upon approval.'
        }
      ]
    }
  };

  const current = roleData[activeRole];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3 h-3" />
            <span>How ClipKenya Works</span>
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Designed for Africa’s Next-Gen Creator Economy
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Select your role to explore how our escrow-protected workflow powers seamless collaboration.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 max-w-2xl mx-auto">
          {[
            { id: 'clippers', label: 'Video Editors & Clippers', icon: <Scissors className="w-3.5 h-3.5" /> },
            { id: 'creators', label: 'Content Creators', icon: <Video className="w-3.5 h-3.5" /> },
            { id: 'brands', label: 'Brands & Agencies', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
            { id: 'ugc', label: 'UGC Talent', icon: <Sparkles className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveRole(tab.id as any)}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeRole === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {current.steps.map((step, idx) => (
            <Card key={idx} variant="default" padding="lg" className="space-y-4 relative group hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-heading font-black text-3xl text-slate-300 dark:text-slate-700 group-hover:text-emerald-500 transition-colors">
                  {step.num}
                </span>
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Note */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading text-xs font-bold text-slate-900 dark:text-white">100% Escrow & M-Pesa Instant Settlement</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">Funds are safely locked before work begins and automatically disbursed via Safaricom M-Pesa upon milestone verification.</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shrink-0 flex items-center gap-1.5 shadow-2xs">
            <span>Start Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
