import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { LandingHowItWorks } from './components/LandingHowItWorks';
import { LandingPricing } from './components/LandingPricing';
import { LandingTestimonials } from './components/LandingTestimonials';
import { LandingFAQ } from './components/LandingFAQ';
import { LandingNewsletter } from './components/LandingNewsletter';

import { CreatorMarketplace } from './components/Marketplaces/CreatorMarketplace';
import { ClippingMarketplace } from './components/Marketplaces/ClippingMarketplace';
import { UGCMarketplace } from './components/Marketplaces/UGCMarketplace';
import { FreelanceMarketplace } from './components/Marketplaces/FreelanceMarketplace';
import { InfluencerMarketplace } from './components/Marketplaces/InfluencerMarketplace';
import { AIToolsSuite } from './components/AITools/AIToolsSuite';
import { WalletHub } from './components/Wallet/WalletHub';
import { MessagingInbox } from './components/Messaging/MessagingInbox';
import { AnalyticsDashboard } from './components/Analytics/AnalyticsDashboard';
import { CreatorAcademy } from './components/Academy/CreatorAcademy';
import { CommunityLounge } from './components/Community/CommunityLounge';
import { NotificationCentre } from './components/Notifications/NotificationCentre';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { IntegrationsAndAutomationHub } from './components/Admin/IntegrationsAndAutomationHub';

import { CreatorDashboard } from './components/CreatorDashboard/CreatorDashboard';
import { ClipperDashboard } from './components/ClipperDashboard/ClipperDashboard';

import { AboutPage } from './components/Pages/AboutPage';
import { FeaturesPage } from './components/Pages/FeaturesPage';
import { CareersPage } from './components/Pages/CareersPage';
import { BlogPage } from './components/Pages/BlogPage';
import { HelpCenterPage } from './components/Pages/HelpCenterPage';
import { LegalPage } from './components/Pages/LegalPage';

import { ProfileModal } from './components/Modals/ProfileModal';
import { CreateCampaignModal } from './components/Modals/CreateCampaignModal';
import { RoleManagerModal } from './components/Modals/RoleManagerModal';
import { ImpersonationBanner } from './components/Admin/ImpersonationBanner';
import { Forbidden403 } from './components/Common/Forbidden403';
import { Footer } from './components/Footer';

// PWA & Mobile Components
import { registerServiceWorker } from './pwa/registerServiceWorker';
import { OfflineIndicator } from './components/Mobile/OfflineIndicator';
import { BottomNav } from './components/Mobile/BottomNav';
import { MobileFAB } from './components/Mobile/MobileFAB';
import { PwaInstallBanner } from './components/Mobile/PwaInstallBanner';
import { MobileUploader } from './components/Mobile/MobileUploader';
import { PushNotificationManagerModal } from './components/Mobile/PushNotificationManagerModal';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, canAccess, isRoleManagerOpen, setIsRoleManagerOpen } = useApp();
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isMobileUploaderOpen, setIsMobileUploaderOpen] = useState(false);
  const [isPushSettingsOpen, setIsPushSettingsOpen] = useState(false);

  useEffect(() => {
    registerServiceWorker();
  }, []);

  const isTabAllowed = canAccess(activeTab);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 pb-16 md:pb-0">
      <OfflineIndicator />
      <ImpersonationBanner />

      <Navbar 
        onOpenWallet={() => setActiveTab('wallet')}
        onOpenCreateCampaign={() => setIsCampaignModalOpen(true)}
        onOpenPushSettings={() => setIsPushSettingsOpen(true)}
      />

      <main className="flex-1">
        {!isTabAllowed ? (
          <Forbidden403
            tabId={activeTab}
            onOpenRoleManager={() => setIsRoleManagerOpen(true)}
          />
        ) : (
          <>
            {activeTab === 'landing' && (
              <>
                <HeroBanner />
                <ClippingMarketplace />
                <LandingHowItWorks />
                <CreatorMarketplace />
                <LandingPricing />
                <LandingTestimonials />
                <LandingFAQ />
                <LandingNewsletter />
              </>
            )}

            {activeTab === 'creators' && <CreatorMarketplace />}
            {activeTab === 'clipping' && <ClippingMarketplace />}
            {activeTab === 'ugc' && <UGCMarketplace />}
            {activeTab === 'freelance' && <FreelanceMarketplace />}
            {activeTab === 'influencers' && <InfluencerMarketplace />}
            {activeTab === 'ai-tools' && <AIToolsSuite />}
            {activeTab === 'wallet' && <WalletHub />}
            {activeTab === 'messages' && <MessagingInbox />}
            {activeTab === 'analytics' && <AnalyticsDashboard />}
            {activeTab === 'academy' && <CreatorAcademy />}
            {activeTab === 'community' && <CommunityLounge />}
            {activeTab === 'notifications' && <NotificationCentre />}
            {activeTab === 'admin' && <AdminDashboard />}
            {activeTab === 'integrations' && <IntegrationsAndAutomationHub />}
            {(activeTab === 'creator-dashboard' || activeTab === 'dashboard') && <CreatorDashboard />}
            {activeTab === 'clipper-dashboard' && <ClipperDashboard />}

            {/* Content & Info Pages */}
            {activeTab === 'about' && <AboutPage />}
            {activeTab === 'features' && <FeaturesPage />}
            {activeTab === 'pricing' && <LandingPricing />}
            {activeTab === 'careers' && <CareersPage />}
            {activeTab === 'blog' && <BlogPage />}
            {activeTab === 'help' && <HelpCenterPage />}
            {activeTab === 'legal' && <LegalPage />}
          </>
        )}
      </main>

      <Footer />

      {/* PWA & Mobile Navigation & FAB */}
      <BottomNav onOpenMobileUploader={() => setIsMobileUploaderOpen(true)} />
      <MobileFAB
        onOpenMobileUploader={() => setIsMobileUploaderOpen(true)}
        onOpenCreateCampaign={() => setIsCampaignModalOpen(true)}
      />
      <PwaInstallBanner />

      {/* Global Modals */}
      <ProfileModal />
      <CreateCampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
      />
      <RoleManagerModal
        isOpen={isRoleManagerOpen}
        onClose={() => setIsRoleManagerOpen(false)}
      />
      <MobileUploader
        isOpen={isMobileUploaderOpen}
        onClose={() => setIsMobileUploaderOpen(false)}
      />
      <PushNotificationManagerModal
        isOpen={isPushSettingsOpen}
        onClose={() => setIsPushSettingsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AppProvider>
  );
}

