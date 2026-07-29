import React, { useState } from 'react';
import { ShieldCheck, FileText, Lock, Cookie } from 'lucide-react';
import { Card } from '../UI/Card';
import { Tabs } from '../UI/Tabs';

export const LegalPage: React.FC<{ defaultTab?: 'privacy' | 'terms' | 'cookies' }> = ({ defaultTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
          Trust & Legal Center
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last updated: July 28, 2026 • ClipKenya Technologies Ltd.
        </p>
      </div>

      <Tabs
        tabs={[
          { id: 'privacy', label: 'Privacy Policy', icon: <Lock className="w-3.5 h-3.5" /> },
          { id: 'terms', label: 'Terms of Service', icon: <FileText className="w-3.5 h-3.5" /> },
          { id: 'cookies', label: 'Cookie Policy', icon: <Cookie className="w-3.5 h-3.5" /> }
        ]}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as any)}
        variant="segmented"
      />

      <Card variant="default" padding="lg" className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">1. Information We Collect</h2>
            <p>ClipKenya collects profile information (name, avatar, social handles), payout credentials (Safaricom M-Pesa phone number, bank details), and uploaded campaign media to provide escrow marketplace services.</p>
            <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">2. How We Protect Your Data</h2>
            <p>All sensitive payment credentials are encrypted using AES-256 and communicated securely over HTTPS to financial gateways including Safaricom Daraja API.</p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">1. Creator & Clipper Licensing</h2>
            <p>By posting video campaign source files, creators grant participating clippers a limited commercial license to repurpose content for campaign submission and viral distribution.</p>
            <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">2. Escrow & Disbursal Conditions</h2>
            <p>Funds deposited for bounties or UGC briefs remain held in ClipKenya Escrow until submission approval or automated 72-hour review expiry.</p>
          </div>
        )}

        {activeTab === 'cookies' && (
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">1. Essential Cookies</h2>
            <p>We use essential local storage and cookie tokens to maintain user authentication sessions and dark/light theme preferences across devices.</p>
          </div>
        )}
      </Card>
    </div>
  );
};
