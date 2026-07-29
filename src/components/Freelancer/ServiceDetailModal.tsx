import React, { useState } from 'react';
import {
  X,
  Star,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldCheck,
  FileCheck,
  MessageSquare,
  ArrowRight,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { FreelanceService, ServicePackage } from '../../types/freelancer';

interface ServiceDetailModalProps {
  service: FreelanceService | null;
  isOpen: boolean;
  onClose: () => void;
  onPlaceOrder: (service: FreelanceService, selectedPackage: ServicePackage) => void;
  onContactFreelancer: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onPlaceOrder,
  onContactFreelancer
}) => {
  if (!isOpen || !service) return null;

  const [activeTab, setActiveTab] = useState<'basic' | 'standard' | 'premium'>('standard');

  const selectedPkg = service.packages[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[92vh] overflow-y-auto">
        
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
                {service.category}
              </span>
              <span className="text-xs text-slate-400">• {service.country}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900 dark:text-white leading-snug">
              {service.title}
            </h2>

            {/* Freelancer Author Info */}
            <div className="flex items-center gap-3 pt-1">
              <img
                src={service.freelancerAvatar}
                alt={service.freelancerName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {service.freelancerName}
                  </span>
                  {service.verified && (
                    <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  )}
                  {service.freelancerBadge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                      {service.freelancerBadge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-amber-500 font-extrabold flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {service.rating}
                  </span>
                  <span>({service.reviewCount} reviews)</span>
                  <span>• {service.ordersCount} orders completed</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Details (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Cover Banner */}
            <div className="rounded-2xl overflow-hidden bg-slate-900 h-64 border border-slate-200 dark:border-slate-700">
              <img
                src={service.coverImage}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                About This Service
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {service.description}
              </p>
            </div>

            {/* What's Included */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white">Included in All Orders:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.whatsIncluded.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                    Frequently Asked Questions
                  </h3>
                </div>
                <div className="space-y-2">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white block">Q: {faq.question}</span>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Pricing Package Selector & Order Action (1 Col) */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border-2 border-indigo-500/40 shadow-xl space-y-5">
              
              {/* Package Tabs */}
              <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-900 p-1">
                {(['basic', 'standard', 'premium'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-xl text-xs font-extrabold capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Package Card */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                    {selectedPkg.title}
                  </h4>
                  <span className="font-heading font-black text-xl text-emerald-600 dark:text-emerald-400">
                    {selectedPkg.priceKES.toLocaleString()} KES
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {selectedPkg.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span>{selectedPkg.deliveryTimeDays}-Day Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-indigo-500" />
                    <span>{selectedPkg.revisions} Revisions</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2 pt-2 text-xs">
                  <span className="font-bold text-slate-400 text-[10px] uppercase block">Package Features:</span>
                  {selectedPkg.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  {selectedPkg.includeSourceFiles && (
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                      <span>Includes Source Files</span>
                    </div>
                  )}
                  {selectedPkg.commercialRights && (
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                      <span>Commercial Use Rights</span>
                    </div>
                  )}
                </div>

                {/* Place Order Button */}
                <button
                  onClick={() => onPlaceOrder(service, selectedPkg)}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Order Now ({selectedPkg.priceKES.toLocaleString()} KES)</span>
                </button>

                <button
                  onClick={onContactFreelancer}
                  className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-200"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Freelancer</span>
                </button>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
