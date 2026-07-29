import React from 'react';
import {
  Sparkles,
  Briefcase,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  Bell,
  MessageSquare,
  AlertCircle,
  FileCheck,
  Send,
  Video,
  Star
} from 'lucide-react';
import {
  UGCProfileData,
  UGCBooking,
  UGCApplication,
  UGCAnalyticsData
} from '../../types';
import { UGCStatCards } from './UGCStatCards';

interface UGCCreatorDashboardViewProps {
  creator: UGCProfileData;
  bookings: UGCBooking[];
  applications: UGCApplication[];
  analytics: UGCAnalyticsData;
  onOpenBookingContract: (booking: UGCBooking) => void;
  onOpenWallet: () => void;
  onOpenMessages: () => void;
  onOpenEditProfile: () => void;
}

export const UGCCreatorDashboardView: React.FC<UGCCreatorDashboardViewProps> = ({
  creator,
  bookings,
  applications,
  analytics,
  onOpenBookingContract,
  onOpenWallet,
  onOpenMessages,
  onOpenEditProfile
}) => {
  const profileCompletionPercent = 92;

  const todayTasks = [
    { id: 't1', text: 'Upload video draft for M-Pesa Virtual Card brief', status: 'pending', due: 'Today, 5:00 PM' },
    { id: 't2', text: 'Review revision notes from Jumia Kenya', status: 'completed', due: 'Done' },
    { id: 't3', text: 'Submit proposal for Nivea Sunscreen campaign', status: 'pending', due: 'Tomorrow' }
  ];

  const activeBookings = bookings.filter(b => b.status === 'in_progress' || b.status === 'revision_requested' || b.status === 'submitted');
  const completedBookings = bookings.filter(b => b.status === 'completed');

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={creator.avatar}
              alt={creator.displayName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-indigo-400 object-cover shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-xl sm:text-2xl tracking-tight">
                  Welcome back, {creator.displayName}!
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Pro Creator
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-1">
                You have <span className="font-bold text-white">{activeBookings.length} active brief orders</span> in progress and <span className="font-bold text-white">{applications.length} pending application</span>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenWallet}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md border border-white/20 transition-all"
            >
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Wallet: {analytics.monthlyEarningsKES.toLocaleString()} KES</span>
            </button>

            <button
              onClick={onOpenEditProfile}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Edit UGC Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <span className="font-bold text-indigo-200 whitespace-nowrap">Profile Completion: {profileCompletionPercent}%</span>
            <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-full"
                style={{ width: `${profileCompletionPercent}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] text-indigo-300">
            Add 1 more case study video to reach 100% profile score!
          </span>
        </div>
      </div>

      {/* STAT CARDS SECTION */}
      <div className="space-y-3">
        <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
          Creator Performance Dashboard
        </h3>
        <UGCStatCards profile={creator} analytics={analytics} />
      </div>

      {/* TWO COLUMN GRID: Today's Tasks & Wallet/Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Tasks & Active Campaigns (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Tasks Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                  Today's Production Tasks
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">3 Pending Actions</span>
            </div>

            <div className="space-y-2.5">
              {todayTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={t.status === 'completed'}
                      readOnly
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <span className={`font-semibold ${t.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {t.text}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                    {t.due}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Brief Orders & Campaigns */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                  Active Brief Orders ({activeBookings.length})
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {activeBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {b.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {b.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      Brand: <span className="font-bold text-slate-700 dark:text-slate-300">{b.brandName}</span> • Deadline: <span className="font-bold text-slate-700 dark:text-slate-300">{b.deadlineDate}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-heading font-black text-sm text-emerald-600 dark:text-emerald-400">
                      {b.totalPriceKES.toLocaleString()} KES
                    </span>

                    <button
                      onClick={() => onOpenBookingContract(b)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1 shadow-2xs"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>View Brief & Contract</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar: Wallet Balance & Quick Messages */}
        <div className="space-y-6">
          
          {/* Wallet Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Wallet Overview</span>
              <Wallet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 block">Available Balance</span>
              <p className="font-heading font-black text-3xl text-emerald-600 dark:text-emerald-400 tracking-tight">
                {analytics.monthlyEarningsKES.toLocaleString()} KES
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Pending Escrow: <span className="font-bold text-slate-700 dark:text-slate-300">28,000 KES</span>
              </p>
            </div>

            <button
              onClick={onOpenWallet}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-colors"
            >
              Withdraw via M-Pesa
            </button>
          </div>

          {/* Pending Applications Widget */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                Pending Applications ({applications.length})
              </h4>
            </div>

            <div className="space-y-2">
              {applications.map((app) => (
                <div key={app.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 space-y-1 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">{app.campaignTitle}</span>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Bid: {app.proposedPriceKES.toLocaleString()} KES</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold uppercase">
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
