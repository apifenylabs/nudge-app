const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'data', 'blog');

const files = [
  {
    file: 'singapore-with-kids-complete-guide-2026.json',
    tips: `\n\n## 👨‍👩‍👧‍👦 Family Travel Tips\n\n**[Booking.com](https://booking.com) tip:** Book a hotel near MRT stations for easy stroller access — Singapore's public transport is top-tier for families!\n\n**[Klook](https://klook.com) tip:** Pre-book Universal Studios and S.E.A. Aquarium tickets to skip the long queues — worth it with tired toddlers.\n\n**[Agoda](https://agoda.com) tip:** Filter by "family rooms" and check reviews mentioning Changi Airport playground — parents say it's a lifesaver on arrival day.`
  },
  {
    file: 'tokyo-with-kids-top-10-family-attractions.json',
    tips: `\n\n## 👨‍👩‍👧‍👦 Family Travel Tips\n\n**[Booking.com](https://booking.com) tip:** Book a hotel in Shinjuku or Ueno for easy access to major attractions — they're also packed with family-friendly restaurants.\n\n**[Klook](https://klook.com) tip:** Pre-book tickets for teamLab Borderless and the Ghibli Museum — both sell out fast and booking ahead saves hours of queuing.\n\n**[Agoda](https://agoda.com) tip:** Filter by "family rooms" and check reviews mentioning proximity to Pokemon Centers — the ones in Shibuya and Tokyo Station are a huge hit with kids.`
  },
  {
    file: 'budget-family-activities-bangkok.json',
    tips: `\n\n## 👨‍👩‍👧‍👦 Family Travel Tips\n\n**[Booking.com](https://booking.com) tip:** Book a hotel with a pool in Sukhumvit or Riverside — essential for afternoon breaks when the Bangkok heat gets intense.\n\n**[Klook](https://klook.com) tip:** Pre-book floating market tours and Safari World tickets — you'll skip the touts and get better prices than at the gate.\n\n**[Agoda](https://agoda.com) tip:** Filter by "family rooms" and check reviews from parents — many recommend hotels near BTS Skytrain stations for easy city exploration.`
  },
  {
    file: 'hong-kong-with-kids-3-day-itinerary.json',
    tips: `\n\n## 👨‍👩‍👧‍👦 Family Travel Tips\n\n**[Booking.com](https://booking.com) tip:** Book a hotel in Tsim Sha Tsui or Causeway Bay for stunning harbour views and walking distance to Star Ferry — plans change with kids, so free cancellation is a must!\n\n**[Klook](https://klook.com) tip:** Pre-book Disneyland and Peak Tram tickets — skip the long queues that can hit 60+ minutes during school holidays.\n\n**[Agoda](https://agoda.com) tip:** Filter by "family rooms" and check reviews mentioning Ngong Ping 360 cable car access — it's a short MTR ride from central Hong Kong.`
  },
  {
    file: 'best-asian-airlines-families-2026.json',
    tips: `\n\n## 👨‍👩‍👧‍👦 Family Travel Tips\n\n**[Booking.com](https://booking.com) tip:** Book a hotel near the airport for late arrivals — free cancellation means you can switch plans if flights get delayed.\n\n**[Klook](https://klook.com) tip:** Pre-book airport lounge access and fast-track immigration passes — worth every cent when navigating terminals with tired kids and carry-on bags.\n\n**[Agoda](https://agoda.com) tip:** Filter by "family rooms" and check reviews from other parents — hotels with early check-in options are gold after red-eye flights.`
  }
];

let successCount = 0;
let errorCount = 0;

for (const entry of files) {
  const filePath = path.join(BLOG_DIR, entry.file);
  
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    
    // Check if tips section already exists
    if (raw.includes('## 👨‍👩‍👧‍👦 Family Travel Tips')) {
      console.log(`⚠️  SKIPPED: ${entry.file} — tips section already exists`);
      continue;
    }

    // Parse JSON to work with structured content
    const data = JSON.parse(raw);
    
    // Append tips to content field
    data.content = data.content + entry.tips;
    
    // Write back with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    
    console.log(`✅ UPDATED: ${entry.file}`);
    successCount++;
  } catch (err) {
    console.error(`❌ ERROR: ${entry.file} — ${err.message}`);
    errorCount++;
  }
}

console.log(`\n📊 Summary: ${successCount} updated, ${errorCount} errors`);
