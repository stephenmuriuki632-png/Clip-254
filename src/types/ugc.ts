import { UserProfile, Campaign } from './index';

export type UGCServiceType =
  | 'Product Review'
  | 'Unboxing'
  | 'Lifestyle Content'
  | 'TikTok Ads'
  | 'Instagram Reels'
  | 'YouTube Shorts'
  | 'Facebook Ads'
  | 'UGC Photography'
  | 'Voice Over'
  | 'Script Reading'
  | 'Product Demonstration'
  | 'Travel Content'
  | 'Fitness Content'
  | 'Food Content'
  | 'Beauty Content'
  | 'Fashion Content'
  | 'Tech Reviews'
  | 'Gaming Content'
  | 'Educational Content';

export interface UGCPackage {
  id: string;
  name: 'Basic Package' | 'Standard Package' | 'Premium Package';
  priceKES: number;
  priceUSD: number;
  deliveryDays: number;
  revisions: number;
  videoLengthSeconds: number;
  resolution: '1080p Full HD' | '4K UHD';
  usageRights: '30 Days Digital' | '90 Days Digital' | '1 Year Full Usage' | 'Perpetual';
  commercialRights: boolean;
  platformSupport: ('TikTok' | 'Instagram' | 'YouTube' | 'Facebook')[];
  features: string[];
}

export interface UGCPortfolioItem {
  id: string;
  type: 'video' | 'image' | 'before_after' | 'case_study' | 'testimonial';
  title: string;
  description: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  beforeUrl?: string;
  afterUrl?: string;
  clientName?: string;
  results?: string; // e.g. "4.2x ROAS", "1.5M organic views"
  isPinned?: boolean;
  isFeatured?: boolean;
  category?: string;
}

export interface UGCSocialAccount {
  platform: 'TikTok' | 'Instagram' | 'YouTube' | 'Facebook' | 'LinkedIn' | 'X';
  handle: string;
  url: string;
  followersCount: number;
  engagementRate: number; // percentage, e.g., 4.8
  avgViews: number;
  connected: boolean;
}

export interface UGCProfileData {
  id: string;
  userId: string;
  displayName: string;
  username: string;
  avatar: string;
  coverImage: string;
  bio: string;
  country: string;
  city: string;
  location: string;
  languages: string[];
  skills: string[];
  contentNiches: string[];
  equipmentUsed: string[];
  deliveryTimeDays: number;
  startingPriceKES: number;
  hourlyRateKES: number;
  verifiedBadge: boolean;
  availabilityStatus: 'Available Now' | 'Booked This Week' | 'Away';
  averageRating: number;
  reviewsCount: number;
  completedProjectsCount: number;
  repeatClientsCount: number;
  responseTimeMinutes: number;
  completionRatePercent: number;
  responseRatePercent: number;
  socialAccounts: UGCSocialAccount[];
  portfolioItems: UGCPortfolioItem[];
  packages: UGCPackage[];
  servicesOffered: UGCServiceType[];
}

export interface UGCCampaignDetail extends Campaign {
  productName?: string;
  campaignObjective?: string;
  targetAudience?: string;
  creatorRequirements?: string;
  pricePerVideoKES?: number;
  maxCreatorsNeeded?: number;
  brandAssets?: { name: string; url: string; type: 'image' | 'video' | 'document' }[];
  usageRightsDuration?: string;
  commercialRightsIncluded?: boolean;
  bookmarkedByBrands?: string[];
}

export interface UGCApplication {
  id: string;
  campaignId: string;
  campaignTitle: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorHandle: string;
  proposedPriceKES: number;
  deliveryDays: number;
  proposalText: string;
  sampleVideoUrl?: string;
  appliedAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
}

export interface UGCMilestone {
  id: string;
  description: string;
  amountKES: number;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'approved' | 'paid';
  submittedAt?: string;
  approvedAt?: string;
  submissionUrl?: string;
}

export interface UGCContract {
  id: string;
  bookingId: string;
  campaignTitle: string;
  brandName: string;
  brandId: string;
  creatorName: string;
  creatorId: string;
  deliverables: string[];
  timelineDays: number;
  paymentTerms: string;
  totalAmountKES: number;
  revisionLimit: number;
  cancellationPolicy: string;
  brandSigned: boolean;
  brandSignedAt?: string;
  creatorSigned: boolean;
  creatorSignedAt?: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  milestones: UGCMilestone[];
}

export interface UGCRevisionRequest {
  id: string;
  bookingId: string;
  requestedBy: 'brand' | 'creator';
  notes: string;
  timestamp: string;
  attachmentUrl?: string;
  status: 'pending' | 'in_review' | 'resolved';
}

export interface UGCBooking {
  id: string;
  campaignId?: string;
  title: string;
  brandId: string;
  brandName: string;
  brandAvatar: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  packageType?: 'Basic Package' | 'Standard Package' | 'Premium Package' | 'Custom Brief';
  totalPriceKES: number;
  deadlineDate: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'submitted' | 'revision_requested' | 'completed' | 'cancelled';
  progressPercent: number;
  scheduledPostDate?: string;
  contract?: UGCContract;
  revisions: UGCRevisionRequest[];
  deliveryUrl?: string;
  createdAt: string;
}

export interface UGCReview {
  id: string;
  bookingId: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  fromRole: 'brand' | 'creator';
  toUserId: string;
  rating: number; // 1 to 5
  comment: string;
  verified: boolean;
  date: string;
  categoriesRatings?: {
    communication: number;
    contentQuality: number;
    adherenceToBrief: number;
    punctuality: number;
  };
}

export interface UGCAnalyticsData {
  profileViews: number;
  portfolioViews: number;
  totalBookings: number;
  acceptanceRate: number;
  completionRate: number;
  monthlyEarningsKES: number;
  lifetimeEarningsKES: number;
  repeatClients: number;
  topServices: { service: UGCServiceType; bookingsCount: number; revenueKES: number }[];
  monthlyRevenueChart: { month: string; amountKES: number }[];
  brandAnalytics?: {
    totalCampaigns: number;
    activeCreatorsCount: number;
    totalBudgetSpentKES: number;
    conversionRate: number;
    avgROAS: number;
  };
}
