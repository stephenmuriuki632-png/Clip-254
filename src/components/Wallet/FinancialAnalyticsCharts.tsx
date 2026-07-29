import React from 'react';
import { FinancialAnalyticsSummary } from '../../types/finance';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { TrendingUp, PieChart as PieIcon, BarChart3, ShieldCheck } from 'lucide-react';

interface Props {
  analytics: FinancialAnalyticsSummary;
}

const COLORS = ['#10B981', '#6366F1', '#F59E0B', '#3B82F6'];

export const FinancialAnalyticsCharts: React.FC<Props> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      {/* Analytics Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">
            Total Platform Volume
          </span>
          <h4 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            {(analytics.totalPlatformVolumeKES / 1000000).toFixed(2)}M <span className="text-xs text-slate-400">KES</span>
          </h4>
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +{analytics.monthlyRevenueGrowthPercent}% MoM Growth
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">
            Escrow Pool Total
          </span>
          <h4 className="font-heading font-extrabold text-2xl text-amber-500">
            {(analytics.totalEscrowHeldKES / 1000000).toFixed(2)}M <span className="text-xs text-slate-400">KES</span>
          </h4>
          <span className="text-[10px] text-slate-500">Held in Active Contracts</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">
            Payouts Disbursed
          </span>
          <h4 className="font-heading font-extrabold text-2xl text-emerald-600 dark:text-emerald-400">
            {(analytics.totalPayoutsProcessedKES / 1000000).toFixed(2)}M <span className="text-xs text-slate-400">KES</span>
          </h4>
          <span className="text-[10px] text-slate-500">To Creators & Freelancers</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">
            Net Platform Fee Revenue
          </span>
          <h4 className="font-heading font-extrabold text-2xl text-indigo-600 dark:text-indigo-400">
            {(analytics.totalRevenueFeesKES / 1000000).toFixed(2)}M <span className="text-xs text-slate-400">KES</span>
          </h4>
          <span className="text-[10px] text-indigo-500 font-bold">Commission Fees</span>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payout Distribution Pie Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-indigo-500" />
            <h4 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
              Payout Distribution by Provider
            </h4>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.payoutVolumeByMethod}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="percentage"
                  nameKey="provider"
                >
                  {analytics.payoutVolumeByMethod.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${value}% Share`, 'Volume']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Streams Bar Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-500" />
            <h4 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
              Platform Revenue Streams (KES)
            </h4>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.revenueByStream}>
                <XAxis dataKey="stream" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  formatter={(value: any) => [`${Number(value).toLocaleString()} KES`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Bar dataKey="amountKES" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
