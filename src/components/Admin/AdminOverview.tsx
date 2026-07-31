import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Users,
  Film,
  FileCheck,
  ShieldCheck,
  BellRing,
  RefreshCw,
  Wallet,
  Building,
  Sparkles,
  Zap
} from 'lucide-react';

interface AdminOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigateTab }) => {
  const {
    creators,
    campaigns,
    submissions,
    transactions,
    notifications,
    balanceKES,
    balanceUSD,
  } = useApp();

  const activeCampaigns = campaigns.filter((c) => c.status === 'active');
  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');
  const totalRevenueKES = transactions.reduce((acc, t) => acc + (t.type === 'earning' ? t.amountKES : 0), 1425000);

  return (
    <div className="space-y-6">
      {/* 1. Welcome Banner & Platform Status Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Production Environment
              </span>
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
                Enterprise v4.2
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              ClipForge Governance & Executive Control Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time platform metrics, automated M-Pesa escrow reconciliation, identity verification queues, and system audit monitoring.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('users')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md transition-all flex items-center gap-2 border border-white/10"
            >
              <Users className="w-4 h-4 text-indigo-300" />
              <span>User Directory</span>
            </button>
            <button
              onClick={() => onNavigateTab('financials')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              <span>Financial Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Platform Health & Realtime Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-wider">Database Status</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> 99.99%
            </span>
          </div>
          <p className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Supabase PostgreSQL</p>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[99%]" />
          </div>
          <p className="text-[10px] text-slate-400">27 RLS Tables • Primary Region EU-West</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-wider">M-Pesa B2C / Express</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Operational
            </span>
          </div>
          <p className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Safaricom Daraja API</p>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[100%]" />
          </div>
          <p className="text-[10px] text-slate-400">Instant Escrow Payout Latency ~ 1.2s</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-wider">Storage Usage</span>
            <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
              128 GB / 1 TB
            </span>
          </div>
          <p className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Media Buckets (7)</p>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full w-[13%]" />
          </div>
          <p className="text-[10px] text-slate-400">Videos, Thumbnails, Portfolios & UGC</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-wider">AI Gemini Services</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Operational
            </span>
          </div>
          <p className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Gemini 2.5 Flash</p>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[100%]" />
          </div>
          <p className="text-[10px] text-slate-400">Video Scripting & Content Moderation</p>
        </div>
      </div>

      {/* 3. Live Statistics Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Ecosystem Users</p>
          <p className="text-xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">{creators.length + 120}</p>
          <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">↑ 18% this month</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Campaigns</p>
          <p className="text-xl font-extrabold font-heading text-indigo-600 dark:text-indigo-400 mt-1">{activeCampaigns.length + 12}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Total Bounties Live</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Submissions</p>
          <p className="text-xl font-extrabold font-heading text-amber-500 mt-1">{pendingSubmissions.length + 5}</p>
          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">Review Queue</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly GMV</p>
          <p className="text-xl font-extrabold font-heading text-emerald-600 dark:text-emerald-400 mt-1">14.25M KES</p>
          <p className="text-[10px] text-slate-400 mt-0.5">≈ $109.6k USD</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Platform Net Fees (10%)</p>
          <p className="text-xl font-extrabold font-heading text-purple-600 dark:text-purple-400 mt-1">1,425,000 KES</p>
          <p className="text-[10px] text-purple-500 font-semibold mt-0.5">Direct Profit</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Withdrawals</p>
          <p className="text-xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">3 M-Pesa</p>
          <p className="text-[10px] text-indigo-500 font-semibold mt-0.5">Ready to process</p>
        </div>
      </div>

      {/* 4. Quick Actions Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3 shadow-lg">
        <h3 className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4" />
          <span>Executive Quick Actions</span>
        </h3>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => onNavigateTab('users')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-all border border-slate-700"
          >
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Manage Users</span>
          </button>
          <button
            onClick={() => onNavigateTab('campaigns')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-all border border-slate-700"
          >
            <Film className="w-3.5 h-3.5 text-emerald-400" />
            <span>Approve Campaigns</span>
          </button>
          <button
            onClick={() => onNavigateTab('submissions')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-all border border-slate-700"
          >
            <FileCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Review Submissions</span>
          </button>
          <button
            onClick={() => onNavigateTab('financials')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-all border border-slate-700"
          >
            <Wallet className="w-3.5 h-3.5 text-purple-400" />
            <span>Process Withdrawals</span>
          </button>
          <button
            onClick={() => onNavigateTab('announcements')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-all border border-slate-700"
          >
            <BellRing className="w-3.5 h-3.5 text-sky-400" />
            <span>Broadcast Notice</span>
          </button>
          <button
            onClick={() => onNavigateTab('reports')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-all border border-slate-700"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Resolve Disputes</span>
          </button>
        </div>
      </div>

      {/* 5. Two Column Main Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Pending Approvals & Signups */}
        <div className="space-y-6">
          
          {/* Pending Identity Verification Queue */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Pending Approvals & Verification</span>
              </h3>
              <button
                onClick={() => onNavigateTab('verification')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View Queue</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Kipchumba Chebet', role: 'Bounty Host', location: 'Eldoret', time: '10 mins ago', type: 'Creator Identity' },
                { name: 'Safaricom Innovation Hub', role: 'Verified Brand', location: 'Nairobi', time: '1 hr ago', type: 'Tax & KRA PIN' },
                { name: 'Amina Abdi', role: 'UGC Talent', location: 'Mombasa', time: '3 hrs ago', type: 'ID & M-Pesa' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {item.role} • {item.location} • <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{item.type}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px]">
                      Approve
                    </button>
                    <button className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Ecosystem Signups */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Latest Platform Signups</span>
              </h3>
              <button
                onClick={() => onNavigateTab('users')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View All Users</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {creators.slice(0, 4).map((user) => (
                <div
                  key={user.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user.email} • <span className="uppercase font-semibold text-indigo-600 dark:text-indigo-400">{user.role}</span></p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Recent Withdrawals & Audit Activity */}
        <div className="space-y-6">

          {/* Recent M-Pesa Withdrawals Queue */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Recent M-Pesa Withdrawal Requests</span>
              </h3>
              <button
                onClick={() => onNavigateTab('financials')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View Financials</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { user: 'Kevin Omondi', phone: '+254712345678', amount: '15,000 KES', status: 'Pending Review' },
                { user: 'Faith Mutua', phone: '+254722987654', amount: '42,500 KES', status: 'Approved B2C' },
                { user: 'Brian Wanyama', phone: '+254701112233', amount: '8,200 KES', status: 'Completed' }
              ].map((w, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{w.user}</p>
                    <p className="text-[10px] text-slate-400">{w.phone} • <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{w.amount}</span></p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      w.status === 'Pending Review'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                        : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    }`}
                  >
                    {w.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Logs & System Activity Stream */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Realtime Audit Activity Log</span>
              </h3>
              <button
                onClick={() => onNavigateTab('audit-logs')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Full Logs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                { action: 'ROLE_UPDATE', detail: 'Assigned "Verified Brand" badge to Safaricom', time: '2m ago', user: 'Admin System' },
                { action: 'ESCROW_RELEASE', detail: 'Released 25,000 KES bounty for Campaign #104', time: '14m ago', user: 'Admin System' },
                { action: 'LOGIN_ATTEMPT', detail: 'Successful MFA login from Nairobi (IP: 102.140.x.x)', time: '1h ago', user: 'SuperAdmin' }
              ].map((log, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-indigo-400 font-bold">{log.action}</span>
                    <span className="text-slate-500">{log.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{log.detail}</p>
                  <p className="text-[9px] text-slate-500">Actor: {log.user}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
