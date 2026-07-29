import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, DollarSign, Layers } from 'lucide-react';

export const CreateCampaignModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { createCampaign } = useApp();

  const [title, setTitle] = useState('');
  const [brandName, setBrandName] = useState('Safaricom PLC');
  const [description, setDescription] = useState('');
  const [budgetKES, setBudgetKES] = useState('');
  const [category, setCategory] = useState('Fintech & Mobile Money');
  const [deadline, setDeadline] = useState('2026-08-30');
  const [deliverables, setDeliverables] = useState('1x 45s TikTok UGC Video, Raw Footage Rights');
  const [platform, setPlatform] = useState<'tiktok' | 'youtube' | 'instagram' | 'all'>('tiktok');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !budgetKES || !description) return;

    createCampaign({
      title,
      brandName,
      brandLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
      brandId: 'brand_' + Date.now(),
      description,
      budgetKES: Number(budgetKES),
      budgetUSD: Math.round(Number(budgetKES) / 130),
      category,
      deadline,
      deliverables: deliverables.split(',').map(d => d.trim()),
      requirements: 'Must have active accounts in Kenya or East Africa.',
      targetNiche: [category],
      platform
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Launch Brand Campaign / UGC Brief</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 text-sm font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Campaign Title</label>
            <input
              type="text"
              required
              placeholder="e.g. M-Pesa Global TikTok Video Campaign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Brand Name</label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Budget (KES)</label>
              <input
                type="number"
                required
                min={1000}
                placeholder="e.g. 150000"
                value={budgetKES}
                onChange={(e) => setBudgetKES(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Brief Description</label>
            <textarea
              required
              rows={3}
              placeholder="Describe campaign goals, key messages, target creator criteria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Deliverables (comma separated)</label>
            <input
              type="text"
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs"
            >
              Publish Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
