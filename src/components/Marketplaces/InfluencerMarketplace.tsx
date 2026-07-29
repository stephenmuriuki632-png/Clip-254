import React from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, Star, MapPin, ShieldCheck, ArrowUpRight, TrendingUp } from 'lucide-react';

export const InfluencerMarketplace: React.FC = () => {
  const { creators, setSelectedCreator, setActiveTab } = useApp();

  const influencers = creators.filter(c => c.followersCount > 100000);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
              Influencer Marketplace
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800">
              High Reach & Engagement
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Partner with top African influencers with verified audience demographics across TikTok, YouTube, Instagram, and X.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {influencers.map((inf) => (
          <div
            key={inf.id}
            className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Profile */}
              <div className="flex items-start gap-4">
                <img
                  src={inf.avatar}
                  alt={inf.name}
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-extrabold text-slate-900 dark:text-white text-base">
                      {inf.name}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="text-xs text-slate-500">{inf.handle}</p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                    <MapPin className="w-3 h-3 text-indigo-500" />
                    <span>{inf.location}</span>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Total Audience</p>
                  <p className="font-heading font-extrabold text-base text-indigo-600 dark:text-indigo-400">
                    {(inf.followersCount / 1000).toFixed(0)}K+
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Rating</p>
                  <div className="flex items-center justify-center gap-1 text-amber-500 font-extrabold text-base">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{inf.rating}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {inf.bio}
              </p>
            </div>

            {/* Rates & Contract */}
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Sponsored Video</p>
                <p className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                  {(inf.rates.sponsoredVideoKES || 50000).toLocaleString()} KES
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedCreator(inf);
                  setActiveTab('messages');
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1 shadow-2xs transition-colors"
              >
                <span>Request Deal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
