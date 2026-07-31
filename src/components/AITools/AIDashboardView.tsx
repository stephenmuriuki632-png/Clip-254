import React from 'react';
import { useAISuite } from '../../context/AIContext';
import { 
  Sparkles, 
  Zap, 
  Video, 
  BarChart3, 
  Search, 
  MessageSquare, 
  Calendar, 
  Award, 
  TrendingUp, 
  FileText, 
  Star, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Plus
} from 'lucide-react';

export const AIDashboardView: React.FC = () => {
  const { 
    setActiveTab, 
    usageStats, 
    history, 
    addCredits, 
    settings, 
    toggleFavorite 
  } = useAISuite();

  const creditPercentage = Math.round((usageStats.creditsRemaining / usageStats.totalCreditsAllocated) * 100);

  const quickTools = [
    { id: 'clip_finder', name: 'AI Clip Finder', desc: 'Detect viral & funny moments in long videos', icon: Video, color: 'bg-purple-500' },
    { id: 'viral_score', name: 'AI Viral Score', desc: 'Predict retention & watch time before posting', icon: TrendingUp, color: 'bg-emerald-500' },
    { id: 'hook_gen', name: 'AI Hook Generator', desc: 'Craft 8 opening hooks for TikTok/Reels', icon: Zap, color: 'bg-amber-500' },
    { id: 'script_writer', name: 'AI Scriptwriter', desc: 'Write 45s scripts with visual cues', icon: FileText, color: 'bg-indigo-500' },
    { id: 'chat_assistant', name: 'AI Chat Assistant', desc: 'Ask creator growth & pricing questions', icon: MessageSquare, color: 'bg-sky-500' },
    { id: 'search', name: 'AI Natural Search', desc: 'Find high-paying campaigns in Kenya', icon: Search, color: 'bg-pink-500' },
  ];

  const favorites = history.filter(item => item.isFavorite);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Active Provider: {settings.provider.toUpperCase()} (Gemini 3.6 Flash Engine)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              ClipForge AI Creator Suite 🚀
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Supercharge your short-form video workflow with 20+ specialized AI tools designed for African creators, clippers, UGC strategists, and brands.
            </p>
          </div>

          {/* Credits Widget */}
          <div className="bg-slate-800/90 border border-slate-700/80 p-5 rounded-2xl min-w-[260px] flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                AI Credits Remaining
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300">
                {creditPercentage}% Left
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{usageStats.creditsRemaining}</span>
              <span className="text-xs text-slate-400">/ {usageStats.totalCreditsAllocated} Credits</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${creditPercentage}%` }}
              />
            </div>

            <button
              onClick={() => addCredits(250)}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Top Up +250 AI Credits</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Generations</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            {usageStats.totalGenerations}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18% this week
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Saved Favorites</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            {usageStats.favouriteCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Ready for reuse</p>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Monthly AI Tokens</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            {(usageStats.tokensUsedThisMonth / 1000).toFixed(1)}k
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Token throughput</p>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Security & Limits</span>
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
            Protected
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Prompt Injection Shield Active</p>
        </div>
      </div>

      {/* Recommended & Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Recommended Tools</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 text-left transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${tool.color} flex items-center justify-center text-white shadow-2xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-medium">Fast Execution</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Favorite Results & Recent History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Favorites Column */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Favorite Saved Results</span>
            </h3>
            <button
              onClick={() => setActiveTab('history')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              View All
            </button>
          </div>

          {favorites.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No starred results yet. Click the star icon on generated outputs to save them here!</p>
          ) : (
            <div className="space-y-3">
              {favorites.slice(0, 3).map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{item.toolName}</span>
                    <button onClick={() => toggleFavorite(item.id)}>
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    </button>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">Prompt: "{item.prompt}"</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-mono line-clamp-2 bg-white dark:bg-slate-800 p-2 rounded border border-slate-100 dark:border-slate-700">
                    {item.result}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent History Column */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Recent AI Activity</span>
            </h3>
            <button
              onClick={() => setActiveTab('history')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              Full History
            </button>
          </div>

          <div className="space-y-3">
            {history.slice(0, 3).map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3">
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">{item.toolName}</span>
                  <p className="text-slate-600 dark:text-slate-300 line-clamp-1">"{item.prompt}"</p>
                  <span className="text-[10px] text-slate-400 block">{new Date(item.timestamp).toLocaleString()} • {item.provider.toUpperCase()}</span>
                </div>
                <button
                  onClick={() => setActiveTab(item.toolId)}
                  className="px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-bold text-[11px] whitespace-nowrap hover:bg-indigo-100 transition-colors"
                >
                  Reuse
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
