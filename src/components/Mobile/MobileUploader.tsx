import React, { useState, useRef } from 'react';
import {
  X,
  Camera,
  Upload,
  Video,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Zap,
  HardDrive,
  FileVideo,
  Share2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useApp } from '../../context/AppContext';

interface MobileUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete?: (fileUrl: string, title: string) => void;
}

export const MobileUploader: React.FC<MobileUploaderProps> = ({
  isOpen,
  onClose,
  onUploadComplete
}) => {
  const { addToast } = useToast();
  const { bounties, submitClip } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [clipTitle, setClipTitle] = useState('');
  const [selectedBountyId, setSelectedBountyId] = useState(bounties[0]?.id || '');

  // Compression state
  const [enableCompression, setEnableCompression] = useState(true);
  const [originalSizeMB, setOriginalSizeMB] = useState(0);
  const [compressedSizeMB, setCompressedSizeMB] = useState(0);

  // Upload Progress State
  const [uploadState, setUploadState] = useState<'idle' | 'compressing' | 'uploading' | 'paused' | 'completed' | 'error'>('idle');
  const [progressPercent, setProgressPercent] = useState(0);
  const intervalRef = useRef<any>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setClipTitle(file.name.replace(/\.[^/.]+$/, ''));
      const sizeMB = Math.round((file.size / (1024 * 1024)) * 10) / 10;
      setOriginalSizeMB(sizeMB || 15.4);
      setCompressedSizeMB(Math.max(1.5, Math.round(sizeMB * 0.35 * 10) / 10));
      setUploadState('idle');
    }
  };

  const startUpload = () => {
    if (!selectedFile && !clipTitle) {
      addToast('Please select a video file or camera recording.', 'warning');
      return;
    }

    setUploadState('compressing');
    setProgressPercent(15);

    setTimeout(() => {
      setUploadState('uploading');
      intervalRef.current = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev >= 95) {
            clearInterval(intervalRef.current);
            setUploadState('completed');
            if (selectedBountyId) {
              submitClip(
                selectedBountyId,
                clipTitle || 'Mobile Bounty Clip',
                'https://tiktok.com/@clipkenya/video/demo'
              );
            }
            if (onUploadComplete) {
              onUploadComplete('https://tiktok.com/@clipkenya/video/demo', clipTitle);
            }
            addToast('🎉 Video uploaded & compressed successfully!', 'success');
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }, 1200);
  };

  const pauseUpload = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setUploadState('paused');
    addToast('Upload paused', 'info');
  };

  const resumeUpload = () => {
    setUploadState('uploading');
    intervalRef.current = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 95) {
          clearInterval(intervalRef.current);
          setUploadState('completed');
          addToast('🎉 Upload resumed & completed!', 'success');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetUploader = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSelectedFile(null);
    setUploadState('idle');
    setProgressPercent(0);
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-heading font-extrabold text-slate-900 dark:text-white">
              Mobile Media Upload Studio
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File Select Controls */}
        {uploadState === 'idle' && !selectedFile && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              
              {/* Camera Direct Capture */}
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border-2 border-dashed border-indigo-500/40 hover:border-indigo-500 flex flex-col items-center justify-center text-center space-y-2 transition-all"
              >
                <Camera className="w-7 h-7 text-indigo-500 animate-bounce" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Camera Record</span>
                  <span className="text-[10px] text-slate-500">Record direct 9:16 vertical clip</span>
                </div>
              </button>

              {/* Gallery Pick */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 flex flex-col items-center justify-center text-center space-y-2 transition-all"
              >
                <Upload className="w-7 h-7 text-indigo-500" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Gallery Upload</span>
                  <span className="text-[10px] text-slate-500">Select MP4, MOV, or 4K Video</span>
                </div>
              </button>

            </div>

            <input
              type="file"
              ref={cameraInputRef}
              accept="video/*,image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*,image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}

        {/* Selected File Details & Upload Settings */}
        {selectedFile && uploadState === 'idle' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileVideo className="w-8 h-8 text-indigo-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {selectedFile.name}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Original Size: {originalSizeMB} MB
                  </div>
                </div>
              </div>
              <button
                onClick={resetUploader}
                className="p-1 text-slate-400 hover:text-rose-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Target Bounty Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Select Target Clip Bounty
              </label>
              <select
                value={selectedBountyId}
                onChange={(e) => setSelectedBountyId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {bounties.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.streamTitle} ({b.hostName})
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Video Compression Toggle */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Smart Mobile Video Compression
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={enableCompression}
                  onChange={(e) => setEnableCompression(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Reduces file size by up to ~65% while keeping 1080p crisp clarity for fast mobile data saving.
              </p>
              {enableCompression && (
                <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  Estimated size: {compressedSizeMB} MB (Saved {Math.round(originalSizeMB - compressedSizeMB)} MB data)
                </div>
              )}
            </div>

            <button
              onClick={startUpload}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Start Compressed Mobile Upload</span>
            </button>
          </div>
        )}

        {/* Uploading Progress View */}
        {(uploadState === 'compressing' || uploadState === 'uploading' || uploadState === 'paused' || uploadState === 'completed') && (
          <div className="space-y-4 py-2">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {uploadState === 'compressing'
                  ? 'Compressing Video...'
                  : uploadState === 'uploading'
                  ? 'Uploading Clip to ClipKenya Cloud...'
                  : uploadState === 'paused'
                  ? 'Upload Paused'
                  : 'Upload Complete!'}
              </span>
              <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                {progressPercent}%
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  uploadState === 'completed'
                    ? 'bg-emerald-500'
                    : uploadState === 'paused'
                    ? 'bg-amber-500'
                    : 'bg-indigo-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 pt-2">
              {uploadState === 'uploading' && (
                <button
                  onClick={pauseUpload}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </button>
              )}

              {uploadState === 'paused' && (
                <button
                  onClick={resumeUpload}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </button>
              )}

              {uploadState === 'completed' ? (
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Done</span>
                </button>
              ) : (
                <button
                  onClick={resetUploader}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
