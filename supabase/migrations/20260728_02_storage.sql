-- ====================================================================
-- CLIPKENYA SUPABASE STORAGE BUCKET CONFIGURATION & POLICIES
-- ====================================================================

-- 1. Create Storage Buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('videos', 'videos', true, 5368709120, ARRAY['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']),
  ('submitted-clips', 'submitted-clips', true, 1073741824, ARRAY['video/mp4', 'video/quicktime', 'video/webm']),
  ('portfolio', 'portfolio', true, 524288000, ARRAY['video/mp4', 'image/jpeg', 'image/png', 'image/webp']),
  ('profile-images', 'profile-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('thumbnails', 'thumbnails', true, 20971520, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('attachments', 'attachments', true, 104857600, ARRAY['image/jpeg', 'image/png', 'application/pdf', 'video/mp4', 'application/zip']),
  ('ugc-videos', 'ugc-videos', true, 2147483648, ARRAY['video/mp4', 'video/quicktime', 'video/webm'])
ON CONFLICT (id) DO NOTHING;


-- 2. Storage RLS Policies
-- Allow public read access to all assets
CREATE POLICY "Public Read Storage" ON storage.objects
FOR SELECT USING (bucket_id IN ('videos', 'submitted-clips', 'portfolio', 'profile-images', 'thumbnails', 'attachments', 'ugc-videos'));

-- Allow authenticated users to upload files to their designated folder
CREATE POLICY "Authenticated Users Upload" ON storage.objects
FOR INSERT WITH CHECK (
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update & delete their own uploaded files
CREATE POLICY "Users Manage Own Files" ON storage.objects
FOR ALL USING (
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
