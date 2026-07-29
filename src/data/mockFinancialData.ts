import {
  UserWallet,
  FinancialTransaction,
  EscrowAccount,
  WithdrawalRequest,
  ReferralDashboardData,
  SubscriptionPlan,
  UserSubscription,
  Coupon,
  Invoice,
  FinancialAnalyticsSummary,
  PaymentMethod
} from '../types/finance';

export const INITIAL_USER_WALLETS: Record<string, UserWallet> = {
  usr_current: {
    id: 'wlt_current',
    userId: 'usr_current',
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
    updatedAt: '2025-05-20 14:30',
    balances: {
      KES: { currency: 'KES', available: 44900, pendingEscrow: 18500, reserved: 2500, total: 65900 },
      USD: { currency: 'USD', available: 345.38, pendingEscrow: 142.3, reserved: 19.23, total: 506.91 },
      EUR: { currency: 'EUR', available: 318.10, pendingEscrow: 131.2, reserved: 17.7, total: 467.0 },
      GBP: { currency: 'GBP', available: 272.50, pendingEscrow: 112.5, reserved: 15.1, total: 400.1 }
    }
  },
  usr_brand_001: {
    id: 'wlt_brand_001',
    userId: 'usr_brand_001',
    walletType: 'brand',
    primaryCurrency: 'KES',
    status: 'active',
    kycVerified: true,
    tier: 'Brand Growth',
    lifetimeEarningsKES: 0,
    monthlyEarningsKES: 0,
    totalSpentKES: 650000,
    totalWithdrawnKES: 0,
    pendingPayoutsKES: 120000,
    updatedAt: '2025-05-20 11:15',
    balances: {
      KES: { currency: 'KES', available: 185000, pendingEscrow: 120000, reserved: 15000, total: 320000 },
      USD: { currency: 'USD', available: 1423.07, pendingEscrow: 923.07, reserved: 115.38, total: 2461.52 },
      EUR: { currency: 'EUR', available: 1312.0, pendingEscrow: 850.0, reserved: 106.0, total: 2268.0 },
      GBP: { currency: 'GBP', available: 1125.0, pendingEscrow: 728.0, reserved: 91.0, total: 1944.0 }
    }
  }
};

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm_001',
    userId: 'usr_current',
    provider: 'mpesa',
    label: 'Primary M-Pesa Number',
    accountIdentifier: '+254 712 *** 678',
    isDefault: true,
    details: { phone: '254712345678' }
  },
  {
    id: 'pm_002',
    userId: 'usr_current',
    provider: 'stripe',
    label: 'Equity Bank Visa Card',
    accountIdentifier: '•••• •••• •••• 4242',
    isDefault: false,
    details: { cardBrand: 'Visa', last4: '4242' }
  },
  {
    id: 'pm_003',
    userId: 'usr_current',
    provider: 'paypal',
    label: 'Personal PayPal Account',
    accountIdentifier: 'user***@clipkenya.co.ke',
    isDefault: false,
    details: { paypalEmail: 'user@clipkenya.co.ke' }
  }
];

export const MOCK_ESCROW_ACCOUNTS: EscrowAccount[] = [
  {
    id: 'esc_001',
    title: 'Safaricom 5G Speed Test Clip Challenge',
    payerId: 'usr_brand_safaricom',
    payerName: 'Safaricom PLC',
    payerAvatar: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150',
    payeeId: 'usr_current',
    payeeName: 'Alex K. (Clip Creator)',
    payeeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    campaignOrOrderId: 'camp_101',
    itemType: 'bounty',
    totalAmountKES: 15000,
    platformFeeKES: 1500,
    releasedAmountKES: 0,
    status: 'funded',
    autoReleaseDate: '2025-05-28T23:59:59Z',
    createdAt: '2025-05-18 10:00',
    updatedAt: '2025-05-18 10:00',
    milestones: [
      { id: 'ms_001', title: 'Video Clip Submission & QC', amountKES: 7500, status: 'approved', dueDate: '2025-05-22' },
      { id: 'ms_002', title: 'Viral Threshold (50k Views)', amountKES: 7500, status: 'pending', dueDate: '2025-05-28' }
    ]
  },
  {
    id: 'esc_002',
    title: 'TikTok UGC Promo Video - Java House Coffee',
    payerId: 'usr_brand_javahouse',
    payerName: 'Java House Kenya',
    payerAvatar: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=150',
    payeeId: 'usr_ugc_master',
    payeeName: 'Mercy W. (UGC Creator)',
    payeeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    campaignOrOrderId: 'ugc_order_302',
    itemType: 'ugc_order',
    totalAmountKES: 25000,
    platformFeeKES: 2500,
    releasedAmountKES: 12500,
    status: 'partially_released',
    autoReleaseDate: '2025-05-25T23:59:59Z',
    createdAt: '2025-05-15 14:20',
    updatedAt: '2025-05-19 16:40',
    milestones: [
      { id: 'ms_201', title: 'Raw Footage & Voiceover', amountKES: 12500, status: 'released', dueDate: '2025-05-18' },
      { id: 'ms_202', title: 'Final Edited Video & B-roll', amountKES: 12500, status: 'in_review', dueDate: '2025-05-24' }
    ]
  },
  {
    id: 'esc_003',
    title: 'Full Youtube Channel Banner & Intro Design',
    payerId: 'usr_creator_brian',
    payerName: 'Brian Gamer KE',
    payerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
    payeeId: 'usr_freelance_david',
    payeeName: 'David N. (Motion Designer)',
    payeeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    campaignOrOrderId: 'gig_order_501',
    itemType: 'freelance_gig',
    totalAmountKES: 8500,
    platformFeeKES: 850,
    releasedAmountKES: 8500,
    status: 'released',
    autoReleaseDate: '2025-05-16T23:59:59Z',
    createdAt: '2025-05-10 09:12',
    updatedAt: '2025-05-16 11:30',
    milestones: [
      { id: 'ms_301', title: 'Initial Concept Drafts', amountKES: 4250, status: 'released', dueDate: '2025-05-12' },
      { id: 'ms_302', title: 'Final Delivery & Project Files', amountKES: 4250, status: 'released', dueDate: '2025-05-16' }
    ]
  }
];

export const MOCK_WITHDRAWAL_REQUESTS: WithdrawalRequest[] = [
  {
    id: 'wth_901',
    userId: 'usr_current',
    userName: 'Alex K. (You)',
    userRole: 'Creator/Clipper',
    amountKES: 12500,
    feeKES: 150,
    netAmountKES: 12350,
    provider: 'mpesa',
    accountIdentifier: '+254 712 345 678',
    status: 'completed',
    requestedAt: '2025-05-19 14:10',
    processedAt: '2025-05-19 14:11',
    referenceNumber: 'B2C98721054'
  },
  {
    id: 'wth_902',
    userId: 'usr_creator_sam',
    userName: 'Sam O. (Streamer)',
    userRole: 'Creator',
    amountKES: 45000,
    feeKES: 250,
    netAmountKES: 44750,
    provider: 'mpesa',
    accountIdentifier: '+254 722 987 654',
    status: 'pending',
    requestedAt: '2025-05-20 09:30'
  },
  {
    id: 'wth_903',
    userId: 'usr_freelance_david',
    userName: 'David N. (Freelancer)',
    userRole: 'Freelancer',
    amountKES: 32000,
    feeKES: 150,
    netAmountKES: 31850,
    provider: 'bank_wire',
    accountIdentifier: 'Equity Bank - 011029384756',
    status: 'processing',
    requestedAt: '2025-05-19 18:45'
  }
];

export const MOCK_REFERRAL_DATA: ReferralDashboardData = {
  referralCode: 'CLIP-ALEX-2025',
  referralLink: 'https://clipkenya.co.ke/signup?ref=CLIP-ALEX-2025',
  totalReferrals: 14,
  activeReferrals: 9,
  totalCommissionsKES: 28400,
  pendingCommissionsKES: 4200,
  commissionRatePercent: 5,
  referredUsers: [
    {
      id: 'ref_01',
      name: 'Joan Wambui',
      role: 'UGC Creator',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      joinedAt: '2025-05-02',
      earningsGeneratedKES: 180000,
      commissionEarnedKES: 9000,
      status: 'active'
    },
    {
      id: 'ref_02',
      name: 'Kevin Otieno',
      role: 'Clipper / Editor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      joinedAt: '2025-05-10',
      earningsGeneratedKES: 240000,
      commissionEarnedKES: 12000,
      status: 'active'
    },
    {
      id: 'ref_03',
      name: 'Stacia Media Agency',
      role: 'Agency',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      joinedAt: '2025-05-15',
      earningsGeneratedKES: 148000,
      commissionEarnedKES: 7400,
      status: 'active'
    }
  ]
};

export const MOCK_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Ideal for beginner clippers, creators & freelancers starting out.',
    priceMonthlyKES: 0,
    priceYearlyKES: 0,
    badge: 'Free Forever',
    features: [
      'Access to Public Clip Bounties',
      'Basic Wallet with M-Pesa Payouts',
      'Standard Escrow Protection (5% fee)',
      'Community & Academy Access',
      'Up to 3 Active Applications'
    ],
    limits: {
      maxCampaigns: 2,
      platformFeePercent: 5.0,
      withdrawPriority: 'Standard',
      dedicatedManager: false,
      analyticsDepth: 'Basic'
    }
  },
  {
    id: 'pro',
    name: 'Pro Creator / Clipper',
    tagline: 'Built for active creators, viral editors and busy UGC talent.',
    priceMonthlyKES: 2500,
    priceYearlyKES: 24000,
    badge: 'Most Popular',
    popular: true,
    features: [
      'Priority Clip Approvals & VIP Badge',
      'Reduced Platform Fee (2.5%)',
      'Instant Express M-Pesa Payouts',
      'Unlimited Job Applications & UGC Bids',
      'AI Viral Clip Generator (50 credits/mo)',
      'Advanced Performance Analytics'
    ],
    limits: {
      maxCampaigns: 10,
      platformFeePercent: 2.5,
      withdrawPriority: 'Express',
      dedicatedManager: false,
      analyticsDepth: 'Advanced'
    }
  },
  {
    id: 'growth',
    name: 'Brand Growth',
    tagline: 'Designed for growing brands, SME businesses and e-commerce stores.',
    priceMonthlyKES: 9500,
    priceYearlyKES: 90000,
    badge: 'For Businesses',
    features: [
      'Unlimited Campaign & Bounty Postings',
      'Custom Rights & Creator Licensing',
      'Automated Escrow Milestone Rules',
      'Dedicated Account Specialist',
      'Bulk Creator Hiring & Invites',
      'Tax Receipts & KRA PIN Invoicing'
    ],
    limits: {
      maxCampaigns: 50,
      platformFeePercent: 1.5,
      withdrawPriority: 'Instant VIP',
      dedicatedManager: true,
      analyticsDepth: 'Advanced'
    }
  },
  {
    id: 'enterprise',
    name: 'Agency Enterprise',
    tagline: 'Custom infrastructure for media agencies, talent networks & brands.',
    priceMonthlyKES: 28000,
    priceYearlyKES: 270000,
    badge: 'Custom API',
    features: [
      'Multi-seat Team Portal & Access Control',
      '0% Platform Fee on Custom Volume',
      'Custom API & Webhook Payment Integrations',
      '24/7 Priority Financial Desk',
      'Legal Contract & NDA Vault',
      'Predictive AI ROI & Viral Analytics'
    ],
    limits: {
      maxCampaigns: 999,
      platformFeePercent: 0.0,
      withdrawPriority: 'Instant VIP',
      dedicatedManager: true,
      analyticsDepth: 'Predictive AI'
    }
  }
];

export const MOCK_USER_SUBSCRIPTION: UserSubscription = {
  planId: 'pro',
  planName: 'Pro Creator / Clipper',
  status: 'active',
  billingCycle: 'monthly',
  renewsAt: '2025-06-18',
  amountKES: 2500,
  autoRenew: true,
  paymentMethod: 'M-Pesa Express (+254 712 *** 678)'
};

export const MOCK_COUPONS: Coupon[] = [
  {
    code: 'KARIBU2025',
    discountType: 'percentage',
    discountValue: 20, // 20% off
    validUntil: '2025-12-31',
    maxUsage: 1000,
    usageCount: 142,
    active: true
  },
  {
    code: 'NYOTA1000',
    discountType: 'fixed_kes',
    discountValue: 1000, // 1000 KES off
    validUntil: '2025-08-30',
    maxUsage: 500,
    usageCount: 89,
    active: true
  }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv_2025_001',
    invoiceNumber: 'INV-CK-2025-0089',
    userId: 'usr_current',
    customerName: 'Alex K. Media Services',
    customerEmail: 'alex@clipkenya.co.ke',
    customerAddress: 'Westlands Commercial Center, Nairobi, Kenya',
    kraPin: 'P051987654Z',
    date: '2025-05-18',
    dueDate: '2025-05-18',
    items: [
      { description: 'Pro Creator Subscription (Monthly)', quantity: 1, unitPriceKES: 2500, totalPriceKES: 2500 },
      { description: 'Platform Escrow Protection Fee (Campaign #101)', quantity: 1, unitPriceKES: 750, totalPriceKES: 750 }
    ],
    subtotalKES: 3250,
    vatKES: 520, // 16% VAT
    totalKES: 3770,
    status: 'paid',
    paymentMethod: 'M-Pesa Express',
    transactionReference: 'MP98231048'
  },
  {
    id: 'inv_2025_002',
    invoiceNumber: 'INV-CK-2025-0074',
    userId: 'usr_current',
    customerName: 'Alex K. Media Services',
    customerEmail: 'alex@clipkenya.co.ke',
    kraPin: 'P051987654Z',
    date: '2025-04-18',
    dueDate: '2025-04-18',
    items: [
      { description: 'Pro Creator Subscription (Monthly)', quantity: 1, unitPriceKES: 2500, totalPriceKES: 2500 }
    ],
    subtotalKES: 2500,
    vatKES: 400,
    totalKES: 2900,
    status: 'paid',
    paymentMethod: 'M-Pesa Express',
    transactionReference: 'MP87123901'
  }
];

export const MOCK_FINANCIAL_ANALYTICS: FinancialAnalyticsSummary = {
  totalPlatformVolumeKES: 14850000,
  totalEscrowHeldKES: 2450000,
  totalPayoutsProcessedKES: 11200000,
  totalRevenueFeesKES: 1200000,
  monthlyRevenueGrowthPercent: 18.4,
  payoutVolumeByMethod: [
    { provider: 'M-Pesa Express', percentage: 72, amountKES: 8064000 },
    { provider: 'Stripe Card', percentage: 14, amountKES: 1568000 },
    { provider: 'PayPal Express', percentage: 8, amountKES: 896000 },
    { provider: 'Flutterwave / Bank Wire', percentage: 6, amountKES: 672000 }
  ],
  revenueByStream: [
    { stream: 'Campaign Escrow Platform Fees (3%)', amountKES: 580000 },
    { stream: 'Pro & Brand Subscriptions', amountKES: 340000 },
    { stream: 'UGC Marketplace Commission (5%)', amountKES: 180000 },
    { stream: 'M-Pesa Express Payout Handling', amountKES: 100000 }
  ],
  recentAuditLogs: [
    {
      id: 'aud_001',
      event: 'Instant M-Pesa Withdrawal Processed',
      user: 'Alex K.',
      severity: 'low',
      timestamp: '2025-05-20 14:10',
      details: 'Amount: 12,500 KES to +254 712 345 678. STK Response Code: 0 (Success).'
    },
    {
      id: 'aud_002',
      event: 'Escrow Milestone Auto-Release Scheduled',
      user: 'Safaricom PLC',
      severity: 'low',
      timestamp: '2025-05-19 09:00',
      details: 'Milestone MS-001 approved for 7,500 KES. Funds transferred to Clipper Wallet.'
    },
    {
      id: 'aud_003',
      event: 'KYC Identity & M-Pesa Match Verified',
      user: 'Alex K.',
      severity: 'low',
      timestamp: '2025-05-15 11:20',
      details: 'Safaricom IPRS National ID check passed cleanly.'
    },
    {
      id: 'aud_004',
      event: 'Velocity Check - Normal Payout Rate',
      user: 'System Guardian',
      severity: 'low',
      timestamp: '2025-05-14 18:00',
      details: 'Platform daily velocity within safe bounds (1.2M KES / 5.0M KES limit).'
    }
  ]
};
