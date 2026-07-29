import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  MapPin,
  Globe,
  Clock,
  Star,
  CheckCircle2,
  Video,
  Image,
  Sparkles,
  Award,
  Layers,
  MessageSquare,
  Bookmark,
  Send,
  ExternalLink,
  ChevronRight,
  Package,
  FileText,
  ThumbsUp,
  Sliders,
  DollarSign
} from 'lucide-react';
import { UGCProfileData, UGCPackage, UGCPortfolioItem } from '../../types';

interface UGCCreatorProfileModalProps {
  creator: UGCProfileData | null;
  isOpen: boolean;
  onClose: () => void;
  onBookCreator?: (creator: UGCProfileData, pkg?: UGCPackage) => void;
  onSendMessage?: (creator: UGCProfileData) => void;
}

export const UGCCreatorProfileModal: React.FC<UGCCreatorProfileModalProps> = ({
  creator,
  isOpen,
  onClose,
  onBookCreator,
  onSendMessage
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'services' | 'packages' | 'reviews' | 'about'>('portfolio');
  const [selectedPortfolioType, setSelectedPortfolioType] = useState<string>('all');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  if (!isOpen || !creator) return null;

  const filteredPortfolio = selectedPortfolioType === 'all'
    ? creator.portfolioItems
    : creator.portfolioItems.filter(item => item.type === selectedPortfolioType);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
              isBookmarked
                ? 'bg-rose-500 text-white'
                : 'bg-black/40 hover:bg-black/60 text-white'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark Creator'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          
          {/* Cover & Profile Header */}
          <div className="relative">
            <div className="h-44 sm:h-56 w-full bg-slate-800 overflow-hidden">
              <img
                src={creator.coverImage}
                alt={creator.displayName}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 relative z-10 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                  <div className="relative">
                    <img
                      src={creator.avatar}
                      alt={creator.displayName}
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl border-4 border-white dark:border-slate-900 object-cover shadow-xl"
                    />
                    {creator.verifiedBadge && (
                      <div className="absolute -bottom-1 -right-1 p-1.5 bg-indigo-600 text-white rounded-full border-2 border-white dark:border-slate-900 shadow-md">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                        {creator.displayName}
                      </h2>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        {creator.availabilityStatus}
                      </span>
                    </div>

                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      @{creator.username} • {creator.city}, {creator.country}
                    </p>

                    <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-600 dark:text-slate-300 pt-1">
                      <span className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {creator.averageRating} ({creator.reviewsCount} reviews)
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {creator.completedProjectsCount} Projects
                      </span>
                      <span>•</span>
                      <span className="text-slate-500">
                        {creator.responseTimeMinutes}m avg response
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onSendMessage && onSendMessage(creator)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Message</span>
                  </button>

                  <button
                    onClick={() => onBookCreator && onBookCreator(creator)}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Hire Creator</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Accounts Bar */}
          <div className="border-y border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 py-3 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto flex items-center justify-between overflow-x-auto gap-4 no-scrollbar">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Verified Socials:
              </span>
              <div className="flex items-center gap-3">
                {creator.socialAccounts.map((acc) => (
                  <a
                    key={acc.platform}
                    href={acc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs hover:border-indigo-500 transition-colors"
                  >
                    <span className="font-extrabold text-slate-900 dark:text-white">{acc.platform}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold">
                      {(acc.followersCount / 1000).toFixed(0)}k
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      {acc.engagementRate}% ER
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 bg-white dark:bg-slate-900 sticky top-0 z-10">
            <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'portfolio', label: 'Portfolio Showcase', icon: Video },
                { id: 'packages', label: 'Packages & Rates', icon: Package },
                { id: 'services', label: 'Services Offered', icon: Sparkles },
                { id: 'reviews', label: `Reviews (${creator.reviewsCount})`, icon: Star },
                { id: 'about', label: 'Bio & Equipment', icon: FileText }
              ].map((tab) => {
                const IconComp = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-3.5 px-4 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Container */}
          <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
            
            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                {/* Filter Sub-Bar */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                  {['all', 'video', 'before_after', 'case_study', 'testimonial'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedPortfolioType(type)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                        selectedPortfolioType === type
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {type.replace('_', ' & ')}
                    </button>
                  ))}
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredPortfolio.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 overflow-hidden shadow-2xs group hover:border-indigo-500/50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Media Container */}
                        <div className="relative aspect-video bg-slate-900 overflow-hidden">
                          {item.type === 'video' ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img
                                src={item.thumbnailUrl || item.mediaUrl}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <button
                                  onClick={() => setActiveVideoUrl(item.mediaUrl)}
                                  className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                                >
                                  <Video className="w-6 h-6 ml-0.5" />
                                </button>
                              </div>
                            </div>
                          ) : item.type === 'before_after' ? (
                            <div className="grid grid-cols-2 h-full gap-0.5">
                              <div className="relative">
                                <img src={item.beforeUrl} alt="Before" className="w-full h-full object-cover" />
                                <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  BEFORE
                                </span>
                              </div>
                              <div className="relative">
                                <img src={item.afterUrl} alt="After" className="w-full h-full object-cover" />
                                <span className="absolute bottom-1 right-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  AFTER
                                </span>
                              </div>
                            </div>
                          ) : (
                            <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover" />
                          )}

                          {item.isPinned && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-extrabold text-[10px] flex items-center gap-1 shadow-md">
                              <Sparkles className="w-3 h-3" /> Pinned
                            </span>
                          )}
                        </div>

                        {/* Title & Info */}
                        <div className="p-4 space-y-2">
                          <h4 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Results Pill */}
                      {item.results && (
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border-t border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between text-xs">
                          <span className="font-bold text-emerald-800 dark:text-emerald-300">
                            Verified Result:
                          </span>
                          <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                            {item.results}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PACKAGES TAB */}
            {activeTab === 'packages' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {creator.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                      pkg.name === 'Standard Package'
                        ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-md ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80'
                    }`}
                  >
                    <div className="space-y-4">
                      {pkg.name === 'Standard Package' && (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-600 text-white uppercase tracking-wider inline-block">
                          Most Popular
                        </span>
                      )}

                      <div>
                        <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                          {pkg.name}
                        </h3>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-heading">
                            {pkg.priceKES.toLocaleString()}
                          </span>
                          <span className="text-xs font-bold text-slate-500">KES (${pkg.priceUSD})</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs border-y border-slate-200 dark:border-slate-700 py-3">
                        <div className="flex justify-between text-slate-600 dark:text-slate-300">
                          <span>Delivery Time:</span>
                          <span className="font-bold text-slate-900 dark:text-white">{pkg.deliveryDays} Days</span>
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-300">
                          <span>Revisions Included:</span>
                          <span className="font-bold text-slate-900 dark:text-white">{pkg.revisions} Revisions</span>
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-300">
                          <span>Video Duration:</span>
                          <span className="font-bold text-slate-900 dark:text-white">{pkg.videoLengthSeconds} seconds</span>
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-300">
                          <span>Resolution:</span>
                          <span className="font-bold text-slate-900 dark:text-white">{pkg.resolution}</span>
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-300">
                          <span>Usage Rights:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{pkg.usageRights}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Includes:</p>
                        {pkg.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onBookCreator && onBookCreator(creator, pkg)}
                      className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <span>Select {pkg.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {creator.servicesOffered.map((svc) => (
                  <div
                    key={svc}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base flex-shrink-0">
                      ⚡
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">{svc}</h4>
                      <p className="text-[10px] text-slate-500">Available on order</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                      {creator.averageRating} out of 5.0
                    </h3>
                    <p className="text-xs text-slate-500">Based on {creator.reviewsCount} verified brand reviews</p>
                  </div>
                  <div className="flex gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Reviews Mock Items */}
                  {[
                    {
                      id: 'r1',
                      brand: 'Safaricom M-Pesa',
                      rating: 5,
                      date: 'July 2026',
                      comment: 'Exceptional work on the Visa virtual card launch campaign. High retention hook and clear Swahili audio.'
                    },
                    {
                      id: 'r2',
                      brand: 'Jumia Kenya',
                      rating: 5,
                      date: 'June 2026',
                      comment: 'Delivered 2 days ahead of schedule. The unboxing video performed amazingly well on Instagram Reels.'
                    }
                  ].map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white">{rev.brand}</span>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                {/* Professional Bio */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">Professional Bio</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{creator.bio}</p>
                </div>

                {/* Equipment Used */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">Production Equipment</h4>
                  <div className="flex flex-wrap gap-2">
                    {creator.equipmentUsed.map((eq) => (
                      <span
                        key={eq}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
                      >
                        📷 {eq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages & Niches */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <h5 className="font-bold text-xs text-slate-400 uppercase">Languages Spoken</h5>
                    <div className="flex gap-2">
                      {creator.languages.map((lang) => (
                        <span key={lang} className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                          🗣️ {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <h5 className="font-bold text-xs text-slate-400 uppercase">Content Niches</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {creator.contentNiches.map((niche) => (
                        <span key={niche} className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                          {niche}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Video Lightbox Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden">
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <video src={activeVideoUrl} controls autoPlay className="w-full h-full object-contain" />
          </div>
        </div>
      )}

    </div>
  );
};
