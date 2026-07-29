import React, { useState } from 'react';
import {
  Search,
  Filter,
  Video,
  DollarSign,
  Calendar,
  Star,
  Download,
  Bookmark,
  Share2,
  CheckCircle2,
  Eye,
  SlidersHorizontal,
  Flame,
  Award,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { Campaign } from '../../types';
import { useApp } from '../../context/AppContext';
import { EmptyState } from './EmptyStates';

interface CampaignMarketplaceProps {
  onSelectCampaign: (campaign: Campaign) => void;
  onOpenUploader: (campaign: Campaign) => void;
  onOpenDownloader: (campaign: Campaign) => void;
}

export const CampaignMarketplace: React.FC<CampaignMarketplaceProps> = ({
  onSelectCampaign,
  onOpenUploader,
  onOpenDownloader
}) => {
  const { campaigns } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [minPaymentKES, setMinPaymentKES] = useState<number>(0);
  const [verifiedCreatorsOnly, setVerifiedCreatorsOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'payment' | 'deadline' | 'popularity'>('newest');
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Tech & Gadgets', 'Gaming & Streams', 'Lifestyle & Vlogs', 'Comedy & Skits', 'Crypto & Business', 'Podcast Edits'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Pro', 'Viral Masters'];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(`${window.location.origin}/campaigns/${id}`);
    alert('Campaign share link copied to clipboard!');
  };

  // Filter & Sort Logic
  const filteredCampaigns = campaigns
    .filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || (c.difficulty || 'Intermediate') === selectedDifficulty;
      const matchesPayment = (c.paymentPerClipKES || 3500) >= minPaymentKES;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesPayment;
    })
    .sort((a, b) => {
      if (sortBy === 'payment') {
        return (b.paymentPerClipKES || 3500) - (a.paymentPerClipKES || 3500);
      }
      if (sortBy === 'popularity') {
        return (b.applicantsCount || 0) - (a.applicantsCount || 0);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-indigo-500" /> Campaign Bounties Marketplace
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Discover active clip bounties from top Kenyan creators & brands. Get paid per approved clip.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search campaigns, brands, tech..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="payment">Highest Payment Per Clip</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Bar */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Difficulty:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-semibold"
              >
                {difficulties.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Min Payment:</span>
              <select
                value={minPaymentKES}
                onChange={(e) => setMinPaymentKES(Number(e.target.value))}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-semibold"
              >
                <option value={0}>Any Amount</option>
                <option value={2000}>KES 2,000+</option>
                <option value={5000}>KES 5,000+</option>
                <option value={10000}>KES 10,000+</option>
              </select>
            </div>
          </div>

          <span className="text-xs text-slate-400 font-semibold">
            Showing <span className="text-indigo-600 dark:text-indigo-400 font-bold">{filteredCampaigns.length}</span> active campaign bounties
          </span>
        </div>
      </div>

      {/* Campaign Cards Grid */}
      {filteredCampaigns.length === 0 ? (
        <EmptyState
          icon="campaigns"
          title="No Matching Campaigns Found"
          description="Try relaxing your category or payment filters to view more available clip bounties."
          actionLabel="Reset Filters"
          onAction={() => {
            setSelectedCategory('All');
            setSelectedDifficulty('All');
            setMinPaymentKES(0);
            setSearchTerm('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCampaigns.map(camp => (
            <div
              key={camp.id}
              onClick={() => onSelectCampaign(camp)}
              className="p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1 relative"
            >
              <div>
                {/* Header Info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={camp.brandLogo}
                      alt={camp.brandName}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shadow-xs"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                        {camp.brandName}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium">{camp.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => toggleBookmark(camp.id, e)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        bookmarks[camp.id]
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                          : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600'
                      }`}
                      title="Bookmark"
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={(e) => handleShare(camp.id, e)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600"
                      title="Share"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Campaign Title */}
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {camp.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {camp.description}
                </p>

                {/* Key Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    {camp.difficulty || 'Intermediate'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    9:16 Vertical
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {camp.applicantsCount || 12} Applicants
                  </span>
                </div>
              </div>

              {/* Footer Specs & Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Payment / Clip</span>
                    <p className="text-base font-black text-emerald-600 dark:text-emerald-400">
                      KES {(camp.paymentPerClipKES || 3500).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Deadline</span>
                    <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-rose-500" /> {camp.deadline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDownloader(camp);
                    }}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Sources
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenUploader(camp);
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Submit Clip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
