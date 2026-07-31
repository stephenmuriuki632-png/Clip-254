import React, { useState } from 'react';
import {
  DetailedCourse,
  CourseLesson,
  UserEnrollment,
  CourseModule
} from '../../types/academy';
import {
  X,
  Play,
  Pause,
  Maximize,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  Lock,
  ChevronRight,
  ChevronDown,
  FileText,
  Download,
  MessageSquare,
  Sparkles,
  BookOpen,
  Send,
  ThumbsUp,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface LessonClassroomModalProps {
  course: DetailedCourse;
  enrollment?: UserEnrollment;
  onClose: () => void;
  onLessonComplete: (courseId: string, lessonId: string) => void;
  onOpenQuiz: (module: CourseModule) => void;
  onOpenAssignment: (module: CourseModule) => void;
  onOpenCertificate: (course: DetailedCourse) => void;
}

export const LessonClassroomModal: React.FC<LessonClassroomModalProps> = ({
  course,
  enrollment,
  onClose,
  onLessonComplete,
  onOpenQuiz,
  onOpenAssignment,
  onOpenCertificate
}) => {
  const { addToast } = useToast();

  // Find first uncompleted or active lesson
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const [currentLesson, setCurrentLesson] = useState<CourseLesson>(
    allLessons[0] || {
      id: 'les_default',
      title: 'Introduction',
      duration: '10:00',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      summary: 'Lesson overview'
    }
  );

  // Video player controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [videoQuality, setVideoQuality] = useState<string>('1080p HD');
  const [isMuted, setIsMuted] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'resources' | 'discussion'>('notes');

  // Notes state
  const [userNotes, setUserNotes] = useState<Record<string, string>>({
    [currentLesson.id]: 'Key takeaways from this video: Remember to add dynamic animated captions with yellow accent text for maximum FYP retention.'
  });

  // Discussion Q&A state
  const [questions, setQuestions] = useState([
    {
      id: 'q_1',
      author: 'Kevin Omondi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      text: 'What CapCut font works best for Swahili subtitles on TikTok?',
      time: '2 hours ago',
      upvotes: 14,
      replies: [
        {
          author: 'Maina Kamau (Instructor)',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          text: 'Montserrat ExtraBold or Poppins Black with a 2px black stroke works best!',
          time: '1 hour ago'
        }
      ]
    }
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');

  const completedLessonIds = enrollment?.completedLessonIds || [];
  const isLessonDone = completedLessonIds.includes(currentLesson.id);

  // Find current module
  const currentModule = course.modules.find((m) =>
    m.lessons.some((l) => l.id === currentLesson.id)
  ) || course.modules[0];

  const handleToggleComplete = () => {
    onLessonComplete(course.id, currentLesson.id);
    addToast(
      isLessonDone
        ? 'Lesson marked as uncompleted'
        : '🎉 Lesson completed! Progress updated.',
      'success'
    );
  };

  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex < allLessons.length - 1) {
      if (!isLessonDone) {
        onLessonComplete(course.id, currentLesson.id);
      }
      setCurrentLesson(allLessons[currentIndex + 1]);
    } else {
      addToast('🎓 Congratulations! You reached the end of the course!', 'success');
      if (course.certificateAvailable) {
        onOpenCertificate(course);
      }
    }
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    const newQ = {
      id: `q_${Date.now()}`,
      author: 'Maina Kamau (You)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      text: newQuestionText,
      time: 'Just now',
      upvotes: 0,
      replies: []
    };
    setQuestions([newQ, ...questions]);
    setNewQuestionText('');
    addToast('Question posted to lesson discussion!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* Top Header Navbar */}
      <div className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
              {course.title}
            </span>
            <h2 className="text-sm font-extrabold text-white font-heading truncate max-w-md">
              {currentLesson.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {course.certificateAvailable && (
            <button
              onClick={() => onOpenCertificate(course)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 font-semibold text-xs border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Claim Certificate</span>
            </button>
          )}

          <button
            onClick={handleToggleComplete}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isLessonDone
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isLessonDone ? 'Completed' : 'Mark as Complete'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Column: Video Player + Notes/Discussion */}
        <div className={`flex-1 flex flex-col overflow-y-auto ${isTheaterMode ? 'w-full' : ''}`}>
          
          {/* Custom Video Player Container */}
          <div className="relative aspect-video w-full bg-black group flex items-center justify-center overflow-hidden border-b border-slate-800">
            {/* Mock Video Canvas / Image */}
            <img
              src={course.thumbnail}
              alt={currentLesson.title}
              className="w-full h-full object-cover opacity-80"
            />

            {/* Video Overlay Play Center */}
            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
            </div>

            {/* Top Video Overlay Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-slate-950/60 backdrop-blur-md px-3.5 py-2 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-white">ClipForge Player HD</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Speed Controls */}
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="bg-slate-800 text-white text-[11px] font-bold px-2 py-1 rounded-lg border border-slate-700 outline-none cursor-pointer"
                >
                  <option value={0.5}>0.5x Speed</option>
                  <option value={1.0}>1.0x Normal</option>
                  <option value={1.25}>1.25x Speed</option>
                  <option value={1.5}>1.5x Speed</option>
                  <option value={2.0}>2.0x Fast</option>
                </select>

                {/* Quality Selector */}
                <select
                  value={videoQuality}
                  onChange={(e) => setVideoQuality(e.target.value)}
                  className="bg-slate-800 text-white text-[11px] font-bold px-2 py-1 rounded-lg border border-slate-700 outline-none cursor-pointer"
                >
                  <option value="1080p HD">1080p HD</option>
                  <option value="720p">720p</option>
                  <option value="480p">480p</option>
                </select>
              </div>
            </div>

            {/* Bottom Video Progress Bar & Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent space-y-2">
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden cursor-pointer">
                <div className="bg-indigo-500 h-full w-1/3 rounded-full"></div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-indigo-400">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setIsMuted(!isMuted)} className="hover:text-indigo-400">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-slate-400 font-mono text-[11px]">03:45 / {currentLesson.duration}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsTheaterMode(!isTheaterMode)}
                    className="hover:text-indigo-400 text-[11px] font-semibold text-slate-300"
                  >
                    {isTheaterMode ? 'Exit Theater' : 'Theater Mode'}
                  </button>
                  <button onClick={handleNextLesson} className="flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300">
                    <span>Next Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Info & Bottom Workspace Tabs */}
          <div className="p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-heading text-white">
                  {currentLesson.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {currentLesson.summary}
                </p>
              </div>

              <button
                onClick={handleNextLesson}
                className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Autoplay Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800">
              {[
                { id: 'notes', label: 'My Notes', icon: FileText },
                { id: 'resources', label: `Resources (${currentLesson.resources?.length || 0})`, icon: Download },
                { id: 'discussion', label: `Discussion Q&A (${questions.length})`, icon: MessageSquare }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB: NOTES */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Interactive Lesson Scratchpad
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Auto-saved to profile</span>
                </div>
                <textarea
                  value={userNotes[currentLesson.id] || ''}
                  onChange={(e) =>
                    setUserNotes((prev) => ({ ...prev, [currentLesson.id]: e.target.value }))
                  }
                  rows={5}
                  className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono"
                  placeholder="Type notes, CapCut settings, or video timestamps here..."
                />
              </div>
            )}

            {/* TAB: RESOURCES */}
            {activeTab === 'resources' && (
              <div className="space-y-3">
                {!currentLesson.resources || currentLesson.resources.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4">
                    No downloadable assets attached to this specific lesson.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentLesson.resources.map((res) => (
                      <div
                        key={res.id}
                        className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{res.title}</div>
                            <div className="text-[10px] text-slate-400">{res.size} • {res.fileType.toUpperCase()}</div>
                          </div>
                        </div>
                        <a
                          href={res.url}
                          onClick={(e) => {
                            e.preventDefault();
                            addToast(`Downloading asset: ${res.title}`, 'info');
                          }}
                          className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: DISCUSSION */}
            {activeTab === 'discussion' && (
              <div className="space-y-4">
                <form onSubmit={handlePostQuestion} className="flex gap-2">
                  <input
                    type="text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Ask a question about this lesson..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post</span>
                  </button>
                </form>

                <div className="space-y-3">
                  {questions.map((q) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={q.avatar} alt={q.author} className="w-6 h-6 rounded-full object-cover" />
                          <span className="text-xs font-bold text-white">{q.author}</span>
                          <span className="text-[10px] text-slate-500">{q.time}</span>
                        </div>
                        <button className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-400">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{q.upvotes}</span>
                        </button>
                      </div>

                      <p className="text-xs text-slate-300 pl-8">{q.text}</p>

                      {q.replies.map((r, i) => (
                        <div key={i} className="ml-8 mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                          <div className="flex items-center gap-2">
                            <img src={r.avatar} alt={r.author} className="w-5 h-5 rounded-full object-cover" />
                            <span className="text-xs font-bold text-indigo-300">{r.author}</span>
                            <span className="text-[10px] text-slate-500">{r.time}</span>
                          </div>
                          <p className="text-xs text-slate-300 pl-7">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Course Syllabus Sidebar */}
        <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-heading">
              Course Syllabus
            </h3>
            <span className="text-xs font-bold text-indigo-400">
              {completedLessonIds.length} / {allLessons.length} Completed
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800">
            {course.modules.map((module) => (
              <div key={module.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white font-heading line-clamp-1">
                    {module.title}
                  </h4>
                </div>

                {/* Lessons List */}
                <div className="space-y-1">
                  {module.lessons.map((lesson) => {
                    const isCurrent = lesson.id === currentLesson.id;
                    const isDone = completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLesson(lesson)}
                        className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between text-xs transition-colors ${
                          isCurrent
                            ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : isCurrent ? (
                            <Play className="w-4 h-4 text-indigo-400 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                          )}
                          <span className={`truncate ${isCurrent ? 'font-bold text-white' : ''}`}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 shrink-0">{lesson.duration}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Module Quiz Button */}
                {module.quiz && (
                  <button
                    onClick={() => onOpenQuiz(module)}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 font-semibold text-xs flex items-center justify-between border border-indigo-500/20 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Module Quiz</span>
                    </div>
                    <span className="text-[10px] bg-indigo-500/30 px-2 py-0.5 rounded-md text-white font-bold">
                      Take Quiz
                    </span>
                  </button>
                )}

                {/* Module Assignment Button */}
                {module.assignment && (
                  <button
                    onClick={() => onOpenAssignment(module)}
                    className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-xs flex items-center justify-between border border-amber-500/20 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Project Assignment</span>
                    </div>
                    <span className="text-[10px] bg-amber-500/30 px-2 py-0.5 rounded-md text-white font-bold">
                      Submit Clip
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
