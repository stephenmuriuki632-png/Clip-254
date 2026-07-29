import React from 'react';

export const CardSkeleton: React.FC = () => (
  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse space-y-3">
    <div className="flex items-center justify-between">
      <div className="w-24 h-3 bg-slate-200 dark:bg-slate-800 rounded-md" />
      <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
    </div>
    <div className="w-32 h-7 bg-slate-200 dark:bg-slate-800 rounded-md" />
    <div className="w-20 h-2 bg-slate-200 dark:bg-slate-800 rounded-md" />
  </div>
);

export const TableSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4 animate-pulse">
    <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
      <div className="w-36 h-4 bg-slate-200 dark:bg-slate-800 rounded-md" />
      <div className="w-20 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg" />
    </div>
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60 last:border-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="space-y-1.5">
            <div className="w-32 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="w-20 h-2.5 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
        </div>
        <div className="w-16 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="w-16 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>
    ))}
  </div>
);

export const ChartSkeleton: React.FC = () => (
  <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse space-y-4">
    <div className="flex justify-between items-center">
      <div className="w-40 h-4 bg-slate-200 dark:bg-slate-800 rounded-md" />
      <div className="w-24 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg" />
    </div>
    <div className="w-full h-56 bg-slate-100 dark:bg-slate-800/50 rounded-xl flex items-end p-4 gap-2">
      {[40, 65, 30, 85, 50, 90, 70, 45, 60, 80].map((h, idx) => (
        <div
          key={idx}
          className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-t-md"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <TableSkeleton />
      </div>
      <div>
        <ChartSkeleton />
      </div>
    </div>
  </div>
);
