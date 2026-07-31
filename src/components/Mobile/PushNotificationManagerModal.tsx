import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  DollarSign,
  MessageSquare,
  Scissors,
  Sparkles,
  Shield,
  Smartphone
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface PushNotificationManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PushNotificationManagerModal: React.FC<PushNotificationManagerModalProps> = ({
  isOpen,
  onClose
}) => {
  const { addToast } = useToast();

  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  // Preference Toggles
  const [preferences, setPreferences] = useState({
    payouts: true,
    bountyApprovals: true,
    chatMessages: true,
    campaignUpdates: true,
    academyAlerts: false,
    communityActivity: true
  });

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setPermission(Notification.permission);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const requestNotificationPermission = async () => {
    if (typeof Notification === 'undefined') {
      addToast('Push notifications are not supported in this browser.', 'warning');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        addToast('🎉 Web Push Notifications enabled successfully!', 'success');
        
        // Show test push notification via service worker
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.ready;
          reg.showNotification('ClipForge Alerts Enabled! 🔔', {
            body: 'You will now receive instant M-Pesa payout updates & bounty approval alerts.',
            icon: '/favicon.ico',
            vibrate: [100, 50, 100]
          } as any);
        }
      } else {
        addToast('Push notification permission was denied or closed.', 'info');
      }
    } catch (err) {
      console.error('Error requesting notification permission:', err);
    }
  };

  const sendTestNotification = async () => {
    if (permission !== 'granted') {
      await requestNotificationPermission();
      return;
    }

    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification('📲 Test M-Pesa Payout Alert', {
        body: 'Received KES 3,500 for Clip Bounty #204! Balance updated in wallet.',
        vibrate: [200, 100, 200]
      } as any);
      addToast('Test push notification sent to your device!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-heading font-extrabold text-slate-900 dark:text-white">
              Push Notification Centre
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Permission Status Banner */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-indigo-500 shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Web Push Status
              </div>
              <div className="text-[11px] text-slate-500 capitalize">
                {permission === 'granted'
                  ? 'Active & Enabled'
                  : permission === 'denied'
                  ? 'Blocked in Browser Settings'
                  : 'Not Enabled Yet'}
              </div>
            </div>
          </div>

          {permission !== 'granted' ? (
            <button
              onClick={requestNotificationPermission}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 shadow-md"
            >
              Enable
            </button>
          ) : (
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Enabled</span>
            </span>
          )}
        </div>

        {/* Category Toggles */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Notification Preferences
          </h4>

          {[
            {
              key: 'payouts',
              label: 'M-Pesa Payouts & STK Push Updates',
              desc: 'Instant alerts when money hits your wallet or STK completes',
              icon: DollarSign
            },
            {
              key: 'bountyApprovals',
              label: 'Clip Bounty Approvals & Revisions',
              desc: 'Get notified when your submitted clip is approved or needs changes',
              icon: Scissors
            },
            {
              key: 'chatMessages',
              label: 'Direct Messages & Escrow Offers',
              desc: 'New messages from brands, creators, or freelancers',
              icon: MessageSquare
            },
            {
              key: 'campaignUpdates',
              label: 'Campaign Milestones & Deadlines',
              desc: 'Reminders for upcoming campaign deliverables',
              icon: Sparkles
            }
          ].map((item) => {
            const Icon = item.icon;
            const isChecked = preferences[item.key as keyof typeof preferences];
            return (
              <label
                key={item.key}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-indigo-500/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {item.desc}
                    </div>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) =>
                    setPreferences({ ...preferences, [item.key]: e.target.checked })
                  }
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
              </label>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={sendTestNotification}
            className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs"
          >
            Send Test Push Notification
          </button>
          <button
            onClick={() => {
              addToast('Preferences saved!', 'success');
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
          >
            Save Preferences
          </button>
        </div>

      </div>
    </div>
  );
};
