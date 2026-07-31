import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Campaign } from '../../types';
import {
  Film,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Star,
  Trash2,
  Archive,
  Eye,
  AlertTriangle,
  FileCheck,
  Building,
  Calendar,
  DollarSign,
  Download
} from 'lucide-react';
import { AdminExportModal } from './AdminExportModal';

export const AdminCampaignManagement: React.FC = () => {
  const { campaigns, updateCampaign, deleteCampaign } = useApp();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [featuredIds, setFeaturedIds] = useState<Record<string, boolean>>({});
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.brandName.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const toggleFeature = (id: string) => {
    setFeaturedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleApprove = (id: string) => {
    updateCampaign(id, { status: 'active' });
  };

  const handleReject = (id: string) => {
    updateCampaign(id, { status: 'paused' });
  };

  const handleArchive = (id: string) => {
    updateCampaign(id, { status: 'archived' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Campaign & Bounty Management Hub</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review brand bounties, UGC briefs, approve/reject draft campaigns, feature top bounties and manage archives.
          </p>
        </div>

        <button
          onClick={() => setIsExportOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Campaigns</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search campaign title, brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            <option value="all">All Campaign Statuses</option>
            <option value="active">Active & Live</option>
            <option value="draft">Draft & Review Needed</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused / Rejected</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            <option value="all">All Campaign Types</option>
            <option value="creator">Creator Video Bounties</option>
            <option value="ugc">UGC Brand Briefs</option>
            <option value="freelance">Freelance Video Jobs</option>
          </select>
        </div>
      </div>

      {/* Campaigns Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCampaigns.map((camp) => {
          const isFeatured = featuredIds[camp.id];

          return (
            <div
              key={camp.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4 relative hover:border-indigo-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={camp.brandLogo} alt={camp.brandName} className="w-8 h-8 rounded-xl object-cover" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{camp.brandName}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300">
                      {camp.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleFeature(camp.id)}
                    title={isFeatured ? 'Remove Featured' : 'Feature Campaign'}
                    className={`p-1.5 rounded-lg ${
                      isFeatured
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${isFeatured ? 'fill-amber-400' : ''}`} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {camp.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {camp.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Budget</p>
                  <p className="font-extrabold text-indigo-600 dark:text-indigo-400">{camp.budgetKES.toLocaleString()} KES</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold capitalize ${
                      camp.status === 'active'
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {camp.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
                <span className="text-[10px] text-slate-400">{camp.applicantsCount} Applicants</span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleApprove(camp.id)}
                    title="Approve & Publish"
                    className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => handleReject(camp.id)}
                    title="Reject Campaign"
                    className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold text-[10px]"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deleteCampaign(camp.id)}
                    title="Delete Campaign"
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AdminExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title="Campaigns"
        data={campaigns}
        filename="clipforge_campaigns"
      />
    </div>
  );
};
