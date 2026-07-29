import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Key,
  Globe,
  Share2,
  DollarSign,
  Lock,
  CheckCircle2,
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ClipperSettings: React.FC = () => {
  const { currentUser, updateUserProfile } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'security'>('profile');

  // Form states
  const [name, setName] = useState(currentUser.name);
  const [handle, setHandle] = useState(currentUser.handle);
  const [email, setEmail] = useState(currentUser.email);
  const [location, setLocation] = useState(currentUser.location);
  const [bio, setBio] = useState(currentUser.bio);

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [whatsAppNotifs, setWhatsAppNotifs] = useState(true);

  const [publicProfile, setPublicProfile] = useState(true);
  const [showEarnings, setShowEarnings] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      handle,
      email,
      location,
      bio
    });
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      
      {/* Settings Navigation Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <User className="w-4 h-4" /> Profile & Information
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" /> Notifications
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'privacy'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" /> Privacy Settings
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Key className="w-4 h-4" /> Security & 2FA
        </button>
      </div>

      {/* Main Settings Form Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        
        {activeTab === 'profile' && (
          <form onSubmit={handleSave} className="space-y-5">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Personal Information & Social Links
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">Social Handle</label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" /> Save Profile Settings
              </button>
            </div>
          </form>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Notification Preferences
            </h3>

            <div className="space-y-3">
              {[
                { state: emailNotifs, setState: setEmailNotifs, label: 'Email Notifications for New Bounties & Approval' },
                { state: smsNotifs, setState: setSmsNotifs, label: 'SMS Alerts for M-Pesa Payouts' },
                { state: pushNotifs, setState: setPushNotifs, label: 'Push Notifications for Messages' },
                { state: whatsAppNotifs, setState: setWhatsAppNotifs, label: 'WhatsApp Instant Alerts for Revision Requests' }
              ].map((n, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{n.label}</span>
                  <input
                    type="checkbox"
                    checked={n.state}
                    onChange={(e) => n.setState(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Privacy Settings
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Public Portfolio Visibility</span>
                  <p className="text-[11px] text-slate-400">Allow brands and creators to view your public clipper portfolio.</p>
                </div>
                <input
                  type="checkbox"
                  checked={publicProfile}
                  onChange={(e) => setPublicProfile(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Show Lifetime Earnings on Profile</span>
                  <p className="text-[11px] text-slate-400">Display total earnings badge on public portfolio.</p>
                </div>
                <input
                  type="checkbox"
                  checked={showEarnings}
                  onChange={(e) => setShowEarnings(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Security & Two-Factor Authentication
            </h3>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/60 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Account secured with 2-Factor M-Pesa PIN Verification</span>
              </div>
              <button className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">
                Manage 2FA
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
