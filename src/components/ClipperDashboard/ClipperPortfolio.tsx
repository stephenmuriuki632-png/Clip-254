import React, { useState } from 'react';
import {
  User,
  MapPin,
  Globe,
  Star,
  CheckCircle2,
  Video,
  Image as ImageIcon,
  Award,
  Edit3,
  ExternalLink,
  DollarSign,
  Briefcase,
  Share2,
  Sparkles,
  MessageSquare,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PortfolioVideo, ClipperReview } from './types';

export const ClipperPortfolio: React.FC = () => {
  const { currentUser, updateUserProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  // Editable local state
  const [bio, setBio] = useState(currentUser.bio || '');
  const [hourlyRate, setHourlyRate] = useState(currentUser.rates.hourlyKES || 3500);
  const [startingPrice, setStartingPrice] = useState(currentUser.rates.videoClipKES || 2500);
  const [availability, setAvailability] = useState<'available' | 'busy' | 'away'>('available');

  const [portfolioVideos, setPortfolioVideos] = useState<PortfolioVideo[]>([
    {
      id: 'pv1',
      title: 'Testing $150 Wireless Mic in Street Noise',
      thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      views: '1.2M views',
      likes: '98K likes',
      category: 'Tech & Gadgets',
      platform: 'tiktok'
    },
    {
      id: 'pv2',
      title: 'Top 5 Budget Editing Laptops in Kenya 2026',
      thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      views: '840K views',
      likes: '64K likes',
      category: 'Tutorials',
      platform: 'youtube'
    }
  ]);

  const [reviews] = useState<ClipperReview[]>([
    {
      id: 'r1',
      clientName: 'Safaricom Tech Hub',
      clientAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
      rating: 5,
      comment: 'Incredible fast editing! Maina turned our 1-hour developer stream into 6 viral TikTok clips that got over 500k views in 3 days!',
      date: '2 weeks ago',
      campaignTitle: 'Developer Summit Highlights'
    },
    {
      id: 'r2',
      clientName: 'Nairobi Gaming League',
      clientAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      rating: 5,
      comment: 'Top tier DaVinci color grading and kinetic captions. Always delivers on time.',
      date: '1 month ago',
      campaignTitle: 'Esports Tournament Clips'
    }
  ]);

  const handleSaveProfile = () => {
    updateUserProfile({
      bio,
      rates: {
        ...currentUser.rates,
        hourlyKES: hourlyRate,
        videoClipKES: startingPrice
      }
    });
    setIsEditing(false);
    alert('Portfolio details updated successfully!');
  };

  return (
    <div className="space-y-6">
      
      {/* Cover & Profile Header Card */}
      <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {/* Cover Image */}
        <div className="h-44 sm:h-56 bg-slate-800 relative">
          <img
            src={currentUser.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
            alt="Cover"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>

        {/* Profile Details Container */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-4 border-white dark:border-slate-900 bg-slate-800 shadow-xl overflow-hidden relative flex-shrink-0">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              {currentUser.verified && (
                <div className="absolute bottom-1 right-1 p-1 rounded-full bg-indigo-600 text-white shadow-md">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Verified Editor
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                <span>{currentUser.handle}</span> •
                <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" /> {currentUser.location}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all"
            >
              <Edit3 className="w-4 h-4" /> {isEditing ? 'Cancel Edit' : 'Edit Portfolio'}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Form if open */}
      {isEditing && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-lg space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" /> Edit Portfolio Public Profile
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Public Bio & Introduction
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Hourly Rate (KES)
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Starting Price Per Clip (KES)
                </label>
                <input
                  type="number"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleSaveProfile}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid Specs & Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Bio & Skills */}
        <div className="space-y-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              About & Rates
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentUser.bio}
            </p>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Hourly Rate:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">KES {currentUser.rates.hourlyKES?.toLocaleString()} / hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Starting Price / Clip:</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">KES {currentUser.rates.videoClipKES?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Completed Orders:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{currentUser.completedOrders} completed</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Editing Skills & Tools
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {(currentUser.skills || ['Adobe Premiere Pro', 'DaVinci Resolve', 'CapCut Pro', 'Subtitles', 'Color Grading']).map((skill, i) => (
                <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Featured Videos & Reviews */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Portfolio Showcase Videos */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-indigo-500" /> Featured Viral Portfolio Videos
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolioVideos.map(vid => (
                <div key={vid.id} className="p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                  <div className="aspect-video rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                    <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                      <Video className="w-6 h-6" />
                    </div>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1">{vid.title}</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span>{vid.views}</span>
                    <span className="text-indigo-500">{vid.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Testimonials / Reviews */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" /> Client Reviews & Testimonials ({reviews.length})
              </h3>
            </div>

            <div className="space-y-3">
              {reviews.map(rev => (
                <div key={rev.id} className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={rev.clientAvatar} alt={rev.clientName} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rev.clientName}</h4>
                        <p className="text-[10px] text-slate-400">{rev.campaignTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-yellow-400 text-xs font-bold">
                      {'★'.repeat(rev.rating)}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
