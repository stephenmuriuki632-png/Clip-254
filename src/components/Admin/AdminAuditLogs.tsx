import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, Clock, Download, FileText, User } from 'lucide-react';
import { AdminExportModal } from './AdminExportModal';

export const AdminAuditLogs: React.FC = () => {
  const [logs] = useState([
    { id: 'log-101', action: 'ROLE_ASSIGNMENT', actor: 'SuperAdmin', target: 'Safaricom Innovation', category: 'Security', details: 'Granted Verified Brand badge', ip: '102.140.211.84', timestamp: '2026-07-28 09:42:10' },
    { id: 'log-102', action: 'PAYMENT_APPROVE', actor: 'Admin_Finance', target: 'Brian Wanyama', category: 'Financial', details: 'Approved M-Pesa withdrawal 8,200 KES', ip: '197.248.10.12', timestamp: '2026-07-28 08:15:30' },
    { id: 'log-103', action: 'CAMPAIGN_APPROVAL', actor: 'Admin_Content', target: 'Campaign #108', category: 'Moderation', details: 'Approved brand video bounty', ip: '102.140.211.84', timestamp: '2026-07-27 18:22:01' },
    { id: 'log-104', action: 'USER_SUSPEND', actor: 'SuperAdmin', target: 'Spam_User_99', category: 'Security', details: 'Suspended user for referral spam', ip: '102.140.211.84', timestamp: '2026-07-27 12:05:40' },
    { id: 'log-105', action: 'SYSTEM_CONFIG', actor: 'SuperAdmin', target: 'Platform Fee Rules', category: 'Configuration', details: 'Updated default commission rate to 10%', ip: '102.140.211.84', timestamp: '2026-07-26 14:10:00' },
  ]);

  const [search, setSearch] = useState('');
  const [isExportOpen, setIsExportOpen] = useState(false);

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Immutable Audit Logs & Security Traces</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Trace every administrative action, payment authorization, configuration modification and security event.
          </p>
        </div>

        <button
          onClick={() => setIsExportOpen(false)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Trail</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Filter audit logs by action, actor, details..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Event Action</th>
              <th className="p-4">Actor</th>
              <th className="p-4">Target Entity</th>
              <th className="p-4">Log Details</th>
              <th className="p-4">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-800 dark:text-slate-200">
            {filteredLogs.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                <td className="p-4 text-slate-400 text-[10px]">{l.timestamp}</td>
                <td className="p-4 text-indigo-600 dark:text-indigo-400 font-bold">{l.action}</td>
                <td className="p-4 font-bold text-slate-900 dark:text-white">{l.actor}</td>
                <td className="p-4 text-slate-600 dark:text-slate-300">{l.target}</td>
                <td className="p-4 text-slate-500 dark:text-slate-400 font-sans">{l.details}</td>
                <td className="p-4 text-slate-400 text-[10px]">{l.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title="Audit Logs"
        data={logs}
        filename="clipkenya_audit_logs"
      />
    </div>
  );
};
