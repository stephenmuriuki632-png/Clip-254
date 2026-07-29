import React, { useState } from 'react';
import { FinancialTransaction, TransactionType, PaymentProviderId } from '../../types/finance';
import {
  Search,
  Download,
  Filter,
  FileText,
  ArrowDownRight,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Tag,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink
} from 'lucide-react';

interface Props {
  transactions: FinancialTransaction[];
  onViewInvoice?: (invoiceId: string) => void;
}

export const TransactionLedger: React.FC<Props> = ({ transactions, onViewInvoice }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.senderOrRecipient.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || tx.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || tx.status === selectedStatus;
    const matchesProvider = selectedProvider === 'all' || tx.provider === selectedProvider;

    return matchesSearch && matchesType && matchesStatus && matchesProvider;
  });

  const exportToCSV = () => {
    const csvRows = [
      ['Transaction ID', 'Reference', 'Type', 'Status', 'Amount KES', 'Amount USD', 'Provider', 'Description', 'Party', 'Timestamp'].join(','),
      ...filteredTransactions.map((t) =>
        [
          `"${t.id}"`,
          `"${t.reference}"`,
          `"${t.type}"`,
          `"${t.status}"`,
          `"${t.amountKES}"`,
          `"${t.amountUSD}"`,
          `"${t.provider}"`,
          `"${t.description.replace(/"/g, '""')}"`,
          `"${t.senderOrRecipient}"`,
          `"${t.timestamp}"`
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ClipKenya_Financial_Ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 w-max">
            <CheckCircle2 className="w-3 h-3" /> Completed
          </span>
        );
      case 'pending':
      case 'processing':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1 w-max">
            <Clock className="w-3 h-3" /> {status}
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-center gap-1 w-max">
            <XCircle className="w-3 h-3" /> {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
            Audit Ledger & Financial Transactions
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time immutable log of deposits, withdrawals, escrow holds & payouts
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 border border-slate-700 shadow-2xs transition-all"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Ledger CSV</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-3xl border border-slate-200 dark:border-slate-800">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search ref, description or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
        >
          <option value="all">All Transaction Types</option>
          <option value="deposit">Deposits</option>
          <option value="withdrawal">Withdrawals</option>
          <option value="campaign_payout">Campaign Payouts</option>
          <option value="escrow_lock">Escrow Holds</option>
          <option value="escrow_release">Escrow Releases</option>
          <option value="referral_bonus">Referral Bonuses</option>
          <option value="subscription_fee">Subscription Fees</option>
        </select>

        {/* Provider Filter */}
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className="p-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
        >
          <option value="all">All Payment Providers</option>
          <option value="mpesa">M-Pesa Express</option>
          <option value="stripe">Stripe Card</option>
          <option value="paypal">PayPal</option>
          <option value="flutterwave">Flutterwave</option>
          <option value="paystack">Paystack</option>
          <option value="wise">Wise / Bank Wire</option>
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="p-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="disputed">Disputed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-4">Reference</th>
              <th className="p-4">Type</th>
              <th className="p-4">Description</th>
              <th className="p-4">Amount (KES)</th>
              <th className="p-4">Amount (USD)</th>
              <th className="p-4">Provider</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
            {filteredTransactions.map((tx) => {
              const isDebit = tx.type === 'withdrawal' || tx.type === 'escrow_lock' || tx.type === 'subscription_fee';

              return (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {tx.reference}
                  </td>
                  <td className="p-4 uppercase font-bold text-[10px] tracking-wide text-slate-600 dark:text-slate-300">
                    {tx.type.replace('_', ' ')}
                  </td>
                  <td className="p-4 max-w-xs truncate">
                    <span className="block text-slate-900 dark:text-white font-bold">{tx.description}</span>
                    <span className="block text-[10px] text-slate-400">{tx.senderOrRecipient}</span>
                  </td>
                  <td
                    className={`p-4 font-extrabold ${
                      isDebit ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {isDebit ? '-' : '+'}{tx.amountKES.toLocaleString()} KES
                  </td>
                  <td className="p-4 font-bold text-slate-500">
                    ${tx.amountUSD.toLocaleString()}
                  </td>
                  <td className="p-4 uppercase font-bold text-[10px] text-slate-400">
                    {tx.provider}
                  </td>
                  <td className="p-4 text-slate-400 text-[11px] whitespace-nowrap">
                    {tx.timestamp}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(tx.status)}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => onViewInvoice && onViewInvoice(tx.invoiceId || 'inv_2025_001')}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                      title="View Official Receipt"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center text-slate-400 text-xs">
            No matching transactions found in the financial ledger.
          </div>
        )}
      </div>
    </div>
  );
};
