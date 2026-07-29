import React, { useState } from 'react';
import {
  LayoutDashboard,
  Video,
  FileVideo,
  Wallet,
  User,
  Trophy,
  MessageSquare,
  Bell,
  BarChart3,
  Sparkles,
  Settings,
  Plus,
  Download,
  DollarSign,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Share2,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Campaign, ClipSubmission } from '../../types';

// Child components
import { StatCards17 } from './StatCards17';
import { CampaignMarketplace } from './CampaignMarketplace';
import { ClipSubmissionsManager } from './ClipSubmissionsManager';
import { EarningsAndWithdrawals } from './EarningsAndWithdrawals';
import { ClipperPortfolio } from './ClipperPortfolio';
import { ClipperLeaderboard } from './ClipperLeaderboard';
import { ClipperMessages } from './ClipperMessages';
import { ClipperNotifications } from './ClipperNotifications';
import { ClipperAnalytics } from './ClipperAnalytics';
import { AIClipperAssistant } from './AIClipperAssistant';
import { ClipperSettings } from './ClipperSettings';

// Modals
import { CampaignDetailsModal } from './CampaignDetailsModal';
import { VideoDownloader } from './VideoDownloader';
import { UploadClipModal } from './UploadClipModal';
import { SubmissionTimelineModal } from './SubmissionTimelineModal';

export const ClipperDashboard: React.FC = () => {
  const { currentUser, campaigns, submissions, balanceKES, balanceUSD, unreadNotifsCount } = useApp();

  const [activeTab, setActiveTab] = useState<
    'home' | 'marketplace' | 'submissions' | 'earnings' | 'portfolio' | 'leaderboard' | 'messages' | 'notifications' | 'analytics' | 'ai_assistant' | 'settings'
  >('home');

  // Modal States
  const [selectedCampaignForDetails, setSelectedCampaignForDetails] = useState<Campaign | null>(null);
  const [selectedCampaignForDownload, setSelectedCampaignForDownload] = useState<Campaign | null>(null);
  const [selectedCampaignForUpload, setSelectedCampaignForUpload] = useState<Campaign | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [selectedSubmissionTimeline, setSelectedSubmissionTimeline] = useState<ClipSubmission | null>(null);

  // Quick Action Helpers
  const handleOpenUploader = (campaign?: Campaign) => {
    if (campaign) {
      setSelectedCampaignForUpload(campaign);
    } else {
      setSelectedCampaignForUpload(campaigns[0] || null);
    }
    setIsUploadModalOpen(true);
  };

  const handleOpenDownloader = (campaign: Campaign) => {
    setSelectedCampaignForDownload(campaign);
  };

  const handleSelectCampaign = (campaign: Campaign) => {
    setSelectedCampaignForDetails(campaign);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Header & Tab Navigation Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* User Identity & Welcome */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-lg shadow-md shadow-indigo-500/20 overflow-hidden relative">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-slate-900 dark:text-white">
                {currentUser.name}
              </h1>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                PRO CLIPPER
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Wallet Balance: <span className="font-extrabold text-emerald-600 dark:text-emerald-400">KES {balanceKES.toLocaleString()}</span> (USD ${balanceUSD.toLocaleString()})
            </p>
          </div>
        </div>

        {/* Global Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenUploader()}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Submit Clip
          </button>
          
          <button
            onClick={() => setActiveTab('earnings')}
            className="px-4 py-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs border border-emerald-500/20 flex items-center gap-1.5 transition-all"
          >
            <Wallet className="w-4 h-4" /> Withdraw
          </button>
        </div>

      </div>

      {/* Main Tab Navigation Pills */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 shadow-xs flex items-center gap-1 overflow-x-auto">
        {[
          { id: 'home', label: 'Home Dashboard', icon: LayoutDashboard },
          { id: 'marketplace', label: 'Campaign Bounties', icon: Video },
          { id: 'submissions', label: 'Submissions', icon: FileVideo },
          { id: 'earnings', label: 'Earnings & Wallet', icon: Wallet },
          { id: 'portfolio', label: 'Portfolio', icon: User },
          { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
          { id: 'messages', label: 'Messages', icon: MessageSquare },
          { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifsCount },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'ai_assistant', label: 'AI Suite', icon: Sparkles },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-2 relative ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge ? (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT AREA */}
      <div className="space-y-6">
        
        {/* HOME DASHBOARD TAB */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            
            {/* Welcome Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 relative z-10">
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full">
                  ⚡ Kenyan Creator Economy Leaderboard
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Welcome Back, {currentUser.name}! 👋
                </h2>
                <p className="text-xs text-indigo-200 max-w-xl leading-relaxed">
                  You have <span className="font-bold text-white">KES {balanceKES.toLocaleString()}</span> available in your wallet. 3 campaign bounties match your high viral retention score today!
                </p>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
                >
                  <Video className="w-4 h-4" /> Browse Bounties
                </button>
              </div>
            </div>

            {/* Performance Stat Cards (17 metrics) */}
            <StatCards17 />

            {/* Recommended Bounties & Recent Submissions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recommended Campaigns */}
              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-indigo-500" /> Recommended Campaign Bounties
                  </h3>
                  <button
                    onClick={() => setActiveTab('marketplace')}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View All Bounties
                  </button>
                </div>

                <div className="space-y-3">
                  {campaigns.slice(0, 3).map(camp => (
                    <div
                      key={camp.id}
                      onClick={() => handleSelectCampaign(camp)}
                      className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={camp.brandLogo} alt={camp.brandName} className="w-10 h-10 rounded-xl object-cover border" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white truncate group-hover:text-indigo-600">
                            {camp.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {camp.brandName} • {camp.category}
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Per Clip</span>
                        <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                          KES {(camp.paymentPerClipKES || 3500).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Submissions */}
              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileVideo className="w-4 h-4 text-indigo-500" /> Recent Clip Submissions
                  </h3>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Manage Submissions
                  </button>
                </div>

                <div className="space-y-3">
                  {submissions.slice(0, 3).map(sub => (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubmissionTimeline(sub)}
                      className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={sub.thumbnail} alt={sub.clipTitle} className="w-12 h-9 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                            {sub.clipTitle}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {sub.submittedAt} • Status: <span className="text-indigo-500 font-bold">{sub.status}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                          KES {(sub.payoutKES || 2500).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* MARKETPLACE TAB */}
        {activeTab === 'marketplace' && (
          <CampaignMarketplace
            onSelectCampaign={handleSelectCampaign}
            onOpenUploader={handleOpenUploader}
            onOpenDownloader={handleOpenDownloader}
          />
        )}

        {/* SUBMISSIONS TAB */}
        {activeTab === 'submissions' && (
          <ClipSubmissionsManager onOpenUploader={() => handleOpenUploader()} />
        )}

        {/* EARNINGS TAB */}
        {activeTab === 'earnings' && <EarningsAndWithdrawals />}

        {/* PORTFOLIO TAB */}
        {activeTab === 'portfolio' && <ClipperPortfolio />}

        {/* LEADERBOARD TAB */}
        {activeTab === 'leaderboard' && <ClipperLeaderboard />}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && <ClipperMessages />}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && <ClipperNotifications />}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && <ClipperAnalytics />}

        {/* AI SUITE TAB */}
        {activeTab === 'ai_assistant' && <AIClipperAssistant />}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && <ClipperSettings />}

      </div>

      {/* ALL MODALS */}
      <CampaignDetailsModal
        campaign={selectedCampaignForDetails}
        isOpen={!!selectedCampaignForDetails}
        onClose={() => setSelectedCampaignForDetails(null)}
        onOpenDownloader={handleOpenDownloader}
        onOpenUploader={handleOpenUploader}
      />

      <VideoDownloader
        campaign={selectedCampaignForDownload}
        isOpen={!!selectedCampaignForDownload}
        onClose={() => setSelectedCampaignForDownload(null)}
      />

      <UploadClipModal
        campaign={selectedCampaignForUpload}
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <SubmissionTimelineModal
        submission={selectedSubmissionTimeline}
        isOpen={!!selectedSubmissionTimeline}
        onClose={() => setSelectedSubmissionTimeline(null)}
      />

    </div>
  );
};
