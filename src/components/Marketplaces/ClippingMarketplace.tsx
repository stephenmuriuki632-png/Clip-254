import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Scissors, Flame, DollarSign, Video, CheckCircle, Clock, Send, Play, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { ClipBounty } from '../../types';

export const ClippingMarketplace: React.FC = () => {
  const { bounties, submitClip, submissions, setActiveTab, setSelectedBounty } = useApp();
  
  const [activeModalBounty, setActiveModalBounty] = useState<ClipBounty | null>(null);
  const [clipTitle, setClipTitle] = useState('');
  const [platformUrl, setPlatformUrl] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['Tech & Business', 'Business & Startups', 'Travel & Lifestyle', 'Sports & Fitness'];

  const filteredBounties = categoryFilter === 'all'
    ? bounties
    : bounties.filter(b => b.category === categoryFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalBounty || !clipTitle || !platformUrl) return;

    submitClip(activeModalBounty.id, clipTitle, platformUrl);
    setClipTitle('');
    setPlatformUrl('');
    setActiveModalBounty(null);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 text-white border border-slate-800 p-6 sm:p-8">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Scissors className="w-3.5 h-3.5" />
            <span>Video Clipping Economy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-white">
            Turn Raw Podcasts & Streams into <span className="text-indigo-400">Viral M-Pesa Cash</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Podcasters and stream hosts deposit bounty pools. Editors cut 30–60s vertical clips, post to TikTok/Reels, and earn payouts calculated per 100k views directly to M-Pesa.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('ai-tools')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Generate Viral Clip Hooks with AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              categoryFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bounties List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredBounties.map((bounty) => (
          <div
            key={bounty.id}
            className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Header */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={bounty.thumbnail}
                  alt={bounty.streamTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                  {bounty.category}
                </span>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <img
                      src={bounty.hostAvatar}
                      alt={bounty.hostName}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500"
                    />
                    <span className="truncate max-w-[150px]">{bounty.hostName}</span>
                  </div>
                  <span className="flex items-center gap-1 text-emerald-300 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700">
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{bounty.submissionsCount} Clips</span>
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug">
                  {bounty.streamTitle}
                </h3>

                {/* Bounty Metrics Box */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Payout Rate</p>
                    <p className="font-heading font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                      {bounty.bountyPer100kViewsKES.toLocaleString()} KES
                    </p>
                    <span className="text-[9px] text-slate-400">per 100k views</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Pool Remaining</p>
                    <p className="font-heading font-extrabold text-sm text-amber-600 dark:text-amber-400">
                      {bounty.remainingPoolKES.toLocaleString()} KES
                    </p>
                    <span className="text-[9px] text-slate-400">out of {bounty.totalBountyPoolKES.toLocaleString()} KES</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {bounty.description}
                </p>

                {/* Viral Tags */}
                <div className="flex flex-wrap gap-1">
                  {bounty.viralTags.map(tag => (
                    <span key={tag} className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 flex items-center gap-2">
              <button
                onClick={() => setActiveModalBounty(bounty)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Submit Short Clip</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submitted Clips Status Pipeline */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <span>Your Submitted Clips</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-semibold">
            {submissions.length} Total
          </span>
        </h3>

        <div className="space-y-3">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden flex-shrink-0">
                  <img src={sub.thumbnail} alt={sub.clipTitle} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{sub.clipTitle}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Bounty: {sub.bountyTitle}</p>
                  <a
                    href={sub.platformUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mt-1 font-semibold"
                  >
                    <span>View TikTok / Reel URL</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="text-right">
                  <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">{sub.views.toLocaleString()} Views</p>
                  <p className="text-[10px] text-slate-400">Earned: {sub.payoutKES.toLocaleString()} KES</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                  sub.status === 'approved'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                }`}>
                  {sub.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Clip Modal */}
      {activeModalBounty && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Scissors className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Submit Short Clip for Bounty</span>
              </h3>
              <button
                onClick={() => setActiveModalBounty(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-bold text-slate-900 dark:text-white">{activeModalBounty.streamTitle}</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                Payout Rate: {activeModalBounty.bountyPer100kViewsKES.toLocaleString()} KES per 100k views
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Clip Title / Hook Caption
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Why AI won't replace Nairobi Software Engineers in 2026!"
                  value={clipTitle}
                  onChange={(e) => setClipTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  TikTok / Instagram Reel / YouTube Short URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.tiktok.com/@yourhandle/video/123456789"
                  value={platformUrl}
                  onChange={(e) => setPlatformUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 space-y-1">
                <p className="font-bold">ClipKenya Verification Rules:</p>
                <p>• Clips are verified automatically by platform metrics or host review.</p>
                <p>• Earnings release automatically into your M-Pesa wallet as views accumulate.</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalBounty(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs"
                >
                  Confirm Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
