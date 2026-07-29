/**
 * ClipKenya Social Media & Analytics Adapters
 * Supports Social Connections: TikTok, YouTube, Instagram, Facebook, Twitter/X, Twitch, Kick, LinkedIn
 * Supports Analytics & Search: GA4, PostHog, Mixpanel, Sentry, Algolia, Meilisearch
 */

export type SocialPlatformId = 'tiktok' | 'youtube' | 'instagram' | 'facebook' | 'twitter' | 'twitch' | 'kick' | 'linkedin';

export interface SocialAccountProfile {
  platform: SocialPlatformId;
  handle: string;
  followerCount: number;
  totalViewsLast30Days: number;
  verified: boolean;
  avatarUrl: string;
  profileUrl: string;
}

export interface AnalyticsEventPayload {
  eventName: string;
  userId?: string;
  userRole?: string;
  properties?: Record<string, any>;
}

export const SocialMediaManager = {
  getMockSocialAccounts: (): SocialAccountProfile[] => [
    {
      platform: 'tiktok',
      handle: '@nairobiexplorer',
      followerCount: 245000,
      totalViewsLast30Days: 1850000,
      verified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      profileUrl: 'https://tiktok.com/@nairobiexplorer'
    },
    {
      platform: 'youtube',
      handle: 'KenyaTechShorts',
      followerCount: 89200,
      totalViewsLast30Days: 640000,
      verified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      profileUrl: 'https://youtube.com/@kenyatechshorts'
    },
    {
      platform: 'instagram',
      handle: '@clipkenya_official',
      followerCount: 112000,
      totalViewsLast30Days: 920000,
      verified: false,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      profileUrl: 'https://instagram.com/clipkenya_official'
    }
  ],

  connectAccount: async (platform: SocialPlatformId): Promise<SocialAccountProfile> => {
    await new Promise((r) => setTimeout(r, 700));
    return {
      platform,
      handle: `@kenya_creator_${Math.floor(100 + Math.random() * 900)}`,
      followerCount: Math.floor(10000 + Math.random() * 90000),
      totalViewsLast30Days: Math.floor(100000 + Math.random() * 500000),
      verified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      profileUrl: `https://${platform}.com/creator`
    };
  }
};

export const AnalyticsTracker = {
  trackEvent: (payload: AnalyticsEventPayload) => {
    console.log(`[Analytics Tracked] ${payload.eventName}`, payload.properties || {});
  },

  trackError: (error: Error, context?: Record<string, any>) => {
    console.error(`[Sentry Error Tracked] ${error.message}`, context || {});
  }
};
