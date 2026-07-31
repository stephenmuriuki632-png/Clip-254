import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileCode, Check, X } from 'lucide-react';

interface AdminExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any[];
  filename: string;
}

export const AdminExportModal: React.FC<AdminExportModalProps> = ({
  isOpen,
  onClose,
  title,
  data,
  filename,
}) => {
  const [format, setFormat] = useState<'csv' | 'excel' | 'pdf' | 'json'>('csv');
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    let content = '';
    let mimeType = 'text/plain';
    let ext = 'csv';

    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json';
      ext = 'json';
    } else if (format === 'csv' || format === 'excel') {
      if (data.length > 0) {
        const headers = Object.keys(data[0]).join(',');
        const rows = data
          .map((row) =>
            Object.values(row)
              .map((v) => `"${String(v).replace(/"/g, '""')}"`)
              .join(',')
          )
          .join('\n');
        content = `${headers}\n${rows}`;
      } else {
        content = 'No data available';
      }
      mimeType = format === 'csv' ? 'text/csv' : 'application/vnd.ms-excel';
      ext = format === 'csv' ? 'csv' : 'xls';
    } else if (format === 'pdf') {
      // Simulated PDF summary export
      content = `=== CLIPFORGE ENTERPRISE EXPORT REPORT ===\nTitle: ${title}\nExported At: ${new Date().toISOString()}\nTotal Records: ${
        data.length
      }\n\n${JSON.stringify(data, null, 2)}`;
      mimeType = 'text/plain';
      ext = 'txt';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().slice(0, 10)}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Export {title} Data</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select your preferred export format for enterprise reporting.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Export Format
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFormat('csv')}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                format === 'csv'
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <FileText className="w-5 h-5" />
              <div className="text-left">
                <p className="text-xs">CSV File</p>
                <p className="text-[10px] text-slate-400">Standard spreadsheet</p>
              </div>
            </button>

            <button
              onClick={() => setFormat('excel')}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                format === 'excel'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <FileSpreadsheet className="w-5 h-5" />
              <div className="text-left">
                <p className="text-xs">Excel (.xls)</p>
                <p className="text-[10px] text-slate-400">Microsoft Excel</p>
              </div>
            </button>

            <button
              onClick={() => setFormat('pdf')}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                format === 'pdf'
                  ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <FileText className="w-5 h-5 text-red-500" />
              <div className="text-left">
                <p className="text-xs">PDF Summary</p>
                <p className="text-[10px] text-slate-400">Audit report</p>
              </div>
            </button>

            <button
              onClick={() => setFormat('json')}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                format === 'json'
                  ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <FileCode className="w-5 h-5" />
              <div className="text-left">
                <p className="text-xs">JSON Raw</p>
                <p className="text-[10px] text-slate-400">Structured data</p>
              </div>
            </button>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
          <span>Records ready to export:</span>
          <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{data.length} items</span>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-5 py-2 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center gap-2 transition-all"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
