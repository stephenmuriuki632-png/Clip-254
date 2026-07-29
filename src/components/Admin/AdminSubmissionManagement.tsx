import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck,
  Search,
  CheckCircle,
  XCircle,
  RefreshCw,
  Trash2,
  ExternalLink,
  Scissors,
  Video,
  Eye,
  ShieldAlert,
  MessageSquare
} from 'lucide-react';

export const AdminSubmissionManagement: React.FC = () => {
  const { submissions, approveSubmission, rejectSubmission, requestRevision } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [revisionNote, setRevisionNote] = useState('');
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);

  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch =
      s.clipTitle.toLowerCase().includes(search.toLowerCase()) ||
      s.clipperName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Clip & UGC Submission Moderation Center</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review video clip submissions, UGC creator video deliveries, approve M-Pesa escrow payouts, request revisions or remove non-compliant content.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search clip title, clipper name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
        >
          <option value="all">All Submission Statuses</option>
          <option value="pending">Pending Approval</option>
          <option value="approved">Approved & Paid</option>
          <option value="rejected">Rejected</option>
          <option value="revision_requested">Revision Requested</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4">Submission & Clipper</th>
              <th className="p-4">Video Link</th>
              <th className="p-4">Status & Views</th>
              <th className="p-4">Payout KES</th>
              <th className="p-4 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-800 dark:text-slate-200">
            {filteredSubmissions.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">{sub.clipTitle}</p>
                    <p className="text-[10px] text-slate-400">By: {sub.clipperName} • {sub.submittedAt}</p>
                  </div>
                </td>

                <td className="p-4">
                  <a
                    href={sub.platformUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>View Clip</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>

                <td className="p-4">
                  <div className="space-y-1">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        sub.status === 'approved'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : sub.status === 'pending'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {sub.status}
                    </span>
                    <p className="text-[10px] text-slate-400">{sub.viewsCount || 0} Views logged</p>
                  </div>
                </td>

                <td className="p-4 font-extrabold text-indigo-600 dark:text-indigo-400">
                  {sub.payoutKES ? `${sub.payoutKES.toLocaleString()} KES` : '5,000 KES'}
                </td>

                <td className="p-4 text-right space-x-1">
                  <button
                    onClick={() => approveSubmission(sub.id, 'Approved by Admin Governance')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => {
                      setSelectedSubId(sub.id);
                      const note = prompt('Enter Revision Request Note:');
                      if (note) requestRevision(sub.id, note);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px]"
                  >
                    Revision
                  </button>

                  <button
                    onClick={() => rejectSubmission(sub.id, 'Violated community guidelines')}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px]"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
