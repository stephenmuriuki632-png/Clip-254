import React from 'react';
import { LearningPath, DetailedCourse } from '../../types/academy';
import { MOCK_LEARNING_PATHS } from '../../data/academyData';
import { Scissors, Briefcase, ChevronRight, CheckCircle2, PlayCircle, Award, Sparkles } from 'lucide-react';

interface LearningPathsViewProps {
  courses: DetailedCourse[];
  onSelectCourse: (course: DetailedCourse) => void;
}

export const LearningPathsView: React.FC<LearningPathsViewProps> = ({
  courses,
  onSelectCourse
}) => {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
          <Sparkles className="w-4 h-4" />
          <span>Structured Career Roadmaps</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold font-heading">
          Guided Learning Paths
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Follow step-by-step course sequences curated by top African creators to go from complete beginner to landing high-paying commercial video contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_LEARNING_PATHS.map((path) => (
          <div
            key={path.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {path.icon === 'Scissors' ? <Scissors className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
                  {path.estimatedDuration} • {path.level}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
                  {path.title}
                </h3>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {path.subtitle}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {path.description}
                </p>
              </div>

              {/* Step Sequence */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Path Sequence ({path.steps.length} Masterclasses)
                </h4>

                <div className="space-y-2.5">
                  {path.steps.map((step) => {
                    const matchedCourse = courses.find((c) => c.id === step.courseId);
                    return (
                      <div
                        key={step.id}
                        onClick={() => matchedCourse && onSelectCourse(matchedCourse)}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500/50 cursor-pointer transition-colors flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                            {step.stepNumber}
                          </span>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {step.title}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              {step.description}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Badge Unlocked Upon Completion */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-xs text-amber-900 dark:text-amber-300">
              <Award className="w-5 h-5 text-amber-500 shrink-0" />
              <span>
                Earn the official <strong>{path.badgeName}</strong> certificate badge upon finishing this path!
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
