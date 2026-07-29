export type Currency = 'KES' | 'USD' | 'EUR' | 'GBP';

export type WalletType = 'creator' | 'clipper' | 'ugc' | 'freelancer' | 'brand' | 'agency' | 'general';

export type WalletStatus = 'active' | 'frozen' | 'suspended' | 'under_audit';

export interface WalletBalance {
  currency: Currency;
  available: number;
  pendingEscrow: number;
  reserved: number;
  total: number;
}

export interface UserWallet {
  id: string;
  userId: string;
  walletType: WalletType;
  primaryCurrency: Currency;
  status: WalletStatus;
  balances: Record<Currency, WalletBalance>;
  lifetimeEarningsKES: number;
  monthlyEarningsKES: number;
  totalSpentKES: number;
  totalWithdrawnKES: number;
  pendingPayoutsKES: number;
  kycVerified: boolean;
  tier: 'Starter' | 'Pro Creator' | 'Brand Growth' | 'Agency Enterprise';
  updatedAt: string;
}

export type TransactionType =
  | 'deposit'
  | 'withdrawal'
  | 'campaign_payout'
  | 'service_payment'
  | 'ugc_payment'
  | 'escrow_lock'
  | 'escrow_release'
  | 'escrow_refund'
  | 'platform_fee'
  | 'referral_bonus'
  | 'subscription_fee'
  | 'currency_exchange';

export type TransactionStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'disputed';

export type PaymentProviderId =
  | 'mpesa'
  | 'stripe'
  | 'paypal'
  | 'flutterwave'
  | 'paystack'
  | 'wise'
  | 'bank_wire';

export interface FinancialTransaction {
  id: string;
  walletId: string;
  userId: string;
  userName: string;
  userRole: WalletType;
  type: TransactionType;
  status: TransactionStatus;
  amountKES: number;
  amountUSD: number;
  currency: Currency;
  provider: PaymentProviderId;
  reference: string;
  providerTransactionId?: string;
  description: string;
  senderOrRecipient: string;
  escrowId?: string;
  feeAmountKES: number;
  taxAmountKES: number;
  invoiceId?: string;
  timestamp: string;
  notes?: string;
  metadata?: Record<string, any>;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  provider: PaymentProviderId;
  label: string;
  accountIdentifier: string; // e.g. Phone number, Card last 4, Bank account, PayPal email
  isDefault: boolean;
  details: {
    phone?: string;
    cardBrand?: string;
    last4?: string;
    bankName?: string;
    accountName?: string;
    paypalEmail?: string;
    swiftCode?: string;
  };
}

export type EscrowStatus =
  | 'funded'
  | 'reserved'
  | 'in_review'
  | 'partially_released'
  | 'released'
  | 'disputed'
  | 'refunded';

export interface EscrowMilestone {
  id: string;
  title: string;
  amountKES: number;
  status: 'pending' | 'in_review' | 'approved' | 'released' | 'disputed';
  dueDate: string;
  deliverables?: string[];
}

export interface EscrowAccount {
  id: string;
  title: string;
  payerId: string;
  payerName: string;
  payerAvatar: string;
  payeeId: string;
  payeeName: string;
  payeeAvatar: string;
  campaignOrOrderId: string;
  itemType: 'bounty' | 'campaign' | 'ugc_order' | 'freelance_gig';
  totalAmountKES: number;
  platformFeeKES: number;
  releasedAmountKES: number;
  status: EscrowStatus;
  autoReleaseDate: string; // ISO string
  createdAt: string;
  updatedAt: string;
  milestones?: EscrowMilestone[];
  disputeNotes?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  amountKES: number;
  feeKES: number;
  netAmountKES: number;
  provider: PaymentProviderId;
  accountIdentifier: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected' | 'completed';
  requestedAt: string;
  processedAt?: string;
  processedBy?: string;
  rejectionReason?: string;
  referenceNumber?: string;
}

export interface ReferralUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
  joinedAt: string;
  earningsGeneratedKES: number;
  commissionEarnedKES: number;
  status: 'active' | 'pending';
}

export interface ReferralDashboardData {
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  activeReferrals: number;
  totalCommissionsKES: number;
  pendingCommissionsKES: number;
  commissionRatePercent: number; // e.g., 5%
  referredUsers: ReferralUser[];
}

export interface SubscriptionPlan {
  id: 'starter' | 'pro' | 'growth' | 'enterprise';
  name: string;
  tagline: string;
  priceMonthlyKES: number;
  priceYearlyKES: number;
  badge?: string;
  popular?: boolean;
  features: string[];
  limits: {
    maxCampaigns: number;
    platformFeePercent: number;
    withdrawPriority: 'Standard' | 'Express' | 'Instant VIP';
    dedicatedManager: boolean;
    analyticsDepth: 'Basic' | 'Advanced' | 'Predictive AI';
  };
}

export interface UserSubscription {
  planId: 'starter' | 'pro' | 'growth' | 'enterprise';
  planName: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  billingCycle: 'monthly' | 'yearly';
  renewsAt: string;
  amountKES: number;
  autoRenew: boolean;
  paymentMethod: string;
  couponCodeApplied?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed_kes';
  discountValue: number;
  validUntil: string;
  maxUsage: number;
  usageCount: number;
  active: boolean;
  applicablePlans?: string[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerAddress?: string;
  kraPin?: string;
  date: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPriceKES: number;
    totalPriceKES: number;
  }[];
  subtotalKES: number;
  vatKES: number;
  totalKES: number;
  status: 'paid' | 'unpaid' | 'overdue';
  paymentMethod: string;
  transactionReference: string;
}

export interface FinancialAnalyticsSummary {
  totalPlatformVolumeKES: number;
  totalEscrowHeldKES: number;
  totalPayoutsProcessedKES: number;
  totalRevenueFeesKES: number;
  monthlyRevenueGrowthPercent: number;
  payoutVolumeByMethod: { provider: string; percentage: number; amountKES: number }[];
  revenueByStream: { stream: string; amountKES: number }[];
  recentAuditLogs: {
    id: string;
    event: string;
    user: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    timestamp: string;
    details: string;
  }[];
}
