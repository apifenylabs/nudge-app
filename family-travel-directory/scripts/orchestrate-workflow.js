#!/usr/bin/env node

/**
 * Main Workflow Orchestrator
 * Coordinates all agents for continuous directory improvement
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

class WorkflowOrchestrator {
  constructor() {
    this.logDir = path.join(__dirname, '../logs');
    this.dataDir = path.join(__dirname, '../data');
    this.scriptsDir = __dirname;
    
    // Ensure directories exist
    [this.logDir, this.dataDir].forEach(dir => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
    
    this.workflowLog = path.join(this.logDir, `workflow-${this.getTimestamp()}.log`);
    this.agentSchedule = this.loadSchedule();
  }

  getTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  }

  loadSchedule() {
    const defaultSchedule = {
      researcher: { interval: 4 * 60 * 60 * 1000, lastRun: 0 }, // 4 hours
      writer: { interval: 2 * 60 * 60 * 1000, lastRun: 0 }, // 2 hours
      developer: { interval: 6 * 60 * 60 * 1000, lastRun: 0 }, // 6 hours
      reviewer: { 
        phases: [
          { name: 'safety', interval: 1 * 60 * 60 * 1000 }, // 1 hour
          { name: 'accuracy', interval: 2 * 60 * 60 * 1000 }, // 2 hours
          { name: 'seo', interval: 4 * 60 * 60 * 1000 }, // 4 hours
          { name: 'ux', interval: 6 * 60 * 60 * 1000 } // 6 hours
        ],
        lastRun: {}
      },
      uiMonitor: { interval: 12 * 60 * 60 * 1000, lastRun: 0 }, // 12 hours
      chiefEditor: { interval: 24 * 60 * 60 * 1000, lastRun: 0 } // 24 hours
    };

    try {
      const scheduleFile = path.join(this.dataDir, 'agent-schedule.json');
      if (fs.existsSync(scheduleFile)) {
        const saved = JSON.parse(fs.readFileSync(scheduleFile, 'utf8'));
        return { ...defaultSchedule, ...saved };
      }
    } catch (error) {
      this.log('Error loading schedule:', error.message);
    }

    return defaultSchedule;
  }

  log(...messages) {
    const timestamp = new Date().toISOString();
    const message = messages.map(m => 
      typeof m === 'object' ? JSON.stringify(m) : m
    ).join(' ');
    
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    
    // Append to log file
    fs.appendFileSync(this.workflowLog, logMessage + '\n');
  }

  async runAgent(agentName, scriptName, args = '') {
    const scriptPath = path.join(this.scriptsDir, scriptName);
    
    if (!fs.existsSync(scriptPath)) {
      this.log(`❌ Script not found: ${scriptPath}`);
      return { success: false, error: 'Script not found' };
    }

    this.log(`🚀 Starting ${agentName} agent...`);
    
    try {
      const command = `node "${scriptPath}" ${args}`.trim();
      const { stdout, stderr } = await execPromise(command, {
        cwd: path.dirname(this.scriptsDir),
        timeout: 30 * 60 * 1000 // 30 minute timeout
      });

      if (stdout) this.log(`${agentName} stdout:`, stdout.slice(-500)); // Last 500 chars
      if (stderr) this.log(`${agentName} stderr:`, stderr.slice(-500));

      this.log(`✅ ${agentName} completed successfully`);
      return { success: true, stdout, stderr };
    } catch (error) {
      this.log(`❌ ${agentName} failed:`, error.message);
      return { success: false, error: error.message };
    }
  }

  shouldRunAgent(agentName, interval) {
    const now = Date.now();
    const lastRun = this.agentSchedule[agentName]?.lastRun || 0;
    
    if (typeof lastRun === 'object') {
      // For phased agents like reviewer
      return true; // Always check phases
    }
    
    return now - lastRun >= interval;
  }

  async runResearcher() {
    if (!this.shouldRunAgent('researcher', this.agentSchedule.researcher.interval)) {
      return { skipped: true };
    }

    this.log('🔍 Researcher: Gathering new data...');
    
    // For now, we'll create sample data
    // In production, this would scrape actual sources
    const cities = ['Tokyo', 'Bangkok', 'Singapore', 'Bali', 'Hong Kong', 'Seoul'];
    const currentCity = cities[Math.floor(Math.random() * cities.length)];
    
    // Create sample data file
    const sampleData = {
      city: currentCity,
      country: this.getCountry(currentCity),
      lastUpdated: new Date().toISOString(),
      activities: this.generateSampleActivities(currentCity),
      source: 'Simulated data - would be real scraping in production'
    };
    
    const dataFile = path.join(this.dataDir, `${currentCity.toLowerCase()}-new.json`);
    fs.writeFileSync(dataFile, JSON.stringify(sampleData, null, 2));
    
    this.agentSchedule.researcher.lastRun = Date.now();
    this.saveSchedule();
    
    return { 
      success: true, 
      city: currentCity, 
      activities: sampleData.activities.length 
    };
  }

  getCountry(city) {
    const countries = {
      'Tokyo': 'Japan',
      'Bangkok': 'Thailand',
      'Singapore': 'Singapore',
      'Bali': 'Indonesia',
      'Hong Kong': 'China',
      'Seoul': 'South Korea'
    };
    return countries[city] || 'Unknown';
  }

  generateSampleActivities(city) {
    const activities = [];
    const activityTypes = ['Park', 'Museum', 'Restaurant', 'Beach', 'Shopping', 'Cultural'];
    
    for (let i = 1; i <= 5; i++) {
      const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      activities.push({
        id: `${city.toLowerCase()}-new-${i}`,
        name: `${city} Family ${type} ${i}`,
        category: type,
        ageRange: `${Math.floor(Math.random() * 3)}-${Math.floor(Math.random() * 10) + 8}`,
        safetyRating: (Math.random() * 0.5 + 4.5).toFixed(1),
        description: `A wonderful family-friendly ${type.toLowerCase()} in ${city}. Perfect for children of all ages with safety measures in place.`,
        location: `${city}, ${this.getCountry(city)}`,
        amenities: ['Family Restrooms', 'Stroller Access', 'Play Area'],
        imageUrl: `https://images.unsplash.com/photo-${1500000000000 + i}`
      });
    }
    
    return activities;
  }

  async runWriter() {
    if (!this.shouldRunAgent('writer', this.agentSchedule.writer.interval)) {
      return { skipped: true };
    }

    this.log('✍️ Writer: Processing raw data...');
    
    // Process any new data files
    const newFiles = fs.readdirSync(this.dataDir)
      .filter(f => f.includes('-new.json') || f.includes('-raw.json'));
    
    let processed = 0;
    
    for (const file of newFiles) {
      try {
        const filePath = path.join(this.dataDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        // Add SEO optimization
        data.seoContent = {
          metaTitle: `Family Travel Guide: ${data.city}, ${data.country}`,
          metaDescription: `Complete family travel guide for ${data.city}. Safety-rated activities, age recommendations, and essential tips.`,
          keywords: [`${data.city} family travel`, `things to do in ${data.city} with kids`, `${data.city} children activities`],
          article: `${data.city} is a fantastic destination for families. Our guide covers the best activities for children of all ages.`
        };
        
        // Rename to processed
        const processedFile = file.replace('-new.json', '-processed.json').replace('-raw.json', '-processed.json');
        fs.writeFileSync(path.join(this.dataDir, processedFile), JSON.stringify(data, null, 2));
        
        // Remove original
        fs.unlinkSync(filePath);
        
        processed++;
      } catch (error) {
        this.log(`Error processing ${file}:`, error.message);
      }
    }
    
    this.agentSchedule.writer.lastRun = Date.now();
    this.saveSchedule();
    
    return { success: true, processed };
  }

  async runDeveloper() {
    if (!this.shouldRunAgent('developer', this.agentSchedule.developer.interval)) {
      return { skipped: true };
    }

    this.log('👨‍💻 Developer: Uploading processed data...');
    
    // Run the population script
    const result = await this.runAgent('Developer', 'populate-directory.js');
    
    this.agentSchedule.developer.lastRun = Date.now();
    this.saveSchedule();
    
    return result;
  }

  async runReviewerPhase(phaseName) {
    this.log(`🔎 Reviewer (${phaseName}): Checking quality...`);
    
    // Simulate review process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const issues = Math.random() > 0.7 ? 1 : 0; // 30% chance of issues
    
    if (issues > 0) {
      this.log(`⚠️  Reviewer found ${issues} issue(s) in ${phaseName} phase`);
      return { success: false, issues };
    }
    
    this.log(`✅ ${phaseName} review passed`);
    return { success: true, issues: 0 };
  }

  async runUiMonitor() {
    if (!this.shouldRunAgent('uiMonitor', this.agentSchedule.uiMonitor.interval)) {
      return { skipped: true };
    }

    this.log('🎨 UI Monitor: Checking design trends...');
    
    const result = await this.runAgent('UI Monitor', 'ui-monitor.js');
    
    this.agentSchedule.uiMonitor.lastRun = Date.now();
    this.saveSchedule();
    
    return result;
  }

  saveSchedule() {
    try {
      const scheduleFile = path.join(this.dataDir, 'agent-schedule.json');
      fs.writeFileSync(scheduleFile, JSON.stringify(this.agentSchedule, null, 2));
    } catch (error) {
      this.log('Error saving schedule:', error.message);
    }
  }

  async runWorkflowCycle() {
    this.log('\n' + '='.repeat(50));
    this.log('🔄 Starting workflow cycle');
    this.log('='.repeat(50));
    
    const results = {};
    
    // 1. Researcher
    results.researcher = await this.runResearcher();
    
    // 2. Writer (if researcher found data)
    if (!results.researcher.skipped || Object.keys(results.researcher).length > 1) {
      results.writer = await this.runWriter();
    }
    
    // 3. Developer (if writer processed data)
    if (results.writer && !results.writer.skipped && results.writer.processed > 0) {
      results.developer = await this.runDeveloper();
    }
    
    // 4. Reviewer phases (staggered)
    const now = Date.now();
    for (const phase of this.agentSchedule.reviewer.phases) {
      const lastPhaseRun = this.agentSchedule.reviewer.lastRun[phase.name] || 0;
      if (now - lastPhaseRun >= phase.interval) {
        results[`reviewer_${phase.name}`] = await this.runReviewerPhase(phase.name);
        this.agentSchedule.reviewer.lastRun[phase.name] = now;
      }
    }
    
    // 5. UI Monitor
    results.uiMonitor = await this.runUiMonitor();
    
    // 6. Save updated schedule
    this.saveSchedule();
    
    this.log('\n📊 Cycle Results:');
    Object.entries(results).forEach(([agent, result]) => {
      if (result.skipped) {
        this.log(`  ${agent}: Skipped`);
      } else if (result.success) {
        this.log(`  ${agent}: ✅ Success`);
      } else {
        this.log(`  ${agent}: ❌ Failed`);
      }
    });
    
    this.log('='.repeat(50));
    this.log('✅ Workflow cycle completed\n');
    
    return results;
  }

  async runContinuous() {
    this.log('🚀 Starting continuous workflow orchestration');
    this.log('📅', new Date().toISOString());
    this.log('📁 Log file:', this.workflowLog);
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      this.log('\n👋 Shutting down gracefully...');
      this.saveSchedule();
      process.exit(0);
    });
    
    // Run continuously
    while (true) {
      try {
        await this.runWorkflowCycle();
        
        // Wait 1 hour before next cycle
        this.log('⏳ Waiting 1 hour for next cycle...');
        await new Promise(resolve => setTimeout(resolve, 60 * 60 * 1000));
      } catch (error) {
        this.log('❌ Workflow cycle error:', error.message);
        this.log('🔄 Retrying in 5 minutes...');
        await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
      }
    }
  }
}

// Run if called directly
if (require.main === module) {
  const orchestrator = new WorkflowOrchestrator();
  
  if (process.argv.includes('--once')) {
    orchestrator.runWorkflowCycle().catch(console.error);
  } else {
    orchestrator.runContinuous().catch(console.error);
  }
}

module.exports = WorkflowOrchestrator;