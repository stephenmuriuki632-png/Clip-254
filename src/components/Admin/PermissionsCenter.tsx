import React, { useState } from 'react';
import { Shield, Eye, Copy, Check, Users, Database, Key, Search, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROLE_DEFINITIONS, SUPABASE_RLS_SQL_SCRIPT, UserRole } from '../../lib/permissions';
import { UserProfile } from '../../types';

export const PermissionsCenter: React.FC = () => {
  const { creators, impersonateUser } = useApp();
  const [activeTab, setActiveTab] = useState<'matrix' | 'impersonate' | 'supabase'>('matrix');
  const [copiedSql, setCopiedSql] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<UserRole | 'all'>('all');

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_RLS_SQL_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const filteredUsers = creators.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.handle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRoleFilter === 'all' || u.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  const roleKeys = Object.keys(ROLE_DEFINITIONS) as UserRole[];

  return (
    <div className="space-y-6">
      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'matrix'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>RBAC Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('impersonate')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'impersonate'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Support Impersonation</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'supabase'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase Database & Storage Studio</span>
          </button>
        </div>
      </div>

      {/* TAB 1: RBAC MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
              Role-Based Access Control (RBAC) System
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Overview of all 8 system roles and their assigned default permissions across ClipForge modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roleKeys.map((roleKey) => {
              const def = ROLE_DEFINITIONS[roleKey];
              return (
                <div
                  key={roleKey}
                  className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                    <div>
                      <h4 className="font-heading font-extrabold text-xs text-slate-900 dark:text-white">
                        {def.title}
                      </h4>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                        {def.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {def.description}
                  </p>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Granted Permissions ({def.defaultPermissions.length}):</p>
                    <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto pt-1">
                      {def.defaultPermissions.map((perm) => (
                        <span
                          key={perm}
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-mono"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SUPPORT IMPERSONATION */}
      {activeTab === 'impersonate' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Admin User Impersonation Tool</span>
            </h3>
            <p className="text-xs opacity-90">
              Impersonate any registered user to assist with troubleshooting, inspect their active view, or reproduce permission issues.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search user by name or handle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="all">All Roles</option>
              {roleKeys.map((r) => (
                <option key={r} value={r}>
                  {ROLE_DEFINITIONS[r].title}
                </option>
              ))}
            </select>
          </div>

          {/* User List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredUsers.map((u) => (
              <div
                key={u.id}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{u.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{u.handle} • <span className="font-semibold uppercase text-indigo-600 dark:text-indigo-400">{u.role}</span></p>
                  </div>
                </div>

                <button
                  onClick={() => impersonateUser(u)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-[11px] shadow-2xs transition-colors flex items-center gap-1 shrink-0"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Impersonate</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SUPABASE DATABASE ARCHITECTURE & STORAGE STUDIO */}
      {activeTab === 'supabase' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-4 h-4" />
                  <span>ClipForge Supabase PostgreSQL Database (27 Tables)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Production-grade database schema with Row Level Security (RLS), UUID primary keys, cascading deletes, triggers, and automated indexes.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySql}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied RLS Script!' : 'Copy RLS Script'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Database Tables Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              27 Core Database Tables & Entities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {[
                { name: 'profiles', desc: 'User profiles & roles' },
                { name: 'campaigns', desc: 'Creator video bounties' },
                { name: 'campaign_files', desc: 'Raw source videos' },
                { name: 'clip_submissions', desc: 'Clipper edited submissions' },
                { name: 'approvals', desc: 'Submission feedback & payout' },
                { name: 'wallets', desc: 'M-Pesa balance & total earnings' },
                { name: 'transactions', desc: 'Wallet history & receipts' },
                { name: 'withdrawals', desc: 'M-Pesa withdrawal requests' },
                { name: 'messages', desc: 'Realtime chat messages' },
                { name: 'conversations', desc: 'Direct message channels' },
                { name: 'notifications', desc: 'In-app notification feed' },
                { name: 'reviews', desc: 'Ratings & creator feedback' },
                { name: 'categories', desc: '13 default video categories' },
                { name: 'ugc_campaigns', desc: 'Brand UGC video briefs' },
                { name: 'ugc_submissions', desc: 'UGC creator video posts' },
                { name: 'services', desc: 'Freelance gig listings' },
                { name: 'orders', desc: 'Service purchases & status' },
                { name: 'portfolios', desc: 'Featured videos & socials' },
                { name: 'leaderboards', desc: 'Weekly/Monthly rankings' },
                { name: 'reports', desc: 'Content & user reports' },
                { name: 'audit_logs', desc: 'System security audit logs' },
                { name: 'referrals', desc: 'Creator invite rewards' },
                { name: 'badges', desc: 'Achievement badges' },
                { name: 'user_badges', desc: 'User earned badges' },
                { name: 'courses', desc: 'Creator academy courses' },
                { name: 'course_progress', desc: 'Lesson completion status' },
                { name: 'achievements', desc: 'XP, levels & daily streaks' },
                { name: 'ai_generations', desc: 'Gemini AI prompt history' }
              ].map((tb) => (
                <div key={tb.name} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
                  <p className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400 truncate">{tb.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-2">{tb.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Storage Buckets Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Supabase Storage Buckets (7 Buckets)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'videos', max: '5 GB', mimes: 'mp4, mov, webm' },
                { name: 'submitted-clips', max: '1 GB', mimes: 'mp4, mov, webm' },
                { name: 'portfolio', max: '500 MB', mimes: 'mp4, jpg, png, webp' },
                { name: 'profile-images', max: '10 MB', mimes: 'jpg, png, webp' },
                { name: 'thumbnails', max: '20 MB', mimes: 'jpg, png, webp' },
                { name: 'attachments', max: '100 MB', mimes: 'pdf, zip, mp4, png' },
                { name: 'ugc-videos', max: '2 GB', mimes: 'mp4, mov, webm' }
              ].map((b) => (
                <div key={b.name} className="p-3 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-400">{b.name}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">{b.max}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">MIMEs: {b.mimes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RLS Code View */}
          <div className="relative rounded-xl bg-slate-950 p-4 border border-slate-800 max-h-[400px] overflow-y-auto space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-[11px] font-mono font-bold text-slate-400">/supabase/migrations/20260728_01_schema_rls_triggers.sql</span>
              <span className="text-[10px] text-emerald-400 font-semibold">✓ Production Ready</span>
            </div>
            <pre className="font-mono text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap">
              {SUPABASE_RLS_SQL_SCRIPT}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
