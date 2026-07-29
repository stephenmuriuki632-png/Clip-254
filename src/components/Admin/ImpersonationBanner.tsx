import React from 'react';
import { Eye, LogOut, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ImpersonationBanner: React.FC = () => {
  const { impersonatedUser, exitImpersonation } = useApp();

  if (!impersonatedUser) return null;

  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold shadow-md flex items-center justify-between z-50 sticky top-0">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-950 text-amber-400">
          <Eye className="w-3 h-3" />
        </div>
        <span>
          ADMIN SUPPORT MODE: Impersonating <span className="underline">{impersonatedUser.name}</span> ({impersonatedUser.handle} • Role: <span className="uppercase">{impersonatedUser.role}</span>)
        </span>
      </div>

      <button
        onClick={exitImpersonation}
        className="px-3 py-1 rounded-lg bg-slate-950 hover:bg-slate-900 text-amber-400 font-extrabold text-[11px] flex items-center gap-1.5 transition-all shadow-xs"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>Exit Impersonation</span>
      </button>
    </div>
  );
};
