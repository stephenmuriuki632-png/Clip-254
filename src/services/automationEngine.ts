/**
 * ClipKenya Zapier/Make-style Automation Engine & Webhook Management Platform
 */

import { emailRegistry, EmailTemplateGenerator } from './emailAdapters';
import { communicationRegistry } from './communicationAdapters';
import { SecurityAudit } from '../lib/securityAudit';

export type WorkflowTrigger =
  | 'CAMPAIGN_APPROVED'
  | 'CAMPAIGN_REJECTED'
  | 'CLIP_SUBMITTED'
  | 'CLIP_APPROVED'
  | 'WITHDRAWAL_COMPLETED'
  | 'USER_REGISTERED'
  | 'REFERRAL_JOINED'
  | 'COURSE_COMPLETED'
  | 'PAYMENT_RECEIVED';

export type WorkflowActionType =
  | 'SEND_EMAIL'
  | 'SEND_SMS'
  | 'SEND_PUSH_NOTIFICATION'
  | 'DISPATCH_WEBHOOK'
  | 'CREDIT_WALLET_BONUS'
  | 'ISSUE_CERTIFICATE'
  | 'RELEASE_ESCROW';

export interface WorkflowAction {
  id: string;
  type: WorkflowActionType;
  config: {
    recipientTemplate?: string;
    webhookUrl?: string;
    amountKES?: number;
    emailSubject?: string;
    messageText?: string;
  };
}

export interface AutomationWorkflow {
  id: string;
  title: string;
  description: string;
  trigger: WorkflowTrigger;
  enabled: boolean;
  actions: WorkflowAction[];
  executionCount: number;
  lastExecutedAt?: string;
  createdAt: string;
}

export interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: WorkflowTrigger[];
  secretKey: string;
  enabled: boolean;
  createdAt: string;
}

export interface WebhookLog {
  id: string;
  webhookId: string;
  webhookName: string;
  event: WorkflowTrigger;
  url: string;
  requestPayload: any;
  responseStatus: number;
  responseBody: string;
  status: 'SUCCESS' | 'FAILED' | 'RETRYING';
  timestamp: string;
  retryCount: number;
}

const WORKFLOWS_STORAGE_KEY = 'clipkenya_automation_workflows';
const WEBHOOKS_STORAGE_KEY = 'clipkenya_webhook_endpoints';
const WEBHOOK_LOGS_STORAGE_KEY = 'clipkenya_webhook_logs';

export const DefaultWorkflows: AutomationWorkflow[] = [
  {
    id: 'flow_1',
    title: 'Automated UGC Campaign Approval Notification',
    description: 'Sends email, SMS alert & releases escrow payout as soon as a brand approves a campaign deliverable.',
    trigger: 'CAMPAIGN_APPROVED',
    enabled: true,
    executionCount: 142,
    lastExecutedAt: new Date(Date.now() - 3600000).toISOString(),
    createdAt: '2026-01-15T00:00:00.000Z',
    actions: [
      {
        id: 'act_1',
        type: 'SEND_EMAIL',
        config: { emailSubject: 'Campaign Deliverable Approved!', recipientTemplate: 'creator' }
      },
      {
        id: 'act_2',
        type: 'SEND_SMS',
        config: { messageText: 'ClipKenya Alert: Your campaign was approved! Escrow funds credited to your M-Pesa wallet.' }
      },
      {
        id: 'act_3',
        type: 'RELEASE_ESCROW',
        config: {}
      }
    ]
  },
  {
    id: 'flow_2',
    title: 'Instant M-Pesa Disbursal & Receipt Generator',
    description: 'Dispatches SMS receipt with M-Pesa transaction reference and triggers outgoing webhook to accounting software.',
    trigger: 'WITHDRAWAL_COMPLETED',
    enabled: true,
    executionCount: 528,
    lastExecutedAt: new Date(Date.now() - 1800000).toISOString(),
    createdAt: '2026-01-15T00:00:00.000Z',
    actions: [
      {
        id: 'act_4',
        type: 'SEND_SMS',
        config: { messageText: 'ClipKenya M-Pesa Disbursal complete. Thank you for using ClipKenya.' }
      },
      {
        id: 'act_5',
        type: 'DISPATCH_WEBHOOK',
        config: { webhookUrl: 'https://api.clipkenya.com/webhooks/accounting-sync' }
      }
    ]
  },
  {
    id: 'flow_3',
    title: 'New Creator Onboarding & Welcome Bonus',
    description: 'Triggers welcome email suite, pushes mobile notification, and awards welcome badge.',
    trigger: 'USER_REGISTERED',
    enabled: true,
    executionCount: 1240,
    lastExecutedAt: new Date(Date.now() - 900000).toISOString(),
    createdAt: '2026-01-15T00:00:00.000Z',
    actions: [
      {
        id: 'act_6',
        type: 'SEND_EMAIL',
        config: { emailSubject: 'Welcome to ClipKenya!' }
      },
      {
        id: 'act_7',
        type: 'SEND_PUSH_NOTIFICATION',
        config: { messageText: 'Welcome aboard! Find your first video clipping bounty now.' }
      }
    ]
  },
  {
    id: 'flow_4',
    title: 'Referral Bonus Automated Payout',
    description: 'Credits KES 250 bonus to referrer wallet when invited friend submits first clip.',
    trigger: 'REFERRAL_JOINED',
    enabled: true,
    executionCount: 89,
    lastExecutedAt: new Date(Date.now() - 7200000).toISOString(),
    createdAt: '2026-01-20T00:00:00.000Z',
    actions: [
      {
        id: 'act_8',
        type: 'CREDIT_WALLET_BONUS',
        config: { amountKES: 250 }
      },
      {
        id: 'act_9',
        type: 'SEND_PUSH_NOTIFICATION',
        config: { messageText: 'You earned KES 250 for referring a new creator!' }
      }
    ]
  }
];

export const DefaultWebhooks: WebhookEndpoint[] = [
  {
    id: 'wh_1',
    name: 'Make.com Discord & Telegram Bot Feed',
    url: 'https://hook.eu1.make.com/clipkenya-viral-alerts',
    events: ['CAMPAIGN_APPROVED', 'CLIP_APPROVED'],
    secretKey: 'whsec_clipkenya_make_8f9a2b',
    enabled: true,
    createdAt: '2026-02-01T00:00:00.000Z'
  },
  {
    id: 'wh_2',
    name: 'Zapier Slack Brand Notifications Channel',
    url: 'https://hooks.zapier.com/hooks/catch/912837/clipkenya',
    events: ['WITHDRAWAL_COMPLETED', 'PAYMENT_RECEIVED'],
    secretKey: 'whsec_clipkenya_zapier_3d1e4f',
    enabled: true,
    createdAt: '2026-02-05T00:00:00.000Z'
  }
];

export class AutomationEngine {
  private static instance: AutomationEngine;

  private constructor() {}

  public static getInstance(): AutomationEngine {
    if (!AutomationEngine.instance) {
      AutomationEngine.instance = new AutomationEngine();
    }
    return AutomationEngine.instance;
  }

  // Workflows CRUD
  public getWorkflows(): AutomationWorkflow[] {
    try {
      const raw = localStorage.getItem(WORKFLOWS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : DefaultWorkflows;
    } catch (e) {
      return DefaultWorkflows;
    }
  }

  public saveWorkflows(workflows: AutomationWorkflow[]) {
    localStorage.setItem(WORKFLOWS_STORAGE_KEY, JSON.stringify(workflows));
  }

  public toggleWorkflow(id: string): AutomationWorkflow[] {
    const list = this.getWorkflows();
    const updated = list.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w));
    this.saveWorkflows(updated);
    return updated;
  }

  public addWorkflow(workflow: Omit<AutomationWorkflow, 'id' | 'createdAt' | 'executionCount'>): AutomationWorkflow[] {
    const list = this.getWorkflows();
    const newEntry: AutomationWorkflow = {
      ...workflow,
      id: 'flow_' + Date.now(),
      createdAt: new Date().toISOString(),
      executionCount: 0
    };
    const updated = [newEntry, ...list];
    this.saveWorkflows(updated);
    return updated;
  }

  // Trigger Event Execution Engine
  public async triggerEvent(trigger: WorkflowTrigger, payload: Record<string, any>) {
    console.log(`[Automation Engine] Triggering Event: ${trigger}`, payload);

    // 1. Audit log
    SecurityAudit.logEvent('system', 'automation', `Trigger: ${trigger}`, 'ADMIN', `Payload: ${JSON.stringify(payload)}`);

    // 2. Execute matching enabled workflows
    const workflows = this.getWorkflows().filter((w) => w.enabled && w.trigger === trigger);

    for (const flow of workflows) {
      flow.executionCount += 1;
      flow.lastExecutedAt = new Date().toISOString();

      for (const action of flow.actions) {
        await this.executeAction(action, payload);
      }
    }

    this.saveWorkflows(this.getWorkflows().map((w) => {
      const match = workflows.find((fw) => fw.id === w.id);
      return match || w;
    }));

    // 3. Dispatch to matching Webhooks
    await this.dispatchWebhooksForEvent(trigger, payload);
  }

  private async executeAction(action: WorkflowAction, payload: Record<string, any>) {
    try {
      switch (action.type) {
        case 'SEND_EMAIL': {
          const emailAdapter = emailRegistry.getActiveAdapter();
          const tpl = EmailTemplateGenerator.generateWelcomeEmail(payload.userName || 'Creator');
          await emailAdapter.sendEmail({
            to: payload.email || 'creator@clipkenya.com',
            subject: action.config.emailSubject || tpl.subject,
            html: tpl.html
          });
          break;
        }
        case 'SEND_SMS': {
          const smsAdapter = communicationRegistry.getActiveSmsAdapter();
          await smsAdapter.sendSms({
            to: payload.phone || '+254700000000',
            message: action.config.messageText || 'ClipKenya Transaction Alert'
          });
          break;
        }
        case 'SEND_PUSH_NOTIFICATION': {
          const pushAdapter = communicationRegistry.getActivePushAdapter();
          await pushAdapter.sendPush({
            title: 'ClipKenya Automation Alert 🔔',
            body: action.config.messageText || 'Your campaign update is ready'
          });
          break;
        }
        case 'DISPATCH_WEBHOOK': {
          if (action.config.webhookUrl) {
            await this.postWebhookPayload(action.config.webhookUrl, 'wh_action', triggerFromAction(action), payload);
          }
          break;
        }
        case 'CREDIT_WALLET_BONUS': {
          console.log(`[Automation Engine] Credited KES ${action.config.amountKES || 250} bonus to ${payload.userId}`);
          break;
        }
        default:
          break;
      }
    } catch (err) {
      console.error(`[Automation Action Failed] ${action.type}`, err);
    }
  }

  // Webhook Endpoints & Logs Management
  public getWebhooks(): WebhookEndpoint[] {
    try {
      const raw = localStorage.getItem(WEBHOOKS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : DefaultWebhooks;
    } catch (e) {
      return DefaultWebhooks;
    }
  }

  public saveWebhooks(endpoints: WebhookEndpoint[]) {
    localStorage.setItem(WEBHOOKS_STORAGE_KEY, JSON.stringify(endpoints));
  }

  public getWebhookLogs(): WebhookLog[] {
    try {
      const raw = localStorage.getItem(WEBHOOK_LOGS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : this.generateInitialLogs();
    } catch (e) {
      return this.generateInitialLogs();
    }
  }

  public saveWebhookLogs(logs: WebhookLog[]) {
    localStorage.setItem(WEBHOOK_LOGS_STORAGE_KEY, JSON.stringify(logs.slice(0, 50)));
  }

  private async dispatchWebhooksForEvent(event: WorkflowTrigger, payload: any) {
    const webhooks = this.getWebhooks().filter((w) => w.enabled && w.events.includes(event));
    for (const wh of webhooks) {
      await this.postWebhookPayload(wh.url, wh.id, event, payload, wh.name);
    }
  }

  public async postWebhookPayload(url: string, webhookId: string, event: WorkflowTrigger, payload: any, webhookName = 'Custom Outgoing Webhook'): Promise<WebhookLog> {
    await new Promise((r) => setTimeout(r, 400)); // Simulate HTTP POST request

    const isSuccess = Math.random() > 0.05; // 95% success rate simulation
    const log: WebhookLog = {
      id: 'log_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      webhookId,
      webhookName,
      event,
      url,
      requestPayload: payload,
      responseStatus: isSuccess ? 200 : 502,
      responseBody: isSuccess ? JSON.stringify({ status: 'received', timestamp: Date.now() }) : 'Bad Gateway / Timeout',
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      timestamp: new Date().toISOString(),
      retryCount: 0
    };

    const existing = this.getWebhookLogs();
    this.saveWebhookLogs([log, ...existing]);
    return log;
  }

  public async retryWebhookLog(logId: string): Promise<WebhookLog | null> {
    const logs = this.getWebhookLogs();
    const target = logs.find((l) => l.id === logId);
    if (!target) return null;

    target.status = 'RETRYING';
    this.saveWebhookLogs(logs);

    await new Promise((r) => setTimeout(r, 600));

    target.status = 'SUCCESS';
    target.responseStatus = 200;
    target.responseBody = JSON.stringify({ status: 'retry_success', timestamp: Date.now() });
    target.retryCount += 1;

    this.saveWebhookLogs(logs);
    return target;
  }

  private generateInitialLogs(): WebhookLog[] {
    return [
      {
        id: 'log_init_1',
        webhookId: 'wh_1',
        webhookName: 'Make.com Discord & Telegram Bot Feed',
        event: 'CAMPAIGN_APPROVED',
        url: 'https://hook.eu1.make.com/clipkenya-viral-alerts',
        requestPayload: { campaignId: 'camp_204', brand: 'Safaricom M-Pesa', payoutKES: 15000 },
        responseStatus: 200,
        responseBody: '{"status": "ok"}',
        status: 'SUCCESS',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        retryCount: 0
      },
      {
        id: 'log_init_2',
        webhookId: 'wh_2',
        webhookName: 'Zapier Slack Brand Notifications Channel',
        event: 'WITHDRAWAL_COMPLETED',
        url: 'https://hooks.zapier.com/hooks/catch/912837/clipkenya',
        requestPayload: { mpesaReceipt: 'MP928374102', amountKES: 4500, phone: '+254712***890' },
        responseStatus: 502,
        responseBody: 'Gateway Timeout from target endpoint',
        status: 'FAILED',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        retryCount: 1
      }
    ];
  }
}

function triggerFromAction(action: WorkflowAction): WorkflowTrigger {
  return 'CAMPAIGN_APPROVED';
}

export const automationEngine = AutomationEngine.getInstance();
