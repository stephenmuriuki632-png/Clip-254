import React, { useState } from 'react';
import { CourseModule, CourseAssignment } from '../../types/academy';
import { X, CheckCircle2, Upload, Link, Sparkles, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AssignmentRunnerModalProps {
  module: CourseModule;
  onClose: () => void;
  onAssignmentSubmitted: (assignmentId: string, submissionUrl: string) => void;
}

export const AssignmentRunnerModal: React.FC<AssignmentRunnerModalProps> = ({
  module,
  onClose,
  onAssignmentSubmitted
}) => {
  const { addToast } = useToast();
  const assignment: CourseAssignment = module.assignment || {
    id: 'assign_demo',
    title: 'Practical Project: Edit 1 Viral Bounty Clip',
    instructions: 'Download raw stream footage, edit a 30-45s vertical clip with dynamic captions, and submit your Google Drive or TikTok link.',
    rubric: [
      'Vertical 9:16 aspect ratio',
      'Strong visual or audio hook within first 3 seconds',
      'Animated captions with clear typography',
      'HD 1080p clean export'
    ],
    submissionType: 'video_url'
  };

  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submissionText, setSubmissionText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionUrl.trim() && !submissionText.trim()) {
      addToast('Please provide a video link or project notes before submitting.', 'warning');
      return;
    }

    setSubmitted(true);
    onAssignmentSubmitted(assignment.id, submissionUrl || 'Text submission');
    addToast('🎉 Project submitted successfully! Your instructor will review it shortly.', 'success');
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
              {module.title}
            </span>
            <h3 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
              {assignment.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <p className="leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            {assignment.instructions}
          </p>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Grading Rubric Checklist
            </h4>
            <div className="space-y-1.5">
              {assignment.rubric.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Link className="w-4 h-4 text-indigo-500" />
                <span>Project Video URL (TikTok / YouTube / Google Drive)</span>
              </label>
              <input
                type="url"
                value={submissionUrl}
                onChange={(e) => setSubmissionUrl(e.target.value)}
                placeholder="https://tiktok.com/@yourhandle/video/..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Additional Notes / CapCut Presets Used
              </label>
              <textarea
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                rows={3}
                placeholder="Describe your editing process or link raw assets..."
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Assignment for Grading</span>
            </button>
          </form>
        ) : (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-emerald-400 font-heading">
              Submitted for Instructor Review
            </h4>
            <p className="text-xs text-slate-300">
              Your submission link: <span className="font-mono text-indigo-300">{submissionUrl}</span>
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
