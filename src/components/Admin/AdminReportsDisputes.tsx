import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  CheckCircle,
  XCircle,
  ShieldAlert,
  MessageSquare,
  FileText,
  UserX,
  Scale
} from 'lucide-react';

export const AdminReportsDisputes: React.FC = () => {
  const [reports, setReports] = useState([
    {
      id: 'rep-001',
      reporter: 'Safaricom Innovation Hub',
      reportedEntity: 'Clipper_X_254',
      type: 'Copyright Claim',
      category: 'Content',
      details: 'Submitted unedited raw footage without adding commentary or subtitles.',
      status: 'Open',
      date: '2026-07-28 02:15'
    },
    {
      id: 'rep-002',
      reporter: 'Amina Abdi',
      reportedEntity: 'Campaign #204 - Tech Kenya',
      type: 'Payment Dispute',
      category: 'Financial',
      details: 'Approved clip views reached threshold but escrow payout was delayed.',
      status: 'Escalated',
      date: '2026-07-27 19:40'
    },
    {
      id: 'rep-003',
      reporter: 'System Bot',
      reportedEntity: 'Spam_Account_99',
      type: 'Spam & Abuse',
      category: 'User Behavior',
      details: 'Automated referral link spamming across community lounge.',
      status: 'Resolved',
      date: '2026-07-27 11:20'
    }
  ]);

  const [search, setSearch] = useState('');
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null);

  const handleStatusChange = (id: string, newStatus: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filteredReports = reports.filter(
    (r) =>
      r.reporter.toLowerCase().includes(search.toLowerCase()) ||
      r.reportedEntity.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <span>Reports, Disputes & Copyright Claims Resolution</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Arbitrate payment disputes, adjudicate DMCA copyright claims, resolve user reports and handle fraud or spam escalations.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Search by reporter, entity or dispute type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4">Report ID & Category</th>
              <th className="p-4">Reporter vs Reported</th>
              <th className="p-4">Details & Evidence</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Arbitration Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-800 dark:text-slate-200">
            {filteredReports.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                <td className="p-4">
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{r.id}</span>
                  <span className="block text-[10px] text-slate-400">{r.type}</span>
                </td>

                <td className="p-4">
                  <p className="font-bold text-slate-900 dark:text-white">{r.reporter}</p>
                  <p className="text-[10px] text-rose-500 font-semibold">vs {r.reportedEntity}</p>
                </td>

                <td className="p-4 max-w-xs">
                  <p className="text-slate-600 dark:text-slate-300 line-clamp-2">{r.details}</p>
                </td>

                <td className="p-4">
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      r.status === 'Open'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : r.status === 'Escalated'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>

                <td className="p-4 text-right space-x-1.5">
                  <button
                    onClick={() => handleStatusChange(r.id, 'Resolved')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]"
                  >
                    Resolve Case
                  </button>
                  <button
                    onClick={() => handleStatusChange(r.id, 'Escalated')}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px]"
                  >
                    Escalate
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
