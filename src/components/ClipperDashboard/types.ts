export interface ClipperBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'performance' | 'milestone' | 'rating' | 'speed';
  progress: number; // 0 to 100
  targetCount: number;
  currentCount: number;
}

export interface RecommendedCampaign {
  id: string;
  title: string;
  brandName: string;
  brandLogo: string;
  budgetKES: number;
  paymentPerClipKES: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Pro' | 'Viral Masters';
  deadline: string;
  isBookmarked?: boolean;
  sourceVideosCount: number;
}

export interface WithdrawalRequest {
  id: string;
  amountKES: number;
  method: 'mpesa' | 'paypal' | 'stripe' | 'flutterwave' | 'wise';
  accountDetails: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  requestedAt: string;
  processedAt?: string;
}

export interface PortfolioVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views: string;
  likes: string;
  category: string;
  platform: 'tiktok' | 'youtube' | 'instagram';
}

export interface ClipperReview {
  id: string;
  clientName: string;
  clientAvatar: string;
  rating: number;
  comment: string;
  date: string;
  campaignTitle: string;
}
