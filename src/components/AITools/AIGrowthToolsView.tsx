import React, { useState } from 'react';
import { useAISuite } from '../../context/AIContext';
import { Calendar, Search, FileText, Sparkles, Copy, Check, SlidersHorizontal, Zap } from 'lucide-react';

export const AIGrowthToolsView: React.FC<{ initialSubTool?: string }> = ({ initialSubTool = 'content_calendar' }) => {
  const { generateContent } = useAISuite();
  const [activeSubTool, setActiveSubTool] = useState<string>(initialSubTool);
  const [prompt, setPrompt] = useState('7-day viral video content plan for Nairobi tech & gadget creator');
  const [niche, setNiche] = useState('Tech & Lifestyle');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const growthTools = [
    { id: 'content_calendar', name: 'AI Content Calendar', desc: 'Daily, Weekly & Monthly Schedules', icon: Calendar },
    { id: 'seo_assistant', name: 'AI SEO Assistant', desc: 'Keywords, Meta Tags & Titles', icon: Search },
    { id: 'proposal_writer', name: 'AI Proposal Writer', desc: 'Brand Collaboration Pitches', icon: FileText },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setResult(null);

    const res = await generateContent({
      toolId: activeSubTool,
      prompt,
      niche
    });

    if (res.success) {
      setResult(res.result);
    } else {
      setResult('Error generating growth plan: ' + (res.error || 'Please try again'));
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
      {/* Subtool selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {growthTools.map((gt) => {
          const Icon = gt.icon;
          const isActive = activeSubTool === gt.id;
          return (
            <button
              key={gt.id}
              onClick={() => {
                setActiveSubTool(gt.id);
                setResult(null);
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-indigo-500'}`} />
                <span className="text-xs font-bold">{gt.name}</span>
              </div>
              <p className="text-[10px] opacity-75">{gt.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Growth Parameters</span>
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Goal / Brand Details / Proposal Target
              </label>
              <textarea
                required
                rows={4}
                placeholder="e.g. Write a 30,000 KES UGC campaign proposal for an e-commerce fashion brand launching in Nairobi..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Industry / Niche</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Tech & Lifestyle">Tech & Lifestyle</option>
                <option value="Fintech & Banking">Fintech & Banking</option>
                <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                <option value="Hospitality & Travel">Hospitality & Travel</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Generating Strategy...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Growth Asset</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>Growth Strategy Output</span>
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
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Building growth strategy & schedules...</p>
              </div>
            ) : result ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
                {result}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400 text-xs space-y-2">
                <Zap className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p>Fill in parameters and click Generate Growth Asset.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 flex items-center justify-between mt-4">
            <span>ClipKenya Growth Engine</span>
            <span>Strategic Optimization</span>
          </div>
        </div>

      </div>
    </div>
  );
};
