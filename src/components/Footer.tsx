import React from 'react';
import { useApp } from '../context/AppContext';
import { ClipForgeLogo } from './Brand/ClipForgeLogo';
import { ShieldCheck, Heart, Twitter, Youtube, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 */}
          <div className="space-y-3 lg:col-span-2">
            <ClipForgeLogo variant="horizontal" size="md" showBadge={true} />
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
              Global Creator Economy Super Platform. Connecting creators, brands, video editors, UGC talent, and agencies with instant M-Pesa & global payouts.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-600 transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-pink-600 transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-600 transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-heading font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-3">Marketplaces</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><button onClick={() => setActiveTab('clipping')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Video Clipping Bounties</button></li>
              <li><button onClick={() => setActiveTab('creators')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Creator Directory</button></li>
              <li><button onClick={() => setActiveTab('ugc')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">UGC Brand Briefs</button></li>
              <li><button onClick={() => setActiveTab('influencers')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Influencer Directory</button></li>
              <li><button onClick={() => setActiveTab('freelance')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Freelance Services</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-heading font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-3">Company & Support</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><button onClick={() => setActiveTab('about')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</button></li>
              <li><button onClick={() => setActiveTab('features')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Platform Features</button></li>
              <li><button onClick={() => setActiveTab('pricing')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing Plans</button></li>
              <li><button onClick={() => setActiveTab('careers')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Careers & Hiring</button></li>
              <li><button onClick={() => setActiveTab('blog')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog & Playbooks</button></li>
              <li><button onClick={() => setActiveTab('help')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help Center</button></li>
              <li><button onClick={() => setActiveTab('brand-kit')} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline transition-all">Brand & Logo Kit</button></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-heading font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-3">Legal & Trust</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><button onClick={() => setActiveTab('legal')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => setActiveTab('legal')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => setActiveTab('legal')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cookie Policy</button></li>
              <li><button onClick={() => setActiveTab('admin')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-indigo-600 dark:text-indigo-400 font-bold">Admin Portal</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Escrow Protected Platform • Safaricom M-Pesa Integrated</span>
          </div>

          <p>© 2026 ClipForge Technologies Ltd. Built for African creators.</p>
        </div>

      </div>
    </footer>
  );
};

