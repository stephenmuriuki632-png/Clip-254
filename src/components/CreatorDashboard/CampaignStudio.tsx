import React, { useState } from 'react';
import { 
  Megaphone, 
  Search, 
  Filter, 
  Plus, 
  Play, 
  PauseCircle, 
  Copy, 
  Archive, 
  Trash2, 
  Edit3, 
  Calendar, 
  Users, 
  DollarSign, 
  Layers, 
  MoreVertical,
  CheckCircle2,
  Grid,
  List
} from 'lucide-react';
import { Campaign } from '../../types';
import { useApp } from '../../context/AppContext';
import { NoCampaignsEmptyState } from './EmptyStates';
import { CampaignFormModal } from './CampaignFormModal';

export const CampaignStudio: React.FC = () => {
  const { 
    campaigns, 
    pauseCampaign, 
    resumeCampaign, 
    duplicateCampaign, 
    archiveCampaign, 
    deleteCampaign 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'budget_high' | 'applicants'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Categories list
  const categories = ['Gaming', 'Podcast & Talk', 'Lifestyle & Vlogs', 'Tech & AI', 'Entertainment', 'Music', 'Sports'];

  // Filtering
  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || c.difficulty === selectedDifficulty;
    return matchesSearch && matchesStatus && matchesCategory && matchesDifficulty;
  }).sort((a, b) => {
    if (sortBy === 'budget_high') return b.budgetKES - a.budgetKES;
    if (sortBy === 'applicants') return b.applicantsCount - a.applicantsCount;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleEdit = (c: Campaign) => {
    setEditingCampaign(c);
    setIsFormOpen(true);
    setActiveMenuId(null);
  };

  const handleCreate = () => {
    setEditingCampaign(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Studio Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
              <Megaphone className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold font-heading text-white">Campaign Management Studio</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Create, publish, pause, duplicate, or archive your video bounty briefs. Manage payouts and submission limits in real-time.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={handleCreate}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Campaign</span>
          </button>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
            >
              <option value="newest">Sort: Newest</option>
              <option value="budget_high">Sort: Budget High-Low</option>
              <option value="applicants">Sort: Most Applicants</option>
            </select>
          </div>

          {/* Layout Toggle */}
          <div className="md:col-span-2 flex items-center justify-end gap-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-xl border text-xs ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl border text-xs ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Campaigns List/Grid */}
      {filteredCampaigns.length === 0 ? (
        <NoCampaignsEmptyState onCreate={handleCreate} />
      ) : viewMode === 'table' ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Campaign Name</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Budget (KES)</th>
                  <th className="px-4 py-3.5">Applicants</th>
                  <th className="px-4 py-3.5">Deadline</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredCampaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.brandLogo}
                          alt={c.title}
                          className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white font-heading line-clamp-1">{c.title}</p>
                          <p className="text-[10px] text-slate-400">{c.brandName} • Created {c.createdAt}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        {c.category}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                        c.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                          : c.status === 'paused'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                          : c.status === 'draft'
                          ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                      }`}>
                        {c.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 font-mono font-bold text-slate-900 dark:text-white">
                      {c.budgetKES.toLocaleString()} KES
                    </td>

                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300 font-medium">
                      {c.applicantsCount} creators
                    </td>

                    <td className="px-4 py-4 text-slate-500 dark:text-slate-400">
                      {c.deadline}
                    </td>

                    <td className="px-5 py-4 text-right relative">
                      <div className="flex items-center justify-end gap-1">
                        {c.status === 'active' ? (
                          <button
                            onClick={() => pauseCampaign(c.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                            title="Pause Campaign"
                          >
                            <PauseCircle className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => resumeCampaign(c.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                            title="Resume Campaign"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleEdit(c)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                          title="Edit Campaign"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => duplicateCampaign(c.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                          title="Duplicate Campaign"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => archiveCampaign(c.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                          title="Archive Campaign"
                        >
                          <Archive className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => deleteCampaign(c.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete Campaign"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCampaigns.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-indigo-500/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                    c.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {c.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {c.budgetKES.toLocaleString()} KES
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">{c.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{c.description}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{c.applicantsCount} applicants</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleEdit(c)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => duplicateCampaign(c.id)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteCampaign(c.id)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Campaign Create/Edit Modal */}
      {isFormOpen && (
        <CampaignFormModal campaign={editingCampaign} onClose={() => setIsFormOpen(false)} />
      )}

    </div>
  );
};
