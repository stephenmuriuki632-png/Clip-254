import React from 'react';
import { 
  Megaphone, 
  MessageSquare, 
  Bell, 
  Wallet, 
  BarChart2, 
  Star, 
  Film, 
  Plus,
  RefreshCw
} from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 shadow-2xs">
        {icon || <Film className="w-7 h-7" />}
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};

export const NoCampaignsEmptyState: React.FC<{ onCreate?: () => void }> = ({ onCreate }) => (
  <EmptyState
    title="No Campaigns Created Yet"
    description="Launch your first campaign to recruit talented African video clippers, UGC creators, and influencers with instant M-Pesa payouts."
    actionText="Create Campaign"
    onAction={onCreate}
    icon={<Megaphone className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />}
  />
);

export const NoMessagesEmptyState: React.FC = () => (
  <EmptyState
    title="No Conversations Yet"
    description="You don't have any active messages with video editors or creators. Reach out through the Creator Directory or review campaign applications."
    icon={<MessageSquare className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />}
  />
);

export const NoNotificationsEmptyState: React.FC = () => (
  <EmptyState
    title="All Caught Up!"
    description="You have no unread notifications or alert updates at the moment."
    icon={<Bell className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />}
  />
);

export const NoPaymentsEmptyState: React.FC<{ onDeposit?: () => void }> = ({ onDeposit }) => (
  <EmptyState
    title="No Recent Wallet Transactions"
    description="Top up your ClipForge wallet via Safaricom M-Pesa or Visa/Mastercard to fund video bounties and hire talent."
    actionText="Top Up Wallet"
    onAction={onDeposit}
    icon={<Wallet className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />}
  />
);

export const NoAnalyticsEmptyState: React.FC = () => (
  <EmptyState
    title="Analytics Pending"
    description="Data insights, view counts, and engagement trends will populate once your active campaigns receive clip submissions."
    icon={<BarChart2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />}
  />
);

export const NoReviewsEmptyState: React.FC = () => (
  <EmptyState
    title="No Creator Reviews Yet"
    description="Reviews and rating feedback from clippers and UGC talent will appear here after orders are completed."
    icon={<Star className="w-7 h-7 text-amber-500" />}
  />
);

export const NoSubmissionsEmptyState: React.FC = () => (
  <EmptyState
    title="No Video Submissions Found"
    description="There are currently no clip submissions matching your filter criteria."
    icon={<Film className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />}
  />
);
