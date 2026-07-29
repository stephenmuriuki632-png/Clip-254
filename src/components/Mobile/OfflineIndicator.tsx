import React from 'react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, wasOffline } = useNetworkStatus();

  if (isOnline && !wasOffline) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-100 px-4 py-2 text-xs font-bold transition-all transform duration-300 flex items-center justify-between shadow-lg ${
        !isOnline
          ? 'bg-amber-600 text-white'
          : 'bg-emerald-600 text-white'
      }`}
    >
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
        <div className="flex items-center gap-2">
          {!isOnline ? (
            <>
              <WifiOff className="w-4 h-4 shrink-0 animate-pulse" />
              <span>You are working offline. Cached data is being served.</span>
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4 shrink-0" />
              <span>Connection restored! Syncing updates...</span>
            </>
          )}
        </div>

        {!isOnline && (
          <button
            onClick={() => window.location.reload()}
            className="px-2.5 py-1 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-[10px] font-extrabold flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        )}
      </div>
    </div>
  );
};
