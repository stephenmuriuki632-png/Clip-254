import React, { useState } from 'react';
import { useAISuite } from '../../context/AIContext';
import { Video, Sparkles, Upload, Play, Clock, Copy, Check, Zap, Layers, Share2, Film } from 'lucide-react';

export const AIClipFinderView: React.FC = () => {
  const { generateContent } = useAISuite();
  const [url, setUrl] = useState('');
  const [prompt, setPrompt] = useState('Full length 15-minute tech unboxing and podcast discussion');
  const [minDuration, setMinDuration] = useState('30s');
  const [maxDuration, setMaxDuration] = useState('60s');
  const [focusArea, setFocusArea] = useState<'all' | 'funny' | 'viral' | 'emotional' | 'educational' | 'exciting'>('all');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFindClips = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const fullPrompt = `Analyze video [URL/Content: ${url || 'Direct Video File'}] - Topic: "${prompt}". Focus moment type: ${focusArea}. Target duration range: ${minDuration} to ${maxDuration}. Detect viral, emotional, funny, educational, and exciting moments with timestamps and clip suggestions.`;

    const res = await generateContent({
      toolId: 'clip_finder',
      prompt: fullPrompt,
      platform: 'TikTok/Reels/Shorts'
    });

    if (res.success) {
      setResult(res.result);
    } else {
      setResult('Error processing video clip analysis: ' + (res.error || 'Please try again'));
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
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-900 border border-purple-800 text-white flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Video className="w-6 h-6 text-purple-300" />
            <h2 className="text-xl font-extrabold font-heading">AI Viral Clip Finder</h2>
          </div>
          <p className="text-xs text-purple-200">
            Upload long-form videos or paste URLs to automatically detect high-retention moments, funny punchlines, and emotional highlights.
          </p>
        </div>
        <span className="hidden sm:inline-block text-xs font-bold px-3 py-1 bg-purple-500/30 border border-purple-400/40 rounded-full text-purple-200">
          Costs 25 Credits
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Upload className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Video Input & Detection Specs</span>
          </h3>

          <form onSubmit={handleFindClips} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Video URL (YouTube, Vimeo, Drive or MP4)
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=sample-video-id"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">Or describe the long video transcript below.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Video Topic / Context / Transcript Description
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. 1-hour podcast episode discussing Nairobi startup failures, M-Pesa bugs, and funny investor pitch stories..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Moment Type</label>
                <select
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value as any)}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="all">🔥 Detect All Moment Types</option>
                  <option value="viral">🚀 Viral High-Retention</option>
                  <option value="funny">😂 Funny / Comedy Punchlines</option>
                  <option value="emotional">😲 Emotional / Shocking</option>
                  <option value="educational">💡 Educational / Insights</option>
                  <option value="exciting">⚡ High-Energy / Exciting</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Clip Length</label>
                <select
                  value={`${minDuration}-${maxDuration}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-');
                    setMinDuration(min);
                    setMaxDuration(max);
                  }}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="15s-30s">Short (15s - 30s)</option>
                  <option value="30s-60s">Standard (30s - 60s)</option>
                  <option value="60s-90s">Extended (60s - 90s)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Scanning Video Timestamps...</span>
                </>
              ) : (
                <>
                  <Film className="w-4 h-4 text-purple-200" />
                  <span>Scan & Detect Viral Moments</span>
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
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Detected Timestamps & Clip Suggestions</span>
              </h3>

              {result && (
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Clip Suggestions'}</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-100 dark:border-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400 animate-bounce">
                  <Play className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Analyzing audio frequencies & speech transcript...</p>
                <p className="text-[11px] text-slate-500">Extracting viral moments and generating clip hooks.</p>
              </div>
            ) : result ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
                {result}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400 text-xs space-y-2">
                <Video className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p>Provide a video URL or transcript context and click Scan & Detect.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 flex items-center justify-between mt-4">
            <span>ClipForge AI Engine</span>
            <span>Optimized for TikTok / Shorts / Reels</span>
          </div>
        </div>

      </div>
    </div>
  );
};
