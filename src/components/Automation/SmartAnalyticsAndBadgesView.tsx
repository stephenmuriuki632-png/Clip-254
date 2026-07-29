import React from 'react';
import {
  TrendingUp,
  Award,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Clock,
  ExternalLink,
  ShieldCheck,
  Scissors,
  Wallet,
  GraduationCap
} from 'lucide-react';
import {
  enterpriseAiEngine,
  PredictiveAnalytics,
  SmartRecommendation,
  BadgeAward
} from '../../services/enterpriseAiEngine';
import { useToast } from '../../context/ToastContext';

export const SmartAnalyticsAndBadgesView: React.FC = () => {
  const { addToast } = useToast();

  const analytics: PredictiveAnalytics = enterpriseAiEngine.getPredictiveAnalytics();
  const recommendations: SmartRecommendation[] = enterpriseAiEngine.getSmartRecommendations();
  const badges: BadgeAward[] = enterpriseAiEngine.getUserBadges();

  const getBadgeIcon = (name: string) => {
    switch (name) {
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-amber-400" />;
      case 'Wallet':
        return <Wallet className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
      default:
        return <GraduationCap className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: PREDICTIVE ANALYTICS */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">AI Smart Predictive Analytics</h3>
              <p className="text-xs text-slate-400">ML algorithms predicting revenue growth, posting times, and clip virality</p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            Model Accuracy: 96.4%
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-xs font-semibold">Predicted 30-Day Earnings</span>
            <div className="text-2xl font-black text-emerald-400">
              KES {analytics.predictedRevenueKES30Days.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-500 font-bold">+28.5% project growth</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-xs font-semibold">Viral Likelihood Index</span>
            <div className="text-2xl font-black text-indigo-400">
              {analytics.viralLikelihoodScore} / 100
            </div>
            <span className="text-[10px] text-indigo-300 font-bold">High retention pacing detected</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-xs font-semibold">Best Posting Window (EAT)</span>
            <div className="text-sm font-extrabold text-amber-400 flex items-center gap-1.5 pt-1">
              <Clock className="w-4 h-4" />
              {analytics.bestPostingTimeEAT}
            </div>
            <span className="text-[10px] text-slate-400">Peak TikTok/Reels engagement</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-xs font-semibold">Top Performing Format</span>
            <div className="text-xs font-bold text-sky-300 pt-1">
              {analytics.topPerformingFormat}
            </div>
            <span className="text-[10px] text-slate-400">Subtitles + Motion cuts</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: SMART RECOMMENDATIONS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">AI Smart Matches & Recommendations</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {rec.matchScorePercent}% Match
                </span>
                <span className="text-[11px] font-bold text-slate-500 uppercase">{rec.category}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{rec.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{rec.reason}</p>

              <div className="flex flex-wrap gap-1.5">
                {rec.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => addToast(`Opening recommendation: ${rec.title}`, 'info')}
                className="w-full py-2 rounded-xl bg-indigo-600/10 hover:bg-indigo-600 text-indigo-600 dark:text-indigo-400 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                Explore Match
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: AUTOMATED BADGES & ACHIEVEMENTS */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold">Automated Badges & Achievements</h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">{badges.length} Badges Unlocked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                {getBadgeIcon(badge.iconName)}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">{badge.badgeName}</h4>
                <p className="text-[11px] text-slate-400 leading-tight">{badge.description}</p>
                <span className="text-[9px] text-emerald-400 font-mono block">Unlocked: {badge.earnedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
