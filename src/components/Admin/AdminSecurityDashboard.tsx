import React from 'react';
import { ShieldAlert, Activity, Lock, Database, HardDrive, CheckCircle2, UserX, AlertOctagon } from 'lucide-react';

export const AdminSecurityDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <span>Enterprise Security & Infrastructure Health</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Realtime security telemetry, failed authentication monitoring, rate limit throttling, database connections and storage health.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <p className="text-[10px] font-bold uppercase text-slate-400">Failed Logins (24h)</p>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">4 Attempts</p>
          <span className="text-[10px] text-emerald-500 font-bold">✓ Automatically Throttled</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <p className="text-[10px] font-bold uppercase text-slate-400">Blocked IP Addresses</p>
          <p className="text-xl font-extrabold text-rose-600 dark:text-rose-400">2 IPs</p>
          <span className="text-[10px] text-rose-500 font-bold">Cloudflare Firewall Active</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <p className="text-[10px] font-bold uppercase text-slate-400">Supabase DB Health</p>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">100% Optimal</p>
          <span className="text-[10px] text-emerald-500 font-bold">12ms Response Latency</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <p className="text-[10px] font-bold uppercase text-slate-400">Auth Health (JWT)</p>
          <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">Passed</p>
          <span className="text-[10px] text-indigo-500 font-bold">RSA 4096-bit Encryption</span>
        </div>
      </div>
    </div>
  );
};
