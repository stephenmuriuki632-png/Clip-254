import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Check, 
  FileText, 
  Film, 
  Image as ImageIcon, 
  Music, 
  Link as LinkIcon, 
  Sparkles, 
  Trash2, 
  AlertCircle,
  Video,
  DollarSign,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Campaign } from '../../types';
import { useApp } from '../../context/AppContext';

interface CampaignFormModalProps {
  campaign?: Campaign | null;
  onClose: () => void;
}

export const CampaignFormModal: React.FC<CampaignFormModalProps> = ({ campaign, onClose }) => {
  const { createCampaign, updateCampaign, currentUser } = useApp();

  // Form State
  const [title, setTitle] = useState(campaign?.title || '');
  const [description, setDescription] = useState(campaign?.description || '');
  const [category, setCategory] = useState(campaign?.category || 'Gaming');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Pro' | 'Viral Masters'>(
    campaign?.difficulty || 'Intermediate'
  );
  const [budgetKES, setBudgetKES] = useState<number>(campaign?.budgetKES || 25000);
  const [paymentPerClipKES, setPaymentPerClipKES] = useState<number>(campaign?.paymentPerClipKES || 2500);
  const [maxClips, setMaxClips] = useState<number>(campaign?.maxClips || 10);
  const [deadline, setDeadline] = useState(campaign?.deadline || '2026-08-30');
  const [requiredResolution, setRequiredResolution] = useState(campaign?.requiredResolution || '1080x1920 HD');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1' | '4:5'>(campaign?.aspectRatio || '9:16');
  const [videoDuration, setVideoDuration] = useState(campaign?.videoDuration || '30 - 60 Seconds');
  const [instructions, setInstructions] = useState(campaign?.instructions || '');
  const [targetAudience, setTargetAudience] = useState(campaign?.targetAudience || 'Youth, Gen-Z, Tech Enthusiasts in Kenya');
  const [platform, setPlatform] = useState<'tiktok' | 'youtube' | 'instagram' | 'all'>(campaign?.platform || 'tiktok');
  
  const [hashtagsStr, setHashtagsStr] = useState(campaign?.hashtags?.join(', ') || '#ClipKenya, #KenyaCreators, #ViralClips');
  const [keywordsStr, setKeywordsStr] = useState(campaign?.keywords?.join(', ') || 'funny, gaming, reaction, podcast');
  const [refLinkInput, setRefLinkInput] = useState('');
  const [referenceLinks, setReferenceLinks] = useState<string[]>(campaign?.referenceLinks || []);
  const [allowRevisions, setAllowRevisions] = useState<boolean>(campaign?.allowRevisions ?? true);
  const [visibility, setVisibility] = useState<'public' | 'invite_only' | 'private'>(campaign?.visibility || 'public');

  // Video & File Upload simulation state
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string; size: string; type: string; progress: number; previewUrl?: string }[]>([
    { id: 'f1', name: 'Raw_Stream_Highlight_4K.mp4', size: '245 MB', type: 'video/mp4', progress: 100, previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' },
    { id: 'f2', name: 'Brand_Logo_Transparent.png', size: '2.4 MB', type: 'image/png', progress: 100 },
    { id: 'f3', name: 'Campaign_Guidelines.pdf', size: '1.1 MB', type: 'application/pdf', progress: 100 }
  ]);
  const [isDragging, setIsDragging] = useState(false);

  const categories = ['Gaming', 'Podcast & Talk', 'Lifestyle & Vlogs', 'Tech & AI', 'Entertainment', 'Music', 'Sports', 'Education', 'Business'];

  const handleAddRefLink = () => {
    if (refLinkInput.trim()) {
      setReferenceLinks(prev => [...prev, refLinkInput.trim()]);
      setRefLinkInput('');
    }
  };

  const handleRemoveRefLink = (idx: number) => {
    setReferenceLinks(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newFile = {
        id: 'file_' + Date.now(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type || 'attachment',
        progress: 100,
        previewUrl: file.type.startsWith('image') ? URL.createObjectURL(file) : undefined
      };
      setUploadedFiles(prev => [...prev, newFile]);
    }
  };

  const handleSubmit = (status: 'active' | 'draft') => {
    if (!title.trim()) {
      alert('Please enter a campaign title.');
      return;
    }

    const payload = {
      title,
      description,
      brandName: currentUser.name || 'ClipKenya Partner',
      brandLogo: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      brandId: currentUser.id,
      budgetKES,
      budgetUSD: Math.round((budgetKES / 130) * 100) / 100,
      category,
      deadline,
      deliverables: [`${maxClips} short-form viral clips`, `${videoDuration} duration`, requiredResolution],
      requirements: instructions || 'Follow brand safety guidelines, use provided hashtags, and post on TikTok/Reels.',
      targetNiche: [category, 'Viral Clips'],
      platform,
      difficulty,
      paymentPerClipKES,
      maxClips,
      requiredResolution,
      aspectRatio,
      videoDuration,
      instructions,
      targetAudience,
      referenceLinks,
      hashtags: hashtagsStr.split(',').map(h => h.trim()).filter(Boolean),
      keywords: keywordsStr.split(',').map(k => k.trim()).filter(Boolean),
      tags: [category, difficulty],
      allowRevisions,
      visibility,
      status
    };

    if (campaign) {
      updateCampaign(campaign.id, payload);
    } else {
      createCampaign(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white font-heading">
                {campaign ? 'Edit Campaign Studio' : 'Create New Video Bounty Campaign'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Setup requirements, payouts, and source files for video clippers & creators.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>1. Basic Campaign Information</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., FIFA 2026 Kenyan Championship Stream Highlights & Reaction Clips"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Campaign Overview & Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the stream/video content, key highlights, and what type of clips perform best..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Clipper Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e: any) => setDifficulty(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Beginner">Beginner (Simple trim & cuts)</option>
                  <option value="Intermediate">Intermediate (Subtitles + SFX + Zoom)</option>
                  <option value="Pro">Pro (Heavy motion graphics & color grading)</option>
                  <option value="Viral Masters">Viral Masters (Custom 3D + Trending Memes)</option>
                </select>
              </div>

            </div>
          </div>

          {/* Section 2: Budget & Payout Rules */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>2. Budget, Payout & Deadlines</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Total Escrow Budget (KES)
                </label>
                <input
                  type="number"
                  value={budgetKES}
                  onChange={(e) => setBudgetKES(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Payment Per Approved Clip (KES)
                </label>
                <input
                  type="number"
                  value={paymentPerClipKES}
                  onChange={(e) => setPaymentPerClipKES(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Max Approved Clips Pool
                </label>
                <input
                  type="number"
                  value={maxClips}
                  onChange={(e) => setMaxClips(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Submission Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Platform
                </label>
                <select
                  value={platform}
                  onChange={(e: any) => setPlatform(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="tiktok">TikTok Video</option>
                  <option value="youtube">YouTube Shorts</option>
                  <option value="instagram">Instagram Reels</option>
                  <option value="all">All Short-form Platforms</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e: any) => setAspectRatio(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="9:16">9:16 (Vertical Short)</option>
                  <option value="16:9">16:9 (Landscape HD)</option>
                  <option value="1:1">1:1 (Square Feed)</option>
                  <option value="4:5">4:5 (Portrait Feed)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Technical Specifications & Guidelines */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>3. Technical Specs & Viral Guidelines</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Required Video Resolution
                </label>
                <input
                  type="text"
                  value={requiredResolution}
                  onChange={(e) => setRequiredResolution(e.target.value)}
                  placeholder="e.g., 1080x1920 (60FPS Preferred)"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Clip Duration
                </label>
                <input
                  type="text"
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(e.target.value)}
                  placeholder="e.g., 30 - 60 Seconds"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Editing Instructions & Creative Brief
                </label>
                <textarea
                  rows={3}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Include dynamic animated captions, sound effects on key moments, keep intro hook under 3 seconds..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mandatory Hashtags (comma separated)
                </label>
                <input
                  type="text"
                  value={hashtagsStr}
                  onChange={(e) => setHashtagsStr(e.target.value)}
                  placeholder="#ClipKenya, #NairobiGaming, #ViralClips"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Keywords / Tags
                </label>
                <input
                  type="text"
                  value={keywordsStr}
                  onChange={(e) => setKeywordsStr(e.target.value)}
                  placeholder="gaming, esports, football, reaction"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

            </div>
          </div>

          {/* Section 4: Video Uploads & Brand Assets */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>4. Video Source Files & Brand Assets Upload</span>
            </h4>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
              className={`p-6 rounded-2xl border-2 border-dashed text-center transition-all ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Drag and drop long-form stream footage, logos, or guidelines
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 mb-3">
                Supports MP4, MOV, PNG, JPG, MP3, PDF up to 2GB per file
              </p>
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Browse Local Files</span>
                <input type="file" onChange={handleSimulateFileUpload} className="hidden" />
              </label>
            </div>

            {/* Uploaded File List */}
            <div className="space-y-2">
              {uploadedFiles.map((f) => (
                <div key={f.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold">
                      {f.type.includes('video') ? <Film className="w-4 h-4" /> : f.type.includes('image') ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{f.name}</p>
                      <span className="text-[10px] text-slate-400">{f.size} • Uploaded</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedFiles(prev => prev.filter(x => x.id !== f.id))}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

          </div>

          {/* Section 5: Settings & Visibility */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={allowRevisions}
                  onChange={(e) => setAllowRevisions(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>Allow 1 Free Revision Request for Approved Candidates</span>
              </label>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Visibility:</span>
                <select
                  value={visibility}
                  onChange={(e: any) => setVisibility(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium"
                >
                  <option value="public">Public (Visible in Marketplace)</option>
                  <option value="invite_only">Invite Only</option>
                  <option value="private">Private Draft</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => handleSubmit('draft')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
          >
            Save as Draft
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold text-xs"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmit('active')}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{campaign ? 'Update Campaign' : 'Publish Campaign & Lock Escrow'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
