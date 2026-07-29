import React from 'react';
import { AIProviderComponent, useAISuite } from '../../context/AIContext';
import { AIDashboardView } from './AIDashboardView';
import { AIClipFinderView } from './AIClipFinderView';
import { AIViralScoreView } from './AIViralScoreView';
import { AIContentToolsView } from './AIContentToolsView';
import { AIGrowthToolsView } from './AIGrowthToolsView';
import { AIPortfolioBuilderView } from './AIPortfolioBuilderView';
import { AIIntelligenceView } from './AIIntelligenceView';
import { AIHistoryView } from './AIHistoryView';
import { AISettingsView } from './AISettingsView';
import { AdminAIPanelView } from './AdminAIPanelView';
import { 
  Sparkles, 
  Video, 
  TrendingUp, 
  FileText, 
  Calendar, 
  Globe, 
  MessageSquare, 
  Clock, 
  Settings, 
  Shield, 
  LayoutDashboard,
  Zap
} from 'lucide-react';

const InnerAIToolsSuite: React.FC = () => {
  const { activeTab, setActiveTab, usageStats, selectedProvider } = useAISuite();

  const navItems = [
    { id: 'dashboard', label: 'AI Dashboard', icon: LayoutDashboard },
    { id: 'clip_finder', label: 'AI Clip Finder', icon: Video, badge: 'Viral' },
    { id: 'viral_score', label: 'AI Viral Score', icon: TrendingUp },
    { id: 'content_tools', label: 'Content Creation', icon: Zap },
    { id: 'growth_tools', label: 'Growth & SEO', icon: Calendar },
    { id: 'portfolio_tools', label: 'Career & Portfolio', icon: Globe },
    { id: 'intelligence', label: 'AI Intelligence & Chat', icon: MessageSquare },
    { id: 'history', label: 'Prompt History', icon: Clock },
    { id: 'settings', label: 'AI Engine Settings', icon: Settings },
    { id: 'admin', label: 'Admin AI Panel', icon: Shield },
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AIDashboardView />;
      case 'clip_finder':
        return <AIClipFinderView />;
      case 'viral_score':
        return <AIViralScoreView />;
      case 'content_tools':
      case 'hook_gen':
      case 'script_writer':
      case 'caption_gen':
      case 'title_gen':
      case 'hashtag_gen':
      case 'thumbnail_assistant':
        return <AIContentToolsView initialSubTool={activeTab === 'content_tools' ? 'hook_gen' : activeTab} />;
      case 'growth_tools':
      case 'content_calendar':
      case 'seo_assistant':
      case 'proposal_writer':
        return <AIGrowthToolsView initialSubTool={activeTab === 'growth_tools' ? 'content_calendar' : activeTab} />;
      case 'portfolio_tools':
      case 'resume_builder':
      case 'portfolio_builder':
      case 'bio_gen':
      case 'message_assistant':
        return <AIPortfolioBuilderView initialSubTool={activeTab === 'portfolio_tools' ? 'resume_builder' : activeTab} />;
      case 'intelligence':
      case 'chat_assistant':
      case 'search':
      case 'analytics':
      case 'recommendations':
        return <AIIntelligenceView initialSubTool={activeTab === 'intelligence' ? 'chat_assistant' : activeTab} />;
      case 'history':
        return <AIHistoryView />;
      case 'settings':
        return <AISettingsView />;
      case 'admin':
        return <AdminAIPanelView />;
      default:
        return <AIDashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 sm:p-6 rounded-3xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                  ClipKenya AI Suite
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  v3.6 Production
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AI Content Engine for African Creators, Clippers, UGC Strategists & Brands
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Provider: <strong className="text-indigo-600 dark:text-indigo-400 uppercase">{selectedProvider}</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{usageStats.creditsRemaining} Credits</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 rounded-2xl shadow-2xs overflow-x-auto flex items-center gap-1.5 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = 
              activeTab === item.id ||
              (item.id === 'content_tools' && ['hook_gen', 'script_writer', 'caption_gen', 'title_gen', 'hashtag_gen', 'thumbnail_assistant'].includes(activeTab)) ||
              (item.id === 'growth_tools' && ['content_calendar', 'seo_assistant', 'proposal_writer'].includes(activeTab)) ||
              (item.id === 'portfolio_tools' && ['resume_builder', 'portfolio_builder', 'bio_gen', 'message_assistant'].includes(activeTab)) ||
              (item.id === 'intelligence' && ['chat_assistant', 'search', 'analytics', 'recommendations'].includes(activeTab));

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-900 font-extrabold uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active View Container */}
        <div className="transition-all duration-300">
          {renderActiveView()}
        </div>

      </div>
    </div>
  );
};

export const AIToolsSuite: React.FC = () => {
  return (
    <AIProviderComponent>
      <InnerAIToolsSuite />
    </AIProviderComponent>
  );
};

export default AIToolsSuite;
