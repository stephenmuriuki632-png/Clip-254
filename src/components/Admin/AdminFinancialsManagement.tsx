import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  DollarSign,
  ArrowDownRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Filter,
  Search,
  RefreshCw,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react';
import { AdminExportModal } from './AdminExportModal';

export const AdminFinancialsManagement: React.FC = () => {
  const { transactions, balanceKES, balanceUSD } = useApp();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Local state for withdrawal approval actions
  const [withdrawalsList, setWithdrawalsList] = useState([
    { id: 'w-101', user: 'Kevin Omondi', phone: '+254712345678', amountKES: 15000, date: '2026-07-28 09:12', status: 'Pending' },
    { id: 'w-102', user: 'Faith Mutua', phone: '+254722987654', amountKES: 42500, date: '2026-07-28 08:30', status: 'Pending' },
    { id: 'w-103', user: 'Brian Wanyama', phone: '+254701112233', amountKES: 8200, date: '2026-07-27 18:45', status: 'Approved' },
    { id: 'w-104', user: 'Amina Abdi', phone: '+254733445566', amountKES: 25000, date: '2026-07-27 14:10', status: 'Processed' },
  ]);

  const handleWithdrawalStatus = (id: string, newStatus: string) => {
    setWithdrawalsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleGenerateReceipt = (w: typeof withdrawalsList[0]) => {
    const receiptContent = `=== CLIPKENYA M-PESA B2C TRANSACTION RECEIPT ===\nReceipt No: REC-${w.id.toUpperCase()}\nUser: ${w.user}\nPhone: ${w.phone}\nAmount: KES ${w.amountKES.toLocaleString()}\nDate: ${w.date}\nStatus: ${w.status}\nIssuer: Safaricom M-Pesa Daraja B2C Gateway`;
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${w.id}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Platform Financial Governance & M-Pesa Escrow</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Reconcile platform GMV, approve/process B2C M-Pesa withdrawals, manage platform fees, coupons and generate transaction receipts.
          </p>
        </div>

        <button
          onClick={() => setIsExportOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Financial Ledger</span>
        </button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Escrow Reserve</p>
          <p className="font-heading font-extrabold text-2xl text-emerald-600 dark:text-emerald-400">14,250,000 KES</p>
          <p className="text-[10px] text-slate-400">Protected in Safaricom M-Pesa Trust</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Platform Revenue (10%)</p>
          <p className="font-heading font-extrabold text-2xl text-indigo-600 dark:text-indigo-400">1,425,000 KES</p>
          <p className="text-[10px] text-indigo-500 font-semibold">Net Platform Profit Margin</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Withdrawals Queue</p>
          <p className="font-heading font-extrabold text-2xl text-amber-500">57,500 KES</p>
          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">2 Requests Awaiting Approval</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Disputed Escrow Funds</p>
          <p className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">12,000 KES</p>
          <p className="text-[10px] text-slate-400">0.08% Dispute Ratio</p>
        </div>
      </div>

      {/* SECTION 1: M-Pesa B2C Withdrawal Queue */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
        <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>M-Pesa B2C Withdrawal Approval & Processing Queue</span>
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">User & M-Pesa Phone</th>
                <th className="p-3">Amount KES</th>
                <th className="p-3">Requested At</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {withdrawalsList.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">
                    {w.user}
                    <span className="block text-[10px] font-normal text-slate-400">{w.phone}</span>
                  </td>
                  <td className="p-3 font-extrabold text-indigo-600 dark:text-indigo-400">
                    {w.amountKES.toLocaleString()} KES
                  </td>
                  <td className="p-3 text-slate-500">{w.date}</td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold capitalize ${
                        w.status === 'Pending'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : w.status === 'Approved'
                          ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                          : w.status === 'Processed'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {w.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1.5">
                    {w.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleWithdrawalStatus(w.id, 'Approved')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleWithdrawalStatus(w.id, 'Rejected')}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px]"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {w.status === 'Approved' && (
                      <button
                        onClick={() => handleWithdrawalStatus(w.id, 'Processed')}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px]"
                      >
                        Process M-Pesa B2C
                      </button>
                    )}
                    <button
                      onClick={() => handleGenerateReceipt(w)}
                      className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-[10px] font-semibold"
                    >
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Master Ledger Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
        <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Platform Transaction Master Ledger</span>
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Reference & User</th>
                <th className="p-3">Transaction Type</th>
                <th className="p-3">Amount KES</th>
                <th className="p-3">Fee / Margin</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                    {tx.id}
                    <span className="block text-[10px] font-sans font-normal text-slate-400">{tx.description}</span>
                  </td>
                  <td className="p-3 uppercase text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                    {tx.type}
                  </td>
                  <td className="p-3 font-extrabold text-slate-900 dark:text-white">
                    {tx.amountKES.toLocaleString()} KES
                  </td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">
                    {(tx.amountKES * 0.1).toLocaleString()} KES (10%)
                  </td>
                  <td className="p-3 text-slate-400">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdminExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title="Financial Transactions"
        data={transactions}
        filename="clipkenya_financial_ledger"
      />
    </div>
  );
};
