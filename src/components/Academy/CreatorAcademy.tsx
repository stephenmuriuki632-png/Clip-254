import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Star, Clock, PlayCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MOCK_COURSES } from '../../data/mockData';

export const CreatorAcademy: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
          <GraduationCap className="w-4 h-4" />
          <span>ClipKenya Academy</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
          Master the African Creator Economy
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Free masterclasses and premium guides on video clipping bounties, landing $1,000 brand deals, CapCut Pro editing tricks, and growing an authentic fanbase.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_COURSES.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                  {course.level}
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold">
                  {course.priceKES === 0 ? 'FREE' : `${course.priceKES.toLocaleString()} KES`}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <img src={course.instructorAvatar} alt={course.instructor} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-xs text-slate-500 font-medium">{course.instructor}</span>
                  <div className="ml-auto flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {course.description}
                </p>

                <div className="space-y-1 pt-1">
                  {course.topics.slice(0, 3).map(t => (
                    <div key={t} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <CheckCircle2 className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs">
                <PlayCircle className="w-4 h-4" />
                <span>Start Learning Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
