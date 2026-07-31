import React, { useState } from 'react';
import {
  X,
  Layers,
  Upload,
  Calendar,
  CheckCircle2,
  DollarSign,
  Plus,
  Trash2,
  Globe,
  Sparkles,
  Link,
  Tag
} from 'lucide-react';
import { UGCCampaignDetail } from '../../types';

interface UGCCreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (campaignData: Partial<UGCCampaignDetail>) => void;
}

export const UGCCreateCampaignModal: React.FC<UGCCreateCampaignModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [formData, setFormData] = useState({
    title: '',
    brandName: '',
    productName: '',
    description: '',
    campaignObjective: '',
    deliverables: ['1x TikTok Video (9:16)'],
    targetAudience: 'Youth & Young Professionals (18-35 in EA)',
    creatorRequirements: 'Must have clean lighting, clear audio, and natural presentation.',
    budgetKES: 150000,
    pricePerVideoKES: 25000,
    maxCreatorsNeeded: 6,
    deadline: '2026-08-30',
    platform: 'tiktok' as 'tiktok' | 'youtube' | 'instagram' | 'all',
    category: 'E-Commerce & Electronics',
    referenceLinks: [''],
    hashtags: ['#BrandName', '#ClipForgeUGC'],
    keywords: ['UGC', 'Review', 'Unboxing'],
    usageRightsDuration: '90 Days Digital Paid Ads',
    commercialRightsIncluded: true
  });

  const [newDeliverable, setNewDeliverable] = useState('');
  const [newHashtag, setNewHashtag] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.brandName) return;

    onCreate({
      title: formData.title,
      brandName: formData.brandName,
      productName: formData.productName,
      description: formData.description,
      campaignObjective: formData.campaignObjective,
      deliverables: formData.deliverables,
      targetAudience: formData.targetAudience,
      requirements: formData.creatorRequirements,
      budgetKES: Number(formData.budgetKES),
      budgetUSD: Math.round(Number(formData.budgetKES) / 130),
      pricePerVideoKES: Number(formData.pricePerVideoKES),
      maxCreatorsNeeded: Number(formData.maxCreatorsNeeded),
      deadline: formData.deadline,
      platform: formData.platform,
      category: formData.category,
      referenceLinks: formData.referenceLinks.filter(Boolean),
      hashtags: formData.hashtags.filter(Boolean),
      keywords: formData.keywords.filter(Boolean),
      usageRightsDuration: formData.usageRightsDuration,
      commercialRightsIncluded: formData.commercialRightsIncluded,
      brandLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80'
    });

    onClose();
  };

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setFormData(prev => ({ ...prev, deliverables: [...prev.deliverables, newDeliverable.trim()] }));
      setNewDeliverable('');
    }
  };

  const removeDeliverable = (idx: number) => {
    setFormData(prev => ({ ...prev, deliverables: prev.deliverables.filter((_, i) => i !== idx) }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                Create UGC Campaign Brief
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Post brief to hire top African creators for authentic video ads & social content.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Campaign Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., M-Pesa Virtual Card TikTok Ad Campaign"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Brand Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Safaricom M-Pesa"
                value={formData.brandName}
                onChange={e => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                placeholder="e.g., Smart Air Fryer v2"
                value={formData.productName}
                onChange={e => setFormData({ ...formData, productName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Industry Category
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Fintech & Mobile Money">Fintech & Mobile Money</option>
                <option value="E-Commerce & Electronics">E-Commerce & Electronics</option>
                <option value="Beauty Content">Beauty & Cosmetics</option>
                <option value="Fashion Content">Fashion & Apparel</option>
                <option value="Food & Fitness">Food, Beverages & Fitness</option>
                <option value="Travel & Hospitality">Travel & Hospitality</option>
              </select>
            </div>
          </div>

          {/* Description & Objective */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Campaign Description & Brief Detail
            </label>
            <textarea
              rows={3}
              placeholder="Describe the product, hook style, tone, key message, or script guidance..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Budget & Deliverables */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                Total Campaign Budget (KES)
              </label>
              <input
                type="number"
                value={formData.budgetKES}
                onChange={e => setFormData({ ...formData, budgetKES: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                Payout Per Creator (KES)
              </label>
              <input
                type="number"
                value={formData.pricePerVideoKES}
                onChange={e => setFormData({ ...formData, pricePerVideoKES: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                Max Creators Needed
              </label>
              <input
                type="number"
                value={formData.maxCreatorsNeeded}
                onChange={e => setFormData({ ...formData, maxCreatorsNeeded: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold outline-none"
              />
            </div>
          </div>

          {/* Deliverables List */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Required Deliverables
            </label>
            <div className="space-y-2 mb-2">
              {formData.deliverables.map((del, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">✓ {del}</span>
                  <button type="button" onClick={() => removeDeliverable(i)} className="text-rose-500 hover:text-rose-700">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add deliverable (e.g. 1x 60s Unboxing Reel, 3 Product Photos)"
                value={newDeliverable}
                onChange={e => setNewDeliverable(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none"
              />
              <button
                type="button"
                onClick={addDeliverable}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>

          {/* Platform & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Platform
              </label>
              <select
                value={formData.platform}
                onChange={e => setFormData({ ...formData, platform: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium outline-none"
              >
                <option value="tiktok">TikTok (9:16)</option>
                <option value="instagram">Instagram Reels (9:16)</option>
                <option value="youtube">YouTube Shorts / Longform</option>
                <option value="all">Cross-Platform (TikTok + IG + YT)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Submission Deadline
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium outline-none"
              />
            </div>
          </div>

          {/* Usage & Rights */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Commercial & License Rights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Usage Rights Duration</label>
                <input
                  type="text"
                  value={formData.usageRightsDuration}
                  onChange={e => setFormData({ ...formData, usageRightsDuration: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="commercialRights"
                  checked={formData.commercialRightsIncluded}
                  onChange={e => setFormData({ ...formData, commercialRightsIncluded: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor="commercialRights" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Full Commercial Paid Ads Rights Included
                </label>
              </div>
            </div>
          </div>

          {/* Form Bottom Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Campaign Brief</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
