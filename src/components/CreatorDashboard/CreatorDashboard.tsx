import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Megaphone, 
  Film, 
  Wallet, 
  BarChart2, 
  MessageSquare, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Award, 
  Star, 
  Users, 
  ChevronRight,
  TrendingUp,
  RotateCcw,
  ShieldCheck,
  Zap,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCards } from './StatCards';
import { CampaignStudio } from './CampaignStudio';
import { SubmissionsManager } from './SubmissionsManager';
import { CreatorWallet } from './CreatorWallet';
import { CreatorAnalytics } from './CreatorAnalytics';
import { CreatorMessages } from './CreatorMessages';
import { CreatorSettings } from './CreatorSettings';
import { CampaignFormModal } from './CampaignFormModal';
import { SubmissionReviewModal } from './SubmissionReviewModal';

export const CreatorDashboard: React.FC = () => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    campaigns, 
    submissions, 
    notifications, 
    unreadNotificationsCount, 
    markAllNotificationsAsRead, 
    balanceKES 
  } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [selectedSubmissionForReview, setSelectedSubmissionForReview] = useState<any>(null);

  // Quick Stats overview
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const pendingSubmissions = submissions.filter(s => s.status === 'pending' || s.status === 'under_review');
  const recentPayments = submissions.filter(s => s.status === 'approved' || s.status === 'paid').slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      
      {/* Top Bar Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between">
        
        {/* Left: Brand / View Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-extrabold flex items-center justify-center font-heading text-sm shadow-md shadow-indigo-500/20">
            CK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-sm text-slate-900 dark:text-white font-heading">
                ClipKenya Creator Studio
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase border border-indigo-200/60 dark:border-indigo-800/60">
                Brand Portal
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Scale your brand reach with viral video clippers & M-Pesa escrow.
            </p>
          </div>
        </div>

        {/* Right: Actions, Notifications, User */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>New Video Brief</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifDrawerOpen(!isNotifDrawerOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Notification Drawer Dropdown */}
            {isNotifDrawerOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white font-heading">
                    Recent System Notifications
                  </h4>
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                  {notifications.slice(0, 5).map((n) => (
                    <div key={n.id} className="py-2.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{n.title}</span>
                        <span className="text-[9px] text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/20"
            />
            <div className="hidden md:block text-left text-xs leading-tight">
              <p className="font-bold text-slate-900 dark:text-white font-heading">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400">{currentUser.handle}</p>
            </div>
          </div>

        </div>

      </header>

      {/* Main Body with Navigation Sub-Bar */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'campaigns'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Campaign Studio</span>
            <span className="px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-[10px]">
              {campaigns.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'submissions'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Clips Review</span>
            {pendingSubmissions.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px]">
                {pendingSubmissions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'wallet'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Wallet & Escrow</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'messages'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messages</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Tab 1: DASHBOARD HOME */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Welcome Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="relative z-10 space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Escrow Active • M-Pesa Ready
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-white">
                  Welcome back, {currentUser.name}! 👋
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  You have <span className="font-bold text-amber-400">{pendingSubmissions.length} pending video submissions</span> awaiting review. Your active campaigns generated over <span className="font-bold text-indigo-300">1.8M organic views</span> this month.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="relative z-10 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Campaign Brief</span>
                </button>
                <button
                  onClick={() => setActiveTab('wallet')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  <span>Wallet ({balanceKES.toLocaleString()} KES)</span>
                </button>
              </div>
            </div>

            {/* Stat Cards Grid (All 15 metrics) */}
            <StatCards />

            {/* Dashboard 2-Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Recent Campaigns & Submissions (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Active Campaigns Card */}
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white font-heading">
                      Active Bounty Campaigns
                    </h3>
                    <button
                      onClick={() => setActiveTab('campaigns')}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <span>View All ({campaigns.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {activeCampaigns.slice(0, 3).map((c) => (
                      <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img src={c.brandLogo} alt={c.title} className="w-10 h-10 rounded-xl object-cover" />
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white font-heading line-clamp-1">{c.title}</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5">{c.category} • {c.applicantsCount} clippers active</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400">{c.budgetKES.toLocaleString()} KES</span>
                          <p className="text-[9px] text-slate-400">Deadline: {c.deadline}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submissions Requiring Review */}
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white font-heading">
                      Recent Clip Submissions Awaiting Approval
                    </h3>
                    <button
                      onClick={() => setActiveTab('submissions')}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <span>Review All</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {submissions.slice(0, 3).map((s) => (
                      <div key={s.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img src={s.thumbnail} alt={s.clipTitle} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{s.clipTitle}</h4>
                            <p className="text-[10px] text-slate-400">By {s.editorName} • {s.views.toLocaleString()} views</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedSubmissionForReview(s);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors"
                        >
                          Review
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Deadlines, Payments & Activity (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Upcoming Deadlines */}
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white font-heading flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Upcoming Campaign Deadlines</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    {campaigns.slice(0, 3).map((c) => (
                      <div key={c.id} className="p-3 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">{c.title}</p>
                          <p className="text-[10px] text-amber-700 dark:text-amber-400">Due: {c.deadline}</p>
                        </div>
                        <span className="px-2 py-1 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                          Active Brief
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Payout Settlements */}
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white font-heading flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Recent M-Pesa Payouts</span>
                    </h3>
                    <button onClick={() => setActiveTab('wallet')} className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      Wallet
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {recentPayments.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{p.editorName}</p>
                          <p className="text-[10px] text-slate-400">Approved • {p.bountyTitle}</p>
                        </div>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          +{(p.payoutKES || 2500).toLocaleString()} KES
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Tab 2: CAMPAIGN STUDIO */}
        {activeTab === 'campaigns' && <CampaignStudio />}

        {/* Tab 3: SUBMISSIONS REVIEW */}
        {activeTab === 'submissions' && <SubmissionsManager />}

        {/* Tab 4: WALLET & ESCROW */}
        {activeTab === 'wallet' && <CreatorWallet />}

        {/* Tab 5: ANALYTICS */}
        {activeTab === 'analytics' && <CreatorAnalytics />}

        {/* Tab 6: MESSAGES */}
        {activeTab === 'messages' && <CreatorMessages />}

        {/* Tab 7: SETTINGS */}
        {activeTab === 'settings' && <CreatorSettings />}

      </div>

      {/* Global Campaign Create Modal */}
      {isCreateModalOpen && (
        <CampaignFormModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      {/* Global Submission Review Modal */}
      {selectedSubmissionForReview && (
        <SubmissionReviewModal
          submission={selectedSubmissionForReview}
          onClose={() => setSelectedSubmissionForReview(null)}
        />
      )}

    </div>
  );
};
