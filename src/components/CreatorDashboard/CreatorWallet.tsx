import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Download, 
  Search, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Phone,
  DollarSign,
  Sparkles,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NoPaymentsEmptyState } from './EmptyStates';

export const CreatorWallet: React.FC = () => {
  const { balanceKES, balanceUSD, transactions, depositMpesa, withdrawMpesa } = useApp();

  const [depositAmount, setDepositAmount] = useState<number>(5000);
  const [phoneNumber, setPhoneNumber] = useState<string>('254712345678');
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTx, setSearchTx] = useState('');
  const [txTypeFilter, setTxTypeFilter] = useState('all');

  const pendingEscrowKES = 12500;
  const totalDepositsKES = transactions
    .filter(t => t.type === 'deposit' && t.status === 'completed')
    .reduce((acc, t) => acc + t.amountKES, 0) || 75000;

  const totalSpendingKES = transactions
    .filter(t => (t.type === 'escrow_release' || t.type === 'payout') && t.status === 'completed')
    .reduce((acc, t) => acc + t.amountKES, 0) || 30100;

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.reference.toLowerCase().includes(searchTx.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchTx.toLowerCase()) ||
                          (t.recipientOrSource && t.recipientOrSource.toLowerCase().includes(searchTx.toLowerCase()));
    const matchesType = txTypeFilter === 'all' || t.type === txTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleMpesaTopup = async () => {
    if (depositAmount < 100) {
      alert('Minimum M-Pesa deposit is 100 KES.');
      return;
    }
    setIsProcessing(true);
    const success = await depositMpesa(phoneNumber, depositAmount);
    setIsProcessing(false);
    if (success) {
      setIsDepositModalOpen(false);
    } else {
      alert('M-Pesa STK Push simulation completed.');
      setIsDepositModalOpen(false);
    }
  };

  const handleMpesaWithdraw = async () => {
    if (depositAmount > balanceKES) {
      alert('Insufficient funds in wallet.');
      return;
    }
    setIsProcessing(true);
    const success = await withdrawMpesa(phoneNumber, depositAmount);
    setIsProcessing(false);
    setIsWithdrawModalOpen(false);
  };

  const handleExportStatement = () => {
    const csvHeader = "ID,Type,Amount (KES),Provider,Reference,Timestamp,Description\n";
    const csvRows = transactions.map(t => 
      `"${t.id}","${t.type}","${t.amountKES}","${t.provider}","${t.reference}","${t.timestamp}","${t.description}"`
    ).join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ClipForge_Statement_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      
      {/* Wallet Balance Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Main Balance Card */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
                <Wallet className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">ClipForge Wallet</span>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              M-Pesa Instant Settlement
            </span>
          </div>

          <div className="relative z-10 my-6">
            <p className="text-xs text-slate-400">Available Spending Balance</p>
            <div className="flex items-baseline gap-3 mt-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                {balanceKES.toLocaleString()} <span className="text-lg text-indigo-400">KES</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">≈ ${balanceUSD} USD</span>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg transition-colors flex items-center gap-2"
            >
              <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
              <span>Top Up via M-Pesa</span>
            </button>

            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors flex items-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
              <span>Withdraw to Phone</span>
            </button>

            <button
              onClick={handleExportStatement}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700/80 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV Statement</span>
            </button>
          </div>
        </div>

        {/* Secondary Wallet Metrics */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Pending Escrow</span>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-2">
              {pendingEscrowKES.toLocaleString()} KES
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Locked for active bounties</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Total Deposited</span>
            <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-2">
              {totalDepositsKES.toLocaleString()} KES
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Lifetime wallet funding</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Total Paid Out</span>
            <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono mt-2">
              {totalSpendingKES.toLocaleString()} KES
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Released to creators</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Payment Gateways</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">M-Pesa B2C</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-[10px] font-bold">Visa/Card</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">254 Safaricom Live</p>
          </div>
        </div>

      </div>

      {/* Transaction History Section */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white font-heading">
            Transaction Ledger & Invoices
          </h3>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search ref or description..."
                value={searchTx}
                onChange={(e) => setSearchTx(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <select
              value={txTypeFilter}
              onChange={(e) => setTxTypeFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposits</option>
              <option value="withdrawal">Withdrawals</option>
              <option value="escrow_lock">Escrow Lock</option>
              <option value="escrow_release">Escrow Release</option>
            </select>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <NoPaymentsEmptyState onDeposit={() => setIsDepositModalOpen(true)} />
        ) : (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Reference / Source</th>
                    <th className="px-4 py-3.5">Type</th>
                    <th className="px-4 py-3.5">Amount (KES)</th>
                    <th className="px-4 py-3.5">Provider</th>
                    <th className="px-4 py-3.5">Timestamp</th>
                    <th className="px-5 py-3.5 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{tx.description}</p>
                          <p className="text-[10px] text-slate-400 font-mono">Ref: {tx.reference}</p>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          tx.type === 'deposit'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                            : tx.type === 'withdrawal'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                            : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                        }`}>
                          {tx.type.replace('_', ' ')}
                        </span>
                      </td>

                      <td className={`px-4 py-4 font-mono font-bold ${
                        tx.type === 'deposit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                      }`}>
                        {tx.type === 'deposit' ? '+' : '-'}{tx.amountKES.toLocaleString()} KES
                      </td>

                      <td className="px-4 py-4 font-semibold text-slate-600 dark:text-slate-300 uppercase">
                        {tx.provider}
                      </td>

                      <td className="px-4 py-4 text-slate-400">
                        {tx.timestamp}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => alert(`Invoice Receipt for Ref: ${tx.reference}\nAmount: ${tx.amountKES} KES\nStatus: ${tx.status}`)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] hover:bg-slate-200 transition-colors inline-flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Deposit Modal */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white font-heading">
                Top Up Wallet via M-Pesa STK Push
              </h3>
              <button onClick={() => setIsDepositModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Amount in KES
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Safaricom M-Pesa Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="254712345678"
                  className="w-full p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <button
              disabled={isProcessing}
              onClick={handleMpesaTopup}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{isProcessing ? 'Sending STK Prompt...' : `Prompt M-Pesa (${depositAmount.toLocaleString()} KES)`}</span>
            </button>
          </div>
        </div>
      )}

      {/* Withdrawal Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white font-heading">
                Withdraw to M-Pesa B2C
              </h3>
              <button onClick={() => setIsWithdrawModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Withdrawal Amount (KES)
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  M-Pesa Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <button
              disabled={isProcessing}
              onClick={handleMpesaWithdraw}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Confirm Withdrawal ({depositAmount.toLocaleString()} KES)</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
