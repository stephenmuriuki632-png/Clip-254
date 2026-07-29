export type AIProvider = 
  | 'gemini'
  | 'openai'
  | 'claude'
  | 'deepseek'
  | 'llama'
  | 'mistral'
  | 'azure_openai';

export interface AISettingsPreferences {
  provider: AIProvider;
  temperature: number; // 0.1 to 1.0
  language: string;
  tone: string;
  outputLength: 'short' | 'medium' | 'detailed';
  autoSaveHistory: boolean;
  apiKeyOverride?: string;
}

export interface AIGeneratedItem {
  id: string;
  toolId: string;
  toolName: string;
  prompt: string;
  result: string;
  timestamp: string;
  provider: AIProvider;
  creditsUsed: number;
  isFavorite?: boolean;
  category?: string;
  metadata?: Record<string, any>;
}

export interface AIToolMeta {
  id: string;
  name: string;
  description: string;
  category: 'dashboard' | 'clip' | 'content' | 'growth' | 'profile' | 'intelligence' | 'history' | 'settings' | 'admin';
  icon: string;
  creditsCost: number;
  isPopular?: boolean;
  isNew?: boolean;
  disabled?: boolean;
  badge?: string;
}

export interface AIUsageStats {
  creditsRemaining: number;
  totalCreditsAllocated: number;
  totalGenerations: number;
  favouriteCount: number;
  tokensUsedThisMonth: number;
  topTools: { toolId: string; count: number }[];
}

export interface AIAuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  toolId: string;
  provider: AIProvider;
  promptSnippet: string;
  status: 'allowed' | 'flagged' | 'rate_limited';
  creditsDeducted: number;
}

export interface AIClipMoment {
  timestamp: string;
  type: 'viral' | 'emotional' | 'funny' | 'educational' | 'exciting';
  description: string;
  viralScore: number;
  clipTitle: string;
  recommendedCaption: string;
}

export interface AIViralScoreAnalysis {
  viralScore: number; // 0-100
  engagementScore: number;
  retentionPrediction: number; // e.g. 78% watch through 30s
  watchTimePrediction: string; // e.g. "42s avg on 60s video"
  audienceMatch: string;
  postingRecommendations: string[];
  improvementSuggestions: string[];
  hookStrengthRating: 'Weak' | 'Moderate' | 'Strong' | 'God Tier';
}

export interface AIResumeData {
  fullName: string;
  roleTitle: string;
  summary: string;
  style: 'Creative' | 'Corporate' | 'Freelancer' | 'UGC' | 'Portfolio';
  skills: string[];
  experiences: { title: string; company: string; period: string; bullets: string[] }[];
  education: { degree: string; institution: string; year: string }[];
  keyStats: string[];
}

export interface AIPortfolioData {
  creatorName: string;
  tagline: string;
  bio: string;
  skills: string[];
  featuredProjects: { title: string; category: string; views: string; image: string; link: string }[];
  achievements: string[];
  testimonials: { author: string; role: string; quote: string }[];
}
