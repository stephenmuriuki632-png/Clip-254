import React, { useState } from 'react';
import {
  Zap,
  Globe,
  Key,
  Shield,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  Plus,
  RefreshCw,
  Sliders,
  Send,
  Mail,
  Smartphone,
  Video,
  CreditCard,
  Calendar,
  Layers,
  Search,
  ExternalLink,
  Code,
  Copy,
  Lock,
  ChevronRight,
  Database,
  Sparkles,
  Bot,
  TrendingUp,
  Award
} from 'lucide-react';
import { paymentRegistry } from '../../services/paymentAdapters';
import { emailRegistry } from '../../services/emailAdapters';
import { communicationRegistry } from '../../services/communicationAdapters';
import {
  automationEngine,
  AutomationWorkflow,
  WebhookEndpoint,
  WebhookLog,
  WorkflowTrigger,
  WorkflowActionType
} from '../../services/automationEngine';
import { SocialMediaManager } from '../../services/socialAndAnalyticsAdapters';
import { enterpriseAiEngine, VisualWorkflow } from '../../services/enterpriseAiEngine';
import { WorkflowBuilderModal } from '../Automation/WorkflowBuilderModal';
import { AiAssistantDrawer } from '../Automation/AiAssistantDrawer';
import { SmartAnalyticsAndBadgesView } from '../Automation/SmartAnalyticsAndBadgesView';
import { useToast } from '../../context/ToastContext';

type TabType = 'DIRECTORY' | 'WORKFLOWS' | 'SMART_AI' | 'WEBHOOKS' | 'API_KEYS';

export const IntegrationsAndAutomationHub: React.FC = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('DIRECTORY');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Integrations state
  const paymentAdapters = paymentRegistry.getAllAdapters();
  const emailAdapters = emailRegistry.getAllAdapters();
  const smsAdapters = communicationRegistry.getAllSmsAdapters();
  const pushAdapters = communicationRegistry.getAllPushAdapters();

  // Enterprise Visual Workflows & AI Assistant State
  const [visualWorkflows, setVisualWorkflows] = useState<VisualWorkflow[]>(enterpriseAiEngine.getVisualWorkflows());
  const [isVisualBuilderOpen, setIsVisualBuilderOpen] = useState(false);
  const [selectedVisualWorkflow, setSelectedVisualWorkflow] = useState<VisualWorkflow | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  // Workflow state
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(automationEngine.getWorkflows());
  const [isCreateWorkflowOpen, setIsCreateWorkflowOpen] = useState(false);
  const [newWorkflowTitle, setNewWorkflowTitle] = useState('');
  const [newWorkflowTrigger, setNewWorkflowTrigger] = useState<WorkflowTrigger>('CAMPAIGN_APPROVED');
  const [newWorkflowActionType, setNewWorkflowActionType] = useState<WorkflowActionType>('SEND_EMAIL');

  // Webhooks state
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>(automationEngine.getWebhooks());
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>(automationEngine.getWebhookLogs());
  const [isAddWebhookOpen, setIsAddWebhookOpen] = useState(false);
  const [newWebhookName, setNewWebhookName] = useState('');
  const [newWebhookUrl, setNewWebhookUrl] = useState('');

  // Config Modal State
  const [selectedProviderForConfig, setSelectedProviderForConfig] = useState<string | null>(null);
  const [providerApiKeyInput, setProviderApiKeyInput] = useState('');

  // API Key State
  const [apiKeys, setApiKeys] = useState([
    { id: 'key_1', name: 'Production Backend Server', key: 'ck_live_9f8a2b3c4d5e6f7a8b9c0d1e', created: '2026-01-10', lastUsed: '2 mins ago', permissions: 'Full Access' },
    { id: 'key_2', name: 'Make.com Automation Webhook Key', key: 'ck_live_3d2e1f0a9b8c7d6e5f4a3b2c', created: '2026-02-01', lastUsed: '1 hour ago', permissions: 'Read/Write' },
    { id: 'key_3', name: 'Stripe Escrow Webhook Secret', key: 'ck_test_7a8b9c0d1e2f3a4b5c6d7e8f', created: '2026-02-15', lastUsed: 'Yesterday', permissions: 'Webhook Only' }
  ]);
  const [isCreateApiKeyOpen, setIsCreateApiKeyOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  // Handlers
  const handleToggleWorkflow = (id: string) => {
    const updated = automationEngine.toggleWorkflow(id);
    setWorkflows(updated);
    addToast('Automation workflow status toggled', 'info');
  };

  const handleRunWorkflowSimulation = async (flow: AutomationWorkflow) => {
    addToast(`Simulating trigger for: ${flow.title}...`, 'info');
    await automationEngine.triggerEvent(flow.trigger, {
      userId: 'usr_kenya_88',
      userName: 'Amina Wanjiku',
      phone: '+254712345678',
      email: 'wanjiku.creator@clipforge.com',
      campaignTitle: 'M-Pesa 10M Viral Clip Challenge'
    });
    setWorkflows(automationEngine.getWorkflows());
    setWebhookLogs(automationEngine.getWebhookLogs());
    addToast('Workflow test execution completed successfully!', 'success');
  };

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkflowTitle) return;
    const updated = automationEngine.addWorkflow({
      title: newWorkflowTitle,
      description: `Automatically triggers ${newWorkflowActionType} when ${newWorkflowTrigger} occurs.`,
      trigger: newWorkflowTrigger,
      enabled: true,
      actions: [
        {
          id: 'act_' + Date.now(),
          type: newWorkflowActionType,
          config: { messageText: 'ClipForge Automation Alert' }
        }
      ]
    });
    setWorkflows(updated);
    setIsCreateWorkflowOpen(false);
    setNewWorkflowTitle('');
    addToast('New automation workflow created!', 'success');
  };

  const handleAddWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWebhookName || !newWebhookUrl) return;
    const newWh: WebhookEndpoint = {
      id: 'wh_' + Date.now(),
      name: newWebhookName,
      url: newWebhookUrl,
      events: ['CAMPAIGN_APPROVED', 'WITHDRAWAL_COMPLETED'],
      secretKey: 'whsec_' + Math.random().toString(36).substring(2, 12),
      enabled: true,
      createdAt: new Date().toISOString()
    };
    const updated = [newWh, ...webhooks];
    setWebhooks(updated);
    automationEngine.saveWebhooks(updated);
    setIsAddWebhookOpen(false);
    setNewWebhookName('');
    setNewWebhookUrl('');
    addToast('Outgoing Webhook endpoint added', 'success');
  };

  const handleRetryWebhook = async (logId: string) => {
    addToast('Retrying webhook dispatch...', 'info');
    await automationEngine.retryWebhookLog(logId);
    setWebhookLogs(automationEngine.getWebhookLogs());
    addToast('Webhook re-dispatched successfully!', 'success');
  };

  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    const newKey = {
      id: 'key_' + Date.now(),
      name: newKeyName,
      key: 'ck_live_' + Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions: 'Read/Write'
    };
    setApiKeys([newKey, ...apiKeys]);
    setIsCreateApiKeyOpen(false);
    setNewKeyName('');
    addToast('New API Secret Key generated successfully!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Zap className="w-64 h-64 text-indigo-400" />
        </div>
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            Enterprise Automation & Modular Adapters
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Integrations & Workflow Hub
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Connect ClipForge with global payment gateways, email/SMS services, cloud video streaming, social networks, and Zapier/Make-style automated workflow triggers.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('DIRECTORY')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'DIRECTORY'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Integrations Directory
          </button>

          <button
            onClick={() => setActiveTab('WORKFLOWS')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'WORKFLOWS'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            Automation Workflows ({workflows.filter((w) => w.enabled).length + visualWorkflows.length} Active)
          </button>

          <button
            onClick={() => setActiveTab('SMART_AI')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'SMART_AI'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Smart AI & Predictive Analytics
          </button>

          <button
            onClick={() => setActiveTab('WEBHOOKS')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'WEBHOOKS'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            Webhooks & Logs
          </button>

          <button
            onClick={() => setActiveTab('API_KEYS')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'API_KEYS'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Key className="w-4 h-4" />
            API Keys & Security
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAiAssistantOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-md shadow-indigo-600/20 hover:opacity-90 transition-all"
          >
            <Bot className="w-4 h-4" />
            AI Assistant Copilot
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Health: 100% Operational
          </div>
        </div>
      </div>

      {/* TAB 1: INTEGRATIONS DIRECTORY */}
      {activeTab === 'DIRECTORY' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search adapters (M-Pesa, Stripe, Resend, Twilio, Zoom, Mux)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {['ALL', 'PAYMENTS', 'EMAIL', 'SMS_PUSH', 'STORAGE_VIDEO', 'MEETINGS', 'SOCIAL'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {cat.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Adapters */}
          {(selectedCategory === 'ALL' || selectedCategory === 'PAYMENTS') && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                <CreditCard className="w-4 h-4 text-emerald-500" />
                Payment Gateways & Escrow Settlements
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paymentAdapters.map((adapter) => (
                  <div
                    key={adapter.providerId}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all space-y-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{adapter.providerName}</h3>
                          <span className="text-xs text-slate-500 dark:text-slate-400">ID: {adapter.providerId}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Active
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Supports instant deposits, payouts & escrow locks. Fee formula: Tiered.
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Activity className="w-3.5 h-3.5 text-emerald-500" />
                        Latency: ~120ms
                      </div>
                      <button
                        onClick={() => {
                          setSelectedProviderForConfig(adapter.providerName);
                          setProviderApiKeyInput('sk_live_mpesa_daraja_key');
                        }}
                        className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                      >
                        Configure API
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Email Adapters */}
          {(selectedCategory === 'ALL' || selectedCategory === 'EMAIL') && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                <Mail className="w-4 h-4 text-indigo-500" />
                Transactional Email Services
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {emailAdapters.map((adapter) => (
                  <div
                    key={adapter.providerId}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all space-y-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{adapter.providerName}</h3>
                          <span className="text-xs text-slate-500 dark:text-slate-400">ID: {adapter.providerId}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Connected
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      HTML Email templates for welcome, campaign approvals, withdrawal receipts, and security alerts.
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <span className="text-slate-500">Status: Healthy</span>
                      <button
                        onClick={() => {
                          setSelectedProviderForConfig(adapter.providerName);
                          setProviderApiKeyInput('re_123456789_resend_secret');
                        }}
                        className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                      >
                        Manage Settings
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SMS & Push Adapters */}
          {(selectedCategory === 'ALL' || selectedCategory === 'SMS_PUSH') && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                <Smartphone className="w-4 h-4 text-sky-500" />
                SMS & Web Push Notification Gateways
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...smsAdapters, ...pushAdapters].map((adapter) => (
                  <div
                    key={adapter.providerId}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all space-y-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{adapter.providerName}</h3>
                          <span className="text-xs text-slate-500 dark:text-slate-400">ID: {adapter.providerId}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Online
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      High-deliverability SMS alerts (+254 East Africa) and Web Push notifications.
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <span className="text-slate-500">Fast Relay</span>
                      <button
                        onClick={() => {
                          setSelectedProviderForConfig(adapter.providerName);
                          setProviderApiKeyInput('atsk_africas_talking_live_key');
                        }}
                        className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                      >
                        Configure Credentials
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AUTOMATION WORKFLOWS */}
      {activeTab === 'WORKFLOWS' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Zapier / Make Style Workflows</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Trigger-Condition-Action automation engine for instant payouts, notifications, and webhook web events.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedVisualWorkflow(null);
                  setIsVisualBuilderOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 hover:opacity-90 transition-all"
              >
                <Zap className="w-4 h-4" />
                Visual Node Builder
              </button>

              <button
                onClick={() => setIsCreateWorkflowOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-semibold text-xs border border-slate-700 hover:bg-slate-800 transition-all"
              >
                <Plus className="w-4 h-4" />
                Quick Automation Rule
              </button>
            </div>
          </div>

          {/* Visual Workflows Card Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-500" />
              Visual Node Workflows ({visualWorkflows.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visualWorkflows.map((flow) => (
                <div
                  key={flow.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all space-y-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {flow.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">{flow.name}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {flow.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{flow.description}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-mono">
                      Nodes: <strong className="text-indigo-600 dark:text-indigo-400">{flow.nodes.length}</strong> | Runs: <strong>{flow.executionCount}</strong>
                    </span>

                    <button
                      onClick={() => {
                        setSelectedVisualWorkflow(flow);
                        setIsVisualBuilderOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 text-indigo-600 dark:text-indigo-400 hover:text-white font-bold text-xs transition-all"
                    >
                      Open in Builder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Automation Rules */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Trigger-Action Rule Set ({workflows.length})
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {workflows.map((flow) => (
                <div
                  key={flow.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          flow.enabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                        }`}
                      />
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{flow.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        Trigger: {flow.trigger}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400">{flow.description}</p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {flow.actions.map((act, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                        >
                          <ChevronRight className="w-3 h-3 text-indigo-500" />
                          {act.type}
                        </span>
                      ))}
                    </div>

                    <div className="text-[11px] text-slate-400 space-x-3 pt-1">
                      <span>Executions: <strong>{flow.executionCount}</strong></span>
                      <span>•</span>
                      <span>Last Run: {flow.lastExecutedAt ? new Date(flow.lastExecutedAt).toLocaleString() : 'Never'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end">
                    <button
                      onClick={() => handleRunWorkflowSimulation(flow)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-all"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Run Test
                    </button>

                    <button
                      onClick={() => handleToggleWorkflow(flow.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        flow.enabled
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20'
                          : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20'
                      }`}
                    >
                      {flow.enabled ? 'Pause Workflow' : 'Enable Workflow'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SMART AI & PREDICTIVE ANALYTICS */}
      {activeTab === 'SMART_AI' && (
        <SmartAnalyticsAndBadgesView />
      )}

      {/* TAB 3: WEBHOOKS & LOGS */}
      {activeTab === 'WEBHOOKS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Outgoing Webhooks</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dispatch real-time JSON event payloads to external servers, Make.com, Zapier, or Discord channels.
              </p>
            </div>

            <button
              onClick={() => setIsAddWebhookOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Webhook Endpoint
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {webhooks.map((wh) => (
              <div
                key={wh.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{wh.name}</h3>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-600 dark:text-slate-400 truncate">
                  {wh.url}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Secret: <code className="text-indigo-500">{wh.secretKey}</code></span>
                  <span>Events: {wh.events.length}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Webhook Execution Logs */}
          <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-500" />
              Live Webhook Dispatch Logs
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                  <tr>
                    <th className="p-3">Status</th>
                    <th className="p-3">Endpoint Name</th>
                    <th className="p-3">Event</th>
                    <th className="p-3">HTTP Code</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {webhookLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3">
                        {log.status === 'SUCCESS' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK
                          </span>
                        ) : log.status === 'RETRYING' ? (
                          <span className="inline-flex items-center gap-1 text-amber-500 font-bold">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Retrying
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-500 font-bold">
                            <XCircle className="w-3.5 h-3.5" /> {log.responseStatus} Error
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">{log.webhookName}</td>
                      <td className="p-3 font-mono text-indigo-600 dark:text-indigo-400">{log.event}</td>
                      <td className="p-3 font-mono">{log.responseStatus}</td>
                      <td className="p-3 text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                      <td className="p-3 text-right">
                        {log.status === 'FAILED' && (
                          <button
                            onClick={() => handleRetryWebhook(log.id)}
                            className="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-[11px]"
                          >
                            Retry
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: API KEYS & SECURITY */}
      {activeTab === 'API_KEYS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">API Keys & Access Tokens</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage REST API secrets for external software, brand API integrations, and developer SDKs.
              </p>
            </div>

            <button
              onClick={() => setIsCreateApiKeyOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              Generate API Secret Key
            </button>
          </div>

          <div className="space-y-4">
            {apiKeys.map((k) => (
              <div
                key={k.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-indigo-500" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{k.name}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {k.permissions}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value={k.key}
                    readOnly
                    className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(k.key);
                      addToast('API key copied to clipboard!', 'info');
                    }}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Created: {k.created}</span>
                  <span>Last Used: {k.lastUsed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE WORKFLOW MODAL */}
      {isCreateWorkflowOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create Automation Workflow</h3>
            <form onSubmit={handleCreateWorkflow} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Workflow Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Disburse M-Pesa & Send Discord Alert"
                  value={newWorkflowTitle}
                  onChange={(e) => setNewWorkflowTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Trigger Event</label>
                <select
                  value={newWorkflowTrigger}
                  onChange={(e) => setNewWorkflowTrigger(e.target.value as WorkflowTrigger)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white"
                >
                  <option value="CAMPAIGN_APPROVED">When Campaign Deliverable is Approved</option>
                  <option value="WITHDRAWAL_COMPLETED">When M-Pesa Withdrawal is Completed</option>
                  <option value="USER_REGISTERED">When New Creator Registers</option>
                  <option value="REFERRAL_JOINED">When Referral Joins Platform</option>
                  <option value="COURSE_COMPLETED">When Academy Course is Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Action</label>
                <select
                  value={newWorkflowActionType}
                  onChange={(e) => setNewWorkflowActionType(e.target.value as WorkflowActionType)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white"
                >
                  <option value="SEND_EMAIL">Send HTML Email</option>
                  <option value="SEND_SMS">Send Africa's Talking SMS</option>
                  <option value="SEND_PUSH_NOTIFICATION">Send Web Push Notification</option>
                  <option value="DISPATCH_WEBHOOK">Post Outgoing Webhook</option>
                  <option value="CREDIT_WALLET_BONUS">Credit Wallet Bonus (KES 250)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateWorkflowOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                >
                  Save Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD WEBHOOK MODAL */}
      {isAddWebhookOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add Outgoing Webhook</h3>
            <form onSubmit={handleAddWebhook} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Endpoint Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Make.com Discord Channel Bot"
                  value={newWebhookName}
                  onChange={(e) => setNewWebhookName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Webhook URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://hook.make.com/your-target-endpoint"
                  value={newWebhookUrl}
                  onChange={(e) => setNewWebhookUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddWebhookOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                >
                  Create Endpoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE API KEY MODAL */}
      {isCreateApiKeyOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Generate API Secret Key</h3>
            <form onSubmit={handleCreateApiKey} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Key Name / Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Staging Server API Integration"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateApiKeyOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIGURE PROVIDER MODAL */}
      {selectedProviderForConfig && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Configure {selectedProviderForConfig} Credentials</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Live Secret API Key</label>
                <input
                  type="password"
                  value={providerApiKeyInput}
                  onChange={(e) => setProviderApiKeyInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedProviderForConfig(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  addToast(`${selectedProviderForConfig} credentials saved!`, 'success');
                  setSelectedProviderForConfig(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
              >
                Save Credentials
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VISUAL WORKFLOW BUILDER MODAL */}
      {isVisualBuilderOpen && (
        <WorkflowBuilderModal
          workflow={selectedVisualWorkflow}
          onClose={() => setIsVisualBuilderOpen(false)}
          onSave={(savedWf) => {
            const updated = enterpriseAiEngine.addWorkflow(savedWf);
            setVisualWorkflows(updated);
            setIsVisualBuilderOpen(false);
          }}
        />
      )}

      {/* AI ASSISTANT COPILOT DRAWER */}
      <AiAssistantDrawer
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
      />
    </div>
  );
};
