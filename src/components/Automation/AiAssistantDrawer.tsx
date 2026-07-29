import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  Copy,
  Star,
  History,
  Zap,
  Film,
  FileText,
  Hash,
  User,
  X,
  Check,
  RefreshCw,
  Coins
} from 'lucide-react';
import {
  enterpriseAiEngine,
  AiPromptHistoryItem,
  AiCreditUsage
} from '../../services/enterpriseAiEngine';
import { useToast } from '../../context/ToastContext';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<'GENERATOR' | 'HISTORY'>('GENERATOR');
  const [toolType, setToolType] = useState<AiPromptHistoryItem['toolType']>('HOOK_WRITER');
  const [provider, setProvider] = useState<'Gemini 2.5 Flash' | 'ClipKenya AI Fine-Tuned' | 'DeepSeek R1'>('Gemini 2.5 Flash');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState('');

  const [history, setHistory] = useState<AiPromptHistoryItem[]>(enterpriseAiEngine.getHistory());
  const [credits, setCredits] = useState<AiCreditUsage>(enterpriseAiEngine.getAiCredits());

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    addToast(`Calling ${provider}...`, 'info');

    // Simulate AI Generation tailored to Kenya creator economy
    setTimeout(() => {
      let output = '';

      if (toolType === 'HOOK_WRITER') {
        output = `🔥 TOP 3 VIRAL TIKTOK HOOKS:\n1. "Don't post your next video until you fix this ONE mistake Nairobi creators make!"\n2. "How I made KES 45,000 clipping 15-second tech videos on ClipKenya last week."\n3. "If you live in Westlands or Kilimani, Safaricom just updated this feature..."`;
      } else if (toolType === 'SCRIPT_GEN') {
        output = `🎬 30-SECOND REEL SCRIPT:\n[0:00 - 0:03] Fast Cut: Point to screen with sound FX.\n[0:03 - 0:12] Voiceover: "Finding high paying clip bounties in Kenya used to be tough. Here is how M-Pesa instant payouts work on ClipKenya."\n[0:12 - 0:25] B-Roll: Show live screen recording of wallet balance moving from KES 0 to KES 12,500.\n[0:25 - 0:30] CTA: "Tap link in bio to start clipping today!"`;
      } else if (toolType === 'HASHTAGS') {
        output = `#ClipKenya #NairobiCreators #TikTokKenya #MpesaBounty #KenyaShorts #VideoEditingKenya #TechNairobi #ViralClips #CreatorEconomyKE`;
      } else if (toolType === 'PROPOSAL_GEN') {
        output = `Hi! I reviewed your campaign brief. As a professional short-form editor based in Nairobi, I deliver fast-paced 9:16 vertical cuts with dynamic motion subtitles, audio FX, and high retention pacing. I can deliver 10 clips per week with instant revisions. Let us get started!`;
      } else {
        output = `✨ ENHANCED CREATOR BIO:\n"🎥 Top 1% Video Clipper & UGC Creator in Nairobi\n🚀 2.5M+ Views Generated for KE Brands\n💰 M-Pesa Instant Verified • Bookings Open Below 👇"`;
      }

      setGeneratedOutput(output);
      setIsGenerating(false);

      // Save to history & deduct credits
      const updatedHistory = enterpriseAiEngine.saveHistoryItem({
        prompt,
        toolType,
        provider,
        output,
        isFavorite: false,
        creditsUsed: 5
      });

      setHistory(updatedHistory);
      setCredits(enterpriseAiEngine.getAiCredits());
      addToast('AI Generation Complete! 5 AI Credits deducted.', 'success');
    }, 1200);
  };

  const handleToggleFavorite = (id: string) => {
    const updated = enterpriseAiEngine.toggleFavoriteHistory(id);
    setHistory(updated);
    addToast('Favorite status updated!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end transition-all">
      <div className="w-full max-w-xl bg-slate-900 border-l border-slate-800 text-white flex flex-col h-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold flex items-center gap-2">
                ClipKenya AI Assistant
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Gemini 2.5 Flash
                </span>
              </h2>
              <p className="text-xs text-slate-400">Generate viral hooks, captions, proposals, and campaign briefs</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Credits Banner */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-indigo-300 font-bold">
            <Coins className="w-4 h-4 text-amber-400" />
            Remaining Credits: {credits.remainingCredits} / {credits.totalCredits}
          </div>
          <span className="text-slate-400 text-[11px]">Tier: {credits.tierName}</span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/50">
          <button
            onClick={() => setActiveTab('GENERATOR')}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'GENERATOR'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI Generator Tool
          </button>
          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'HISTORY'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-4 h-4" />
            Prompt History ({history.length})
          </button>
        </div>

        {/* TAB 1: AI GENERATOR */}
        {activeTab === 'GENERATOR' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Tool Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">Select AI Copilot Tool</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'HOOK_WRITER', label: 'Viral TikTok Hooks', icon: Film },
                  { id: 'SCRIPT_GEN', label: '30s Reel Script', icon: FileText },
                  { id: 'HASHTAGS', label: 'SEO Hashtags', icon: Hash },
                  { id: 'PROPOSAL_GEN', label: 'Freelancer Proposal', icon: Send },
                  { id: 'BIO_WRITER', label: 'Creator Bio Enhancer', icon: User }
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setToolType(t.id as any)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all ${
                        toolType === t.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-indigo-400" />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Provider Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">AI Engine Provider</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              >
                <option value="Gemini 2.5 Flash">Gemini 2.5 Flash (Ultra High Speed)</option>
                <option value="ClipKenya AI Fine-Tuned">ClipKenya Fine-Tuned (Kenyan Slang & Swahili)</option>
                <option value="DeepSeek R1">DeepSeek R1 (Deep Campaign Reasoning)</option>
              </select>
            </div>

            {/* Input Form */}
            <form onSubmit={handleGenerate} className="space-y-3">
              <label className="text-xs font-bold text-slate-300 block">Prompt / Context Details</label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Create viral hook ideas for an M-Pesa clipping campaign targeting young tech creators in Nairobi..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />

              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Generating Output...' : 'Generate with AI (5 Credits)'}
              </button>
            </form>

            {/* Output Card */}
            {generatedOutput && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-indigo-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Generated AI Result
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedOutput);
                      addToast('Output copied to clipboard!', 'info');
                    }}
                    className="flex items-center gap-1 text-slate-400 hover:text-white font-bold"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {generatedOutput}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROMPT HISTORY */}
        {activeTab === 'HISTORY' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-400">{item.toolType}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleFavorite(item.id)}
                      className={`p-1 rounded ${
                        item.isFavorite ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                    <span className="text-[10px] text-slate-500">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-medium italic">"{item.prompt}"</p>

                <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-200 font-mono whitespace-pre-wrap">
                  {item.output}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
