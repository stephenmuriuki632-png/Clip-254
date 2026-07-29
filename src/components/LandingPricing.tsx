import React, { useState } from 'react';
import { Check, Zap, Shield, Sparkles, Building, ArrowRight } from 'lucide-react';
import { Card } from './UI/Card';
import { Button } from './UI/Button';
import { Badge } from './UI/Badge';

export const LandingPricing: React.FC = () => {
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const discountMultiplier = billingCycle === 'yearly' ? 0.8 : 1;

  const plans = [
    {
      id: 'starter',
      name: 'Starter / Creator',
      tagline: 'Ideal for aspiring video editors, clippers & micro-creators.',
      icon: <Zap className="w-5 h-5 text-emerald-500" />,
      price: {
        KES: billingCycle === 'yearly' ? 'Free' : 'Free',
        USD: '$0'
      },
      period: 'Forever Free',
      badge: null,
      highlight: false,
      features: [
        'Apply to unlimited Video Clipping Bounties',
        'Instant M-Pesa & Bank Withdrawals',
        'Basic AI Script & Hook Generator (10/day)',
        'Access to Creator Academy Basics',
        'Public Portfolio Page',
        '5% Marketplace Escrow Fee'
      ]
    },
    {
      id: 'pro',
      name: 'Professional Pro',
      tagline: 'For active YouTubers, top video editors & growing brands.',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      price: {
        KES: billingCycle === 'yearly' ? 'KES 2,000' : 'KES 2,500',
        USD: billingCycle === 'yearly' ? '$16' : '$20'
      },
      period: '/ month',
      badge: 'Most Popular',
      highlight: true,
      features: [
        'Everything in Starter Plan',
        'Post up to 5 Active Creator Bounties / month',
        'Unlimited Gemini AI Viral Suite Generations',
        'Priority Listing on Creator & Freelancer Marketplace',
        '4K Raw Video Source Hosting & Direct Downloads',
        'Reduced Escrow Fee (2.5%)',
        'Verified Blue Checkmark Badge',
        'Direct Messaging & Real-Time Chat'
      ]
    },
    {
      id: 'enterprise',
      name: 'Agency / Enterprise',
      tagline: 'For major brands, talent agencies & media houses.',
      icon: <Building className="w-5 h-5 text-indigo-500" />,
      price: {
        KES: billingCycle === 'yearly' ? 'KES 12,000' : 'KES 15,000',
        USD: billingCycle === 'yearly' ? '$95' : '$120'
      },
      period: '/ month',
      badge: 'Full Scale',
      highlight: false,
      features: [
        'Unlimited Active Bounties & UGC Brand Briefs',
        'Dedicated Account Manager & Creator Scouting',
        'Custom Usage Licensing & Copyright Protection',
        'Multi-User Team Management & Roles',
        'Advanced Analytics & View Verification API',
        '0% Escrow Fee on Volume (> KES 500k/mo)',
        'Custom Invoice & Corporate Bank Billing',
        '24/7 SLA Priority Support'
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="emerald" size="lg" dot pulse>
            Flexible Transparent Pricing
          </Badge>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Simple Plans for Every Stage of Your Creator Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Start free with zero upfront commitments. Upgrade whenever you need advanced AI suite tools and higher escrow volume.
          </p>

          {/* Currency & Billing Toggles */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            {/* KES / USD Toggle */}
            <div className="p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center shadow-2xs">
              <button
                onClick={() => setCurrency('KES')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currency === 'KES' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                KES (Shillings)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currency === 'USD' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                USD ($)
              </button>
            </div>

            {/* Monthly / Yearly Toggle */}
            <div className="p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-1 shadow-2xs">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  billingCycle === 'monthly' ? 'bg-slate-900 dark:bg-slate-800 text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  billingCycle === 'yearly' ? 'bg-slate-900 dark:bg-slate-800 text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>Yearly</span>
                <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-extrabold">20% OFF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              variant={plan.highlight ? 'default' : 'default'}
              padding="lg"
              className={`relative space-y-6 flex flex-col justify-between ${
                plan.highlight
                  ? 'border-2 border-emerald-500 dark:border-emerald-500 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/20'
                  : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 right-6">
                  <Badge variant="emerald" size="sm" pulse>
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">{plan.name}</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[32px]">{plan.tagline}</p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
                      {plan.price[currency]}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-4">
                  <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">What’s included:</p>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  variant={plan.highlight ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {plan.id === 'starter' ? 'Get Started Free' : `Upgrade to ${plan.name.split(' ')[0]}`}
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
