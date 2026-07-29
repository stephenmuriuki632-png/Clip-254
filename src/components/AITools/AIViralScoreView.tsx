import React, { useState } from 'react';
import { useAISuite } from '../../context/AIContext';
import { TrendingUp, Sparkles, AlertCircle, Copy, Check, BarChart, Eye, Clock, Users, ArrowUpRight } from 'lucide-react';

export const AIViralScoreView: React.FC = () => {
  const { generateContent } = useAISuite();
  const [concept, setConcept] = useState('Unboxing $150 noise-cancelling headphones in Nairobi Matatu traffic');
  const [platform, setPlatform] = useState('TikTok');
  const [niche, setNiche] = useState('Tech & Lifestyle');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const fullPrompt = `Analyze video concept: "${concept}". Target Platform: ${platform}. Niche: ${niche}. Generate Viral Score, Engagement Score, Retention Prediction, Watch Time Prediction, Audience Match, Posting Recommendations, and Improvement Suggestions.`;

    const res = await generateContent({
      toolId: 'viral_score',
      prompt: fullPrompt,
      platform,
      niche
    });

    if (res.success) {
      setResult(res.result);
    } else {
      setResult('Error generating viral score analysis: ' + (res.error || 'Please try again'));
    }
    setLoading(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 border border-emerald-800 text-white flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-300" />
            <h2 className="text-xl font-extrabold font-heading">AI Predictive Viral Score</h2>
          </div>
          <p className="text-xs text-emerald-200">
            Simulate audience retention curves, engagement ratios, and watch-time drop-offs before filming or editing your short clips.
          </p>
        </div>
        <span className="hidden sm:inline-block text-xs font-bold px-3 py-1 bg-emerald-500/30 border border-emerald-400/40 rounded-full text-emerald-200">
          Costs 15 Credits
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Video Concept Input</span>
          </h3>

          <form onSubmit={handlePredict} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Video Title / Script / Hook Concept
              </label>
              <textarea
                required
                rows={4}
                placeholder="e.g. Opening with 'I bought this phone in Luthuli Avenue for 5k KES...' showing fast unboxing with Sheng audio overlay..."
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                  <option value="X Video">X (Twitter) Video</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Niche</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Tech & Lifestyle">Tech & Lifestyle</option>
                  <option value="Business & Finance">Business & Finance</option>
                  <option value="Comedy & Street Skits">Comedy & Street Skits</option>
                  <option value="Beauty & Fashion">Beauty & Fashion</option>
                  <option value="Food & Travel">Food & Travel</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Predicting Virality Metrics...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 text-emerald-200" />
                  <span>Run Predictive Virality Analysis</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Output Box */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Predicted Performance Report</span>
              </h3>

              {result && (
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Report'}</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 animate-bounce">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Evaluating East African creator retention benchmarks...</p>
                <p className="text-[11px] text-slate-500">Calculating watch-through prediction and audience match.</p>
              </div>
            ) : result ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
                {result}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400 text-xs space-y-2">
                <BarChart className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p>Fill in your video concept and click Run Predictive Virality Analysis.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 flex items-center justify-between mt-4">
            <span>ClipKenya Predictive Engine</span>
            <span>Target: {platform}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
