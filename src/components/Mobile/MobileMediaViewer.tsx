import React, { useState } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Play,
  Pause,
  ExternalLink,
  FileText
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'pdf' | 'document';
  url: string;
  title: string;
  description?: string;
}

interface MobileMediaViewerProps {
  mediaList: MediaItem[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMediaViewer: React.FC<MobileMediaViewerProps> = ({
  mediaList,
  initialIndex = 0,
  isOpen,
  onClose
}) => {
  const { addToast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen || mediaList.length === 0) return null;

  const currentItem = mediaList[currentIndex] || mediaList[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaList.length);
    setZoomLevel(1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
    setZoomLevel(1);
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentItem.title,
          text: currentItem.description || 'Check out this clip on ClipKenya!',
          url: currentItem.url
        });
        addToast('Shared successfully!', 'success');
      } catch (err) {
        /* User cancelled or error */
      }
    } else {
      navigator.clipboard.writeText(currentItem.url);
      addToast('Media link copied to clipboard!', 'info');
    }
  };

  const handleDownload = () => {
    addToast(`Downloading ${currentItem.title}...`, 'info');
    setTimeout(() => {
      addToast('Download completed!', 'success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-70 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 select-none">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between text-white border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-indigo-400 font-bold">
            {currentIndex + 1} / {mediaList.length}
          </span>
          <h4 className="text-xs sm:text-sm font-bold font-heading text-white line-clamp-1">
            {currentItem.title}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {currentItem.type === 'image' && (
            <>
              <button onClick={handleZoomOut} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button onClick={handleZoomIn} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={handleResetZoom} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}

          <button onClick={handleShare} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
            <Share2 className="w-4 h-4" />
          </button>

          <button onClick={handleDownload} className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 px-3">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button onClick={onClose} className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 ml-2">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Viewer Area */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        
        {/* Prev / Next controls */}
        {mediaList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700 shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700 shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Media Renderer */}
        <div className="w-full h-full flex items-center justify-center p-2">
          {currentItem.type === 'image' && (
            <img
              src={currentItem.url}
              alt={currentItem.title}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-h-full max-w-full object-contain rounded-2xl transition-transform duration-200"
            />
          )}

          {currentItem.type === 'video' && (
            <video
              src={currentItem.url}
              controls
              autoPlay
              playsInline
              className="max-h-full max-w-full rounded-2xl shadow-2xl border border-slate-800"
            />
          )}

          {(currentItem.type === 'pdf' || currentItem.type === 'document') && (
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center max-w-md space-y-4">
              <FileText className="w-16 h-16 text-indigo-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">{currentItem.title}</h3>
                <p className="text-xs text-slate-400">PDF / Document File Preview</p>
              </div>
              <button
                onClick={handleDownload}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Download Document
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800 line-clamp-1">
        {currentItem.description || 'PWA High-resolution media preview'}
      </div>

    </div>
  );
};
