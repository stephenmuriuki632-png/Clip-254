import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Eye, 
  Percent, 
  DollarSign, 
  Users, 
  Calendar,
  Award,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  Legend 
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const CreatorAnalytics: React.FC = () => {
  const { campaigns, submissions } = useApp();

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Performance Trend Data
  const trendData = [
    { day: 'Mon', views: 42000, spending: 3500, submissions: 12 },
    { day: 'Tue', views: 68000, spending: 5000, submissions: 18 },
    { day: 'Wed', views: 95000, spending: 8000, submissions: 25 },
    { day: 'Thu', views: 120000, spending: 10500, submissions: 32 },
    { day: 'Fri', views: 185000, spending: 15000, submissions: 48 },
    { day: 'Sat', views: 240000, spending: 18500, submissions: 62 },
    { day: 'Sun', views: 310000, spending: 22000, submissions: 75 }
  ];

  // Spending & Budget Data
  const categoryData = [
    { name: 'Gaming', budget: 45000, color: '#6366f1' },
    { name: 'Podcasts', budget: 30000, color: '#3b82f6' },
    { name: 'Lifestyle', budget: 25000, color: '#10b981' },
    { name: 'Tech & AI', budget: 35000, color: '#f59e0b' },
    { name: 'Music', budget: 15000, color: '#ec4899' }
  ];

  // Top Performing Clippers
  const topClippers = [
    { name: 'Kevin Omondi', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', approvedClips: 24, views: '1.2M', totalEarned: 60000 },
    { name: 'Amina Mohamed', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', approvedClips: 18, views: '850K', totalEarned: 45000 },
    { name: 'Brian Kipruto', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', approvedClips: 15, views: '620K', totalEarned: 37500 },
    { name: 'Stacy Wanjiru', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', approvedClips: 12, views: '480K', totalEarned: 30000 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
              <BarChart2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold font-heading text-white">Creator Analytics & Growth Engine</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Realtime campaign performance, clip views growth, budget allocation efficiency, and top editor leaderboards.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-2xl border border-slate-700">
          {(['7d', '30d', '90d', '1y'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                timeRange === r
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Performance Area Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white font-heading">
              Organic View Growth & Daily Spending Trend
            </h3>
            <p className="text-xs text-slate-400">
              Correlating campaign budget spent vs viral clip view counts generated across TikTok & Reels.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
              <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
              Clip Views
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              Escrow Spent (KES)
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#334155', 
                  borderRadius: '12px', 
                  color: '#fff',
                  fontSize: '12px'
                }} 
              />
              <Area yAxisId="left" type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" name="Views" />
              <Area yAxisId="right" type="monotone" dataKey="spending" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" name="Spending (KES)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid of Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Budget Allocation Pie Chart */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white font-heading">
            Budget Allocation by Content Category
          </h3>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="budget"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`${Number(val).toLocaleString()} KES`, 'Budget']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Clippers Leaderboard */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white font-heading">
              Top Performing Video Editors
            </h3>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
              Highest Approval Rate
            </span>
          </div>

          <div className="space-y-3">
            {topClippers.map((clipper, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400 w-4 font-mono">#{idx + 1}</span>
                  <img
                    src={clipper.avatar}
                    alt={clipper.name}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/20"
                  />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{clipper.name}</p>
                    <p className="text-[10px] text-slate-400">{clipper.approvedClips} Clips Approved • {clipper.views} Organic Views</p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <p className="font-bold text-emerald-600 dark:text-emerald-400">{clipper.totalEarned.toLocaleString()} KES</p>
                  <p className="text-[9px] text-slate-400">Total Payout</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
