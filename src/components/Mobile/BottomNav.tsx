import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Scissors,
  PlusCircle,
  MessageSquare,
  Wallet,
  Sparkles,
  UserCheck,
  TrendingUp,
  Award
} from 'lucide-react';

interface BottomNavProps {
  onOpenMobileUploader: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenMobileUploader }) => {
  const { activeTab, setActiveTab, unreadNotifsCount, conversations, currentRole } = useApp();

  // Calculate total unread messages across all conversations
  const totalUnreadMessages = conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);

  const getRoleDashboardTab = () => {
    if (currentRole === 'clipper') return 'clipper-dashboard';
    if (currentRole === 'creator') return 'creator-dashboard';
    if (currentRole === 'admin') return 'admin';
    return 'creator-dashboard';
  };

  const navItems = [
    {
      id: 'landing',
      label: 'Home',
      icon: Home,
      onClick: () => setActiveTab('landing')
    },
    {
      id: 'clipping',
      label: 'Bounties',
      icon: Scissors,
      onClick: () => setActiveTab('clipping')
    },
    {
      id: 'upload',
      label: 'Upload',
      icon: PlusCircle,
      isAction: true,
      onClick: onOpenMobileUploader
    },
    {
      id: 'messages',
      label: 'Inbox',
      icon: MessageSquare,
      badge: totalUnreadMessages,
      onClick: () => setActiveTab('messages')
    },
    {
      id: 'wallet',
      label: 'Wallet',
      icon: Wallet,
      onClick: () => setActiveTab('wallet')
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 dark:bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-xl px-2 py-1.5 pb-safe shadow-2xl transition-all">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="relative -top-4 bg-gradient-to-tr from-indigo-600 to-amber-500 p-3.5 rounded-full text-white shadow-xl shadow-indigo-600/40 active:scale-95 transition-transform border-2 border-slate-950 flex items-center justify-center"
                aria-label="Upload Clip or Bounty"
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-indigo-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-indigo-400' : ''} transition-transform`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-amber-500 text-slate-950 font-extrabold text-[9px] rounded-full flex items-center justify-center border border-slate-950 animate-pulse">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
