#!/usr/bin/env node

/**
 * Directory Population Script
 * Runs continuously to populate family travel directory
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Data directory
const DATA_DIR = path.join(__dirname, '../data');

class DirectoryPopulator {
  constructor() {
    this.stats = {
      totalAdded: 0,
      totalUpdated: 0,
      totalErrors: 0,
      lastRun: new Date().toISOString()
    };
  }

  async loadDataFiles() {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
    const allData = [];
    
    for (const file of files) {
      try {
        const filePath = path.join(DATA_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        allData.push(data);
        console.log(`✅ Loaded ${data.activities?.length || 0} activities from ${data.city}`);
      } catch (error) {
        console.error(`❌ Error loading ${file}:`, error.message);
      }
    }
    
    return allData;
  }

  async uploadActivity(activity, city) {
    try {
      // Check if activity already exists
      const { data: existing } = await supabase
        .from('businesses')
        .select('id')
        .eq('name', activity.name)
        .single();

      const activityData = {
        name: activity.name,
        description: activity.description,
        location: activity.location,
        age_range: activity.ageRange,
        safety_rating: activity.safetyRating,
        amenities: activity.amenities,
        category: activity.category,
        image_url: activity.imageUrl,
        city: city,
        country: activity.country || 'Japan',
        price_range: activity.priceRange || '$$',
        best_time: activity.bestTime || 'Anytime',
        popularity: activity.popularity || 80,
        safety_features: activity.safetyFeatures || [],
        seo_keywords: activity.seoKeywords || [],
        source: activity.source || 'Multiple Sources',
        last_updated: new Date().toISOString()
      };

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('businesses')
          .update(activityData)
          .eq('id', existing.id);

        if (error) throw error;
        console.log(`📝 Updated: ${activity.name}`);
        this.stats.totalUpdated++;
      } else {
        // Insert new
        const { error } = await supabase
          .from('businesses')
          .insert([activityData]);

        if (error) throw error;
        console.log(`✅ Added: ${activity.name}`);
        this.stats.totalAdded++;
      }

      return true;
    } catch (error) {
      console.error(`❌ Error with ${activity.name}:`, error.message);
      this.stats.totalErrors++;
      return false;
    }
  }

  async uploadSeoContent(seoData, city) {
    try {
      const seoContent = {
        city: city,
        meta_title: seoData.metaTitle,
        meta_description: seoData.metaDescription,
        keywords: seoData.keywords,
        article: seoData.article,
        family_tips: seoData.familyTips || [],
        safety_notes: seoData.safetyNotes || [],
        last_updated: new Date().toISOString()
      };

      const { error } = await supabase
        .from('seo_content')
        .upsert([seoContent], { onConflict: 'city' });

      if (error) throw error;
      console.log(`📊 SEO content updated for ${city}`);
      return true;
    } catch (error) {
      console.error(`❌ SEO error for ${city}:`, error.message);
      return false;
    }
  }

  async run() {
    console.log('🚀 Starting directory population...');
    console.log('📅', new Date().toISOString());
    
    const allData = await this.loadDataFiles();
    
    for (const cityData of allData) {
      console.log(`\n🌆 Processing ${cityData.city}, ${cityData.country}`);
      console.log(`📊 ${cityData.activities?.length || 0} activities found`);
      
      // Upload activities
      if (cityData.activities && Array.isArray(cityData.activities)) {
        for (const activity of cityData.activities) {
          await this.uploadActivity(activity, cityData.city);
          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      // Upload SEO content
      if (cityData.seoContent) {
        await this.uploadSeoContent(cityData.seoContent, cityData.city);
      }
    }
    
    // Save stats
    this.stats.lastRun = new Date().toISOString();
    this.saveStats();
    
    console.log('\n🎉 Population complete!');
    console.log('📈 Stats:', this.stats);
    
    return this.stats;
  }

  saveStats() {
    const statsPath = path.join(DATA_DIR, 'population-stats.json');
    const allStats = [];
    
    try {
      if (fs.existsSync(statsPath)) {
        const existing = fs.readFileSync(statsPath, 'utf8');
        allStats.push(...JSON.parse(existing));
      }
    } catch (error) {
      // Ignore, start fresh
    }
    
    allStats.push(this.stats);
    
    // Keep only last 100 runs
    const recentStats = allStats.slice(-100);
    
    fs.writeFileSync(statsPath, JSON.stringify(recentStats, null, 2));
    console.log('📊 Stats saved to', statsPath);
  }
}

// Run if called directly
if (require.main === module) {
  const populator = new DirectoryPopulator();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down gracefully...');
    populator.saveStats();
    process.exit(0);
  });
  
  populator.run().catch(console.error);
}

module.exports = DirectoryPopulator;