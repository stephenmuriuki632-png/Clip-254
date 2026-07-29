import React from 'react';
import { ShieldAlert, ArrowLeft, RefreshCw, Key, Lock, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROLE_DEFINITIONS, UserRole } from '../../lib/permissions';

interface Forbidden403Props {
  tabId: string;
  onOpenRoleManager?: () => void;
}

export const Forbidden403: React.FC<Forbidden403Props> = ({ tabId, onOpenRoleManager }) => {
  const { currentUser, currentRole, setCurrentRole, setActiveTab } = useApp();

  const currentRoleDef = ROLE_DEFINITIONS[currentRole] || ROLE_DEFINITIONS.creator;

  // Find which roles have access to this tab
  const rolesWithAccess = (Object.keys(ROLE_DEFINITIONS) as UserRole[]).filter((r) => {
    if ((r as string) === 'admin') return true;
    if (tabId === 'admin') return (r as string) === 'admin';
    if (tabId === 'agency') return (r as string) === 'agency';
    if (tabId === 'ugc') return ['ugc', 'brand', 'admin'].includes(r);
    if (tabId === 'freelance') return ['freelancer', 'brand', 'agency', 'admin'].includes(r);
    if (tabId === 'influencers') return ['influencer', 'brand', 'agency', 'admin'].includes(r);
    return false;
  });

  const availableUserRoles = [currentUser.role, ...(currentUser.additionalRoles || [])];
  const switchableRole = availableUserRoles.find(r => rolesWithAccess.includes(r as UserRole)) as UserRole | undefined;

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-xl text-center space-y-6">
        
        {/* Status Code & Icon */}
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 shadow-2xs">
            <Lock className="w-8 h-8" />
          </div>
          <span className="block text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">
            HTTP 403 • ACCESS FORBIDDEN
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
            Permission Required for "{tabId.toUpperCase()}"
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            Your current active role <span className="font-bold text-indigo-600 dark:text-indigo-400">"{currentRoleDef.title}"</span> does not have the required permissions to access this area.
          </p>
        </div>

        {/* Current Role Info */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-500">Active Role Context:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
              {currentRoleDef.badge}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300">
            {currentRoleDef.description}
          </p>
        </div>

        {/* Allowed Roles List */}
        <div className="space-y-2 text-left">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-amber-500" />
            <span>Roles with Access to this Module:</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {rolesWithAccess.map((r) => (
              <span
                key={r}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium"
              >
                {ROLE_DEFINITIONS[r]?.title || r}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('landing')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          {switchableRole ? (
            <button
              onClick={() => setCurrentRole(switchableRole)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Switch to {ROLE_DEFINITIONS[switchableRole].title}</span>
            </button>
          ) : (
            <button
              onClick={onOpenRoleManager}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Activate New Role</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
