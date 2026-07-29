import React from 'react';
import { FileQuestion, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface StateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<StateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon = <FileQuestion className="w-8 h-8 text-slate-400" />,
  className = ''
}) => (
  <div className={`p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3 flex flex-col items-center justify-center ${className}`}>
    <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-2xs border border-slate-200 dark:border-slate-700">
      {icon}
    </div>
    <div className="max-w-xs space-y-1">
      <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">{title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
    {actionText && onAction && (
      <Button variant="primary" size="sm" onClick={onAction} className="mt-2">
        {actionText}
      </Button>
    )}
  </div>
);

export const ErrorState: React.FC<StateProps> = ({
  title = 'Something went wrong',
  description = 'Failed to load data. Please check your network connection and try again.',
  actionText = 'Try Again',
  onAction,
  icon = <AlertCircle className="w-8 h-8 text-red-500" />,
  className = ''
}) => (
  <div className={`p-8 text-center rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/30 dark:bg-red-950/20 space-y-3 flex flex-col items-center justify-center ${className}`}>
    <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-2xs border border-red-200 dark:border-red-800">
      {icon}
    </div>
    <div className="max-w-xs space-y-1">
      <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">{title}</h3>
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
    </div>
    {actionText && onAction && (
      <Button variant="danger" size="sm" onClick={onAction} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
        {actionText}
      </Button>
    )}
  </div>
);

export const SuccessState: React.FC<StateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon = <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
  className = ''
}) => (
  <div className={`p-8 text-center rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-3 flex flex-col items-center justify-center ${className}`}>
    <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-2xs border border-emerald-200 dark:border-emerald-800">
      {icon}
    </div>
    <div className="max-w-xs space-y-1">
      <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">{title}</h3>
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
    </div>
    {actionText && onAction && (
      <Button variant="primary" size="sm" onClick={onAction}>
        {actionText}
      </Button>
    )}
  </div>
);
