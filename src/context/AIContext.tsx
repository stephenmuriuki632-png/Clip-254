import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AIProvider, 
  AISettingsPreferences, 
  AIGeneratedItem, 
  AIUsageStats, 
  AIAuditLog 
} from '../types/ai';

interface AIContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedProvider: AIProvider;
  setSelectedProvider: (provider: AIProvider) => void;
  settings: AISettingsPreferences;
  updateSettings: (newSettings: Partial<AISettingsPreferences>) => Promise<void>;
  usageStats: AIUsageStats;
  deductCredits: (amount: number) => void;
  addCredits: (amount: number) => void;
  history: AIGeneratedItem[];
  saveToHistory: (item: Omit<AIGeneratedItem, 'id' | 'timestamp'>) => AIGeneratedItem;
  toggleFavorite: (id: string) => void;
  deleteHistoryItem: (id: string) => void;
  clearHistory: () => void;
  auditLogs: AIAuditLog[];
  refreshAuditLogs: () => Promise<void>;
  generateContent: (params: {
    toolId: string;
    prompt: string;
    niche?: string;
    platform?: string;
    language?: string;
    tone?: string;
    targetAudience?: string;
  }) => Promise<{ success: boolean; result: string; error?: string }>;
}

const DEFAULT_SETTINGS: AISettingsPreferences = {
  provider: 'gemini',
  temperature: 0.7,
  language: 'English with Kenyan/Sheng touch',
  tone: 'Energetic & Viral',
  outputLength: 'detailed',
  autoSaveHistory: true,
};

const DEFAULT_USAGE_STATS: AIUsageStats = {
  creditsRemaining: 480,
  totalCreditsAllocated: 500,
  totalGenerations: 24,
  favouriteCount: 5,
  tokensUsedThisMonth: 142800,
  topTools: [
    { toolId: 'hook_gen', count: 9 },
    { toolId: 'script_writer', count: 6 },
    { toolId: 'clip_finder', count: 4 },
    { toolId: 'viral_score', count: 3 },
    { toolId: 'caption_gen', count: 2 },
  ]
};

const INITIAL_HISTORY: AIGeneratedItem[] = [
  {
    id: 'hist-1',
    toolId: 'hook_gen',
    toolName: 'Viral Hook Generator',
    prompt: '5 viral hooks for unboxing tech gadgets in Nairobi',
    result: `1. [Visual: Rapid Zoom-in on face] "Stop scrolling! If you're in Kenya and want to earn from your phone, watch this right now."\n2. [Visual: Holding up smartphone showing earnings] "This single trick made me 25,000 KES in 48 hours without showing my face."\n3. [Visual: Pointing to text overlay] "Why are 90% of African creators missing out on brand deals in 2026?"`,
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    provider: 'gemini',
    creditsUsed: 10,
    isFavorite: true,
    category: 'content'
  },
  {
    id: 'hist-2',
    toolId: 'clip_finder',
    toolName: 'AI Clip Finder',
    prompt: 'Identify funny moments in 10min podcast episode about Nairobi tech startups',
    result: `Timestamp [01:12 - 01:45]: Founder explains paying rent in Bitcoin during M-Pesa downtime.\nTimestamp [04:30 - 05:10]: Host forgets investor name on live microphone.\nViral Score: 94/100`,
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    provider: 'gemini',
    creditsUsed: 25,
    isFavorite: true,
    category: 'clip'
  },
  {
    id: 'hist-3',
    toolId: 'viral_score',
    toolName: 'AI Viral Score',
    prompt: 'Analysis of 45s M-Pesa Global app unboxing reel',
    result: `Viral Score: 94/100 (God Tier)\nRetention at 30s: 74%\nEngagement Prediction: 18.5%\nPosting Window: 6:30 PM - 8:30 PM EAT`,
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    provider: 'gemini',
    creditsUsed: 15,
    isFavorite: false,
    category: 'growth'
  }
];

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProviderComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('gemini');
  const [settings, setSettings] = useState<AISettingsPreferences>(() => {
    const saved = localStorage.getItem('clipforge_ai_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [usageStats, setUsageStats] = useState<AIUsageStats>(() => {
    const saved = localStorage.getItem('clipforge_ai_usage');
    return saved ? JSON.parse(saved) : DEFAULT_USAGE_STATS;
  });

  const [history, setHistory] = useState<AIGeneratedItem[]>(() => {
    const saved = localStorage.getItem('clipforge_ai_history');
    return saved ? JSON.parse(saved) : INITIAL_HISTORY;
  });

  const [auditLogs, setAuditLogs] = useState<AIAuditLog[]>([]);

  useEffect(() => {
    localStorage.setItem('clipforge_ai_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('clipforge_ai_usage', JSON.stringify(usageStats));
  }, [usageStats]);

  useEffect(() => {
    localStorage.setItem('clipforge_ai_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    refreshAuditLogs();
  }, []);

  const refreshAuditLogs = async () => {
    try {
      const res = await fetch('/api/ai/audit-logs');
      const data = await res.json();
      if (data.success) {
        setAuditLogs(data.logs || []);
      }
    } catch (e) {
      console.error("Failed to fetch audit logs:", e);
    }
  };

  const updateSettings = async (newSettings: Partial<AISettingsPreferences>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    if (newSettings.provider) {
      setSelectedProvider(newSettings.provider);
    }
    try {
      await fetch('/api/ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.error("Failed to update AI config on server:", e);
    }
  };

  const deductCredits = (amount: number) => {
    setUsageStats(prev => ({
      ...prev,
      creditsRemaining: Math.max(0, prev.creditsRemaining - amount),
      totalGenerations: prev.totalGenerations + 1,
      tokensUsedThisMonth: prev.tokensUsedThisMonth + (amount * 1250)
    }));
  };

  const addCredits = (amount: number) => {
    setUsageStats(prev => ({
      ...prev,
      creditsRemaining: prev.creditsRemaining + amount,
      totalCreditsAllocated: prev.totalCreditsAllocated + amount
    }));
  };

  const saveToHistory = (item: Omit<AIGeneratedItem, 'id' | 'timestamp'>): AIGeneratedItem => {
    const newItem: AIGeneratedItem = {
      ...item,
      id: 'hist-' + Date.now(),
      timestamp: new Date().toISOString()
    };
    setHistory(prev => [newItem, ...prev]);
    return newItem;
  };

  const toggleFavorite = (id: string) => {
    setHistory(prev => prev.map(item => {
      if (item.id === id) {
        const nextFav = !item.isFavorite;
        setUsageStats(u => ({ ...u, favouriteCount: u.favouriteCount + (nextFav ? 1 : -1) }));
        return { ...item, isFavorite: nextFav };
      }
      return item;
    }));
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(i => i.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const generateContent = async (params: {
    toolId: string;
    prompt: string;
    niche?: string;
    platform?: string;
    language?: string;
    tone?: string;
    targetAudience?: string;
  }) => {
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          provider: selectedProvider,
          language: params.language || settings.language,
          tone: params.tone || settings.tone
        })
      });

      const data = await res.json();
      if (data.success) {
        deductCredits(data.creditsDeducted || 10);
        if (settings.autoSaveHistory) {
          saveToHistory({
            toolId: params.toolId,
            toolName: params.toolId.replace('_', ' ').toUpperCase(),
            prompt: params.prompt,
            result: data.result,
            provider: data.providerUsed || selectedProvider,
            creditsUsed: data.creditsDeducted || 10
          });
        }
        return { success: true, result: data.result };
      } else {
        return { success: false, result: '', error: data.error || 'Failed to generate output.' };
      }
    } catch (err: any) {
      console.error('AI Generate Error:', err);
      return { success: false, result: '', error: err.message || 'Server error connecting to AI Provider.' };
    }
  };

  return (
    <AIContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedProvider,
        setSelectedProvider,
        settings,
        updateSettings,
        usageStats,
        deductCredits,
        addCredits,
        history,
        saveToHistory,
        toggleFavorite,
        deleteHistoryItem,
        clearHistory,
        auditLogs,
        refreshAuditLogs,
        generateContent
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAISuite = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAISuite must be used within an AIProviderComponent');
  }
  return context;
};
