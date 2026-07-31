import React, { useState } from 'react';
import { useAISuite } from '../../context/AIContext';
import { 
  FileText, 
  Sparkles, 
  Hash, 
  Zap, 
  Copy, 
  Check, 
  Image as ImageIcon, 
  Type, 
  MessageSquare, 
  Layers, 
  SlidersHorizontal 
} from 'lucide-react';

export const AIContentToolsView: React.FC<{ initialSubTool?: string }> = ({ initialSubTool = 'hook_gen' }) => {
  const { generateContent } = useAISuite();
  const [activeSubTool, setActiveSubTool] = useState<string>(initialSubTool);
  const [prompt, setPrompt] = useState('');
  const [niche, setNiche] = useState('Tech & Gadgets');
  const [platform, setPlatform] = useState('TikTok');
  const [language, setLanguage] = useState('English with Kenyan/Sheng touch');
  const [tone, setTone] = useState('Energetic & Viral');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const subTools = [
    { id: 'hook_gen', name: 'AI Hook Generator', desc: '8 Retention Opening Hooks', icon: Zap },
    { id: 'script_writer', name: 'AI Script Writer', desc: '45s Script + Visual Cues', icon: FileText },
    { id: 'caption_gen', name: 'AI Caption Generator', desc: 'Multi-platform Captions', icon: MessageSquare },
    { id: 'title_gen', name: 'AI Title Generator', desc: 'Clickbait, SEO & Viral Titles', icon: Type },
    { id: 'hashtag_gen', name: 'AI Hashtag Generator', desc: 'Trending & Niche Hashtags', icon: Hash },
    { id: 'thumbnail_assistant', name: 'AI Thumbnail Assistant', desc: 'High-CTR Visual Ideas', icon: ImageIcon },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setResult(null);

    const res = await generateContent({
      toolId: activeSubTool,
      prompt,
      niche,
      platform,
      language,
      tone
    });

    if (res.success) {
      setResult(res.result);
    } else {
      setResult('Error generating content: ' + (res.error || 'Please try again'));
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
    <div className="space-y-6">
      {/* Subtool Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {subTools.map((st) => {
          const Icon = st.icon;
          const isActive = activeSubTool === st.id;
          return (
            <button
              key={st.id}
              onClick={() => {
                setActiveSubTool(st.id);
                setResult(null);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-indigo-500'}`} />
                <span className="text-xs font-bold truncate">{st.name.replace('AI ', '')}</span>
              </div>
              <p className="text-[10px] opacity-75 truncate">{st.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Main Generator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Parameters Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Configure AI Prompt</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900">
              10 Credits
            </span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Topic / Product / Core Idea
              </label>
              <textarea
                required
                rows={4}
                placeholder="e.g. Unboxing $150 noise-cancelling headphones in Nairobi traffic, or M-Pesa Global feature review..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
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
                  <option value="Facebook Video">Facebook Video</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Podcast">Podcast</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Niche</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Tech & Gadgets">Tech & Gadgets</option>
                  <option value="Lifestyle & Travel">Lifestyle & Travel</option>
                  <option value="Fintech & Business">Fintech & Business</option>
                  <option value="Comedy & Street Skits">Comedy & Street Skits</option>
                  <option value="Beauty & Fashion">Beauty & Fashion</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Language Style</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="English with Kenyan/Sheng touch">English + Sheng Vibe</option>
                  <option value="Pure English (Corporate)">Pure English (Corporate)</option>
                  <option value="Swahili & English Blend">Swahili & English Mix</option>
                  <option value="Nigerian Pidgin & English">Nigerian Pidgin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Energetic & Viral">Energetic & Viral</option>
                  <option value="Professional & Authoritative">Professional</option>
                  <option value="Conversational & Friendly">Conversational</option>
                  <option value="Persuasive & Sales">Sales / Persuasive</option>
                  <option value="Humorous & Witty">Humorous & Witty</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Consulting AI Engine...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Output</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>AI Output</span>
                {result && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                    Generated
                  </span>
                )}
              </h3>

              {result && (
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
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Writing viral content for African audiences...</p>
              </div>
            ) : result ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
                {result}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400 text-xs space-y-2">
                <Zap className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p>Fill in the parameters and click Generate Output.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 flex items-center justify-between mt-4">
            <span>ClipForge Content AI</span>
            <span>Target: {platform}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
