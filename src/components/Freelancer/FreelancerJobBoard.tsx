import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Plus,
  Clock,
  DollarSign,
  Send,
  Sparkles,
  FileText,
  UserCheck,
  X,
  Paperclip,
  CheckCircle2
} from 'lucide-react';
import {
  JobPosting,
  FreelanceProposal,
  FreelancerCategory,
  ExperienceLevel
} from '../../types/freelancer';

interface FreelancerJobBoardProps {
  jobs: JobPosting[];
  proposals: FreelanceProposal[];
  onPostJob: (jobData: Partial<JobPosting>) => void;
  onSubmitProposal: (proposalData: Partial<FreelanceProposal>) => void;
}

export const FreelancerJobBoard: React.FC<FreelancerJobBoardProps> = ({
  jobs,
  proposals,
  onPostJob,
  onSubmitProposal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal states
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [selectedJobForProposal, setSelectedJobForProposal] = useState<JobPosting | null>(null);

  // Post Job form state
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobBudget, setJobBudget] = useState<number>(100000);
  const [jobCategory, setJobCategory] = useState<FreelancerCategory>('Full Stack Development');
  const [jobDeadline, setJobDeadline] = useState('2026-08-30');
  const [jobExpLevel, setJobExpLevel] = useState<ExperienceLevel>('Intermediate');

  // Proposal form state
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedPrice, setProposedPrice] = useState<number>(90000);
  const [estDays, setEstDays] = useState<number>(5);

  // Filtered jobs
  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = selectedCategory === 'all' || j.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim() || !jobDesc.trim()) return;

    onPostJob({
      title: jobTitle,
      description: jobDesc,
      budgetKES: jobBudget,
      category: jobCategory,
      deadline: jobDeadline,
      experienceLevel: jobExpLevel,
      skills: ['React', 'Node.js', 'Tailwind CSS'],
      requiredLanguages: ['English', 'Swahili'],
      location: 'Nairobi, Kenya (Remote)'
    });

    setIsPostJobOpen(false);
    setJobTitle('');
    setJobDesc('');
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForProposal || !coverLetter.trim()) return;

    onSubmitProposal({
      jobId: selectedJobForProposal.id,
      jobTitle: selectedJobForProposal.title,
      coverLetter,
      proposedPriceKES: proposedPrice,
      estimatedDeliveryDays: estDays
    });

    setSelectedJobForProposal(null);
    setCoverLetter('');
  };

  return (
    <div className="space-y-6">
      
      {/* Job Board Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold border border-white/20">
                🚀 Upwork & Contra Style Freelance Job Board
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight mt-2">
              Post Freelance Projects or Submit Proposals
            </h1>
            <p className="text-xs text-indigo-200/90 max-w-2xl mt-1">
              Hire vetted African software developers, video editors, and UI designers with M-Pesa escrow protection.
            </p>
          </div>

          <button
            onClick={() => setIsPostJobOpen(true)}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Post a Freelance Job</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 absolute left-3.5 top-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs by title, skill (e.g. React, Video Editing, Figma)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 text-white placeholder-indigo-200/60 border border-white/20 text-xs font-medium focus:outline-none focus:bg-white/20"
          />
        </div>
      </div>

      {/* Job Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          const hasApplied = proposals.some(p => p.jobId === job.id);

          return (
            <div
              key={job.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.clientAvatar}
                      alt={job.clientName}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/30"
                    />
                    <div>
                      <h4 className="font-heading font-extrabold text-slate-900 dark:text-white text-sm">
                        {job.clientName}
                      </h4>
                      <span className="text-[10px] text-slate-400 block">{job.location}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase">
                    {job.experienceLevel}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                    {job.description}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Fixed Budget</span>
                    <span className="font-heading font-black text-lg text-emerald-600 dark:text-emerald-400">
                      {job.budgetKES.toLocaleString()} KES
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Proposals</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{job.proposalsCount} Submitted</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-400">
                  Deadline: {job.deadline}
                </span>

                {hasApplied ? (
                  <span className="px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Proposal Submitted</span>
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedJobForProposal(job);
                      setProposedPrice(job.budgetKES);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1 shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Proposal</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* POST JOB MODAL */}
      {isPostJobOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                Post a Freelance Project Job
              </h3>
              <button onClick={() => setIsPostJobOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostJobSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior React & Node.js Developer Needed"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Detailed Description *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe requirements, deliverables, and technical stack..."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Budget (KES) *</label>
                  <input
                    type="number"
                    required
                    value={jobBudget}
                    onChange={(e) => setJobBudget(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Experience Level</label>
                  <select
                    value={jobExpLevel}
                    onChange={(e) => setJobExpLevel(e.target.value as ExperienceLevel)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Entry Level">Entry Level</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPostJobOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Post Job Brief</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUBMIT PROPOSAL MODAL */}
      {selectedJobForProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                  Submit Proposal
                </h3>
                <p className="text-xs text-slate-400">{selectedJobForProposal.title}</p>
              </div>
              <button onClick={() => setSelectedJobForProposal(null)} className="p-2 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProposalSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Cover Letter & Approach *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain why you are the best fit, past relevant work, and timeline..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Proposed Price (KES)</label>
                  <input
                    type="number"
                    required
                    value={proposedPrice}
                    onChange={(e) => setProposedPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Estimated Days</label>
                  <input
                    type="number"
                    required
                    value={estDays}
                    onChange={(e) => setEstDays(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedJobForProposal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Proposal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
