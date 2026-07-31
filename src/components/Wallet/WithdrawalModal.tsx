import React, { useState } from 'react';
import { Currency, PaymentProviderId, PaymentMethod } from '../../types/finance';
import { paymentRegistry } from '../../services/paymentAdapters';
import {
  X,
  ArrowUpRight,
  Smartphone,
  Building2,
  Globe,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  availableBalanceKES: number;
  savedMethods: PaymentMethod[];
  onSuccess: (provider: PaymentProviderId, amountKES: number, reference: string) => void;
}

export const WithdrawalModal: React.FC<Props> = ({
  isOpen,
  onClose,
  availableBalanceKES,
  savedMethods,
  onSuccess
}) => {
  const [selectedProvider, setSelectedProvider] = useState<PaymentProviderId>('mpesa');
  const [amountInput, setAmountInput] = useState('10000');
  const [phoneInput, setPhoneInput] = useState('254712345678');
  const [bankDetails, setBankDetails] = useState({ bankName: 'Equity Bank Kenya', accountNum: '011029384756', accountName: 'Alex K.' });
  const [paypalEmail, setPaypalEmail] = useState('user@clipforge.co.ke');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const adapter = paymentRegistry.getAdapter(selectedProvider);
  const numAmount = Number(amountInput) || 0;
  const feeKES = adapter ? adapter.calculateFee(numAmount, 'KES') : 150;
  const netPayoutKES = Math.max(0, numAmount - feeKES);

  const handleWithdrawalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (numAmount > availableBalanceKES) {
      setStatusMessage({ type: 'error', text: 'Insufficient available balance in your wallet.' });
      return;
    }

    if (numAmount < 500) {
      setStatusMessage({ type: 'error', text: 'Minimum withdrawal amount is 500 KES.' });
      return;
    }

    if (!adapter) return;

    setLoading(true);
    setStatusMessage(null);

    let identifier = phoneInput;
    if (selectedProvider === 'bank_wire') {
      identifier = `${bankDetails.bankName} - Acc: ${bankDetails.accountNum}`;
    } else if (selectedProvider === 'paypal') {
      identifier = paypalEmail;
    }

    try {
      const res = await adapter.processWithdrawal({
        amount: numAmount,
        currency: 'KES',
        accountIdentifier: identifier,
        reference: 'WTH_' + Date.now(),
        description: `Withdrawal to ${identifier}`
      });

      setLoading(false);

      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: `Withdrawal of ${numAmount.toLocaleString()} KES sent to ${identifier}. Ref: ${res.providerReference}`
        });

        setTimeout(() => {
          onSuccess(selectedProvider, numAmount, res.providerReference);
          onClose();
        }, 2200);
      } else {
        setStatusMessage({ type: 'error', text: 'Withdrawal failed. Please check payment credentials.' });
      }
    } catch (err: any) {
      setLoading(false);
      setStatusMessage({ type: 'error', text: err?.message || 'Transaction processing error.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                Withdraw Earnings
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instant M-Pesa B2C or Direct Local Bank Payouts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p>{statusMessage.text}</p>
          </div>
        )}

        {/* Balance Display */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between border border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
              Available to Withdraw
            </span>
            <span className="font-heading font-extrabold text-2xl text-emerald-400">
              {availableBalanceKES.toLocaleString()} KES
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase">
            KYC Verified
          </span>
        </div>

        <form onSubmit={handleWithdrawalSubmit} className="space-y-5">
          {/* Payout Method Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Select Payout Channel
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'mpesa', name: 'M-Pesa B2C Payout', icon: Smartphone, tag: 'Instant (0-1 min)' },
                { id: 'bank_wire', name: 'Local Bank RTGS/EFT', icon: Building2, tag: 'Equity/KCB/Co-op' },
                { id: 'paypal', name: 'PayPal Mass Payout', icon: Globe, tag: 'Global USD' },
                { id: 'wise', name: 'Wise SWIFT Wire', icon: ShieldCheck, tag: 'International Bank' }
              ].map((p) => {
                const IconComp = p.icon;
                const isSelected = selectedProvider === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProvider(p.id as PaymentProviderId)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-600 dark:border-emerald-500 shadow-2xs'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <IconComp className={`w-4 h-4 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`} />
                      {isSelected && <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />}
                    </div>
                    <span className="block font-bold text-xs text-slate-900 dark:text-white truncate">
                      {p.name}
                    </span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                      {p.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Amount to Withdraw (KES)
              </label>
              <button
                type="button"
                onClick={() => setAmountInput(String(availableBalanceKES))}
                className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Withdraw Max
              </button>
            </div>
            <input
              type="number"
              required
              min={500}
              max={availableBalanceKES}
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              className="w-full p-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Destination Details Input */}
          {selectedProvider === 'mpesa' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Recipient M-Pesa Phone Number
              </label>
              <input
                type="text"
                required
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="2547XXXXXXXX"
                className="w-full p-2.5 text-xs font-mono font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          {selectedProvider === 'bank_wire' && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Bank Name
                </label>
                <select
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  className="w-full p-2 text-xs font-bold rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                >
                  <option value="Equity Bank Kenya">Equity Bank Kenya</option>
                  <option value="KCB Bank Kenya">KCB Bank Kenya</option>
                  <option value="Co-operative Bank">Co-operative Bank</option>
                  <option value="NCBA Bank Kenya">NCBA Bank Kenya</option>
                  <option value="Absa Bank Kenya">Absa Bank Kenya</option>
                  <option value="Standard Chartered">Standard Chartered Kenya</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={bankDetails.accountNum}
                    onChange={(e) => setBankDetails({ ...bankDetails, accountNum: e.target.value })}
                    className="w-full p-2 text-xs font-mono rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={bankDetails.accountName}
                    onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                    className="w-full p-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedProvider === 'paypal' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                PayPal Account Email
              </label>
              <input
                type="email"
                required
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                className="w-full p-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          {/* Payout Breakdown */}
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Withdrawal Requested:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {numAmount.toLocaleString()} KES
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Processing Fee:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                -{feeKES.toLocaleString()} KES
              </span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-slate-200 dark:border-slate-700 font-extrabold text-emerald-600 dark:text-emerald-400">
              <span>Net Disbursed Amount:</span>
              <span>{netPayoutKES.toLocaleString()} KES</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || numAmount <= 0 || numAmount > availableBalanceKES}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing Payout...</span>
              </>
            ) : (
              <>
                <ArrowUpRight className="w-4 h-4" />
                <span>
                  Confirm Payout of {netPayoutKES.toLocaleString()} KES
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
