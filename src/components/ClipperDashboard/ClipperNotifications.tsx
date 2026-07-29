import React from 'react';
import {
  Bell,
  CheckCircle2,
  DollarSign,
  MessageSquare,
  AlertTriangle,
  Info,
  Check,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ClipperNotifications: React.FC = () => {
  const { notifications, markNotificationsAsRead, unreadNotifsCount } = useApp();

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'money':
        return <DollarSign className="w-4 h-4 text-emerald-500" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-indigo-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            Realtime Notifications ({unreadNotifsCount} Unread)
          </h3>
        </div>

        {unreadNotifsCount > 0 && (
          <button
            onClick={markNotificationsAsRead}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" /> Mark All Read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border flex items-start gap-3 transition-colors ${
              !n.read
                ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900/60'
                : 'bg-slate-50/40 dark:bg-slate-800/30 border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200/50 dark:border-slate-700">
              {getNotifIcon(n.type)}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</h4>
                <span className="text-[10px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
