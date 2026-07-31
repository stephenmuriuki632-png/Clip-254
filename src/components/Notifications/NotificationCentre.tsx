import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Check,
  Trash2,
  Filter,
  Search,
  MessageSquare,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Users,
  Settings,
  X,
  Sliders,
  ExternalLink,
  ShieldCheck,
  Radio
} from 'lucide-react';

interface NotificationCentreProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const NotificationCentre: React.FC<NotificationCentreProps> = ({ isOpen = true, onClose }) => {
  const {
    notifications,
    unreadNotifsCount,
    markNotificationsAsRead,
    deleteNotification,
    clearAllNotifications,
    setActiveTab
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showPreferencesModal, setShowPreferencesModal] = useState<boolean>(false);

  // Preferences toggles state
  const [prefs, setPrefs] = useState({
    messages: { inApp: true, email: true, push: true, sms: false },
    campaigns: { inApp: true, email: true, push: true, sms: true },
    payments: { inApp: true, email: true, push: true, sms: true },
    community: { inApp: true, email: false, push: true, sms: false },
    system: { inApp: true, email: true, push: false, sms: false },
  });

  const categories = [
    { id: 'all', label: 'All Notifications' },
    { id: 'messages', label: 'Messages' },
    { id: 'campaigns', label: 'Campaigns & Bounties' },
    { id: 'payments', label: 'Payments & Wallet' },
    { id: 'submissions', label: 'Submissions' },
    { id: 'community', label: 'Community & Followers' },
    { id: 'system', label: 'System & Security' }
  ];

  const filteredNotifications = notifications.filter(n => {
    // Category match
    if (activeCategory === 'messages' && n.type !== 'message') return false;
    if (activeCategory === 'payments' && n.type !== 'money') return false;
    if (activeCategory === 'submissions' && !n.title.toLowerCase().includes('clip') && !n.title.toLowerCase().includes('submission') && !n.title.toLowerCase().includes('bounty')) return false;
    if (activeCategory === 'community' && !n.title.toLowerCase().includes('follow') && !n.title.toLowerCase().includes('post') && !n.title.toLowerCase().includes('community')) return false;
    if (activeCategory === 'system' && n.type !== 'info' && n.type !== 'success') return false;

    // Search query match
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q);
    }
    return true;
  });

  const getNotifIcon = (type: string, title: string) => {
    if (type === 'money' || title.toLowerCase().includes('payout') || title.toLowerCase().includes('deposit')) {
      return <DollarSign className="w-4 h-4 text-emerald-500" />;
    }
    if (type === 'message' || title.toLowerCase().includes('offer') || title.toLowerCase().includes('chat')) {
      return <MessageSquare className="w-4 h-4 text-indigo-500" />;
    }
    if (type === 'success' || title.toLowerCase().includes('approved')) {
      return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    }
    if (type === 'warning' || title.toLowerCase().includes('rejected') || title.toLowerCase().includes('revision')) {
      return <AlertCircle className="w-4 h-4 text-amber-500" />;
    }
    if (title.toLowerCase().includes('follow') || title.toLowerCase().includes('community')) {
      return <Users className="w-4 h-4 text-sky-500" />;
    }
    return <Bell className="w-4 h-4 text-indigo-500" />;
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="relative p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Bell className="w-6 h-6" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotifsCount}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">
                  Notification Centre
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold flex items-center gap-1 border border-emerald-500/20">
                  <Radio className="w-3 h-3 animate-ping" /> Supabase Realtime Live
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Real-time updates for M-Pesa payouts, contract offers, clip submissions, and community alerts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {unreadNotifsCount > 0 && (
              <button
                onClick={markNotificationsAsRead}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
            )}

            <button
              onClick={() => setShowPreferencesModal(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Preferences</span>
            </button>

            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/60 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Categories Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

        </div>
      </div>

      {/* Notifications Feed */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
            <Bell className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="font-heading font-extrabold text-sm text-slate-700 dark:text-slate-300">
              You're all caught up.
            </p>
            <p className="text-xs text-slate-500">
              New campaign updates, M-Pesa escrow transfers, and submission notifications will appear here in real-time.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                notif.read
                  ? 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                  : 'bg-indigo-50/40 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/80 shadow-2xs'
              }`}
            >
              {/* Notif Icon Circle */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0">
                {getNotifIcon(notif.type, notif.title)}
              </div>

              {/* Notif Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-heading font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />}
                    <span>{notif.title}</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">{notif.timestamp}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {notif.message}
                </p>

                {/* Quick Actions Bar */}
                <div className="pt-2 flex items-center gap-3 text-[11px]">
                  {notif.type === 'message' && (
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Open Chat Inbox</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                  {notif.type === 'money' && (
                    <button
                      onClick={() => setActiveTab('wallet')}
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>View M-Pesa Wallet</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteNotification(notif.id)}
                className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="Delete Notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Notification Preferences Modal */}
      {showPreferencesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                  Notification Channel Preferences
                </h3>
              </div>
              <button
                onClick={() => setShowPreferencesModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Choose how you want to be notified for M-Pesa deposits, campaign invitations, clip approvals, and direct messages.
            </p>

            <div className="space-y-4">
              {Object.entries(prefs).map(([categoryKey, channels]) => (
                <div key={categoryKey} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-heading font-extrabold text-xs text-slate-900 dark:text-white capitalize">
                    {categoryKey} Alerts
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {Object.entries(channels).map(([channel, enabled]) => (
                      <label key={channel} className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={() => {
                            setPrefs(prev => ({
                              ...prev,
                              [categoryKey]: {
                                ...prev[categoryKey as keyof typeof prev],
                                [channel]: !enabled
                              }
                            }));
                          }}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="capitalize">{channel}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => setShowPreferencesModal(false)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-2xs"
              >
                Save Preferences
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
