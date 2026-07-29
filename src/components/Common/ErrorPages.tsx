import React from 'react';
import { WifiOff, AlertTriangle, RefreshCw, Home, ShieldAlert, Wrench, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// 1. OFFLINE PAGE
export const OfflinePage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center border border-amber-500/20">
          <WifiOff className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">
            You are Offline
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            ClipKenya is saved on your device, but live M-Pesa balances and real-time messaging require an internet connection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>
          <button
            onClick={() => setActiveTab('landing')}
            className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
          >
            Browse Offline Cache
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. NOT FOUND 404 PAGE
export const NotFound404Page: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-6 shadow-xl">
        <div className="text-5xl font-extrabold font-heading text-indigo-600 dark:text-indigo-400">
          404
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">
            Page or Bounty Not Found
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            The page, campaign, or user profile you are looking for does not exist or was archived.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('landing')}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Return to ClipKenya Home</span>
        </button>
      </div>
    </div>
  );
};

// 3. SERVER ERROR 500 PAGE
export const ServerError500Page: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center border border-rose-500/20">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">
            System Error (500)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Our cloud backend encountered a temporary issue. Don't worry, your M-Pesa balance and submitted clips are safe.
          </p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reload Application</span>
        </button>
      </div>
    </div>
  );
};

// 4. MAINTENANCE PAGE
export const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center border border-amber-500/20">
          <Wrench className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">
            Scheduled Platform Maintenance
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            ClipKenya is undergoing a scheduled upgrade to introduce faster video processing and lower M-Pesa withdrawal fees.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
          Estimated Completion: ~15 mins
        </div>
      </div>
    </div>
  );
};
