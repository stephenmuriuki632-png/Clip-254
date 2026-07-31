import React from 'react';
import { AlertTriangle, Wrench, FileQuestion, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../UI/Button';

export const NotFound404: React.FC<{ onHome: () => void }> = ({ onHome }) => (
  <div className="py-20 px-4 text-center space-y-4 max-w-md mx-auto">
    <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto border border-indigo-200 dark:border-indigo-800">
      <FileQuestion className="w-8 h-8" />
    </div>
    <span className="font-mono text-3xl font-extrabold text-indigo-600">404</span>
    <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Page or Bounty Not Found</h1>
    <p className="text-xs text-slate-500 leading-relaxed">
      The campaign, creator profile, or resource you are looking for has been moved or completed.
    </p>
    <Button variant="primary" size="md" onClick={onHome} leftIcon={<Home className="w-4 h-4" />}>
      Return to Marketplace
    </Button>
  </div>
);

export const ServerError500: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="py-20 px-4 text-center space-y-4 max-w-md mx-auto">
    <div className="w-16 h-16 rounded-3xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto border border-red-200 dark:border-red-800">
      <AlertTriangle className="w-8 h-8" />
    </div>
    <span className="font-mono text-3xl font-extrabold text-red-600">500</span>
    <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Unexpected Server Error</h1>
    <p className="text-xs text-slate-500 leading-relaxed">
      Our engineers have been notified. Please try refreshing or check back in a moment.
    </p>
    <Button variant="danger" size="md" onClick={onRetry} leftIcon={<ArrowLeft className="w-4 h-4" />}>
      Try Again
    </Button>
  </div>
);

export const MaintenanceMode: React.FC = () => (
  <div className="py-20 px-4 text-center space-y-4 max-w-md mx-auto">
    <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800">
      <Wrench className="w-8 h-8" />
    </div>
    <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Scheduled Infrastructure Upgrade</h1>
    <p className="text-xs text-slate-500 leading-relaxed">
      ClipForge is upgrading M-Pesa STK Push nodes. All active escrow balances and campaign submissions are 100% safe. Back online shortly!
    </p>
  </div>
);
