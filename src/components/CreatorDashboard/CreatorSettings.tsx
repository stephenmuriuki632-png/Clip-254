import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  Camera, 
  Check, 
  Key, 
  Smartphone, 
  Save,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreatorSettings: React.FC = () => {
  const { currentUser, updateUserProfile, theme, toggleTheme } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'connected'>('profile');

  // Form states
  const [name, setName] = useState(currentUser.name || '');
  const [handle, setHandle] = useState(currentUser.handle || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [location, setLocation] = useState(currentUser.location || 'Nairobi, Kenya');
  const [avatar, setAvatar] = useState(currentUser.avatar || '');
  const [coverImage, setCoverImage] = useState(currentUser.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80');

  // Security
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [mpesaNumber, setMpesaNumber] = useState('254712345678');

  // Notifications
  const [notifSubmissions, setNotifSubmissions] = useState(true);
  const [notifPayouts, setNotifPayouts] = useState(true);
  const [notifMarketing, setNotifMarketing] = useState(false);

  const handleSaveProfile = () => {
    updateUserProfile({
      name,
      handle,
      bio,
      location,
      avatar,
      coverImage
    });
    alert('Profile settings saved successfully!');
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 space-y-6">
      
      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Brand</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'security'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Security & 2FA</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'notifications'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab('connected')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'connected'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Connected Accounts & M-Pesa</span>
        </button>
      </div>

      {/* Tab 1: Profile & Brand */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          
          {/* Cover & Avatar Banner */}
          <div className="relative rounded-2xl h-40 overflow-hidden bg-slate-800 border border-slate-700">
            <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
            <button
              onClick={() => alert('Simulate upload cover image')}
              className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5 hover:bg-black/80"
            >
              <Camera className="w-4 h-4" />
              <span>Change Cover</span>
            </button>

            <div className="absolute -bottom-2 left-6 transform translate-y-1/2 flex items-end gap-3">
              <div className="relative">
                <img
                  src={avatar}
                  alt={name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl"
                />
                <button
                  onClick={() => alert('Simulate upload avatar')}
                  className="absolute bottom-0 right-0 p-1.5 rounded-lg bg-indigo-600 text-white shadow-md"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Creator / Brand Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Handle (@username)</label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Bio / Brand Description</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Role Perspective</label>
              <input
                type="text"
                disabled
                value={currentUser.role}
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-500 font-bold uppercase"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleSaveProfile}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>

        </div>
      )}

      {/* Tab 2: Security & 2FA */}
      {activeTab === 'security' && (
        <div className="space-y-6 text-xs max-w-xl">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Protect your M-Pesa wallet & escrow funds with Safaricom OTP.</p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  twoFactorEnabled ? 'bg-emerald-600' : 'bg-slate-400'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white">Change Password</h4>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
            </div>
            <button onClick={() => alert('Password updated!')} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold">
              Update Password
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-4 text-xs max-w-xl">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">New Submission Alerts</p>
              <p className="text-[11px] text-slate-400">Receive instant SMS / push when clippers submit videos.</p>
            </div>
            <input type="checkbox" checked={notifSubmissions} onChange={(e) => setNotifSubmissions(e.target.checked)} className="w-4 h-4 rounded text-indigo-600" />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">M-Pesa Payout Confirmation</p>
              <p className="text-[11px] text-slate-400">Notify when escrow payouts settle directly to editor M-Pesa line.</p>
            </div>
            <input type="checkbox" checked={notifPayouts} onChange={(e) => setNotifPayouts(e.target.checked)} className="w-4 h-4 rounded text-indigo-600" />
          </div>
        </div>
      )}

      {/* Tab 4: Connected Accounts */}
      {activeTab === 'connected' && (
        <div className="space-y-4 text-xs max-w-xl">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <label className="font-bold text-slate-900 dark:text-white">Verified M-Pesa Payout Phone Line</label>
            <input
              type="text"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-bold"
            />
          </div>
        </div>
      )}

    </div>
  );
};
