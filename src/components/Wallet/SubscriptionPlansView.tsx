import React, { useState } from 'react';
import { SubscriptionPlan, UserSubscription, Coupon } from '../../types/finance';
import { MOCK_SUBSCRIPTION_PLANS, MOCK_COUPONS } from '../../data/mockFinancialData';
import {
  Check,
  Zap,
  Crown,
  ShieldCheck,
  Building2,
  Sparkles,
  Tag,
  Clock,
  ArrowRight
} from 'lucide-react';

interface Props {
  currentSubscription: UserSubscription;
  onUpgradePlan: (planId: string, billingCycle: 'monthly' | 'yearly', couponCode?: string) => void;
}

export const SubscriptionPlansView: React.FC<Props> = ({
  currentSubscription,
  onUpgradePlan
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);

    const found = MOCK_COUPONS.find(
      (c) => c.code.toUpperCase() === couponInput.trim().toUpperCase() && c.active
    );

    if (found) {
      setAppliedCoupon(found);
      setCouponError(null);
    } else {
      setCouponError('Invalid or expired promo code.');
      setAppliedCoupon(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold uppercase tracking-wider">
          <Crown className="w-3.5 h-3.5" />
          <span>ClipKenya Membership Plans</span>
        </div>

        <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white">
          Accelerate Your Growth & Lower Fees
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Unlock reduced platform fees, priority clip approvals, instant M-Pesa express payouts and AI viral tools.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-extrabold bg-emerald-400 text-slate-900 uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Current Active Plan Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Active Plan</span>
            <h4 className="font-heading font-extrabold text-base text-white">
              {currentSubscription.planName} ({currentSubscription.billingCycle})
            </h4>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-400 block">
            Renews on: <strong>{currentSubscription.renewsAt}</strong>
          </span>
          <span className="text-xs text-emerald-400 font-bold">
            Auto-renew Enabled ({currentSubscription.amountKES.toLocaleString()} KES/mo)
          </span>
        </div>
      </div>

      {/* Coupon Box */}
      <div className="max-w-md mx-auto p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          Have a Promo / Coupon Code?
        </label>
        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <input
            type="text"
            placeholder="Try 'KARIBU2025' or 'NYOTA1000'"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="w-full p-2.5 text-xs font-mono font-bold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs"
          >
            Apply
          </button>
        </form>

        {appliedCoupon && (
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-1">
            <Check className="w-4 h-4" /> Coupon "{appliedCoupon.code}" applied! (
            {appliedCoupon.discountType === 'percentage'
              ? `${appliedCoupon.discountValue}% OFF`
              : `${appliedCoupon.discountValue} KES OFF`}
            )
          </p>
        )}

        {couponError && <p className="text-xs font-bold text-red-500 pt-1">{couponError}</p>}
      </div>

      {/* Pricing Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = currentSubscription.planId === plan.id;
          const basePrice = billingCycle === 'monthly' ? plan.priceMonthlyKES : Math.round(plan.priceYearlyKES / 12);

          let finalPrice = basePrice;
          if (appliedCoupon && basePrice > 0) {
            if (appliedCoupon.discountType === 'percentage') {
              finalPrice = Math.round(basePrice * (1 - appliedCoupon.discountValue / 100));
            } else {
              finalPrice = Math.max(0, basePrice - appliedCoupon.discountValue);
            }
          }

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-slate-900 text-white border-indigo-500 shadow-xl'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-2xs'
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    plan.popular
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h4 className="font-heading font-extrabold text-xl">{plan.name}</h4>
                  <p className="text-xs opacity-75 mt-1">{plan.tagline}</p>
                </div>

                <div className="py-2 border-y border-slate-200/20">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading font-extrabold text-3xl sm:text-4xl">
                      {finalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold opacity-70">KES / month</span>
                  </div>

                  {appliedCoupon && basePrice > 0 && (
                    <span className="text-[10px] line-through text-slate-400 block mt-0.5">
                      Original: {basePrice.toLocaleString()} KES
                    </span>
                  )}
                </div>

                <ul className="space-y-2.5 text-xs">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="opacity-90">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onUpgradePlan(plan.id, billingCycle, appliedCoupon?.code)}
                  disabled={isCurrent}
                  className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    isCurrent
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                      : plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isCurrent ? (
                    <span>Current Active Plan</span>
                  ) : (
                    <>
                      <span>Select {plan.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
