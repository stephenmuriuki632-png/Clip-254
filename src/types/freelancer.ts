export type FreelancerCategory =
  | 'Video Editing'
  | 'Graphic Design'
  | 'Logo Design'
  | 'Brand Identity'
  | 'Motion Graphics'
  | 'Animation'
  | 'UI Design'
  | 'UX Design'
  | 'Web Design'
  | 'Web Development'
  | 'Frontend Development'
  | 'Backend Development'
  | 'Full Stack Development'
  | 'Mobile App Development'
  | 'WordPress'
  | 'Shopify'
  | 'Programming'
  | 'AI Development'
  | 'Machine Learning'
  | 'Data Analysis'
  | 'Cybersecurity'
  | 'Copywriting'
  | 'Content Writing'
  | 'SEO'
  | 'Digital Marketing'
  | 'Social Media Management'
  | 'Photography'
  | 'Videography'
  | 'Voice Over'
  | 'Translation'
  | 'Virtual Assistance'
  | 'Business Consulting'
  | 'Architecture'
  | 'Interior Design'
  | '3D Modelling'
  | 'CAD Design'
  | 'Music Production'
  | 'Podcast Editing'
  | 'Resume Writing'
  | 'Presentation Design';

export type ExperienceLevel = 'Entry Level' | 'Intermediate' | 'Expert';

export interface ServicePackage {
  name: 'Basic' | 'Standard' | 'Premium';
  title: string;
  description: string;
  priceKES: number;
  deliveryTimeDays: number;
  revisions: number | 'Unlimited';
  features: string[];
  includeSourceFiles: boolean;
  commercialRights: boolean;
  prioritySupport: boolean;
}

export interface FreelanceFAQ {
  question: string;
  answer: string;
}

export interface FreelancePortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  category: string;
  clientName?: string;
  completedDate?: string;
}

export interface FreelanceService {
  id: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerRole: string;
  freelancerBadge?: string;
  country: string;
  verified: boolean;
  title: string;
  description: string;
  category: FreelancerCategory;
  subcategory?: string;
  tags: string[];
  startingPriceKES: number;
  rating: number;
  reviewCount: number;
  ordersCount: number;
  coverImage: string;
  galleryImages: string[];
  galleryVideos?: string[];
  packages: {
    basic: ServicePackage;
    standard: ServicePackage;
    premium: ServicePackage;
  };
  whatsIncluded: string[];
  requirements: string[];
  faqs: FreelanceFAQ[];
  portfolio: FreelancePortfolioItem[];
  viewsCount: number;
  createdAt: string;
}

export interface JobPosting {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  clientCompany?: string;
  title: string;
  description: string;
  category: FreelancerCategory;
  skills: string[];
  budgetKES: number;
  deadline: string;
  experienceLevel: ExperienceLevel;
  attachments?: { name: string; url: string; size?: string }[];
  requiredLanguages: string[];
  location: string;
  proposalsCount: number;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface FreelanceProposal {
  id: string;
  jobId: string;
  jobTitle: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerRating: number;
  coverLetter: string;
  proposedPriceKES: number;
  estimatedDeliveryDays: number;
  portfolioAttachments: { title: string; url: string }[];
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'withdrawn';
  createdAt: string;
}

export type FreelanceOrderStatus =
  | 'pending'
  | 'in_progress'
  | 'delivered'
  | 'revision_requested'
  | 'completed'
  | 'cancelled'
  | 'refund_requested';

export interface FreelanceDelivery {
  id: string;
  orderId: string;
  deliveryNotes: string;
  files: { name: string; url: string; size?: string; isSourceFile?: boolean }[];
  videoPreviewUrl?: string;
  externalLinks?: string[];
  submittedAt: string;
}

export interface FreelanceRevision {
  id: string;
  orderId: string;
  requestedBy: 'client' | 'freelancer';
  feedbackNotes: string;
  attachments?: { name: string; url: string }[];
  requestedAt: string;
  status: 'pending' | 'resolved';
}

export interface FreelanceOrder {
  id: string;
  serviceId?: string;
  serviceTitle: string;
  servicePackageName: 'Basic' | 'Standard' | 'Premium' | 'Custom';
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  priceKES: number;
  deliveryTimeDays: number;
  deadlineDate: string;
  status: FreelanceOrderStatus;
  requirementsNotes?: string;
  deliveries: FreelanceDelivery[];
  revisions: FreelanceRevision[];
  createdAt: string;
  completedAt?: string;
  clientReview?: {
    rating: number;
    comment: string;
    createdAt: string;
  };
}

export interface FreelanceStatSummary {
  activeServices: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalRevenueKES: number;
  monthlyRevenueKES: number;
  averageRating: number;
  repeatClients: number;
  profileViews: number;
  serviceViews: number;
  responseRatePercent: number;
  completionRatePercent: number;
  successScorePercent: number;
}
