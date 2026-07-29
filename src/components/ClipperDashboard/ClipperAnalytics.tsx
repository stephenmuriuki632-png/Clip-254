import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle2,
  Eye,
  Calendar
} from 'lucide-react';

export const ClipperAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  // Daily Earnings Data
  const earningsData = [
    { day: 'Mon', earnings: 3500, views: 12000, clips: 1 },
    { day: 'Tue', earnings: 7000, views: 24000, clips: 2 },
    { day: 'Wed', earnings: 0, views: 18000, clips: 0 },
    { day: 'Thu', earnings: 10500, views: 42000, clips: 3 },
    { day: 'Fri', earnings: 14000, views: 65000, clips: 4 },
    { day: 'Sat', earnings: 8000, views: 38000, clips: 2 },
    { day: 'Sun', earnings: 12500, views: 51000, clips: 3 }
  ];

  // Submission Status Distribution
  const submissionDistribution = [
    { name: 'Approved & Paid', value: 48, color: '#10B981' },
    { name: 'Under Review', value: 3, color: '#F59E0B' },
    { name: 'Revision Requested', value: 2, color: '#EAB308' },
    { name: 'Rejected', value: 3, color: '#EF4444' }
  ];

  // Category Revenue Performance
  const categoryData = [
    { category: 'Tech & Gadgets', revenueKES: 65000, clips: 18 },
    { category: 'Gaming Streams', revenueKES: 42000, clips: 14 },
    { category: 'Podcast Clips', revenueKES: 28000, clips: 10 },
    { category: 'Comedy & Skits', revenueKES: 10000, clips: 6 }
  ];

  // Views & Profile Reach
  const viewsReachData = [
    { week: 'W1', portfolioViews: 1200, profileViews: 450 },
    { week: 'W2', portfolioViews: 2400, profileViews: 890 },
    { week: 'W3', portfolioViews: 3800, profileViews: 1400 },
    { week: 'W4', portfolioViews: 5000, profileViews: 1060 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Analytics Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" /> Clipper Performance Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Realtime tracking of clip approval rates, revenue growth, and portfolio views.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          {(['7d', '30d', '90d'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === t
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Earnings Area Chart */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Revenue & Earnings Growth
              </h3>
              <p className="text-[11px] text-slate-400">Daily KES payout generated from approved clips</p>
            </div>
            <span className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
              +28% this week
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                  formatter={(value: any) => [`KES ${Number(value).toLocaleString()}`, 'Earnings']}
                />
                <Area type="monotone" dataKey="earnings" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Submission Approval Pie Distribution */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" /> Approval Rate & Submission Breakdown
            </h3>
            <p className="text-[11px] text-slate-400">Current 94% approval rating ratio</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={submissionDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={5}
                >
                  {submissionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Revenue Bar Chart */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-500" /> Revenue by Campaign Category
            </h3>
            <p className="text-[11px] text-slate-400">Highest grossing content niches</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="category" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                  formatter={(value: any) => [`KES ${Number(value).toLocaleString()}`, 'Revenue']}
                />
                <Bar dataKey="revenueKES" fill="#6366F1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Portfolio & Profile Views Area Chart */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-pink-500" /> Portfolio & Profile Traffic
            </h3>
            <p className="text-[11px] text-slate-400">Brand visits to your public profile</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsReachData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="week" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                />
                <Area type="monotone" dataKey="portfolioViews" stroke="#EC4899" fill="#EC4899" fillOpacity={0.2} />
                <Area type="monotone" dataKey="profileViews" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
