import React, { useState } from 'react';
import { useAISuite } from '../../context/AIContext';
import { Clock, Search, Star, Trash2, Copy, Check, Filter, RotateCcw } from 'lucide-react';

export const AIHistoryView: React.FC = () => {
  const { history, toggleFavorite, deleteHistoryItem, clearHistory, setActiveTab } = useAISuite();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFav, setFilterFav] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredHistory = history.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.toolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.result.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFav = !filterFav || item.isFavorite;

    return matchesSearch && matchesFav;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search prompts or generated results..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setFilterFav(!filterFav)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border ${
              filterFav
                ? 'bg-amber-500 text-white border-amber-600'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filterFav ? 'fill-white' : ''}`} />
            <span>{filterFav ? 'Starred Only' : 'Filter Favorites'}</span>
          </button>

          {history.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all saved AI history?')) {
                  clearHistory();
                }
              }}
              className="px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

      </div>

      {/* History Items Feed */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center text-slate-400 space-y-3">
          <Clock className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">No AI History Items Found</h3>
          <p className="text-xs">Your generated prompts and outputs will automatically be saved here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow-2xs space-y-3 transition-all hover:border-slate-300 dark:hover:border-slate-600"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900">
                    {item.toolName}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(item.timestamp).toLocaleString()} • Provider: {item.provider.toUpperCase()} ({item.creditsUsed} Credits)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    <Star className={`w-4 h-4 ${item.isFavorite ? 'text-amber-500 fill-amber-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleCopy(item.id, item.result)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Prompt: <span className="font-semibold text-slate-700 dark:text-slate-300">"{item.prompt}"</span>
                </p>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                  {item.result}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <button
                  onClick={() => setActiveTab(item.toolId)}
                  className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reuse parameters in {item.toolName}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
