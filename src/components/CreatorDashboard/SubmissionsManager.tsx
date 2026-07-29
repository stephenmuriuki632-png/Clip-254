import React, { useState } from 'react';
import { 
  Film, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Eye, 
  Download, 
  Share2, 
  Bookmark, 
  Star, 
  Play, 
  Clock, 
  Award,
  ExternalLink
} from 'lucide-react';
import { ClipSubmission } from '../../types';
import { useApp } from '../../context/AppContext';
import { NoSubmissionsEmptyState } from './EmptyStates';
import { SubmissionReviewModal } from './SubmissionReviewModal';

export const SubmissionsManager: React.FC = () => {
  const { submissions, toggleBookmarkSubmission } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedBounty, setSelectedBounty] = useState<string>('all');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState<boolean>(false);

  const [activeReviewSubmission, setActiveReviewSubmission] = useState<ClipSubmission | null>(null);

  // Filter logic
  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = s.clipTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.editorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.bountyTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || s.status === selectedStatus;
    const matchesBounty = selectedBounty === 'all' || s.bountyId === selectedBounty;
    const matchesBookmark = !showBookmarkedOnly || s.bookmarked;

    return matchesSearch && matchesStatus && matchesBounty && matchesBookmark;
  });

  const bountiesList = Array.from(new Set(submissions.map(s => s.bountyTitle)));

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
              <Film className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold font-heading text-white">Clip Submissions & Approvals</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Review video submissions from editors & clippers. Watch previews, approve payouts to M-Pesa, or request revisions.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
            className={`px-4 py-2 rounded-xl border font-bold transition-colors flex items-center gap-2 ${
              showBookmarkedOnly
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Bookmarked ({submissions.filter(s => s.bookmarked).length})</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search clip title, editor name, campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">All Approval States</option>
              <option value="pending">Pending Review</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="revision_requested">Revision Requested</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedBounty}
              onChange={(e) => setSelectedBounty(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">All Campaigns</option>
              {bountiesList.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

        </div>
      </div>

      {/* Submissions Grid */}
      {filteredSubmissions.length === 0 ? (
        <NoSubmissionsEmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSubmissions.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-indigo-500/30 transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Thumbnail / Video Banner */}
              <div className="relative aspect-9/16 max-h-56 bg-black overflow-hidden flex items-center justify-center">
                <img
                  src={s.thumbnail}
                  alt={s.clipTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <button
                  onClick={() => setActiveReviewSubmission(s)}
                  className="absolute z-10 w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>

                {/* Status Badge overlay */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase shadow-sm ${
                    s.status === 'approved' || s.status === 'paid'
                      ? 'bg-emerald-500 text-white'
                      : s.status === 'rejected'
                      ? 'bg-rose-500 text-white'
                      : s.status === 'revision_requested'
                      ? 'bg-amber-500 text-white'
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {s.status.replace('_', ' ')}
                  </span>
                </div>

                <button
                  onClick={() => toggleBookmarkSubmission(s.id)}
                  className={`absolute top-3 right-3 z-10 p-1.5 rounded-lg backdrop-blur-md transition-colors ${
                    s.bookmarked
                      ? 'bg-amber-500 text-white'
                      : 'bg-black/50 text-white/80 hover:text-white'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <div className="absolute bottom-2 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-white/90">
                  <span className="flex items-center gap-1 font-semibold">
                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                    {s.views.toLocaleString()} views
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    {(s.payoutKES || 2500).toLocaleString()} KES
                  </span>
                </div>
              </div>

              {/* Submission Metadata */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1 font-heading">
                    {s.clipTitle}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={s.editorAvatar}
                      alt={s.editorName}
                      className="w-6 h-6 rounded-lg object-cover ring-1 ring-slate-200"
                    />
                    <div className="text-[11px] leading-tight">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{s.editorName}</p>
                      <p className="text-slate-400 text-[10px]">{s.submittedAt}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveReviewSubmission(s)}
                    className="w-full py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Review Submission</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Review & Approval Modal */}
      {activeReviewSubmission && (
        <SubmissionReviewModal
          submission={activeReviewSubmission}
          onClose={() => setActiveReviewSubmission(null)}
        />
      )}

    </div>
  );
};
