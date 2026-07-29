import React, { useState } from 'react';
import { DetailedCourse } from '../../types/academy';
import {
  X,
  Plus,
  Video,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Award,
  CheckCircle2,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface InstructorStudioModalProps {
  onClose: () => void;
  onPublishCourse: (courseData: Partial<DetailedCourse>) => void;
}

export const InstructorStudioModal: React.FC<InstructorStudioModalProps> = ({
  onClose,
  onPublishCourse
}) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'analytics' | 'create'>('analytics');
  const [step, setStep] = useState(1);

  // New Course Wizard Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<any>('Video Editing');
  const [level, setLevel] = useState<any>('Beginner');
  const [priceKES, setPriceKES] = useState<number>(1500);
  const [isFree, setIsFree] = useState(false);
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      addToast('Please fill in the course title and description.', 'warning');
      return;
    }

    const newCourse: Partial<DetailedCourse> = {
      title,
      category,
      level,
      priceKES: isFree ? 0 : priceKES,
      description,
      duration: '2.0 Hours',
      lessonsCount: 8,
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 0,
      skillsLearned: [title, 'Commercial Editing', 'Bounty Submissions'],
      prerequisites: ['Basic editing tools'],
      certificateAvailable: true
    };

    onPublishCourse(newCourse);
    addToast('🎉 Masterclass published to ClipKenya Academy!', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 shrink-0">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Creator Studio
            </span>
            <h3 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">
              ClipKenya Academy Instructor Hub
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'analytics'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Instructor Analytics
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'create'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Masterclass</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          {activeTab === 'analytics' ? (
            /* ANALYTICS VIEW */
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Total Revenue</div>
                  <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-heading">
                    184,500 KES
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Total Students</div>
                  <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-heading">
                    2,840
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Avg Course Rating</div>
                  <div className="text-xl font-extrabold text-amber-500 font-heading flex items-center gap-1">
                    <span>4.9</span>
                    <Star className="w-4 h-4 fill-amber-500" />
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/50 space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Completion Rate</div>
                  <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 font-heading">
                    78.4%
                  </div>
                </div>
              </div>

              {/* Published Courses List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Your Published Masterclasses
                </h4>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 overflow-hidden shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80"
                        alt="Course"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        Monetizing Short-Form Content in Kenya & Africa
                      </h5>
                      <div className="text-[11px] text-slate-500">
                        1,420 Students enrolled • Free Masterclass
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    Active
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* CREATE COURSE WIZARD */
            <form onSubmit={handlePublish} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Masterclass Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g. CapCut Motion Graphics & Subtitle Hacks"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Monetization">Monetization</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="UGC & Branding">UGC & Branding</option>
                    <option value="AI Tools">AI Tools</option>
                    <option value="Audience Growth">Audience Growth</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Short Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={3}
                    placeholder="Describe what students will learn in this course..."
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Preview Video URL
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Pricing Toggle */}
                <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Pricing (KES)
                    </span>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-300 font-semibold">
                      <input
                        type="checkbox"
                        checked={isFree}
                        onChange={(e) => setIsFree(e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Make this course 100% Free</span>
                    </label>
                  </div>

                  {!isFree && (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={priceKES}
                        onChange={(e) => setPriceKES(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-indigo-600 outline-none"
                      />
                      <span className="text-xs font-bold text-slate-500">KES</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish Masterclass to ClipKenya</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
