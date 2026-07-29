import {
  DetailedCourse,
  LearningPath,
  CertificateData,
  LearnerLeaderboardUser,
  LearnerBadge
} from '../types/academy';

export const DETAILED_COURSES: DetailedCourse[] = [
  {
    id: 'course_001',
    title: 'Monetizing Short-Form Content in Kenya & Africa (2026 Masterclass)',
    slug: 'monetizing-short-form-africa-2026',
    category: 'Monetization',
    level: 'Intermediate',
    duration: '2.5 Hours',
    lessonsCount: 12,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    previewVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    rating: 4.9,
    reviewsCount: 342,
    studentsCount: 1420,
    priceKES: 0, // FREE
    originalPriceKES: 3500,
    description: 'Learn how to generate $1,000+ per month through video clipping bounties, UGC brand deals, and M-Pesa direct monetization.',
    longDescription: 'This course is the definitive guide for African video editors, podcast clippers, and short-form creators wanting to earn consistent income. We cover finding active ClipKenya bounties, optimizing video hooks for high view retention, writing converting pitches for brands, and instantly withdrawing earnings via M-Pesa.',
    topics: ['Finding High-Paying Bounties', 'Hook Science for TikTok FYP', 'Pitching Brands via ClipKenya', 'M-Pesa Escrow Payouts'],
    prerequisites: ['Basic smartphone or PC editing software (CapCut or Premiere)', 'ClipKenya active account'],
    skillsLearned: [
      'TikTok FYP Algorithm Retention Tricks',
      'ClipKenya Escrow Bounties Navigation',
      'High-Converting Brand Pitch Writing',
      'M-Pesa Payout Workflow'
    ],
    instructor: {
      id: 'usr_me_001',
      name: 'Maina Kamau',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      role: 'Pro Creator & ClipKenya Ambassador',
      bio: 'Nairobi digital creator with 450k+ followers. Has landed over 80+ brand deals and generated 15M+ views across East Africa.',
      rating: 4.9,
      studentsCount: 3800,
      coursesCount: 3,
      verified: true
    },
    modules: [
      {
        id: 'mod_101',
        title: 'Module 1: The Short-Form Economy in Africa',
        description: 'Understand the landscape of video clipping bounties, brand sponsorship rates, and creator monetization in 2026.',
        order: 1,
        lessons: [
          {
            id: 'les_101',
            title: 'Welcome to the Masterclass & Short-Form Overview',
            duration: '08:20',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            summary: 'An introduction to the ClipKenya ecosystem, current market rates in Kenya, and how video clipping works.',
            isFreePreview: true,
            resources: [
              {
                id: 'res_1',
                title: '2026 African Creator Ratecard Guide (PDF)',
                fileType: 'pdf',
                url: '#',
                size: '1.2 MB'
              }
            ],
            transcript: 'Jambo creators! Welcome to the course. In this first lesson we break down how creators and clippers collaborate on ClipKenya...'
          },
          {
            id: 'les_102',
            title: 'How Video Clipping Bounties Work',
            duration: '14:15',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            summary: 'Learn how brand hosts deposit funds into Escrow pools and pay editors based on 100k view milestones.',
            isFreePreview: true,
            resources: [
              {
                id: 'res_2',
                title: 'ClipBounty Payout Calculator (Excel)',
                fileType: 'pdf',
                url: '#',
                size: '450 KB'
              }
            ]
          }
        ],
        quiz: {
          id: 'quiz_101',
          title: 'Module 1 Knowledge Check',
          description: 'Test your understanding of short-form monetization and bounty mechanics.',
          passingScorePercent: 80,
          questions: [
            {
              id: 'q1',
              question: 'How are bounty earnings safely held on ClipKenya before milestone payouts?',
              options: [
                'In the creator personal bank account',
                'In ClipKenya Escrow Smart Pool',
                'Sent via paper check',
                'Deferred for 12 months'
              ],
              correctAnswerIndex: 1,
              explanation: 'ClipKenya uses automated Escrow pools to lock brand funds securely until video view milestones are verified.'
            },
            {
              id: 'q2',
              question: 'What is the optimal video aspect ratio for TikTok & Shorts FYP placement?',
              options: ['16:9 Landscape', '1:1 Square', '9:16 Vertical', '4:3 Standard'],
              correctAnswerIndex: 2,
              explanation: '9:16 vertical video occupies the full smartphone screen, delivering 3x higher retention.'
            }
          ]
        }
      },
      {
        id: 'mod_102',
        title: 'Module 2: Viral Hooks & Retention Masterclass',
        description: 'How to capture attention in the first 2 seconds and keep viewers engaged until the end.',
        order: 2,
        lessons: [
          {
            id: 'les_103',
            title: 'The 2-Second Visual Hook Rule',
            duration: '18:40',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            summary: 'Breaking down top-performing hooks that boosted retention rates over 65%.',
            resources: [
              {
                id: 'res_3',
                title: '50 Plug-and-Play Viral Hook Formulas',
                fileType: 'pdf',
                url: '#',
                size: '2.1 MB'
              }
            ]
          },
          {
            id: 'les_104',
            title: 'Adding Dynamic Captions & Swahili Sheng Subtitles',
            duration: '22:10',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            summary: 'Tutorial on generating animated yellow-and-white captions in CapCut Pro.',
            resources: [
              {
                id: 'res_4',
                title: 'Nairobi CapCut Text Style Preset (ZIP)',
                fileType: 'zip',
                url: '#',
                size: '8.4 MB'
              }
            ]
          }
        ],
        assignment: {
          id: 'assign_101',
          title: 'Practical Project: Edit 1 Viral Bounty Clip',
          instructions: 'Download raw stream footage from the ClipKenya Bounties pool, edit a 30-45s vertical video with dynamic captions and a strong hook, and submit your link below.',
          rubric: [
            'Includes vertical 9:16 framing',
            'Strong visual or audio hook within first 3 seconds',
            'Animated captions with clear typography',
            'HD 1080p clean export'
          ],
          submissionType: 'video_url'
        }
      }
    ],
    reviews: [
      {
        id: 'rev_1',
        userName: 'Kevin Omondi',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'This course opened my eyes! I edited 3 bounty clips following Maina’s hook formulas and made 28,000 KES in my first week!',
        helpfulCount: 42
      },
      {
        id: 'rev_2',
        userName: 'Faith Mwangi',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'The CapCut text presets provided in lesson 4 saved me hours of editing time. Highly recommend!',
        helpfulCount: 19
      }
    ],
    faqs: [
      {
        question: 'Do I get a certificate upon completion?',
        answer: 'Yes! After completing all lessons, passing module quizzes, and submitting your project, you will instantly receive an official ClipKenya Verified Creator Certificate.'
      },
      {
        question: 'Is this course suitable for total beginners?',
        answer: 'Absolutely. We start with the fundamentals before moving into advanced editing and client pitching strategies.'
      }
    ],
    certificateAvailable: true,
    updatedAt: '2026-07-20',
    language: 'English & Swahili',
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'course_002',
    title: 'CapCut & Premiere Pro Editing Suite for Short-Form Viral Clips',
    slug: 'capcut-premiere-pro-short-form-mastery',
    category: 'Video Editing',
    level: 'Beginner',
    duration: '4.0 Hours',
    lessonsCount: 18,
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    previewVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    rating: 5.0,
    reviewsCount: 512,
    studentsCount: 2890,
    priceKES: 2500,
    originalPriceKES: 5000,
    description: 'Master keyframe animations, audio noise reduction, dynamic captions, and sound design to edit like the top 1% of creators.',
    longDescription: 'Master the art of high-pacing video editing. Designed specifically for video editors wanting to offer commercial clipping services to podcasts, streamers, and top brands across East Africa.',
    topics: ['Dynamic Subtitles', 'Sound Design & FX', 'Color Grading African Skin Tones', 'Fast Export Settings'],
    prerequisites: ['Laptop or PC with Premiere Pro or CapCut Desktop'],
    skillsLearned: [
      'Advanced Keyframing',
      'Audio Enhancement & Noise Reduction',
      'Color Grading for African Skin Tones',
      '4K 60fps High Bitrate Exporting'
    ],
    instructor: {
      id: 'usr_002',
      name: 'Wanjiku Njuguna',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
      role: 'Master Video Editor & Colorist',
      bio: 'Edited for top East African podcasts and international YouTube creators. 8+ years of post-production experience.',
      rating: 5.0,
      studentsCount: 4200,
      coursesCount: 2,
      verified: true
    },
    modules: [
      {
        id: 'mod_201',
        title: 'Module 1: Color Grading & Audio Perfection',
        description: 'Fix bad lighting and background noise with professional LUTs and EQ filters.',
        order: 1,
        lessons: [
          {
            id: 'les_201',
            title: 'Color Grading African Skin Tones in DaVinci & Premiere',
            duration: '25:00',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            summary: 'Step-by-step skin tone correction and warm contrast curves.',
            isFreePreview: true,
            resources: [
              {
                id: 'res_201',
                title: 'Nairobi Warm Glow LUTs Pack (ZIP)',
                fileType: 'zip',
                url: '#',
                size: '12 MB'
              }
            ]
          }
        ]
      }
    ],
    reviews: [],
    faqs: [
      {
        question: 'Can I pay using M-Pesa?',
        answer: 'Yes! You can instantly enroll using M-Pesa STK push or directly from your ClipKenya Wallet balance.'
      }
    ],
    certificateAvailable: true,
    updatedAt: '2026-07-25',
    language: 'English',
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'course_003',
    title: 'Building a $5,000/mo UGC Creator Business in East Africa',
    slug: 'ugc-creator-business-east-africa',
    category: 'UGC & Branding',
    level: 'Advanced',
    duration: '3.5 Hours',
    lessonsCount: 15,
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    previewVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    rating: 4.8,
    reviewsCount: 189,
    studentsCount: 980,
    priceKES: 3500,
    originalPriceKES: 7000,
    description: 'Everything you need to land high-paying brand contracts without having 100k followers.',
    longDescription: 'User Generated Content (UGC) is booming in Kenya, Nigeria, and South Africa. Brands are paying $200-$500 per 30-second video. Learn how to craft convert-first product videos, create impressive media kits, and sign retainer clients.',
    topics: ['Portfolio Building', 'Pricing & Rate Cards', 'Product Review Framing', 'Contract Negotiations'],
    prerequisites: ['Basic camera phone and lighting setup'],
    skillsLearned: [
      'UGC Scriptwriting',
      'Lighting & Product Styling',
      'Brand Contract Negotiation',
      'Client Retainer Pitching'
    ],
    instructor: {
      id: 'usr_003',
      name: 'Amina Abdi',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
      role: 'UGC Content Strategist & Agency Lead',
      bio: 'Has produced UGC ads for over 40 corporate brands across East Africa.',
      rating: 4.8,
      studentsCount: 1900,
      coursesCount: 1,
      verified: true
    },
    modules: [],
    reviews: [],
    faqs: [],
    certificateAvailable: true,
    updatedAt: '2026-07-15',
    language: 'English',
    isFeatured: false,
    isPopular: true
  },
  {
    id: 'course_004',
    title: 'AI Video Automation & Faceless Channel Mastery',
    slug: 'ai-video-automation-faceless-channels',
    category: 'AI Tools',
    level: 'Intermediate',
    duration: '3.0 Hours',
    lessonsCount: 14,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    previewVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    rating: 4.95,
    reviewsCount: 220,
    studentsCount: 1650,
    priceKES: 0, // FREE
    description: 'Leverage Gemini AI, Midjourney, and ElevenLabs to launch 100% automated YouTube Shorts & TikTok channels.',
    longDescription: 'Learn how to generate viral scripts with Gemini AI, build custom avatars, synthesize realistic African accents, and auto-caption videos on complete autopilot.',
    topics: ['Gemini AI Scripting', 'ElevenLabs Voiceover Tuning', 'Faceless TikTok Channels', 'Automated Clip Generation'],
    prerequisites: ['Internet access and ClipKenya AI Studio subscription'],
    skillsLearned: [
      'AI Prompt Engineering for Video Scripts',
      'Voice Synthesis & Accent Tuning',
      'Automated Video Assembly Pipeline'
    ],
    instructor: {
      id: 'usr_me_001',
      name: 'Maina Kamau',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      role: 'Pro Creator & AI Specialist',
      bio: 'Nairobi digital creator with 450k+ followers.',
      rating: 4.9,
      studentsCount: 3800,
      coursesCount: 3,
      verified: true
    },
    modules: [],
    reviews: [],
    faqs: [],
    certificateAvailable: true,
    updatedAt: '2026-07-28',
    language: 'English',
    isFeatured: true,
    isPopular: true
  }
];

export const MOCK_LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path_001',
    title: 'Full-Stack Short-Form Clipper',
    subtitle: 'From zero editing experience to earning 100,000+ KES/mo on ClipKenya bounties',
    description: 'A comprehensive 3-step structured learning roadmap to master CapCut editing, viral hook science, and bounty payouts.',
    icon: 'Scissors',
    category: 'Video Editing & Clipping',
    estimatedDuration: '6.5 Hours',
    level: 'Beginner to Pro',
    badgeName: 'Master Clipper Certification',
    steps: [
      {
        id: 'step_1',
        stepNumber: 1,
        title: 'Short-Form Monetization Fundamentals',
        description: 'Understand how video bounties work and learn the ClipKenya escrow system.',
        courseId: 'course_001'
      },
      {
        id: 'step_2',
        stepNumber: 2,
        title: 'CapCut & Premiere Pro Editing Suite',
        description: 'Master dynamic captions, sound FX, keyframing, and fast exporting.',
        courseId: 'course_002'
      },
      {
        id: 'step_3',
        stepNumber: 3,
        title: 'AI Video Automation Pipeline',
        description: 'Speed up your workflow using Gemini AI script generation and auto-subtitles.',
        courseId: 'course_004'
      }
    ]
  },
  {
    id: 'path_002',
    title: 'UGC Brand Deal Accelerator',
    subtitle: 'Build a profitable UGC agency and land $500+ retainer clients in East Africa',
    description: 'Learn scriptwriting, lighting setup, portfolio creation, and direct M-Pesa brand escrow contract negotiations.',
    icon: 'Briefcase',
    category: 'UGC & Business',
    estimatedDuration: '7 Hours',
    level: 'Intermediate to Advanced',
    badgeName: 'Pro UGC Strategist',
    steps: [
      {
        id: 'step_201',
        stepNumber: 1,
        title: 'UGC Creator Business Blueprint',
        description: 'Land high-paying brand contracts without having a huge follower count.',
        courseId: 'course_003'
      },
      {
        id: 'step_202',
        stepNumber: 2,
        title: 'Viral Hook & Pitching Mastery',
        description: 'Craft high-converting product videos that brands love to boost.',
        courseId: 'course_001'
      }
    ]
  }
];

export const MOCK_USER_CERTIFICATES: CertificateData[] = [
  {
    id: 'cert_9012',
    courseId: 'course_001',
    courseTitle: 'Monetizing Short-Form Content in Kenya & Africa (2026 Masterclass)',
    studentName: 'Maina Kamau',
    studentId: 'usr_me_001',
    instructorName: 'Maina Kamau & ClipKenya Academy',
    issueDate: '2026-07-22',
    verificationCode: 'CK-ACADEMY-2026-9012X',
    badgeUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    skills: ['TikTok Hook Science', 'ClipKenya Bounty Escrow', 'Swahili Sheng Captions', 'M-Pesa Monetization']
  }
];

export const MOCK_LEADERBOARD_USERS: LearnerLeaderboardUser[] = [
  {
    rank: 1,
    userId: 'usr_002',
    userName: 'Wanjiku Njuguna',
    userAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    userRole: 'Master Editor',
    points: 4850,
    coursesCompleted: 6,
    streakDays: 24,
    badgesCount: 12
  },
  {
    rank: 2,
    userId: 'usr_me_001',
    userName: 'Maina Kamau (You)',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    userRole: 'Pro Creator',
    points: 3920,
    coursesCompleted: 4,
    streakDays: 18,
    badgesCount: 8
  },
  {
    rank: 3,
    userId: 'usr_003',
    userName: 'Amina Abdi',
    userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    userRole: 'UGC Strategist',
    points: 3410,
    coursesCompleted: 4,
    streakDays: 14,
    badgesCount: 7
  },
  {
    rank: 4,
    userId: 'usr_004',
    userName: 'Kevin Omondi',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    userRole: 'Pro Clipper',
    points: 2890,
    coursesCompleted: 3,
    streakDays: 9,
    badgesCount: 5
  },
  {
    rank: 5,
    userId: 'usr_005',
    userName: 'Faith Mwangi',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    userRole: 'CapCut Editor',
    points: 2150,
    coursesCompleted: 2,
    streakDays: 7,
    badgesCount: 4
  }
];

export const MOCK_LEARNER_BADGES: LearnerBadge[] = [
  {
    id: 'badge_1',
    name: 'First Steps',
    description: 'Enrolled in your first ClipKenya Academy course',
    icon: 'Award',
    unlockedAt: '2026-07-10',
    isUnlocked: true
  },
  {
    id: 'badge_2',
    name: 'CapCut Ninja',
    description: 'Completed the CapCut & Premiere Pro Editing Suite',
    icon: 'Scissors',
    unlockedAt: '2026-07-18',
    isUnlocked: true
  },
  {
    id: 'badge_3',
    name: '100% Quiz Ace',
    description: 'Scored 100% on a module quiz on the first attempt',
    icon: 'CheckCircle2',
    unlockedAt: '2026-07-20',
    isUnlocked: true
  },
  {
    id: 'badge_4',
    name: 'Verified Graduate',
    description: 'Earned an official ClipKenya Academy Verified Certificate',
    icon: 'GraduationCap',
    unlockedAt: '2026-07-22',
    isUnlocked: true
  },
  {
    id: 'badge_5',
    name: 'Streak Master (30 Days)',
    description: 'Maintained a 30-day daily learning streak',
    icon: 'Flame',
    isUnlocked: false
  },
  {
    id: 'badge_6',
    name: 'Top Instructor',
    description: 'Published a course with over 1,000 enrolled students',
    icon: 'Star',
    unlockedAt: '2026-07-25',
    isUnlocked: true
  }
];
