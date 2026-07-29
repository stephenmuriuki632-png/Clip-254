import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle,
  XCircle,
  Film,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Flag,
  Trash2,
  Eye
} from 'lucide-react';

export const AdminContentModeration: React.FC = () => {
  const [contentType, setContentType] = useState<'videos' | 'images' | 'comments' | 'ai'>('videos');
  const [items, setItems] = useState([
    { id: 'c-1', type: 'video', author: 'Clipper_Pro_254', title: 'Viral TikTok Remix #12', flaggedReason: 'Copyrighted Audio Detected', status: 'Pending Review' },
    { id: 'c-2', type: 'image', author: 'Brand_Nairobi', title: 'Campaign Banner #4', flaggedReason: 'High Compression Artifacts', status: 'Approved' },
    { id: 'c-3', type: 'comment', author: 'User_88', title: 'Great video submission!', flaggedReason: 'External Link Spam', status: 'Flagged' },
    { id: 'c-4', type: 'ai', author: 'Gemini AI Assistant', title: 'Script Auto-Generation', flaggedReason: 'Safety Filter Passed', status: 'Approved' },
  ]);

  const handleAction = (id: string, action: 'approve' | 'flag' | 'remove') => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (action === 'approve') return { ...item, status: 'Approved' };
          if (action === 'flag') return { ...item, status: 'Flagged' };
          if (action === 'remove') return { ...item, status: 'Removed' };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>AI & Automated Content Moderation Queue</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review videos, profile photos, portfolio items, AI-generated prompts, comments and flag or purge harmful content.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['videos', 'images', 'comments', 'ai'].map((type) => (
            <button
              key={type}
              onClick={() => setContentType(type as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                contentType === type
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {item.type}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.status === 'Approved'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : item.status === 'Flagged'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {item.status}
              </span>
            </div>

            <div>
              <p className="font-bold text-xs text-slate-900 dark:text-white">{item.title}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">By: {item.author}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-[10px] text-rose-600 dark:text-rose-400 font-semibold border border-slate-200 dark:border-slate-700">
              Flag Reason: {item.flaggedReason}
            </div>

            <div className="flex items-center justify-end gap-1.5 pt-1">
              <button
                onClick={() => handleAction(item.id, 'approve')}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px]"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(item.id, 'flag')}
                className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[10px]"
              >
                Flag
              </button>
              <button
                onClick={() => handleAction(item.id, 'remove')}
                className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[10px]"
              >
                Purge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
