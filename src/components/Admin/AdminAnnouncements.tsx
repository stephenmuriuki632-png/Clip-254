import React, { useState } from 'react';
import { BellRing, Send, Megaphone, ShieldAlert, CheckCircle, Mail, Smartphone, Users } from 'lucide-react';

export const AdminAnnouncements: React.FC = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [channels, setChannels] = useState({ inApp: true, push: true, email: false });
  const [sentSuccess, setSentSuccess] = useState(false);

  const [history, setHistory] = useState([
    { id: 'ann-1', title: 'M-Pesa Instant B2C Payout Engine Active', target: 'All Users', date: '2026-07-28', status: 'Delivered' },
    { id: 'ann-2', title: 'Scheduled Maintenance: Supabase EU Region', target: 'Creators & Clippers', date: '2026-07-25', status: 'Delivered' },
  ]);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    setHistory((prev) => [
      { id: `ann-${Date.now()}`, title, target: targetAudience.toUpperCase(), date: new Date().toISOString().slice(0, 10), status: 'Delivered' },
      ...prev,
    ]);

    setSentSuccess(true);
    setTitle('');
    setMessage('');
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Platform Broadcast & Notification Command</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dispatch platform announcements, maintenance warnings, push alerts, and targeted role campaigns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <form onSubmit={handleBroadcast} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Create Broadcast Campaign</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Broadcast Headline Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. New M-Pesa Auto Payout Feature Live!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Target Audience Group
            </label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="all">All Ecosystem Users (Creators, Clippers, Brands)</option>
              <option value="creators">Video Creators Only</option>
              <option value="clippers">Clipper Editors Only</option>
              <option value="ugc">UGC Talent Only</option>
              <option value="freelancers">Freelancers Only</option>
              <option value="brands">Brands & Agencies Only</option>
              <option value="admins">Administrators Only</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Notification Body Text
            </label>
            <textarea
              required
              rows={4}
              placeholder="Write the message detail here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            {sentSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span>Broadcast Dispatched Successfully!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Dispatch Broadcast Now</span>
              </>
            )}
          </button>
        </form>

        {/* History */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <BellRing className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Broadcast History & Logs</span>
          </h3>

          <div className="space-y-3">
            {history.map((h) => (
              <div
                key={h.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{h.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                    {h.status}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Target: {h.target} • Sent: {h.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
