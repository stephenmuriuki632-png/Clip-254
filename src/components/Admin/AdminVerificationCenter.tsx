import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Award,
  Search,
  Building,
  Video,
  UserCheck
} from 'lucide-react';

export const AdminVerificationCenter: React.FC = () => {
  const [requests, setRequests] = useState([
    { id: 'v-1', name: 'Kipchumba Chebet', role: 'Creator', document: 'Kenyan National ID + TikTok Channel', status: 'Pending Review', requestedBadge: 'Verified Creator' },
    { id: 'v-2', name: 'Safaricom Innovation Hub', role: 'Brand', document: 'KRA Pin & Certificate of Incorporation', status: 'Pending Review', requestedBadge: 'Official Brand Badge' },
    { id: 'v-3', name: 'Amina Abdi', role: 'UGC Talent', document: 'M-Pesa Verified Name Match', status: 'Approved', requestedBadge: 'Elite UGC Badge' },
  ]);

  const handleStatus = (id: string, newStatus: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Identity & Verification Badge Center</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review KRA Tax Pins, National ID cards, M-Pesa statements and award Verified or Elite Badges across creators, brands, and agencies.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Applicant & Role</th>
              <th className="p-4">Verification Proof Document</th>
              <th className="p-4">Requested Badge</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Verification Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-800 dark:text-slate-200">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                <td className="p-4 font-bold text-slate-900 dark:text-white">
                  {req.name}
                  <span className="block text-[10px] uppercase text-indigo-600 dark:text-indigo-400 font-semibold">{req.role}</span>
                </td>

                <td className="p-4 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                  {req.document}
                </td>

                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    <Award className="w-3 h-3 text-amber-500" />
                    {req.requestedBadge}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      req.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {req.status}
                  </span>
                </td>

                <td className="p-4 text-right space-x-1.5">
                  <button
                    onClick={() => handleStatus(req.id, 'Approved')}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px]"
                  >
                    Grant Verified Badge
                  </button>
                  <button
                    onClick={() => handleStatus(req.id, 'Rejected')}
                    className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px]"
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
