import React, { useState } from 'react';
import { DetailedCourse, UserEnrollment } from '../../types/academy';
import {
  X,
  Star,
  Clock,
  PlayCircle,
  Award,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
  Globe,
  Users,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileText,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface CourseDetailModalProps {
  course: DetailedCourse;
  enrollment?: UserEnrollment;
  onClose: () => void;
  onEnrollCourse: (course: DetailedCourse, paymentMethod?: 'free' | 'mpesa' | 'wallet') => void;
  onOpenClassroom: (course: DetailedCourse) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  enrollment,
  onClose,
  onEnrollCourse,
  onOpenClassroom
}) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'instructor' | 'reviews' | 'faqs'>('overview');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.modules[0]?.id || 'mod_1']: true
  });
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+254 712 345678');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const isEnrolled = !!enrollment;

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEnrollClick = () => {
    if (isEnrolled) {
      onOpenClassroom(course);
      onClose();
      return;
    }

    if (course.priceKES === 0) {
      onEnrollCourse(course, 'free');
      addToast('🎉 Enrolled successfully! Welcome to the course.', 'success');
      onOpenClassroom(course);
      onClose();
    } else {
      setPaymentModalOpen(true);
    }
  };

  const handleMpesaPay = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentModalOpen(false);
      onEnrollCourse(course, 'mpesa');
      addToast(`✅ Payment of ${course.priceKES.toLocaleString()} KES received via M-Pesa STK! Enrolled!`, 'success');
      onOpenClassroom(course);
      onClose();
    }, 1500);
  };

  const handleWalletPay = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentModalOpen(false);
      onEnrollCourse(course, 'wallet');
      addToast(`✅ Enrolled using ClipForge Wallet balance!`, 'success');
      onOpenClassroom(course);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="relative bg-slate-950 text-white p-6 sm:p-8 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-medium">
                  {course.level}
                </span>
                <div className="flex items-center gap-1 text-amber-400 font-bold ml-auto sm:ml-0">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{course.rating}</span>
                  <span className="text-slate-400 font-normal">({course.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-3xl font-heading font-extrabold text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>Created by <strong className="text-white">{course.instructor.name}</strong></span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>{course.studentsCount.toLocaleString()} Students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4 text-indigo-400" />
                  <span>{course.language}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-center">
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Tuition Fee</div>
                {course.priceKES === 0 ? (
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
                    100% FREE
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                      {course.priceKES.toLocaleString()} KES
                    </span>
                    {course.originalPriceKES && (
                      <span className="text-xs text-slate-500 line-through font-normal">
                        {course.originalPriceKES.toLocaleString()} KES
                      </span>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={handleEnrollClick}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                {isEnrolled ? (
                  <>
                    <PlayCircle className="w-5 h-5" />
                    <span>Open Classroom</span>
                  </>
                ) : course.priceKES === 0 ? (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Enroll Now (Free)</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Enroll & Pay ({course.priceKES.toLocaleString()} KES)</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant access & Verified Certificate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-6 shrink-0 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'syllabus', label: `Syllabus (${course.modules.length} Modules)` },
            { id: 'instructor', label: 'Instructor' },
            { id: 'reviews', label: `Reviews (${course.reviewsCount})` },
            { id: 'faqs', label: 'FAQs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* About Course */}
              <div className="space-y-3">
                <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                  About This Masterclass
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {course.longDescription}
                </p>
              </div>

              {/* Skills Learned */}
              <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
                <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  What You Will Learn
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {course.skillsLearned.map((skill, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Prerequisites
                </h4>
                <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  {course.prerequisites.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Certificate Banner */}
              {course.certificateAvailable && (
                <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 text-center sm:text-left flex-1">
                    <h4 className="text-sm font-bold text-white font-heading">
                      Official ClipForge Verified Creator Certificate
                    </h4>
                    <p className="text-xs text-slate-300">
                      Complete all module lessons and quizzes to earn a shareable, verified badge for your LinkedIn and portfolio.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SYLLABUS TAB */}
          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                  Course Modules & Curriculum
                </h3>
                <span className="text-xs text-slate-500">
                  {course.lessonsCount} lessons • {course.duration} total
                </span>
              </div>

              <div className="space-y-3">
                {course.modules.map((module) => {
                  const isExpanded = !!expandedModules[module.id];
                  return (
                    <div
                      key={module.id}
                      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-heading">
                            {module.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {module.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-2">
                          <span className="text-[11px] text-slate-400 font-medium">
                            {module.lessons.length} lessons
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-slate-100 dark:border-slate-800/80 divide-y divide-slate-100 dark:divide-slate-800/60 bg-slate-50/50 dark:bg-slate-950/40">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="p-3.5 px-5 flex items-center justify-between text-xs hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <PlayCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                                <div>
                                  <span className="font-medium text-slate-800 dark:text-slate-200">
                                    {lesson.title}
                                  </span>
                                  {lesson.isFreePreview && (
                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                                      Free Preview
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                                {lesson.resources && lesson.resources.length > 0 && (
                                  <span className="flex items-center gap-1 text-slate-500">
                                    <FileText className="w-3 h-3" />
                                    {lesson.resources.length} files
                                  </span>
                                )}
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          ))}

                          {module.quiz && (
                            <div className="p-3.5 px-5 bg-indigo-50/50 dark:bg-indigo-950/30 flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-300 font-semibold">
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                <span>Module Quiz: {module.quiz.title}</span>
                              </div>
                              <span className="text-[11px] font-normal text-indigo-600 dark:text-indigo-400">
                                {module.quiz.questions.length} questions
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* INSTRUCTOR TAB */}
          {activeTab === 'instructor' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/30 shadow-md"
                />
                <div className="space-y-2 text-center sm:text-left">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-1.5">
                      <span>{course.instructor.name}</span>
                      {course.instructor.verified && (
                        <ShieldCheck className="w-4 h-4 text-indigo-500" />
                      )}
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                      {course.instructor.role}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {course.instructor.bio}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-2">
                    <div>
                      <strong className="text-slate-900 dark:text-white">{course.instructor.rating}</strong> ⭐ Rating
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white">{course.instructor.studentsCount.toLocaleString()}</strong> Students
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white">{course.instructor.coursesCount}</strong> Courses
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                Student Feedback & Reviews
              </h3>

              {course.reviews.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                  No written reviews yet. Be the first to finish and leave a review!
                </div>
              ) : (
                <div className="space-y-3">
                  {course.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={rev.userAvatar}
                            alt={rev.userName}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {rev.userName}
                            </span>
                            <div className="flex items-center gap-0.5 text-amber-400">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* FAQS TAB */}
          {activeTab === 'faqs' && (
            <div className="space-y-3">
              <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              {course.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1"
                >
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-500" />
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAYMENT SUB-MODAL */}
        {paymentModalOpen && (
          <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-heading font-extrabold text-slate-900 dark:text-white">
                  Enroll in Masterclass
                </h3>
                <button
                  onClick={() => setPaymentModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1 text-xs">
                <div className="text-slate-500">Course</div>
                <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{course.title}</div>
                <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Total Amount</span>
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">
                    {course.priceKES.toLocaleString()} KES
                  </span>
                </div>
              </div>

              {/* M-PESA Express Form */}
              <form onSubmit={handleMpesaPay} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    M-Pesa Mobile Number
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>

                <button
                  type="submit"
                  disabled={paymentProcessing}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  {paymentProcessing ? (
                    <span>Sending M-Pesa STK Push...</span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Pay {course.priceKES.toLocaleString()} KES via M-Pesa STK</span>
                    </>
                  )}
                </button>
              </form>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                <span className="flex-shrink mx-3 text-[10px] text-slate-400 uppercase font-bold">OR</span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              </div>

              <button
                type="button"
                onClick={handleWalletPay}
                disabled={paymentProcessing}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Pay from ClipForge Wallet Balance</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
