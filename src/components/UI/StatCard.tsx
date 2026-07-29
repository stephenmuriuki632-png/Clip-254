import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
  badgeText?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon,
  iconBgColor = 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
  badgeText
}) => {
  return (
    <Card variant="default" padding="md" className="space-y-3 relative overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {icon && (
          <div className={`p-2 rounded-xl text-xs font-semibold ${iconBgColor}`}>
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          {value}
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{change}</span>
          </div>
        )}
      </div>

      {(subtitle || badgeText) && (
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
          {subtitle && <span>{subtitle}</span>}
          {badgeText && (
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
