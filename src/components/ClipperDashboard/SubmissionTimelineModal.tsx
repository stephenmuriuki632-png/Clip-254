import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  DollarSign,
  Video,
  ExternalLink,
  MessageSquare,
  Star,
  FileCheck2
} from 'lucide-react';
import { ClipSubmission } from '../../types';

interface SubmissionTimelineModalProps {
  submission: ClipSubmission | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionTimelineModal: React.FC<SubmissionTimelineModalProps> = ({
  submission,
  isOpen,
  onClose
}) => {
  if (!isOpen || !submission) return null;

  const timelineSteps = [
    {
      title: 'Draft & Upload Created',
      description: `Uploaded "${submission.clipTitle}" source footage.`,
      date: submission.submittedAt,
      completed: true,
      current: false
    },
    {
      title: 'Submitted for Brand Review',
      description: 'Clip indexed in verification queue.',
      date: submission.submittedAt,
      completed: true,
      current: false
    },
    {
      title: 'Under Review by Brand Lead',
      description: 'Checking hook retention, resolution, captions, and brand assets.',
      date: submission.submittedAt,
      completed: submission.status !== 'pending',
      current: submission.status === 'pending' || submission.status === 'under_review'
    },
    {
      title: submission.status === 'revision_requested' ? 'Revision Requested' : submission.status === 'rejected' ? 'Submission Rejected' : 'Approved & Verified',
      description: submission.feedback || submission.revisionNotes || 'Clip met all quality standards.',
      date: submission.approvedAt || 'In progress',
      completed: submission.status === 'approved' || submission.status === 'completed' || submission.status === 'paid',
      current: submission.status === 'revision_requested' || submission.status === 'rejected'
    },
    {
      title: 'Escrow Payout Released',
      description: `KES ${(submission.payoutKES || 2500).toLocaleString()} transferred to Clipper Wallet.`,
      date: submission.approvedAt || 'Pending approval',
      completed: submission.status === 'completed' || submission.status === 'paid' || submission.status === 'approved',
      current: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Submission Verification Timeline
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Clip: <span className="font-bold text-slate-900 dark:text-white">{submission.clipTitle}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clip Summary Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
          <img src={submission.thumbnail} alt={submission.clipTitle} className="w-16 h-12 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{submission.clipTitle}</h4>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
              <span>Bounty: {submission.bountyTitle}</span> •
              <span className="text-emerald-500 font-bold">KES {(submission.payoutKES || 2500).toLocaleString()}</span>
            </div>
          </div>
          <a
            href={submission.platformUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:text-indigo-600 flex items-center gap-1"
          >
            View Link <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Vertical Timeline */}
        <div className="space-y-6 relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 ml-3">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div
                className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step.completed
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                    : step.current
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 animate-pulse'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {step.completed ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : step.current ? (
                  <Clock className="w-3.5 h-3.5" />
                ) : (
                  idx + 1
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {step.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">{step.date}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
          >
            Close Timeline
          </button>
        </div>

      </div>
    </div>
  );
};
