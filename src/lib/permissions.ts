import { UserRole, UserProfile } from '../types';

export type { UserRole };

export type Permission =
  // Creator Capabilities
  | 'campaigns:create'
  | 'videos:upload_longform'
  | 'thumbnails:upload'
  | 'campaigns:instructions'
  | 'campaigns:set_budget'
  | 'bounties:set_payout'
  | 'submissions:approve_reject'
  | 'submissions:feedback'
  | 'analytics:view'
  | 'wallet:view'
  | 'wallet:withdraw'
  | 'chat:send'
  | 'clippers:rate'
  | 'profile:manage'
  | 'campaigns:view_performance'

  // Video Clipper Capabilities
  | 'campaigns:browse'
  | 'campaigns:search_filter'
  | 'videos:download_source'
  | 'clips:upload'
  | 'submissions:save_draft'
  | 'submissions:edit'
  | 'submissions:delete_draft'
  | 'submissions:view_history'
  | 'submissions:track_status'
  | 'earnings:view'
  | 'wallet:request_withdrawal'
  | 'portfolio:build'
  | 'ratings:receive'
  | 'chat:creators'
  | 'notifications:receive'
  | 'leaderboard:join'

  // UGC Creator Capabilities
  | 'ugc_portfolio:create'
  | 'ugc_portfolio:upload_videos'
  | 'pricing:set'
  | 'services:display'
  | 'bookings:receive'
  | 'ugc_campaigns:apply'
  | 'contracts:complete'
  | 'chat:brands'

  // Influencer Capabilities
  | 'social:connect'
  | 'audience:display_insights'
  | 'sponsorships:accept'
  | 'pricing:set_collaboration'
  | 'mediakit:build'

  // Freelancer Capabilities
  | 'freelance:sell_services'
  | 'freelance:manage_orders'

  // Brand Capabilities
  | 'brand:create_campaigns'
  | 'brand:hire_creators'
  | 'brand:hire_influencers'
  | 'brand:hire_freelancers'
  | 'brand:invite_users'
  | 'brand:track_campaigns'
  | 'brand:manage_spending'
  | 'brand:view_reports'

  // Agency Capabilities
  | 'agency:manage_teams'
  | 'agency:invite_members'
  | 'agency:assign_work'
  | 'agency:view_analytics'
  | 'agency:manage_multiple_campaigns'
  | 'agency:manage_multiple_clients'

  // Administrator Capabilities
  | 'admin:full_access'
  | 'admin:manage_users'
  | 'admin:manage_campaigns'
  | 'admin:manage_payments'
  | 'admin:manage_withdrawals'
  | 'admin:manage_reports'
  | 'admin:manage_verification'
  | 'admin:manage_analytics'
  | 'admin:manage_notifications'
  | 'admin:manage_platform_settings'
  | 'admin:manage_audit_logs'
  | 'admin:manage_feature_flags'
  | 'admin:content_moderation'
  | 'admin:impersonate_user';

export interface RoleDefinition {
  id: UserRole;
  title: string;
  badge: string;
  iconName: string;
  description: string;
  capabilities: string[];
  defaultPermissions: Permission[];
}

export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
  creator: {
    id: 'creator',
    title: 'Content Creator',
    badge: 'Creator / Bounty Host',
    iconName: 'Video',
    description: 'Post long-form video bounties, set payout rates per approved clip, and hire clippers.',
    capabilities: [
      'Create campaigns & bounties',
      'Upload long-form videos & thumbnails',
      'Set campaign budget & per-clip payout',
      'Approve/reject submissions with feedback',
      'View analytics & withdraw earnings',
      'Chat with clippers & rate performance'
    ],
    defaultPermissions: [
      'campaigns:create',
      'videos:upload_longform',
      'thumbnails:upload',
      'campaigns:instructions',
      'campaigns:set_budget',
      'bounties:set_payout',
      'submissions:approve_reject',
      'submissions:feedback',
      'analytics:view',
      'wallet:view',
      'wallet:withdraw',
      'chat:send',
      'clippers:rate',
      'profile:manage',
      'campaigns:view_performance',
      'campaigns:browse',
      'campaigns:search_filter'
    ]
  },

  editor: {
    id: 'editor',
    title: 'Video Clipper / Editor',
    badge: 'Video Clipper',
    iconName: 'Scissors',
    description: 'Browse long-form videos, download source material, edit viral clips, and submit for payouts.',
    capabilities: [
      'Browse & filter campaign bounties',
      'Download source 4K/HD video files',
      'Upload edited clips & save drafts',
      'Edit/delete submissions before review',
      'Track status & view M-Pesa earnings',
      'Build portfolio, receive ratings & join leaderboard'
    ],
    defaultPermissions: [
      'campaigns:browse',
      'campaigns:search_filter',
      'videos:download_source',
      'clips:upload',
      'submissions:save_draft',
      'submissions:edit',
      'submissions:delete_draft',
      'submissions:view_history',
      'submissions:track_status',
      'earnings:view',
      'wallet:view',
      'wallet:request_withdrawal',
      'portfolio:build',
      'ratings:receive',
      'chat:creators',
      'notifications:receive',
      'leaderboard:join',
      'profile:manage'
    ]
  },

  ugc: {
    id: 'ugc',
    title: 'UGC Creator',
    badge: 'UGC Creator',
    iconName: 'Camera',
    description: 'Create user-generated video content, showcase portfolio, set rates, and accept brand bookings.',
    capabilities: [
      'Create & upload video portfolio',
      'Set custom video pricing & packages',
      'Display specialized creative services',
      'Receive & accept brand bookings',
      'Apply for UGC campaigns & complete contracts',
      'Direct chat with brands & receive ratings'
    ],
    defaultPermissions: [
      'ugc_portfolio:create',
      'ugc_portfolio:upload_videos',
      'pricing:set',
      'services:display',
      'bookings:receive',
      'ugc_campaigns:apply',
      'contracts:complete',
      'ratings:receive',
      'chat:brands',
      'wallet:view',
      'wallet:withdraw',
      'profile:manage'
    ]
  },

  influencer: {
    id: 'influencer',
    title: 'Social Influencer',
    badge: 'Influencer',
    iconName: 'Sparkles',
    description: 'Connect social handles, display verified audience demographics, and lock sponsored brand deals.',
    capabilities: [
      'Connect TikTok, YouTube & Instagram handles',
      'Display audience reach & engagement analytics',
      'Accept brand sponsorship campaigns',
      'Set custom collaboration pricing',
      'Build media kit & export PDF insights'
    ],
    defaultPermissions: [
      'social:connect',
      'audience:display_insights',
      'sponsorships:accept',
      'pricing:set_collaboration',
      'analytics:view',
      'mediakit:build',
      'wallet:view',
      'wallet:withdraw',
      'profile:manage'
    ]
  },

  freelancer: {
    id: 'freelancer',
    title: 'Creative Freelancer',
    badge: 'Freelancer',
    iconName: 'Briefcase',
    description: 'Offer freelance services: Editing, Graphic Design, UI/UX, Programming, Copywriting, Voiceover, etc.',
    capabilities: [
      'List freelance services across 9 categories',
      'Set delivery timelines & KES package rates',
      'Manage incoming client orders',
      'Build portfolio & withdraw M-Pesa earnings',
      'Chat with clients with Escrow protection'
    ],
    defaultPermissions: [
      'freelance:sell_services',
      'freelance:manage_orders',
      'portfolio:build',
      'wallet:view',
      'wallet:withdraw',
      'chat:send',
      'profile:manage'
    ]
  },

  brand: {
    id: 'brand',
    title: 'Brand / Advertiser',
    badge: 'Verified Brand',
    iconName: 'Building2',
    description: 'Launch multi-channel campaigns, hire clippers, UGC creators, influencers, and track ROI.',
    capabilities: [
      'Create brand campaigns & UGC briefs',
      'Hire creators, influencers & freelancers',
      'Invite brand team members & manage spending',
      'View real-time ROI & campaign reports',
      'Fund escrow via M-Pesa / Card'
    ],
    defaultPermissions: [
      'brand:create_campaigns',
      'brand:hire_creators',
      'brand:hire_influencers',
      'brand:hire_freelancers',
      'brand:invite_users',
      'brand:track_campaigns',
      'brand:manage_spending',
      'brand:view_reports',
      'campaigns:create',
      'wallet:view',
      'analytics:view',
      'chat:send',
      'profile:manage'
    ]
  },

  agency: {
    id: 'agency',
    title: 'Creative Agency',
    badge: 'Agency Partner',
    iconName: 'Users',
    description: 'Manage multiple creators, assign client campaigns, direct agency teams, and consolidate reporting.',
    capabilities: [
      'Manage agency teams & assign work',
      'Invite members & assign role permissions',
      'Oversee multiple client accounts & campaigns',
      'Consolidated agency analytics & billing',
      'Escrow fund allocation across roster'
    ],
    defaultPermissions: [
      'agency:manage_teams',
      'agency:invite_members',
      'agency:assign_work',
      'agency:view_analytics',
      'agency:manage_multiple_campaigns',
      'agency:manage_multiple_clients',
      'brand:create_campaigns',
      'wallet:view',
      'wallet:withdraw',
      'analytics:view',
      'chat:send',
      'profile:manage'
    ]
  },

  admin: {
    id: 'admin',
    title: 'System Administrator',
    badge: 'Administrator',
    iconName: 'ShieldAlert',
    description: 'Full system control, user moderation, payout approvals, feature flags, audit logs & impersonation.',
    capabilities: [
      'Full administrative access across all modules',
      'User management, verification & badges',
      'Payment & M-Pesa withdrawal approvals',
      'Impersonate users for support & troubleshooting',
      'Content moderation, feature flags & audit logs'
    ],
    defaultPermissions: [
      'admin:full_access',
      'admin:manage_users',
      'admin:manage_campaigns',
      'admin:manage_payments',
      'admin:manage_withdrawals',
      'admin:manage_reports',
      'admin:manage_verification',
      'admin:manage_analytics',
      'admin:manage_notifications',
      'admin:manage_platform_settings',
      'admin:manage_audit_logs',
      'admin:manage_feature_flags',
      'admin:content_moderation',
      'admin:impersonate_user',
      'campaigns:create',
      'campaigns:browse',
      'analytics:view',
      'wallet:view',
      'wallet:withdraw',
      'profile:manage'
    ]
  }
};

/**
  * Check if user has a specific permission based on active role & secondary roles.
  */
export function hasPermission(
  user: UserProfile,
  permission: Permission,
  activeRole?: UserRole
): boolean {
  if (!user) return false;

  const currentRole = activeRole || user.activeRole || user.role;

  // Admin has full access
  if (currentRole === 'admin' || user.role === 'admin') {
    return true;
  }

  // Check default permissions for active role
  const roleDef = ROLE_DEFINITIONS[currentRole];
  if (roleDef && roleDef.defaultPermissions.includes(permission)) {
    return true;
  }

  // Check secondary roles if user activated them
  if (user.additionalRoles && user.additionalRoles.length > 0) {
    for (const secRole of user.additionalRoles) {
      const secDef = ROLE_DEFINITIONS[secRole];
      if (secDef && secDef.defaultPermissions.includes(permission)) {
        return true;
      }
    }
  }

  // Check custom user granted permissions
  if (user.permissions && user.permissions.includes(permission)) {
    return true;
  }

  return false;
}

/**
  * Map navigation tabs to required permissions for RBAC Protection
  */
export const TAB_REQUIRED_PERMISSIONS: Record<string, Permission[]> = {
  landing: [], // Public
  clipping: ['campaigns:browse'],
  creators: ['campaigns:browse'],
  ugc: ['ugc_portfolio:create', 'ugc_campaigns:apply', 'brand:hire_creators'],
  freelance: ['freelance:sell_services', 'brand:hire_freelancers'],
  influencers: ['social:connect', 'brand:hire_influencers'],
  'ai-tools': ['campaigns:browse'],
  wallet: ['wallet:view'],
  messages: ['chat:send', 'chat:creators', 'chat:brands'],
  analytics: ['analytics:view'],
  academy: [], // Public learning
  community: [], // Public lounge
  admin: ['admin:full_access', 'admin:manage_users'],
  agency: ['agency:manage_teams']
};

/**
  * Checks whether the current user with activeRole can access a specific tab
  */
export function canAccessTab(
  tabId: string,
  user: UserProfile,
  activeRole?: UserRole
): boolean {
  if (!user) return false;
  
  const currentRole = activeRole || user.activeRole || user.role;

  // Admins can access everything
  if ((currentRole as string) === 'admin' || (user.role as string) === 'admin') {
    return true;
  }

  // Admin Tab strict check
  if (tabId === 'admin') {
    return (currentRole as string) === 'admin' || (user.role as string) === 'admin';
  }

  // Agency Tab strict check
  if (tabId === 'agency') {
    return currentRole === 'agency' || (user.additionalRoles || []).includes('agency');
  }

  const requiredPerms = TAB_REQUIRED_PERMISSIONS[tabId];
  if (!requiredPerms || requiredPerms.length === 0) {
    return true; // Public tab
  }

  // If user has AT LEAST ONE of the required permissions for the tab, grant access
  return requiredPerms.some(perm => hasPermission(user, perm, currentRole));
}

/**
  * Supabase Row Level Security SQL Generator Script
  */
export const SUPABASE_RLS_SQL_SCRIPT = `-- ===============================================================
-- CLIPKENYA SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- Generated for PostgreSQL / Supabase Database Security
-- ===============================================================

-- 1. PROFILES TABLE RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Admins have full profile management" 
ON public.profiles FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 2. CAMPAIGNS & BOUNTIES RLS
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active campaigns are viewable by all authenticated users" 
ON public.campaigns FOR SELECT 
USING (status = 'active' OR auth.uid() = brand_id);

CREATE POLICY "Brands, Creators and Agencies can insert campaigns" 
ON public.campaigns FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('brand', 'creator', 'agency', 'admin')
  )
);

CREATE POLICY "Campaign owners and Admins can update campaign details" 
ON public.campaigns FOR UPDATE 
USING (
  brand_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. CLIP SUBMISSIONS RLS
ALTER TABLE public.clip_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Editors can view their own submissions; Hosts can view submissions to their bounties" 
ON public.clip_submissions FOR SELECT 
USING (
  editor_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.clip_bounties 
    WHERE id = bounty_id AND host_id = auth.uid()
  ) OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Clippers can submit clips" 
ON public.clip_submissions FOR INSERT 
WITH CHECK (
  auth.uid() = editor_id AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('editor', 'creator', 'admin')
  )
);

CREATE POLICY "Clippers can edit/delete pending submissions" 
ON public.clip_submissions FOR UPDATE 
USING (
  (auth.uid() = editor_id AND status = 'pending') OR
  EXISTS (
    SELECT 1 FROM public.clip_bounties 
    WHERE id = bounty_id AND host_id = auth.uid()
  ) OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 4. TRANSACTIONS & WALLET ESCROW RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view their own financial transactions" 
ON public.transactions FOR SELECT 
USING (
  user_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. AUDIT LOGS & IMPERSONATION LOGS (ADMIN ONLY)
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins only access audit logs" 
ON public.audit_logs FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
`;
