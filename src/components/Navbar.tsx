import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClipForgeLogo } from './Brand/ClipForgeLogo';
import {
  Video,
  Scissors,
  Sparkles,
  Wallet,
  Bell,
  Search,
  Sun,
  Moon,
  Users,
  Briefcase,
  Layers,
  GraduationCap,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  Plus,
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  Smartphone,
  Download,
  UserCheck
} from 'lucide-react';
import { UserRole } from '../types';
import { AuthModal, AuthMode } from './Auth/AuthModal';
import { RoleOnboardingModal } from './Auth/RoleOnboardingModal';

export const Navbar: React.FC<{
  onOpenWallet: () => void;
  onOpenCreateCampaign: () => void;
  onOpenPushSettings?: () => void;
}> = ({
  onOpenWallet,
  onOpenCreateCampaign,
  onOpenPushSettings
}) => {
  const {
    currentUser,
    currentRole,
    setCurrentRole,
    setIsRoleManagerOpen,
    balanceKES,
    unreadNotifsCount,
    markNotificationsAsRead,
    notifications,
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth & Onboarding Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingRole, setOnboardingRole] = useState<UserRole>('creator');

  const handleAuthSuccess = (role: UserRole) => {
    setOnboardingRole(role);
    setIsOnboardingOpen(true);
  };

  const rolesList: { role: UserRole; label: string; icon: string }[] = [
    { role: 'creator', label: 'Content Creator', icon: '📹' },
    { role: 'editor', label: 'Video Editor', icon: '✂️' },
    { role: 'ugc', label: 'UGC Creator', icon: '📸' },
    { role: 'influencer', label: 'Influencer', icon: '⭐' },
    { role: 'brand', label: 'Brand / Business', icon: '🏢' },
    { role: 'agency', label: 'Agency', icon: '💼' },
    { role: 'freelancer', label: 'Freelancer', icon: '🎨' },
    { role: 'admin', label: 'Admin Dashboard', icon: '🛡️' }
  ];

  const mainNav = [
    { id: 'landing', label: 'Home', icon: Video },
    { id: 'clipper-dashboard', label: 'Clipper Studio', icon: Scissors, badge: 'Pro' },
    { id: 'creator-dashboard', label: 'Creator Studio', icon: Video, badge: 'New' },
    { id: 'clipping', label: 'Clip Bounties', icon: Scissors, badge: 'Hot' },
    { id: 'creators', label: 'Creators', icon: Users },
    { id: 'ugc', label: 'UGC Jobs', icon: Layers },
    { id: 'influencers', label: 'Influencers', icon: Briefcase },
    { id: 'freelance', label: 'Services', icon: Briefcase },
    { id: 'ai-tools', label: 'AI Suite', icon: Sparkles, highlight: true },
    { id: 'academy', label: 'Academy', icon: GraduationCap },
    { id: 'messages', label: 'Chat', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('landing')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <ClipForgeLogo variant="horizontal" showBadge={true} size="md" />
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4 relative">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search creators, clip bounties, jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            />
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">

            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-2xs"
              >
                <span className="text-xs">
                  {rolesList.find(r => r.role === currentRole)?.icon || '👤'}
                </span>
                <span className="hidden sm:inline font-semibold text-xs">
                  {rolesList.find(r => r.role === currentRole)?.label || currentRole}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl p-1.5 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 mb-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Perspective</p>
                  </div>
                  {rolesList.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        setCurrentRole(r.role);
                        setShowRoleDropdown(false);
                        if (r.role === 'admin') setActiveTab('admin');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                        currentRole === r.role
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{r.icon}</span>
                        <span>{r.label}</span>
                      </span>
                      {currentRole === r.role && <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                    </button>
                  ))}

                  <div className="pt-1.5 border-t border-slate-100 dark:border-slate-700/80 mt-1">
                    <button
                      onClick={() => {
                        setShowRoleDropdown(false);
                        setIsRoleManagerOpen(true);
                      }}
                      className="w-full text-center px-3 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Manage Roles & Permissions</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* M-Pesa Wallet Quick Badge */}
            <button
              onClick={onOpenWallet}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white font-semibold text-xs shadow-2xs transition-all active:scale-98"
            >
              <Wallet className="w-3.5 h-3.5 text-indigo-400" />
              <span>{balanceKES.toLocaleString()} KES</span>
              <span className="hidden sm:inline-block text-[9px] bg-white/20 px-1.5 py-0.5 rounded font-mono font-semibold">M-PESA</span>
            </button>

            {/* Post Campaign Button (for Brands & Businesses) */}
            {(currentRole === 'brand' || currentRole === 'agency' || currentRole === 'admin') && (
              <button
                onClick={onOpenCreateCampaign}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-2xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post Campaign</span>
              </button>
            )}

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifPopover(!showNotifPopover);
                  if (!showNotifPopover) markNotificationsAsRead();
                }}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 relative transition-colors shadow-2xs"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {showNotifPopover && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700 mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Notifications</span>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">M-Pesa Realtime</span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl text-xs ${
                          n.read
                            ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                            : 'bg-indigo-50/70 dark:bg-indigo-950/40 text-slate-900 dark:text-white font-medium border border-indigo-100 dark:border-indigo-900'
                        }`}
                      >
                        <p className="font-bold text-xs">{n.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                        <span className="text-[9px] text-slate-400 mt-1 block">{n.timestamp}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700 mt-2">
                    <button
                      onClick={() => {
                        setShowNotifPopover(false);
                        setActiveTab('notifications');
                      }}
                      className="w-full py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-300 font-bold text-xs text-center block transition-colors"
                    >
                      View All Notifications & Preferences
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Push Notifications Settings */}
            {onOpenPushSettings && (
              <button
                onClick={onOpenPushSettings}
                className="hidden sm:flex p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-2xs"
                title="PWA Push Notifications"
                aria-label="PWA Push Notifications"
              >
                <Smartphone className="w-4 h-4 text-indigo-500" />
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-2xs"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Sign In / Register Button */}
            <button
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span>Sign In</span>
            </button>

            {/* User Profile Thumbnail */}
            <button
              onClick={() => setActiveTab('analytics')}
              className="flex items-center gap-2 p-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-2xs"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover ring-2 ring-indigo-500/20"
              />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Secondary Module Navigation Bar (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800/80 no-scrollbar">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                    : item.highlight
                    ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 hover:bg-amber-100 font-bold border border-amber-200/60 dark:border-amber-800/60'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : ''}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white text-indigo-700' : 'bg-indigo-100 text-indigo-700'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-3 space-y-1">
            <div className="px-3 py-1 mb-2">
              <input
                type="text"
                placeholder="Search ClipForge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* Auth & Role Onboarding Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

      <RoleOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        role={onboardingRole}
        onGetStarted={() => {
          setIsOnboardingOpen(false);
          // Route to appropriate tab
          if (onboardingRole === 'clipper') setActiveTab('clipper-dashboard');
          else if (onboardingRole === 'creator') setActiveTab('creator-dashboard');
          else if (onboardingRole === 'ugc') setActiveTab('ugc');
          else if (onboardingRole === 'freelancer') setActiveTab('freelance');
          else if (onboardingRole === 'brand') setActiveTab('creators');
          else if (onboardingRole === 'agency') setActiveTab('admin');
        }}
      />
    </header>
  );
};
