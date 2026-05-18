-- EV Charging Asia Reviews Schema
-- Run in Supabase SQL editor

CREATE TABLE IF NOT EXISTS station_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  station_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_badge TEXT DEFAULT 'visitor' CHECK (author_badge IN ('verified_owner', 'ev_driver', 'visitor')),
  ev_model TEXT DEFAULT '',

  overall_rating DECIMAL(2,1) NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  reliability_rating DECIMAL(2,1) CHECK (reliability_rating >= 1 AND reliability_rating <= 5),
  speed_rating DECIMAL(2,1) CHECK (speed_rating >= 1 AND speed_rating <= 5),
  location_rating DECIMAL(2,1) CHECK (location_rating >= 1 AND location_rating <= 5),

  title TEXT NOT NULL,
  content TEXT NOT NULL,
  visit_date DATE,
  would_recommend BOOLEAN DEFAULT true,
  tips TEXT DEFAULT '',

  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_station ON station_reviews(station_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON station_reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON station_reviews(created_at DESC);
