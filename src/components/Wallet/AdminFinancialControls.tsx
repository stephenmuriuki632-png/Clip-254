import React, { useState } from 'react';
import { WithdrawalRequest, UserWallet, FinancialAnalyticsSummary } from '../../types/finance';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Lock,
  Unlock,
  AlertTriangle,
  RefreshCw,
  Search,
  DollarSign,
  Activity,
  FileCheck,
  Building2
} from 'lucide-react';

interface Props {
  withdrawals: WithdrawalRequest[];
  analytics: FinancialAnalyticsSummary;
  onApproveWithdrawal: (id: string) => void;
  onRejectWithdrawal: (id: string, reason: string) => void;
  onAdjustBalance?: (userId: string, amountKES: number, reason: string) => void;
}

export const AdminFinancialControls: React.FC<Props> = ({
  withdrawals,
  analytics,
  onApproveWithdrawal,
  onRejectWithdrawal,
  onAdjustBalance
}) => {
  const [activeTab, setActiveTab] = useState<'payouts' | 'wallets' | 'audit'>('payouts');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [adjustUserId, setAdjustUserId] = useState('');
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustReason, setAdjustReason] = useState('');

  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'pending');

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWithdrawal || !rejectionReason.trim()) return;

    onRejectWithdrawal(selectedWithdrawal.id, rejectionReason);
    setShowRejectModal(false);
    setRejectionReason('');
  };

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustUserId || !adjustAmount || !onAdjustBalance) return;

    onAdjustBalance(adjustUserId, Number(adjustAmount), adjustReason || 'Admin Adjustment');
    setAdjustUserId('');
    setAdjustAmount('');
    setAdjustReason('');
    alert('Wallet balance updated cleanly!');
  };

  return (
    <div className="space-y-6">
      {/* Admin Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Financial System Control Desk</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-white">
            Admin Financial Desk & Fraud Security
          </h3>
          <p className="text-xs text-slate-400">
            Manual payout authorization, wallet freezes, balance adjustments & audit velocity checks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Pending Payouts</span>
            <span className="font-extrabold text-base text-amber-400">{pendingWithdrawals.length} Action Needed</span>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Security Alert Level</span>
            <span className="font-extrabold text-base text-emerald-400">Normal (0 Flags)</span>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('payouts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'payouts'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Withdrawal Approvals ({pendingWithdrawals.length})
        </button>

        <button
          onClick={() => setActiveTab('wallets')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'wallets'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Manual Balance Adjustments
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'audit'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Security Audit Logs
        </button>
      </div>

      {/* Payouts Tab */}
      {activeTab === 'payouts' && (
        <div className="space-y-4">
          <h4 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
            Withdrawal Request Approvals
          </h4>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Provider</th>
                  <th className="p-4">Destination Account</th>
                  <th className="p-4">Amount KES</th>
                  <th className="p-4">Net Payout</th>
                  <th className="p-4">Requested At</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                {withdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{w.userName}</td>
                    <td className="p-4 text-slate-500">{w.userRole}</td>
                    <td className="p-4 uppercase font-bold text-[10px] text-slate-400">{w.provider}</td>
                    <td className="p-4 font-mono">{w.accountIdentifier}</td>
                    <td className="p-4 font-extrabold">{w.amountKES.toLocaleString()} KES</td>
                    <td className="p-4 font-extrabold text-emerald-600 dark:text-emerald-400">
                      {w.netAmountKES.toLocaleString()} KES
                    </td>
                    <td className="p-4 text-slate-400">{w.requestedAt}</td>
                    <td className="p-4 text-right">
                      {w.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onApproveWithdrawal(w.id)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 shadow-2xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => {
                              setSelectedWithdrawal(w);
                              setShowRejectModal(true);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-600 dark:text-red-300 font-bold text-[10px] border border-red-200 dark:border-red-800"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {w.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manual Balance Adjustments */}
      {activeTab === 'wallets' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4 max-w-xl">
          <h4 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
            Issue Manual Balance Adjustment / Grant
          </h4>

          <form onSubmit={handleAdjustSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target User ID or Handle
              </label>
              <input
                type="text"
                required
                placeholder="usr_current or @alex_k"
                value={adjustUserId}
                onChange={(e) => setAdjustUserId(e.target.value)}
                className="w-full p-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Adjustment Amount in KES (+ Positive for Credit, - Negative for Debit)
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 5000 or -1000"
                value={adjustAmount}
                onChange={(e) => setAdjustAmount(e.target.value)}
                className="w-full p-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Audit Reason / Justification
              </label>
              <input
                type="text"
                required
                placeholder="Dispute resolution bonus, promo refund, etc."
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
            >
              Post Manual Ledger Adjustment
            </button>
          </form>
        </div>
      )}

      {/* Security Audit Logs */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <h4 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
            Security Audit Logs & Fraud Detection Logs
          </h4>

          <div className="space-y-3">
            {analytics.recentAuditLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center justify-between text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {log.event}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-slate-100 dark:bg-slate-900 text-slate-500">
                      User: {log.user}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">{log.details}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">{log.timestamp}</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-200">
                    Severity: {log.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectModal && selectedWithdrawal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
              Reject Withdrawal Request
            </h3>
            <p className="text-xs text-slate-500">
              User: {selectedWithdrawal.userName} ({selectedWithdrawal.amountKES.toLocaleString()} KES)
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Rejection Reason / Note to User
                </label>
                <textarea
                  required
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="M-Pesa name mismatch, invalid account details..."
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/20"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
