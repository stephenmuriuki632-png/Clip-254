import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Star, 
  Download, 
  Share2, 
  Bookmark, 
  ExternalLink, 
  Play, 
  Award,
  Clock,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { ClipSubmission } from '../../types';
import { useApp } from '../../context/AppContext';

interface SubmissionReviewModalProps {
  submission: ClipSubmission | null;
  onClose: () => void;
}

export const SubmissionReviewModal: React.FC<SubmissionReviewModalProps> = ({
  submission,
  onClose
}) => {
  const { 
    approveSubmission, 
    rejectSubmission, 
    requestRevision, 
    toggleBookmarkSubmission 
  } = useApp();

  const [feedback, setFeedback] = useState<string>('');
  const [revisionNotes, setRevisionNotes] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [activeActionTab, setActiveActionTab] = useState<'approve' | 'revision' | 'reject'>('approve');
  const [isCopied, setIsCopied] = useState(false);

  if (!submission) return null;

  const handleApprove = () => {
    approveSubmission(submission.id, feedback, rating);
    onClose();
  };

  const handleReject = () => {
    rejectSubmission(submission.id, feedback);
    onClose();
  };

  const handleRequestRevision = () => {
    if (!revisionNotes.trim()) {
      alert('Please provide detailed revision notes for the clipper.');
      return;
    }
    requestRevision(submission.id, revisionNotes);
    onClose();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(submission.platformUrl || window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <img
              src={submission.editorAvatar}
              alt={submission.editorName}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white font-heading">
                  {submission.clipTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase">
                  {submission.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Submitted by <span className="font-bold text-slate-700 dark:text-slate-300">{submission.editorName}</span> • Campaign: {submission.bountyTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmarkSubmission(submission.id)}
              className={`p-2 rounded-xl border transition-colors ${
                submission.bookmarked
                  ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950 dark:border-amber-800'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
              title="Bookmark Submission"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          
          {/* Video Player / Preview (Left col - 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-9/16 max-h-[480px] mx-auto rounded-2xl overflow-hidden bg-black shadow-lg flex items-center justify-center border border-slate-800 group">
              <img
                src={submission.thumbnail}
                alt={submission.clipTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3">
                <a
                  href={submission.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </a>
                <span className="text-xs font-semibold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Watch on Platform
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Submitted Date:</span>
                <span className="font-bold text-slate-800 dark:text-white">{submission.submittedAt}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Organic Views Tracked:</span>
                <span className="font-bold text-slate-800 dark:text-white">{submission.views.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Estimated Payout:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{(submission.payoutKES || 2500).toLocaleString()} KES</span>
              </div>
            </div>
          </div>

          {/* Review & Decision Workflow (Right col - 5 cols) */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setActiveActionTab('approve')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeActionTab === 'approve'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  Approve Clip
                </button>
                <button
                  onClick={() => setActiveActionTab('revision')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeActionTab === 'revision'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  Revision
                </button>
                <button
                  onClick={() => setActiveActionTab('reject')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeActionTab === 'reject'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  Reject
                </button>
              </div>

              {/* Action Form */}
              {activeActionTab === 'approve' && (
                <div className="space-y-3 p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Submission & Release Escrow Payout</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Rate Clipper Quality
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300 dark:text-slate-700'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Feedback / Praise for Clipper
                    </label>
                    <textarea
                      rows={3}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Great job on transitions, captions, and hook pacing!"
                      className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <button
                    onClick={handleApprove}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Approval & Pay {(submission.payoutKES || 2500).toLocaleString()} KES</span>
                  </button>
                </div>
              )}

              {activeActionTab === 'revision' && (
                <div className="space-y-3 p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 text-xs font-bold">
                    <RotateCcw className="w-4 h-4" />
                    <span>Request Changes from {submission.editorName}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Specific Revision Instructions *
                    </label>
                    <textarea
                      rows={4}
                      value={revisionNotes}
                      onChange={(e) => setRevisionNotes(e.target.value)}
                      placeholder="Please add auto-captions, increase sound volume by 20%, and fix aspect ratio to 9:16..."
                      className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <button
                    onClick={handleRequestRevision}
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Send Revision Request</span>
                  </button>
                </div>
              )}

              {activeActionTab === 'reject' && (
                <div className="space-y-3 p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-bold">
                    <XCircle className="w-4 h-4" />
                    <span>Reject Submission</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Rejection Reason
                    </label>
                    <textarea
                      rows={3}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Clip violates rule #2 (watermarks or unapproved audio track used)."
                      className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <button
                    onClick={handleReject}
                    className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Confirm Rejection</span>
                  </button>
                </div>
              )}

            </div>

            {/* Bottom Download & Chat Links */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
              <a
                href={submission.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Video File</span>
              </a>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
              >
                Close Window
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
