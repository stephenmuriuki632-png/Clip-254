import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Film,
  FileCheck,
  Wallet,
  AlertTriangle,
  ShieldCheck,
  Award,
  TrendingUp,
  Trophy,
  Megaphone,
  Clock,
  Key,
  ShieldAlert,
  HardDrive,
  Settings,
  Lock,
  Search,
  ChevronRight,
  Menu,
  X,
  Bell
} from 'lucide-react';

import { AdminOverview } from './AdminOverview';
import { AdminStatistics } from './AdminStatistics';
import { AdminUserManagement } from './AdminUserManagement';
import { AdminCampaignManagement } from './AdminCampaignManagement';
import { AdminSubmissionManagement } from './AdminSubmissionManagement';
import { AdminFinancialsManagement } from './AdminFinancialsManagement';
import { AdminReportsDisputes } from './AdminReportsDisputes';
import { AdminContentModeration } from './AdminContentModeration';
import { AdminVerificationCenter } from './AdminVerificationCenter';
import { AdminAnalyticsView } from './AdminAnalyticsView';
import { AdminLeaderboards } from './AdminLeaderboards';
import { AdminAnnouncements } from './AdminAnnouncements';
import { AdminAuditLogs } from './AdminAuditLogs';
import { AdminAPIManagement } from './AdminAPIManagement';
import { AdminSecurityDashboard } from './AdminSecurityDashboard';
import { AdminFileManager } from './AdminFileManager';
import { AdminSystemSettings } from './AdminSystemSettings';
import { PermissionsCenter } from './PermissionsCenter';

export const AdminDashboard: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<string>('overview');
  const [globalSearch, setGlobalSearch] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Admin Home', icon: LayoutDashboard, category: 'Main' },
    { id: 'statistics', label: 'Statistics Matrix', icon: BarChart3, category: 'Main' },
    { id: 'users', label: 'User Directory', icon: Users, badge: '1,400+', category: 'Management' },
    { id: 'campaigns', label: 'Campaigns & Bounties', icon: Film, category: 'Management' },
    { id: 'submissions', label: 'Clip Deliveries', icon: FileCheck, badge: 'Review', category: 'Management' },
    { id: 'financials', label: 'Financials & Escrow', icon: Wallet, category: 'Finance' },
    { id: 'reports', label: 'Disputes & Claims', icon: AlertTriangle, badge: '4', category: 'Governance' },
    { id: 'moderation', label: 'Content Moderation', icon: ShieldCheck, category: 'Governance' },
    { id: 'verification', label: 'Verification Center', icon: Award, category: 'Governance' },
    { id: 'analytics', label: 'Analytics Studio', icon: TrendingUp, category: 'Insights' },
    { id: 'leaderboards', label: 'Leaderboards', icon: Trophy, category: 'Insights' },
    { id: 'announcements', label: 'Announcements', icon: Megaphone, category: 'Operations' },
    { id: 'audit-logs', label: 'Audit Logs', icon: Clock, category: 'Operations' },
    { id: 'api', label: 'API Management', icon: Key, category: 'System' },
    { id: 'security', label: 'Security Dashboard', icon: ShieldAlert, category: 'System' },
    { id: 'file-manager', label: 'File Manager', icon: HardDrive, category: 'System' },
    { id: 'settings', label: 'System Settings', icon: Settings, category: 'System' },
    { id: 'rbac', label: 'RBAC & Database', icon: Lock, category: 'System' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <h1 className="font-heading font-extrabold text-base tracking-tight">
                ClipKenya Enterprise Admin
              </h1>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700 font-mono">
                v4.2 PROD
              </span>
            </div>
          </div>

          {/* Global Admin Search Bar */}
          <div className="relative flex-1 max-w-xs hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Global admin search..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              M-Pesa Gateway Live
            </span>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside
          className={`lg:w-64 shrink-0 space-y-2 ${
            isMobileSidebarOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
              Navigation Sections
            </p>

            <div className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeAdminTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveAdminTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 min-w-0">
          {activeAdminTab === 'overview' && <AdminOverview onNavigateTab={(t) => setActiveAdminTab(t)} />}
          {activeAdminTab === 'statistics' && <AdminStatistics />}
          {activeAdminTab === 'users' && <AdminUserManagement />}
          {activeAdminTab === 'campaigns' && <AdminCampaignManagement />}
          {activeAdminTab === 'submissions' && <AdminSubmissionManagement />}
          {activeAdminTab === 'financials' && <AdminFinancialsManagement />}
          {activeAdminTab === 'reports' && <AdminReportsDisputes />}
          {activeAdminTab === 'moderation' && <AdminContentModeration />}
          {activeAdminTab === 'verification' && <AdminVerificationCenter />}
          {activeAdminTab === 'analytics' && <AdminAnalyticsView />}
          {activeAdminTab === 'leaderboards' && <AdminLeaderboards />}
          {activeAdminTab === 'announcements' && <AdminAnnouncements />}
          {activeAdminTab === 'audit-logs' && <AdminAuditLogs />}
          {activeAdminTab === 'api' && <AdminAPIManagement />}
          {activeAdminTab === 'security' && <AdminSecurityDashboard />}
          {activeAdminTab === 'file-manager' && <AdminFileManager />}
          {activeAdminTab === 'settings' && <AdminSystemSettings />}
          {activeAdminTab === 'rbac' && <PermissionsCenter />}
        </main>
      </div>
    </div>
  );
};
