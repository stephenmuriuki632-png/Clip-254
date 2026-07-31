import React, { useState } from 'react';
import { Shield, Check, Plus, Sparkles, Video, Scissors, Camera, Briefcase, Building2, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROLE_DEFINITIONS, UserRole } from '../../lib/permissions';

interface RoleManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleManagerModal: React.FC<RoleManagerModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, currentRole, setCurrentRole, addRole } = useApp();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const roleKeys = Object.keys(ROLE_DEFINITIONS) as UserRole[];
  const userRoles = [currentUser.role, ...(currentUser.additionalRoles || [])];

  const handleSwitchRole = (role: UserRole) => {
    setCurrentRole(role);
    setSuccessMsg(`Switched active perspective to ${ROLE_DEFINITIONS[role].title}`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleActivateRole = (role: UserRole) => {
    addRole(role);
    setCurrentRole(role);
    setSuccessMsg(`Successfully activated ${ROLE_DEFINITIONS[role].title} role on your account!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video': return <Video className="w-5 h-5" />;
      case 'Scissors': return <Scissors className="w-5 h-5" />;
      case 'Camera': return <Camera className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="space-y-1">
            <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>ClipForge Roles & Permissions Hub</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Switch active context or activate additional creator & business roles on your account.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold text-base"
          >
            ✕
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Active Account Overview */}
        <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Primary Account: <span className="text-indigo-600 dark:text-indigo-400">{currentUser.name}</span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Primary Role: <span className="font-semibold uppercase">{currentUser.primaryRole || currentUser.role}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Active View:</span>
            <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-bold text-xs uppercase tracking-wide shadow-2xs">
              {currentRole}
            </span>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            All Platform Roles & Capabilities
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roleKeys.map((roleKey) => {
              const def = ROLE_DEFINITIONS[roleKey];
              const isActivated = userRoles.includes(roleKey);
              const isActiveRole = currentRole === roleKey;

              return (
                <div
                  key={roleKey}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                    isActiveRole
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/20'
                      : isActivated
                      ? 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      : 'bg-slate-50/60 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-90'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-lg ${
                          isActiveRole 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                        }`}>
                          {getRoleIcon(def.iconName)}
                        </div>
                        <div>
                          <h4 className="font-heading font-extrabold text-xs text-slate-900 dark:text-white">
                            {def.title}
                          </h4>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                            {def.badge}
                          </span>
                        </div>
                      </div>

                      {isActiveRole && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                          Active Now
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {def.description}
                    </p>

                    <div className="pt-1 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Capabilities:</p>
                      <ul className="text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5">
                        {def.capabilities.slice(0, 3).map((cap, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-indigo-500" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-end">
                    {isActiveRole ? (
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Current View
                      </span>
                    ) : isActivated ? (
                      <button
                        onClick={() => handleSwitchRole(roleKey)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-semibold text-xs shadow-2xs transition-colors"
                      >
                        Switch Perspective
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivateRole(roleKey)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Activate Role</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Role changes apply immediately to tab navigation and API permissions.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
