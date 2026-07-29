import React, { useState } from 'react';
import { Key, Activity, Webhook, Shield, Copy, Check, Plus, Code, Layers } from 'lucide-react';

export const AdminAPIManagement: React.FC = () => {
  const [keys, setKeys] = useState([
    { id: 'key-1', name: 'M-Pesa Safaricom Daraja Production API Key', key: 'ck_live_99f2****************881a', rateLimit: '1,000 req/min', status: 'Active' },
    { id: 'key-2', name: 'Google Gemini 2.5 Flash GenAI Secret', key: 'gm_live_44a1****************992b', rateLimit: '500 req/min', status: 'Active' },
    { id: 'key-3', name: 'Supabase PostgreSQL Service Role Key', key: 'sb_service_77c1****************223d', rateLimit: '5,000 req/min', status: 'Active' },
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Developer API Keys & Webhook Orchestration</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage M-Pesa B2C Daraja API keys, Gemini AI service credentials, webhooks, rate limits and external integrations.
          </p>
        </div>

        <button
          onClick={() => {
            const name = prompt('Enter API Key Name:');
            if (name) {
              setKeys((prev) => [
                ...prev,
                { id: `key-${Date.now()}`, name, key: `ck_live_${Math.random().toString(36).substring(2)}`, rateLimit: '1,000 req/min', status: 'Active' },
              ]);
            }
          }}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Generate API Key</span>
        </button>
      </div>

      <div className="space-y-4">
        {keys.map((k) => (
          <div
            key={k.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{k.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  {k.status}
                </span>
              </div>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">{k.key}</p>
              <p className="text-[10px] text-slate-400">Rate Limit: {k.rateLimit}</p>
            </div>

            <button
              onClick={() => handleCopy(k.id, k.key)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 shrink-0"
            >
              {copiedId === k.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === k.id ? 'Copied Key!' : 'Copy Key'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
