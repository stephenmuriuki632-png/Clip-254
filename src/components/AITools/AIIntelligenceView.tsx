import React, { useState } from 'react';
import { useAISuite } from '../../context/AIContext';
import { 
  BarChart3, 
  Search, 
  Sparkles, 
  MessageSquare, 
  Send, 
  Star, 
  TrendingUp, 
  Copy, 
  Check, 
  Bot, 
  User 
} from 'lucide-react';

export const AIIntelligenceView: React.FC<{ initialSubTool?: string }> = ({ initialSubTool = 'chat_assistant' }) => {
  const { generateContent } = useAISuite();
  const [activeSubTool, setActiveSubTool] = useState<string>(initialSubTool);
  const [prompt, setPrompt] = useState('How do I pricing my video clips for a 50,000 KES brand campaign on ClipKenya?');
  
  // Interactive Chat State
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'Jambo! 👋 I am your ClipKenya AI Strategy Assistant. Ask me anything about campaign briefs, M-Pesa escrow payments, video editing tips, Sheng caption localization, or creator growth!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const subTools = [
    { id: 'chat_assistant', name: 'AI Chat Assistant', desc: 'Ask Platform & Growth Questions', icon: MessageSquare },
    { id: 'search', name: 'AI Natural Search', desc: 'Find Campaigns & Creators in Kenya', icon: Search },
    { id: 'analytics', name: 'AI Strategic Analytics', desc: 'Best Posting Times & Revenue Predictions', icon: BarChart3 },
    { id: 'recommendations', name: 'AI Smart Recommendations', desc: 'Tailored Deals, Courses & Clippers', icon: Star },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setResult(null);

    const res = await generateContent({
      toolId: activeSubTool,
      prompt
    });

    if (res.success) {
      setResult(res.result);
    } else {
      setResult('Error generating intelligence output: ' + (res.error || 'Please try again'));
    }
    setLoading(false);
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    const res = await generateContent({
      toolId: 'chat_assistant',
      prompt: userText
    });

    if (res.success) {
      setChatMessages(prev => [...prev, { role: 'assistant', text: res.result }]);
    } else {
      setChatMessages(prev => [...prev, { role: 'assistant', text: 'Apologies, I encountered an error connecting to the AI model. Please try asking again!' }]);
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
              className={`p-4 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-indigo-500'}`} />
                <span className="text-xs font-bold">{st.name.replace('AI ', '')}</span>
              </div>
              <p className="text-[10px] opacity-75 truncate">{st.desc}</p>
            </button>
          );
        })}
      </div>

      {activeSubTool === 'chat_assistant' ? (
        /* Interactive Chat Assistant UI */
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xs overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">ClipKenya Built-in AI Assistant</h3>
                <p className="text-[10px] text-slate-300">Powered by Gemini 3.6 Flash • Real-time Platform Guidance</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
              Online
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-900">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 text-xs ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none font-mono'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-white shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 text-xs items-center text-slate-400">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <span>Thinking and analyzing platform strategy...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendChatMessage} className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
            <input
              type="text"
              placeholder="Ask about payments, viral hooks, M-Pesa escrow, or campaign tips..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !chatInput.trim()}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      ) : (
        /* Standard Output Interface for Search, Analytics & Recommendations */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Query Parameters</span>
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Natural Language Query
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder={
                    activeSubTool === 'search'
                      ? 'e.g. Find high-paying gaming campaigns in Nairobi or verified UGC creators in Kenya...'
                      : activeSubTool === 'analytics'
                      ? 'e.g. Provide strategic analytics and best posting times for a tech review channel...'
                      : 'e.g. Recommend active courses, clipping competitions, and brand deals...'
                  }
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Processing AI Search...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Execute Intelligence Tool</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
                <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Intelligence Results</span>
                </h3>

                {result && (
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                )}
              </div>

              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 animate-bounce">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Processing natural language query...</p>
                </div>
              ) : result ? (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
                  {result}
                </div>
              ) : (
                <div className="py-20 text-center text-slate-400 text-xs space-y-2">
                  <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                  <p>Type your query on the left and click Execute.</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 flex items-center justify-between mt-4">
              <span>ClipKenya Global Search & Intelligence</span>
              <span>Natural Language AI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
