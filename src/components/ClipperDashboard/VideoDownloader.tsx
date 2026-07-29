import React, { useState } from 'react';
import {
  X,
  Download,
  Play,
  Pause,
  CheckCircle2,
  FileVideo,
  HardDrive,
  RefreshCw,
  Eye,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Campaign } from '../../types';

interface VideoDownloaderProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
}

interface SourceFileItem {
  id: string;
  name: string;
  sizeMB: number;
  format: string;
  resolution: string;
  url: string;
  previewThumbnail: string;
  downloading: boolean;
  progress: number;
  completed: boolean;
}

export const VideoDownloader: React.FC<VideoDownloaderProps> = ({ campaign, isOpen, onClose }) => {
  const [fileList, setFileList] = useState<SourceFileItem[]>([
    {
      id: 'f1',
      name: 'Full Stream Raw Footage (High Bitrate).mp4',
      sizeMB: 1250,
      format: 'MP4 (H.264)',
      resolution: '4K 60fps',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      previewThumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80',
      downloading: false,
      progress: 0,
      completed: false
    },
    {
      id: 'f2',
      name: 'Highlights & Best Moments Reel.mp4',
      sizeMB: 480,
      format: 'MP4',
      resolution: '1080p 60fps',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      previewThumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      downloading: false,
      progress: 0,
      completed: false
    },
    {
      id: 'f3',
      name: 'Audio Multi-Track Stem & Voiceover.wav',
      sizeMB: 85,
      format: 'WAV 24-bit',
      resolution: '48kHz Audio',
      url: '#',
      previewThumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      downloading: false,
      progress: 0,
      completed: false
    },
    {
      id: 'f4',
      name: 'Brand Assets Pack (Logos & Fonts).zip',
      sizeMB: 32,
      format: 'ZIP Archive',
      resolution: 'PNG & OTF',
      url: '#',
      previewThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      downloading: false,
      progress: 0,
      completed: false
    }
  ]);

  const [previewingFile, setPreviewingFile] = useState<SourceFileItem | null>(null);

  if (!isOpen || !campaign) return null;

  const handleStartDownload = (id: string) => {
    setFileList(prev =>
      prev.map(f => (f.id === id ? { ...f, downloading: true, progress: 5 } : f))
    );

    // Simulate download progress
    let current = 5;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 20) + 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setFileList(prev =>
          prev.map(f => (f.id === id ? { ...f, downloading: false, progress: 100, completed: true } : f))
        );
      } else {
        setFileList(prev =>
          prev.map(f => (f.id === id ? { ...f, progress: current } : f))
        );
      }
    }, 400);
  };

  const handleDownloadAll = () => {
    fileList.forEach(f => {
      if (!f.completed) handleStartDownload(f.id);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Source Video Downloads Hub
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                High-speed secure source footage for <span className="font-semibold text-slate-900 dark:text-white">{campaign.title}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security & CDN Speed Banner */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/60 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Fast CDN Direct Mirroring • Resume Support Enabled</span>
          </div>
          <button
            onClick={handleDownloadAll}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-700 transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" /> Download All Files
          </button>
        </div>

        {/* Preview Drawer if open */}
        {previewingFile && (
          <div className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-indigo-950/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Play className="w-3.5 h-3.5 text-indigo-400 fill-current" /> Previewing: {previewingFile.name}
              </span>
              <button
                onClick={() => setPreviewingFile(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close Preview
              </button>
            </div>
            <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
              <video
                src={previewingFile.url}
                controls
                className="w-full h-full object-contain"
                poster={previewingFile.previewThumbnail}
              />
            </div>
          </div>
        )}

        {/* Files List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {fileList.map(file => (
            <div
              key={file.id}
              className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden relative flex-shrink-0">
                  <img src={file.previewThumbnail} alt={file.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setPreviewingFile(file)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                    title="Preview File"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    {file.name}
                    {file.completed && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>{file.sizeMB} MB</span> • <span>{file.format}</span> • <span className="text-indigo-500 font-medium">{file.resolution}</span>
                  </p>
                </div>
              </div>

              {/* Progress & Actions */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {file.downloading && (
                  <div className="w-32 space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-indigo-500">
                      <span>Downloading...</span>
                      <span>{file.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewingFile(file)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>

                  <button
                    onClick={() => handleStartDownload(file.id)}
                    disabled={file.downloading}
                    className={`px-4 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm ${
                      file.completed
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : file.downloading
                        ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {file.completed ? (
                      <>
                        <Download className="w-3.5 h-3.5" /> Re-Download
                      </>
                    ) : file.downloading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {file.progress}%
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" /> Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-slate-400" /> Storage Hosted on High-Speed Storage
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
