import React from 'react';
import { Calendar } from 'lucide-react';

export interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  className = ''
}) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <Calendar className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="date"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white pl-9 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors ${className}`}
        />
      </div>
    </div>
  );
};
