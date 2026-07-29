import {
  UGCProfileData,
  UGCCampaignDetail,
  UGCBooking,
  UGCApplication,
  UGCContract,
  UGCReview,
  UGCAnalyticsData,
  UGCServiceType
} from '../types';

export const MOCK_UGC_SERVICES: UGCServiceType[] = [
  'Product Review',
  'Unboxing',
  'Lifestyle Content',
  'TikTok Ads',
  'Instagram Reels',
  'YouTube Shorts',
  'Facebook Ads',
  'UGC Photography',
  'Voice Over',
  'Script Reading',
  'Product Demonstration',
  'Travel Content',
  'Fitness Content',
  'Food Content',
  'Beauty Content',
  'Fashion Content',
  'Tech Reviews',
  'Gaming Content',
  'Educational Content'
];

export const MOCK_UGC_CREATORS: UGCProfileData[] = [
  {
    id: 'ugc_001',
    userId: 'usr_003',
    displayName: 'Amina Abdi',
    username: 'amina_ugc_ke',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    bio: 'Top 1% Beauty & Tech UGC Creator in Nairobi. Created 200+ converting TikTok & Instagram Reels ads for Jumia, Bolt, KCB & Nivea East Africa. High hook rate & organic storytelling.',
    country: 'Kenya',
    city: 'Nairobi',
    location: 'Nairobi, Kenya',
    languages: ['English', 'Swahili'],
    skills: ['TikTok Hooks', 'Product Unboxing', 'Problem-Agitate-Solve Scripts', 'Color Grading', 'Voiceovers'],
    contentNiches: ['Beauty Content', 'Tech Reviews', 'Lifestyle Content', 'Product Review'],
    equipmentUsed: ['iPhone 15 Pro Max', 'Rode Wireless GO II', 'Godox Softbox Lighting', 'DJI Osmo Mobile 6'],
    deliveryTimeDays: 2,
    startingPriceKES: 15000,
    hourlyRateKES: 4500,
    verifiedBadge: true,
    availabilityStatus: 'Available Now',
    averageRating: 4.95,
    reviewsCount: 68,
    completedProjectsCount: 84,
    repeatClientsCount: 22,
    responseTimeMinutes: 15,
    completionRatePercent: 99,
    responseRatePercent: 100,
    socialAccounts: [
      { platform: 'TikTok', handle: '@amina_ugc_ke', url: 'https://tiktok.com', followersCount: 185000, engagementRate: 8.4, avgViews: 45000, connected: true },
      { platform: 'Instagram', handle: '@amina_content', url: 'https://instagram.com', followersCount: 92000, engagementRate: 5.6, avgViews: 28000, connected: true },
      { platform: 'YouTube', handle: '@AminaUGC', url: 'https://youtube.com', followersCount: 34000, engagementRate: 4.1, avgViews: 12000, connected: true },
      { platform: 'LinkedIn', handle: 'Amina Abdi UGC', url: 'https://linkedin.com', followersCount: 5200, engagementRate: 3.2, avgViews: 3000, connected: true },
    ],
    portfolioItems: [
      {
        id: 'port_1',
        type: 'video',
        title: 'Nivea Luminous Serum TikTok Ad',
        description: '30-second problem/solution hook style UGC video generating 1.8M organic views and 3.8x ROAS.',
        mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
        results: '3.8x ROAS | 1.8M Views',
        isPinned: true,
        isFeatured: true,
        category: 'Beauty Content'
      },
      {
        id: 'port_2',
        type: 'before_after',
        title: 'Skincare Routine Transformation',
        description: 'Before & After comparison video showcasing product efficacy for organic social launch.',
        mediaUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
        beforeUrl: 'https://images.unsplash.com/photo-1512290900673-0570b2401ebc?auto=format&fit=crop&w=600&q=80',
        afterUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
        results: '22% Conversion Lift',
        isPinned: true,
        category: 'Product Review'
      },
      {
        id: 'port_3',
        type: 'case_study',
        title: 'Fintech App Onboarding Campaign',
        description: 'Created 5 variation hooks for M-Pesa app feature update. A/B test resulted in 42% decrease in CPI.',
        mediaUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
        clientName: 'M-Pesa Africa',
        results: '42% Lower Cost Per Install',
        category: 'Tech Reviews'
      },
      {
        id: 'port_4',
        type: 'testimonial',
        title: 'Unboxing E-commerce Smartwatch',
        description: 'Sincere reaction and feature walkthrough in Swahili and English blend.',
        mediaUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
        clientName: 'Kilimall Kenya',
        results: '520 Units Sold in 7 Days',
        category: 'Unboxing'
      }
    ],
    packages: [
      {
        id: 'pkg_1',
        name: 'Basic Package',
        priceKES: 15000,
        priceUSD: 115,
        deliveryDays: 3,
        revisions: 1,
        videoLengthSeconds: 30,
        resolution: '1080p Full HD',
        usageRights: '30 Days Digital',
        commercialRights: true,
        platformSupport: ['TikTok', 'Instagram'],
        features: ['1 Video Hook', 'Swahili or English Voiceover', 'Raw Footage Provided', '30-Day Digital Paid Ads Right']
      },
      {
        id: 'pkg_2',
        name: 'Standard Package',
        priceKES: 28000,
        priceUSD: 215,
        deliveryDays: 2,
        revisions: 2,
        videoLengthSeconds: 60,
        resolution: '4K UHD',
        usageRights: '90 Days Digital',
        commercialRights: true,
        platformSupport: ['TikTok', 'Instagram', 'YouTube'],
        features: ['3 Different Video Hooks', 'Full Edited Video + Captions', '3 High-Res Product Photos', 'Sound Design & B-Roll']
      },
      {
        id: 'pkg_3',
        name: 'Premium Package',
        priceKES: 45000,
        priceUSD: 345,
        deliveryDays: 2,
        revisions: 3,
        videoLengthSeconds: 90,
        resolution: '4K UHD',
        usageRights: '1 Year Full Usage',
        commercialRights: true,
        platformSupport: ['TikTok', 'Instagram', 'YouTube', 'Facebook'],
        features: ['5 Video Variations for A/B Testing', '5 Product Photos', 'Whitelisting Rights', 'Full RAW Stems + Subtitles', 'Dedicated Scriptwriting']
      }
    ],
    servicesOffered: ['Product Review', 'Unboxing', 'TikTok Ads', 'Beauty Content', 'Tech Reviews', 'Lifestyle Content', 'Voice Over']
  },
  {
    id: 'ugc_002',
    userId: 'usr_004',
    displayName: 'David Ochieng',
    username: 'david_fitness_ugc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    bio: 'Fitness, Food & Lifestyle UGC Specialist. Energy-packed workout reels, gym supplement unboxings and meal prep videos in 4K.',
    country: 'Kenya',
    city: 'Mombasa',
    location: 'Mombasa, Kenya',
    languages: ['English', 'Swahili'],
    skills: ['Action Shots', 'Voiceover', 'Gym Lighting', 'Dietary Product Demos'],
    contentNiches: ['Fitness Content', 'Food Content', 'Lifestyle Content'],
    equipmentUsed: ['Sony A7 IV', 'Gopro Hero 12', 'Saramonic Wireless Mic'],
    deliveryTimeDays: 3,
    startingPriceKES: 12000,
    hourlyRateKES: 3800,
    verifiedBadge: true,
    availabilityStatus: 'Available Now',
    averageRating: 4.88,
    reviewsCount: 42,
    completedProjectsCount: 51,
    repeatClientsCount: 14,
    responseTimeMinutes: 25,
    completionRatePercent: 97,
    responseRatePercent: 98,
    socialAccounts: [
      { platform: 'TikTok', handle: '@david_fitness', url: 'https://tiktok.com', followersCount: 112000, engagementRate: 7.2, avgViews: 31000, connected: true },
      { platform: 'Instagram', handle: '@david_fit_ke', url: 'https://instagram.com', followersCount: 48000, engagementRate: 6.1, avgViews: 19000, connected: true },
      { platform: 'Facebook', handle: 'David Ochieng Fitness', url: 'https://facebook.com', followersCount: 15000, engagementRate: 3.5, avgViews: 8000, connected: true }
    ],
    portfolioItems: [
      {
        id: 'port_201',
        type: 'video',
        title: 'Whey Protein Powder Shake Demo',
        description: 'Post-workout protein shake demo with energetic music and macro breakdown overlays.',
        mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
        results: '1.2M Organic Views',
        isPinned: true,
        category: 'Fitness Content'
      }
    ],
    packages: [
      {
        id: 'pkg_201',
        name: 'Basic Package',
        priceKES: 12000,
        priceUSD: 92,
        deliveryDays: 3,
        revisions: 1,
        videoLengthSeconds: 30,
        resolution: '1080p Full HD',
        usageRights: '30 Days Digital',
        commercialRights: true,
        platformSupport: ['TikTok', 'Instagram'],
        features: ['1 Gym/Lifestyle Video', 'Voiceover Included', 'Basic Text Overlays']
      },
      {
        id: 'pkg_202',
        name: 'Standard Package',
        priceKES: 22000,
        priceUSD: 169,
        deliveryDays: 2,
        revisions: 2,
        videoLengthSeconds: 60,
        resolution: '4K UHD',
        usageRights: '90 Days Digital',
        commercialRights: true,
        platformSupport: ['TikTok', 'Instagram', 'YouTube'],
        features: ['2 Videos (Demo + Unboxing)', '3 HD Photos', 'Subtitles Included']
      },
      {
        id: 'pkg_203',
        name: 'Premium Package',
        priceKES: 38000,
        priceUSD: 292,
        deliveryDays: 2,
        revisions: 3,
        videoLengthSeconds: 90,
        resolution: '4K UHD',
        usageRights: '1 Year Full Usage',
        commercialRights: true,
        platformSupport: ['TikTok', 'Instagram', 'YouTube', 'Facebook'],
        features: ['4 Videos Bundle for Ad Testing', '5 High-Res Fitness Photos', 'Whitelisting Access']
      }
    ],
    servicesOffered: ['Fitness Content', 'Food Content', 'Product Review', 'TikTok Ads', 'Unboxing']
  },
  {
    id: 'ugc_003',
    userId: 'usr_005',
    displayName: 'Brenda Cherono',
    username: 'brenda_style_ugc',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    bio: 'Fashion, Travel & E-Commerce UGC Creator in Kenya. Experiential try-on hauls, luxury resort reviews, and fashion brand ads.',
    country: 'Kenya',
    city: 'Nairobi',
    location: 'Nairobi, Kenya',
    languages: ['English', 'Swahili'],
    skills: ['Try-On Transitions', 'Aesthetic Lighting', 'Outfit Styling', 'Shorts/Reels Hooking'],
    contentNiches: ['Fashion Content', 'Travel Content', 'Beauty Content', 'Lifestyle Content'],
    equipmentUsed: ['iPhone 15 Pro', 'DJI Pocket 3', 'Softbox Studio Lights'],
    deliveryTimeDays: 2,
    startingPriceKES: 18000,
    hourlyRateKES: 5000,
    verifiedBadge: true,
    availabilityStatus: 'Available Now',
    averageRating: 4.98,
    reviewsCount: 54,
    completedProjectsCount: 62,
    repeatClientsCount: 18,
    responseTimeMinutes: 10,
    completionRatePercent: 100,
    responseRatePercent: 100,
    socialAccounts: [
      { platform: 'TikTok', handle: '@brendacherono', url: 'https://tiktok.com', followersCount: 220000, engagementRate: 9.1, avgViews: 62000, connected: true },
      { platform: 'Instagram', handle: '@brenda_fashion', url: 'https://instagram.com', followersCount: 135000, engagementRate: 7.4, avgViews: 41000, connected: true },
      { platform: 'YouTube', handle: '@BrendaCherono', url: 'https://youtube.com', followersCount: 51000, engagementRate: 5.2, avgViews: 22000, connected: true }
    ],
    portfolioItems: [
      {
        id: 'port_301',
        type: 'video',
        title: 'Ankara Dress Try-on Haul & Style Guide',
        description: 'Dynamic transition video highlighting 4 outfits for local designer brand.',
        mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
        results: '2.4M Organic Views',
        isPinned: true,
        category: 'Fashion Content'
      }
    ],
    packages: [
      {
        id: 'pkg_301',
        name: 'Basic Package',
        priceKES: 18000,
        priceUSD: 138,
        deliveryDays: 3,
        revisions: 1,
        videoLengthSeconds: 30,
        resolution: '1080p Full HD',
        usageRights: '30 Days Digital',
        commercialRights: true,
        platformSupport: ['TikTok', 'Instagram'],
        features: ['1 Fashion/Try-on Video', 'Dynamic Transitions', 'Color Grading']
      },
      {
        id: 'pkg_302',
        name: 'Standard Package',
        priceKES: 32000,
        priceUSD: 246,
        deliveryDays: 2,
        revisions: 2,
        videoLengthSeconds: 60,
        resolution: '4K UHD',
        usageRights: '90 Days Digital',
        commercialRights: true,
        platformSupport: ['TikTok', 'Instagram', 'YouTube'],
        features: ['2 Videos (Haul + Style Tips)', '4 Editorial Photos', 'Music Rights']
      },
      {
        id: 'pkg_303',
        name: 'Premium Package',
        priceKES: 55000,
        priceUSD: 423,
        deliveryDays: 2,
        revisions: 3,
        videoLengthSeconds: 90,
        resolution: '4K UHD',
        usageRights: '1 Year Full Usage',
        commercialRights: true,
        platformSupport: ['TikTok', 'Instagram', 'YouTube', 'Facebook'],
        features: ['4 High-Converting Video Ads', '8 Studio Photos', 'Full Commercial Rights', 'Script Assistance']
      }
    ],
    servicesOffered: ['Fashion Content', 'Travel Content', 'Beauty Content', 'Lifestyle Content', 'Instagram Reels']
  }
];

export const MOCK_UGC_CAMPAIGNS: UGCCampaignDetail[] = [
  {
    id: 'ugc_camp_001',
    title: 'M-Pesa Global Wallet TikTok Video Brief',
    brandName: 'Safaricom M-Pesa',
    brandLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    brandId: 'brand_saf_01',
    productName: 'M-Pesa Global Visa Virtual Card',
    description: 'We are seeking authentic 30-60s UGC TikTok videos demonstrating how young Africans use the M-Pesa Visa Card to buy from Netflix, Amazon & AliExpress seamlessly.',
    campaignObjective: 'Drive app downloads & virtual card activations among Gen Z and Millennials.',
    budgetKES: 250000,
    budgetUSD: 1920,
    pricePerVideoKES: 25000,
    maxCreatorsNeeded: 10,
    category: 'Fintech & Mobile Money',
    deadline: '2026-08-20',
    deliverables: ['1x 30-60s TikTok Video (9:16)', '1x Raw Video File without text', 'Hook variations (2 versions)'],
    applicantsCount: 18,
    status: 'active',
    requirements: 'Must have active M-Pesa account, clear 1080p camera quality, natural Swahili or English voiceover, confident on screen.',
    targetNiche: ['Tech Reviews', 'Lifestyle Content', 'Educational Content'],
    platform: 'tiktok',
    locationTarget: 'Kenya',
    createdAt: '2026-07-20',
    difficulty: 'Intermediate',
    requiredResolution: '1080p Full HD',
    aspectRatio: '9:16',
    videoDuration: '30-60 seconds',
    targetAudience: 'Africans aged 18-35 shopping online or paying for digital subscriptions.',
    referenceLinks: ['https://tiktok.com/@mpesa_official'],
    hashtags: ['#MPesaGlobal', '#OnlineShoppingKE', '#ClipKenyaUGC'],
    keywords: ['M-Pesa Virtual Card', 'Netflix Payment', 'Online Shopping Kenya'],
    usageRightsDuration: '90 Days Digital Paid Ads',
    commercialRightsIncluded: true,
    brandAssets: [
      { name: 'M-Pesa Brand Guidelines.pdf', url: 'https://example.com/assets/guide.pdf', type: 'document' },
      { name: 'Virtual Card Mockup PNG', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300&q=80', type: 'image' }
    ]
  },
  {
    id: 'ugc_camp_002',
    title: 'Jumia Flash Sale Unboxing & Review',
    brandName: 'Jumia Kenya',
    brandLogo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80',
    brandId: 'brand_jumia_02',
    productName: 'Smart Air Fryer & Kitchen Gadgets',
    description: 'Looking for energetic food/lifestyle UGC creators to unbox and demonstrate cooking quick 15-minute meals using our new Smart Air Fryer.',
    campaignObjective: 'Boost sales during Jumia Tech Week.',
    budgetKES: 180000,
    budgetUSD: 1380,
    pricePerVideoKES: 20000,
    maxCreatorsNeeded: 9,
    category: 'E-Commerce & Electronics',
    deadline: '2026-08-15',
    deliverables: ['1x Unboxing + Recipe Reel (9:16)', '3 High-Res Product Photos'],
    applicantsCount: 24,
    status: 'active',
    requirements: 'Clean kitchen setup, good ambient lighting, crisp audio.',
    targetNiche: ['Food Content', 'Unboxing', 'Lifestyle Content'],
    platform: 'instagram',
    createdAt: '2026-07-22',
    requiredResolution: '4K UHD',
    aspectRatio: '9:16',
    videoDuration: '45-60 seconds',
    hashtags: ['#JumiaTechWeek', '#AirFryerKenya', '#FastRecipes'],
    usageRightsDuration: '1 Year Commercial'
  },
  {
    id: 'ugc_camp_003',
    title: 'Nivea Africa Sunscreen Protection Campaign',
    brandName: 'Nivea East Africa',
    brandLogo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    brandId: 'brand_nivea_03',
    productName: 'Nivea UV Face Shine Control SPF 50',
    description: 'Create a relatable "GRWM / Morning Skincare Routine" showcasing zero white-cast sunscreen application in tropical East African weather.',
    campaignObjective: 'Educate consumers on daily sunscreen protection.',
    budgetKES: 300000,
    budgetUSD: 2300,
    pricePerVideoKES: 30000,
    maxCreatorsNeeded: 10,
    category: 'Beauty Content',
    deadline: '2026-08-25',
    deliverables: ['1x GRWM Skincare Reel', '1x Before/After Photo Pair', 'Whitelisting permission'],
    applicantsCount: 32,
    status: 'active',
    requirements: 'Female/Male skincare enthusiasts with authentic skin texture presentation.',
    targetNiche: ['Beauty Content', 'Lifestyle Content', 'Product Demonstration'],
    platform: 'all',
    createdAt: '2026-07-25',
    requiredResolution: '4K UHD',
    aspectRatio: '9:16',
    videoDuration: '30 seconds',
    usageRightsDuration: 'Perpetual Digital'
  }
];

export const MOCK_UGC_BOOKINGS: UGCBooking[] = [
  {
    id: 'book_101',
    campaignId: 'ugc_camp_001',
    title: 'M-Pesa Visa Card TikTok Ad Video',
    brandId: 'brand_saf_01',
    brandName: 'Safaricom M-Pesa',
    brandAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    creatorId: 'usr_003',
    creatorName: 'Amina Abdi',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    packageType: 'Standard Package',
    totalPriceKES: 28000,
    deadlineDate: '2026-08-10',
    status: 'in_progress',
    progressPercent: 65,
    scheduledPostDate: '2026-08-12',
    createdAt: '2026-07-26',
    revisions: [
      {
        id: 'rev_01',
        bookingId: 'book_101',
        requestedBy: 'brand',
        notes: 'Please add M-Pesa logo overlay at second 0:02 to 0:05 and mention the zero conversion fee feature.',
        timestamp: '2026-07-27 14:30',
        status: 'resolved'
      }
    ],
    contract: {
      id: 'cnt_101',
      bookingId: 'book_101',
      campaignTitle: 'M-Pesa Visa Card TikTok Ad Video',
      brandName: 'Safaricom M-Pesa',
      brandId: 'brand_saf_01',
      creatorName: 'Amina Abdi',
      creatorId: 'usr_003',
      deliverables: [
        '1x 60-second TikTok Video with voiceover',
        '3x Hook Variations for A/B testing',
        'Raw unedited MP4 video files'
      ],
      timelineDays: 5,
      paymentTerms: '100% Escrow locked upfront, released upon brand approval.',
      totalAmountKES: 28000,
      revisionLimit: 2,
      cancellationPolicy: '50% refund if cancelled before draft submission. 0% after draft approval.',
      brandSigned: true,
      brandSignedAt: '2026-07-26 10:15',
      creatorSigned: true,
      creatorSignedAt: '2026-07-26 11:20',
      status: 'active',
      milestones: [
        {
          id: 'ms_1',
          description: 'Script & Concept Approval',
          amountKES: 8000,
          dueDate: '2026-07-28',
          status: 'approved',
          approvedAt: '2026-07-27 16:00'
        },
        {
          id: 'ms_2',
          description: 'Video Draft Submission',
          amountKES: 12000,
          dueDate: '2026-08-02',
          status: 'in_progress'
        },
        {
          id: 'ms_3',
          description: 'Final High-Res Export & RAW Assets',
          amountKES: 8000,
          dueDate: '2026-08-05',
          status: 'pending'
        }
      ]
    }
  },
  {
    id: 'book_102',
    campaignId: 'ugc_camp_002',
    title: 'Jumia Air Fryer Unboxing Reel',
    brandId: 'brand_jumia_02',
    brandName: 'Jumia Kenya',
    brandAvatar: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80',
    creatorId: 'usr_003',
    creatorName: 'Amina Abdi',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    packageType: 'Basic Package',
    totalPriceKES: 20000,
    deadlineDate: '2026-08-01',
    status: 'submitted',
    progressPercent: 90,
    deliveryUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    createdAt: '2026-07-22',
    revisions: []
  }
];

export const MOCK_UGC_APPLICATIONS: UGCApplication[] = [
  {
    id: 'app_201',
    campaignId: 'ugc_camp_003',
    campaignTitle: 'Nivea Africa Sunscreen Protection Campaign',
    creatorId: 'usr_003',
    creatorName: 'Amina Abdi',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    creatorHandle: '@amina_ugc_ke',
    proposedPriceKES: 30000,
    deliveryDays: 2,
    proposalText: 'Hi Nivea Team! I have created beauty UGC for over 15 brands in EA. I will shoot this GRWM video on my iPhone 15 Pro Max in morning sunlight showing 0 white-cast application with Swahili voiceover.',
    appliedAt: '2026-07-26 15:40',
    status: 'pending'
  }
];

export const MOCK_UGC_REVIEWS: UGCReview[] = [
  {
    id: 'rev_301',
    bookingId: 'book_099',
    fromUserId: 'brand_saf_01',
    fromUserName: 'Safaricom Marketing Team',
    fromUserAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    fromRole: 'brand',
    toUserId: 'usr_003',
    rating: 5,
    comment: 'Amina delivered outstanding quality! Her hook was super engaging and achieved 1.8M views in our paid campaign. Will definitely work with her again.',
    verified: true,
    date: '2026-07-15',
    categoriesRatings: {
      communication: 5,
      contentQuality: 5,
      adherenceToBrief: 5,
      punctuality: 5
    }
  },
  {
    id: 'rev_302',
    bookingId: 'book_098',
    fromUserId: 'brand_bolt_02',
    fromUserName: 'Bolt Food Kenya',
    fromUserAvatar: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80',
    fromRole: 'brand',
    toUserId: 'usr_003',
    rating: 4.9,
    comment: 'Fast 24-hour turnaround time and great communication. Videos converted well on TikTok Ads.',
    verified: true,
    date: '2026-07-02',
    categoriesRatings: {
      communication: 5,
      contentQuality: 5,
      adherenceToBrief: 4.8,
      punctuality: 5
    }
  }
];

export const MOCK_UGC_ANALYTICS: UGCAnalyticsData = {
  profileViews: 14200,
  portfolioViews: 8600,
  totalBookings: 84,
  acceptanceRate: 92,
  completionRate: 99,
  monthlyEarningsKES: 185000,
  lifetimeEarningsKES: 1420000,
  repeatClients: 22,
  topServices: [
    { service: 'TikTok Ads', bookingsCount: 38, revenueKES: 680000 },
    { service: 'Product Review', bookingsCount: 24, revenueKES: 420000 },
    { service: 'Unboxing', bookingsCount: 14, revenueKES: 210000 },
    { service: 'Beauty Content', bookingsCount: 8, revenueKES: 110000 }
  ],
  monthlyRevenueChart: [
    { month: 'Feb', amountKES: 110000 },
    { month: 'Mar', amountKES: 135000 },
    { month: 'Apr', amountKES: 150000 },
    { month: 'May', amountKES: 162000 },
    { month: 'Jun', amountKES: 175000 },
    { month: 'Jul', amountKES: 185000 }
  ],
  brandAnalytics: {
    totalCampaigns: 12,
    activeCreatorsCount: 28,
    totalBudgetSpentKES: 850000,
    conversionRate: 4.2,
    avgROAS: 3.6
  }
};
