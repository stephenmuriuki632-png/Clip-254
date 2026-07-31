import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserWallet,
  FinancialTransaction,
  EscrowAccount,
  WithdrawalRequest,
  ReferralDashboardData,
  UserSubscription,
  Invoice,
  PaymentProviderId
} from '../../types/finance';
import {
  INITIAL_USER_WALLETS,
  MOCK_PAYMENT_METHODS,
  MOCK_ESCROW_ACCOUNTS,
  MOCK_WITHDRAWAL_REQUESTS,
  MOCK_REFERRAL_DATA,
  MOCK_USER_SUBSCRIPTION,
  MOCK_INVOICES,
  MOCK_FINANCIAL_ANALYTICS
} from '../../data/mockFinancialData';
import { WalletOverviewCard } from './WalletOverviewCard';
import { DepositModal } from './DepositModal';
import { WithdrawalModal } from './WithdrawalModal';
import { EscrowManagerView } from './EscrowManagerView';
import { TransactionLedger } from './TransactionLedger';
import { ReferralDashboard } from './ReferralDashboard';
import { SubscriptionPlansView } from './SubscriptionPlansView';
import { InvoiceReceiptModal } from './InvoiceReceiptModal';
import { AdminFinancialControls } from './AdminFinancialControls';
import { FinancialAnalyticsCharts } from './FinancialAnalyticsCharts';
import {
  Wallet,
  Lock,
  History,
  Gift,
  Crown,
  BarChart2,
  ShieldAlert,
  FileText
} from 'lucide-react';

export const EnterpriseFinancialSystemHub: React.FC = () => {
  const { currentUser, balanceKES, depositMpesa, withdrawMpesa, transactions: appTransactions } = useApp();

  const [wallet, setWallet] = useState<UserWallet>(
    INITIAL_USER_WALLETS.usr_current || {
      id: 'wlt_current',
      userId: currentUser.id,
      walletType: 'general',
      primaryCurrency: 'KES',
      status: 'active',
      kycVerified: true,
      tier: 'Pro Creator',
      lifetimeEarningsKES: 348500,
      monthlyEarningsKES: 84200,
      totalSpentKES: 112000,
      totalWithdrawnKES: 236000,
      pendingPayoutsKES: 18500,
      updatedAt: 'Just now',
      balances: {
        KES: { currency: 'KES', available: balanceKES, pendingEscrow: 18500, reserved: 2500, total: balanceKES + 21000 },
        USD: { currency: 'USD', available: Math.round((balanceKES / 130) * 100) / 100, pendingEscrow: 142.3, reserved: 19.23, total: Math.round(((balanceKES + 21000) / 130) * 100) / 100 },
        EUR: { currency: 'EUR', available: Math.round((balanceKES / 140) * 100) / 100, pendingEscrow: 131.2, reserved: 17.7, total: Math.round(((balanceKES + 21000) / 140) * 100) / 100 },
        GBP: { currency: 'GBP', available: Math.round((balanceKES / 160) * 100) / 100, pendingEscrow: 112.5, reserved: 15.1, total: Math.round(((balanceKES + 21000) / 160) * 100) / 100 }
      }
    }
  );

  const [activeTab, setActiveTab] = useState<
    'overview' | 'escrow' | 'ledger' | 'subscriptions' | 'referrals' | 'analytics' | 'admin'
  >('overview');

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const [escrows, setEscrows] = useState<EscrowAccount[]>(MOCK_ESCROW_ACCOUNTS);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(MOCK_WITHDRAWAL_REQUESTS);
  const [referralData, setReferralData] = useState<ReferralDashboardData>(MOCK_REFERRAL_DATA);
  const [subscription, setSubscription] = useState<UserSubscription>(MOCK_USER_SUBSCRIPTION);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(MOCK_INVOICES[0]);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // Sync AppContext transactions into FinancialTransaction shape
  const financialTransactions: FinancialTransaction[] = appTransactions.map((tx) => ({
    id: tx.id,
    walletId: wallet.id,
    userId: tx.userId || currentUser.id,
    userName: currentUser.name,
    userRole: wallet.walletType,
    type: tx.type as any,
    status: tx.status as any,
    amountKES: tx.amountKES,
    amountUSD: tx.amountUSD,
    currency: 'KES',
    provider: (tx.provider as PaymentProviderId) || 'mpesa',
    reference: tx.reference,
    description: tx.description,
    senderOrRecipient: tx.recipientOrSource || 'ClipForge Escrow Gateway',
    feeAmountKES: 0,
    taxAmountKES: 0,
    invoiceId: 'inv_2025_001',
    timestamp: tx.timestamp
  }));

  const handleDepositSuccess = async (provider: PaymentProviderId, amountKES: number, reference: string) => {
    if (provider === 'mpesa') {
      await depositMpesa('254712345678', amountKES);
    }
    setWallet((prev) => {
      const newAvail = prev.balances.KES.available + amountKES;
      return {
        ...prev,
        balances: {
          ...prev.balances,
          KES: { ...prev.balances.KES, available: newAvail, total: newAvail + prev.balances.KES.pendingEscrow }
        }
      };
    });
  };

  const handleWithdrawSuccess = async (provider: PaymentProviderId, amountKES: number, reference: string) => {
    if (provider === 'mpesa') {
      await withdrawMpesa('254712345678', amountKES);
    }
    setWallet((prev) => {
      const newAvail = Math.max(0, prev.balances.KES.available - amountKES);
      return {
        ...prev,
        balances: {
          ...prev.balances,
          KES: { ...prev.balances.KES, available: newAvail, total: newAvail + prev.balances.KES.pendingEscrow }
        }
      };
    });
  };

  const handleReleaseEscrow = (escrowId: string, milestoneId?: string) => {
    setEscrows((prev) =>
      prev.map((e) => {
        if (e.id === escrowId) {
          if (milestoneId && e.milestones) {
            const updatedMs = e.milestones.map((m) =>
              m.id === milestoneId ? { ...m, status: 'released' as const } : m
            );
            const isAllReleased = updatedMs.every((m) => m.status === 'released');
            return {
              ...e,
              milestones: updatedMs,
              status: isAllReleased ? ('released' as const) : ('partially_released' as const)
            };
          }
          return { ...e, status: 'released' as const, releasedAmountKES: e.totalAmountKES };
        }
        return e;
      })
    );
    alert('Escrow milestone funds released successfully to Creator Wallet!');
  };

  const handleDisputeEscrow = (escrowId: string, reason: string) => {
    setEscrows((prev) =>
      prev.map((e) =>
        e.id === escrowId ? { ...e, status: 'disputed' as const, disputeNotes: reason } : e
      )
    );
    alert('Escrow dispute lodged. ClipForge Financial Compliance team notified.');
  };

  const handleApproveWithdrawal = (id: string) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: 'approved' as const, processedAt: 'Just now' } : w))
    );
    alert('Withdrawal request approved and funds disbursed.');
  };

  const handleRejectWithdrawal = (id: string, reason: string) => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: 'rejected' as const, rejectionReason: reason } : w
      )
    );
    alert(`Withdrawal request rejected. User notified with reason: ${reason}`);
  };

  const handleClaimCommission = (amountKES: number) => {
    if (amountKES <= 0) return;
    setReferralData((prev) => ({
      ...prev,
      pendingCommissionsKES: 0,
      totalCommissionsKES: prev.totalCommissionsKES + amountKES
    }));
    setWallet((prev) => {
      const newAvail = prev.balances.KES.available + amountKES;
      return {
        ...prev,
        balances: {
          ...prev.balances,
          KES: { ...prev.balances.KES, available: newAvail }
        }
      };
    });
    alert(`Claimed ${amountKES.toLocaleString()} KES in referral rewards to your available wallet balance!`);
  };

  const handleUpgradePlan = (planId: string, billingCycle: 'monthly' | 'yearly', couponCode?: string) => {
    setSubscription({
      planId: planId as any,
      planName: planId === 'pro' ? 'Pro Creator / Clipper' : planId === 'growth' ? 'Brand Growth' : 'Agency Enterprise',
      status: 'active',
      billingCycle,
      renewsAt: '2025-06-28',
      amountKES: planId === 'pro' ? 2500 : planId === 'growth' ? 9500 : 28000,
      autoRenew: true,
      paymentMethod: 'M-Pesa Express (+254 712 *** 678)',
      couponCodeApplied: couponCode
    });
    alert(`Successfully upgraded to ClipForge ${planId.toUpperCase()} Plan!`);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider block">
            ClipForge Financial Infrastructure
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Wallet, Payments & Escrow Hub
          </h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          {[
            { id: 'overview', label: 'Wallet & Balances', icon: Wallet },
            { id: 'escrow', label: 'Escrow Engine', icon: Lock },
            { id: 'ledger', label: 'Transaction Ledger', icon: History },
            { id: 'subscriptions', label: 'Plans & Coupons', icon: Crown },
            { id: 'referrals', label: 'Ambassador Rewards', icon: Gift },
            { id: 'analytics', label: 'Financial Analytics', icon: BarChart2 },
            { id: 'admin', label: 'Admin Desk', icon: ShieldAlert }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Views */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <WalletOverviewCard
            wallet={wallet}
            onOpenDeposit={() => setIsDepositOpen(true)}
            onOpenWithdraw={() => setIsWithdrawOpen(true)}
            onOpenInvoices={() => setIsInvoiceOpen(true)}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EscrowManagerView
              escrows={escrows.slice(0, 2)}
              onReleaseEscrow={handleReleaseEscrow}
              onDisputeEscrow={handleDisputeEscrow}
            />

            <TransactionLedger
              transactions={financialTransactions.slice(0, 5)}
              onViewInvoice={() => setIsInvoiceOpen(true)}
            />
          </div>
        </div>
      )}

      {activeTab === 'escrow' && (
        <EscrowManagerView
          escrows={escrows}
          onReleaseEscrow={handleReleaseEscrow}
          onDisputeEscrow={handleDisputeEscrow}
        />
      )}

      {activeTab === 'ledger' && (
        <TransactionLedger
          transactions={financialTransactions}
          onViewInvoice={() => setIsInvoiceOpen(true)}
        />
      )}

      {activeTab === 'subscriptions' && (
        <SubscriptionPlansView
          currentSubscription={subscription}
          onUpgradePlan={handleUpgradePlan}
        />
      )}

      {activeTab === 'referrals' && (
        <ReferralDashboard
          referralData={referralData}
          onClaimCommission={handleClaimCommission}
        />
      )}

      {activeTab === 'analytics' && (
        <FinancialAnalyticsCharts analytics={MOCK_FINANCIAL_ANALYTICS} />
      )}

      {activeTab === 'admin' && (
        <AdminFinancialControls
          withdrawals={withdrawals}
          analytics={MOCK_FINANCIAL_ANALYTICS}
          onApproveWithdrawal={handleApproveWithdrawal}
          onRejectWithdrawal={handleRejectWithdrawal}
          onAdjustBalance={(userId, amountKES, reason) => {
            setWallet((prev) => ({
              ...prev,
              balances: {
                ...prev.balances,
                KES: {
                  ...prev.balances.KES,
                  available: prev.balances.KES.available + amountKES
                }
              }
            }));
          }}
        />
      )}

      {/* Modals */}
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onSuccess={handleDepositSuccess}
      />

      <WithdrawalModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        availableBalanceKES={wallet.balances.KES.available}
        savedMethods={MOCK_PAYMENT_METHODS}
        onSuccess={handleWithdrawSuccess}
      />

      <InvoiceReceiptModal
        invoice={selectedInvoice}
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
      />
    </div>
  );
};
