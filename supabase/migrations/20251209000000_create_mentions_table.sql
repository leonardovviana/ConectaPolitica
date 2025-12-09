-- Create mentions table
CREATE TABLE public.mentions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('news', 'social', 'video', 'blog', 'other')),
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sentiment TEXT NOT NULL CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low', 'urgent')),
  excerpt TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mentions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mentions
CREATE POLICY "Users can view their own mentions" 
ON public.mentions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mentions" 
ON public.mentions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mentions" 
ON public.mentions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mentions" 
ON public.mentions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_mentions_updated_at
  BEFORE UPDATE ON public.mentions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
