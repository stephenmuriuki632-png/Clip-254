import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Star, ShieldCheck, MessageSquare, ExternalLink, Play, CheckCircle2, DollarSign } from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const { selectedCreator, setSelectedCreator, setActiveTab } = useApp();

  if (!selectedCreator) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Creator Portfolio</span>
          <button
            onClick={() => setSelectedCreator(null)}
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold text-base"
          >
            ✕
          </button>
        </div>

        {/* Profile Card Top */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <img
            src={selectedCreator.avatar}
            alt={selectedCreator.name}
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-indigo-500/20"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                {selectedCreator.name}
              </h3>
              {selectedCreator.verified && (
                <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">{selectedCreator.handle} • {selectedCreator.location}</p>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {selectedCreator.badge || 'Verified Creator'}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{selectedCreator.rating} ({selectedCreator.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          {selectedCreator.bio}
        </p>

        {/* Rate Cards Grid */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
          <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Standard Rate Card (Escrow Protected)</span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
            {selectedCreator.rates.videoClipKES && (
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-[10px] text-slate-400 font-semibold">Video Clip Edit</p>
                <p className="font-bold text-indigo-600 dark:text-indigo-400">{selectedCreator.rates.videoClipKES.toLocaleString()} KES</p>
              </div>
            )}
            {selectedCreator.rates.ugcPostKES && (
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-[10px] text-slate-400 font-semibold">45s UGC Video</p>
                <p className="font-bold text-indigo-600 dark:text-indigo-400">{selectedCreator.rates.ugcPostKES.toLocaleString()} KES</p>
              </div>
            )}
            {selectedCreator.rates.sponsoredVideoKES && (
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-[10px] text-slate-400 font-semibold">Sponsored Integration</p>
                <p className="font-bold text-indigo-600 dark:text-indigo-400">{selectedCreator.rates.sponsoredVideoKES.toLocaleString()} KES</p>
              </div>
            )}
          </div>
        </div>

        {/* Featured Video Samples */}
        {selectedCreator.featuredVideos && (
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-900 dark:text-white">Featured Sample Videos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedCreator.featuredVideos.map((v, i) => (
                <a
                  key={i}
                  href={v.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center gap-3 hover:border-indigo-500/50 transition-colors group"
                >
                  <img src={v.thumbnail} alt={v.title} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{v.title}</p>
                    <span className="text-[10px] text-slate-400">{v.views}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={() => {
              setSelectedCreator(null);
              setActiveTab('messages');
            }}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message & Send Contract Offer</span>
          </button>
        </div>

      </div>
    </div>
  );
};
