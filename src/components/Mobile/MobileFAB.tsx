import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Scissors,
  Plus,
  X,
  Bot,
  ArrowDownLeft,
  Video,
  FileText
} from 'lucide-react';

interface MobileFABProps {
  onOpenMobileUploader: () => void;
  onOpenCreateCampaign: () => void;
}

export const MobileFAB: React.FC<MobileFABProps> = ({
  onOpenMobileUploader,
  onOpenCreateCampaign
}) => {
  const { setActiveTab } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 flex flex-col items-end pointer-events-none">
      
      {/* Quick Action Popup Items */}
      {isOpen && (
        <div className="mb-3 space-y-2 pointer-events-auto animate-scale-up origin-bottom-right">
          
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenCreateCampaign();
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-xl text-xs font-bold hover:bg-slate-800 transition-all"
          >
            <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Scissors className="w-4 h-4" />
            </div>
            <span>Post New Clip Bounty</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              onOpenMobileUploader();
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-xl text-xs font-bold hover:bg-slate-800 transition-all"
          >
            <div className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Video className="w-4 h-4" />
            </div>
            <span>Submit Edited Clip</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              setActiveTab('ai-tools');
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-xl text-xs font-bold hover:bg-slate-800 transition-all"
          >
            <div className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400">
              <Bot className="w-4 h-4" />
            </div>
            <span>AI Script & Hook Generator</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              setActiveTab('wallet');
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-xl text-xs font-bold hover:bg-slate-800 transition-all"
          >
            <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
            <span>Deposit M-Pesa Cash</span>
          </button>

        </div>
      )}

      {/* Main Trigger Toggle FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto p-4 rounded-full text-white shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-slate-900 ${
          isOpen
            ? 'bg-slate-800 rotate-45 scale-105'
            : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/40 hover:scale-105'
        }`}
        aria-label="Quick Actions Menu"
      >
        <Plus className="w-6 h-6" />
      </button>

    </div>
  );
};
