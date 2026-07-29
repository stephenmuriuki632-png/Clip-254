import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height
}) => {
  const baseStyles = 'animate-pulse bg-slate-200 dark:bg-slate-800';

  const variantStyles = {
    text: 'h-3.5 rounded-md w-full',
    circular: 'rounded-full h-10 w-10',
    rectangular: 'rounded-xl h-24 w-full',
    card: 'rounded-2xl h-48 w-full border border-slate-200 dark:border-slate-800'
  };

  const style: React.CSSProperties = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {})
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
    <div className="flex items-center gap-3">
      <Skeleton variant="circular" width="40px" height="40px" />
      <div className="space-y-1.5 flex-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
    <Skeleton variant="rectangular" height="120px" />
    <div className="flex justify-between items-center pt-2">
      <Skeleton variant="text" width="30%" />
      <Skeleton variant="text" width="20%" />
    </div>
  </div>
);
