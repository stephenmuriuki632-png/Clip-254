export * from './ugc';
export * from './freelancer';
export * from './finance';
export * from './ai';
export * from './academy';

export type UserRole = 
  | 'creator' 
  | 'editor' 
  | 'ugc' 
  | 'influencer' 
  | 'brand' 
  | 'agency' 
  | 'freelancer' 
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  role: UserRole; // primary role
  primaryRole?: UserRole;
  additionalRoles?: UserRole[]; // secondary roles added later
  activeRole?: UserRole; // currently active perspective
  permissions?: string[];
  email: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  location: string; // e.g. "Nairobi, Kenya", "Lagos, Nigeria"
  verified: boolean;
  rating: number;
  reviewCount: number;
  followersCount: number;
  primaryPlatform: 'tiktok' | 'youtube' | 'instagram' | 'x' | 'linkedin';
  niche: string[];
  rates: {
    hourlyUSD?: number;
    hourlyKES?: number;
    videoClipKES?: number;
    ugcPostKES?: number;
    sponsoredVideoKES?: number;
  };
  socialLinks: {
    tiktok?: string;
    youtube?: string;
    instagram?: string;
    x?: string;
    spotify?: string;
    portfolio?: string;
  };
  skills: string[];
  badge?: string; // e.g. "Top Rated Editor", "Verified Brand", "Rising Star"
  completedOrders: number;
  featuredVideos?: {
    title: string;
    url: string;
    thumbnail: string;
    views: string;
  }[];
}

export interface Campaign {
  id: string;
  title: string;
  brandName: string;
  brandLogo: string;
  brandId: string;
  description: string;
  budgetKES: number;
  budgetUSD: number;
  category: string;
  deadline: string;
  deliverables: string[];
  applicantsCount: number;
  status: 'active' | 'draft' | 'completed' | 'in_review' | 'paused' | 'archived';
  requirements: string;
  targetNiche: string[];
  platform: 'tiktok' | 'youtube' | 'instagram' | 'all';
  locationTarget?: string;
  createdAt: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Pro' | 'Viral Masters';
  paymentPerClipKES?: number;
  maxClips?: number;
  requiredResolution?: string;
  aspectRatio?: '9:16' | '16:9' | '1:1' | '4:5';
  videoDuration?: string;
  instructions?: string;
  targetAudience?: string;
  referenceLinks?: string[];
  hashtags?: string[];
  keywords?: string[];
  tags?: string[];
  allowRevisions?: boolean;
  visibility?: 'public' | 'invite_only' | 'private';
  attachments?: { name: string; url: string; type: string; size?: string }[];
}

export interface ClipBounty {
  id: string;
  streamTitle: string;
  hostName: string;
  hostAvatar: string;
  sourceVideoUrl: string;
  thumbnail: string;
  category: string;
  bountyPer100kViewsKES: number;
  totalBountyPoolKES: number;
  remainingPoolKES: number;
  rules: string[];
  submissionsCount: number;
  status: 'active' | 'closed' | 'paused';
  deadline: string;
  viralTags: string[];
  description: string;
}

export interface ClipSubmission {
  id: string;
  bountyId: string;
  bountyTitle: string;
  editorId: string;
  editorName: string;
  editorAvatar: string;
  clipTitle: string;
  platformUrl: string;
  thumbnail: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'revision_requested' | 'completed' | 'paid';
  views: number;
  payoutKES: number;
  submittedAt: string;
  feedback?: string;
  rating?: number;
  videoUrl?: string;
  duration?: string;
  resolution?: string;
  aspectRatio?: string;
  revisionNotes?: string;
  bookmarked?: boolean;
  engagementCount?: number;
  approvedAt?: string;
}

export interface FreelanceGig {
  id: string;
  title: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerRole: string;
  category: 'Video Editing' | 'Thumbnail Design' | 'Scriptwriting' | 'Channel Management' | 'Audio Engineering';
  startingPriceKES: number;
  deliveryDays: number;
  rating: number;
  ordersCount: number;
  coverImage: string;
  description: string;
  deliverables: string[];
  tags: string[];
}

export interface UGCOrder {
  id: string;
  title: string;
  brandName: string;
  brandLogo: string;
  productName: string;
  payoutKES: number;
  deadlineDays: number;
  platform: 'tiktok' | 'reels' | 'shorts';
  category: string;
  description: string;
  productShippingRequired: boolean;
  appliedCount: number;
  status: 'open' | 'assigned' | 'review' | 'completed';
}

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[]; // userIds
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  mediaType?: 'image' | 'video' | 'audio' | 'document' | 'zip' | 'gif';
  mediaUrl?: string;
  fileName?: string;
  fileSize?: string;
  voiceDuration?: string;
  replyTo?: {
    id: string;
    senderName: string;
    text: string;
  };
  reactions?: MessageReaction[];
  isPinned?: boolean;
  isStarred?: boolean;
  isEdited?: boolean;
  status?: 'sending' | 'delivered' | 'read';
  offerDetails?: {
    title: string;
    amountKES: number;
    deliverables: string;
    deadline: string;
    status: 'pending' | 'accepted' | 'declined' | 'completed';
  };
  attachmentUrl?: string;
}

export interface ConversationMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isOnline?: boolean;
  isMod?: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  type?: 'private' | 'group' | 'campaign';
  groupName?: string;
  groupAvatar?: string;
  groupMembers?: ConversationMember[];
  campaignTitle?: string;
  campaignBudgetKES?: number;
  campaignStatus?: string;
  campaignDeliverables?: string[];
  isPinned?: boolean;
  isArchived?: boolean;
  isMuted?: boolean;
  isBlocked?: boolean;
  onlineStatus?: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'payout' | 'escrow_lock' | 'escrow_release' | 'referral_bonus';
  amountKES: number;
  amountUSD: number;
  status: 'completed' | 'pending' | 'failed';
  provider: 'mpesa' | 'bank' | 'paypal' | 'card';
  reference: string;
  timestamp: string;
  description: string;
  recipientOrSource?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'money' | 'message';
  category?: 'messages' | 'campaigns' | 'payments' | 'submissions' | 'community' | 'system';
  read: boolean;
  timestamp: string;
  link?: string;
  senderAvatar?: string;
}

export interface AcademyCourse {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessonsCount: number;
  thumbnail: string;
  rating: number;
  studentsCount: number;
  priceKES: number; // 0 for free
  description: string;
  topics: string[];
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  votedUserIds?: string[];
}

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  timestamp: string;
  likesCount: number;
  isLiked?: boolean;
  isPinned?: boolean;
  parentId?: string; // for nested replies
  reactions?: { emoji: string; count: number }[];
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  title: string;
  content: string;
  category: 'Collab' | 'Tips & Tricks' | 'Showcase' | 'Job Opportunities' | 'General' | 'Announcements';
  likesCount: number;
  commentsCount: number;
  timestamp: string;
  tags: string[];
  isLiked?: boolean;
  isPinned?: boolean;
  isSaved?: boolean;
  mediaType?: 'image' | 'video' | 'poll' | 'question';
  mediaUrl?: string;
  pollOptions?: PollOption[];
  pollTotalVotes?: number;
}

export interface CommunityGroup {
  id: string;
  name: string;
  category: 'Video Editing' | 'UGC' | 'Creators' | 'Gaming' | 'Finance' | 'Education' | 'Technology' | 'Fitness' | 'Comedy' | 'Business' | 'Marketing';
  description: string;
  coverImage: string;
  avatar: string;
  membersCount: number;
  isJoined?: boolean;
  recentActivity: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  type: 'Webinar' | 'Livestream' | 'Competition' | 'Workshop' | 'Creator Meetup' | 'Hackathon';
  category?: string;
  hostName: string;
  hostAvatar: string;
  date: string;
  time?: string;
  duration?: string;
  coverImage?: string;
  bannerImage?: string;
  description: string;
  attendeesCount: number;
  isAttending?: boolean;
  locationOrUrl?: string;
  meetingLink?: string;
  prizePoolKES?: number;
}
