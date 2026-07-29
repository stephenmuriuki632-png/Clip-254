import React, { useState } from 'react';
import { UserWallet, Currency } from '../../types/finance';
import {
  Wallet,
  ArrowDownRight,
  ArrowUpRight,
  Lock,
  RefreshCw,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ChevronRight,
  Globe,
  Receipt
} from 'lucide-react';

interface Props {
  wallet: UserWallet;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenExchange?: () => void;
  onOpenInvoices?: () => void;
}

export const WalletOverviewCard: React.FC<Props> = ({
  wallet,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenExchange,
  onOpenInvoices
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(wallet.primaryCurrency || 'KES');

  const currentBalanceObj = wallet.balances[selectedCurrency] || wallet.balances.KES;

  const currencySymbols: Record<Currency, string> = {
    KES: 'KES',
    USD: '$',
    EUR: '€',
    GBP: '£'
  };

  const symbol = currencySymbols[selectedCurrency];

  const formatAmount = (val: number) => {
    if (selectedCurrency === 'KES') {
      return val.toLocaleString('en-KE', { maximumFractionDigits: 0 });
    }
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-extrabold text-base text-white">
                    Multi-Currency User Wallet
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {wallet.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Escrow Protected • M-Pesa • Stripe • PayPal • Wise
                </p>
              </div>
            </div>

            {/* Currency Selector Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-800/90 border border-slate-700/80">
              {(['KES', 'USD', 'EUR', 'GBP'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCurrency === curr
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Main Balance Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Available Balance ({selectedCurrency})
              </span>

              <div className="flex items-baseline gap-3">
                <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                  {symbol} {formatAmount(currentBalanceObj.available)}
                </h2>
                {selectedCurrency !== 'KES' && (
                  <span className="text-xs font-semibold text-slate-400">
                    ≈ {wallet.balances.KES.available.toLocaleString()} KES
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Instant B2C Payout Ready
                </span>
                <span>•</span>
                <span className="text-slate-300 font-medium">
                  Status: <strong className="text-emerald-400 uppercase">{wallet.status}</strong>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-5 flex flex-wrap items-center justify-start lg:justify-end gap-3">
              <button
                onClick={onOpenDeposit}
                className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
              >
                <ArrowDownRight className="w-4 h-4" />
                <span>Deposit Funds</span>
              </button>

              <button
                onClick={onOpenWithdraw}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all active:scale-95"
              >
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                <span>Withdraw</span>
              </button>

              {onOpenInvoices && (
                <button
                  onClick={onOpenInvoices}
                  className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center transition-all"
                  title="Invoices & Receipts"
                >
                  <Receipt className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sub-Balances Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Available
                </span>
                <span className="text-sm font-extrabold text-white">
                  {symbol} {formatAmount(currentBalanceObj.available)}
                </span>
              </div>
              <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Pending Escrow
                </span>
                <span className="text-sm font-extrabold text-amber-400">
                  {symbol} {formatAmount(currentBalanceObj.pendingEscrow)}
                </span>
              </div>
              <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Reserved / Security
                </span>
                <span className="text-sm font-extrabold text-indigo-400">
                  {symbol} {formatAmount(currentBalanceObj.reserved)}
                </span>
              </div>
              <div className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial KPI Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Lifetime Earnings
          </span>
          <div className="flex items-baseline justify-between">
            <h4 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
              {wallet.lifetimeEarningsKES.toLocaleString()} <span className="text-xs text-slate-400 font-semibold">KES</span>
            </h4>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +14.2%
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Monthly Revenue
          </span>
          <div className="flex items-baseline justify-between">
            <h4 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
              {wallet.monthlyEarningsKES.toLocaleString()} <span className="text-xs text-slate-400 font-semibold">KES</span>
            </h4>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
              This Month
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Total Withdrawn
          </span>
          <div className="flex items-baseline justify-between">
            <h4 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
              {wallet.totalWithdrawnKES.toLocaleString()} <span className="text-xs text-slate-400 font-semibold">KES</span>
            </h4>
            <span className="text-[10px] font-bold text-slate-500">
              To M-Pesa/Bank
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Pending Payouts
          </span>
          <div className="flex items-baseline justify-between">
            <h4 className="font-heading font-extrabold text-lg text-amber-600 dark:text-amber-400">
              {wallet.pendingPayoutsKES.toLocaleString()} <span className="text-xs text-slate-400 font-semibold">KES</span>
            </h4>
            <span className="text-[10px] font-bold text-amber-500">
              Escrow Processing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
