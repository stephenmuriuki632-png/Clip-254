import React, { useState } from 'react';
import { Sparkles, Copy, Check, Video, FileText, Hash, Layers, RefreshCw, Zap } from 'lucide-react';

export const AIToolsSuite: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'hooks' | 'script' | 'captions' | 'brief'>('hooks');
  const [prompt, setPrompt] = useState('');
  const [niche, setNiche] = useState('Tech & Gadgets');
  const [platform, setPlatform] = useState('TikTok');
  const [language, setLanguage] = useState('English with Kenyan/Sheng touch');
  
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setAiResult(null);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeTool,
          prompt,
          niche,
          platform,
          language
        })
      });

      const data = await response.json();
      if (data.success) {
        setAiResult(data.result);
      } else {
        setAiResult('Error generating AI output. Please try again.');
      }
    } catch (error) {
      console.error('AI Generation error:', error);
      setAiResult('Server error while connecting to Gemini AI.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!aiResult) return;
    navigator.clipboard.writeText(aiResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-2xs">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold font-heading text-white flex items-center gap-2">
              <span>ClipKenya AI Creator Suite</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30 uppercase">
                Powered by Gemini
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Generate viral video hooks, 45-second scripts, captions with trending hashtags, and brand briefs tailored for African audiences.
            </p>
          </div>
        </div>

        {/* Tools Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {[
            { id: 'hooks', title: 'Viral Hook Generator', icon: Zap, desc: '5 Retention Hooks' },
            { id: 'script', title: 'TikTok Scriptwriter', icon: Video, desc: '45s Script + Visual Cues' },
            { id: 'captions', title: 'Captions & Hashtags', icon: Hash, desc: 'Local Tag Optimizer' },
            { id: 'brief', title: 'Brand Brief Maker', icon: Layers, desc: 'Professional UGC Brief' }
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTool(t.id as any);
                  setAiResult(null);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-2xs font-semibold'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-indigo-400'}`} />
                  <span className="text-xs font-semibold">{t.title}</span>
                </div>
                <p className="text-[10px] opacity-75">{t.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Generator Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <span>Configure AI Parameters</span>
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Video Topic / Product Name / Idea
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Unboxing $150 noise cancelling headphones in Nairobi traffic, or M-Pesa Global feature review..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Niche</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Tech & Gadgets">Tech & Gadgets</option>
                  <option value="Lifestyle & Travel">Lifestyle & Travel</option>
                  <option value="Business & Fintech">Business & Fintech</option>
                  <option value="Comedy & Entertainment">Comedy & Entertainment</option>
                  <option value="Beauty & Fashion">Beauty & Fashion</option>
                </select>
              </div>

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
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Language Style</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="English with Kenyan/Sheng touch">English + Kenyan Sheng Vibe</option>
                <option value="Pure English (Corporate)">Pure English (Corporate/Global)</option>
                <option value="Swahili & English Blend">Swahili & English Mix</option>
                <option value="Nigerian Pidgin & English">Nigerian Pidgin Blend</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Consulting Gemini AI Model...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate with Gemini AI</span>
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
                <span>AI Generated Output</span>
                {aiResult && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                    Ready
                  </span>
                )}
              </h3>

              {aiResult && (
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Result'}</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 animate-bounce">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Writing viral strategy for African audience...</p>
                <p className="text-[11px] text-slate-500">Optimizing hook retention and Sheng/English phrasing.</p>
              </div>
            ) : aiResult ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
                {aiResult}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400 text-xs space-y-2">
                <Zap className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p>Fill in the prompt on the left and click Generate.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 flex items-center justify-between mt-4">
            <span>Model: Gemini 2.5 Flash Server-Side API</span>
            <span>ClipKenya Creator Engine</span>
          </div>
        </div>

      </div>

    </div>
  );
};
