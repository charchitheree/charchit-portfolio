-- Add user_id column to feedback table
ALTER TABLE public.feedback ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback;
DROP POLICY IF EXISTS "Anyone can view feedback" ON public.feedback;

-- Create new RLS policies
-- Anyone can view all feedback (public wall)
CREATE POLICY "Anyone can view feedback"
ON public.feedback
FOR SELECT
USING (true);

-- Authenticated users can insert feedback with their user_id
CREATE POLICY "Authenticated users can submit feedback"
ON public.feedback
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own feedback
CREATE POLICY "Users can update own feedback"
ON public.feedback
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own feedback
CREATE POLICY "Users can delete own feedback"
ON public.feedback
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);