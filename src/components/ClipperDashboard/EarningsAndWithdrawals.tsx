import React, { useState } from 'react';
import {
  DollarSign,
  Wallet,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  CreditCard,
  Globe,
  PieChart,
  FileSpreadsheet,
  PlusCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Transaction } from '../../types';
import { WithdrawalRequest } from './types';

export const EarningsAndWithdrawals: React.FC = () => {
  const { balanceKES, balanceUSD, transactions, withdrawMpesa, currentUser } = useApp();

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState<'mpesa' | 'paypal' | 'stripe' | 'flutterwave' | 'wise'>('mpesa');
  const [withdrawAmountKES, setWithdrawAmountKES] = useState<number>(5000);
  const [mpesaPhoneNumber, setMpesaPhoneNumber] = useState<string>('254712345678');
  const [paypalEmail, setPaypalEmail] = useState<string>(currentUser.email);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Filter transactions
  const [txSearch, setTxSearch] = useState('');
  const [txFilter, setTxFilter] = useState<'all' | 'payout' | 'withdrawal' | 'bonus'>('all');

  // Simulated withdrawal requests history
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([
    {
      id: 'wth_001',
      amountKES: 15000,
      method: 'mpesa',
      accountDetails: '+254 712 345 678',
      status: 'completed',
      requestedAt: '2026-07-24 14:20',
      processedAt: '2026-07-24 14:21'
    },
    {
      id: 'wth_002',
      amountKES: 8000,
      method: 'paypal',
      accountDetails: 'maina@clipkenya.africa',
      status: 'pending',
      requestedAt: '2026-07-27 18:05'
    }
  ]);

  // Earnings calculations
  const lifetimeGrossKES = 145000;
  const platformFeeKES = Math.round(lifetimeGrossKES * 0.05); // 5% fee
  const netEarningsKES = lifetimeGrossKES - platformFeeKES;
  const pendingEarningsKES = 18500;
  const bonusEarningsKES = 12000;
  const referralEarningsKES = 4500;

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmountKES <= 0 || withdrawAmountKES > balanceKES) {
      alert('Invalid withdrawal amount. Must be greater than 0 and less than your available balance.');
      return;
    }

    setIsProcessing(true);

    if (withdrawMethod === 'mpesa') {
      const success = await withdrawMpesa(mpesaPhoneNumber, withdrawAmountKES);
      setIsProcessing(false);
      if (success) {
        setWithdrawals(prev => [
          {
            id: 'wth_' + Date.now(),
            amountKES: withdrawAmountKES,
            method: 'mpesa',
            accountDetails: mpesaPhoneNumber,
            status: 'completed',
            requestedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            processedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
          },
          ...prev
        ]);
        setIsWithdrawModalOpen(false);
      }
    } else {
      setTimeout(() => {
        setIsProcessing(false);
        const newWth: WithdrawalRequest = {
          id: 'wth_' + Date.now(),
          amountKES: withdrawAmountKES,
          method: withdrawMethod,
          accountDetails: withdrawMethod === 'paypal' ? paypalEmail : 'Account #' + Math.floor(Math.random() * 1000000),
          status: 'pending',
          requestedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
        setWithdrawals(prev => [newWth, ...prev]);
        alert(`Withdrawal request of KES ${withdrawAmountKES.toLocaleString()} via ${withdrawMethod.toUpperCase()} submitted for processing!`);
        setIsWithdrawModalOpen(false);
      }, 1000);
    }
  };

  const handleCancelWithdrawal = (id: string) => {
    setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: 'cancelled' } : w));
    alert('Withdrawal request cancelled successfully.');
  };

  const handleExportCSV = () => {
    alert('Transaction history statement exported as CSV!');
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(txSearch.toLowerCase()) ||
                          tx.reference.toLowerCase().includes(txSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (txFilter === 'payout') return tx.type === 'payout' || tx.type === 'escrow_release';
    if (txFilter === 'withdrawal') return tx.type === 'withdrawal';
    if (txFilter === 'bonus') return tx.type === 'referral_bonus';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Available Wallet Balance */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10">
            <Wallet className="w-40 h-40" />
          </div>

          <div>
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              Available Wallet Balance
            </span>
            <h3 className="text-3xl font-black tracking-tight mt-1">
              KES {balanceKES.toLocaleString()}
            </h3>
            <p className="text-xs text-indigo-200/80 font-medium mt-1">
              ≈ USD ${balanceUSD.toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="mt-6 w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
          >
            <ArrowUpRight className="w-4 h-4" /> Withdraw Funds Now
          </button>
        </div>

        {/* Pending Escrow */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> Pending Escrow Payouts
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
              KES {pendingEarningsKES.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              In review by brands (3 clips)
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            Auto-released upon approval
          </div>
        </div>

        {/* Lifetime Earnings */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Lifetime Gross Earnings
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
              KES {lifetimeGrossKES.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Net: KES {netEarningsKES.toLocaleString()} (After 5% fee)
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
            Includes Bonuses & Referrals
          </div>
        </div>

        {/* Bonuses & Referrals */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-purple-500" /> Bonuses & Referrals
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
              KES {(bonusEarningsKES + referralEarningsKES).toLocaleString()}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Bonus: {bonusEarningsKES} • Referral: {referralEarningsKES}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-purple-600 dark:text-purple-400">
            +KES 500 per clipper invite
          </div>
        </div>

      </div>

      {/* Withdrawal History Section */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-500" /> Recent Withdrawal Requests
          </h3>
          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-extrabold text-xs hover:bg-indigo-700"
          >
            + New Request
          </button>
        </div>

        <div className="space-y-3">
          {withdrawals.map(wth => (
            <div
              key={wth.id}
              className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  {wth.method === 'mpesa' ? '📲' : '💳'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    KES {wth.amountKES.toLocaleString()} via {wth.method.toUpperCase()}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    To: {wth.accountDetails} • Requested: {wth.requestedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-between sm:justify-end">
                <span
                  className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                    wth.status === 'completed'
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : wth.status === 'pending'
                      ? 'bg-amber-500/10 text-amber-500'
                      : 'bg-rose-500/10 text-rose-500'
                  }`}
                >
                  {wth.status.toUpperCase()}
                </span>

                {wth.status === 'pending' && (
                  <button
                    onClick={() => handleCancelWithdrawal(wth.id)}
                    className="text-xs font-bold text-rose-500 hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Logs Table */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-indigo-500" /> Wallet Transactions & Statements
          </h3>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Export CSV/PDF
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[11px] font-extrabold uppercase text-slate-400">
                <th className="p-3 pl-4">Transaction ID</th>
                <th className="p-3">Type & Description</th>
                <th className="p-3">Provider</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3 pr-4 text-right">Amount KES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {filteredTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 pl-4 font-mono text-[11px] text-slate-400">{tx.reference}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{tx.description}</td>
                  <td className="p-3 uppercase text-[11px] font-bold text-slate-500">{tx.provider}</td>
                  <td className="p-3 text-slate-400">{tx.timestamp}</td>
                  <td className={`p-3 pr-4 text-right font-black ${
                    tx.type === 'withdrawal' ? 'text-rose-500' : 'text-emerald-500'
                  }`}>
                    {tx.type === 'withdrawal' ? '-' : '+'} KES {tx.amountKES.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-indigo-500" /> Request Withdrawal
              </h3>
              <button onClick={() => setIsWithdrawModalOpen(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'mpesa', name: 'M-Pesa (Kenya)', icon: '📱' },
                    { id: 'paypal', name: 'PayPal', icon: '🌐' },
                    { id: 'stripe', name: 'Stripe', icon: '💳' },
                    { id: 'flutterwave', name: 'Flutterwave', icon: '🌍' },
                    { id: 'wise', name: 'Wise', icon: '💸' }
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setWithdrawMethod(m.id as any)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all ${
                        withdrawMethod === m.id
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{m.icon}</span> {m.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Amount KES (Available: KES {balanceKES.toLocaleString()})
                </label>
                <input
                  type="number"
                  required
                  max={balanceKES}
                  value={withdrawAmountKES}
                  onChange={(e) => setWithdrawAmountKES(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {withdrawMethod === 'mpesa' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    M-Pesa Phone Number (Saf)
                  </label>
                  <input
                    type="text"
                    required
                    value={mpesaPhoneNumber}
                    onChange={(e) => setMpesaPhoneNumber(e.target.value)}
                    placeholder="254712345678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    Account Email / Identifier
                  </label>
                  <input
                    type="text"
                    required
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Processing Withdrawal...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Confirm Withdrawal Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
