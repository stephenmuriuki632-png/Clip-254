import React, { useState } from 'react';
import { usePwaInstall } from '../../hooks/usePwaInstall';
import { Download, X, Smartphone, CheckCircle2, Sparkles } from 'lucide-react';

export const PwaInstallBanner: React.FC = () => {
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();
  const [dismissed, setDismissed] = useState(false);

  if (!canInstall || isInstalled || dismissed) return null;

  const handleInstall = async () => {
    const success = await promptInstall();
    if (success) {
      setDismissed(true);
    }
  };

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 max-w-md bg-slate-900 text-white rounded-2xl border border-indigo-500/30 p-4 shadow-2xl backdrop-blur-md animate-slide-up">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-md">
            <Smartphone className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-amber-400">Install App</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>
            <h4 className="text-sm font-extrabold font-heading text-white">
              Get ClipKenya App
            </h4>
            <p className="text-[11px] text-slate-300 line-clamp-1">
              Faster loading, offline bounties & instant M-Pesa push alerts.
            </p>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-slate-400 hover:text-white rounded-lg"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-800">
        <button
          onClick={handleInstall}
          className="w-full py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Install ClipKenya</span>
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
        >
          Later
        </button>
      </div>
    </div>
  );
};
