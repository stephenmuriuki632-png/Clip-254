import React from 'react';
import { CertificateData, DetailedCourse } from '../../types/academy';
import { X, Award, Download, Share2, CheckCircle2, ShieldCheck, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface CertificateModalProps {
  course: DetailedCourse;
  certificate?: CertificateData;
  studentName: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  course,
  certificate,
  studentName,
  onClose
}) => {
  const { addToast } = useToast();

  const certData: CertificateData = certificate || {
    id: 'cert_88192',
    courseId: course.id,
    courseTitle: course.title,
    studentName: studentName || 'Maina Kamau',
    studentId: 'usr_me_001',
    instructorName: `${course.instructor.name} & ClipForge Academy`,
    issueDate: new Date().toISOString().split('T')[0],
    verificationCode: `CK-ACADEMY-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    badgeUrl: course.thumbnail,
    skills: course.skillsLearned
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://clipforge.africa/verify-certificate/${certData.verificationCode}`);
    addToast('Certificate verification link copied to clipboard!', 'success');
  };

  const handleDownload = () => {
    addToast('Generating high-resolution PDF certificate...', 'info');
    setTimeout(() => {
      addToast('🎉 Certificate downloaded!', 'success');
    }, 1500);
  };

  const handleShareLinkedIn = () => {
    window.open('https://www.linkedin.com/feed/', '_blank');
    addToast('Opening LinkedIn to post your certificate badge!', 'info');
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <h3 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
              Official ClipForge Verified Certificate
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Card Frame */}
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white border-4 border-amber-500/40 shadow-2xl space-y-8 overflow-hidden text-center">
          
          {/* Subtle Watermark BG */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0,transparent_70%)] pointer-events-none" />

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-widest mx-auto">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>ClipForge Creator Academy</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
              This is to certify that
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-amber-400 tracking-wide">
              {certData.studentName}
            </h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto pt-1">
              has successfully completed all module lessons, passed quizzes, and submitted required projects for the masterclass:
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 max-w-xl mx-auto">
            <h3 className="text-sm sm:text-lg font-bold font-heading text-white line-clamp-2">
              {certData.courseTitle}
            </h3>
          </div>

          {/* Verification Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400 pt-4 border-t border-slate-800 max-w-xl mx-auto">
            <div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Issue Date</div>
              <div className="font-bold text-white">{certData.issueDate}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Verification Code</div>
              <div className="font-mono text-amber-400 font-bold text-[11px]">{certData.verificationCode}</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Instructor</div>
              <div className="font-bold text-white truncate">{certData.instructorName}</div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Copy className="w-4 h-4 text-indigo-500" />
            <span>Copy Link</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareLinkedIn}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Add to LinkedIn</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
