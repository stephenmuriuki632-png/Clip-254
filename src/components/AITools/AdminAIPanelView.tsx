import React, { useState, useEffect } from 'react';
import { useAISuite } from '../../context/AIContext';
import { Shield, ShieldCheck, ToggleLeft, ToggleRight, Database, AlertTriangle, RefreshCw, Key, Users } from 'lucide-react';

export const AdminAIPanelView: React.FC = () => {
  const { auditLogs, refreshAuditLogs } = useAISuite();
  const [tools, setTools] = useState({
    clip_finder: true,
    viral_score: true,
    caption_gen: true,
    title_gen: true,
    hook_gen: true,
    hashtag_gen: true,
    script_writer: true,
    thumbnail_assistant: true,
    content_calendar: true,
    seo_assistant: true,
    proposal_writer: true,
    resume_builder: true,
    portfolio_builder: true,
    bio_gen: true,
    message_assistant: true,
    analytics: true,
    search: true,
    recommendations: true,
    chat_assistant: true,
  });

  const [dailyCreditLimit, setDailyCreditLimit] = useState(500);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const toggleTool = async (toolId: string) => {
    const nextState = !tools[toolId as keyof typeof tools];
    setTools(prev => ({ ...prev, [toolId]: nextState }));
    
    try {
      await fetch('/api/ai/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId, enabled: nextState })
      });
    } catch (e) {
      console.error('Failed to update admin tool state:', e);
    }
  };

  const handleSaveLimits = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/ai/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dailyCreditLimit })
      });
      setSavedMsg('Daily limit updated!');
      setTimeout(() => setSavedMsg(''), 2000);
    } catch (e) {
      console.error('Failed to update limit:', e);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-extrabold font-heading">Admin AI Governance & Security Panel</h2>
          </div>
          <p className="text-xs text-slate-300">
            Control tool availability, enforce daily credit allocation caps, and monitor security audit logs against prompt injection attacks.
          </p>
        </div>
        <button
          onClick={refreshAuditLogs}
          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Audit Logs</span>
        </button>
      </div>

      {/* Credit Limits & Toggles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Global Controls & Limits */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>User Credit Allocation</span>
          </h3>

          <form onSubmit={handleSaveLimits} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily AI Credit Limit Per Creator
              </label>
              <input
                type="number"
                value={dailyCreditLimit}
                onChange={(e) => setDailyCreditLimit(Number(e.target.value))}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors"
            >
              {saving ? 'Saving...' : 'Update Daily Cap'}
            </button>
            {savedMsg && <p className="text-xs text-emerald-600 font-bold text-center">{savedMsg}</p>}
          </form>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">Security Engine Rules</span>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <p>• Prompt Sanitization Regex Active</p>
              <p>• Jailbreak Pattern Blocking Enabled</p>
              <p>• Automated Audit Logging Enabled</p>
            </div>
          </div>
        </div>

        {/* Tools Feature Toggles */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Global AI Tool Toggles</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
            {Object.entries(tools).map(([toolId, isEnabled]) => (
              <div
                key={toolId}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
              >
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 capitalize">
                  {toolId.replace('_', ' ')}
                </span>
                <button
                  type="button"
                  onClick={() => toggleTool(toolId)}
                  className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                    isEnabled ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                >
                  {isEnabled ? <ToggleRight className="w-6 h-6 text-emerald-600" /> : <ToggleLeft className="w-6 h-6 text-slate-400" />}
                  <span>{isEnabled ? 'Enabled' : 'Disabled'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Security Audit Log Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-2xs space-y-4">
        <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Security & AI Prompt Audit Trail</span>
        </h3>

        {auditLogs.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">No security audit logs recorded yet. All prompt activity will be logged here.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Tool</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Prompt Excerpt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="p-3 font-mono text-[11px] whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">{log.toolId}</td>
                    <td className="p-3">{log.userEmail}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        log.flagged ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {log.flagged ? 'Flagged / Blocked' : 'Clean'}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-600 dark:text-slate-400 truncate max-w-xs">{log.prompt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
