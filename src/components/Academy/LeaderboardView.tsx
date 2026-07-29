import React from 'react';
import { MOCK_LEADERBOARD_USERS, MOCK_LEARNER_BADGES } from '../../data/academyData';
import { Trophy, Flame, Star, Award, CheckCircle2, Scissors, ShieldCheck } from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <Trophy className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              Rank #2
            </span>
          </div>
          <div className="text-2xl font-extrabold font-heading">3,920 Points</div>
          <p className="text-xs text-slate-400">Your total learning XP across all completed modules & quizzes.</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-orange-400">
            <Flame className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider bg-orange-500/20 px-2.5 py-0.5 rounded-full border border-orange-500/30">
              Active Streak
            </span>
          </div>
          <div className="text-2xl font-extrabold font-heading">18 Days</div>
          <p className="text-xs text-slate-400">Log in daily and watch 1 lesson to keep your streak alive!</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-indigo-400">
            <Award className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
              Badges
            </span>
          </div>
          <div className="text-2xl font-extrabold font-heading">8 Badges Unlocked</div>
          <p className="text-xs text-slate-400">Earn badges by completing courses, quizzes, and project clips.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leaderboard Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Top Learner Leaderboard (Weekly)</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Resets every Monday</span>
          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs divide-y divide-slate-100 dark:divide-slate-800">
            {MOCK_LEADERBOARD_USERS.map((user) => {
              const isUser = user.userId === 'usr_me_001';
              return (
                <div
                  key={user.userId}
                  className={`p-4 flex items-center justify-between text-xs transition-colors ${
                    isUser
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 font-semibold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs ${
                        user.rank === 1
                          ? 'bg-amber-400 text-slate-950 shadow-md'
                          : user.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : user.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      #{user.rank}
                    </span>

                    <img
                      src={user.userAvatar}
                      alt={user.userName}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />

                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{user.userName}</span>
                        {isUser && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-extrabold">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">{user.userRole}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div className="flex items-center gap-1 text-orange-500 font-bold">
                      <Flame className="w-3.5 h-3.5 fill-orange-500" />
                      <span>{user.streakDays}d</span>
                    </div>

                    <div>
                      <div className="font-extrabold text-indigo-600 dark:text-indigo-400">
                        {user.points.toLocaleString()} XP
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {user.coursesCompleted} Courses
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievement Badges Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            <span>Achievement Badges</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {MOCK_LEARNER_BADGES.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex items-center gap-3.5 ${
                  badge.isUnlocked
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xs'
                    : 'bg-slate-100/50 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl shrink-0 ${
                    badge.isUnlocked
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  <Award className="w-5 h-5" />
                </div>

                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{badge.name}</span>
                    {badge.isUnlocked && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
