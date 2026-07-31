import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Eye, DollarSign, Award, ArrowUpRight, ShieldCheck } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const AnalyticsDashboard: React.FC = () => {
  const { balanceKES, submissions, transactions } = useApp();

  const totalViews = submissions.reduce((acc, s) => acc + (s.views || 0), 0);
  const totalPayoutsKES = transactions.filter(t => t.type === 'payout' || t.type === 'escrow_release').reduce((acc, t) => acc + t.amountKES, 0);
  const totalPayoutsUSD = Math.round((totalPayoutsKES / 130) * 100) / 100;
  const completedDeals = submissions.filter(s => s.status === 'approved' || s.status === 'completed' || s.status === 'paid').length;

  const monthlyEarningsData = [
    { month: 'Current', KES: totalPayoutsKES, views: `${totalViews}` }
  ];

  const platformPerformanceData = [
    { platform: 'TikTok', views: submissions.filter(s => s.platform === 'tiktok').reduce((acc, s) => acc + (s.views || 0), 0) },
    { platform: 'YouTube Shorts', views: submissions.filter(s => s.platform === 'youtube').reduce((acc, s) => acc + (s.views || 0), 0) },
    { platform: 'Instagram Reels', views: submissions.filter(s => s.platform === 'instagram').reduce((acc, s) => acc + (s.views || 0), 0) }
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
              Creator Performance Analytics
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
              Live M-Pesa Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track clip views, bounty payouts, UGC deal completions, and platform growth.
          </p>
        </div>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Clip Views</span>
            <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            {totalViews > 1000000 ? `${(totalViews / 1000000).toFixed(1)}M` : totalViews > 1000 ? `${(totalViews / 1000).toFixed(1)}K` : totalViews}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-bold">
            <TrendingUp className="w-3 h-3" />
            <span>Realtime tracking</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Cumulative Payouts</span>
            <DollarSign className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="font-heading font-extrabold text-2xl text-indigo-600 dark:text-indigo-400">
            {totalPayoutsKES.toLocaleString()} KES
          </p>
          <p className="text-[11px] text-slate-400">≈ ${totalPayoutsUSD.toLocaleString()} USD Earned</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Completed Deals</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">{completedDeals} Orders</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">100% On-Time Delivery</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Available Wallet Balance</span>
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            {balanceKES.toLocaleString()} KES
          </p>
          <span className="text-[10px] text-indigo-700 dark:text-indigo-300 font-semibold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
            Ready for M-Pesa Cashout
          </span>
        </div>
      </div>

      {/* Recharts Charts Section OR Onboarding Cards for 0 Data */}
      {totalViews === 0 && totalPayoutsKES === 0 ? (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
              No analytics data yet
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your real-time view counts, M-Pesa payout trends, and platform performance metrics will automatically populate here as you submit clips or run creator campaigns.
            </p>
          </div>

          {/* Onboarding Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">1</div>
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white font-heading">Submit First Clip or Campaign</h4>
              <p className="text-[11px] text-slate-500">Pick an active stream bounty or post a creator campaign to kick off analytics tracking.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">2</div>
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white font-heading">Real-Time API Sync</h4>
              <p className="text-[11px] text-slate-500">TikTok, YouTube, and Instagram view counters update automatically via live WebHooks.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">3</div>
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white font-heading">M-Pesa Escrow Settlement</h4>
              <p className="text-[11px] text-slate-500">Earnings automatically credit to your wallet and log in the financial ledger.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Monthly Trend Area Chart */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                Monthly Creator Earnings Trend (KES)
              </h3>
              <span className="text-xs text-slate-400 font-medium">Realtime History</span>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyEarningsData}>
                  <defs>
                    <linearGradient id="colorKes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#888888" fontSize={11} />
                  <YAxis stroke="#888888" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="KES" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorKes)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform Share Bar Chart */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                Platform Views Breakdown
              </h3>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="platform" stroke="#888888" fontSize={10} />
                  <YAxis stroke="#888888" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="views" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
