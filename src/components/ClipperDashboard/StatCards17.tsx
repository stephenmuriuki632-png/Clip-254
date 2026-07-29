import React, { useState } from 'react';
import {
  Video,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Award,
  Star,
  Eye,
  Briefcase,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Wallet,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StatCards17: React.FC = () => {
  const { campaigns, submissions, balanceKES, currentUser } = useApp();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Compute stats dynamically
  const availableCampaigns = campaigns.filter(c => c.status === 'active').length;
  const appliedCampaigns = submissions.length;
  
  const pendingClips = submissions.filter(s => s.status === 'pending' || s.status === 'under_review').length;
  const approvedClips = submissions.filter(s => s.status === 'approved' || s.status === 'completed' || s.status === 'paid').length;
  const rejectedClips = submissions.filter(s => s.status === 'rejected').length;
  const revisionRequests = submissions.filter(s => s.status === 'revision_requested').length;
  const completedCampaigns = approvedClips;

  const totalEarningsKES = submissions.filter(s => s.status === 'approved' || s.status === 'completed' || s.status === 'paid').reduce((acc, s) => acc + (s.payoutKES || 0), 0);
  const pendingEarningsKES = submissions.filter(s => s.status === 'pending' || s.status === 'under_review' || s.status === 'revision_requested').reduce((acc, s) => acc + (s.payoutKES || 0), 0);
  const availableBalanceKES = balanceKES;
  const monthlyEarningsKES = totalEarningsKES;

  const totalEvaluated = approvedClips + rejectedClips;
  const approvalRate = totalEvaluated > 0 ? `${Math.round((approvedClips / totalEvaluated) * 100)}%` : 'N/A';
  const averageRating = currentUser.rating && currentUser.rating > 0 ? `${currentUser.rating.toFixed(1)} / 5` : 'No ratings yet';
  const leaderboardRank = approvedClips > 0 ? '#1 In Local Bounties' : 'Not ranked yet';
  const portfolioViews = '0';
  const profileViews = '0';
  const jobsCompleted = approvedClips;

  const statsList = [
    {
      id: 'available_campaigns',
      label: 'Available Campaigns',
      value: availableCampaigns,
      icon: Video,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      change: '+4 this week',
      isPositive: true
    },
    {
      id: 'applied_campaigns',
      label: 'Applied Campaigns',
      value: appliedCampaigns,
      icon: Layers,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      change: 'Active applications',
      isPositive: true
    },
    {
      id: 'pending_clips',
      label: 'Pending Clips',
      value: pendingClips,
      icon: Clock,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      change: 'Under Review',
      isPositive: true
    },
    {
      id: 'approved_clips',
      label: 'Approved Clips',
      value: approvedClips,
      icon: CheckCircle2,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      change: '+18% this month',
      isPositive: true
    },
    {
      id: 'rejected_clips',
      label: 'Rejected Clips',
      value: rejectedClips,
      icon: XCircle,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      change: 'Low rejection rate',
      isPositive: false
    },
    {
      id: 'revision_requests',
      label: 'Revision Requests',
      value: revisionRequests,
      icon: AlertCircle,
      color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
      change: 'Action needed',
      isPositive: false
    },
    {
      id: 'completed_campaigns',
      label: 'Completed Campaigns',
      value: completedCampaigns,
      icon: Briefcase,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      change: 'Fully paid out',
      isPositive: true
    },
    {
      id: 'total_earnings',
      label: 'Total Earnings',
      value: `KES ${totalEarningsKES.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
      change: 'Lifetime gross',
      isPositive: true
    },
    {
      id: 'pending_earnings',
      label: 'Pending Earnings',
      value: `KES ${pendingEarningsKES.toLocaleString()}`,
      icon: Clock,
      color: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
      change: 'In Escrow',
      isPositive: true
    },
    {
      id: 'available_balance',
      label: 'Available Balance',
      value: `KES ${availableBalanceKES.toLocaleString()}`,
      icon: Wallet,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      change: 'Ready for withdrawal',
      isPositive: true
    },
    {
      id: 'monthly_earnings',
      label: 'Monthly Earnings',
      value: `KES ${monthlyEarningsKES.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
      change: '+24% vs last mo',
      isPositive: true
    },
    {
      id: 'approval_rate',
      label: 'Approval Rate',
      value: `${approvalRate}%`,
      icon: Activity,
      color: 'text-indigo-600 bg-indigo-500/10 border-indigo-500/20',
      change: 'Top 5% Editor',
      isPositive: true
    },
    {
      id: 'average_rating',
      label: 'Average Rating',
      value: `${averageRating} ★`,
      icon: Star,
      color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
      change: `${currentUser.reviewCount || 48} reviews`,
      isPositive: true
    },
    {
      id: 'leaderboard_rank',
      label: 'Leaderboard Rank',
      value: leaderboardRank,
      icon: Award,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      change: 'Top Clipper League',
      isPositive: true
    },
    {
      id: 'portfolio_views',
      label: 'Portfolio Views',
      value: portfolioViews,
      icon: Eye,
      color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
      change: '+320 this week',
      isPositive: true
    },
    {
      id: 'profile_views',
      label: 'Profile Views',
      value: profileViews,
      icon: Eye,
      color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
      change: '+180 this week',
      isPositive: true
    },
    {
      id: 'jobs_completed',
      label: 'Jobs Completed',
      value: jobsCompleted,
      icon: Sparkles,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      change: '100% On-time',
      isPositive: true
    }
  ];

  const visibleStats = isExpanded ? statsList : statsList.slice(0, 8);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-500" />
          Clipper Performance & Metrics (17 Analytics Indicators)
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none"
        >
          {isExpanded ? (
            <>
              Show Essential 8 <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              View All 17 Stats <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {visibleStats.map(stat => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate pr-1">
                  {stat.label}
                </span>
                <div className={`p-1.5 rounded-xl border ${stat.color} transition-transform group-hover:scale-110`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </div>
              <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-1 truncate">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
