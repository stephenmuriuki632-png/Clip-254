import React from 'react';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  TrendingUp,
  Star,
  Users,
  Eye,
  MessageSquare,
  Award,
  Zap,
  Percent
} from 'lucide-react';
import { FreelanceStatSummary } from '../../types/freelancer';

interface FreelancerStatCardsProps {
  stats: FreelanceStatSummary;
}

export const FreelancerStatCards: React.FC<FreelancerStatCardsProps> = ({ stats }) => {
  const statList = [
    {
      id: 'active_services',
      label: 'Active Services',
      value: stats.activeServices,
      subText: 'Published Gigs',
      icon: Briefcase,
      color: 'indigo'
    },
    {
      id: 'completed_orders',
      label: 'Completed Orders',
      value: stats.completedOrders,
      subText: '100% Satisfied',
      icon: CheckCircle2,
      color: 'emerald'
    },
    {
      id: 'pending_orders',
      label: 'Pending Orders',
      value: stats.pendingOrders,
      subText: 'In Production',
      icon: Clock,
      color: 'amber'
    },
    {
      id: 'cancelled_orders',
      label: 'Cancelled Orders',
      value: stats.cancelledOrders,
      subText: '0.6% Cancel Rate',
      icon: XCircle,
      color: 'rose'
    },
    {
      id: 'total_revenue',
      label: 'Total Revenue',
      value: `${stats.totalRevenueKES.toLocaleString()} KES`,
      subText: 'Lifetime Earnings',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      id: 'monthly_revenue',
      label: 'Monthly Revenue',
      value: `${stats.monthlyRevenueKES.toLocaleString()} KES`,
      subText: 'This Month',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      id: 'average_rating',
      label: 'Average Rating',
      value: `${stats.averageRating} ★`,
      subText: 'From 148 Reviews',
      icon: Star,
      color: 'amber'
    },
    {
      id: 'repeat_clients',
      label: 'Repeat Clients',
      value: stats.repeatClients,
      subText: '23% Client Retention',
      icon: Users,
      color: 'indigo'
    },
    {
      id: 'profile_views',
      label: 'Profile Views',
      value: stats.profileViews,
      subText: 'Last 30 Days',
      icon: Eye,
      color: 'blue'
    },
    {
      id: 'service_views',
      label: 'Service Views',
      value: stats.serviceViews,
      subText: 'Gig Page Impressions',
      icon: Zap,
      color: 'teal'
    },
    {
      id: 'response_rate',
      label: 'Response Rate',
      value: `${stats.responseRatePercent}%`,
      subText: 'Under 1 Hour',
      icon: MessageSquare,
      color: 'emerald'
    },
    {
      id: 'completion_rate',
      label: 'Completion Rate',
      value: `${stats.completionRatePercent}%`,
      subText: 'On-time Delivery',
      icon: Percent,
      color: 'indigo'
    },
    {
      id: 'success_score',
      label: 'Success Score',
      value: `${stats.successScorePercent}%`,
      subText: 'Top Rated Badge',
      icon: Award,
      color: 'amber'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
      {statList.map((st) => {
        const IconComp = st.icon;
        return (
          <div
            key={st.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {st.label}
              </span>
              <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300">
                <IconComp className="w-4 h-4" />
              </div>
            </div>

            <div>
              <p className="font-heading font-black text-xl text-slate-900 dark:text-white tracking-tight">
                {st.value}
              </p>
              <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                {st.subText}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
