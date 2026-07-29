/**
 * ClipKenya Enterprise AI Automation & Smart Workflow Engine
 * Powers Visual Node Workflows, AI Credits, Predictive Analytics, Badges & Recommendations
 */

export interface WorkflowNode {
  id: string;
  type: 'TRIGGER' | 'ACTION' | 'CONDITION' | 'DELAY' | 'AI_GENERATOR';
  title: string;
  category: string;
  config: Record<string, any>;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface VisualWorkflow {
  id: string;
  name: string;
  description: string;
  category: 'ONBOARDING' | 'BOUNTY' | 'CAMPAIGN' | 'FREELANCE' | 'ACADEMY' | 'WALLET';
  status: 'ACTIVE' | 'PAUSED' | 'DRAFT';
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  executionCount: number;
  successRatePercent: number;
  updatedAt: string;
}

export interface AiCreditUsage {
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  tierName: 'Free Starter' | 'Pro Creator' | 'Enterprise Brand';
  dailyLimit: number;
  resetDate: string;
}

export interface AiPromptHistoryItem {
  id: string;
  prompt: string;
  toolType: 'HOOK_WRITER' | 'SCRIPT_GEN' | 'HASHTAGS' | 'PROPOSAL_GEN' | 'CAMPAIGN_BRIEF' | 'BIO_WRITER';
  provider: 'Gemini 2.5 Flash' | 'ClipKenya AI Fine-Tuned' | 'DeepSeek R1';
  output: string;
  isFavorite: boolean;
  timestamp: string;
  creditsUsed: number;
}

export interface SmartRecommendation {
  id: string;
  title: string;
  category: 'CAMPAIGN' | 'CREATOR' | 'BOUNTY' | 'FREELANCER' | 'COURSE';
  matchScorePercent: number;
  reason: string;
  actionUrl: string;
  tags: string[];
}

export interface PredictiveAnalytics {
  predictedRevenueKES30Days: number;
  campaignSuccessRatePrediction: number;
  viralLikelihoodScore: number;
  bestPostingTimeEAT: string;
  topPerformingFormat: string;
  audienceEngagementGrowth: number;
}

export interface BadgeAward {
  id: string;
  badgeName: string;
  iconName: string;
  description: string;
  earnedAt: string;
  category: 'VIRAL' | 'EARNINGS' | 'ACADEMY' | 'TRUST';
}

const AI_CREDITS_KEY = 'clipkenya_ai_credits';
const AI_HISTORY_KEY = 'clipkenya_ai_history';
const VISUAL_WORKFLOWS_KEY = 'clipkenya_visual_workflows';

export const DefaultWorkflowTemplates: VisualWorkflow[] = [
  {
    id: 'wf_tpl_1',
    name: 'New Creator AI Welcome & Bounty Matcher',
    description: 'Triggers on user registration. Runs Gemini profile bio enhancer, generates welcome bonus, and pushes top 3 bounty recommendations.',
    category: 'ONBOARDING',
    status: 'ACTIVE',
    executionCount: 842,
    successRatePercent: 99.4,
    updatedAt: '2026-02-10T10:00:00Z',
    nodes: [
      { id: 'node_1', type: 'TRIGGER', title: 'User Registered', category: 'Auth', config: { event: 'USER_REGISTERED' }, position: { x: 50, y: 100 } },
      { id: 'node_2', type: 'AI_GENERATOR', title: 'Generate AI Bio & Tags', category: 'AI', config: { model: 'Gemini 2.5 Flash' }, position: { x: 300, y: 100 } },
      { id: 'node_3', type: 'ACTION', title: 'Award Welcome Badge', category: 'Gamification', config: { badge: 'First Step' }, position: { x: 550, y: 100 } },
      { id: 'node_4', type: 'ACTION', title: 'Send Push Notification', category: 'Messaging', config: { template: 'welcome_push' }, position: { x: 800, y: 100 } }
    ],
    edges: [
      { id: 'e1-2', source: 'node_1', target: 'node_2' },
      { id: 'e2-3', source: 'node_2', target: 'node_3' },
      { id: 'e3-4', source: 'node_3', target: 'node_4' }
    ]
  },
  {
    id: 'wf_tpl_2',
    name: 'Auto Clip Viral Review & Escrow Settlement',
    description: 'When a clipper submits a video, AI checks duration, aspect ratio, audio clarity, and auto-releases M-Pesa escrow upon brand confirmation.',
    category: 'BOUNTY',
    status: 'ACTIVE',
    executionCount: 1940,
    successRatePercent: 98.7,
    updatedAt: '2026-02-12T14:30:00Z',
    nodes: [
      { id: 'node_10', type: 'TRIGGER', title: 'New Clip Submitted', category: 'Bounties', config: { event: 'CLIP_SUBMITTED' }, position: { x: 50, y: 100 } },
      { id: 'node_11', type: 'CONDITION', title: 'Viral AI Score > 80%', category: 'Logic', config: { threshold: 80 }, position: { x: 300, y: 100 } },
      { id: 'node_12', type: 'ACTION', title: 'Notify Brand for Final Sign-off', category: 'Notifications', config: { channel: 'InApp + Email' }, position: { x: 550, y: 50 } },
      { id: 'node_13', type: 'ACTION', title: 'Instant M-Pesa Disbursal', category: 'Finance', config: { provider: 'M-Pesa Daraja B2C' }, position: { x: 800, y: 50 } }
    ],
    edges: [
      { id: 'e10-11', source: 'node_10', target: 'node_11' },
      { id: 'e11-12', source: 'node_11', target: 'node_12', label: 'True' },
      { id: 'e12-13', source: 'node_12', target: 'node_13' }
    ]
  },
  {
    id: 'wf_tpl_3',
    name: 'UGC Campaign Auto Brief & Creator Matchmaker',
    description: 'Auto-generates TikTok hook ideas when a brand launches a campaign and matches top 10 relevant UGC creators in Nairobi.',
    category: 'CAMPAIGN',
    status: 'ACTIVE',
    executionCount: 420,
    successRatePercent: 100,
    updatedAt: '2026-02-14T09:15:00Z',
    nodes: [
      { id: 'node_20', type: 'TRIGGER', title: 'Campaign Created', category: 'Campaigns', config: { event: 'CAMPAIGN_CREATED' }, position: { x: 50, y: 100 } },
      { id: 'node_21', type: 'AI_GENERATOR', title: 'Generate 5 Viral Hooks', category: 'AI', config: { topic: 'UGC Guidelines' }, position: { x: 300, y: 100 } },
      { id: 'node_22', type: 'ACTION', title: 'Match Top Creators', category: 'Recommendation', config: { limit: 10 }, position: { x: 550, y: 100 } }
    ],
    edges: [
      { id: 'e20-21', source: 'node_20', target: 'node_21' },
      { id: 'e21-22', source: 'node_21', target: 'node_22' }
    ]
  },
  {
    id: 'wf_tpl_4',
    name: 'Course Completion Certificate & NFT Badge',
    description: 'Generates PDF Certificate and awards Academy Scholar Badge upon passing final quiz.',
    category: 'ACADEMY',
    status: 'ACTIVE',
    executionCount: 312,
    successRatePercent: 100,
    updatedAt: '2026-02-15T11:00:00Z',
    nodes: [
      { id: 'node_30', type: 'TRIGGER', title: 'Course Completed', category: 'Academy', config: { event: 'COURSE_COMPLETED' }, position: { x: 50, y: 100 } },
      { id: 'node_31', type: 'ACTION', title: 'Generate Certificate PDF', category: 'Documents', config: { template: 'gold_cert' }, position: { x: 300, y: 100 } },
      { id: 'node_32', type: 'ACTION', title: 'Award Academy Scholar Badge', category: 'Gamification', config: { badge: 'Academy Graduate' }, position: { x: 550, y: 100 } }
    ],
    edges: [
      { id: 'e30-31', source: 'node_30', target: 'node_31' },
      { id: 'e31-32', source: 'node_31', target: 'node_32' }
    ]
  }
];

export class EnterpriseAiEngine {
  private static instance: EnterpriseAiEngine;

  private constructor() {}

  public static getInstance(): EnterpriseAiEngine {
    if (!EnterpriseAiEngine.instance) {
      EnterpriseAiEngine.instance = new EnterpriseAiEngine();
    }
    return EnterpriseAiEngine.instance;
  }

  // Credits Management
  public getAiCredits(): AiCreditUsage {
    try {
      const raw = localStorage.getItem(AI_CREDITS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}

    return {
      totalCredits: 1000,
      usedCredits: 245,
      remainingCredits: 755,
      tierName: 'Pro Creator',
      dailyLimit: 200,
      resetDate: '2026-08-01'
    };
  }

  public deductCredits(amount: number): AiCreditUsage {
    const credits = this.getAiCredits();
    credits.usedCredits += amount;
    credits.remainingCredits = Math.max(0, credits.totalCredits - credits.usedCredits);
    localStorage.setItem(AI_CREDITS_KEY, JSON.stringify(credits));
    return credits;
  }

  // Prompt History Management
  public getHistory(): AiPromptHistoryItem[] {
    try {
      const raw = localStorage.getItem(AI_HISTORY_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}

    return [
      {
        id: 'hist_1',
        prompt: 'Generate 3 high-retention viral hooks for a tech review of the new M-Pesa merchant app.',
        toolType: 'HOOK_WRITER',
        provider: 'Gemini 2.5 Flash',
        output: '1. "Stop paying extra M-Pesa fees! Here is the secret merchants use..."\n2. "If you run a shop in Nairobi, this 1 update changes everything."\n3. "I tested Safaricom\'s newest feature for 7 days. Here is what happened."',
        isFavorite: true,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        creditsUsed: 5
      },
      {
        id: 'hist_2',
        prompt: 'Write a persuasive freelance video editor proposal for a 30-day TikTok editing retainer.',
        toolType: 'PROPOSAL_GEN',
        provider: 'Gemini 2.5 Flash',
        output: 'Hi! I specialize in high-pacing 9:16 short clips with motion subtitles, sound FX, and dynamic zooms. I have delivered 100+ clips in Nairobi. Let us collaborate!',
        isFavorite: false,
        timestamp: new Date(Date.now() - 18000000).toISOString(),
        creditsUsed: 8
      }
    ];
  }

  public saveHistoryItem(item: Omit<AiPromptHistoryItem, 'id' | 'timestamp'>): AiPromptHistoryItem[] {
    const history = this.getHistory();
    const newEntry: AiPromptHistoryItem = {
      ...item,
      id: 'hist_' + Date.now(),
      timestamp: new Date().toISOString()
    };
    const updated = [newEntry, ...history];
    localStorage.setItem(AI_HISTORY_KEY, JSON.stringify(updated.slice(0, 50)));
    this.deductCredits(item.creditsUsed || 5);
    return updated;
  }

  public toggleFavoriteHistory(id: string): AiPromptHistoryItem[] {
    const history = this.getHistory();
    const updated = history.map((h) => (h.id === id ? { ...h, isFavorite: !h.isFavorite } : h));
    localStorage.setItem(AI_HISTORY_KEY, JSON.stringify(updated));
    return updated;
  }

  // Visual Workflows Management
  public getVisualWorkflows(): VisualWorkflow[] {
    try {
      const raw = localStorage.getItem(VISUAL_WORKFLOWS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}

    return DefaultWorkflowTemplates;
  }

  public saveVisualWorkflows(workflows: VisualWorkflow[]) {
    localStorage.setItem(VISUAL_WORKFLOWS_KEY, JSON.stringify(workflows));
  }

  public addWorkflow(flow: Omit<VisualWorkflow, 'id' | 'updatedAt' | 'executionCount' | 'successRatePercent'>): VisualWorkflow[] {
    const list = this.getVisualWorkflows();
    const newEntry: VisualWorkflow = {
      ...flow,
      id: 'wf_' + Date.now(),
      updatedAt: new Date().toISOString(),
      executionCount: 0,
      successRatePercent: 100
    };
    const updated = [newEntry, ...list];
    this.saveVisualWorkflows(updated);
    return updated;
  }

  // Smart Predictive Analytics & Recommendations Generator
  public getPredictiveAnalytics(): PredictiveAnalytics {
    return {
      predictedRevenueKES30Days: 185000,
      campaignSuccessRatePrediction: 94.2,
      viralLikelihoodScore: 88,
      bestPostingTimeEAT: '6:30 PM - 8:45 PM EAT',
      topPerformingFormat: 'TikTok 9:16 Fast Cuts + Swahili Captions',
      audienceEngagementGrowth: 28.5
    };
  }

  public getSmartRecommendations(): SmartRecommendation[] {
    return [
      {
        id: 'rec_1',
        title: 'M-Pesa 10M Clip Bounty Challenge',
        category: 'BOUNTY',
        matchScorePercent: 98,
        reason: 'Matches your top tech/finance video clipping style with instant KES 15,000 payout.',
        actionUrl: '/?tab=clipping',
        tags: ['High Pay', 'Instant M-Pesa', 'Verified Brand']
      },
      {
        id: 'rec_2',
        title: 'Safaricom UGC Brand Creator Retainer',
        category: 'CAMPAIGN',
        matchScorePercent: 94,
        reason: 'Seeking Nairobi-based creators with >10k TikTok followers for 3 monthly videos.',
        actionUrl: '/?tab=ugc',
        tags: ['UGC Brand', 'Long-term', 'Escrow Locked']
      },
      {
        id: 'rec_3',
        title: 'Mastering CapCut & Motion Graphics for TikTok',
        category: 'COURSE',
        matchScorePercent: 91,
        reason: 'Recommended based on your recent clip submissions to boost viewer retention.',
        actionUrl: '/?tab=academy',
        tags: ['Academy', 'Certification', 'Free for Pros']
      }
    ];
  }

  // Badges & Achievements Engine
  public getUserBadges(): BadgeAward[] {
    return [
      {
        id: 'badge_1',
        badgeName: 'First Clip Approved',
        iconName: 'Scissors',
        description: 'Successfully created and delivered your first viral clip bounty.',
        earnedAt: '2026-01-12',
        category: 'VIRAL'
      },
      {
        id: 'badge_2',
        badgeName: 'Top M-Pesa Earner',
        iconName: 'Wallet',
        description: 'Earned over KES 50,000 in creator payouts on ClipKenya.',
        earnedAt: '2026-02-01',
        category: 'EARNINGS'
      },
      {
        id: 'badge_3',
        badgeName: 'Verified Pro Creator',
        iconName: 'ShieldCheck',
        description: 'Completed KYC verification and passed quality standards.',
        earnedAt: '2026-02-10',
        category: 'TRUST'
      },
      {
        id: 'badge_4',
        badgeName: 'Academy Certified Master',
        iconName: 'GraduationCap',
        description: 'Graduated from ClipKenya Viral Short Form Masterclass.',
        earnedAt: '2026-02-14',
        category: 'ACADEMY'
      }
    ];
  }
}

export const enterpriseAiEngine = EnterpriseAiEngine.getInstance();
