-- Create feedback table for anonymous/named feedback
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  display_name TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('general', 'best_part', 'suggestion', 'improvement')),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view all feedback (public feedback wall)
CREATE POLICY "Anyone can view feedback"
  ON public.feedback
  FOR SELECT
  USING (true);

-- Allow anyone to insert feedback (anonymous submissions allowed)
CREATE POLICY "Anyone can submit feedback"
  ON public.feedback
  FOR INSERT
  WITH CHECK (true);