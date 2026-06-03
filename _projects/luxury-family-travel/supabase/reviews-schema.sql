-- Parent Reviews System for Directory Beast
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS destination_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_badge TEXT DEFAULT 'parent' CHECK (author_badge IN ('verified_parent', 'parent', 'visitor')),
  kids_ages TEXT[] DEFAULT '{}',

  -- Ratings (1-5 scale)
  overall_rating DECIMAL(2,1) NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  safety_rating DECIMAL(2,1) CHECK (safety_rating >= 1 AND safety_rating <= 5),
  fun_rating DECIMAL(2,1) CHECK (fun_rating >= 1 AND fun_rating <= 5),
  value_rating DECIMAL(2,1) CHECK (value_rating >= 1 AND value_rating <= 5),
  food_rating DECIMAL(2,1) CHECK (food_rating >= 1 AND food_rating <= 5),

  title TEXT NOT NULL,
  content TEXT NOT NULL,
  visit_date DATE,
  would_recommend BOOLEAN DEFAULT true,
  tips TEXT DEFAULT '',

  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_destination ON destination_reviews(destination_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON destination_reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON destination_reviews(created_at DESC);
