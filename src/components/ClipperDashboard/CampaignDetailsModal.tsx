import React, { useState } from 'react';
import {
  X,
  Video,
  DollarSign,
  Calendar,
  Layers,
  User,
  Download,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  FileText,
  CheckCircle2,
  Share2,
  Bookmark,
  Sparkles,
  Send
} from 'lucide-react';
import { Campaign } from '../../types';
import { useApp } from '../../context/AppContext';

interface CampaignDetailsModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenUploader?: (campaign: Campaign) => void;
  onOpenDownloader?: (campaign: Campaign) => void;
}

export const CampaignDetailsModal: React.FC<CampaignDetailsModalProps> = ({
  campaign,
  isOpen,
  onClose,
  onOpenUploader,
  onOpenDownloader
}) => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'details' | 'instructions' | 'files' | 'faqs' | 'comments'>('details');
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<{ id: string; user: string; avatar: string; text: string; time: string }>>([
    {
      id: 'c1',
      user: 'Otieno B.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      text: 'Are we allowed to use CapCut sound effects for the transition cuts?',
      time: '2 hours ago'
    },
    {
      id: 'c2',
      user: 'Brand Team',
      avatar: campaign?.brandLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
      text: 'Yes! High energy CapCut sound effects and dynamic kinetic typography are encouraged!',
      time: '1 hour ago'
    }
  ]);
  const [newComment, setNewComment] = useState('');

  if (!isOpen || !campaign) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments(prev => [
      ...prev,
      {
        id: 'c_' + Date.now(),
        user: currentUser.name,
        avatar: currentUser.avatar,
        text: newComment.trim(),
        time: 'Just now'
      }
    ]);
    setNewComment('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert('Campaign link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header & Banner */}
        <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden flex-shrink-0">
          <img
            src={campaign.brandLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
            alt={campaign.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                bookmarked ? 'bg-amber-500 text-white' : 'bg-slate-900/60 text-slate-300 hover:text-white'
              }`}
              title="Bookmark Campaign"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-slate-900/60 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
              title="Share Campaign"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Banner Content */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-slate-200/50 flex-shrink-0">
                <img
                  src={campaign.brandLogo}
                  alt={campaign.brandName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  {campaign.category}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
                  {campaign.title}
                </h1>
                <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5 mt-0.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  By {campaign.brandName} • {campaign.applicantsCount || 12} Clippers Applied
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Pay Per Approved Clip</p>
                <p className="text-lg font-black text-emerald-400">
                  KES {(campaign.paymentPerClipKES || 3500).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 px-6 gap-2 overflow-x-auto flex-shrink-0">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'details'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Campaign Overview
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'instructions'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Instructions & Rules
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'files'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" /> Sources & Brand Assets
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'faqs'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> FAQs
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'comments'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Q&A ({comments.length})
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Key Specs Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Pool Budget</p>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                    KES {(campaign.budgetKES || 50000).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Payment / Clip</p>
                  <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    KES {(campaign.paymentPerClipKES || 3500).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Difficulty</p>
                  <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 mt-0.5">
                    {campaign.difficulty || 'Intermediate'}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Deadline</p>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    {campaign.deadline}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">
                  Campaign Brief & Objectives
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {campaign.description || 'Create 30-60 second high-impact vertical clips (9:16 aspect ratio) targeting young African audiences on TikTok and YouTube Shorts. Focus on high viral retention hooks, animated captions, and clear call-to-action overlays.'}
                </p>
              </div>

              {/* Target Tags & Hashtags */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">
                  Required Hashtags & Niche Keywords
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {(campaign.hashtags || ['#ClipKenya', '#TechTok', '#NairobiEdits', '#ViralKe', '#CapCutTrend']).map((tag, i) => (
                    <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reference Videos */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">
                  Reference & Inspiration Clips
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center gap-3">
                    <div className="w-16 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden relative flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=200&q=80" alt="ref" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Video className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Sample High-Viral Hook Style</p>
                      <a href="#" className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:underline">
                        Watch Example <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center gap-3">
                    <div className="w-16 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden relative flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80" alt="ref" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Video className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Pacing & Kinetic Subtitles</p>
                      <a href="#" className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:underline">
                        Watch Example <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/60 text-xs text-indigo-900 dark:text-indigo-200">
                <p className="font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-500" /> Quality Guidelines for Approval
                </p>
                Follow these exact guidelines to guarantee instant approval and 100% payout from the brand.
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Aspect Ratio & Resolution</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Must be 9:16 vertical format (1080x1920 minimum resolution) at 30fps or 60fps.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">First 3-Second Hook Rule</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      The clip must start immediately with an action scene or high-curiosity phrase. Avoid long intros or logo animations in the first 3 seconds.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Subtitles & Branding</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Include word-by-word animated captions with high contrast colors (e.g. yellow/white text with black stroke). Include brand logo watermark in the top corner.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Brand Source Files & Assets
                </h3>
                {onOpenDownloader && (
                  <button
                    onClick={() => onOpenDownloader(campaign)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-medium text-xs flex items-center gap-1.5 hover:bg-indigo-700"
                  >
                    <Download className="w-3.5 h-3.5" /> Download All Files
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Main Stream Footage (4K)</p>
                    <p className="text-[10px] text-slate-400">1.2 GB • MP4 • 1080p</p>
                  </div>
                  <button
                    onClick={() => onOpenDownloader && onOpenDownloader(campaign)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm hover:text-indigo-600"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Transparent PNG Logos</p>
                    <p className="text-[10px] text-slate-400">14.5 MB • ZIP Archive</p>
                  </div>
                  <button
                    onClick={() => onOpenDownloader && onOpenDownloader(campaign)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm hover:text-indigo-600"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Copyright-Free Audio Tracks</p>
                    <p className="text-[10px] text-slate-400">45 MB • WAV Files</p>
                  </div>
                  <button
                    onClick={() => onOpenDownloader && onOpenDownloader(campaign)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm hover:text-indigo-600"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">How fast will my clip be reviewed?</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Brands review submissions within 24 to 48 hours. Once approved, the payout is automatically released to your ClipKenya Wallet.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Can I submit multiple clips to the same campaign?</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Yes! You can submit up to 5 unique clips per campaign as long as each clip covers different angles or moments from the source material.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-4">
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ask a question or clarify instructions..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-xs flex items-center gap-1 hover:bg-indigo-700"
                >
                  <Send className="w-3.5 h-3.5" /> Ask
                </button>
              </form>

              <div className="space-y-3">
                {comments.map(c => (
                  <div key={c.id} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
                    <img src={c.avatar} alt={c.user} className="w-8 h-8 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{c.user}</span>
                        <span className="text-[10px] text-slate-400">{c.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Reward Rate</span>
            <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              KES {(campaign.paymentPerClipKES || 3500).toLocaleString()} <span className="text-xs text-slate-500 font-normal">/ approved clip</span>
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onOpenDownloader && (
              <button
                onClick={() => onOpenDownloader(campaign)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <Download className="w-4 h-4" /> Download Sources
              </button>
            )}

            {onOpenUploader && (
              <button
                onClick={() => {
                  onClose();
                  onOpenUploader(campaign);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
              >
                <Video className="w-4 h-4" /> Submit Clip Now
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
