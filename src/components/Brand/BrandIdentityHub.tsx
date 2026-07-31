import React, { useState } from 'react';
import { ClipForgeLogo } from './ClipForgeLogo';
import {
  Download,
  Copy,
  Check,
  Shield,
  Palette,
  Type,
  Layout,
  Share2,
  Sparkles,
  CheckCircle2,
  XCircle,
  Eye,
  Sliders,
  Layers,
  Smartphone,
  Globe,
  ArrowRight,
} from 'lucide-react';

export const BrandIdentityHub: React.FC = () => {
  const [selectedBg, setSelectedBg] = useState<'white' | 'dark' | 'indigo' | 'grid'>('white');
  const [logoScale, setLogoScale] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'logos' | 'colors' | 'typography' | 'rules' | 'social'>('logos');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const bgStyles = {
    white: 'bg-white text-slate-900 border border-slate-200',
    dark: 'bg-slate-950 text-white border border-slate-800',
    indigo: 'bg-indigo-600 text-white border border-indigo-500',
    grid: 'bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800',
  };

  const colorSwatches = [
    {
      name: 'Deep Indigo (Primary)',
      hex: '#4F46E5',
      rgb: 'rgb(79, 70, 229)',
      hsl: 'hsl(243, 75%, 59%)',
      tailwind: 'bg-indigo-600',
      description: 'Used for main CTA buttons, primary logo marks, active tabs, and brand highlights.',
    },
    {
      name: 'Electric Blue (Secondary)',
      hex: '#3B82F6',
      rgb: 'rgb(59, 130, 246)',
      hsl: 'hsl(217, 91%, 60%)',
      tailwind: 'bg-blue-500',
      description: 'Used for secondary buttons, gradient vector accents, links, and status badges.',
    },
    {
      name: 'Emerald Spark (Accent)',
      hex: '#10B981',
      rgb: 'rgb(16, 185, 129)',
      hsl: 'hsl(160, 84%, 39%)',
      tailwind: 'bg-emerald-500',
      description: 'Used for success states, M-Pesa verified badges, payout confirmations, and forge sparks.',
    },
    {
      name: 'Charcoal Slate (Dark Canvas)',
      hex: '#0F172A',
      rgb: 'rgb(15, 23, 42)',
      hsl: 'hsl(222, 47%, 11%)',
      tailwind: 'bg-slate-900',
      description: 'Primary dark mode background canvas providing rich contrast and legibility.',
    },
    {
      name: 'Pure Canvas (Light)',
      hex: '#FFFFFF',
      rgb: 'rgb(255, 255, 255)',
      hsl: 'hsl(0, 0%, 100%)',
      tailwind: 'bg-white',
      description: 'Clean light mode background canvas for effortless daily productivity.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white relative overflow-hidden border border-slate-800 shadow-xl space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Official Brand Kit & Design System v2.5</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              ClipForge Brand Identity
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              Complete brand guidelines, scalable vector logos, color tokens, typography scales, and social media media kits for partners, press, and creators.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => {
                const element = document.createElement('a');
                const file = new Blob([
                  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="26" fill="#4F46E5"/><path d="M24 34 C24 25 31 18 40 18 L66 18 C71 18 74 21 74 26 C74 31 71 34 66 34 L40 34 C36 34 34 36 34 40 L34 60 C34 64 36 66 40 66 L66 66 C71 66 74 69 74 74 C74 79 71 82 66 82 L40 82 C31 82 24 75 24 66 Z" fill="white"/><path d="M48 38 L72 38 C77 38 80 41 80 46 C80 49 78 52 74 53 L58 53 L58 64 C58 68 55 71 50 71 C45 71 42 68 42 64 L42 44 C42 40 44 38 48 38 Z" fill="white" fillOpacity="0.85"/><polygon points="64,38 84,50 64,62" fill="#10B981"/></svg>`
                ], { type: 'image/svg+xml' });
                element.href = URL.createObjectURL(file);
                element.download = 'ClipForge_Logo_Vector.svg';
                document.body.appendChild(element);
                element.click();
              }}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Vector SVG Kit</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('logos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'logos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Logo Suite</span>
          </button>

          <button
            onClick={() => setActiveTab('colors')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'colors' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Color Palette</span>
          </button>

          <button
            onClick={() => setActiveTab('typography')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'typography' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Typography</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'rules' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Usage Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'social' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Social Media Kit</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LOGO SUITE */}
      {activeTab === 'logos' && (
        <div className="space-y-8">
          
          {/* Controls Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">Canvas Background:</span>
              <div className="flex items-center gap-1.5 ml-2">
                {(['white', 'dark', 'indigo', 'grid'] as const).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setSelectedBg(bg)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize border transition-all ${
                      selectedBg === bg
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-300'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Logo Size:</span>
              <div className="flex items-center gap-1.5">
                {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setLogoScale(s)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase border transition-all ${
                      logoScale === s
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-transparent'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Logo Previews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Horizontal Signature */}
            <div className={`p-8 rounded-3xl ${bgStyles[selectedBg]} flex flex-col justify-between space-y-6 shadow-sm transition-colors duration-200`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider opacity-60">01. Horizontal Signature Logo</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">Primary</span>
              </div>

              <div className="py-8 flex items-center justify-center">
                <ClipForgeLogo variant="horizontal" size={logoScale} theme={selectedBg === 'indigo' ? 'light' : 'color'} showBadge={true} />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-current/10">
                <p className="text-xs opacity-70">Primary layout for web navigation, headers, and official documents.</p>
                <button
                  onClick={() => copyToClipboard(`<ClipForgeLogo variant="horizontal" size="md" />`)}
                  className="p-2 rounded-xl bg-slate-500/10 hover:bg-slate-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy React Code</span>
                </button>
              </div>
            </div>

            {/* Icon Only / Favicon */}
            <div className={`p-8 rounded-3xl ${bgStyles[selectedBg]} flex flex-col justify-between space-y-6 shadow-sm transition-colors duration-200`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider opacity-60">02. Icon Mark / App Icon</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">Favicon & App</span>
              </div>

              <div className="py-8 flex items-center justify-center gap-6">
                <ClipForgeLogo variant="icon" size={logoScale} theme={selectedBg === 'indigo' ? 'light' : 'color'} />
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <ClipForgeLogo variant="icon" size="sm" theme="light" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-current/10">
                <p className="text-xs opacity-70">Used for browser favicons, mobile app icons, and social media avatars.</p>
                <button
                  onClick={() => copyToClipboard(`<ClipForgeLogo variant="icon" size="md" />`)}
                  className="p-2 rounded-xl bg-slate-500/10 hover:bg-slate-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy React Code</span>
                </button>
              </div>
            </div>

            {/* Vertical Stacked */}
            <div className={`p-8 rounded-3xl ${bgStyles[selectedBg]} flex flex-col justify-between space-y-6 shadow-sm transition-colors duration-200`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider opacity-60">03. Vertical Stacked Logo</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">Center Stack</span>
              </div>

              <div className="py-6 flex items-center justify-center">
                <ClipForgeLogo variant="vertical" size={logoScale} theme={selectedBg === 'indigo' ? 'light' : 'color'} showBadge={true} />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-current/10">
                <p className="text-xs opacity-70">Designed for centered splash screens, posters, and pitch deck covers.</p>
                <button
                  onClick={() => copyToClipboard(`<ClipForgeLogo variant="vertical" size="lg" />`)}
                  className="p-2 rounded-xl bg-slate-500/10 hover:bg-slate-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy React Code</span>
                </button>
              </div>
            </div>

            {/* Monochrome High-Contrast */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col justify-between space-y-6 shadow-sm border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider opacity-60">04. Monochrome High-Contrast</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-bold">Print & Dark</span>
              </div>

              <div className="py-8 flex items-center justify-center">
                <ClipForgeLogo variant="horizontal" size={logoScale} theme="monochrome" showBadge={false} />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <p className="text-xs opacity-70">Solid monochrome mark for single-color print, merchandise, and watermarks.</p>
                <button
                  onClick={() => copyToClipboard(`<ClipForgeLogo variant="horizontal" theme="monochrome" />`)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy React Code</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: COLOR PALETTE */}
      {activeTab === 'colors' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
            <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
              Core Color Tokens
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              ClipForge relies on a high-contrast palette built around Deep Indigo, Electric Blue, and Emerald. Every color is engineered for WCAG AA 4.5:1 contrast legibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colorSwatches.map((color) => (
              <div
                key={color.name}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4 hover:border-slate-300 transition-all"
              >
                <div className={`h-28 w-full rounded-2xl ${color.tailwind} flex items-end p-4 shadow-inner relative group`}>
                  <button
                    onClick={() => copyToClipboard(color.hex)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-black/30 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
                  >
                    {copiedHex === color.hex ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <span className="font-mono font-extrabold text-sm text-white drop-shadow-md">
                    {color.hex}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                    {color.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {color.description}
                  </p>

                  <div className="pt-2 flex flex-col gap-1.5 font-mono text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <span>RGB:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{color.rgb}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>HSL:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{color.hsl}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TYPOGRAPHY */}
      {activeTab === 'typography' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
            <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
              Typography System
            </h3>
            <p className="text-xs text-slate-500 max-w-2xl">
              We pair <strong className="text-slate-900 dark:text-white">Plus Jakarta Sans</strong> for geometric display headlines with <strong className="text-slate-900 dark:text-white">Inter</strong> for body text.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-8">
            <div className="space-y-2 pb-6 border-b border-slate-100 dark:border-slate-700">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">H1 Display Headline — 36px / ExtraBold</span>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
                Empowering Creators & Video Editors Everywhere
              </h1>
            </div>

            <div className="space-y-2 pb-6 border-b border-slate-100 dark:border-slate-700">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">H2 Section Title — 24px / Bold</span>
              <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
                Stream Bounties & Instant M-Pesa Escrow Settlement
              </h2>
            </div>

            <div className="space-y-2 pb-6 border-b border-slate-100 dark:border-slate-700">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">H3 Subheading — 18px / SemiBold</span>
              <h3 className="font-heading font-semibold text-lg text-slate-900 dark:text-white">
                Submit raw clips, track view milestones, and receive instant payouts.
              </h3>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Body Text — 14px / Regular (1.6 Line Height)</span>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                ClipForge connects content creators, streamers, brands, and video editors through automated milestone bounties. All funds are securely pre-locked in escrow to guarantee fair compensation upon clip approval.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: USAGE RULES */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
            <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
              Clear Space & Incorrect Usage
            </h3>
            <p className="text-xs text-slate-500 max-w-2xl">
              To maintain brand integrity, always adhere to minimum clear space boundaries and color contrast guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* DO */}
            <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Approved Usage (DO)</span>
              </div>

              <ul className="space-y-3 text-xs text-emerald-900 dark:text-emerald-200">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Maintain a minimum clear space equal to 1X logo height around the mark.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Use the white logo on dark backgrounds and dark logo on white backgrounds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Use monochrome white or black marks when printing on solid surfaces.</span>
                </li>
              </ul>
            </div>

            {/* DON'T */}
            <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/50 space-y-4">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
                <XCircle className="w-5 h-5" />
                <span>Incorrect Usage (DON'T)</span>
              </div>

              <ul className="space-y-3 text-xs text-rose-900 dark:text-rose-200">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Do NOT stretch, skew, or alter logo aspect ratios.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Do NOT change brand color gradients to unapproved pink or cyan tones.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Do NOT add heavy unapproved drop shadows or neon outer glows.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* TAB 5: SOCIAL MEDIA KIT */}
      {activeTab === 'social' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
            <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
              Social Media Profile Templates
            </h3>
            <p className="text-xs text-slate-500 max-w-2xl">
              Pre-formatted avatar marks and banner assets for official ClipForge social media profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Instagram / TikTok Avatar */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-4 shadow-2xs">
              <div className="w-24 h-24 mx-auto rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <ClipForgeLogo variant="icon" size="lg" theme="light" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Instagram / TikTok Avatar</h4>
                <p className="text-[11px] text-slate-500">1080 x 1080 px Circular Crop</p>
              </div>
            </div>

            {/* LinkedIn Company Avatar */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-4 shadow-2xs">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-md">
                <ClipForgeLogo variant="icon" size="lg" theme="color" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">LinkedIn Company Icon</h4>
                <p className="text-[11px] text-slate-500">300 x 300 px Rounded Square</p>
              </div>
            </div>

            {/* YouTube Channel Mark */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-4 shadow-2xs">
              <div className="w-24 h-24 mx-auto rounded-full bg-slate-950 flex items-center justify-center text-white shadow-md border border-slate-800">
                <ClipForgeLogo variant="icon" size="lg" theme="color" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">YouTube Channel Avatar</h4>
                <p className="text-[11px] text-slate-500">800 x 800 px High-Res</p>
              </div>
            </div>

            {/* X / Twitter Profile Mark */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-4 shadow-2xs">
              <div className="w-24 h-24 mx-auto rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <ClipForgeLogo variant="icon" size="lg" theme="light" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">X (Twitter) Profile</h4>
                <p className="text-[11px] text-slate-500">400 x 400 px Avatar</p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
