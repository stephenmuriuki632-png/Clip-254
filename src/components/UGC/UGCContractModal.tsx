import React, { useState } from 'react';
import {
  X,
  FileCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  PenTool,
  ShieldCheck,
  AlertCircle,
  MessageSquare,
  Send,
  RotateCcw,
  Upload
} from 'lucide-react';
import { UGCBooking, UGCContract, UGCMilestone } from '../../types';

interface UGCContractModalProps {
  booking: UGCBooking | null;
  isOpen: boolean;
  onClose: () => void;
  onApproveMilestone?: (bookingId: string, milestoneId: string) => void;
  onRequestRevision?: (bookingId: string, notes: string) => void;
  onSignContract?: (bookingId: string, role: 'brand' | 'creator') => void;
}

export const UGCContractModal: React.FC<UGCContractModalProps> = ({
  booking,
  isOpen,
  onClose,
  onApproveMilestone,
  onRequestRevision,
  onSignContract
}) => {
  const [activeTab, setActiveTab] = useState<'contract' | 'milestones' | 'revisions'>('contract');
  const [revisionNotes, setRevisionNotes] = useState('');

  if (!isOpen || !booking) return null;

  const contract = booking.contract;

  const handleSendRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNotes.trim()) return;
    if (onRequestRevision) {
      onRequestRevision(booking.id, revisionNotes);
    }
    setRevisionNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                  {booking.title}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Escrow Protected
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Brand: <span className="font-bold text-slate-700 dark:text-slate-300">{booking.brandName}</span> • Creator: <span className="font-bold text-slate-700 dark:text-slate-300">{booking.creatorName}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-6 bg-white dark:bg-slate-900 flex gap-4">
          <button
            onClick={() => setActiveTab('contract')}
            className={`py-3 text-xs font-extrabold border-b-2 transition-colors ${
              activeTab === 'contract'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            📜 Agreement Terms & Signatures
          </button>
          <button
            onClick={() => setActiveTab('milestones')}
            className={`py-3 text-xs font-extrabold border-b-2 transition-colors ${
              activeTab === 'milestones'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🏁 Milestones & Escrow ({contract?.milestones.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('revisions')}
            className={`py-3 text-xs font-extrabold border-b-2 transition-colors ${
              activeTab === 'revisions'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🔄 Revision Tracker ({booking.revisions.length})
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* CONTRACT TAB */}
          {activeTab === 'contract' && contract && (
            <div className="space-y-6 text-xs text-slate-700 dark:text-slate-300">
              
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                    Total Contract Value
                  </span>
                  <span className="font-heading font-black text-2xl text-slate-900 dark:text-white">
                    {contract.totalAmountKES.toLocaleString()} KES
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Revision Limit:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{contract.revisionLimit} Included</span>
                </div>
              </div>

              {/* Deliverables Section */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                  Scope of Deliverables
                </h4>
                <div className="space-y-1.5">
                  {contract.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms & Policies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <h5 className="font-bold text-slate-900 dark:text-white">Payment Terms</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{contract.paymentTerms}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <h5 className="font-bold text-slate-900 dark:text-white">Cancellation Policy</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{contract.cancellationPolicy}</p>
                </div>
              </div>

              {/* Digital Signatures Box */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
                <h4 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-indigo-600" />
                  Digital Signatures & Execution
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Brand Signature */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Brand Signature</span>
                    <p className="font-bold text-slate-900 dark:text-white">{contract.brandName}</p>
                    {contract.brandSigned ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                        <ShieldCheck className="w-4 h-4" /> Signed on {contract.brandSignedAt}
                      </div>
                    ) : (
                      <button
                        onClick={() => onSignContract && onSignContract(booking.id, 'brand')}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs"
                      >
                        Sign as Brand
                      </button>
                    )}
                  </div>

                  {/* Creator Signature */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Creator Signature</span>
                    <p className="font-bold text-slate-900 dark:text-white">{contract.creatorName}</p>
                    {contract.creatorSigned ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                        <ShieldCheck className="w-4 h-4" /> Signed on {contract.creatorSignedAt}
                      </div>
                    ) : (
                      <button
                        onClick={() => onSignContract && onSignContract(booking.id, 'creator')}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs"
                      >
                        Sign as Creator
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* MILESTONES TAB */}
          {activeTab === 'milestones' && contract && (
            <div className="space-y-4">
              {contract.milestones.map((ms) => (
                <div
                  key={ms.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {ms.description}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        ms.status === 'approved' || ms.status === 'paid'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : ms.status === 'in_progress'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {ms.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      Due Date: <span className="font-semibold text-slate-700 dark:text-slate-300">{ms.dueDate}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-heading font-black text-lg text-emerald-600 dark:text-emerald-400">
                      {ms.amountKES.toLocaleString()} KES
                    </span>

                    {ms.status !== 'approved' && ms.status !== 'paid' && (
                      <button
                        onClick={() => onApproveMilestone && onApproveMilestone(booking.id, ms.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm"
                      >
                        Approve & Release
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* REVISIONS TAB */}
          {activeTab === 'revisions' && (
            <div className="space-y-6">
              
              {/* Form to submit revision */}
              <form onSubmit={handleSendRevision} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                  Request Revision / Feedback
                </h4>
                <textarea
                  rows={3}
                  placeholder="Detail specific video timestamps, captions, logo placements or voiceover corrections..."
                  value={revisionNotes}
                  onChange={e => setRevisionNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Submit Revision Request</span>
                  </button>
                </div>
              </form>

              {/* History list */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs text-slate-400 uppercase">Revision History</h4>
                {booking.revisions.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No revision requests logged yet.</p>
                ) : (
                  booking.revisions.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 dark:text-white">
                          Requested by {rev.requestedBy === 'brand' ? booking.brandName : booking.creatorName}
                        </span>
                        <span className="text-[10px] text-slate-400">{rev.timestamp}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">{rev.notes}</p>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
