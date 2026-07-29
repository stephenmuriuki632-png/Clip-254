import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DetailedCourse, UserEnrollment, CourseModule } from '../../types/academy';
import { DETAILED_COURSES } from '../../data/academyData';
import { CourseCard } from './CourseCard';
import { CourseDetailModal } from './CourseDetailModal';
import { LessonClassroomModal } from './LessonClassroomModal';
import { QuizRunnerModal } from './QuizRunnerModal';
import { AssignmentRunnerModal } from './AssignmentRunnerModal';
import { CertificateModal } from './CertificateModal';
import { InstructorStudioModal } from './InstructorStudioModal';
import { LearningPathsView } from './LearningPathsView';
import { LeaderboardView } from './LeaderboardView';
import {
  GraduationCap,
  Search,
  Sparkles,
  BookOpen,
  Award,
  Trophy,
  Plus,
  Flame,
  CheckCircle2,
  Filter,
  PlayCircle,
  Users,
  Compass
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const CreatorAcademy: React.FC = () => {
  const { user } = useApp();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<'explore' | 'my-learning' | 'paths' | 'instructor' | 'leaderboard'>('explore');

  // Courses state
  const [coursesList, setCoursesList] = useState<DetailedCourse[]>(DETAILED_COURSES);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');

  // Active Enrollments State
  const [enrollments, setEnrollments] = useState<Record<string, UserEnrollment>>({
    course_001: {
      courseId: 'course_001',
      enrolledAt: '2026-07-20',
      progressPercent: 50,
      completedLessonIds: ['les_101', 'les_102'],
      quizScores: { quiz_101: 100 },
      assignmentSubmissions: {},
      isCompleted: false
    }
  });

  // Modal Controllers
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<DetailedCourse | null>(null);
  const [activeClassroomCourse, setActiveClassroomCourse] = useState<DetailedCourse | null>(null);
  const [activeQuizModule, setActiveQuizModule] = useState<CourseModule | null>(null);
  const [activeAssignmentModule, setActiveAssignmentModule] = useState<CourseModule | null>(null);
  const [activeCertificateCourse, setActiveCertificateCourse] = useState<DetailedCourse | null>(null);
  const [isInstructorStudioOpen, setIsInstructorStudioOpen] = useState(false);

  // Enroll Handler
  const handleEnrollCourse = (course: DetailedCourse, paymentMethod: 'free' | 'mpesa' | 'wallet' = 'free') => {
    setEnrollments((prev) => ({
      ...prev,
      [course.id]: {
        courseId: course.id,
        enrolledAt: new Date().toISOString().split('T')[0],
        progressPercent: 0,
        completedLessonIds: [],
        quizScores: {},
        assignmentSubmissions: {},
        isCompleted: false
      }
    }));
  };

  // Toggle Lesson Completion
  const handleLessonComplete = (courseId: string, lessonId: string) => {
    const course = coursesList.find((c) => c.id === courseId);
    if (!course) return;

    const allLessons = course.modules.flatMap((m) => m.lessons);
    const existing = enrollments[courseId] || {
      courseId,
      enrolledAt: new Date().toISOString().split('T')[0],
      progressPercent: 0,
      completedLessonIds: [],
      quizScores: {},
      assignmentSubmissions: {},
      isCompleted: false
    };

    const isAlreadyDone = existing.completedLessonIds.includes(lessonId);
    let updatedCompleted = isAlreadyDone
      ? existing.completedLessonIds.filter((id) => id !== lessonId)
      : [...existing.completedLessonIds, lessonId];

    const progress = Math.round((updatedCompleted.length / allLessons.length) * 100);

    setEnrollments((prev) => ({
      ...prev,
      [courseId]: {
        ...existing,
        completedLessonIds: updatedCompleted,
        progressPercent: progress,
        isCompleted: progress === 100
      }
    }));
  };

  const handleQuizPassed = (quizId: string, scorePercent: number) => {
    if (!activeClassroomCourse) return;
    const courseId = activeClassroomCourse.id;

    setEnrollments((prev) => {
      const existing = prev[courseId] || {
        courseId,
        enrolledAt: new Date().toISOString().split('T')[0],
        progressPercent: 0,
        completedLessonIds: [],
        quizScores: {},
        assignmentSubmissions: {},
        isCompleted: false
      };
      return {
        ...prev,
        [courseId]: {
          ...existing,
          quizScores: { ...existing.quizScores, [quizId]: scorePercent }
        }
      };
    });
  };

  const handleAssignmentSubmitted = (assignmentId: string, submissionUrl: string) => {
    if (!activeClassroomCourse) return;
    const courseId = activeClassroomCourse.id;

    setEnrollments((prev) => {
      const existing = prev[courseId] || {
        courseId,
        enrolledAt: new Date().toISOString().split('T')[0],
        progressPercent: 0,
        completedLessonIds: [],
        quizScores: {},
        assignmentSubmissions: {},
        isCompleted: false
      };
      return {
        ...prev,
        [courseId]: {
          ...existing,
          assignmentSubmissions: {
            ...existing.assignmentSubmissions,
            [assignmentId]: { status: 'submitted', submissionUrl }
          }
        }
      };
    });
  };

  const handlePublishCourse = (newCourseData: Partial<DetailedCourse>) => {
    const created: DetailedCourse = {
      id: `course_${Date.now()}`,
      title: newCourseData.title || 'New Masterclass',
      slug: `course-${Date.now()}`,
      category: newCourseData.category || 'Video Editing',
      level: newCourseData.level || 'Beginner',
      duration: '2.5 Hours',
      lessonsCount: 6,
      thumbnail: newCourseData.thumbnail || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
      previewVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 1,
      priceKES: newCourseData.priceKES || 0,
      description: newCourseData.description || 'Newly published course.',
      longDescription: newCourseData.description || 'Newly published course.',
      topics: ['Short-Form Editing', 'ClipKenya Bounties'],
      prerequisites: ['Basic editing tools'],
      skillsLearned: ['Video Editing', 'Bounty Payouts'],
      instructor: {
        id: user?.id || 'usr_me_001',
        name: user?.name || 'Maina Kamau',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        role: 'Pro Creator & Instructor',
        bio: user?.bio || 'ClipKenya verified creator.',
        rating: 5.0,
        studentsCount: 1,
        coursesCount: 1,
        verified: true
      },
      modules: [
        {
          id: `mod_${Date.now()}`,
          title: 'Module 1: Getting Started',
          description: 'Introduction to masterclass',
          order: 1,
          lessons: [
            {
              id: `les_${Date.now()}`,
              title: 'Lesson 1: Overview & Tools',
              duration: '12:00',
              videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              summary: 'Overview of topics'
            }
          ]
        }
      ],
      reviews: [],
      faqs: [],
      certificateAvailable: true,
      updatedAt: new Date().toISOString().split('T')[0],
      language: 'English'
    };

    setCoursesList([created, ...coursesList]);
  };

  // Filtered Courses Calculation
  const filteredCourses = coursesList.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || c.level === selectedLevel;
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'free' && c.priceKES === 0) ||
      (priceFilter === 'paid' && c.priceKES > 0);

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  const enrolledCoursesList = coursesList.filter((c) => !!enrollments[c.id]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Hero Banner Header */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <GraduationCap className="w-4 h-4" />
              <span>ClipKenya Academy & Learning Suite</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              Master the African Creator Economy
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Free masterclasses and premium guides on video clipping bounties, landing $1,000 brand deals, CapCut Pro editing tricks, and growing an authentic fanbase.
            </p>
          </div>

          <button
            onClick={() => setIsInstructorStudioOpen(true)}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Masterclass</span>
          </button>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-white">{coursesList.length} Courses</div>
              <div className="text-[10px] text-slate-400">Masterclasses</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-white">12,400+</div>
              <div className="text-[10px] text-slate-400">Active Learners</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-white">100% Verified</div>
              <div className="text-[10px] text-slate-400">Certificates</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-white">18 Days</div>
              <div className="text-[10px] text-slate-400">Your Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Bar */}
      <div className="flex items-center border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2 pb-1">
        {[
          { id: 'explore', label: 'Explore Masterclasses', icon: Compass },
          { id: 'my-learning', label: `My Learning (${enrolledCoursesList.length})`, icon: BookOpen },
          { id: 'paths', label: 'Learning Paths', icon: Sparkles },
          { id: 'leaderboard', label: 'Leaderboard & Badges', icon: Trophy }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: EXPLORE MASTERCLASSES */}
      {activeTab === 'explore' && (
        <div className="space-y-6">
          
          {/* Search & Filters */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses by topic, CapCut, hook science, or instructor..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Price Filter */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                {['all', 'free', 'paid'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriceFilter(p as any)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold uppercase transition-colors flex-1 sm:flex-none ${
                      priceFilter === p
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories bar */}
            <div className="flex items-center gap-2 overflow-x-auto pt-1">
              {[
                'all',
                'Monetization',
                'Video Editing',
                'UGC & Branding',
                'AI Tools',
                'Audience Growth'
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30 font-bold'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                enrollment={enrollments[course.id]}
                onSelectCourse={(c) => setSelectedCourseDetail(c)}
                onOpenClassroom={(c) => setActiveClassroomCourse(c)}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                No courses match your filter criteria
              </h3>
              <p className="text-xs text-slate-500">
                Try resetting your search query or selecting a different category.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB: MY LEARNING */}
      {activeTab === 'my-learning' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
              Enrolled Courses & Certificates
            </h2>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {enrolledCoursesList.length} Active Courses
            </span>
          </div>

          {enrolledCoursesList.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <GraduationCap className="w-12 h-12 text-indigo-500 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  You haven't enrolled in any courses yet
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Browse our free short-form video clipping masterclasses and start learning today!
                </p>
              </div>
              <button
                onClick={() => setActiveTab('explore')}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
              >
                Explore Courses Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCoursesList.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  enrollment={enrollments[course.id]}
                  onSelectCourse={(c) => setSelectedCourseDetail(c)}
                  onOpenClassroom={(c) => setActiveClassroomCourse(c)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: LEARNING PATHS */}
      {activeTab === 'paths' && (
        <LearningPathsView
          courses={coursesList}
          onSelectCourse={(c) => setSelectedCourseDetail(c)}
        />
      )}

      {/* TAB: LEADERBOARD & BADGES */}
      {activeTab === 'leaderboard' && <LeaderboardView />}

      {/* MODALS */}
      {selectedCourseDetail && (
        <CourseDetailModal
          course={selectedCourseDetail}
          enrollment={enrollments[selectedCourseDetail.id]}
          onClose={() => setSelectedCourseDetail(null)}
          onEnrollCourse={handleEnrollCourse}
          onOpenClassroom={(c) => setActiveClassroomCourse(c)}
        />
      )}

      {activeClassroomCourse && (
        <LessonClassroomModal
          course={activeClassroomCourse}
          enrollment={enrollments[activeClassroomCourse.id]}
          onClose={() => setActiveClassroomCourse(null)}
          onLessonComplete={handleLessonComplete}
          onOpenQuiz={(mod) => setActiveQuizModule(mod)}
          onOpenAssignment={(mod) => setActiveAssignmentModule(mod)}
          onOpenCertificate={(c) => setActiveCertificateCourse(c)}
        />
      )}

      {activeQuizModule && (
        <QuizRunnerModal
          module={activeQuizModule}
          onClose={() => setActiveQuizModule(null)}
          onQuizPassed={handleQuizPassed}
        />
      )}

      {activeAssignmentModule && (
        <AssignmentRunnerModal
          module={activeAssignmentModule}
          onClose={() => setActiveAssignmentModule(null)}
          onAssignmentSubmitted={handleAssignmentSubmitted}
        />
      )}

      {activeCertificateCourse && (
        <CertificateModal
          course={activeCertificateCourse}
          studentName={user?.name || 'Maina Kamau'}
          onClose={() => setActiveCertificateCourse(null)}
        />
      )}

      {isInstructorStudioOpen && (
        <InstructorStudioModal
          onClose={() => setIsInstructorStudioOpen(false)}
          onPublishCourse={handlePublishCourse}
        />
      )}

    </div>
  );
};
