import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MOCK_FREELANCE_STATS,
  MOCK_FREELANCE_SERVICES,
  MOCK_JOB_POSTINGS,
  MOCK_PROPOSALS,
  MOCK_FREELANCE_ORDERS
} from '../../data/mockFreelancerData';
import {
  FreelanceService,
  JobPosting,
  FreelanceProposal,
  FreelanceOrder,
  FreelancerCategory,
  ServicePackage
} from '../../types/freelancer';
import { FreelancerDashboardView } from './FreelancerDashboardView';
import { ClientDashboardView } from './ClientDashboardView';
import { FreelancerJobBoard } from './FreelancerJobBoard';
import { CreateServiceModal } from './CreateServiceModal';
import { ServiceDetailModal } from './ServiceDetailModal';
import { FreelancerOrderManagementModal } from './FreelancerOrderManagementModal';
import { Search, Briefcase, Plus, Star, ShieldCheck, ArrowRight, Layers, Sparkles } from 'lucide-react';

export const FreelancerMarketplaceHub: React.FC = () => {
  const { setActiveTab } = useApp();

  const [activePerspective, setActivePerspective] = useState<'marketplace' | 'job_board' | 'freelancer_studio' | 'client_portal'>('marketplace');

  // Local State Data
  const [stats, setStats] = useState(MOCK_FREELANCE_STATS);
  const [services, setServices] = useState<FreelanceService[]>(MOCK_FREELANCE_SERVICES);
  const [jobs, setJobs] = useState<JobPosting[]>(MOCK_JOB_POSTINGS);
  const [proposals, setProposals] = useState<FreelanceProposal[]>(MOCK_PROPOSALS);
  const [orders, setOrders] = useState<FreelanceOrder[]>(MOCK_FREELANCE_ORDERS);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Selected Modal States
  const [selectedService, setSelectedService] = useState<FreelanceService | null>(null);
  const [isServiceDetailOpen, setIsServiceDetailOpen] = useState(false);

  const [isCreateServiceOpen, setIsCreateServiceOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<FreelanceOrder | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Handlers
  const handleOpenService = (service: FreelanceService) => {
    setSelectedService(service);
    setIsServiceDetailOpen(true);
  };

  const handlePlaceOrder = (service: FreelanceService, pkg: ServicePackage) => {
    setIsServiceDetailOpen(false);

    const newOrder: FreelanceOrder = {
      id: `ord_${Date.now()}`,
      serviceId: service.id,
      serviceTitle: service.title,
      servicePackageName: pkg.name,
      freelancerId: service.freelancerId,
      freelancerName: service.freelancerName,
      freelancerAvatar: service.freelancerAvatar,
      clientId: 'client_me_01',
      clientName: 'Maina Client Enterprises',
      clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      priceKES: pkg.priceKES,
      deliveryTimeDays: pkg.deliveryTimeDays,
      deadlineDate: '2026-08-15',
      status: 'in_progress',
      requirementsNotes: 'Standard requirements provided upon order placement.',
      deliveries: [],
      revisions: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setOrders(prev => [newOrder, ...prev]);
    setSelectedOrder(newOrder);
    setIsOrderModalOpen(true);
  };

  const handleCreateService = (serviceData: Partial<FreelanceService>) => {
    const newSrv: FreelanceService = {
      id: `srv_${Date.now()}`,
      freelancerId: 'fl_01',
      freelancerName: 'David Ochieng',
      freelancerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      freelancerRole: 'Lead Video Editor & Designer',
      freelancerBadge: 'Top Rated Pro',
      country: 'Kenya',
      verified: true,
      title: serviceData.title || 'New Freelance Service',
      description: serviceData.description || '',
      category: serviceData.category || 'Video Editing',
      subcategory: serviceData.subcategory || '',
      tags: serviceData.tags || ['Freelance'],
      startingPriceKES: serviceData.startingPriceKES || 15000,
      rating: 5.0,
      reviewCount: 1,
      ordersCount: 0,
      coverImage: serviceData.coverImage || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      galleryImages: serviceData.galleryImages || [],
      packages: serviceData.packages || {
        basic: { name: 'Basic', title: 'Basic', description: 'Basic Package', priceKES: 15000, deliveryTimeDays: 2, revisions: 2, features: [], includeSourceFiles: false, commercialRights: true, prioritySupport: false },
        standard: { name: 'Standard', title: 'Standard', description: 'Standard Package', priceKES: 35000, deliveryTimeDays: 3, revisions: 3, features: [], includeSourceFiles: true, commercialRights: true, prioritySupport: true },
        premium: { name: 'Premium', title: 'Premium', description: 'Premium Package', priceKES: 75000, deliveryTimeDays: 5, revisions: 'Unlimited', features: [], includeSourceFiles: true, commercialRights: true, prioritySupport: true }
      },
      whatsIncluded: serviceData.whatsIncluded || [],
      requirements: serviceData.requirements || [],
      faqs: serviceData.faqs || [],
      portfolio: [],
      viewsCount: 12,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setServices(prev => [newSrv, ...prev]);
  };

  const handlePostJob = (jobData: Partial<JobPosting>) => {
    const newJob: JobPosting = {
      id: `job_${Date.now()}`,
      clientId: 'cli_me',
      clientName: 'Maina Client Enterprises',
      clientAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      clientCompany: 'Maina Ventures',
      title: jobData.title || 'New Job Posting',
      description: jobData.description || '',
      category: jobData.category || 'Full Stack Development',
      skills: jobData.skills || ['React'],
      budgetKES: jobData.budgetKES || 100000,
      deadline: jobData.deadline || '2026-08-30',
      experienceLevel: jobData.experienceLevel || 'Intermediate',
      requiredLanguages: jobData.requiredLanguages || ['English'],
      location: jobData.location || 'Nairobi, Kenya',
      proposalsCount: 0,
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setJobs(prev => [newJob, ...prev]);
  };

  const handleSubmitProposal = (propData: Partial<FreelanceProposal>) => {
    const newProp: FreelanceProposal = {
      id: `prop_${Date.now()}`,
      jobId: propData.jobId || 'job_101',
      jobTitle: propData.jobTitle || 'Job Title',
      freelancerId: 'fl_01',
      freelancerName: 'David Ochieng',
      freelancerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      freelancerRating: 4.98,
      coverLetter: propData.coverLetter || '',
      proposedPriceKES: propData.proposedPriceKES || 90000,
      estimatedDeliveryDays: propData.estimatedDeliveryDays || 5,
      portfolioAttachments: [],
      status: 'submitted',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProposals(prev => [newProp, ...prev]);
  };

  const handleSubmitDelivery = (orderId: string, deliveryNotes: string, links: string[]) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'delivered' as const,
          deliveries: [
            ...o.deliveries,
            {
              id: `del_${Date.now()}`,
              orderId,
              deliveryNotes,
              files: [],
              externalLinks: links,
              submittedAt: new Date().toLocaleString()
            }
          ]
        };
      }
      return o;
    }));
  };

  const handleApproveDelivery = (orderId: string, rating: number, comment: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'completed' as const,
          completedAt: new Date().toISOString().split('T')[0],
          clientReview: {
            rating,
            comment,
            createdAt: new Date().toLocaleString()
          }
        };
      }
      return o;
    }));
  };

  // Filtered Services for Marketplace view
  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.freelancerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Header Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
              Freelancer Marketplace
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-200 dark:border-emerald-800">
              Upwork & Fiverr Integrated
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Buy and sell professional creative & technical services across Africa with M-Pesa escrow protection.
          </p>
        </div>

        {/* Perspective Switcher */}
        <div className="flex items-center rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActivePerspective('marketplace')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activePerspective === 'marketplace'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Explore Services
          </button>
          <button
            onClick={() => setActivePerspective('job_board')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activePerspective === 'job_board'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Job Board ({jobs.length})
          </button>
          <button
            onClick={() => setActivePerspective('freelancer_studio')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activePerspective === 'freelancer_studio'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Freelancer Studio
          </button>
          <button
            onClick={() => setActivePerspective('client_portal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activePerspective === 'client_portal'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Client Portal
          </button>
        </div>
      </div>

      {/* VIEW 1: MARKETPLACE SERVICES */}
      {activePerspective === 'marketplace' && (
        <div className="space-y-6">
          
          {/* Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold border border-white/20">
                  ⚡ African Creative & Tech Talent Network
                </span>
                <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight mt-2">
                  Find & Hire Verified Freelance Experts
                </h1>
                <p className="text-xs text-indigo-200/90 max-w-xl mt-1">
                  Video Editors, UI/UX Designers, React Developers, Motion Graphic Artists, and Copywriters.
                </p>
              </div>

              <button
                onClick={() => setIsCreateServiceOpen(true)}
                className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Create Service Gig</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative pt-2">
              <Search className="w-4 h-4 absolute left-3.5 top-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search services by keyword, skill, or freelancer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 text-white placeholder-indigo-200/60 border border-white/20 text-xs font-medium focus:outline-none focus:bg-white/20"
              />
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                className="group rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={srv.coverImage}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                      {srv.category}
                    </span>
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black">
                      From {srv.startingPriceKES.toLocaleString()} KES
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={srv.freelancerAvatar}
                        alt={srv.freelancerName}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="font-bold text-xs text-slate-900 dark:text-white">
                            {srv.freelancerName}
                          </p>
                          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <p className="text-[10px] text-slate-400">{srv.freelancerRole}</p>
                      </div>

                      <div className="ml-auto flex items-center gap-1 text-xs font-extrabold text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{srv.rating}</span>
                        <span className="text-slate-400 font-normal">({srv.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                      {srv.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-700/80 mt-2 pt-3 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {srv.packages.basic.deliveryTimeDays}-Day Fast Delivery
                  </span>

                  <button
                    onClick={() => handleOpenService(srv)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1 shadow-2xs transition-colors"
                  >
                    <span>View Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* VIEW 2: JOB BOARD */}
      {activePerspective === 'job_board' && (
        <FreelancerJobBoard
          jobs={jobs}
          proposals={proposals}
          onPostJob={handlePostJob}
          onSubmitProposal={handleSubmitProposal}
        />
      )}

      {/* VIEW 3: FREELANCER STUDIO */}
      {activePerspective === 'freelancer_studio' && (
        <FreelancerDashboardView
          stats={stats}
          services={services}
          orders={orders}
          jobs={jobs}
          onOpenCreateService={() => setIsCreateServiceOpen(true)}
          onOpenOrderModal={(ord) => {
            setSelectedOrder(ord);
            setIsOrderModalOpen(true);
          }}
          onOpenWallet={() => setActiveTab('wallet')}
          onOpenMessages={() => setActiveTab('messages')}
        />
      )}

      {/* VIEW 4: CLIENT PORTAL */}
      {activePerspective === 'client_portal' && (
        <ClientDashboardView
          services={services}
          orders={orders}
          jobs={jobs}
          onOpenServiceModal={handleOpenService}
          onOpenOrderModal={(ord) => {
            setSelectedOrder(ord);
            setIsOrderModalOpen(true);
          }}
          onPostJob={() => setActivePerspective('job_board')}
        />
      )}

      {/* CREATE SERVICE MODAL */}
      <CreateServiceModal
        isOpen={isCreateServiceOpen}
        onClose={() => setIsCreateServiceOpen(false)}
        onCreate={handleCreateService}
      />

      {/* SERVICE DETAIL MODAL */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isServiceDetailOpen}
        onClose={() => setIsServiceDetailOpen(false)}
        onPlaceOrder={handlePlaceOrder}
        onContactFreelancer={() => {
          setIsServiceDetailOpen(false);
          setActiveTab('messages');
        }}
      />

      {/* ORDER MANAGEMENT MODAL */}
      <FreelancerOrderManagementModal
        order={selectedOrder}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSubmitDelivery={handleSubmitDelivery}
        onApproveDelivery={handleApproveDelivery}
      />

    </div>
  );
};
