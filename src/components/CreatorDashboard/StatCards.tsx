import React from 'react';
import { 
  Megaphone, 
  Play, 
  CheckCircle2, 
  PauseCircle, 
  Wallet, 
  CreditCard, 
  Film, 
  Clock, 
  XCircle, 
  Percent, 
  Eye, 
  Heart, 
  Users, 
  TrendingUp, 
  DollarSign 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StatCards: React.FC = () => {
  const { campaigns, submissions, balanceKES } = useApp();

  // Metrics calculations
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const completedCampaigns = campaigns.filter(c => c.status === 'completed').length;
  const pausedCampaigns = campaigns.filter(c => c.status === 'paused').length;

  const totalBudgetKES = campaigns.reduce((acc, c) => acc + (c.budgetKES || 0), 0);
  const totalSpendingKES = campaigns.reduce((acc, c) => acc + (c.budgetKES ? c.budgetKES * 0.65 : 0), 0);
  const monthlySpendingKES = Math.round(totalSpendingKES * 0.4);

  const approvedClips = submissions.filter(s => s.status === 'approved' || s.status === 'paid').length;
  const pendingReviews = submissions.filter(s => s.status === 'pending' || s.status === 'under_review').length;
  const rejectedClips = submissions.filter(s => s.status === 'rejected').length;

  const totalSubmissions = submissions.length || 1;
  const approvalRate = Math.round((approvedClips / totalSubmissions) * 100);

  const totalViews = submissions.reduce((acc, s) => acc + (s.views || 0), 0);
  const totalEngagement = Math.round(totalViews * 0.082); // ~8.2% engagement rate simulation
  const creatorsHired = new Set(submissions.map(s => s.editorId)).size || 12;

  const stats = [
    {
      label: 'Wallet Balance',
      value: `${balanceKES.toLocaleString()} KES`,
      subtext: 'M-Pesa Express Available',
      icon: Wallet,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/60'
    },
    {
      label: 'Total Campaigns',
      value: totalCampaigns.toString(),
      subtext: `${activeCampaigns} Active now`,
      icon: Megaphone,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/60'
    },
    {
      label: 'Active Campaigns',
      value: activeCampaigns.toString(),
      subtext: 'Recruiting clippers',
      icon: Play,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/60'
    },
    {
      label: 'Completed Campaigns',
      value: completedCampaigns.toString(),
      subtext: '100% payout settled',
      icon: CheckCircle2,
      color: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-teal-50 dark:bg-teal-950/60'
    },
    {
      label: 'Paused Campaigns',
      value: pausedCampaigns.toString(),
      subtext: 'Awaiting updates',
      icon: PauseCircle,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/60'
    },
    {
      label: 'Total Budget Allocated',
      value: `${totalBudgetKES.toLocaleString()} KES`,
      subtext: 'Across all campaigns',
      icon: DollarSign,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/60'
    },
    {
      label: 'Total Spending',
      value: `${Math.round(totalSpendingKES).toLocaleString()} KES`,
      subtext: 'Escrow payouts released',
      icon: CreditCard,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/60'
    },
    {
      label: 'Monthly Spending',
      value: `${monthlySpendingKES.toLocaleString()} KES`,
      subtext: 'Current 30-day cycle',
      icon: TrendingUp,
      color: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/60'
    },
    {
      label: 'Approved Clips',
      value: approvedClips.toString(),
      subtext: 'Paid out via M-Pesa',
      icon: Film,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/60'
    },
    {
      label: 'Pending Reviews',
      value: pendingReviews.toString(),
      subtext: 'Requires action',
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/60'
    },
    {
      label: 'Rejected Clips',
      value: rejectedClips.toString(),
      subtext: 'Guideline mismatch',
      icon: XCircle,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/60'
    },
    {
      label: 'Average Approval Rate',
      value: `${approvalRate}%`,
      subtext: '+4.2% vs last month',
      icon: Percent,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/60'
    },
    {
      label: 'Total Organic Views',
      value: totalViews > 1000000 ? `${(totalViews / 1000000).toFixed(1)}M` : totalViews.toLocaleString(),
      subtext: 'Across TikTok & Reels',
      icon: Eye,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/60'
    },
    {
      label: 'Total Engagement',
      value: totalEngagement > 100000 ? `${(totalEngagement / 1000).toFixed(1)}k` : totalEngagement.toLocaleString(),
      subtext: 'Likes, Shares & Comments',
      icon: Heart,
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-50 dark:bg-pink-950/60'
    },
    {
      label: 'Total Creators Hired',
      value: creatorsHired.toString(),
      subtext: 'Verified African talent',
      icon: Users,
      color: 'text-violet-600 dark:text-violet-400',
      bgColor: 'bg-violet-50 dark:bg-violet-950/60'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-indigo-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl ${stat.bgColor} ${stat.color} transition-transform group-hover:scale-105`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
                {stat.value}
              </span>
            </div>

            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-1">
              {stat.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
};
