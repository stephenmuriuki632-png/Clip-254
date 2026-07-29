import React, { useState } from 'react';
import {
  Search,
  Filter,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  ArrowUpRight,
  Send,
  Eye,
  MessageSquare,
  Sparkles,
  Users,
  Layers,
  DollarSign
} from 'lucide-react';
import { UGCProfileData, UGCCampaignDetail, UGCPackage } from '../../types';

interface UGCDiscoveryProps {
  creators: UGCProfileData[];
  campaigns: UGCCampaignDetail[];
  onSelectCreator: (creator: UGCProfileData) => void;
  onSelectCampaign: (campaign: UGCCampaignDetail) => void;
  onOpenCreateCampaign: () => void;
}

export const UGCDiscovery: React.FC<UGCDiscoveryProps> = ({
  creators,
  campaigns,
  onSelectCreator,
  onSelectCampaign,
  onOpenCreateCampaign
}) => {
  const [viewMode, setViewMode] = useState<'creators' | 'campaigns'>('creators');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(50000);

  const categories = [
    'Beauty Content',
    'Tech Reviews',
    'Fitness Content',
    'Fashion Content',
    'Food Content',
    'Fintech & Mobile Money',
    'E-Commerce & Electronics'
  ];

  // Filter creators
  const filteredCreators = creators.filter((c) => {
    const matchesSearch =
      c.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contentNiches.some(n => n.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || c.contentNiches.includes(categoryFilter);
    const matchesCountry = countryFilter === 'all' || c.country === countryFilter;
    const matchesVerified = !verifiedOnly || c.verifiedBadge;
    const matchesPrice = c.startingPriceKES <= maxPrice;

    return matchesSearch && matchesCategory && matchesCountry && matchesVerified && matchesPrice;
  });

  // Filter campaigns
  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesSearch =
      camp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || camp.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Search Header Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold border border-white/20">
                ⭐ Global & African UGC Network
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight mt-2">
              Hire Verified UGC Creators & Find Brand Briefs
            </h1>
            <p className="text-xs text-indigo-200/90 max-w-2xl mt-1">
              Connect directly with vetted video creators producing high-converting TikTok Ads, Instagram Reels, and Unboxing videos with escrow payment guarantee.
            </p>
          </div>

          <button
            onClick={onOpenCreateCampaign}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>Post UGC Campaign Brief</span>
          </button>
        </div>

        {/* View Toggle + Search Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          
          {/* View Mode Switch */}
          <div className="flex rounded-2xl bg-black/40 p-1 border border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setViewMode('creators')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'creators'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-indigo-200 hover:text-white'
              }`}
            >
              Browse UGC Creators ({filteredCreators.length})
            </button>
            <button
              onClick={() => setViewMode('campaigns')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'campaigns'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-indigo-200 hover:text-white'
              }`}
            >
              Brand Campaign Briefs ({filteredCampaigns.length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder={
                viewMode === 'creators'
                  ? 'Search by name, niche, skill (e.g., Beauty, Unboxing, Voiceover)...'
                  : 'Search briefs by brand, product, platform...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 text-white placeholder-indigo-200/60 border border-white/20 text-xs font-medium focus:outline-none focus:bg-white/20"
            />
          </div>

        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors ${
              categoryFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <span>Verified Badge Only</span>
          </label>
        </div>

      </div>

      {/* CREATORS GRID VIEW */}
      {viewMode === 'creators' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <div
              key={creator.id}
              className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Cover & Avatar Header */}
                <div className="relative h-28 bg-slate-800">
                  <img
                    src={creator.coverImage}
                    alt={creator.displayName}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                    Starting {creator.startingPriceKES.toLocaleString()} KES
                  </div>
                </div>

                <div className="px-5 pt-0 pb-4 relative">
                  <div className="flex items-end justify-between -mt-10 mb-3">
                    <div className="relative">
                      <img
                        src={creator.avatar}
                        alt={creator.displayName}
                        className="w-20 h-20 rounded-2xl border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                      />
                      {creator.verifiedBadge && (
                        <div className="absolute -bottom-1 -right-1 p-1 bg-indigo-600 text-white rounded-full border-2 border-white dark:border-slate-800">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-amber-500 font-extrabold text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{creator.averageRating}</span>
                        <span className="text-slate-400 font-normal">({creator.reviewsCount})</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-0.5">
                        {creator.availabilityStatus}
                      </span>
                    </div>
                  </div>

                  {/* Name & Bio */}
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {creator.displayName}
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      @{creator.username} • {creator.city}, {creator.country}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {creator.bio}
                    </p>
                  </div>

                  {/* Content Niches */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {creator.contentNiches.map((niche) => (
                      <span
                        key={niche}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-semibold"
                      >
                        {niche}
                      </span>
                    ))}
                  </div>

                  {/* Social Followers Counters */}
                  <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/80 text-center">
                    {creator.socialAccounts.slice(0, 3).map((soc) => (
                      <div key={soc.platform}>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block">{soc.platform}</span>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                          {(soc.followersCount / 1000).toFixed(0)}k
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-400 font-medium">
                  {creator.deliveryTimeDays}-day delivery
                </span>

                <button
                  onClick={() => onSelectCreator(creator)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-2xs transition-all"
                >
                  <span>View Portfolio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* CAMPAIGNS GRID VIEW */}
      {viewMode === 'campaigns' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={camp.brandLogo}
                      alt={camp.brandName}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h4 className="font-heading font-extrabold text-slate-900 dark:text-white text-sm">
                        {camp.brandName}
                      </h4>
                      <span className="text-[10px] text-slate-400 block">{camp.category}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 uppercase">
                    {camp.platform}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                    {camp.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Payout Per Video</span>
                    <span className="font-heading font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                      {camp.pricePerVideoKES ? camp.pricePerVideoKES.toLocaleString() : camp.budgetKES.toLocaleString()} KES
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Deadline</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{camp.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-400">
                  {camp.applicantsCount} applicants
                </span>

                <button
                  onClick={() => onSelectCampaign(camp)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1 shadow-2xs"
                >
                  <span>Apply for Brief</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
