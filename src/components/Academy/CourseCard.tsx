import React from 'react';
import { DetailedCourse, UserEnrollment } from '../../types/academy';
import { Star, Clock, PlayCircle, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface CourseCardProps {
  course: DetailedCourse;
  enrollment?: UserEnrollment;
  onSelectCourse: (course: DetailedCourse) => void;
  onOpenClassroom: (course: DetailedCourse) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  enrollment,
  onSelectCourse,
  onOpenClassroom
}) => {
  const isEnrolled = !!enrollment;
  const progressPercent = enrollment?.progressPercent || 0;

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Thumbnail Header */}
        <div className="relative h-48 w-full bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onSelectCourse(course)}>
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

          {/* Level Tag */}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
            {course.level}
          </span>

          {/* Price or Free Badge */}
          <div className="absolute bottom-3 right-3">
            {course.priceKES === 0 ? (
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-sm">
                FREE
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-sm">
                {course.priceKES.toLocaleString()} KES
              </span>
            )}
          </div>

          {/* Category Badge */}
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-medium text-slate-300 border border-slate-700">
            {course.category}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          {/* Instructor & Rating */}
          <div className="flex items-center gap-2">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full object-cover border border-indigo-500/30"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate max-w-[140px]">
              {course.instructor.name}
            </span>
            <div className="ml-auto flex items-center gap-1 text-xs text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{course.rating}</span>
              <span className="text-[10px] text-slate-400 font-normal">({course.reviewsCount})</span>
            </div>
          </div>

          {/* Course Title */}
          <h3
            onClick={() => onSelectCourse(course)}
            className="font-heading font-extrabold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
          >
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <PlayCircle className="w-3.5 h-3.5 text-indigo-500" />
              <span>{course.lessonsCount} lessons</span>
            </div>
            {course.certificateAvailable && (
              <div className="flex items-center gap-1 ml-auto text-emerald-600 dark:text-emerald-400 font-medium">
                <Award className="w-3.5 h-3.5" />
                <span>Certificate</span>
              </div>
            )}
          </div>

          {/* Key Topics */}
          <div className="space-y-1 pt-1">
            {course.topics.slice(0, 2).map((topic, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0" />
                <span className="truncate">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress or Enroll Button Footer */}
      <div className="p-5 pt-0 space-y-2">
        {isEnrolled ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Progress</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <button
              onClick={() => onOpenClassroom(course)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              <span>{progressPercent === 100 ? 'Review Classroom' : 'Continue Learning'}</span>
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => onSelectCourse(course)}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => onSelectCourse(course)}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{course.priceKES === 0 ? 'Enroll Free' : 'View Syllabus'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
