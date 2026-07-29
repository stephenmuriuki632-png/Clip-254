import { Currency, PaymentProviderId } from '../types/finance';

export interface PaymentRequest {
  amount: number;
  currency: Currency;
  accountIdentifier: string; // e.g. Phone number, Card Token, PayPal Email, Bank Account
  reference: string;
  description: string;
  customerName?: string;
  customerEmail?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  providerReference: string;
  amountProcessed: number;
  currency: Currency;
  feeAmount: number;
  message: string;
  status: 'completed' | 'pending' | 'failed';
  requiresRedirect?: boolean;
  redirectUrl?: string;
  rawResponse?: any;
}

export interface IPaymentAdapter {
  providerId: PaymentProviderId;
  providerName: string;
  supportedCurrencies: Currency[];
  supportsDeposit: boolean;
  supportsWithdrawal: boolean;
  icon: string;

  calculateFee(amount: number, currency: Currency): number;
  processDeposit(request: PaymentRequest): Promise<PaymentResponse>;
  processWithdrawal(request: PaymentRequest): Promise<PaymentResponse>;
  verifyTransaction(transactionId: string): Promise<{ verified: boolean; status: string }>;
  getHealthStatus(): Promise<{ status: 'online' | 'degraded' | 'offline'; latencyMs: number }>;
}

/**
 * M-PESA EXPRESS ADAPTER (STK Push, B2C, Paybill)
 */
export class MpesaPaymentAdapter implements IPaymentAdapter {
  providerId: PaymentProviderId = 'mpesa';
  providerName = 'M-Pesa Express';
  supportedCurrencies: Currency[] = ['KES', 'USD'];
  supportsDeposit = true;
  supportsWithdrawal = true;
  icon = 'Smartphone';

  calculateFee(amount: number, _currency: Currency): number {
    // Standard M-Pesa tier formula simulation (e.g. ~1.5% capped at 250 KES)
    if (amount <= 100) return 0;
    if (amount <= 1000) return 15;
    if (amount <= 5000) return 35;
    if (amount <= 10000) return 60;
    return Math.min(250, Math.round(amount * 0.015));
  }

  async processDeposit(request: PaymentRequest): Promise<PaymentResponse> {
    // Simulate STK Push delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const fee = this.calculateFee(request.amount, request.currency);
    const mpesaReceipt = 'MP' + Math.floor(1000000000 + Math.random() * 9000000000);

    return {
      success: true,
      transactionId: 'tx_mp_' + Date.now(),
      providerReference: mpesaReceipt,
      amountProcessed: request.amount,
      currency: request.currency,
      feeAmount: fee,
      message: `STK Push prompt dispatched to ${request.accountIdentifier}. Approved receipt: ${mpesaReceipt}`,
      status: 'completed',
    };
  }

  async processWithdrawal(request: PaymentRequest): Promise<PaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 900));

    const fee = this.calculateFee(request.amount, request.currency);
    const b2cRef = 'B2C' + Math.floor(1000000000 + Math.random() * 9000000000);

    return {
      success: true,
      transactionId: 'tx_mp_wth_' + Date.now(),
      providerReference: b2cRef,
      amountProcessed: request.amount,
      currency: request.currency,
      feeAmount: fee,
      message: `M-Pesa B2C instant payout of ${request.amount} KES disbursed to ${request.accountIdentifier}`,
      status: 'completed',
    };
  }

  async verifyTransaction(transactionId: string) {
    return { verified: true, status: 'completed' };
  }

  async getHealthStatus() {
    return { status: 'online' as const, latencyMs: 142 };
  }
}

/**
 * STRIPE ADAPTER (Cards, Apple Pay, Google Pay)
 */
export class StripePaymentAdapter implements IPaymentAdapter {
  providerId: PaymentProviderId = 'stripe';
  providerName = 'Stripe Global Payments';
  supportedCurrencies: Currency[] = ['USD', 'KES', 'EUR', 'GBP'];
  supportsDeposit = true;
  supportsWithdrawal = true;
  icon = 'CreditCard';

  calculateFee(amount: number, _currency: Currency): number {
    // Stripe 2.9% + $0.30 equivalent
    return Math.round(amount * 0.029 + 40);
  }

  async processDeposit(request: PaymentRequest): Promise<PaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const fee = this.calculateFee(request.amount, request.currency);
    const stripeChargeId = 'ch_' + Math.random().toString(36).substring(2, 15);

    return {
      success: true,
      transactionId: 'tx_str_' + Date.now(),
      providerReference: stripeChargeId,
      amountProcessed: request.amount,
      currency: request.currency,
      feeAmount: fee,
      message: `Credit card charged successfully via Stripe. Ref: ${stripeChargeId}`,
      status: 'completed',
    };
  }

  async processWithdrawal(request: PaymentRequest): Promise<PaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1100));

    const fee = this.calculateFee(request.amount, request.currency);
    const payoutId = 'po_' + Math.random().toString(36).substring(2, 15);

    return {
      success: true,
      transactionId: 'tx_str_po_' + Date.now(),
      providerReference: payoutId,
      amountProcessed: request.amount,
      currency: request.currency,
      feeAmount: fee,
      message: `Stripe Payout initiated to ${request.accountIdentifier}. Ref: ${payoutId}`,
      status: 'completed',
    };
  }

  async verifyTransaction(transactionId: string) {
    return { verified: true, status: 'completed' };
  }

  async getHealthStatus() {
    return { status: 'online' as const, latencyMs: 88 };
  }
}

/**
 * PAYPAL ADAPTER (Express Checkout & Mass Payout)
 */
export class PaypalPaymentAdapter implements IPaymentAdapter {
  providerId: PaymentProviderId = 'paypal';
  providerName = 'PayPal Express';
  supportedCurrencies: Currency[] = ['USD', 'EUR', 'GBP', 'KES'];
  supportsDeposit = true;
  supportsWithdrawal = true;
  icon = 'Globe';

  calculateFee(amount: number, _currency: Currency): number {
    return Math.round(amount * 0.034 + 35);
  }

  async processDeposit(request: PaymentRequest): Promise<PaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const fee = this.calculateFee(request.amount, request.currency);
    const paypalCaptureId = 'PAYID-' + Math.random().toString(36).substring(2, 12).toUpperCase();

    return {
      success: true,
      transactionId: 'tx_pp_' + Date.now(),
      providerReference: paypalCaptureId,
      amountProcessed: request.amount,
      currency: request.currency,
      feeAmount: fee,
      message: `PayPal payment captured. Order Ref: ${paypalCaptureId}`,
      status: 'completed',
    };
  }

  async processWithdrawal(request: PaymentRequest): Promise<PaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const fee = this.calculateFee(request.amount, request.currency);
    const payoutBatchId = 'PP-BATCH-' + Math.floor(Math.random() * 1000000);

    return {
      success: true,
      transactionId: 'tx_pp_po_' + Date.now(),
      providerReference: payoutBatchId,
      amountProcessed: request.amount,
      currency: request.currency,
      feeAmount: fee,
      message: `Instant PayPal Payout sent to ${request.accountIdentifier}`,
      status: 'completed',
    };
  }

  async verifyTransaction(transactionId: string) {
    return { verified: true, status: 'completed' };
  }

  async getHealthStatus() {
    return { status: 'online' as const, latencyMs: 165 };
  }
}

/**
 * FLUTTERWAVE ADAPTER (Pan-African Mobile Money & Cards)
 */
export class FlutterwavePaymentAdapter implements IPaymentAdapter {
  providerId: PaymentProviderId = 'flutterwave';
  providerName = 'Flutterwave Africa';
  supportedCurrencies: Currency[] = ['KES', 'USD', 'EUR', 'GBP'];
  supportsDeposit = true;
  supportsWithdrawal = true;
  icon = 'Zap';

  calculateFee(amount: number, _currency: Currency): number {
    return Math.round(amount * 0.022);
  }

  async processDeposit(request: PaymentRequest): Promise<PaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 850));

    const fee = this.calculateFee(request.amount, request.currency);
    const flwRef = 'FLW-TX-' + Math.floor(1000000 + Math.random() * 9000000);

    return {
      success: true,
      transactionId: 'tx_flw_' + Date.now(),
      providerReference: flwRef,
      amountProcessed: request.amount,
      currency: request.currency,
      feeAmount: fee,
      message: `Flutterwave multi-currency transaction processed. Ref: ${flwRef}`,
      status: 'completed',
    };
  }

  async processWithdrawal(request: PaymentRequest): Promise<PaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 950));

    const fee = this.calculateFee(request.amount, request.currency);
    const transferRef = 'FLW-TR-' + Math.floor(1000000 + Math.random() * 9000000);

    return {
      success: true,
      transactionId: 'tx_flw_tr_' + Date.now(),
      providerReference: transferRef,
      amountProcessed: request.amount,
      currency: request.currency,
      feeAmount: fee,
      message: `Flutterwave payout dispatched to ${request.accountIdentifier}`,
      status: 'completed',
    };
  }

  async verifyTransaction(transactionId: string) {
    return { verified: true, status: 'completed' };
  }

  async getHealthStatus() {
    return { status: 'online' as const, latencyMs: 110 };
  }
}

/**
 * PAYSTACK ADAPTER
 */
export class PaystackPaymentAdapter implements IPaymentAdapter {
  providerId: PaymentProviderId = 'paystack';
  providerName = 'Paystack Direct';
  supportedCurrencies: Currency[] = ['KES', 'USD'];
  supportsDeposit = true;
  supportsWithdrawal = true;
  icon = 'ShieldCheck';

  calculateFee(amount: number, _currency: Currency): number {
    return Math.round(amount * 0.018);
  }

  async processDeposit(request: PaymentRequest): Promise<PaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 900));

    const fee = this.calculateFee(request.amount, request.currency);
    const PSTKRef = 'PSTK_' + Math.random().toString(36).substring(2, 10).toUpperCase();

    return {
      success: true,
      transactionId: 'tx_pstk_' + Date.now(),
      providerReference: PSTKRef,
      amountProcessed: request.amount,
      currency: request.currency,
      feeAmount: fee,
      message: `Paystack payment confirmed. Ref: ${PSTKRef}`,
      status: 'completed',
    };
  }

  async processWithdrawal(request: PaymentRequest): Promise<PaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const fee = this.calculateFee(request.amount, request.currency);
    const transferCode = 'TRF_' + Math.random().toString(36).substring(2, 10).toUpperCase();

    return {
      success: true,
      transactionId: 'tx_pstk_tr_' + Date.now(),
      providerReference: transferCode,
      amountProcessed: request.amount,
      currency: request.currency,
      feeAmount: fee,
      message: `Paystack Transfer executed to ${request.accountIdentifier}`,
      status: 'completed',
    };
  }

  async verifyTransaction(transactionId: string) {
    return { verified: true, status: 'completed' };
  }

  async getHealthStatus() {
    return { status: 'online' as const, latencyMs: 98 };
  }
}

/**
 * WISE & BANK TRANSFER ADAPTER
 */
export class WiseBankPaymentAdapter implements IPaymentAdapter {
  providerId: PaymentProviderId = 'wise';
  providerName = 'Wise / Wire Transfer';
  supportedCurrencies: Currency[] = ['USD', 'EUR', 'GBP', 'KES'];
  supportsDeposit = true;
  supportsWithdrawal = true;
  icon = 'Building2';

  calculateFee(amount: number, _currency: Currency): number {
    return 150; // Flat RTGS / Swift fee
  }

  async processDeposit(request: PaymentRequest): Promise<PaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const fee = this.calculateFee(request.amount, request.currency);
    const wiseId = 'WISE-IN-' + Math.floor(100000 + Math.random() * 900000);

    return {
      success: true,
      transactionId: 'tx_wise_' + Date.now(),
      providerReference: wiseId,
      amountProcessed: request.amount,
      currency: request.currency,
      feeAmount: fee,
      message: `Bank Wire / Wise Deposit recorded. Ref: ${wiseId}`,
      status: 'completed',
    };
  }

  async processWithdrawal(request: PaymentRequest): Promise<PaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const fee = this.calculateFee(request.amount, request.currency);
    const wiseTransferId = 'WISE-OUT-' + Math.floor(100000 + Math.random() * 900000);

    return {
      success: true,
      transactionId: 'tx_wise_out_' + Date.now(),
      providerReference: wiseTransferId,
      amountProcessed: request.amount,
      currency: request.currency,
      feeAmount: fee,
      message: `Wise SWIFT/RTGS transfer queued to ${request.accountIdentifier}. Delivery: 1-2 hours.`,
      status: 'completed',
    };
  }

  async verifyTransaction(transactionId: string) {
    return { verified: true, status: 'completed' };
  }

  async getHealthStatus() {
    return { status: 'online' as const, latencyMs: 210 };
  }
}

/**
 * CENTRAL PAYMENT GATEWAY REGISTRY
 * Allows modular extension with new payment adapters
 */
export class PaymentGatewayRegistry {
  private static instance: PaymentGatewayRegistry;
  private adapters: Map<PaymentProviderId, IPaymentAdapter> = new Map();

  private constructor() {
    // Register default adapters
    this.registerAdapter(new MpesaPaymentAdapter());
    this.registerAdapter(new StripePaymentAdapter());
    this.registerAdapter(new PaypalPaymentAdapter());
    this.registerAdapter(new FlutterwavePaymentAdapter());
    this.registerAdapter(new PaystackPaymentAdapter());
    this.registerAdapter(new WiseBankPaymentAdapter());
  }

  public static getInstance(): PaymentGatewayRegistry {
    if (!PaymentGatewayRegistry.instance) {
      PaymentGatewayRegistry.instance = new PaymentGatewayRegistry();
    }
    return PaymentGatewayRegistry.instance;
  }

  public registerAdapter(adapter: IPaymentAdapter): void {
    this.adapters.set(adapter.providerId, adapter);
  }

  public getAdapter(providerId: PaymentProviderId): IPaymentAdapter | undefined {
    return this.adapters.get(providerId);
  }

  public getAllAdapters(): IPaymentAdapter[] {
    return Array.from(this.adapters.values());
  }

  public getAdaptersForCurrency(currency: Currency): IPaymentAdapter[] {
    return this.getAllAdapters().filter((a) => a.supportedCurrencies.includes(currency));
  }
}

export const paymentRegistry = PaymentGatewayRegistry.getInstance();
