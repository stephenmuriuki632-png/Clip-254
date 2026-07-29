export interface CourseLesson {
  id: string;
  title: string;
  duration: string; // e.g. "12:45"
  videoUrl: string;
  thumbnailUrl?: string;
  summary: string;
  isFreePreview?: boolean;
  isCompleted?: boolean;
  resources?: {
    id: string;
    title: string;
    fileType: 'pdf' | 'zip' | 'link' | 'template';
    url: string;
    size?: string;
  }[];
  notes?: string;
  transcript?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: CourseLesson[];
  quiz?: CourseQuiz;
  assignment?: CourseAssignment;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CourseQuiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScorePercent: number; // e.g. 80
}

export interface CourseAssignment {
  id: string;
  title: string;
  instructions: string;
  templateUrl?: string;
  rubric: string[];
  submissionType: 'video_url' | 'file_upload' | 'text';
}

export interface CourseReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface AcademyInstructor {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  verified: boolean;
}

export interface DetailedCourse {
  id: string;
  title: string;
  slug: string;
  instructor: AcademyInstructor;
  category: 'Monetization' | 'Video Editing' | 'UGC & Branding' | 'AI Tools' | 'Audience Growth' | 'Business & Legal';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  lessonsCount: number;
  thumbnail: string;
  previewVideoUrl: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  priceKES: number; // 0 for Free
  originalPriceKES?: number;
  description: string;
  longDescription: string;
  topics: string[];
  prerequisites: string[];
  skillsLearned: string[];
  modules: CourseModule[];
  reviews: CourseReview[];
  faqs: { question: string; answer: string }[];
  certificateAvailable: boolean;
  updatedAt: string;
  language: string; // "English & Swahili"
  isFeatured?: boolean;
  isPopular?: boolean;
}

export interface UserEnrollment {
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  completedLessonIds: string[];
  quizScores: Record<string, number>; // quizId -> score %
  assignmentSubmissions: Record<string, { status: 'submitted' | 'graded'; submissionUrl: string; grade?: number; feedback?: string }>;
  isCompleted: boolean;
  completedAt?: string;
  certificateId?: string;
  lastAccessedLessonId?: string;
}

export interface CertificateData {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  studentId: string;
  instructorName: string;
  issueDate: string;
  verificationCode: string;
  badgeUrl: string;
  skills: string[];
}

export interface LearningPathStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  courseId: string;
  isOptional?: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // lucide icon name or emoji
  category: string;
  estimatedDuration: string;
  level: string;
  steps: LearningPathStep[];
  badgeName: string;
}

export interface LearnerBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface LearnerLeaderboardUser {
  rank: number;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  points: number;
  coursesCompleted: number;
  streakDays: number;
  badgesCount: number;
}
