import React, { useState } from 'react';
import { EscrowAccount } from '../../types/finance';
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Eye,
  DollarSign,
  UserCheck,
  FileText,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface Props {
  escrows: EscrowAccount[];
  onReleaseEscrow: (escrowId: string, milestoneId?: string) => void;
  onDisputeEscrow: (escrowId: string, reason: string) => void;
}

export const EscrowManagerView: React.FC<Props> = ({
  escrows,
  onReleaseEscrow,
  onDisputeEscrow
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'funded' | 'released' | 'disputed'>('all');
  const [selectedEscrow, setSelectedEscrow] = useState<EscrowAccount | null>(null);
  const [disputeReasonInput, setDisputeReasonInput] = useState('');
  const [showDisputeModal, setShowDisputeModal] = useState(false);

  const filteredEscrows = escrows.filter((e) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'funded') return e.status === 'funded' || e.status === 'partially_released' || e.status === 'in_review';
    if (activeFilter === 'released') return e.status === 'released';
    if (activeFilter === 'disputed') return e.status === 'disputed';
    return true;
  });

  const totalHeldKES = escrows
    .filter((e) => e.status === 'funded' || e.status === 'partially_released' || e.status === 'in_review')
    .reduce((acc, curr) => acc + (curr.totalAmountKES - curr.releasedAmountKES), 0);

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEscrow || !disputeReasonInput.trim()) return;

    onDisputeEscrow(selectedEscrow.id, disputeReasonInput);
    setShowDisputeModal(false);
    setDisputeReasonInput('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Info */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Escrow Guarantee Engine</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-white">
            {totalHeldKES.toLocaleString()} <span className="text-emerald-400 text-lg">KES</span> Locked in Active Escrow
          </h3>
          <p className="text-xs text-slate-400">
            Funds are held securely by ClipForge until deliverables pass inspection & quality control.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Protected Contracts</span>
            <span className="font-extrabold text-base text-white">{escrows.length} Active</span>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Auto-Release Window</span>
            <span className="font-extrabold text-base text-emerald-400">7 Days Max</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          {(['all', 'funded', 'released', 'disputed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                activeFilter === tab
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab === 'funded' ? 'Active In Escrow' : tab}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing {filteredEscrows.length} Contracts
        </span>
      </div>

      {/* Escrow Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredEscrows.map((item) => {
          const remainingKES = item.totalAmountKES - item.releasedAmountKES;
          const isFullyReleased = item.status === 'released';
          const isDisputed = item.status === 'disputed';

          return (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/80 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {item.itemType.replace('_', ' ')}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        isFullyReleased
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-200 dark:border-emerald-800'
                          : isDisputed
                          ? 'bg-red-50 dark:bg-red-950/60 text-red-600 border border-red-200 dark:border-red-800'
                          : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 border border-amber-200 dark:border-amber-800'
                      }`}
                    >
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Escrow Locked Value
                  </span>
                  <span className="font-heading font-extrabold text-xl text-indigo-600 dark:text-indigo-400">
                    {item.totalAmountKES.toLocaleString()} KES
                  </span>
                </div>
              </div>

              {/* Parties involved */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={item.payerAvatar}
                    alt={item.payerName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Payer / Brand</span>
                    <span className="font-bold text-slate-900 dark:text-white">{item.payerName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={item.payeeAvatar}
                    alt={item.payeeName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Payee / Creator</span>
                    <span className="font-bold text-slate-900 dark:text-white">{item.payeeName}</span>
                  </div>
                </div>
              </div>

              {/* Milestones Breakdown */}
              {item.milestones && item.milestones.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Milestone Breakdown & Approvals
                  </span>
                  <div className="space-y-1.5">
                    {item.milestones.map((ms) => (
                      <div
                        key={ms.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          {ms.status === 'released' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          ) : ms.status === 'approved' ? (
                            <ShieldCheck className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          )}
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {ms.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            {ms.amountKES.toLocaleString()} KES
                          </span>

                          {ms.status !== 'released' && !isDisputed && (
                            <button
                              onClick={() => onReleaseEscrow(item.id, ms.id)}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition-all shadow-2xs"
                            >
                              Release
                            </button>
                          )}
                          {ms.status === 'released' && (
                            <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                              Released
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-700/80">
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Auto-release: {new Date(item.autoReleaseDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2">
                  {!isFullyReleased && !isDisputed && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedEscrow(item);
                          setShowDisputeModal(true);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-red-50 dark:bg-red-950/60 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-300 font-semibold text-xs border border-red-200 dark:border-red-800 transition-all"
                      >
                        Raise Dispute
                      </button>

                      <button
                        onClick={() => onReleaseEscrow(item.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Release All ({remainingKES.toLocaleString()} KES)</span>
                      </button>
                    </>
                  )}

                  {isDisputed && (
                    <span className="text-xs text-red-500 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" /> Disputed - ClipForge Legal Reviewing
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dispute Modal */}
      {showDisputeModal && selectedEscrow && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Raise Escrow Dispute</span>
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Contract: <strong>{selectedEscrow.title}</strong> ({selectedEscrow.totalAmountKES.toLocaleString()} KES)
            </p>

            <form onSubmit={handleDisputeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Reason for Dispute / Issue Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={disputeReasonInput}
                  onChange={(e) => setDisputeReasonInput(e.target.value)}
                  placeholder="Describe non-delivery, copyright issue, or missing specifications..."
                  className="w-full p-3 text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowDisputeModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/20"
                >
                  Submit Dispute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
