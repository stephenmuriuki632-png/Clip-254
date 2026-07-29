import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, Star, ShieldCheck, MessageSquare, ExternalLink, Check, Eye } from 'lucide-react';
import { UserRole, UserProfile } from '../../types';

export const CreatorMarketplace: React.FC = () => {
  const { creators, setSelectedCreator, setActiveTab, searchQuery } = useApp();
  
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [nicheFilter, setNicheFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  const nichesList = ['Tech & Gadgets', 'Video Editing', 'Lifestyle', 'Beauty & Skincare', 'Motion Graphics', 'Sports'];
  const locationsList = ['Kenya', 'Nigeria', 'Nairobi', 'Mombasa', 'Lagos'];

  const filteredCreators = creators.filter((c) => {
    // Search query match
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchBio = c.bio.toLowerCase().includes(q);
      const matchNiche = c.niche.some(n => n.toLowerCase().includes(q));
      if (!matchName && !matchBio && !matchNiche) return false;
    }

    if (roleFilter !== 'all' && c.role !== roleFilter) return false;
    if (nicheFilter !== 'all' && !c.niche.includes(nicheFilter)) return false;
    if (locationFilter !== 'all' && !c.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;

    return true;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
              Creator Marketplace
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
              {filteredCreators.length} Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Hire top African Video Editors, UGC Creators, Influencers, and Tech Content Creators with Escrow protection.
          </p>
        </div>

        {/* Role Quick Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {[
            { id: 'all', label: 'All Roles' },
            { id: 'editor', label: 'Video Editors' },
            { id: 'ugc', label: 'UGC Talent' },
            { id: 'creator', label: 'Content Creators' },
            { id: 'freelancer', label: 'Freelancers' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                roleFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filters:</span>
        
        {/* Niche Dropdown */}
        <select
          value={nicheFilter}
          onChange={(e) => setNicheFilter(e.target.value)}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Niches</option>
          {nichesList.map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        {/* Location Dropdown */}
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Locations</option>
          {locationsList.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCreators.map((creator) => (
          <div
            key={creator.id}
            className="group rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Profile Card Top */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-13 h-13 rounded-xl object-cover ring-2 ring-indigo-500/20 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-heading font-extrabold text-slate-900 dark:text-white text-base">
                        {creator.name}
                      </h3>
                      {creator.verified && (
                        <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-950" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {creator.handle}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                      <MapPin className="w-3 h-3 text-indigo-500" />
                      <span>{creator.location}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{creator.rating}</span>
                </div>
              </div>

              {/* Badge & Role Pill */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {creator.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900">
                    {creator.badge}
                  </span>
                )}
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 capitalize">
                  {creator.role}
                </span>
                <span className="text-[10px] text-slate-400 self-center ml-auto">
                  {creator.followersCount ? `${(creator.followersCount / 1000).toFixed(0)}k followers` : ''}
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                {creator.bio}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {creator.skills.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Rates & Actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Starting Rate</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {creator.rates.videoClipKES
                    ? `${creator.rates.videoClipKES.toLocaleString()} KES`
                    : creator.rates.ugcPostKES
                    ? `${creator.rates.ugcPostKES.toLocaleString()} KES`
                    : `${(creator.rates.hourlyKES || 3000).toLocaleString()} KES/hr`}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedCreator(creator)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
