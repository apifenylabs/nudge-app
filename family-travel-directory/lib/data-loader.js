// Data loader for family travel directory
const fs = require('fs');
const path = require('path');

function loadAllActivities() {
  const dataDir = path.join(process.cwd(), 'data');
  const activities = [];
  
  // Load Tokyo data
  try {
    const tokyoData = JSON.parse(fs.readFileSync(path.join(dataDir, 'tokyo-family-activities.json'), 'utf8'));
    tokyoData.activities.forEach(activity => {
      activities.push({
        ...activity,
        city: 'Tokyo',
        country: 'Japan'
      });
    });
  } catch (error) {
    console.error('Error loading Tokyo data:', error);
  }
  
  // Load Bangkok data
  try {
    const bangkokData = JSON.parse(fs.readFileSync(path.join(dataDir, 'bangkok-family-activities.json'), 'utf8'));
    bangkokData.activities.forEach(activity => {
      activities.push({
        ...activity,
        city: 'Bangkok',
        country: 'Thailand'
      });
    });
  } catch (error) {
    console.error('Error loading Bangkok data:', error);
  }
  
  // Load Singapore data
  try {
    const singaporeData = JSON.parse(fs.readFileSync(path.join(dataDir, 'singapore-family-activities.json'), 'utf8'));
    singaporeData.activities.forEach(activity => {
      activities.push({
        ...activity,
        city: 'Singapore',
        country: 'Singapore'
      });
    });
  } catch (error) {
    console.error('Error loading Singapore data:', error);
  }
  
  return activities;
}

function getStats() {
  const activities = loadAllActivities();
  
  const stats = {
    totalActivities: activities.length,
    cities: {},
    categories: {},
    totalCommission: 0
  };
  
  activities.forEach(activity => {
    // Count by city
    stats.cities[activity.city] = (stats.cities[activity.city] || 0) + 1;
    
    // Count by category
    stats.categories[activity.category] = (stats.categories[activity.category] || 0) + 1;
    
    // Calculate average commission
    if (activity.commissionRate) {
      const commission = parseFloat(activity.commissionRate);
      if (!isNaN(commission)) {
        stats.totalCommission += commission;
      }
    }
  });
  
  stats.avgCommission = stats.totalActivities > 0 ? (stats.totalCommission / stats.totalActivities).toFixed(1) + '%' : '0%';
  
  return stats;
}

module.exports = {
  loadAllActivities,
  getStats
};