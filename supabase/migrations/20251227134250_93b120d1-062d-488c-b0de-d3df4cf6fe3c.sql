-- Drop RLS policies that depend on user_id first
DROP POLICY IF EXISTS "Authenticated users can submit feedback" ON public.feedback;
DROP POLICY IF EXISTS "Users can update own feedback" ON public.feedback;
DROP POLICY IF EXISTS "Users can delete own feedback" ON public.feedback;
DROP POLICY IF EXISTS "Anyone can view feedback" ON public.feedback;

-- Now drop the user_id column
ALTER TABLE public.feedback DROP COLUMN IF EXISTS user_id;

-- Recreate simple public policies
CREATE POLICY "Anyone can view feedback"
ON public.feedback
FOR SELECT
USING (true);

CREATE POLICY "Anyone can submit feedback"
ON public.feedback
FOR INSERT
WITH CHECK (true);