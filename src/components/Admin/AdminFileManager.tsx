import React, { useState } from 'react';
import { HardDrive, Search, Trash2, RefreshCw, FileText, Film, Image as ImageIcon, Download, Folder } from 'lucide-react';

export const AdminFileManager: React.FC = () => {
  const [files, setFiles] = useState([
    { id: 'f-1', name: 'maina_kageni_stream_raw_01.mp4', bucket: 'videos', size: '1.2 GB', mime: 'video/mp4', uploadedAt: '2026-07-28', status: 'Active' },
    { id: 'f-2', name: 'safaricom_campaign_brief.pdf', bucket: 'attachments', size: '4.2 MB', mime: 'application/pdf', uploadedAt: '2026-07-27', status: 'Active' },
    { id: 'f-3', name: 'ugc_safaricom_post_final.mov', bucket: 'ugc-videos', size: '450 MB', mime: 'video/mov', uploadedAt: '2026-07-26', status: 'Active' },
    { id: 'f-4', name: 'clipper_portfolio_banner.png', bucket: 'thumbnails', size: '2.1 MB', mime: 'image/png', uploadedAt: '2026-07-25', status: 'Active' },
  ]);

  const [search, setSearch] = useState('');

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: 'Deleted' } : f)));
  };

  const handleRestore = (id: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: 'Active' } : f)));
  };

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.bucket.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Supabase Storage Buckets & File Explorer</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse videos, source files, campaign attachments, thumbnails, portfolio media and manage file lifecycle.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Search files by name or bucket..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4">File Name</th>
              <th className="p-4">Storage Bucket</th>
              <th className="p-4">Size</th>
              <th className="p-4">Uploaded Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right font-sans">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-800 dark:text-slate-200">
            {filteredFiles.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                <td className="p-4 font-bold text-slate-900 dark:text-white">{f.name}</td>
                <td className="p-4 text-indigo-600 dark:text-indigo-400 font-bold">{f.bucket}</td>
                <td className="p-4 text-slate-500">{f.size}</td>
                <td className="p-4 text-slate-400">{f.uploadedAt}</td>
                <td className="p-4">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      f.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {f.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-1 font-sans">
                  {f.status === 'Active' ? (
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px]"
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRestore(f.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]"
                    >
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
