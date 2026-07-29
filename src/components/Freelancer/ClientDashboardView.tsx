import React, { useState } from 'react';
import {
  Search,
  Plus,
  Briefcase,
  CheckCircle2,
  Bookmark,
  Star,
  FileCheck,
  Check,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Eye,
  Filter
} from 'lucide-react';
import {
  FreelanceService,
  FreelanceOrder,
  JobPosting
} from '../../types/freelancer';

interface ClientDashboardViewProps {
  services: FreelanceService[];
  orders: FreelanceOrder[];
  jobs: JobPosting[];
  onOpenServiceModal: (service: FreelanceService) => void;
  onOpenOrderModal: (order: FreelanceOrder) => void;
  onPostJob: () => void;
}

export const ClientDashboardView: React.FC<ClientDashboardViewProps> = ({
  services,
  orders,
  jobs,
  onOpenServiceModal,
  onOpenOrderModal,
  onPostJob
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'services' | 'orders' | 'my_jobs'>('services');
  const [searchTerm, setSearchTerm] = useState('');

  const totalSpentKES = orders.reduce((acc, o) => acc + o.priceKES, 0);

  return (
    <div className="space-y-6">
      
      {/* Client Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold border border-indigo-500/30">
                🏢 Client Hiring Portal
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight mt-2">
              Hire Freelance Professionals & Manage Deliveries
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Browse top-tier African software developers, video editors, and UI/UX designers with M-Pesa escrow protection.
            </p>
          </div>

          <button
            onClick={onPostJob}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Post a Freelance Job</span>
          </button>
        </div>

        {/* Client Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Budget Spent</span>
            <span className="font-heading font-extrabold text-lg text-emerald-400">
              {totalSpentKES.toLocaleString()} KES
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Active Hired Services</span>
            <span className="font-heading font-extrabold text-lg text-white">
              {orders.length} Orders
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Open Job Postings</span>
            <span className="font-heading font-extrabold text-lg text-indigo-300">
              {jobs.length} Jobs
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Escrow Protection</span>
            <span className="font-heading font-extrabold text-lg text-amber-400">
              100% Guaranteed
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'services', label: 'Explore Freelance Services', icon: Search },
          { id: 'orders', label: 'Active Orders & Deliveries', icon: CheckCircle2 },
          { id: 'my_jobs', label: 'My Posted Jobs', icon: Briefcase }
        ].map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                activeSubTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB: EXPLORE SERVICES */}
      {activeSubTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-slate-900">
                  <img src={srv.coverImage} alt={srv.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                    From {srv.startingPriceKES.toLocaleString()} KES
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <img src={srv.freelancerAvatar} alt={srv.freelancerName} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-xs text-slate-900 dark:text-white">{srv.freelancerName}</p>
                      <p className="text-[10px] text-slate-400">{srv.freelancerRole}</p>
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2">
                    {srv.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-700 mt-2 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{srv.rating}</span>
                  <span className="text-slate-400 font-normal">({srv.reviewCount})</span>
                </div>

                <button
                  onClick={() => onOpenServiceModal(srv)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-extrabold text-xs shadow-2xs"
                >
                  View Service & Packages
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB: ACTIVE ORDERS */}
      {activeSubTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                    {ord.serviceTitle}
                  </h3>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase">
                    {ord.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Freelancer: <span className="font-bold text-slate-700 dark:text-slate-300">{ord.freelancerName}</span> • Escrow: <span className="font-bold text-emerald-600 dark:text-emerald-400">{ord.priceKES.toLocaleString()} KES</span>
                </p>
              </div>

              <button
                onClick={() => onOpenOrderModal(ord)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                <span>Review Work & Manage Order</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB: MY POSTED JOBS */}
      {activeSubTab === 'my_jobs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((j) => (
            <div key={j.id} className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">{j.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{j.description}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
                <span className="font-bold text-emerald-600">{j.budgetKES.toLocaleString()} KES</span>
                <span className="text-slate-400">{j.proposalsCount} Proposals Submitted</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
