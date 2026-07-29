import React, { useState } from 'react';
import {
  X,
  FileCheck,
  Upload,
  CheckCircle2,
  Clock,
  RotateCcw,
  DollarSign,
  Paperclip,
  ExternalLink,
  ShieldCheck,
  Star,
  MessageSquare
} from 'lucide-react';
import { FreelanceOrder, FreelanceDelivery } from '../../types/freelancer';

interface FreelancerOrderManagementModalProps {
  order: FreelanceOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitDelivery?: (orderId: string, deliveryNotes: string, links: string[]) => void;
  onRequestRevision?: (orderId: string, feedbackNotes: string) => void;
  onApproveDelivery?: (orderId: string, rating: number, comment: string) => void;
}

export const FreelancerOrderManagementModal: React.FC<FreelancerOrderManagementModalProps> = ({
  order,
  isOpen,
  onClose,
  onSubmitDelivery,
  onRequestRevision,
  onApproveDelivery
}) => {
  if (!isOpen || !order) return null;

  const [activeTab, setActiveTab] = useState<'details' | 'deliveries' | 'revision'>('details');

  // Delivery form state
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [externalLink, setExternalLink] = useState('');

  // Revision form state
  const [revisionNotes, setRevisionNotes] = useState('');

  // Review state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('Excellent work delivered on time!');

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryNotes.trim()) return;
    if (onSubmitDelivery) {
      onSubmitDelivery(order.id, deliveryNotes, externalLink ? [externalLink] : []);
    }
    setDeliveryNotes('');
    setExternalLink('');
  };

  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNotes.trim()) return;
    if (onRequestRevision) {
      onRequestRevision(order.id, revisionNotes);
    }
    setRevisionNotes('');
  };

  const handleApproveSubmit = () => {
    if (onApproveDelivery) {
      onApproveDelivery(order.id, reviewRating, reviewComment);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase">
                Order #{order.id}
              </span>
              <span className="text-xs text-slate-400">• {order.servicePackageName} Package</span>
            </div>
            <h2 className="text-xl font-black font-heading text-slate-900 dark:text-white mt-1">
              {order.serviceTitle}
            </h2>
            <p className="text-xs text-slate-500">
              Client: <span className="font-bold text-slate-700 dark:text-slate-300">{order.clientName}</span> • Freelancer: <span className="font-bold text-slate-700 dark:text-slate-300">{order.freelancerName}</span>
            </p>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Escrow Amount</span>
            <span className="font-heading font-black text-lg text-emerald-600 dark:text-emerald-400">
              {order.priceKES.toLocaleString()} KES
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Order Status</span>
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400 capitalize">
              {order.status.replace('_', ' ')}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Deadline Date</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{order.deadlineDate}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500'
            }`}
          >
            Order Details & Requirements
          </button>
          <button
            onClick={() => setActiveTab('deliveries')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'deliveries'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500'
            }`}
          >
            Deliveries ({order.deliveries.length})
          </button>
          <button
            onClick={() => setActiveTab('revision')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'revision'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500'
            }`}
          >
            Revisions & Approval
          </button>
        </div>

        {/* TAB 1: DETAILS */}
        {activeTab === 'details' && (
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Requirements & Instructions</h4>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                {order.requirementsNotes || 'No special requirements noted.'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 flex-shrink-0" />
              <div>
                <span className="font-bold block">Escrow Protection Active</span>
                <span className="text-[11px]">Funds are safely held in escrow and will be released to the freelancer immediately upon client approval.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DELIVERIES */}
        {activeTab === 'deliveries' && (
          <div className="space-y-5 text-xs">
            {/* Existing Deliveries */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white">Submitted Deliveries</h4>
              {order.deliveries.length === 0 ? (
                <p className="text-slate-400 italic">No delivery submitted yet.</p>
              ) : (
                order.deliveries.map((del) => (
                  <div key={del.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="font-bold text-slate-900 dark:text-white">Delivery Submission</span>
                      <span className="text-[10px]">{del.submittedAt}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{del.deliveryNotes}</p>
                    {del.externalLinks && del.externalLinks.map((link) => (
                      <a key={link} href={link} target="_blank" rel="noreferrer" className="text-indigo-600 font-bold flex items-center gap-1">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{link}</span>
                      </a>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* Freelancer Delivery Form */}
            <form onSubmit={handleDeliverySubmit} className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-indigo-600" />
                <span>Submit Work Delivery</span>
              </h4>

              <div>
                <label className="block font-semibold mb-1">Delivery Notes / Message *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe what was completed, source files, or instructions..."
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">External Deliverable Link (Vercel, Google Drive, Figma, Dropbox)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                <span>Deliver Work Order</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: REVISIONS & APPROVAL */}
        {activeTab === 'revision' && (
          <div className="space-y-5 text-xs">
            {/* Request Revision Form */}
            <form onSubmit={handleRevisionSubmit} className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 space-y-3">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>Request Revision</span>
              </h4>

              <div>
                <textarea
                  required
                  rows={3}
                  placeholder="Specify exact changes needed..."
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-600 text-white font-extrabold"
              >
                Submit Revision Request
              </button>
            </form>

            {/* Approve Delivery & Release Escrow */}
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Approve Work & Release Escrow</span>
              </h4>

              <div>
                <label className="block font-bold mb-1">Rating Review (1-5 Stars)</label>
                <div className="flex gap-2 text-amber-500 font-bold mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="text-lg"
                    >
                      {star <= reviewRating ? '★' : '☆'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Client Feedback Comment</label>
                <input
                  type="text"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <button
                type="button"
                onClick={handleApproveSubmit}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md"
              >
                Approve Delivery & Release {order.priceKES.toLocaleString()} KES Escrow
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
