import {
  UserProfile,
  Campaign,
  ClipBounty,
  ClipSubmission,
  FreelanceGig,
  UGCOrder,
  Conversation,
  Message,
  Transaction,
  NotificationItem,
  AcademyCourse,
  CommunityPost
} from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'usr_me_001',
  name: 'Maina Kamau',
  handle: '@mainatreats',
  role: 'creator',
  primaryRole: 'creator',
  additionalRoles: ['editor', 'freelancer', 'ugc'],
  activeRole: 'creator',
  email: 'maina@clipkenya.africa',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  bio: 'Nairobi Tech & Digital Creator. Creating 60-second tech reviews, gadget unboxings, and CapCut tutorials for 450k+ followers across TikTok & Shorts.',
  location: 'Nairobi, Kenya',
  verified: true,
  rating: 4.9,
  reviewCount: 48,
  followersCount: 485000,
  primaryPlatform: 'tiktok',
  niche: ['Tech & Gadgets', 'Video Editing', 'Lifestyle'],
  rates: {
    hourlyKES: 4500,
    videoClipKES: 15000,
    ugcPostKES: 25000,
    sponsoredVideoKES: 60000,
  },
  socialLinks: {
    tiktok: 'https://tiktok.com/@mainatreats',
    youtube: 'https://youtube.com/@mainatech',
    instagram: 'https://instagram.com/@maina_tech',
    portfolio: 'https://mainatreats.clipkenya.site'
  },
  skills: ['4K Video Editing', 'CapCut Pro', 'TikTok Viral Hooks', 'Swahili Voiceover', 'Product Unboxing'],
  badge: 'Pro Creator & Clipper',
  completedOrders: 34,
  featuredVideos: [
    {
      title: 'Testing $150 Wireless Mic in Nairobi Street Noise',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
      views: '1.2M views'
    },
    {
      title: 'Top 5 Budget Editing Laptops in Kenya 2026',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
      views: '840K views'
    }
  ]
};

export const MOCK_CREATORS: UserProfile[] = [
  CURRENT_USER,
  {
    id: 'usr_002',
    name: 'Wanjiku Njuguna',
    handle: '@wanjiku_edits',
    role: 'editor',
    email: 'wanjiku@clipkenya.africa',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    bio: 'Lead Premiere & DaVinci Video Editor in Kenya. I edit long-form podcasts into viral TikTok/Shorts clips with motion graphics and dynamic captions.',
    location: 'Nairobi, Kenya',
    verified: true,
    rating: 5.0,
    reviewCount: 92,
    followersCount: 125000,
    primaryPlatform: 'youtube',
    niche: ['Video Editing', 'Podcast Clipping', 'Motion Graphics'],
    rates: {
      hourlyKES: 3500,
      videoClipKES: 8000,
      sponsoredVideoKES: 45000,
    },
    socialLinks: {
      tiktok: 'https://tiktok.com/@wanjiku_edits',
      youtube: 'https://youtube.com/@wanjikuedits'
    },
    skills: ['DaVinci Resolve', 'Adobe Premiere Pro', 'After Effects', 'Subtitles/Captions', 'Sound Design'],
    badge: 'Master Editor',
    completedOrders: 114,
  },
  {
    id: 'usr_003',
    name: 'Amina Abdi',
    handle: '@amina_ugc_ke',
    role: 'ugc',
    email: 'amina@clipkenya.africa',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    bio: 'UGC Content Creator in East Africa. Authentic, relatable aesthetic videos for skincare, fashion, hospitality, and fintech brands.',
    location: 'Mombasa, Kenya',
    verified: true,
    rating: 4.8,
    reviewCount: 38,
    followersCount: 210000,
    primaryPlatform: 'instagram',
    niche: ['Beauty & Skincare', 'Fashion', 'Travel & Tourism'],
    rates: {
      ugcPostKES: 20000,
      sponsoredVideoKES: 50000,
    },
    socialLinks: {
      instagram: 'https://instagram.com/@amina_ugc_ke',
      tiktok: 'https://tiktok.com/@amina_ugc'
    },
    skills: ['Aesthetic Lighting', 'Product Demonstration', 'Voiceover', 'Natural Hooking'],
    badge: 'Top UGC Talent',
    completedOrders: 45,
  },
  {
    id: 'usr_004',
    name: 'Kipchumba "Kip" Chebet',
    handle: '@kip_sports_pod',
    role: 'creator',
    email: 'kip@clipkenya.africa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Host of #1 African Athletics & Fitness Podcast. Looking for video editors to turn 2-hour episodes into viral clips!',
    location: 'Eldoret, Kenya',
    verified: true,
    rating: 4.9,
    reviewCount: 61,
    followersCount: 620000,
    primaryPlatform: 'youtube',
    niche: ['Sports', 'Fitness', 'Podcasts'],
    rates: {
      videoClipKES: 12000,
      sponsoredVideoKES: 85000,
    },
    socialLinks: {
      youtube: 'https://youtube.com/@kip_sports',
      spotify: 'https://spotify.com'
    },
    skills: ['Podcast Host', 'Sports Commentary', 'Event Hosting'],
    badge: 'Creator Bounty Host',
    completedOrders: 28,
  },
  {
    id: 'usr_005',
    name: 'Olumide "Olu" Adeleke',
    handle: '@olu_fx_editor',
    role: 'freelancer',
    email: 'olu@clipkenya.africa',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'Visual Effects & Motion Graphics Artist serving clients across Lagos, Nairobi, and London. Specialist in 3D product renders & YouTube thumbnails.',
    location: 'Lagos, Nigeria',
    verified: true,
    rating: 5.0,
    reviewCount: 104,
    followersCount: 340000,
    primaryPlatform: 'youtube',
    niche: ['Motion Graphics', '3D Animation', 'Thumbnail Design'],
    rates: {
      hourlyKES: 5000,
      videoClipKES: 25000,
    },
    socialLinks: {
      youtube: 'https://youtube.com/@olufx',
      x: 'https://x.com/olufx'
    },
    skills: ['Blender 3D', 'After Effects', 'Photoshop', 'Viral Thumbnail Psychology'],
    badge: 'Top Rated Freelancer',
    completedOrders: 156,
  }
];

export const MOCK_BOUNTIES: ClipBounty[] = [
  {
    id: 'bounty_001',
    streamTitle: 'The Future of AI & Tech Jobs in Africa w/ Kip Chebet Ep #42',
    hostName: 'Kipchumba Chebet',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    sourceVideoUrl: 'https://youtube.com/watch?v=sample123',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
    category: 'Tech & Business',
    bountyPer100kViewsKES: 12000,
    totalBountyPoolKES: 150000,
    remainingPoolKES: 98000,
    rules: [
      'Clip duration: 30s to 75s (Vertical 9:16 format)',
      'Include auto-captions with highlighted active words',
      'Must tag @kip_sports_pod and use hashtag #ClipKenyaPod',
      'No copyrighted music without fair use transformation'
    ],
    submissionsCount: 24,
    status: 'active',
    deadline: '2026-08-15',
    viralTags: ['#AfricanTech', '#ClipKenya', '#FutureOfWork', '#KenyaCreator'],
    description: 'Cut out the most controversial and high-energy 60 seconds where we discuss starting a tech business in Nairobi vs Lagos.'
  },
  {
    id: 'bounty_002',
    streamTitle: 'Kenyan Startup Founders Panel: Building $10M SaaS in East Africa',
    hostName: 'Safaricom Innovation Hub',
    hostAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
    sourceVideoUrl: 'https://youtube.com/watch?v=sample456',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
    category: 'Business & Startups',
    bountyPer100kViewsKES: 18000,
    totalBountyPoolKES: 300000,
    remainingPoolKES: 210000,
    rules: [
      'Extract golden nuggets on fundraising & M-Pesa API integration',
      'High-contrast subtitles (yellow & white text)',
      'Include subtle background beats'
    ],
    submissionsCount: 41,
    status: 'active',
    deadline: '2026-08-20',
    viralTags: ['#StartupsKenya', '#FintechAfrica', '#MpesaDevs', '#NairobiTech'],
    description: 'Focus on the debate between bootstrapping vs raising VC capital in Kenya.'
  },
  {
    id: 'bounty_003',
    streamTitle: 'Safari & Cultural Vibes: 7 Days in Diani Beach Vlog Raw Stream',
    hostName: 'Amina Abdi',
    hostAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    sourceVideoUrl: 'https://youtube.com/watch?v=sample789',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    category: 'Travel & Lifestyle',
    bountyPer100kViewsKES: 10000,
    totalBountyPoolKES: 100000,
    remainingPoolKES: 45000,
    rules: [
      'Fast-paced aesthetic transitions',
      'Trending Afrobeat background track',
      'Target TikTok FYP and Instagram Reels'
    ],
    submissionsCount: 18,
    status: 'active',
    deadline: '2026-08-10',
    viralTags: ['#VisitKenya', '#DianiBeach', '#AfricanTravel', '#TravelShorts'],
    description: 'Highlight the sunset camel ride and fresh seafood feast at Ali Barbour Cave.'
  }
];

export const MOCK_SUBMISSIONS: ClipSubmission[] = [
  {
    id: 'sub_001',
    bountyId: 'bounty_001',
    bountyTitle: 'Future of AI & Tech Jobs in Africa',
    editorId: 'usr_me_001',
    editorName: 'Maina Kamau',
    editorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    clipTitle: 'Why AI won\'t replace Nairobi Software Engineers in 2026!',
    platformUrl: 'https://www.tiktok.com/@mainatreats/video/738129381231',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
    status: 'approved',
    views: 145000,
    payoutKES: 17400,
    submittedAt: '2026-07-25',
    feedback: 'Excellent hook and dynamic kinetic typography! Payout sent to M-Pesa wallet.'
  }
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_001',
    title: 'M-Pesa Global App UGC Creator Campaign',
    brandName: 'Safaricom PLC',
    brandLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    brandId: 'brand_safaricom',
    description: 'Looking for 15 Kenyan creators to demonstrate sending money seamlessly to international accounts using the new M-Pesa Global feature. Show real life scenarios e.g. paying tuition, sending to family abroad, or buying online.',
    budgetKES: 450000,
    budgetUSD: 3450,
    category: 'Fintech & Mobile Money',
    deadline: '2026-08-25',
    deliverables: ['1x 45s TikTok UGC Video', 'Raw footage rights', '1x Instagram Reel crosspost'],
    applicantsCount: 38,
    status: 'active',
    requirements: 'Must have active M-Pesa account, clear 1080p camera, relatable Kenyan tone (Sheng or English).',
    targetNiche: ['Lifestyle', 'Tech', 'Students', 'Business'],
    platform: 'tiktok',
    locationTarget: 'Kenya',
    createdAt: '2026-07-20'
  },
  {
    id: 'camp_002',
    title: 'Jumia Tech Week 2026 Unboxing & Review Campaign',
    brandName: 'Jumia Kenya',
    brandLogo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=300&q=80',
    brandId: 'brand_jumia',
    description: 'Unbox and review trending smartwatches and wireless earbuds. Products provided free by Jumia + monetary reward for high engagement short videos.',
    budgetKES: 280000,
    budgetUSD: 2150,
    category: 'E-Commerce & Electronics',
    deadline: '2026-08-18',
    deliverables: ['1x Unboxing Reel', 'Custom discount code callout'],
    applicantsCount: 52,
    status: 'active',
    requirements: 'Minimum 20k followers on TikTok or Instagram.',
    targetNiche: ['Tech', 'Gadgets', 'Lifestyle'],
    platform: 'all',
    locationTarget: 'Nairobi & Mombasa',
    createdAt: '2026-07-22'
  },
  {
    id: 'camp_003',
    title: 'Equity Bank Young Entrepreneurs Challenge Promo',
    brandName: 'Equity Group',
    brandLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=300&q=80',
    brandId: 'brand_equity',
    description: 'Promote the $50,000 entrepreneurship pitch competition to young African innovators and creators.',
    budgetKES: 600000,
    budgetUSD: 4600,
    category: 'Business & Education',
    deadline: '2026-08-30',
    deliverables: ['2x Dedicated YouTube Shorts', 'Story post with link sticker'],
    applicantsCount: 29,
    status: 'active',
    requirements: 'Business, tech, or university-focused creator.',
    targetNiche: ['Business', 'Tech', 'Education'],
    platform: 'youtube',
    locationTarget: 'Kenya & Rwanda',
    createdAt: '2026-07-24'
  }
];

export const MOCK_FREELANCE_GIGS: FreelanceGig[] = [
  {
    id: 'gig_001',
    title: 'I will turn your raw 1-hour podcast into 5 viral short clips with animated captions',
    freelancerId: 'usr_002',
    freelancerName: 'Wanjiku Njuguna',
    freelancerAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    freelancerRole: 'Lead Video Editor',
    category: 'Video Editing',
    startingPriceKES: 7500,
    deliveryDays: 2,
    rating: 5.0,
    ordersCount: 84,
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    description: 'Professional video editor based in Nairobi. I extract peak emotional or informative moments from podcasts, webinars, and vlogs, formatting them with eye-catching kinetic subtitles, sound effects, and color grading.',
    deliverables: ['5x 9:16 Vertical Clips', 'Subtitles in English/Swahili', 'Background Sound Effects', '1080p MP4 Export'],
    tags: ['Podcast Clipping', 'TikTok Edits', 'CapCut Pro', 'DaVinci Resolve']
  },
  {
    id: 'gig_002',
    title: 'I will design 3 high-CTR YouTube thumbnails guaranteed to boost your click rate',
    freelancerId: 'usr_005',
    freelancerName: 'Olumide Adeleke',
    freelancerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    freelancerRole: 'Motion Artist',
    category: 'Thumbnail Design',
    startingPriceKES: 4500,
    deliveryDays: 1,
    rating: 4.9,
    ordersCount: 120,
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
    description: 'Thumbnails make or break your video. Using visual psychology, high contrast, facial emotion cutouts, and 3D lighting, I deliver thumbnails that demand clicks.',
    deliverables: ['3x Ultra HD 1920x1080 PNG Thumbnails', 'Source PSD file', 'Unlimited Revisions'],
    tags: ['YouTube Thumbnail', 'Photoshop', 'CTR Boost', '3D Graphics']
  },
  {
    id: 'gig_003',
    title: 'I will write 3 high-converting viral TikTok scripts tailored for African audiences',
    freelancerId: 'usr_me_001',
    freelancerName: 'Maina Kamau',
    freelancerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    freelancerRole: 'Tech Creator',
    category: 'Scriptwriting',
    startingPriceKES: 6000,
    deliveryDays: 1,
    rating: 4.9,
    ordersCount: 32,
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    description: 'Stop getting 200 views! I write structured 30-second scripts with proven 3-second visual hooks, value retention mid-points, and clear call-to-actions.',
    deliverables: ['3x Detailed Script PDF files', 'Visual Scene cues', 'Audio & Voiceover guidance'],
    tags: ['TikTok Script', 'Viral Hook', 'Sheng Copywriter', 'UGC Script']
  }
];

export const MOCK_COURSES: AcademyCourse[] = [
  {
    id: 'course_001',
    title: 'Monetizing Short-Form Content in Kenya & Africa (2026 Masterclass)',
    instructor: 'Maina Kamau',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    category: 'Monetization',
    level: 'Intermediate',
    duration: '2.5 Hours',
    lessonsCount: 12,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    studentsCount: 1420,
    priceKES: 0, // Free course
    description: 'Learn how to generate $1,000+ per month through video clipping bounties, UGC brand deals, and M-Pesa direct monetization.',
    topics: ['Finding High-Paying Bounties', 'Hook Science for TikTok FYP', 'Pitching Brands via ClipKenya', 'M-Pesa Escrow Payouts']
  },
  {
    id: 'course_002',
    title: 'CapCut & Premiere Pro Editing Suite for Short-Form Viral Clips',
    instructor: 'Wanjiku Njuguna',
    instructorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    category: 'Video Editing',
    level: 'Beginner',
    duration: '4 Hours',
    lessonsCount: 18,
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    studentsCount: 2890,
    priceKES: 2500,
    description: 'Master keyframe animations, audio noise reduction, dynamic captions, and sound design to edit like the top 1% of creators.',
    topics: ['Dynamic Subtitles', 'Sound Design & FX', 'Color Grading African Skin Tones', 'Fast Export Settings']
  },
  {
    id: 'course_003',
    title: 'Building a $5,000/mo UGC Creator Business in East Africa',
    instructor: 'Amina Abdi',
    instructorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    category: 'UGC & Branding',
    level: 'Advanced',
    duration: '3.5 Hours',
    lessonsCount: 15,
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    studentsCount: 980,
    priceKES: 3500,
    description: 'Everything you need to land high-paying brand contracts without having 100k followers.',
    topics: ['Portfolio Building', 'Pricing & Rate Cards', 'Product Review Framing', 'Contract Negotiations']
  }
];

export const MOCK_POSTS: CommunityPost[] = [
  {
    id: 'post_001',
    authorId: 'usr_002',
    authorName: 'Wanjiku Njuguna',
    authorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    authorRole: 'Master Editor',
    title: '📢 Looking for a Swahili Voiceover Creator for a 10-clip Fintech series!',
    content: 'Hey ClipKenya fam! I just landed a 10-clip bounty project for an international fintech app expanding in East Africa. Need a confident voiceover artist with a warm Nairobi accent. Budget is 15,000 KES. Drop your portfolio links below!',
    category: 'Collab',
    likesCount: 24,
    commentsCount: 12,
    timestamp: '2 hours ago',
    tags: ['#Collab', '#Voiceover', '#PaidGig', '#NairobiCreators']
  },
  {
    id: 'post_002',
    authorId: 'usr_me_001',
    authorName: 'Maina Kamau',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    authorRole: 'Pro Creator',
    title: '💡 Quick Tip: Why adding yellow highlighted keywords doubled my clip retention!',
    content: 'Tested two versions of the same podcast clip on TikTok. The version with animated yellow/white active captions retained viewers for 42s vs 18s for plain text. Make sure to use bold fonts like Montserrat or Poppins in CapCut!',
    category: 'Tips & Tricks',
    likesCount: 56,
    commentsCount: 19,
    timestamp: '5 hours ago',
    tags: ['#CreatorTips', '#TikTokAlgorithm', '#CapCutHack']
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_001',
    participantId: 'brand_safaricom',
    participantName: 'Safaricom Campaign Manager',
    participantAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    participantRole: 'Verified Brand',
    lastMessage: 'Hi Maina, we loved your pitch for the M-Pesa Global UGC campaign! Sending the official contract offer now.',
    lastMessageTime: '10:45 AM',
    unreadCount: 1
  },
  {
    id: 'conv_002',
    participantId: 'usr_002',
    participantName: 'Wanjiku Njuguna',
    participantAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    participantRole: 'Video Editor',
    lastMessage: 'I updated the color grade on clip #3 and exported in 4K 60fps. Check out the drive link.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  }
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  conv_001: [
    {
      id: 'msg_101',
      conversationId: 'conv_001',
      senderId: 'brand_safaricom',
      senderName: 'Safaricom Campaign Manager',
      senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
      text: 'Jambo Maina! We reviewed your portfolio on ClipKenya and your previous tech unboxing videos are top-notch.',
      timestamp: '10:30 AM'
    },
    {
      id: 'msg_102',
      conversationId: 'conv_001',
      senderId: 'usr_me_001',
      senderName: 'Maina Kamau',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      text: 'Asante sana! I would love to create a high-converting 45-second TikTok video showing how easy it is to transfer funds abroad with M-Pesa Global.',
      timestamp: '10:38 AM'
    },
    {
      id: 'msg_103',
      conversationId: 'conv_001',
      senderId: 'brand_safaricom',
      senderName: 'Safaricom Campaign Manager',
      senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
      text: 'Sounds great. Here is the formal contract offer with Escrow protection.',
      timestamp: '10:45 AM',
      offerDetails: {
        title: '1x M-Pesa Global UGC Video + Rights',
        amountKES: 45000,
        deliverables: '1x 45s Vertical Video, 2 Revisions, M-Pesa Global branding callout',
        deadline: '2026-08-12',
        status: 'pending'
      }
    }
  ]
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_001',
    userId: 'usr_me_001',
    type: 'payout',
    amountKES: 17400,
    amountUSD: 133,
    status: 'completed',
    provider: 'mpesa',
    reference: 'RKP82910X9',
    timestamp: '2026-07-25 14:32',
    description: 'Video Bounty Payout: AI & Tech Jobs in Africa Clip',
    recipientOrSource: 'ClipKenya Bounty Escrow'
  },
  {
    id: 'tx_002',
    userId: 'usr_me_001',
    type: 'deposit',
    amountKES: 25000,
    amountUSD: 192,
    status: 'completed',
    provider: 'mpesa',
    reference: 'QMT91024L2',
    timestamp: '2026-07-20 09:15',
    description: 'M-Pesa Express STK Deposit (+254 712 *** 890)',
    recipientOrSource: 'M-Pesa STK Push'
  },
  {
    id: 'tx_003',
    userId: 'usr_me_001',
    type: 'referral_bonus',
    amountKES: 2500,
    amountUSD: 19,
    status: 'completed',
    provider: 'mpesa',
    reference: 'REF8829101',
    timestamp: '2026-07-18 18:00',
    description: 'Referral Bonus: @wanjiku_edits joined ClipKenya',
    recipientOrSource: 'ClipKenya Creator Referral Program'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_001',
    title: '💰 Bounty Payout Approved!',
    message: 'Your submitted clip "Why AI won\'t replace Nairobi Software Engineers" passed 145k views. 17,400 KES deposited to your wallet.',
    type: 'money',
    read: false,
    timestamp: '1 hour ago'
  },
  {
    id: 'notif_002',
    title: '✉️ New Campaign Contract Offer',
    message: 'Safaricom PLC sent you a 45,000 KES campaign contract offer in messages.',
    type: 'message',
    read: false,
    timestamp: '2 hours ago'
  },
  {
    id: 'notif_003',
    title: '🎉 Welcome to ClipKenya Pro',
    message: 'Your profile is now verified. You have full access to M-Pesa instant payouts and Gemini AI Creator Tools.',
    type: 'success',
    read: true,
    timestamp: '2 days ago'
  }
];
