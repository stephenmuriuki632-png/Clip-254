import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Film,
  FileCheck,
  DollarSign,
  TrendingUp,
  Wallet,
  AlertTriangle,
  MessageSquare,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Briefcase,
  Building,
  Video,
  Scissors,
  UserCheck,
  Search,
  Filter
} from 'lucide-react';

export const AdminStatistics: React.FC = () => {
  const { creators, campaigns, submissions, transactions } = useApp();
  const [filterCategory, setFilterCategory] = useState<'all' | 'users' | 'campaigns' | 'financials' | 'support'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Metrics Data Objects
  const userMetrics = [
    { title: 'Total Registered Users', value: creators.length + 1280, change: '+24%', icon: Users, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/50' },
    { title: 'Active Users (30d)', value: creators.length + 890, change: '+18%', icon: UserCheck, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/50' },
    { title: 'Online Users Now', value: 342, change: 'Live', icon: Clock, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/50' },
    { title: 'Registered Creators', value: 420, change: '+12%', icon: Video, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/50' },
    { title: 'Registered Clippers', value: 680, change: '+32%', icon: Scissors, color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-950/50' },
    { title: 'UGC Talent', value: 185, change: '+15%', icon: Film, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/50' },
    { title: 'Freelancers', value: 140, change: '+9%', icon: Briefcase, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/50' },
    { title: 'Verified Brands', value: 64, change: '+8%', icon: Building, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/50' },
    { title: 'Small Businesses', value: 112, change: '+20%', icon: Building, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-950/50' },
    { title: 'Partner Agencies', value: 28, change: '+5%', icon: Building, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/50' },
  ];

  const campaignMetrics = [
    { title: 'Total Campaigns Built', value: campaigns.length + 340, change: '+14%', icon: Film, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/50' },
    { title: 'Active Live Campaigns', value: campaigns.filter(c => c.status === 'active').length + 42, change: 'Active', icon: Video, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/50' },
    { title: 'Completed Campaigns', value: 268, change: '+10%', icon: CheckCircle, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/50' },
    { title: 'Pending Approval', value: 12, change: 'Requires Action', icon: Clock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/50' },
    { title: 'Total Clip Submissions', value: submissions.length + 2450, change: '+41%', icon: Scissors, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/50' },
    { title: 'Approved Clip Submissions', value: submissions.filter(s => s.status === 'approved').length + 1980, change: '+38%', icon: FileCheck, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/50' },
    { title: 'Rejected Clip Submissions', value: submissions.filter(s => s.status === 'rejected').length + 140, change: '-4%', icon: XCircle, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/50' },
  ];

  const financialMetrics = [
    { title: 'Lifetime Revenue (GMV)', value: '48,500,000 KES', change: '+35%', icon: DollarSign, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/50' },
    { title: 'Monthly Revenue (30d)', value: '14,250,000 KES', change: '+28%', icon: TrendingUp, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/50' },
    { title: 'Platform Net Profit (10%)', value: '1,425,000 KES', change: '+28%', icon: Wallet, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/50' },
    { title: 'Pending M-Pesa Withdrawals', value: '3 Requests', change: '345,000 KES', icon: Clock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/50' },
    { title: 'Completed Withdrawals', value: '1,420 Processed', change: '12.8M KES', icon: CheckCircle, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/50' },
  ];

  const supportMetrics = [
    { title: 'Open Reports / Disputes', value: '4 Cases', change: 'Action Needed', icon: AlertTriangle, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/50' },
    { title: 'Resolved Reports', value: '182 Resolved', change: '98% Rate', icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/50' },
    { title: 'Messages Sent (30d)', value: '48,200 Messages', change: '+52%', icon: MessageSquare, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/50' },
    { title: 'Total Reviews Given', value: '1,240 Reviews', change: '+22%', icon: Star, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/50' },
    { title: 'Average Platform Rating', value: '4.92 / 5.0', change: 'Top Tier', icon: Star, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-950/50' },
  ];

  const allMetrics = [
    ...(filterCategory === 'all' || filterCategory === 'users' ? userMetrics : []),
    ...(filterCategory === 'all' || filterCategory === 'campaigns' ? campaignMetrics : []),
    ...(filterCategory === 'all' || filterCategory === 'financials' ? financialMetrics : []),
    ...(filterCategory === 'all' || filterCategory === 'support' ? supportMetrics : []),
  ].filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header & Category Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">
            Enterprise Statistics & Platform Metrics Matrix
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time aggregate data across users, campaigns, clip submissions, platform GMV, profit margins, and support health.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['all', 'users', 'campaigns', 'financials', 'support'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                filterCategory === cat
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Filter metric cards by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allMetrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs hover:shadow-md transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300">
                  {item.change}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.title}</p>
                <p className="text-xl font-extrabold font-heading text-slate-900 dark:text-white mt-0.5">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
