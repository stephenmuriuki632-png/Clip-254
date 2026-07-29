import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Users, DollarSign, Activity, Globe, Film } from 'lucide-react';

const revenueGrowthData = [
  { month: 'Jan', revenue: 4200000, profit: 420000 },
  { month: 'Feb', revenue: 6800000, profit: 680000 },
  { month: 'Mar', revenue: 8500000, profit: 850000 },
  { month: 'Apr', revenue: 10200000, profit: 1020000 },
  { month: 'May', revenue: 12400000, profit: 1240000 },
  { month: 'Jun', revenue: 14250000, profit: 1425000 },
];

const userGrowthData = [
  { month: 'Jan', users: 320, creators: 120, clippers: 180 },
  { month: 'Feb', users: 540, creators: 210, clippers: 310 },
  { month: 'Mar', users: 810, creators: 300, clippers: 480 },
  { month: 'Apr', users: 1120, creators: 410, clippers: 650 },
  { month: 'May', users: 1480, creators: 520, clippers: 860 },
  { month: 'Jun', users: 1850, creators: 640, clippers: 1100 },
];

const categoryData = [
  { name: 'Tech & Gadgets', value: 35, color: '#6366f1' },
  { name: 'Lifestyle & Vlogs', value: 25, color: '#10b981' },
  { name: 'Fintech & M-Pesa', value: 20, color: '#f59e0b' },
  { name: 'Gaming & Streams', value: 12, color: '#ec4899' },
  { name: 'Fashion & Beauty', value: 8, color: '#8b5cf6' },
];

const countryData = [
  { country: 'Kenya', percentage: 78 },
  { country: 'Nigeria', percentage: 12 },
  { country: 'Tanzania', percentage: 5 },
  { country: 'Uganda', percentage: 3 },
  { country: 'Others', percentage: 2 },
];

export const AdminAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Platform Growth & Ecosystem Analytics Studio</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Interactive visual charts for revenue trajectories, user retention, campaign completion velocity, geographic reach and profit margins.
          </p>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Daily Active Users (DAU)</p>
          <p className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">482 Users / day</p>
          <span className="text-[10px] text-emerald-500 font-bold">↑ 22% DAU Growth</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase">30-Day User Retention</p>
          <p className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">84.2%</p>
          <span className="text-[10px] text-indigo-500 font-bold">High Loyalty</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Bounty Conversion Rate</p>
          <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">68.5%</p>
          <span className="text-[10px] text-emerald-500 font-bold">Successful Payouts</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Avg M-Pesa Payout Speed</p>
          <p className="text-lg font-extrabold text-purple-600 dark:text-purple-400 mt-1">1.8 Seconds</p>
          <span className="text-[10px] text-purple-500 font-bold">Instant B2C</span>
        </div>
      </div>

      {/* Chart 1: Revenue & Profit Area Chart */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
        <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Platform Revenue Growth & Net Profit (KES)</span>
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueGrowthData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} KES`, 'Amount']} />
              <Area type="monotone" dataKey="revenue" name="Platform GMV" stroke="#6366f1" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
              <Area type="monotone" dataKey="profit" name="Net Profit (10%)" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: User Registration Trajectory Bar Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Monthly User Acquisition Breakdown</span>
          </h3>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="creators" name="Creators" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clippers" name="Clippers" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Top Niche Categories Pie Chart */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Film className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Popular Content Niche Categories</span>
          </h3>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
