import React, { useState } from 'react';
import { useAISuite } from '../../context/AIContext';
import { FileText, UserCheck, MessageSquare, Globe, Sparkles, Copy, Check, Download, Layers } from 'lucide-react';

export const AIPortfolioBuilderView: React.FC<{ initialSubTool?: string }> = ({ initialSubTool = 'resume_builder' }) => {
  const { generateContent } = useAISuite();
  const [activeSubTool, setActiveSubTool] = useState<string>(initialSubTool);
  const [prompt, setPrompt] = useState('Alex Mwangi, Short-form Video Clipper & UGC Creator based in Nairobi, 3 years experience');
  const [style, setStyle] = useState('Creative');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const profileTools = [
    { id: 'resume_builder', name: 'AI Resume Builder', desc: 'Creative, Corporate & UGC Resumes', icon: FileText },
    { id: 'portfolio_builder', name: 'AI Portfolio Builder', desc: 'Auto-built Creator Portfolios', icon: Globe },
    { id: 'bio_gen', name: 'AI Bio Generator', desc: '5 Platform Bio Variations', icon: UserCheck },
    { id: 'message_assistant', name: 'AI Message Assistant', desc: 'Client & Negotiation Responses', icon: MessageSquare },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setResult(null);

    const res = await generateContent({
      toolId: activeSubTool,
      prompt: `Style: ${style}. Details: ${prompt}`,
      tone: style
    });

    if (res.success) {
      setResult(res.result);
    } else {
      setResult('Error building asset: ' + (res.error || 'Please try again'));
    }
    setLoading(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    if (!result) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>ClipForge AI Asset Export</title>
            <style>
              body { font-family: sans-serif; padding: 40px; line-height: 1.6; color: #1e293b; }
              h1, h2, h3 { color: #4f46e5; }
              pre { background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; font-family: monospace; }
            </style>
          </head>
          <body>
            <h2>ClipForge AI Creator Profile Asset</h2>
            <hr />
            <pre>${result.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Subtool Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {profileTools.map((pt) => {
          const Icon = pt.icon;
          const isActive = activeSubTool === pt.id;
          return (
            <button
              key={pt.id}
              onClick={() => {
                setActiveSubTool(pt.id);
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
                <span className="text-xs font-bold">{pt.name.replace('AI ', '')}</span>
              </div>
              <p className="text-[10px] opacity-75 truncate">{pt.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Profile Asset Inputs</span>
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Name, Skills, Experience & Deliverables Context
              </label>
              <textarea
                required
                rows={5}
                placeholder="e.g. Creator Name: Mercy Wanjiku. Role: UGC Beauty & Tech Creator. Key achievements: 1.2M TikTok views on M-Pesa campaign, CapCut expert..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Style / Persona Format</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Creative">Creative / High Impact</option>
                <option value="Corporate">Corporate / Executive</option>
                <option value="Freelancer">Freelancer & Clipper Focus</option>
                <option value="UGC Brand">UGC Brand Pitch Focus</option>
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
                  <span>Building Asset...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Profile Asset</span>
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
                <span>Generated Output</span>
              </h3>

              {result && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportPDF}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-300 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print / PDF</span>
                  </button>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 animate-bounce">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Constructing professional resume & portfolio...</p>
              </div>
            ) : result ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
                {result}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400 text-xs space-y-2">
                <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p>Provide your details and click Generate Profile Asset.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 flex items-center justify-between mt-4">
            <span>ClipForge Career Engine</span>
            <span>Exportable to PDF</span>
          </div>
        </div>

      </div>
    </div>
  );
};
