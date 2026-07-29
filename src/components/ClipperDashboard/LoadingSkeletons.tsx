import React from 'react';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Banner Skeleton */}
      <div className="h-44 rounded-3xl bg-slate-200 dark:bg-slate-800/60 w-full" />

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800/60" />
        ))}
      </div>

      {/* Grid Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-96 rounded-2xl bg-slate-200 dark:bg-slate-800/60" />
        <div className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-800/60" />
      </div>
    </div>
  );
};

export const CampaignsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800/60" />
      ))}
    </div>
  );
};

export const SubmissionsSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-20 rounded-xl bg-slate-200 dark:bg-slate-800/60 w-full" />
      ))}
    </div>
  );
};

export const TableSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-10 rounded-lg bg-slate-200 dark:bg-slate-800/80 w-full" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-14 rounded-lg bg-slate-200 dark:bg-slate-800/40 w-full" />
      ))}
    </div>
  );
};
