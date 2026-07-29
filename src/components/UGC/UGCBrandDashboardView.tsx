import React, { useState } from 'react';
import {
  Plus,
  Layers,
  Users,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  RotateCcw,
  Star,
  FileCheck,
  Bookmark,
  Sparkles,
  BarChart3,
  Search,
  Filter,
  Eye,
  Check
} from 'lucide-react';
import {
  UGCCampaignDetail,
  UGCProfileData,
  UGCBooking,
  UGCAnalyticsData
} from '../../types';

interface UGCBrandDashboardViewProps {
  campaigns: UGCCampaignDetail[];
  creators: UGCProfileData[];
  bookings: UGCBooking[];
  analytics: UGCAnalyticsData;
  onOpenCreateCampaign: () => void;
  onSelectCreator: (creator: UGCProfileData) => void;
  onOpenBookingContract: (booking: UGCBooking) => void;
  onApproveDelivery?: (bookingId: string) => void;
}

export const UGCBrandDashboardView: React.FC<UGCBrandDashboardViewProps> = ({
  campaigns,
  creators,
  bookings,
  analytics,
  onOpenCreateCampaign,
  onSelectCreator,
  onOpenBookingContract,
  onApproveDelivery
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'campaigns' | 'deliveries' | 'bookmarked' | 'analytics'>('campaigns');

  const brandAnalytics = analytics.brandAnalytics || {
    totalCampaigns: 12,
    activeCreatorsCount: 28,
    totalBudgetSpentKES: 850000,
    conversionRate: 4.2,
    avgROAS: 3.6
  };

  return (
    <div className="space-y-6">
      
      {/* Brand Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold border border-indigo-500/30">
                🏢 Brand Studio Workspace
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight mt-2">
              UGC Campaign & Creator Management
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Post video briefs, review applicant creators, manage milestone contracts, and track ROAS analytics across TikTok & Instagram Reels.
            </p>
          </div>

          <button
            onClick={onOpenCreateCampaign}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create UGC Campaign</span>
          </button>
        </div>

        {/* Brand Key Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Budget Spent</span>
            <span className="font-heading font-extrabold text-lg text-emerald-400">
              {brandAnalytics.totalBudgetSpentKES.toLocaleString()} KES
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Active UGC Briefs</span>
            <span className="font-heading font-extrabold text-lg text-white">
              {campaigns.length} Campaigns
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Hired Creators</span>
            <span className="font-heading font-extrabold text-lg text-indigo-300">
              {brandAnalytics.activeCreatorsCount} Creators
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Avg Campaign ROAS</span>
            <span className="font-heading font-extrabold text-lg text-amber-400">
              {brandAnalytics.avgROAS}x Return
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'campaigns', label: 'My Briefs & Campaigns', icon: Layers },
          { id: 'deliveries', label: 'Deliveries & Approvals', icon: CheckCircle2 },
          { id: 'bookmarked', label: 'Bookmarked Creators', icon: Bookmark },
          { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 }
        ].map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                activeSubTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB: CAMPAIGNS */}
      {activeSubTab === 'campaigns' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 uppercase">
                    {camp.status}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{camp.platform}</span>
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{camp.description}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Budget</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">{camp.budgetKES.toLocaleString()} KES</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Applicants</span>
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{camp.applicantsCount} Creators</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Deadline: {camp.deadline}</span>
                <button className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs">
                  Manage Brief
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB: DELIVERIES & APPROVALS */}
      {activeSubTab === 'deliveries' && (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                    {booking.title}
                  </h3>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase">
                    {booking.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Creator: <span className="font-bold text-slate-700 dark:text-slate-300">{booking.creatorName}</span> • Payout: <span className="font-bold text-emerald-600 dark:text-emerald-400">{booking.totalPriceKES.toLocaleString()} KES</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenBookingContract(booking)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5"
                >
                  <FileCheck className="w-4 h-4 text-indigo-500" />
                  <span>Review Draft & Contract</span>
                </button>

                {booking.status === 'submitted' && (
                  <button
                    onClick={() => onApproveDelivery && onApproveDelivery(booking.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1 shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve & Release Escrow</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB: BOOKMARKED CREATORS */}
      {activeSubTab === 'bookmarked' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.slice(0, 3).map((creator) => (
            <div
              key={creator.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3"
            >
              <div className="flex items-center gap-3">
                <img src={creator.avatar} alt={creator.displayName} className="w-12 h-12 rounded-2xl object-cover" />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{creator.displayName}</h4>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400">@{creator.username}</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{creator.bio}</p>
              <button
                onClick={() => onSelectCreator(creator)}
                className="w-full py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                View Profile & Offer
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB: PERFORMANCE ANALYTICS */}
      {activeSubTab === 'analytics' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
            Brand Campaign Conversion Analytics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">Avg Conversion Rate</span>
              <span className="font-heading font-black text-2xl text-slate-900 dark:text-white">{brandAnalytics.conversionRate}%</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">Return on Ad Spend (ROAS)</span>
              <span className="font-heading font-black text-2xl text-slate-900 dark:text-white">{brandAnalytics.avgROAS}x</span>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block">Active Creators</span>
              <span className="font-heading font-black text-2xl text-slate-900 dark:text-white">{brandAnalytics.activeCreatorsCount}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
