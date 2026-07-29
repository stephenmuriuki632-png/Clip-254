import React from 'react';
import {
  Eye,
  UserCheck,
  Briefcase,
  Clock,
  CheckCircle2,
  Star,
  Zap,
  TrendingUp,
  DollarSign,
  Wallet,
  Users,
  Repeat
} from 'lucide-react';
import { UGCProfileData, UGCAnalyticsData } from '../../types';

interface UGCStatCardsProps {
  profile: UGCProfileData;
  analytics: UGCAnalyticsData;
}

export const UGCStatCards: React.FC<UGCStatCardsProps> = ({ profile, analytics }) => {
  const statItems = [
    {
      id: 'portfolio_views',
      label: 'Portfolio Views',
      value: analytics.portfolioViews.toLocaleString(),
      icon: Eye,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/50'
    },
    {
      id: 'profile_views',
      label: 'Profile Views',
      value: analytics.profileViews.toLocaleString(),
      icon: UserCheck,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/50'
    },
    {
      id: 'total_bookings',
      label: 'Total Bookings',
      value: profile.completedProjectsCount,
      icon: Briefcase,
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-950/50'
    },
    {
      id: 'pending_jobs',
      label: 'Pending Jobs',
      value: '3 Active',
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/50'
    },
    {
      id: 'completed_jobs',
      label: 'Completed Jobs',
      value: profile.completedProjectsCount,
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50'
    },
    {
      id: 'avg_rating',
      label: 'Average Rating',
      value: `${profile.averageRating} ★ (${profile.reviewsCount})`,
      icon: Star,
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-950/50'
    },
    {
      id: 'response_rate',
      label: 'Response Rate',
      value: `${profile.responseRatePercent}% (${profile.responseTimeMinutes}m avg)`,
      icon: Zap,
      color: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-50 dark:bg-cyan-950/50'
    },
    {
      id: 'completion_rate',
      label: 'Completion Rate',
      value: `${profile.completionRatePercent}%`,
      icon: TrendingUp,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/50'
    },
    {
      id: 'monthly_earnings',
      label: 'Monthly Earnings',
      value: `${analytics.monthlyEarningsKES.toLocaleString()} KES`,
      icon: DollarSign,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50'
    },
    {
      id: 'lifetime_earnings',
      label: 'Lifetime Earnings',
      value: `${(analytics.lifetimeEarningsKES / 1000000).toFixed(2)}M KES`,
      icon: Wallet,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/50'
    },
    {
      id: 'followers',
      label: 'Total Social Audience',
      value: '316,000+',
      icon: Users,
      color: 'text-fuchsia-600 dark:text-fuchsia-400',
      bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/50'
    },
    {
      id: 'repeat_clients',
      label: 'Repeat Clients',
      value: `${profile.repeatClientsCount} Brands`,
      icon: Repeat,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/50'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5">
      {statItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-2xs hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                {item.label}
              </span>
              <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                <IconComponent className={`w-3.5 h-3.5 ${item.color}`} />
              </div>
            </div>
            <p className="text-base font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};
