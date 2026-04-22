-- SQL to create schemas for all Beast orchestras
-- Run this in Supabase SQL Editor

-- Create schemas for each Beast orchestra
CREATE SCHEMA IF NOT EXISTS directory;
CREATE SCHEMA IF NOT EXISTS social;
CREATE SCHEMA IF NOT EXISTS kidscan;
CREATE SCHEMA IF NOT EXISTS appfactory;
CREATE SCHEMA IF NOT EXISTS affiliate;
CREATE SCHEMA IF NOT EXISTS nudge;

-- Directory Beast tables
CREATE TABLE IF NOT EXISTS directory.businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  location TEXT,
  family_friendly_score INTEGER CHECK (family_friendly_score >= 1 AND family_friendly_score <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social Beast tables
CREATE TABLE IF NOT EXISTS social.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  platform TEXT,
  scheduled_time TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- KidScan Beast tables
CREATE TABLE IF NOT EXISTS kidscan.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  barcode TEXT,
  ingredients JSONB,
  age_group TEXT,
  safety_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AppFactory Beast tables
CREATE TABLE IF NOT EXISTS appfactory.habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  frequency TEXT,
  streak_days INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Affiliate Beast tables
CREATE TABLE IF NOT EXISTS affiliate.commissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant TEXT NOT NULL,
  amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Nudge Beast tables
CREATE TABLE IF NOT EXISTS nudge.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  assigned_to TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_directory_businesses_category ON directory.businesses(category);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON social.posts(status);
CREATE INDEX IF NOT EXISTS idx_kidscan_products_age_group ON kidscan.products(age_group);
CREATE INDEX IF NOT EXISTS idx_appfactory_habits_streak ON appfactory.habits(streak_days);
CREATE INDEX IF NOT EXISTS idx_affiliate_commissions_status ON affiliate.commissions(status);
CREATE INDEX IF NOT EXISTS idx_nudge_tasks_status ON nudge.tasks(status);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE directory.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE social.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE kidscan.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE appfactory.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE nudge.tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed)
CREATE POLICY "Allow public read access" ON directory.businesses FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON social.posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON kidscan.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON appfactory.habits FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON affiliate.commissions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON nudge.tasks FOR SELECT USING (true);

-- Create update timestamp triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_directory_businesses_updated_at BEFORE UPDATE ON directory.businesses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Output success message
SELECT '✅ All Beast orchestra schemas and tables created successfully!' as message;