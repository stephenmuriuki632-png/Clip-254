import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  UploadCloud,
  FileVideo,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Play,
  Save,
  Sparkles,
  Link as LinkIcon,
  Video,
  FileText
} from 'lucide-react';
import { Campaign } from '../../types';
import { useApp } from '../../context/AppContext';

interface UploadClipModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UploadClipModal: React.FC<UploadClipModalProps> = ({ campaign, isOpen, onClose }) => {
  const { submitClip, currentUser } = useApp();

  const [clipTitle, setClipTitle] = useState('');
  const [platformUrl, setPlatformUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [hashtags, setHashtags] = useState('#ClipKenya #TechTok #KenyaEdits');
  
  // File upload state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Thumbnail state
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80'
  );

  // Auto-save draft status
  const [draftSaved, setDraftSaved] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (clipTitle || platformUrl) {
      const timer = setTimeout(() => {
        setDraftSaved(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [clipTitle, platformUrl, notes]);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    // Validation
    const validFormats = ['video/mp4', 'video/quicktime', 'video/webm'];
    if (!validFormats.includes(file.type)) {
      setUploadError('Invalid format! Only MP4, MOV, and WebM videos are allowed.');
      return;
    }

    if (file.size > 250 * 1024 * 1024) { // 250MB
      setUploadError('File exceeds maximum size limit of 250 MB.');
      return;
    }

    setUploadError(null);
    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(10);

    // Simulate progress
    let prog = 10;
    const interval = setInterval(() => {
      prog += Math.floor(Math.random() * 25) + 15;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setIsUploading(false);
        setUploadProgress(100);
      } else {
        setUploadProgress(prog);
      }
    }, 300);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clipTitle.trim()) {
      alert('Please enter a title for your clip.');
      return;
    }

    const targetBountyId = campaign?.id || 'bounty_001';
    const targetUrl = platformUrl.trim() || 'https://tiktok.com/@clipkenya/video/' + Date.now();

    submitClip(targetBountyId, clipTitle.trim(), targetUrl);

    alert(`🎉 Clip "${clipTitle}" successfully submitted for verification!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                Submit Clip Submission
                {draftSaved && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center gap-1">
                    <Save className="w-3 h-3" /> Draft Auto-Saved
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Campaign: <span className="font-bold text-slate-900 dark:text-white">{campaign?.title || 'TechTok Viral Clip Bounty'}</span>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* File Upload Zone */}
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
              Upload Video File (MP4, MOV, WebM • Max 250MB)
            </label>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/50'
                  : uploadedFile
                  ? 'border-emerald-500/80 bg-emerald-50/30 dark:bg-emerald-950/20'
                  : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-500'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/quicktime,video/webm"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />

              {uploadedFile ? (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {uploadedFile.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB • {isUploading ? `Uploading ${uploadProgress}%` : 'Upload Verified & Checked'}
                  </p>

                  {isUploading && (
                    <div className="w-full max-w-xs mx-auto h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                    className="text-xs text-rose-500 font-bold hover:underline mt-2 inline-block"
                  >
                    Replace Video File
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Drag & Drop your video clip here or <span className="text-indigo-600 dark:text-indigo-400 underline">Browse Files</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Vertical 9:16 format recommended (1080x1920) • Max 250MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {uploadError && (
              <p className="text-xs font-semibold text-rose-500 mt-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> {uploadError}
              </p>
            )}
          </div>

          {/* Title & Platform URL Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                Clip Catchy Title *
              </label>
              <input
                type="text"
                required
                value={clipTitle}
                onChange={(e) => setClipTitle(e.target.value)}
                placeholder="e.g., Testing $150 Wireless Mic in Nairobi Street!"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                Published Platform Link (TikTok / Reels / Shorts)
              </label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="url"
                  value={platformUrl}
                  onChange={(e) => setPlatformUrl(e.target.value)}
                  placeholder="https://tiktok.com/@myhandle/video/12345"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Notes & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                Editor Notes / Editing Highlights
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Added motion graphics, kinetic subtitles, and sound effects at 0:12..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                Custom Thumbnail URL
              </label>
              <input
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setDraftSaved(true);
                  alert('Draft saved to local workspace.');
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <Save className="w-3.5 h-3.5" /> Save Draft
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" /> Submit Clip For Review
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
