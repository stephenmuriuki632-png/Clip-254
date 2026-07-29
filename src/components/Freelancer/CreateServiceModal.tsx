import React, { useState } from 'react';
import { X, Sparkles, Plus, Trash2, CheckCircle2, Layers } from 'lucide-react';
import { FreelanceService, FreelancerCategory, ServicePackage } from '../../types/freelancer';

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (serviceData: Partial<FreelanceService>) => void;
}

export const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  if (!isOpen) return null;

  const categories: FreelancerCategory[] = [
    'Video Editing',
    'Graphic Design',
    'Logo Design',
    'Brand Identity',
    'Motion Graphics',
    'Animation',
    'UI Design',
    'UX Design',
    'Web Design',
    'Web Development',
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Mobile App Development',
    'WordPress',
    'Shopify',
    'Programming',
    'AI Development',
    'Machine Learning',
    'Data Analysis',
    'Cybersecurity',
    'Copywriting',
    'Content Writing',
    'SEO',
    'Digital Marketing',
    'Social Media Management',
    'Photography',
    'Videography',
    'Voice Over',
    'Translation',
    'Virtual Assistance',
    'Business Consulting',
    'Architecture',
    'Interior Design',
    '3D Modelling',
    'CAD Design',
    'Music Production',
    'Podcast Editing',
    'Resume Writing',
    'Presentation Design'
  ];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FreelancerCategory>('Video Editing');
  const [subcategory, setSubcategory] = useState('');
  const [tagsInput, setTagsInput] = useState('Video Editing, Animation, Premiere Pro');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80');

  // Package fields
  const [basicPrice, setBasicPrice] = useState<number>(15000);
  const [basicDays, setBasicDays] = useState<number>(2);
  const [basicDesc, setBasicDesc] = useState('Basic starter package delivering standard video edit.');

  const [standardPrice, setStandardPrice] = useState<number>(35000);
  const [standardDays, setStandardDays] = useState<number>(3);
  const [standardDesc, setStandardDesc] = useState('Standard complete package with motion graphics.');

  const [premiumPrice, setPremiumPrice] = useState<number>(75000);
  const [premiumDays, setPremiumDays] = useState<number>(5);
  const [premiumDesc, setPremiumDesc] = useState('Full premium agency package with source files & 4K export.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tagsArr = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const basicPkg: ServicePackage = {
      name: 'Basic',
      title: 'Basic Package',
      description: basicDesc,
      priceKES: basicPrice,
      deliveryTimeDays: basicDays,
      revisions: 2,
      features: ['Standard Export', '2 Revisions'],
      includeSourceFiles: false,
      commercialRights: true,
      prioritySupport: false
    };

    const standardPkg: ServicePackage = {
      name: 'Standard',
      title: 'Standard Package',
      description: standardDesc,
      priceKES: standardPrice,
      deliveryTimeDays: standardDays,
      revisions: 3,
      features: ['Full HD Export', 'Motion Graphics', '3 Revisions'],
      includeSourceFiles: true,
      commercialRights: true,
      prioritySupport: true
    };

    const premiumPkg: ServicePackage = {
      name: 'Premium',
      title: 'Premium Package',
      description: premiumDesc,
      priceKES: premiumPrice,
      deliveryTimeDays: premiumDays,
      revisions: 'Unlimited',
      features: ['4K Export', 'Source Files', 'Priority 24/7 Support', 'Unlimited Revisions'],
      includeSourceFiles: true,
      commercialRights: true,
      prioritySupport: true
    };

    onCreate({
      title,
      description,
      category,
      subcategory,
      tags: tagsArr,
      startingPriceKES: basicPrice,
      coverImage,
      galleryImages: [coverImage],
      packages: {
        basic: basicPkg,
        standard: standardPkg,
        premium: premiumPkg
      },
      whatsIncluded: ['Full HD Export', 'Royalty-Free Audio', 'Commercial License'],
      requirements: ['Detailed Brief', 'Assets & Source Media Link'],
      faqs: [{ question: 'What software is used?', answer: 'Adobe Creative Suite & Premiere Pro 2026.' }]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-black font-heading text-slate-900 dark:text-white">
                Create New Freelance Service Gig
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Publish your creative service offering with 3 custom pricing packages (Basic, Standard, Premium).
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {/* Title & Category */}
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Service Title (I will...) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. I will edit viral YouTube videos with motion graphics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FreelancerCategory)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subcategory
                </label>
                <input
                  type="text"
                  placeholder="e.g. Social Media Video Editing"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe your service in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                placeholder="Video Editing, Motion Graphics, Premiere Pro"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none"
              />
            </div>
          </div>

          {/* Pricing Packages Setup */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                Define Service Packages (Basic, Standard, Premium)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Basic Package */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="font-extrabold text-xs text-indigo-600 dark:text-indigo-400 uppercase block">Basic Package</span>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Price (KES)</label>
                  <input
                    type="number"
                    value={basicPrice}
                    onChange={(e) => setBasicPrice(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Delivery Days</label>
                  <input
                    type="number"
                    value={basicDays}
                    onChange={(e) => setBasicDays(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Description</label>
                  <textarea
                    rows={2}
                    value={basicDesc}
                    onChange={(e) => setBasicDesc(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px]"
                  />
                </div>
              </div>

              {/* Standard Package */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-3">
                <span className="font-extrabold text-xs text-indigo-700 dark:text-indigo-300 uppercase block">Standard Package</span>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Price (KES)</label>
                  <input
                    type="number"
                    value={standardPrice}
                    onChange={(e) => setStandardPrice(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Delivery Days</label>
                  <input
                    type="number"
                    value={standardDays}
                    onChange={(e) => setStandardDays(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Description</label>
                  <textarea
                    rows={2}
                    value={standardDesc}
                    onChange={(e) => setStandardDesc(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px]"
                  />
                </div>
              </div>

              {/* Premium Package */}
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-3">
                <span className="font-extrabold text-xs text-purple-700 dark:text-purple-300 uppercase block">Premium Package</span>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Price (KES)</label>
                  <input
                    type="number"
                    value={premiumPrice}
                    onChange={(e) => setPremiumPrice(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Delivery Days</label>
                  <input
                    type="number"
                    value={premiumDays}
                    onChange={(e) => setPremiumDays(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Description</label>
                  <textarea
                    rows={2}
                    value={premiumDesc}
                    onChange={(e) => setPremiumDesc(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px]"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Freelance Gig</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
