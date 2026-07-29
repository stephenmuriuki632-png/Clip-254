import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Trophy, Star, TrendingUp, Scissors, Video, Briefcase, Film, Crown } from 'lucide-react';

export const AdminLeaderboards: React.FC = () => {
  const { creators } = useApp();
  const [activeTab, setActiveTab] = useState<'clippers' | 'creators' | 'freelancers' | 'ugc'>('clippers');

  const leaderboardsData = {
    clippers: [
      { rank: 1, name: 'Kevin Omondi', handle: '@kevin_clips', earningsKES: '145,000 KES', clips: 84, views: '2.4M', rating: 4.98 },
      { rank: 2, name: 'Brian Wanyama', handle: '@brian_edits', earningsKES: '112,000 KES', clips: 62, views: '1.8M', rating: 4.95 },
      { rank: 3, name: 'Dennis Kimani', handle: '@kimani_viral', earningsKES: '98,500 KES', clips: 54, views: '1.2M', rating: 4.90 }
    ],
    creators: [
      { rank: 1, name: 'Maina Kageni Stream', handle: '@mainakageni', bountiesPaid: '1.2M KES', totalClipsRec: 420, rating: 5.0 },
      { rank: 2, name: 'Andrew Kibe Uncut', handle: '@kibe_official', bountiesPaid: '850,000 KES', totalClipsRec: 310, rating: 4.92 },
      { rank: 3, name: 'Churchill Show Clips', handle: '@churchill', bountiesPaid: '620,000 KES', totalClipsRec: 215, rating: 4.88 }
    ],
    freelancers: [
      { rank: 1, name: 'Faith Mutua', handle: '@faith_vfx', earningsKES: '210,000 KES', gigOrders: 38, rating: 5.0 },
      { rank: 2, name: 'Amina Abdi', handle: '@amina_edits', earningsKES: '165,000 KES', gigOrders: 29, rating: 4.96 }
    ],
    ugc: [
      { rank: 1, name: 'Marlyn Njeri', handle: '@marlyn_ugc', earningsKES: '180,000 KES', brandPosts: 24, rating: 4.99 },
      { rank: 2, name: 'Joy Kendi', handle: '@joy_ugc', earningsKES: '140,000 KES', brandPosts: 18, rating: 4.94 }
    ]
  };

  const currentList = leaderboardsData[activeTab];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Leaderboards & Performance Management</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track top clippers, highest earning creators, top rated freelancers and UGC talent rankings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['clippers', 'creators', 'freelancers', 'ugc'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Talent Name & Handle</th>
              <th className="p-4">Earnings / Volume</th>
              <th className="p-4">Average Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-800 dark:text-slate-200">
            {currentList.map((item) => (
              <tr key={item.rank} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                <td className="p-4">
                  <div className="flex items-center gap-2 font-bold font-heading">
                    {item.rank === 1 ? (
                      <Crown className="w-4 h-4 text-amber-500" />
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[11px]">
                        #{item.rank}
                      </span>
                    )}
                  </div>
                </td>

                <td className="p-4">
                  <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-[10px] text-slate-400">{item.handle}</p>
                </td>

                <td className="p-4 font-extrabold text-indigo-600 dark:text-indigo-400">
                  {'earningsKES' in item ? item.earningsKES : item.bountiesPaid}
                </td>

                <td className="p-4 font-bold text-amber-500 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {item.rating} / 5.0
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
