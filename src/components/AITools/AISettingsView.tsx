import React, { useState } from 'react';
import { useAISuite } from '../../context/AIContext';
import { AIProvider } from '../../types/ai';
import { Settings, Cpu, Save, Check, Sparkles, Sliders, Shield } from 'lucide-react';

export const AISettingsView: React.FC = () => {
  const { settings, updateSettings, selectedProvider, setSelectedProvider } = useAISuite();
  const [provider, setProvider] = useState<AIProvider>(selectedProvider);
  const [temp, setTemp] = useState<number>(settings.temperature);
  const [lang, setLang] = useState<string>(settings.language);
  const [tone, setTone] = useState<string>(settings.tone);
  const [length, setLength] = useState<'short' | 'medium' | 'detailed'>(settings.outputLength);
  const [autoSave, setAutoSave] = useState<boolean>(settings.autoSaveHistory);

  const [saved, setSaved] = useState(false);

  const providersList = [
    { id: 'gemini', name: 'Google Gemini 3.6 Flash (Default & Recommended)', badge: 'Active / Recommended', desc: 'Fast, multimodal reasoning & viral hook optimization.' },
    { id: 'openai', name: 'OpenAI GPT-4o / O3-Mini', badge: 'Future Provider', desc: 'Industry benchmark for structured scriptwriting.' },
    { id: 'claude', name: 'Anthropic Claude 3.5 Sonnet', badge: 'Future Provider', desc: 'Nuanced storytelling and natural dialogue generation.' },
    { id: 'deepseek', name: 'DeepSeek V3 / R1 Reasoner', badge: 'Future Provider', desc: 'High-speed reasoning and budget optimizations.' },
    { id: 'llama', name: 'Meta Llama 3.3 70B', badge: 'Open Source', desc: 'Open-weights model abstraction layer.' },
    { id: 'mistral', name: 'Mistral Large 2', badge: 'European Tech', desc: 'Multilingual and regional tone switching.' },
    { id: 'azure_openai', name: 'Azure OpenAI Enterprise', badge: 'Enterprise', desc: 'Enterprise SLA & strict data compliance.' },
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedProvider(provider);
    await updateSettings({
      provider,
      temperature: temp,
      language: lang,
      tone,
      outputLength: length,
      autoSaveHistory: autoSave
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
        <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>AI Engine Configuration & Provider Settings</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Customize your default AI Provider, creativity levels, regional language blends, and tone defaults across all ClipForge AI tools.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Provider Abstraction Selection */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Select Active AI Provider Layer</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {providersList.map((p) => (
              <label
                key={p.id}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  provider === p.id
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-500 shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="ai_provider"
                      value={p.id}
                      checked={provider === p.id}
                      onChange={() => setProvider(p.id as AIProvider)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{p.name}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {p.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 pl-5">
                  {p.desc}
                </p>
              </label>
            ))}
          </div>
        </div>

        {/* Creativity & Tone Parameters */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-2xs space-y-4">
          <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Default Prompt Generation Rules</span>
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Creativity Level (Temperature): {temp}</span>
                <span className="text-slate-400">{temp < 0.4 ? 'Strict & Precise' : temp > 0.8 ? 'Wild & Creative' : 'Balanced'}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={temp}
                onChange={(e) => setTemp(parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Default Language Blend
                </label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="English with Kenyan/Sheng touch">English + Sheng Vibe (Kenya)</option>
                  <option value="Pure English (Corporate)">Pure English (Global/Corporate)</option>
                  <option value="Swahili & English Blend">Swahili & English Mix</option>
                  <option value="Nigerian Pidgin & English">Nigerian Pidgin Blend</option>
                  <option value="French & African French Blend">French & West African French</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Default Brand Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Energetic & Viral">Energetic & Viral (Short-form)</option>
                  <option value="Professional & Authoritative">Professional & Corporate</option>
                  <option value="Conversational & Friendly">Conversational & Casual</option>
                  <option value="Persuasive & Sales">Sales & Direct Response</option>
                  <option value="Humorous & Witty">Humorous & Comedy</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Output Length Preference
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value as any)}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="short">Short & Concise</option>
                  <option value="medium">Standard Balanced</option>
                  <option value="detailed">Detailed & Formatted</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  <span>Automatically Save All AI Prompt Generations To History</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Check className="w-4 h-4" /> Preferences Saved Successfully!
            </span>
          )}
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save AI Preferences</span>
          </button>
        </div>

      </form>
    </div>
  );
};
