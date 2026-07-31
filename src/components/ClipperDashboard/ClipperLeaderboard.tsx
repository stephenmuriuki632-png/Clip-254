import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Zap,
  Star,
  CheckCircle2,
  TrendingUp,
  Crown,
  Sparkles,
  Medal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ClipperBadge } from './types';

export const ClipperLeaderboard: React.FC = () => {
  const { currentUser } = useApp();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all_time'>('monthly');

  const [badges] = useState<ClipperBadge[]>([
    {
      id: 'b1',
      name: 'Top Clipper',
      description: 'Ranked in the top 10 clippers in Kenya',
      icon: '👑',
      unlocked: true,
      category: 'performance',
      progress: 100,
      targetCount: 1,
      currentCount: 1
    },
    {
      id: 'b2',
      name: 'Verified Editor',
      description: 'Completed identity & Safaricom Daraja payout check',
      icon: '⚡',
      unlocked: true,
      category: 'milestone',
      progress: 100,
      targetCount: 1,
      currentCount: 1
    },
    {
      id: 'b3',
      name: 'Fast Editor',
      description: 'Delivers clips in under 6 hours on average',
      icon: '🚀',
      unlocked: true,
      category: 'speed',
      progress: 100,
      targetCount: 10,
      currentCount: 10
    },
    {
      id: 'b4',
      name: 'Rising Star',
      description: 'Gained over 100,000 views in first 3 weeks',
      icon: '🌟',
      unlocked: true,
      category: 'performance',
      progress: 100,
      targetCount: 100000,
      currentCount: 120000
    },
    {
      id: 'b5',
      name: '100 Approved Clips',
      description: 'Reached 100 approved clips milestone',
      icon: '🎬',
      unlocked: false,
      category: 'milestone',
      progress: 48,
      targetCount: 100,
      currentCount: 48
    },
    {
      id: 'b6',
      name: '500 Approved Clips',
      description: 'Reached 500 approved clips milestone',
      icon: '🔥',
      unlocked: false,
      category: 'milestone',
      progress: 10,
      targetCount: 500,
      currentCount: 48
    },
    {
      id: 'b7',
      name: '1000 Approved Clips',
      description: 'Reached 1000 approved clips master badge',
      icon: '🏆',
      unlocked: false,
      category: 'milestone',
      progress: 5,
      targetCount: 1000,
      currentCount: 48
    },
    {
      id: 'b8',
      name: 'Top Rated 5.0',
      description: 'Maintained 4.9+ rating over 20 reviews',
      icon: '⭐',
      unlocked: true,
      category: 'rating',
      progress: 100,
      targetCount: 20,
      currentCount: 48
    },
    {
      id: 'b9',
      name: 'Elite Creator',
      description: 'Earned over KES 100,000 in clip payouts',
      icon: '💎',
      unlocked: true,
      category: 'performance',
      progress: 100,
      targetCount: 100000,
      currentCount: 145000
    }
  ]);

  const leaderboardUsers = [
    {
      rank: 1,
      name: 'Wanjiku Njuguna',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80',
      earningsKES: 345000,
      approvedClips: 114,
      approvalRate: '98%',
      badge: 'Master Clipper'
    },
    {
      rank: 2,
      name: 'Brian Omondi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      earningsKES: 280000,
      approvedClips: 92,
      approvalRate: '96%',
      badge: 'Speed Demon'
    },
    {
      rank: 3,
      name: 'Amina Abdi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      earningsKES: 215000,
      approvedClips: 78,
      approvalRate: '95%',
      badge: 'UGC Specialist'
    },
    {
      rank: 4,
      name: currentUser.name + ' (You)',
      avatar: currentUser.avatar,
      earningsKES: 145000,
      approvedClips: 48,
      approvalRate: '94%',
      badge: 'Pro Clipper',
      isMe: true
    },
    {
      rank: 5,
      name: 'Dennis Kiprop',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      earningsKES: 110000,
      approvedClips: 36,
      approvalRate: '92%',
      badge: 'Rising Star'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-700 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
            🏆 Official ClipForge Clipper League
          </span>
          <h2 className="text-2xl font-black tracking-tight mt-2">
            National Clipper Leaderboard & Badges
          </h2>
          <p className="text-xs text-amber-100 font-medium mt-1">
            Top clippers win monthly bonus cash pools & priority campaign invites.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-black/20 p-1.5 rounded-2xl backdrop-blur-md">
          {(['weekly', 'monthly', 'all_time'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold capitalize transition-all ${
                timeframe === t ? 'bg-white text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" /> Unlockable Clipper Badges & Milestones (9 Achievements)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {badges.map(b => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border transition-all ${
                b.unlocked
                  ? 'border-amber-300 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{b.icon}</span>
                {b.unlocked ? (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500">
                    {b.progress}%
                  </span>
                )}
              </div>

              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{b.name}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{b.description}</p>

              {!b.unlocked && (
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${b.progress}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Rankings Table */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" /> Top Rankings ({timeframe.toUpperCase()})
        </h3>

        <div className="space-y-3">
          {leaderboardUsers.map(u => (
            <div
              key={u.rank}
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                u.isMe
                  ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center flex-shrink-0 ${
                    u.rank === 1
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                      : u.rank === 2
                      ? 'bg-slate-300 text-slate-900'
                      : u.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  #{u.rank}
                </div>

                <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover border" />

                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    {u.name}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500">
                      {u.badge}
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {u.approvedClips} approved clips • Approval Rate: {u.approvalRate}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Earnings</span>
                <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                  KES {u.earningsKES.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
