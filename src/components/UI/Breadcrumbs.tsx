import React from 'react';
import { ChevronRight, Home, ChevronLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => (
  <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 py-1 overflow-x-auto no-scrollbar">
    <button
      onClick={items[0]?.onClick}
      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
    >
      <Home className="w-3.5 h-3.5" />
    </button>

    {items.map((item, index) => (
      <React.Fragment key={index}>
        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        {item.onClick && !item.active ? (
          <button
            onClick={item.onClick}
            className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors whitespace-nowrap"
          >
            {item.label}
          </button>
        ) : (
          <span className={`font-semibold ${item.active ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
            {item.label}
          </span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-between gap-2 py-3">
    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
      Page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span>
    </span>

    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
        .map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
              p === currentPage
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {p}
          </button>
        ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);
