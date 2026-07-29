import React, { useState } from 'react';
import {
  FileVideo,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Eye,
  Trash2,
  Edit3,
  ExternalLink,
  Plus,
  Filter,
  DollarSign,
  FileCheck2,
  RefreshCw,
  Search
} from 'lucide-react';
import { ClipSubmission } from '../../types';
import { useApp } from '../../context/AppContext';
import { EmptyState } from './EmptyStates';
import { SubmissionTimelineModal } from './SubmissionTimelineModal';

interface ClipSubmissionsManagerProps {
  onOpenUploader: () => void;
}

export const ClipSubmissionsManager: React.FC<ClipSubmissionsManagerProps> = ({ onOpenUploader }) => {
  const { submissions, rejectSubmission } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTimelineSub, setSelectedTimelineSub] = useState<ClipSubmission | null>(null);

  const statusFilters = [
    { id: 'all', label: 'All Submissions' },
    { id: 'pending', label: 'Pending & Review' },
    { id: 'revision_requested', label: 'Revision Needed' },
    { id: 'approved', label: 'Approved & Paid' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'draft', label: 'Drafts' }
  ];

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.clipTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sub.bountyTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === 'pending') return sub.status === 'pending' || sub.status === 'under_review';
    if (activeFilter === 'revision_requested') return sub.status === 'revision_requested';
    if (activeFilter === 'approved') return sub.status === 'approved' || sub.status === 'completed' || sub.status === 'paid';
    if (activeFilter === 'rejected') return sub.status === 'rejected';
    if (activeFilter === 'draft') return sub.status === 'draft';
    return true;
  });

  const getStatusBadge = (status: ClipSubmission['status']) => {
    switch (status) {
      case 'approved':
      case 'completed':
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved & Paid
          </span>
        );
      case 'pending':
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5 animate-pulse" /> Under Review
          </span>
        );
      case 'revision_requested':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
            <AlertCircle className="w-3.5 h-3.5" /> Revision Requested
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
            <Clock className="w-3.5 h-3.5" /> Draft
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileVideo className="w-5 h-5 text-indigo-500" /> Clip Submissions & Verifications
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your submitted video clips, track verification timeline, and check payouts.
          </p>
        </div>

        <button
          onClick={onOpenUploader}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
        >
          <Plus className="w-4 h-4" /> Submit New Clip
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {statusFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by clip title..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Submissions List / Table */}
      {filteredSubmissions.length === 0 ? (
        <EmptyState
          icon="campaigns"
          title="No Submissions Found"
          description="You haven't submitted any clips under this filter yet. Browse active campaign bounties and submit your first clip!"
          actionLabel="Submit Clip Now"
          onAction={onOpenUploader}
        />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                  <th className="p-4 pl-6">Clip & Bounty</th>
                  <th className="p-4">Submitted Date</th>
                  <th className="p-4">Status & Feedback</th>
                  <th className="p-4">Tracked Views</th>
                  <th className="p-4">Payout</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {filteredSubmissions.map(sub => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    
                    {/* Clip Info */}
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden relative flex-shrink-0 border border-slate-200 dark:border-slate-700">
                          <img src={sub.thumbnail} alt={sub.clipTitle} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-white line-clamp-1">{sub.clipTitle}</p>
                          <p className="text-[11px] text-slate-400 font-medium">Bounty: {sub.bountyTitle}</p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="p-4 font-semibold text-slate-600 dark:text-slate-300">
                      {sub.submittedAt}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <div className="space-y-1">
                        {getStatusBadge(sub.status)}
                        {(sub.feedback || sub.revisionNotes) && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic line-clamp-1">
                            "{sub.feedback || sub.revisionNotes}"
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Views */}
                    <td className="p-4 font-extrabold text-slate-900 dark:text-white">
                      {(sub.views || 142000).toLocaleString()} views
                    </td>

                    {/* Payout */}
                    <td className="p-4 font-black text-emerald-600 dark:text-emerald-400">
                      KES {(sub.payoutKES || 2500).toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedTimelineSub(sub)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1"
                          title="View Timeline History"
                        >
                          <FileCheck2 className="w-3.5 h-3.5 text-indigo-500" /> Timeline
                        </button>

                        <a
                          href={sub.platformUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-indigo-600"
                          title="Open Published Link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Timeline Modal */}
      <SubmissionTimelineModal
        submission={selectedTimelineSub}
        isOpen={!!selectedTimelineSub}
        onClose={() => setSelectedTimelineSub(null)}
      />

    </div>
  );
};
