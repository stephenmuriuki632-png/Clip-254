-- ====================================================================
-- CLIPKENYA SUPABASE DATABASE ARCHITECTURE & SCHEMAS
-- Production-grade PostgreSQL Schema with RLS, Triggers, Views & Indexes
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. CATEGORIES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(50),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Default Categories
INSERT INTO public.categories (name, slug, icon, description) VALUES
('Podcasts', 'podcasts', 'Mic', 'Long-form talk shows, interviews, and audio clips'),
('Gaming', 'gaming', 'Gamepad2', 'Game highlights, walkthroughs, and esports moments'),
('Business', 'business', 'Briefcase', 'Entrepreneurship, startup advice, and corporate insights'),
('Finance', 'finance', 'TrendingUp', 'Personal finance, investing, crypto, and M-Pesa business tips'),
('Education', 'education', 'GraduationCap', 'Tutorials, skill building, and explainer content'),
('Comedy', 'comedy', 'Smile', 'Skit videos, standup clips, and funny moments'),
('Technology', 'technology', 'Cpu', 'Software, gadgets, AI tools, and hardware reviews'),
('Fitness', 'fitness', 'Dumbbell', 'Workouts, nutrition advice, and athletic performance'),
('Entertainment', 'entertainment', 'Tv', 'Pop culture, music videos, and viral trends'),
('Motivation', 'motivation', 'Flame', 'Keynotes, speeches, and inspirational content'),
('Lifestyle', 'lifestyle', 'Compass', 'Vlogs, travel, food, and daily routines'),
('News', 'news', 'Newspaper', 'Current events, investigative reporting, and commentary'),
('Sports', 'sports', 'Trophy', 'Football, athletics, highlights, and sports commentary')
ON CONFLICT (slug) DO NOTHING;


-- --------------------------------------------------------------------
-- 2. PROFILES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'creator',
    primary_role VARCHAR(50) DEFAULT 'creator',
    additional_roles TEXT[] DEFAULT '{}',
    name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT,
    profile_photo TEXT,
    cover_photo TEXT,
    country VARCHAR(100) DEFAULT 'Kenya',
    city VARCHAR(100) DEFAULT 'Nairobi',
    languages TEXT[] DEFAULT '{"English", "Swahili"}',
    skills TEXT[] DEFAULT '{}',
    portfolio TEXT[] DEFAULT '{}',
    verification_status VARCHAR(50) DEFAULT 'unverified', -- 'unverified', 'pending', 'verified'
    rating NUMERIC(3,2) DEFAULT 5.00,
    total_reviews INT DEFAULT 0,
    completed_jobs INT DEFAULT 0,
    response_rate INT DEFAULT 98, -- percentage
    response_time VARCHAR(50) DEFAULT '< 1 hour',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 3. CAMPAIGNS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category VARCHAR(100),
    budget NUMERIC(12,2) NOT NULL DEFAULT 0.00, -- KES
    payment_per_clip NUMERIC(10,2) NOT NULL DEFAULT 0.00, -- KES
    difficulty VARCHAR(50) DEFAULT 'Medium', -- 'Easy', 'Medium', 'Hard'
    status VARCHAR(50) DEFAULT 'active', -- 'draft', 'active', 'completed', 'paused'
    deadline TIMESTAMPTZ,
    visibility VARCHAR(50) DEFAULT 'public', -- 'public', 'private', 'invite_only'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 4. CAMPAIGN_FILES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.campaign_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    attachments TEXT[] DEFAULT '{}',
    file_size BIGINT DEFAULT 0, -- bytes
    file_type VARCHAR(100) DEFAULT 'video/mp4',
    duration VARCHAR(50), -- e.g. "45:12"
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 5. CLIP_SUBMISSIONS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.clip_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
    clipper_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    video_url TEXT NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'draft', 'pending', 'approved', 'rejected'
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 6. APPROVALS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID UNIQUE NOT NULL REFERENCES public.clip_submissions(id) ON DELETE CASCADE,
    approved_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    feedback TEXT,
    payout_amount NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    approved_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 7. WALLETS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    balance NUMERIC(12,2) NOT NULL DEFAULT 0.00, -- KES
    currency VARCHAR(10) NOT NULL DEFAULT 'KES',
    total_earnings NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    pending_earnings NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 8. TRANSACTIONS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID NOT NULL REFERENCES public.wallets(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'payout', 'withdrawal', 'escrow_lock', 'escrow_release', 'deposit'
    amount NUMERIC(12,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'KES',
    status VARCHAR(50) DEFAULT 'completed', -- 'pending', 'completed', 'failed'
    description TEXT,
    mpesa_receipt VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 9. WITHDRAWALS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.withdrawals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(12,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'KES',
    payment_method VARCHAR(50) DEFAULT 'M-PESA', -- 'M-PESA', 'Bank', 'PayPal'
    account_number VARCHAR(100) NOT NULL, -- e.g. M-Pesa phone number
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'completed'
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 10. CONVERSATIONS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participants UUID[] NOT NULL,
    last_message TEXT,
    last_activity TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 11. MESSAGES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    attachments TEXT[] DEFAULT '{}',
    read_status BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 12. NOTIFICATIONS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'system', -- 'submission', 'payout', 'message', 'campaign'
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 13. REVIEWS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating NUMERIC(2,1) NOT NULL CHECK (rating >= 1.0 AND rating <= 5.0),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 14. UGC_CAMPAIGNS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ugc_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    deliverables TEXT[] DEFAULT '{}',
    budget NUMERIC(12,2) NOT NULL,
    deadline TIMESTAMPTZ,
    status VARCHAR(50) DEFAULT 'active', -- 'draft', 'active', 'completed'
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 15. UGC_SUBMISSIONS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ugc_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ugc_campaign_id UUID NOT NULL REFERENCES public.ugc_campaigns(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    video_url TEXT NOT NULL,
    notes TEXT,
    approval_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 16. SERVICES (FREELANCE MARKETPLACE) TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL, -- KES
    delivery_time VARCHAR(50) DEFAULT '2 days',
    category VARCHAR(100) NOT NULL,
    rating NUMERIC(2,1) DEFAULT 5.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 17. ORDERS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'in_progress', -- 'pending', 'in_progress', 'delivered', 'completed', 'cancelled'
    price NUMERIC(10,2) NOT NULL,
    delivery_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 18. PORTFOLIOS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    videos TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    social_links JSONB DEFAULT '{}'::jsonb, -- e.g. {"youtube": "...", "tiktok": "..."}
    featured_work JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 19. LEADERBOARDS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leaderboards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    weekly_score INT DEFAULT 0,
    monthly_score INT DEFAULT 0,
    rank INT DEFAULT 999,
    earnings NUMERIC(12,2) DEFAULT 0.00,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 20. REPORTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'investigating', 'resolved', 'dismissed'
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 21. AUDIT_LOGS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    target_table VARCHAR(100),
    record_id UUID,
    details JSONB DEFAULT '{}'::jsonb,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 22. REFERRALS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    invited_user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL,
    reward NUMERIC(10,2) DEFAULT 500.00, -- KES
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid'
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 23. BADGES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    badge_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100)
);

INSERT INTO public.badges (badge_name, description, icon) VALUES
('Verified Creator', 'Top verified content creator with active video bounties', 'ShieldCheck'),
('Top Clipper', 'Elite video clipper with 50+ approved viral edits', 'Scissors'),
('Speedy Editor', 'Delivers approved clips in under 12 hours', 'Zap'),
('M-Pesa Express', 'Automated instant wallet payout enabled user', 'Wallet')
ON CONFLICT (badge_name) DO NOTHING;


-- --------------------------------------------------------------------
-- 24. USER_BADGES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
    awarded_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);


-- --------------------------------------------------------------------
-- 25. COURSES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    lessons JSONB DEFAULT '[]'::jsonb,
    instructor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 26. COURSE_PROGRESS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.course_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    completion_percentage INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);


-- --------------------------------------------------------------------
-- 27. ACHIEVEMENTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    xp INT DEFAULT 0,
    level INT DEFAULT 1,
    streak INT DEFAULT 0,
    rewards JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 28. AI_GENERATIONS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_generations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    tool_used VARCHAR(100) NOT NULL,
    prompt TEXT NOT NULL,
    result TEXT NOT NULL,
    credits_used INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ====================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_campaigns_creator ON public.campaigns(creator_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON public.campaigns(status);
CREATE INDEX IF NOT EXISTS idx_submissions_campaign ON public.clip_submissions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_submissions_clipper ON public.clip_submissions(clipper_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, read);


-- ====================================================================
-- AUTOMATIC TIMESTAMPTZ TRIGGERS
-- ====================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_campaigns_updated BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_submissions_updated BEFORE UPDATE ON public.clip_submissions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_wallets_updated BEFORE UPDATE ON public.wallets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();


-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clip_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ugc_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ugc_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generations ENABLE ROW LEVEL SECURITY;

-- Public read permissions
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public campaigns viewable" ON public.campaigns FOR SELECT USING (true);
CREATE POLICY "Public campaign files viewable" ON public.campaign_files FOR SELECT USING (true);
CREATE POLICY "Services viewable" ON public.services FOR SELECT USING (true);
CREATE POLICY "Leaderboards viewable" ON public.leaderboards FOR SELECT USING (true);
CREATE POLICY "Courses viewable" ON public.courses FOR SELECT USING (true);

-- User self policies
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users view own wallet" ON public.wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
