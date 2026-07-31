import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scissors,
  Video,
  Camera,
  Briefcase,
  Building2,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shield,
  Wallet,
  Play,
  Award,
  Zap,
  Target
} from 'lucide-react';
import { UserRole } from '../../types';

interface RoleOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
  onGetStarted: () => void;
}

export const RoleOnboardingModal: React.FC<RoleOnboardingModalProps> = ({
  isOpen,
  onClose,
  role,
  onGetStarted
}) => {
  if (!isOpen) return null;

  const onboardingGuides: Record<UserRole, {
    title: string;
    badge: string;
    welcomeMsg: string;
    steps: { number: string; title: string; desc: string; icon: any }[];
    ctaText: string;
    targetTab: string;
  }> = {
    creator: {
      title: 'Content Creator Welcome Hub',
      badge: 'Bounty Campaign Manager',
      welcomeMsg: 'Welcome to ClipForge! Post stream bounties, turn raw podcasts into viral vertical clips, and pay clippers with automated M-Pesa Escrow.',
      steps: [
        { number: '01', title: 'Post Stream Bounty', desc: 'Deposit M-Pesa budget (e.g. KES 5,000) and share your YouTube or Twitch VOD link.', icon: Video },
        { number: '02', title: 'Editors Submit Clips', desc: 'African video clippers cut 30-60s hooks and post directly to TikTok/Reels.', icon: Scissors },
        { number: '03', title: 'Realtime View Verification', desc: 'Views are tracked via official APIs. Payouts release automatically per 100k views.', icon: Zap }
      ],
      ctaText: 'Launch Creator Studio & First Bounty',
      targetTab: 'creator-dashboard'
    },
    clipper: {
      title: 'Streamer Clipper Welcome Hub',
      badge: 'Viral Video Editor',
      welcomeMsg: 'Welcome aboard! Edit raw stream highlights, add CapCut hooks, post to TikTok/Shorts, and claim instant M-Pesa payouts.',
      steps: [
        { number: '01', title: 'Browse Active Stream Bounties', desc: 'Pick top tech podcasts, gaming streams, or comedy shows with funded escrow pools.', icon: Scissors },
        { number: '02', title: 'Edit & Post Viral Clips', desc: 'Cut 30s vertical clips using CapCut/Premiere, add captions, and upload to TikTok/Reels.', icon: Sparkles },
        { number: '03', title: 'Submit Link & Cash Out', desc: 'Submit your clip URL. Track view milestones and withdraw KES directly to M-Pesa.', icon: Wallet }
      ],
      ctaText: 'Open Clipper Studio & Browse Bounties',
      targetTab: 'clipper-dashboard'
    },
    ugc: {
      title: 'UGC Creator Welcome Hub',
      badge: 'Brand Video Creator',
      welcomeMsg: 'Welcome to ClipForge UGC Marketplace! Film authentic product unboxings, testimonials, and brand ads for top Kenyan & global brands.',
      steps: [
        { number: '01', title: 'Set Up Creator Portfolio', desc: 'List your video packages (e.g., 1x TikTok Video @ KES 4,500) and video samples.', icon: Camera },
        { number: '02', title: 'Apply to Brand Briefs', desc: 'Submit proposals to active brand briefs with guaranteed Escrow protection.', icon: Target },
        { number: '03', title: 'Deliver & Get Paid', desc: 'Deliver 4K raw video clips. Money releases to your wallet immediately upon brand signoff.', icon: Award }
      ],
      ctaText: 'Explore UGC Briefs & Setup Packages',
      targetTab: 'ugc'
    },
    freelancer: {
      title: 'Creative Freelancer Welcome Hub',
      badge: 'Professional Editor & Designer',
      welcomeMsg: 'Welcome! Offer 4K video editing, color grading, thumbnail design, and voiceovers to creators and agencies across East Africa.',
      steps: [
        { number: '01', title: 'Publish Service Gigs', desc: 'Set your hourly rates and gig pricing in KES or USD with transparent deliverables.', icon: Briefcase },
        { number: '02', title: 'Receive Direct Orders', desc: 'Clients order gigs with 100% funds locked in ClipForge Escrow before work begins.', icon: Shield },
        { number: '03', title: 'Submit Work & Invoice', desc: 'Send final files via built-in chat. Receive instant official invoices and wallet credits.', icon: CheckCircle2 }
      ],
      ctaText: 'Setup Freelancer Profile & Gigs',
      targetTab: 'freelance'
    },
    brand: {
      title: 'Brand & Business Growth Hub',
      badge: 'Enterprise Sponsor',
      welcomeMsg: 'Scale your brand awareness in Kenya and across Africa by sponsoring top streamers, podcasters, and viral UGC creators.',
      steps: [
        { number: '01', title: 'Post Campaign Briefs', desc: 'Define your target audience, video deliverables, and budget in KES or USD.', icon: Building2 },
        { number: '02', title: 'Automated Escrow Safety', desc: 'Funds stay safely in ClipForge Escrow until you inspect and approve submitted content.', icon: Shield },
        { number: '03', title: 'Track Impressions & ROI', desc: 'Monitor live view metrics, engagement rates, and analytics in real time.', icon: Zap }
      ],
      ctaText: 'Create Your First Brand Campaign',
      targetTab: 'creators'
    },
    agency: {
      title: 'Talent Agency Workspace',
      badge: 'Agency Roster Manager',
      welcomeMsg: 'Manage multi-creator rosters, orchestrate brand partnerships, and automate team payout splits with enterprise compliance.',
      steps: [
        { number: '01', title: 'Add Creator Roster', desc: 'Import creator profiles and manage contract agreements from one unified hub.', icon: Users },
        { number: '02', title: 'Bulk Campaign Execution', desc: 'Pitch your roster to top brand campaigns with single-click escrow invoicing.', icon: Target },
        { number: '03', title: 'Automated Revenue Splits', desc: 'Set agency commission % and automate M-Pesa payouts directly to your talent.', icon: Wallet }
      ],
      ctaText: 'Enter Agency Dashboard',
      targetTab: 'admin'
    },
    editor: {
      title: 'Video Editor Welcome Hub',
      badge: 'Professional Editor',
      welcomeMsg: 'Welcome aboard! Edit raw stream highlights, cut vertical clips, and earn M-Pesa payouts.',
      steps: [
        { number: '01', title: 'Browse Active Bounties', desc: 'Pick top tech podcasts or gaming streams with funded escrow pools.', icon: Scissors },
        { number: '02', title: 'Edit & Post Viral Clips', desc: 'Cut 30s vertical clips, add captions, and upload to TikTok/Reels.', icon: Sparkles },
        { number: '03', title: 'Submit Link & Cash Out', desc: 'Submit your clip URL and withdraw KES directly to M-Pesa.', icon: Wallet }
      ],
      ctaText: 'Open Editor Studio',
      targetTab: 'clipper-dashboard'
    },
    influencer: {
      title: 'Influencer Welcome Hub',
      badge: 'Creator Partner',
      welcomeMsg: 'Welcome! Connect with top brands and monetize your audience.',
      steps: [
        { number: '01', title: 'Build Profile', desc: 'Highlight your social reach and audience analytics.', icon: Users },
        { number: '02', title: 'Receive Sponsorships', desc: 'Get direct offers with Escrow protection.', icon: Shield },
        { number: '03', title: 'Track Earnings', desc: 'Monitor campaign ROI and withdraw funds.', icon: Wallet }
      ],
      ctaText: 'Open Influencer Hub',
      targetTab: 'influencers'
    },
    admin: {
      title: 'Admin Welcome Hub',
      badge: 'System Administrator',
      welcomeMsg: 'System administration hub.',
      steps: [
        { number: '01', title: 'Monitor Platform', desc: 'Track live transactions and user activity.', icon: Shield },
        { number: '02', title: 'Manage Users', desc: 'Verify accounts and manage permissions.', icon: Users },
        { number: '03', title: 'Review Escrow', desc: 'Audit payouts and escrow releases.', icon: Wallet }
      ],
      ctaText: 'Enter Admin Hub',
      targetTab: 'admin'
    }
  };

  const guide = onboardingGuides[role] || onboardingGuides.creator;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 space-y-6 p-6 sm:p-8">
        
        {/* Glow Graphics */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="space-y-3 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{guide.badge}</span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            {guide.title}
          </h2>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
            {guide.welcomeMsg}
          </p>
        </div>

        {/* 3 Step Roadmap */}
        <div className="space-y-3 relative z-10">
          <p className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center">
            How It Works in 3 Quick Steps
          </p>

          <div className="grid grid-cols-1 gap-3">
            {guide.steps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.number}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-start gap-4 transition-all hover:border-indigo-500/50"
                >
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
                    <StepIcon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-bold text-xs text-slate-900 dark:text-white">
                        {step.title}
                      </h4>
                      <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                        STEP {step.number}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Initial Zero Balance Notice */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-slate-700 dark:text-slate-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="font-bold text-[11px]">Your Wallet Balance: KES 0.00</span>
          </div>
          <span className="text-[10px] text-slate-400">Ready for first transaction</span>
        </div>

        {/* Get Started CTA */}
        <div className="space-y-2 relative z-10 pt-2">
          <button
            onClick={() => {
              onGetStarted();
              onClose();
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <span>{guide.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            Skip for now & explore dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
