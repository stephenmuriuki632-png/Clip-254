import React, { useState } from 'react';
import { ReferralDashboardData } from '../../types/finance';
import {
  Copy,
  Check,
  Gift,
  Users,
  TrendingUp,
  Share2,
  ExternalLink,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Props {
  referralData: ReferralDashboardData;
  onClaimCommission: (amountKES: number) => void;
}

export const ReferralDashboard: React.FC<Props> = ({ referralData, onClaimCommission }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralData.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" />
              <span>ClipForge Ambassador Program</span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Invite Creators & Brands. <br />
              Earn <span className="text-emerald-400">5% Lifetime Commissions</span>
            </h3>

            <p className="text-xs text-slate-300 max-w-xl">
              Share your custom referral link with clip editors, live streamers, UGC talent, or business owners.
              Earn 5% on all earnings and campaign budgets they process on ClipForge.
            </p>
          </div>

          {/* Share Link Box */}
          <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 space-y-3">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Your Custom Referral Code & Link
            </span>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referralData.referralLink}
                className="w-full p-2.5 text-xs font-mono font-bold rounded-xl bg-slate-900 border border-slate-700 text-indigo-300 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Code: <strong className="text-white font-mono">{referralData.referralCode}</strong></span>
              <span className="text-emerald-400 font-bold">5% Commission Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">
            Total Invites
          </span>
          <div className="flex items-baseline justify-between">
            <h4 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
              {referralData.totalReferrals} Users
            </h4>
            <Users className="w-5 h-5 text-indigo-500" />
          </div>
          <span className="text-[10px] text-slate-500">{referralData.activeReferrals} Active Earners</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">
            Total Commission Earned
          </span>
          <div className="flex items-baseline justify-between">
            <h4 className="font-heading font-extrabold text-2xl text-emerald-600 dark:text-emerald-400">
              {referralData.totalCommissionsKES.toLocaleString()} KES
            </h4>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="text-[10px] text-slate-500">Credited to Wallet</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">
            Pending Rewards
          </span>
          <div className="flex items-baseline justify-between">
            <h4 className="font-heading font-extrabold text-2xl text-amber-500">
              {referralData.pendingCommissionsKES.toLocaleString()} KES
            </h4>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-[10px] text-slate-500">Clearing Escrow</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3 flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">
            Claimable Reward Balance
          </span>
          <button
            onClick={() => onClaimCommission(referralData.pendingCommissionsKES)}
            disabled={referralData.pendingCommissionsKES <= 0}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Claim to Wallet</span>
          </button>
        </div>
      </div>

      {/* Referred Users Table */}
      <div className="space-y-4">
        <h4 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
          Referred Members & Commissions
        </h4>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Referred Member</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Total Activity Volume</th>
                <th className="p-4">Your 5% Commission</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
              {referralData.referredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span className="font-bold text-slate-900 dark:text-white">{user.name}</span>
                  </td>
                  <td className="p-4 text-slate-500 font-semibold">{user.role}</td>
                  <td className="p-4 text-slate-400">{user.joinedAt}</td>
                  <td className="p-4 font-bold">{user.earningsGeneratedKES.toLocaleString()} KES</td>
                  <td className="p-4 font-extrabold text-emerald-600 dark:text-emerald-400">
                    +{user.commissionEarnedKES.toLocaleString()} KES
                  </td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
