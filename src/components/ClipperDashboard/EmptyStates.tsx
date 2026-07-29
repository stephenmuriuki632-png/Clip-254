import React from 'react';
import {
  Video,
  DollarSign,
  Briefcase,
  MessageSquare,
  Bell,
  Star,
  Trophy,
  FolderOpen,
  Search,
  Sparkles
} from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'campaigns' | 'earnings' | 'portfolio' | 'messages' | 'notifications' | 'reviews' | 'leaderboard' | 'search' | 'ai';
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'search',
  actionLabel,
  onAction
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'campaigns':
        return <Video className="w-8 h-8 text-indigo-500" />;
      case 'earnings':
        return <DollarSign className="w-8 h-8 text-emerald-500" />;
      case 'portfolio':
        return <FolderOpen className="w-8 h-8 text-purple-500" />;
      case 'messages':
        return <MessageSquare className="w-8 h-8 text-blue-500" />;
      case 'notifications':
        return <Bell className="w-8 h-8 text-amber-500" />;
      case 'reviews':
        return <Star className="w-8 h-8 text-yellow-500" />;
      case 'leaderboard':
        return <Trophy className="w-8 h-8 text-amber-400" />;
      case 'ai':
        return <Sparkles className="w-8 h-8 text-rose-500" />;
      default:
        return <Search className="w-8 h-8 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 my-4">
      <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/60 flex items-center justify-center mb-4">
        {getIcon()}
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-sm hover:shadow-indigo-500/20 active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
