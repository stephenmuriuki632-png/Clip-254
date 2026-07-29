import React, { useState } from 'react';
import { Currency, PaymentProviderId } from '../../types/finance';
import { paymentRegistry } from '../../services/paymentAdapters';
import {
  X,
  ArrowDownRight,
  Smartphone,
  CreditCard,
  Globe,
  Zap,
  ShieldCheck,
  Building2,
  CheckCircle2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (provider: PaymentProviderId, amountKES: number, reference: string) => void;
}

export const DepositModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [selectedProvider, setSelectedProvider] = useState<PaymentProviderId>('mpesa');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('KES');
  const [amountInput, setAmountInput] = useState('5000');
  const [phoneInput, setPhoneInput] = useState('254712345678');
  const [cardDetails, setCardDetails] = useState({ number: '4242••••••••4242', exp: '12/26', cvc: '123' });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const adapter = paymentRegistry.getAdapter(selectedProvider);
  const numAmount = Number(amountInput) || 0;
  const estimatedFee = adapter ? adapter.calculateFee(numAmount, selectedCurrency) : 0;
  const totalCharge = numAmount + estimatedFee;

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adapter || numAmount <= 0) return;

    setLoading(true);
    setStatusMessage(null);

    let identifier = phoneInput;
    if (selectedProvider === 'stripe' || selectedProvider === 'paystack') {
      identifier = cardDetails.number;
    } else if (selectedProvider === 'paypal') {
      identifier = 'user@clipkenya.co.ke';
    } else if (selectedProvider === 'wise') {
      identifier = 'Equity Bank Wire ACH #0112938475';
    }

    try {
      const res = await adapter.processDeposit({
        amount: numAmount,
        currency: selectedCurrency,
        accountIdentifier: identifier,
        reference: 'DEP_' + Date.now(),
        description: `Deposit via ${adapter.providerName}`
      });

      setLoading(false);

      if (res.success) {
        // Convert to KES if deposited in other currency
        const conversionRate = selectedCurrency === 'USD' ? 130 : selectedCurrency === 'EUR' ? 140 : selectedCurrency === 'GBP' ? 160 : 1;
        const amountKES = Math.round(numAmount * conversionRate);

        setStatusMessage({
          type: 'success',
          text: `${res.message}. Funds credited to wallet!`
        });

        setTimeout(() => {
          onSuccess(selectedProvider, amountKES, res.providerReference);
          onClose();
        }, 2000);
      } else {
        setStatusMessage({ type: 'error', text: 'Deposit failed. Please try again or switch method.' });
      }
    } catch (err: any) {
      setLoading(false);
      setStatusMessage({ type: 'error', text: err?.message || 'Transaction error encountered.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                Deposit Funds to Wallet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instant top-up via M-Pesa, Cards, PayPal & Wise
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

        <form onSubmit={handleDepositSubmit} className="space-y-5">
          {/* Payment Method Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Select Payment Provider
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'mpesa', name: 'M-Pesa Express', icon: Smartphone, tag: 'Instant Kenya' },
                { id: 'stripe', name: 'Credit / Debit Card', icon: CreditCard, tag: 'Global Visa/MC' },
                { id: 'paypal', name: 'PayPal Express', icon: Globe, tag: 'Global USD' },
                { id: 'flutterwave', name: 'Flutterwave', icon: Zap, tag: 'Pan-Africa' },
                { id: 'paystack', name: 'Paystack', icon: ShieldCheck, tag: 'West/East Africa' },
                { id: 'wise', name: 'Wise / Wire', icon: Building2, tag: 'SWIFT Bank' }
              ].map((p) => {
                const IconComp = p.icon;
                const isSelected = selectedProvider === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedProvider(p.id as PaymentProviderId);
                      if (p.id === 'mpesa' || p.id === 'paystack' || p.id === 'flutterwave') {
                        setSelectedCurrency('KES');
                      } else if (p.id === 'paypal' || p.id === 'wise') {
                        setSelectedCurrency('USD');
                      }
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-600 dark:border-indigo-500 shadow-2xs'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <IconComp className={`w-4 h-4 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`} />
                      {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
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

          {/* Currency & Amount */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Currency
              </label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
                className="w-full p-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="KES">KES (KSh)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Deposit Amount ({selectedCurrency})
              </label>
              <input
                type="number"
                required
                min={10}
                placeholder="e.g. 5000"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="w-full p-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Provider Specific Input */}
          {selectedProvider === 'mpesa' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                M-Pesa Registered Phone Number
              </label>
              <input
                type="text"
                required
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="2547XXXXXXXX"
                className="w-full p-2.5 text-xs font-mono font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                An STK push popup will appear instantly on your phone to enter M-Pesa PIN.
              </span>
            </div>
          )}

          {(selectedProvider === 'stripe' || selectedProvider === 'paystack') && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  className="w-full p-2 text-xs font-mono rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Expires (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={cardDetails.exp}
                    onChange={(e) => setCardDetails({ ...cardDetails, exp: e.target.value })}
                    className="w-full p-2 text-xs font-mono rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    CVC / CVV
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                    className="w-full p-2 text-xs font-mono rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Fee & Summary */}
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Deposit Amount:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {numAmount.toLocaleString()} {selectedCurrency}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Estimated Provider Fee:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {estimatedFee.toLocaleString()} {selectedCurrency}
              </span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-slate-200 dark:border-slate-700 font-extrabold text-indigo-600 dark:text-indigo-400">
              <span>Total Payable:</span>
              <span>
                {totalCharge.toLocaleString()} {selectedCurrency}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || numAmount <= 0}
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing Secure Deposit...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>
                  Confirm Deposit of {totalCharge.toLocaleString()} {selectedCurrency}
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
