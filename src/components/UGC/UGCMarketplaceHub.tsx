import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MOCK_UGC_CREATORS,
  MOCK_UGC_CAMPAIGNS,
  MOCK_UGC_BOOKINGS,
  MOCK_UGC_APPLICATIONS,
  MOCK_UGC_ANALYTICS
} from '../../data/mockUGCData';
import {
  UGCProfileData,
  UGCCampaignDetail,
  UGCBooking,
  UGCApplication,
  UGCPackage
} from '../../types';
import { UGCDiscovery } from './UGCDiscovery';
import { UGCCreatorDashboardView } from './UGCCreatorDashboardView';
import { UGCBrandDashboardView } from './UGCBrandDashboardView';
import { UGCCreatorProfileModal } from './UGCCreatorProfileModal';
import { UGCCreateCampaignModal } from './UGCCreateCampaignModal';
import { UGCContractModal } from './UGCContractModal';
import { Layers, Users, Briefcase, Plus, Sparkles, ShieldCheck } from 'lucide-react';

export const UGCMarketplaceHub: React.FC = () => {
  const { currentRole, setActiveTab, notifications, balanceKES } = useApp();

  const [activeView, setActiveView] = useState<'discovery' | 'creator_dashboard' | 'brand_dashboard'>('discovery');

  // Local State Data
  const [creators, setCreators] = useState<UGCProfileData[]>(MOCK_UGC_CREATORS);
  const [campaigns, setCampaigns] = useState<UGCCampaignDetail[]>(MOCK_UGC_CAMPAIGNS);
  const [bookings, setBookings] = useState<UGCBooking[]>(MOCK_UGC_BOOKINGS);
  const [applications, setApplications] = useState<UGCApplication[]>(MOCK_UGC_APPLICATIONS);

  // Selected Item Modals State
  const [selectedCreator, setSelectedCreator] = useState<UGCProfileData | null>(null);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);

  const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] = useState(false);

  const [selectedBookingContract, setSelectedBookingContract] = useState<UGCBooking | null>(null);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  // Handlers
  const handleOpenCreator = (creator: UGCProfileData) => {
    setSelectedCreator(creator);
    setIsCreatorModalOpen(true);
  };

  const handleBookCreator = (creator: UGCProfileData, pkg?: UGCPackage) => {
    setIsCreatorModalOpen(false);
    
    // Create new booking
    const newBooking: UGCBooking = {
      id: `book_${Date.now()}`,
      title: `${pkg?.name || 'UGC Video brief'} for ${creator.displayName}`,
      brandId: 'brand_me_01',
      brandName: 'Maina Ventures Kenya',
      brandAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      creatorId: creator.userId,
      creatorName: creator.displayName,
      creatorAvatar: creator.avatar,
      packageType: pkg?.name || 'Custom Brief',
      totalPriceKES: pkg?.priceKES || creator.startingPriceKES,
      deadlineDate: '2026-08-15',
      status: 'in_progress',
      progressPercent: 10,
      createdAt: new Date().toISOString().split('T')[0],
      revisions: [],
      contract: {
        id: `cnt_${Date.now()}`,
        bookingId: `book_${Date.now()}`,
        campaignTitle: `${pkg?.name || 'UGC Video'} Brief`,
        brandName: 'Maina Ventures Kenya',
        brandId: 'brand_me_01',
        creatorName: creator.displayName,
        creatorId: creator.userId,
        deliverables: pkg?.features || ['1x TikTok Video (9:16)'],
        timelineDays: pkg?.deliveryDays || 3,
        paymentTerms: '100% Escrow locked upfront, released upon brand approval.',
        totalAmountKES: pkg?.priceKES || creator.startingPriceKES,
        revisionLimit: pkg?.revisions || 2,
        cancellationPolicy: 'Full refund before draft submission.',
        brandSigned: true,
        brandSignedAt: new Date().toLocaleString(),
        creatorSigned: true,
        creatorSignedAt: new Date().toLocaleString(),
        status: 'active',
        milestones: [
          {
            id: `ms_new_1`,
            description: 'Concept & Script Approval',
            amountKES: Math.round((pkg?.priceKES || creator.startingPriceKES) * 0.4),
            dueDate: '2026-08-05',
            status: 'approved',
            approvedAt: new Date().toLocaleString()
          },
          {
            id: `ms_new_2`,
            description: 'Video Draft Submission',
            amountKES: Math.round((pkg?.priceKES || creator.startingPriceKES) * 0.6),
            dueDate: '2026-08-10',
            status: 'in_progress'
          }
        ]
      }
    };

    setBookings(prev => [newBooking, ...prev]);
    setSelectedBookingContract(newBooking);
    setIsContractModalOpen(true);
  };

  const handleCreateCampaign = (campaignData: Partial<UGCCampaignDetail>) => {
    const newCamp: UGCCampaignDetail = {
      id: `ugc_camp_${Date.now()}`,
      title: campaignData.title || 'New UGC Campaign Brief',
      brandName: campaignData.brandName || 'Brand Partner',
      brandLogo: campaignData.brandLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      brandId: 'brand_me_01',
      description: campaignData.description || '',
      budgetKES: campaignData.budgetKES || 100000,
      budgetUSD: Math.round((campaignData.budgetKES || 100000) / 130),
      category: campaignData.category || 'General',
      deadline: campaignData.deadline || '2026-08-30',
      deliverables: campaignData.deliverables || ['1x TikTok Video'],
      applicantsCount: 0,
      status: 'active',
      requirements: campaignData.requirements || '',
      targetNiche: [campaignData.category || 'General'],
      platform: campaignData.platform || 'tiktok',
      createdAt: new Date().toISOString().split('T')[0],
      pricePerVideoKES: campaignData.pricePerVideoKES || 20000,
      maxCreatorsNeeded: campaignData.maxCreatorsNeeded || 5
    };

    setCampaigns(prev => [newCamp, ...prev]);
  };

  const handleApproveMilestone = (bookingId: string, milestoneId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId && b.contract) {
        const updatedMilestones = b.contract.milestones.map(ms => {
          if (ms.id === milestoneId) {
            return { ...ms, status: 'approved' as const, approvedAt: new Date().toLocaleString() };
          }
          return ms;
        });
        return {
          ...b,
          contract: { ...b.contract, milestones: updatedMilestones }
        };
      }
      return b;
    }));
  };

  const handleRequestRevision = (bookingId: string, notes: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'revision_requested' as const,
          revisions: [
            ...b.revisions,
            {
              id: `rev_${Date.now()}`,
              bookingId,
              requestedBy: 'brand' as const,
              notes,
              timestamp: new Date().toLocaleString(),
              status: 'pending' as const
            }
          ]
        };
      }
      return b;
    }));
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Header Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
              UGC Creator Marketplace
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-200 dark:border-emerald-800">
              Escrow Protected
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Hire African User-Generated Content creators or apply for high-paying brand video briefs.
          </p>
        </div>

        {/* Studio Perspective Switcher */}
        <div className="flex items-center rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveView('discovery')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeView === 'discovery'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Marketplace Discovery
          </button>
          <button
            onClick={() => setActiveView('creator_dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeView === 'creator_dashboard'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Clipper / Creator Studio
          </button>
          <button
            onClick={() => setActiveView('brand_dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeView === 'brand_dashboard'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Brand Studio
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE VIEW */}
      {activeView === 'discovery' && (
        <UGCDiscovery
          creators={creators}
          campaigns={campaigns}
          onSelectCreator={handleOpenCreator}
          onSelectCampaign={(camp) => {
            // Apply for brief
            setActiveTab('messages');
          }}
          onOpenCreateCampaign={() => setIsCreateCampaignModalOpen(true)}
        />
      )}

      {activeView === 'creator_dashboard' && (
        <UGCCreatorDashboardView
          creator={creators[0]}
          bookings={bookings}
          applications={applications}
          analytics={MOCK_UGC_ANALYTICS}
          onOpenBookingContract={(b) => {
            setSelectedBookingContract(b);
            setIsContractModalOpen(true);
          }}
          onOpenWallet={() => setActiveTab('wallet')}
          onOpenMessages={() => setActiveTab('messages')}
          onOpenEditProfile={() => {
            setSelectedCreator(creators[0]);
            setIsCreatorModalOpen(true);
          }}
        />
      )}

      {activeView === 'brand_dashboard' && (
        <UGCBrandDashboardView
          campaigns={campaigns}
          creators={creators}
          bookings={bookings}
          analytics={MOCK_UGC_ANALYTICS}
          onOpenCreateCampaign={() => setIsCreateCampaignModalOpen(true)}
          onSelectCreator={handleOpenCreator}
          onOpenBookingContract={(b) => {
            setSelectedBookingContract(b);
            setIsContractModalOpen(true);
          }}
          onApproveDelivery={(bookingId) => {
            setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'completed' as const } : b));
          }}
        />
      )}

      {/* CREATOR PROFILE MODAL */}
      <UGCCreatorProfileModal
        creator={selectedCreator}
        isOpen={isCreatorModalOpen}
        onClose={() => setIsCreatorModalOpen(false)}
        onBookCreator={handleBookCreator}
        onSendMessage={() => {
          setIsCreatorModalOpen(false);
          setActiveTab('messages');
        }}
      />

      {/* CREATE CAMPAIGN MODAL */}
      <UGCCreateCampaignModal
        isOpen={isCreateCampaignModalOpen}
        onClose={() => setIsCreateCampaignModalOpen(false)}
        onCreate={handleCreateCampaign}
      />

      {/* CONTRACT & REVISIONS MODAL */}
      <UGCContractModal
        booking={selectedBookingContract}
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        onApproveMilestone={handleApproveMilestone}
        onRequestRevision={handleRequestRevision}
      />

    </div>
  );
};
