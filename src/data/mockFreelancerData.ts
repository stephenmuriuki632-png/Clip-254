import {
  FreelanceService,
  JobPosting,
  FreelanceProposal,
  FreelanceOrder,
  FreelanceStatSummary
} from '../types/freelancer';

export const MOCK_FREELANCE_STATS: FreelanceStatSummary = {
  activeServices: 6,
  completedOrders: 148,
  pendingOrders: 3,
  cancelledOrders: 1,
  totalRevenueKES: 1420000,
  monthlyRevenueKES: 285000,
  averageRating: 4.95,
  repeatClients: 34,
  profileViews: 1240,
  serviceViews: 3820,
  responseRatePercent: 99,
  completionRatePercent: 98,
  successScorePercent: 97
};

export const MOCK_FREELANCE_SERVICES: FreelanceService[] = [
  {
    id: 'srv_1',
    freelancerId: 'fl_01',
    freelancerName: 'David Ochieng',
    freelancerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    freelancerRole: 'Lead Video Editor & Motion Designer',
    freelancerBadge: 'Top Rated Pro',
    country: 'Kenya',
    verified: true,
    title: 'I will edit high-retention YouTube & TikTok videos with motion graphics',
    description: 'Professional 4K video editing for content creators, podcasts, and brands. Includes dynamic subtitles, sound design, colour grading, B-roll insertion, and custom motion graphics optimized for maximum audience retention.',
    category: 'Video Editing',
    subcategory: 'Social Media Video Editing',
    tags: ['Video Editing', 'YouTube', 'TikTok', 'Premiere Pro', 'Motion Graphics'],
    startingPriceKES: 15000,
    rating: 4.98,
    reviewCount: 86,
    ordersCount: 112,
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80'
    ],
    packages: {
      basic: {
        name: 'Basic',
        title: 'Short Video / Reel (Up to 60s)',
        description: 'Cut, captions, hook animations, trending music, and sound design for TikTok/Reels.',
        priceKES: 15000,
        deliveryTimeDays: 2,
        revisions: 2,
        features: ['Up to 60 sec video', 'Custom Subtitles', 'Sound Effects', 'Color Grading'],
        includeSourceFiles: false,
        commercialRights: true,
        prioritySupport: false
      },
      standard: {
        name: 'Standard',
        title: 'Full YouTube Video (Up to 10 min)',
        description: 'Complete YouTube vlog or tech review edit with lower thirds, sound design, and motion effects.',
        priceKES: 35000,
        deliveryTimeDays: 3,
        revisions: 3,
        features: ['Up to 10 min video', 'Custom Motion Graphics', 'Sound Design & SFX', 'Thumbnail Included'],
        includeSourceFiles: true,
        commercialRights: true,
        prioritySupport: true
      },
      premium: {
        name: 'Premium',
        title: 'Masterclass / Podcast / Brand Docu (Up to 30 min)',
        description: 'Multi-cam editing, audio enhancement, custom intro/outro animations, and 3 teaser clips.',
        priceKES: 75000,
        deliveryTimeDays: 5,
        revisions: 'Unlimited',
        features: ['Up to 30 min Multi-cam', '3 Teaser Clips Included', 'Full Sound Mix', '4K Export & Source File'],
        includeSourceFiles: true,
        commercialRights: true,
        prioritySupport: true
      }
    },
    whatsIncluded: [
      'Color Grading & Audio Noise Reduction',
      'High-converting hook animations',
      'Licensed royalty-free background music',
      'Multi-format export (16:9 and 9:16)'
    ],
    requirements: [
      'Raw video footage link (Google Drive / WeTransfer)',
      'Brand logo and preferred fonts (if any)',
      'Brief outline or reference sample links'
    ],
    faqs: [
      {
        question: 'How do I send large video files?',
        answer: 'You can upload your files to Google Drive, Dropbox, or WeTransfer and paste the link in the order requirements.'
      },
      {
        question: 'What video editing software do you use?',
        answer: 'I use Adobe Premiere Pro 2026, After Effects, and DaVinci Resolve Studio.'
      }
    ],
    portfolio: [
      {
        id: 'p1',
        title: 'Tech Review - M-Pesa Virtual Card Launch',
        description: 'High-paced editing with animated UI overlays and kinetic typography.',
        imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
        category: 'Tech Video'
      }
    ],
    viewsCount: 1420,
    createdAt: '2026-01-10'
  },
  {
    id: 'srv_2',
    freelancerId: 'fl_02',
    freelancerName: 'Amina Kimani',
    freelancerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    freelancerRole: 'Full Stack & Mobile Developer',
    freelancerBadge: 'Top Rated Pro',
    country: 'Kenya',
    verified: true,
    title: 'I will build responsive React, Next.js, or Flutter web and mobile applications',
    description: 'Custom frontend and backend web development using React, Next.js, Node.js, and Supabase. Seamless M-Pesa payment integration, responsive UI, speed optimization, and database architecture.',
    category: 'Full Stack Development',
    subcategory: 'Web & Mobile Development',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'M-Pesa API', 'Tailwind CSS'],
    startingPriceKES: 45000,
    rating: 5.0,
    reviewCount: 42,
    ordersCount: 54,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    ],
    packages: {
      basic: {
        name: 'Basic',
        title: 'Landing Page / Portfolio',
        description: 'Single page sleek responsive web page with contact form & SEO setup.',
        priceKES: 45000,
        deliveryTimeDays: 3,
        revisions: 2,
        features: ['1 Page', 'Responsive Layout', 'Contact Form', 'Speed Optimization'],
        includeSourceFiles: true,
        commercialRights: true,
        prioritySupport: false
      },
      standard: {
        name: 'Standard',
        title: 'Full Business Web App (5 Pages)',
        description: 'Complete web app with auth, database integration, M-Pesa checkout, and dashboard.',
        priceKES: 120000,
        deliveryTimeDays: 7,
        revisions: 4,
        features: ['Up to 5 Pages', 'User Auth & Database', 'M-Pesa Payment Integration', 'Admin Panel'],
        includeSourceFiles: true,
        commercialRights: true,
        prioritySupport: true
      },
      premium: {
        name: 'Premium',
        title: 'Enterprise Cross-Platform SaaS App',
        description: 'Web & Mobile app suite with real-time features, Supabase backend, analytics, and custom API.',
        priceKES: 250000,
        deliveryTimeDays: 14,
        revisions: 'Unlimited',
        features: ['Web + Mobile App', 'Realtime Sync', 'Payment & Wallet API', 'Deployment & CI/CD'],
        includeSourceFiles: true,
        commercialRights: true,
        prioritySupport: true
      }
    },
    whatsIncluded: [
      'Clean modular TypeScript code',
      'M-Pesa Daraja API Integration',
      'Tailwind CSS UI styling',
      'Vercel or Cloud Run deployment'
    ],
    requirements: [
      'Figma design link or layout wireframes',
      'Feature list specification'
    ],
    faqs: [
      {
        question: 'Do you integrate local payments like M-Pesa?',
        answer: 'Yes! I have built 30+ M-Pesa integrations including STK Push and Business Paybill notifications.'
      }
    ],
    portfolio: [
      {
        id: 'p2',
        title: 'Jumia Seller Portal Redesign',
        description: 'Built with React, Tailwind, and RESTful API backend.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        category: 'Web App'
      }
    ],
    viewsCount: 2150,
    createdAt: '2026-02-01'
  },
  {
    id: 'srv_3',
    freelancerId: 'fl_03',
    freelancerName: 'Brian Kipchumba',
    freelancerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    freelancerRole: 'UI/UX & Brand Identity Designer',
    freelancerBadge: 'Verified Specialist',
    country: 'Kenya',
    verified: true,
    title: 'I will design modern UI/UX for mobile apps, websites & brand identity systems',
    description: 'Human-centered UI/UX design in Figma. Includes wireframes, interactive prototypes, design systems, vector icons, and developer-ready handoff specs.',
    category: 'UI Design',
    subcategory: 'Mobile & Web UI Design',
    tags: ['UI Design', 'UX Design', 'Figma', 'Prototyping', 'Brand Identity'],
    startingPriceKES: 25000,
    rating: 4.92,
    reviewCount: 38,
    ordersCount: 45,
    coverImage: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80'
    ],
    packages: {
      basic: {
        name: 'Basic',
        title: 'App Screen UI Design (1-2 Screens)',
        description: 'High-fidelity Figma screen design for landing or key app flow.',
        priceKES: 25000,
        deliveryTimeDays: 2,
        revisions: 2,
        features: ['2 Screens', 'Figma Source File', 'Clickable Prototype'],
        includeSourceFiles: true,
        commercialRights: true,
        prioritySupport: false
      },
      standard: {
        name: 'Standard',
        title: 'Complete App Design (Up to 8 Screens)',
        description: 'Full mobile app UI kit, component design system, dark mode, and interactive prototype.',
        priceKES: 65000,
        deliveryTimeDays: 5,
        revisions: 4,
        features: ['8 Mobile Screens', 'Design System / Tokens', 'Interactive Prototype', 'Developer Spec Handoff'],
        includeSourceFiles: true,
        commercialRights: true,
        prioritySupport: true
      },
      premium: {
        name: 'Premium',
        title: 'Full Product Design + Brand Identity Kit',
        description: 'Web & Mobile UI design system plus logo, brand guidelines, color palette, and typography.',
        priceKES: 140000,
        deliveryTimeDays: 9,
        revisions: 'Unlimited',
        features: ['Web & Mobile UI (15+ screens)', 'Full Brand Identity', 'Design System Library', '1-on-1 Design Review'],
        includeSourceFiles: true,
        commercialRights: true,
        prioritySupport: true
      }
    },
    whatsIncluded: [
      'Figma source files with auto-layout',
      'Interactive click-through prototype',
      'Design tokens & component library'
    ],
    requirements: [
      'User story or wireframe notes',
      'Inspiration apps or brand guidelines'
    ],
    faqs: [
      {
        question: 'Do you provide the Figma file?',
        answer: 'Yes, full Figma source file access is provided with all packages.'
      }
    ],
    portfolio: [],
    viewsCount: 980,
    createdAt: '2026-03-12'
  }
];

export const MOCK_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'job_101',
    clientId: 'cli_01',
    clientName: 'Nairobi Tech Hub',
    clientAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    clientCompany: 'Nairobi Tech Hub Ltd',
    title: 'Senior React & Node.js Developer Needed for Fintech Dashboard',
    description: 'We are seeking an experienced Full Stack Developer to build an analytics dashboard with real-time chart visualizers, M-Pesa Webhook callbacks, and user authentication.',
    category: 'Full Stack Development',
    skills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'M-Pesa API'],
    budgetKES: 150000,
    deadline: '2026-08-20',
    experienceLevel: 'Expert',
    requiredLanguages: ['English', 'Swahili'],
    location: 'Nairobi, Kenya (Remote)',
    proposalsCount: 14,
    status: 'open',
    createdAt: '2026-07-25'
  },
  {
    id: 'job_102',
    clientId: 'cli_02',
    clientName: 'Wanja E-Commerce',
    clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    clientCompany: 'Wanja Beauty Africa',
    title: '3D Motion Designer for Product Launch Trailer (30s)',
    description: 'Looking for a 3D animator to render dynamic cosmetic bottle fluid simulations and fast-paced motion graphics for our Instagram launch campaign.',
    category: '3D Modelling',
    skills: ['Blender', 'After Effects', '3D Animation', 'Motion Graphics'],
    budgetKES: 80000,
    deadline: '2026-08-15',
    experienceLevel: 'Intermediate',
    requiredLanguages: ['English'],
    location: 'Remote',
    proposalsCount: 8,
    status: 'open',
    createdAt: '2026-07-26'
  }
];

export const MOCK_PROPOSALS: FreelanceProposal[] = [
  {
    id: 'prop_01',
    jobId: 'job_101',
    jobTitle: 'Senior React & Node.js Developer Needed for Fintech Dashboard',
    freelancerId: 'fl_02',
    freelancerName: 'Amina Kimani',
    freelancerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    freelancerRating: 5.0,
    coverLetter: 'Hello! I am a full stack TypeScript engineer with extensive experience building M-Pesa payment gateways and real-time React dashboards. I can complete this project within 7 days with clean maintainable code.',
    proposedPriceKES: 140000,
    estimatedDeliveryDays: 7,
    portfolioAttachments: [
      { title: 'Fintech Portal Live Demo', url: 'https://example.com' }
    ],
    status: 'submitted',
    createdAt: '2026-07-26'
  }
];

export const MOCK_FREELANCE_ORDERS: FreelanceOrder[] = [
  {
    id: 'ord_901',
    serviceId: 'srv_1',
    serviceTitle: 'I will edit high-retention YouTube & TikTok videos with motion graphics',
    servicePackageName: 'Standard',
    freelancerId: 'fl_01',
    freelancerName: 'David Ochieng',
    freelancerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    clientId: 'cli_01',
    clientName: 'Nairobi Tech Hub',
    clientAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    priceKES: 35000,
    deliveryTimeDays: 3,
    deadlineDate: '2026-08-02',
    status: 'in_progress',
    requirementsNotes: 'Please focus on highlighting the M-Pesa API integration in the intro hook video.',
    deliveries: [],
    revisions: [],
    createdAt: '2026-07-27'
  },
  {
    id: 'ord_902',
    serviceId: 'srv_2',
    serviceTitle: 'I will build responsive React, Next.js, or Flutter web and mobile applications',
    servicePackageName: 'Basic',
    freelancerId: 'fl_02',
    freelancerName: 'Amina Kimani',
    freelancerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    clientId: 'cli_02',
    clientName: 'Wanja E-Commerce',
    clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    priceKES: 45000,
    deliveryTimeDays: 3,
    deadlineDate: '2026-07-28',
    status: 'delivered',
    requirementsNotes: 'Landing page with product showcase.',
    deliveries: [
      {
        id: 'del_1',
        orderId: 'ord_902',
        deliveryNotes: 'Here is the completed Next.js landing page with Tailwind CSS. Live preview link attached.',
        files: [
          { name: 'landing-source-code.zip', url: '#', size: '12.4 MB', isSourceFile: true }
        ],
        externalLinks: ['https://wanja-beauty.vercel.app'],
        submittedAt: '2026-07-28 10:15 AM'
      }
    ],
    revisions: [],
    createdAt: '2026-07-25'
  }
];
