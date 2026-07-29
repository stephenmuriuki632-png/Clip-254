import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Hash,
  FileText,
  Copy,
  Check,
  RefreshCw,
  TrendingUp,
  Search,
  Flame,
  Award
} from 'lucide-react';

export const AIClipperAssistant: React.FC = () => {
  const [activeTool, setActiveTool] = useState<
    'title' | 'caption' | 'hashtag' | 'hook' | 'description' | 'viral_score' | 'seo'
  >('title');

  const [prompt, setPrompt] = useState('');
  const [niche, setNiche] = useState('Tech & Gadgets');
  const [platform, setPlatform] = useState('TikTok');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [viralScore, setViralScore] = useState<number | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setOutput(null);
    setViralScore(null);

    setTimeout(() => {
      setIsGenerating(false);

      if (activeTool === 'title') {
        setOutput(
          `1. 🔥 I Tested a $150 Wireless Mic in Nairobi Street Noise!\n2. 😱 Never Buy Cheap Mics Until You Watch THIS!\n3. 💸 $150 vs $15 Mic: The Street Noise Test\n4. 📱 Why Every Kenyan Creator is Buying THIS Mic in 2026\n5. 🤐 The Noise Cancellation Trick They Didn't Tell You!`
        );
      } else if (activeTool === 'caption') {
        setOutput(
          `Testing the $150 wireless mic right in the middle of Nairobi street noise! 🎤🔥 The noise cancellation left me speechles... Would you buy this? Drop your thoughts below! 👇\n\n#ClipKenya #TechTok #KenyaTech #NairobiEdits #CapCut`
        );
      } else if (activeTool === 'hashtag') {
        setOutput(
          `#ClipKenya #TechTok #KenyaTech #NairobiEdits #CapCutViral #ContentCreatorKE #AfricanTech #ShortsTrends #ViralKe #GadgetUnboxing`
        );
      } else if (activeTool === 'hook') {
        setOutput(
          `[First 3 Seconds Hook Script]:\n"Stop scrolling if you record videos on Nairobi streets! I took a $150 mic into the loudest matatu terminal..."`
        );
      } else if (activeTool === 'description') {
        setOutput(
          `In this 60-second video clip, we test the ultimate budget wireless microphone against heavy city noise in Nairobi. See real audio waveform comparisons and battery tests.`
        );
      } else if (activeTool === 'viral_score') {
        setViralScore(92);
        setOutput(
          `✅ High Curiosity Hook: Strong 3-second tension.\n✅ Trending Audio: Matatu street vibe soundscape matched.\n✅ High Contrast Captions: 100% readable.\n💡 Tip: Add a 0.5s zoom transition at second 0:04 to boost retention by 14%.`
        );
      } else if (activeTool === 'seo') {
        setOutput(
          `🔍 Primary Keywords: wireless mic Kenya, noise canceling microphone Nairobi, tech review 2026\n🔍 Alt Tags: CapCut audio filter tutorial, best clip editor Kenya`
        );
      }
    }, 1200);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3.5 h-3.5" /> AI Suite for Clippers
          </span>
          <h2 className="text-2xl font-black tracking-tight mt-2">
            AI Viral Video Assistant
          </h2>
          <p className="text-xs text-indigo-100 font-medium mt-1">
            Generate viral titles, hooks, captions, hashtags, and compute viral retention scores.
          </p>
        </div>
      </div>

      {/* Tool Selection Tabs */}
      <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'title', label: 'Title Generator', icon: Sparkles },
          { id: 'hook', label: '3-Sec Hook', icon: Flame },
          { id: 'caption', label: 'Caption Creator', icon: FileText },
          { id: 'hashtag', label: 'Viral Hashtags', icon: Hash },
          { id: 'description', label: 'Description', icon: Search },
          { id: 'viral_score', label: 'Viral Score (0-100)', icon: Award },
          { id: 'seo', label: 'SEO Optimizer', icon: TrendingUp }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveTool(t.id as any);
                setOutput(null);
                setViralScore(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTool === t.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Generator Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Form Inputs */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white capitalize flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" /> Generate {activeTool.replace('_', ' ')}
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                Video Topic / Context Prompt
              </label>
              <textarea
                rows={3}
                required
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Testing $150 wireless mic on Nairobi streets during heavy matatu noise..."
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Target Niche
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value="Tech & Gadgets">Tech & Gadgets</option>
                  <option value="Gaming & Esports">Gaming & Esports</option>
                  <option value="Comedy & Skits">Comedy & Skits</option>
                  <option value="Lifestyle & Vlogs">Lifestyle & Vlogs</option>
                  <option value="Business & Crypto">Business & Crypto</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> AI Synthesizing Suggestions...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Run AI Generator
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Output Display */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-500" /> Generated AI Output
              </h3>

              {output && (
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>

            {viralScore !== null && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                  {viralScore}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Predicted Viral Retention Score</h4>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                    Top 5% potential on TikTok & YouTube Shorts algorithm.
                  </p>
                </div>
              </div>
            )}

            {output ? (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 font-mono whitespace-pre-line leading-relaxed">
                {output}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                Enter your topic prompt on the left and click "Run AI Generator" to produce instant viral assets.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
