import React, { useState } from 'react';
import {
  Sparkles,
  Briefcase,
  Wallet,
  CheckCircle2,
  Clock,
  MessageSquare,
  Bell,
  Star,
  FileCheck,
  TrendingUp,
  Award,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import {
  FreelanceService,
  FreelanceOrder,
  JobPosting,
  FreelanceStatSummary
} from '../../types/freelancer';
import { FreelancerStatCards } from './FreelancerStatCards';

interface FreelancerDashboardViewProps {
  stats: FreelanceStatSummary;
  services: FreelanceService[];
  orders: FreelanceOrder[];
  jobs: JobPosting[];
  onOpenCreateService: () => void;
  onOpenOrderModal: (order: FreelanceOrder) => void;
  onOpenWallet: () => void;
  onOpenMessages: () => void;
}

export const FreelancerDashboardView: React.FC<FreelancerDashboardViewProps> = ({
  stats,
  services,
  orders,
  jobs,
  onOpenCreateService,
  onOpenOrderModal,
  onOpenWallet,
  onOpenMessages
}) => {
  const [orderFilter, setOrderFilter] = useState<'all' | 'in_progress' | 'delivered' | 'completed' | 'cancelled'>('all');

  const profileCompletionPercent = 95;

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-600/30 border-2 border-indigo-400 flex items-center justify-center font-black text-2xl text-indigo-300">
              FL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-xl sm:text-2xl tracking-tight">
                  Freelancer Studio Portal
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30">
                  Top Rated Pro
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-1">
                You have <span className="font-bold text-white">{orders.filter(o => o.status === 'in_progress').length} active orders</span> in progress and <span className="font-bold text-white">{jobs.length} open client jobs</span> available.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenWallet}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md border border-white/20 transition-all"
            >
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Wallet: {stats.monthlyRevenueKES.toLocaleString()} KES</span>
            </button>

            <button
              onClick={onOpenCreateService}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Service Gig</span>
            </button>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <span className="font-bold text-indigo-200 whitespace-nowrap">Profile Score: {profileCompletionPercent}%</span>
            <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-full"
                style={{ width: `${profileCompletionPercent}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] text-indigo-300">
            Top 1% Rated Freelancer Badge Active
          </span>
        </div>
      </div>

      {/* STAT CARDS SECTION */}
      <div className="space-y-3">
        <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
          Freelancer Analytics & Key Performance Summary
        </h3>
        <FreelancerStatCards stats={stats} />
      </div>

      {/* ORDERS MANAGEMENT BOARD */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
              Freelance Client Orders ({filteredOrders.length})
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(['all', 'in_progress', 'delivered', 'completed', 'cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setOrderFilter(st)}
                className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-colors ${
                  orderFilter === st
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No orders found for this status filter.</p>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {ord.serviceTitle}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 capitalize">
                      {ord.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    Client: <span className="font-bold text-slate-700 dark:text-slate-300">{ord.clientName}</span> • Package: <span className="font-bold text-indigo-600 dark:text-indigo-400">{ord.servicePackageName}</span> • Deadline: <span className="font-bold text-slate-700 dark:text-slate-300">{ord.deadlineDate}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-heading font-black text-sm text-emerald-600 dark:text-emerald-400">
                    {ord.priceKES.toLocaleString()} KES
                  </span>

                  <button
                    onClick={() => onOpenOrderModal(ord)}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1 shadow-2xs"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Manage Order</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
};
