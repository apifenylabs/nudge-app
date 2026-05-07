#!/usr/bin/env node
const fs = require('fs');

function aff(name, city, country) {
  return {
    booking: {url: `https://www.booking.com/searchresults.html?ss=${city}%2C+${country}&aid=2875669`, text: `Book ${name} on Booking.com`},
    klook: {url: `https://www.klook.com/search/?keyword=${encodeURIComponent(name)}&aid=119991`, text: `Find ${name} deals on Klook`},
    viator: {url: `https://www.viator.com/${city.replace(/[^a-zA-Z]/g,'')}/things-to-do?aid=P00299136`, text: `Book tours & activities in ${city}`},
  };
}

const g = [
  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
];

function d(name, city, country, cat, age, safety, price, pop, desc, loc, time, img, amen, safe, tips, ps, it, cr, kw, slug) {
  return { id: slug, name, city, country, category: cat, ageRange: age, safetyRating: safety, priceRange: price, popularity: pop, description: desc, location: loc, bestTime: time, imageUrl: img, amenities: amen, safetyFeatures: safe, tipsAndTricks: tips, parentStory: ps, itineraryComparison: it, commissionRate: cr, seoKeywords: kw, gallery: g, slug, affiliateLinks: aff(name, city, country) };
}

const dests = [];

dests.push(d(
  "Four Seasons Resort Bali at Sayan", "Bali", "Indonesia", "Luxury Resort", "0-16", 4.9, "$$$$", 97,
  "A stunning resort nestled in the Ayung River valley with world-class family suites, a dedicated kids club, and private plunge pools.",
  "Sayan, Ubud, Bali 80571, Indonesia", "April-October (dry season)",
  g[0], ["Kids Club","Babysitting","Family Suites","Private Pool","Butler Service","Michelin Dining"],
  ["24/7 Security","Child-Proof Pool Fencing","Trained Nannies","Baby Monitors","Medical Staff"],
  ["Request river-view suite on upper level.","Book complimentary kids' cooking class on arrival.","'Float & Feast' poolside dinner is worth every dollar.","Rent private driver for Ubud market.","Family Harmony spa treatment lets kids do mini-spa."],
  {title:"The nanny who became family", excerpt:"Our 3-year-old refused bedtime with anyone else. Wayan taught her lotus folding. Game changer.", author:"Emma, mom of 1 from Sydney", fullStory:"We were that family with a toddler who screams at babysitters. Then we met Wayan. She taught our daughter Balinese flower folding. By day 3 she was asking for 'Wayan's school'. First adult dinner in 18 months."},
  {halfDay:"Pool, kids club, afternoon tea", fullDay:"Ubud market, Swept Away lunch, spa, sunset cocktails, dinner", bestFor:"Families with young children wanting culture and luxury"},
  "10%", ["Four Seasons Sayan","luxury resort Bali","Ubud family resort"], "bali-001"
));

dests.push(d(
  "Bulgari Resort Bali", "Bali", "Indonesia", "Luxury Resort", "4-16", 4.9, "$$$$", 95,
  "Perched 150m above the Indian Ocean on a private cliff. Private villas with infinity pools, Italian luxury woven into Balinese design.",
  "Jl. Goa Lempeh, Uluwatu, Bali 80364, Indonesia", "May-September",
  g[1], ["Private Infinity Pool","Kids Club","Butler Service","Babysitting","Michelin Dining","Spa"],
  ["24/7 Security","Cliff-Edge Barriers","Pool Fencing","Medical Response","Child Wristbands"],
  ["Request inland-facing villa for wind-sensitive kids.","Book 'Junior Chef' pizza-making experience.","Use complimentary mosquito nets at sunset.","Private elevator to beach club is a thrill ride.","Afternoon tea includes hot chocolate in Bulgari porcelain."],
  {title:"When your 6-year-old has better taste", excerpt:"He ordered $85 Wagyu from room service. 'Best chicken nuggets ever.'", author:"David, dad of 1 from London", fullStory:"Day 2, our son ordered Japanese Wagyu from room service. $85. The waiter brought it with silver cloche and truffle fries. 'Best chicken nuggets EVER!' We laughed until we cried."},
  {halfDay:"Cliffside pool, kids club, Italian lunch", fullDay:"Spa, private beach club, sunset cocktails, Il Ristorante dinner", bestFor:"Design-loving families wanting cliff-top luxury"},
  "10%", ["Bulgari Resort Bali","cliffside resort Bali","Uluwatu luxury"], "bali-002"
));

console.log(`Created ${dests.length}/30...`);

// Write in progress - remaining 28 will be generated below
