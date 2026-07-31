-- ====================================================================
-- CLIPFORGE SUPABASE SEED DATA
-- Realistic Sample Data for Kenyan Creators, Clippers, Brands & Marketplace
-- ====================================================================

-- 1. SEED PROFILES
-- Note: Replace these UUIDs with actual auth.users IDs in production
INSERT INTO public.profiles (
    id, role, primary_role, additional_roles, name, username, email, bio, 
    profile_photo, country, city, languages, skills, verification_status, rating, total_reviews, completed_jobs
) VALUES
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'creator', 'creator', ARRAY['editor', 'freelancer'], 'Maina Kamau', '@mainatreats', 'maina@clipforge.africa', 'Host of Kenya''s #1 Tech & Business Podcast. Looking for viral video clippers!', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', 'Kenya', 'Nairobi', ARRAY['Swahili', 'English'], ARRAY['Podcasting', 'Content Strategy', 'Public Speaking'], 'verified', 4.9, 38, 142),

('b2c3d4e5-f6a7-8901-2345-6789abcdef01', 'editor', 'editor', ARRAY['freelancer'], 'Achieng Ochieng', '@achieng_edits', 'achieng@clipforge.africa', 'Premiere Pro & CapCut Master. Specialized in CapCut animations and TikTok hooks.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', 'Kenya', 'Mombasa', ARRAY['English', 'Swahili'], ARRAY['CapCut', 'Premiere Pro', 'Motion Graphics'], 'verified', 5.0, 52, 94),

('c3d4e5f6-a7b8-9012-3456-789abcdef012', 'brand', 'brand', ARRAY['agency'], 'Safaricom Youth / MPESA', '@safaricom_ke', 'brand@safaricom.co.ke', 'Empowering Kenyan Youth & Digital Creators through M-Pesa Express payouts.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80', 'Kenya', 'Nairobi', ARRAY['English', 'Swahili'], ARRAY['Brand Strategy', 'Sponsorships'], 'verified', 4.8, 120, 310),

('d4e5f6a7-b8c9-0123-4567-89abcdef0123', 'ugc', 'ugc', ARRAY['influencer'], 'Njeri Wanjiku', '@njeri_vlogs', 'njeri@clipforge.africa', 'UGC creator specializing in lifestyle, beauty, and tech unboxings in Nairobi.', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80', 'Kenya', 'Nairobi', ARRAY['Swahili', 'English'], ARRAY['UGC Video', 'Beauty', 'Lifestyle'], 'verified', 4.9, 29, 45)
ON CONFLICT (id) DO NOTHING;


-- 2. SEED WALLETS
INSERT INTO public.wallets (user_id, balance, currency, total_earnings, pending_earnings) VALUES
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 125000.00, 'KES', 450000.00, 15000.00),
('b2c3d4e5-f6a7-8901-2345-6789abcdef01', 44900.00, 'KES', 182000.00, 8500.00),
('c3d4e5f6-a7b8-9012-3456-789abcdef012', 2500000.00, 'KES', 0.00, 0.00),
('d4e5f6a7-b8c9-0123-4567-89abcdef0123', 88000.00, 'KES', 210000.00, 12000.00)
ON CONFLICT (user_id) DO NOTHING;


-- 3. SEED CAMPAIGNS (BOUNTIES)
INSERT INTO public.campaigns (
    id, creator_id, title, description, category, budget, payment_per_clip, difficulty, status, visibility
) VALUES
('11111111-2222-3333-4444-555555555555', 'a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'Tech Talk Episode #42 - Future of AI in East Africa', 'Extract high-energy 30-60 second vertical clips with dynamic kinetic captions and sound effects.', 'Technology', 50000.00, 2500.00, 'Medium', 'active', 'public'),

('22222222-3333-4444-5555-666666666666', 'c3d4e5f6-a7b8-9012-3456-789abcdef012', 'M-Pesa Global Money Transfer Campaign', 'Create relatable 45s vertical reel explaining M-Pesa Global for diaspora sending money home.', 'Finance', 150000.00, 5000.00, 'Easy', 'active', 'public')
ON CONFLICT (id) DO NOTHING;


-- 4. SEED CAMPAIGN FILES
INSERT INTO public.campaign_files (campaign_id, video_url, thumbnail_url, file_size, file_type, duration) VALUES
('11111111-2222-3333-4444-555555555555', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80', 1048576000, 'video/mp4', '42:15'),
('22222222-3333-4444-5555-666666666666', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80', 850000000, 'video/mp4', '15:30')
ON CONFLICT (id) DO NOTHING;


-- 5. SEED CLIP SUBMISSIONS
INSERT INTO public.clip_submissions (
    id, campaign_id, clipper_id, video_url, notes, status
) VALUES
('33333333-4444-5555-6666-777777777777', '11111111-2222-3333-4444-555555555555', 'b2c3d4e5-f6a7-8901-2345-6789abcdef01', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'Added yellow captions and viral sound design at 00:15 hook.', 'approved')
ON CONFLICT (id) DO NOTHING;


-- 6. SEED APPROVALS & TRANSACTIONS
INSERT INTO public.approvals (submission_id, approved_by, feedback, payout_amount) VALUES
('33333333-4444-5555-6666-777777777777', 'a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'Incredible hook! Gained 45,000 TikTok views in 2 hours.', 2500.00)
ON CONFLICT (submission_id) DO NOTHING;

INSERT INTO public.transactions (wallet_id, user_id, type, amount, currency, status, description, mpesa_receipt) VALUES
((SELECT id FROM public.wallets WHERE user_id = 'b2c3d4e5-f6a7-8901-2345-6789abcdef01'), 'b2c3d4e5-f6a7-8901-2345-6789abcdef01', 'payout', 2500.00, 'KES', 'completed', 'Bounty Payout: Tech Talk #42 Approved Clip', 'QK892X0192A')
ON CONFLICT (id) DO NOTHING;


-- 7. SEED FREELANCE SERVICES
INSERT INTO public.services (
    seller_id, title, description, price, delivery_time, category, rating
) VALUES
('b2c3d4e5-f6a7-8901-2345-6789abcdef01', 'Pro CapCut & Premiere TikTok Reel Editing', 'I will edit 5 viral short clips with animated captions, emojis, sound effects and colour grading.', 3500.00, '1 day', 'Video Editing', 5.0)
ON CONFLICT (id) DO NOTHING;


-- 8. SEED LEADERBOARDS
INSERT INTO public.leaderboards (user_id, weekly_score, monthly_score, rank, earnings) VALUES
('b2c3d4e5-f6a7-8901-2345-6789abcdef01', 1450, 5800, 1, 45000.00)
ON CONFLICT (user_id) DO NOTHING;


-- 9. SEED COURSES & ACHIEVEMENTS
INSERT INTO public.courses (title, description, lessons) VALUES
('Viral Video Clipping Masterclass', 'Learn how to clip long-form podcasts into high-converting TikTok reels and YouTube shorts.', '[{"title": "Finding the Hook"}, {"title": "CapCut Kinetic Captions"}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.achievements (user_id, xp, level, streak) VALUES
('b2c3d4e5-f6a7-8901-2345-6789abcdef01', 3400, 7, 14)
ON CONFLICT (user_id) DO NOTHING;
