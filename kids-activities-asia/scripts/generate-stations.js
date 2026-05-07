#!/usr/bin/env node
/**
 * Generate realistic synthetic EV station data for 6 Asian countries.
 * Run: node scripts/generate-stations.js
 * Output: data/stations.json
 */

const fs = require('fs');
const path = require('path');

// City coordinates (real)
const CITY_COORDS = {
  // Thailand
  'Bangkok': [13.7563, 100.5018],
  'Phuket': [7.8804, 98.3923],
  'Pattaya': [12.9236, 100.8825],
  'Chiang Mai': [18.7883, 98.9853],
  'Chiang Rai': [19.9072, 99.8321],
  'Hat Yai': [7.0086, 100.4747],
  'Khon Kaen': [16.4419, 102.8360],
  'Krabi': [8.0863, 98.9063],
  'Koh Samui': [9.5120, 100.0136],
  'Rayong': [12.6814, 101.2817],
  'Surat Thani': [9.1382, 99.3214],
  // India
  'Delhi': [28.6139, 77.2090],
  'Mumbai': [19.0760, 72.8777],
  'Bangalore': [12.9716, 77.5946],
  'Hyderabad': [17.3850, 78.4867],
  'Chennai': [13.0827, 80.2707],
  'Pune': [18.5204, 73.8567],
  'Ahmedabad': [23.0225, 72.5714],
  'Kolkata': [22.5726, 88.3639],
  'Jaipur': [26.9124, 75.7873],
  'Lucknow': [26.8467, 80.9462],
  'Chandigarh': [30.7333, 76.7794],
  'Kochi': [9.9312, 76.2673],
  // Indonesia
  'Jakarta': [-6.2088, 106.8456],
  'Surabaya': [-7.2504, 112.7688],
  'Bandung': [-6.9175, 107.6191],
  'Denpasar': [-8.6500, 115.2167],
  'Medan': [3.5952, 98.6722],
  'Makassar': [-5.1477, 119.4322],
  'Yogyakarta': [-7.7956, 110.3695],
  'Semarang': [-6.9667, 110.4167],
  'Batam': [1.1167, 104.0333],
  'Mataram': [-8.5833, 116.1167],
  // Malaysia
  'Kuala Lumpur': [3.1390, 101.6869],
  'Johor Bahru': [1.4927, 103.7414],
  'Penang': [5.4164, 100.3327],
  'Ipoh': [4.5975, 101.0901],
  'Kota Kinabalu': [5.9804, 116.0735],
  'Kuching': [1.5533, 110.3592],
  'Melaka': [2.1896, 102.2501],
  'Kuantan': [3.8077, 103.3260],
  'Malacca City': [2.1896, 102.2501],
  // Singapore
  'Central': [1.2819, 103.8357],
  'Orchard': [1.3039, 103.8317],
  'Marina Bay': [1.2833, 103.8588],
  'Changi': [1.3644, 103.9915],
  'Jurong': [1.3267, 103.7091],
  'Woodlands': [1.4375, 103.7847],
  'Tampines': [1.3515, 103.9416],
  'Punggol': [1.4057, 103.9022],
  'Sentosa': [1.2494, 103.8303],
  // Japan
  'Tokyo': [35.6762, 139.6503],
  'Osaka': [34.6937, 135.5023],
  'Kyoto': [35.0116, 135.7681],
  'Yokohama': [35.4437, 139.6380],
  'Nagoya': [35.1814, 136.9064],
  'Fukuoka': [33.5902, 130.4017],
  'Sapporo': [43.0618, 141.3545],
  'Kobe': [34.6901, 135.1955],
  'Naha': [26.2124, 127.6809],
  'Hiroshima': [34.3853, 132.4553],
};

// Street suffixes per country
const STREET_SUFFIXES = {
  Thailand: ['Sukhumvit Soi', 'Silom Rd', 'Ratchadamri Rd', 'Phra Athit Rd', 'Sathorn Rd', 'Wireless Rd', 'Ploenchit Rd', 'Rama I Rd', 'Rama IV Rd', 'Charoen Krung Rd', 'Samsen Rd', 'Khao San Rd', 'Suthep Rd', 'Huay Kaew Rd'],
  India: ['MG Road', 'Brigade Rd', 'Residency Rd', 'MG Marg', 'Connaught Place', 'Juhu Tara Rd', 'Linking Rd', 'Bannerghatta Rd', 'Sarjapur Rd', 'Marathahalli Bridge', 'Hitech City Rd', 'Gachibowli Rd', 'Anna Salai', 'Mount Rd', 'MG Rd', 'FC Rd'],
  Indonesia: ['Jl. Sudirman', 'Jl. Thamrin', 'Jl. Gatot Subroto', 'Jl. Rasuna Said', 'Jl. Gajah Mada', 'Jl. Diponegoro', 'Jl. Ahmad Yani', 'Jl. Pahlawan', 'Jl. Sumatera', 'Jl. Jawa'],
  Malaysia: ['Jalan Ampang', 'Jalan Bukit Bintang', 'Jalan Sultan Ismail', 'Jalan Tun Razak', 'Jalan Pudu', 'Persiaran KLCC', 'Lebuhraya Duke', 'Jalan Ipoh', 'Jalan Gasing', 'Persiaran Greenhill'],
  Singapore: ['Orchard Rd', 'Marina Blvd', 'Temasek Ave', 'Raffles Blvd', 'Shenton Way', 'Robinson Rd', 'Cecil St', 'North Bridge Rd', 'Esplanade Dr', 'Bukit Timah Rd'],
  Japan: ['Chuo-dori', 'Meiji-dori', 'Sotobori-dori', 'Harumi-dori', 'Yasukuni-dori', 'Aoyama-dori', 'Omotesando', 'Midōsuji', 'Kawaramachi-dori', 'Higashiyama-dori'],
};

// Operators per country
const OPERATORS = {
  Thailand: ['EA Anyonde', 'PEA Volta', 'MG Charge', 'Tesla Supercharger', 'Charge+', 'Haup', 'MEA EV'],
  India: ['Tata Power', 'ChargeZone', 'Zeon', 'Tesla Supercharger', 'Ather Grid', 'EESL', 'Fortum', 'Delta'],
  Indonesia: ['PLN', 'SPKLU', 'Tesla Supercharger', 'Ion', 'Casion', 'Go-Ion'],
  Malaysia: ['Gentari EV', 'JomCharge', 'Tesla Supercharger', 'ChargeSini', 'EV Connection'],
  Singapore: ['SP Group', 'Shell Recharge', 'Tesla Supercharger', 'Blue Charge', 'Charge+ (ChargeTronix)'],
  Japan: ['TEPCO', 'CHAdeMO Association', 'Tesla Supercharger', 'e-Mobility Power', 'Nissan', 'Toyota'],
};

// Common charger type distributions per country
const CHARGER_PROFILES = {
  Thailand: { types: ['CCS2', 'CCS2', 'CCS2', 'CHAdeMO', 'Type 2', 'GB/T'], weights: [0.5, 0.2, 0.15, 0.1, 0.05] },
  India: { types: ['CCS2', 'CCS2', 'CCS2', 'CHAdeMO', 'Type 2', 'GB/T'], weights: [0.55, 0.2, 0.15, 0.05, 0.05] },
  Indonesia: { types: ['CCS2', 'CHAdeMO', 'CCS2', 'Type 2', 'GB/T'], weights: [0.5, 0.25, 0.15, 0.05, 0.05] },
  Malaysia: { types: ['CCS2', 'CCS2', 'CHAdeMO', 'Type 2', 'NACS'], weights: [0.45, 0.25, 0.2, 0.05, 0.05] },
  Singapore: { types: ['CCS2', 'CCS2', 'CHAdeMO', 'Type 2', 'NACS'], weights: [0.5, 0.2, 0.2, 0.05, 0.05] },
  Japan: { types: ['CHAdeMO', 'CCS2', 'CHAdeMO', 'Type 2', 'NACS'], weights: [0.4, 0.3, 0.15, 0.1, 0.05] },
};

// Payment methods
const PAYMENT_METHODS = ['App', 'RFID', 'CC', 'QR', 'Cash', 'Membership'];

// SEO keywords per country
const SEO_KEYWORDS = {
  Thailand: ['Thailand EV charging', 'Bangkok EV charger', 'Thailand EV station', 'CCS2 Thailand', 'EV Thailand', 'EV charger Bangkok'],
  India: ['India EV charging', 'Delhi EV charger', 'India EV station', 'CCS2 India', 'EV India', 'EV charger Delhi'],
  Indonesia: ['Indonesia EV charging', 'Jakarta EV charger', 'Indonesia EV station', 'EV Indonesia', 'SPKLU station', 'PLN charging'],
  Malaysia: ['Malaysia EV charging', 'KL EV charger', 'Malaysia EV station', 'CCS2 Malaysia', 'JomCharge', 'Gentari EV'],
  Singapore: ['Singapore EV charging', 'Singapore EV charger', 'EV station Singapore', 'SP Group charging', 'Shell Recharge SG'],
  Japan: ['Japan EV charging', 'Tokyo EV charger', 'Japan CHAdeMO', 'EV Japan', 'CHAdeMO station', 'Tesla Supercharger Japan'],
};

// Famous place names for station naming
const PLACE_NAMES = {
  Thailand: ['CentralWorld', 'Siam Paragon', 'ICONSIAM', 'EmQuartier', 'Terminal 21', 'MBK Center', 'Central Festival', 'Big C', 'Lotus', 'INDEX Living Mall', 'The Mall', 'Future Park', 'CentralPlaza', 'Robinson', 'Makro', 'HomePro', 'Power Buy', 'Bangkok Hospital', 'Samitivej', 'Bumrungrad'],
  India: ['Select CITYWALK', 'DLF Emporio', 'Phoenix Marketcity', 'Forum Mall', 'VR Bengaluru', 'UB City', 'Inorbit Mall', 'HiTech City', 'Gachibowli', 'HITEX', 'Mantri Square', 'Orion Mall', 'Pacific Mall', 'Ambience Mall', 'DLF CyberCity', 'World Trade Center', 'Raheja Towers', 'Mindspace', 'International Tech Park', 'Manyata Tech Park'],
  Indonesia: ['Plaza Indonesia', 'Grand Indonesia', 'Senayan City', 'Pacific Place', 'Summarecon Mall', 'PIK Avenue', 'Central Park', 'BEC', 'Trans Studio Mall', 'Ciputra World', 'Tunjungan Plaza', 'Galaxy Mall', 'Paris Van Java', 'Cihampelas Walk', 'Mall Bali Galeria', 'Seminyak Square', 'Beachwalk Mall'],
  Malaysia: ['Suria KLCC', 'Pavilion KL', 'Mid Valley Megamall', 'The Gardens Mall', '1 Utama', 'Sunway Pyramid', 'IOI City Mall', 'Setia City Mall', 'Queensbay Mall', 'Gurney Plaza', 'Imago KK', 'CityOne Megamall', 'Dataran Pahlawan', 'Mahkota Parade', 'VivaCity'],
  Singapore: ['ION Orchard', 'Marina Bay Sands', 'VivoCity', 'Raffles City', 'Suntec City', 'Plaza Singapura', 'Jewel Changi', 'Tampines Mall', 'Junction 8', 'Causeway Point', 'Waterway Point', 'NEX', 'Bugis Junction', 'The Centrepoint', 'Great World'],
  Japan: ['Shibuya Scramble', 'Shinjuku Station', 'Tokyo Station', 'Roppongi Hills', 'Ginza Six', 'Tokyo Skytree', 'Umeda Sky', 'Shinsaibashi', 'Dotonbori', 'Kawaramachi', 'Sapporo Station', 'Odori Park', 'Hakata Station', 'Canal City', 'Nagoya Station'],
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomWeighted(arr, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < arr.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return arr[i];
  }
  return arr[arr.length - 1];
}

function generateChargerTypes(country) {
  const profile = CHARGER_PROFILES[country];
  const allTypes = profile.types.slice(0, 4);
  const count = Math.random() < 0.3 ? 1 : Math.random() < 0.5 ? 2 : 3;
  const types = new Set();
  for (let i = 0; i < count; i++) {
    if (i === 0) {
      types.add(pickRandomWeighted(allTypes, profile.weights));
    } else {
      types.add(pickRandomWeighted(allTypes.slice(1), profile.weights.slice(1)));
    }
  }
  return Array.from(types);
}

function generateStation(country, city, index, operators, existingCount) {
  const coords = CITY_COORDS[city];
  const latSpread = 0.05;
  const lngSpread = 0.05;
  const lat = coords[0] + (Math.random() - 0.5) * latSpread;
  const lng = coords[1] + (Math.random() - 0.5) * lngSpread;

  const operator = pickRandom(operators);
  const chargerTypes = generateChargerTypes(country);
  const chargerCount = Math.floor(Math.random() * 14) + 4;
  const chargerSpeed = [50, 60, 75, 90, 100, 120, 125, 150, 175, 200, 250, 350][Math.floor(Math.random() * 12)];
  const reliability = parseFloat((3 + Math.random() * 2).toFixed(1));
  const locationConvenience = parseFloat((2.5 + Math.random() * 2.5).toFixed(1));
  const isOperational = Math.random() > 0.1;

  const COUNTRY_CODES = {
    'Thailand': 'tha',
    'India': 'ind',
    'Indonesia': 'idn',
    'Malaysia': 'mys',
    'Singapore': 'sgp',
    'Japan': 'jpn',
  };
  const countryCode = COUNTRY_CODES[country] || country.slice(0, 3).toLowerCase();
  const cityCode = city.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 15);
  const id = `${countryCode}-${cityCode}-${String(index).padStart(3, '0')}`;

  const places = PLACE_NAMES[country];
  const placeName = pickRandom(places);
  const suffix = pickRandom(STREET_SUFFIXES[country]);
  const randomStreetNum = Math.floor(Math.random() * 999) + 1;

  const name = `${operator} ${placeName}`;
  const address = `${randomStreetNum} ${suffix}`;

  const paymentCount = 1 + Math.floor(Math.random() * 3);
  const paymentMethods = [];
  const availPayments = [...PAYMENT_METHODS];
  for (let i = 0; i < paymentCount; i++) {
    const idx = Math.floor(Math.random() * availPayments.length);
    paymentMethods.push(availPayments[idx]);
    availPayments.splice(idx, 1);
  }

  const hasRestroom = Math.random() > 0.4;
  const hasFood = Math.random() > 0.45;
  const hasCovered = Math.random() > 0.5;
  const has24by7 = Math.random() > 0.3;
  const isMall = Math.random() > 0.55;

  const description = `${operator} at ${placeName} in ${city}. Features ${chargerTypes.join(', ')} connectors with up to ${chargerSpeed}kW charging speed. ${isOperational ? 'Open and operational.' : 'Check latest status before visiting.'}`;

  const keywords = [city, country, ...SEO_KEYWORDS[country]];
  if (chargerTypes.includes('CCS2')) keywords.push('CCS2');
  if (chargerTypes.includes('CHAdeMO')) keywords.push('CHAdeMO');
  if (chargerTypes.includes('NACS')) keywords.push('NACS', 'Tesla');
  keywords.push('EV charging');

  const phone = Math.random() > 0.6 ? `+${[66, 91, 62, 60, 65, 81][['Thailand', 'India', 'Indonesia', 'Malaysia', 'Singapore', 'Japan'].indexOf(country)]}-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}` : null;
  const website = Math.random() > 0.7 ? `https://${operator.toLowerCase().replace(/[^a-z0-9]/g, '')}.com` : null;

  return {
    id, name, city, country, address,
    latitude: parseFloat(lat.toFixed(4)),
    longitude: parseFloat(lng.toFixed(4)),
    chargerTypes, chargerCount, chargerSpeed,
    reliability, locationConvenience,
    isOperational, hasRestroomNearby: hasRestroom,
    hasFoodNearby: hasFood, hasCoveredParking: hasCovered,
    has24by7Access: has24by7, isMallParking: isMall,
    paymentMethods, operator, description,
    seoKeywords: [...new Set(keywords)],
    phone, website,
  };
}

const CITY_TARGETS = {
  Thailand: { Bangkok: 40, Phuket: 25, Pattaya: 20, 'Chiang Mai': 20, 'Chiang Rai': 10, 'Hat Yai': 10, 'Khon Kaen': 10, Krabi: 15, 'Koh Samui': 10, Rayong: 10, 'Surat Thani': 10 },
  India: { Delhi: 50, Mumbai: 40, Bangalore: 40, Hyderabad: 25, Chennai: 25, Pune: 20, Ahmedabad: 15, Kolkata: 15, Jaipur: 15, Lucknow: 10, Chandigarh: 10, Kochi: 10 },
  Indonesia: { Jakarta: 40, Surabaya: 20, Bandung: 20, Denpasar: 30, Medan: 15, Makassar: 10, Yogyakarta: 15, Semarang: 10, Batam: 10, Mataram: 10 },
  Malaysia: { 'Kuala Lumpur': 45, 'Johor Bahru': 20, Penang: 25, Ipoh: 15, 'Kota Kinabalu': 12, Kuching: 10, Melaka: 10, Kuantan: 8, 'Malacca City': 8 },
  Singapore: { Central: 30, Orchard: 20, 'Marina Bay': 20, Changi: 15, Jurong: 15, Woodlands: 10, Tampines: 10, Punggol: 8, Sentosa: 5 },
  Japan: { Tokyo: 50, Osaka: 35, Kyoto: 20, Yokohama: 20, Nagoya: 20, Fukuoka: 15, Sapporo: 12, Kobe: 12, Naha: 10, Hiroshima: 10 },
};

// Load existing stations
const dataPath = path.join(__dirname, '..', 'data', 'stations.json');
let existing = [];
try {
  existing = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  console.log(`Loaded ${existing.length} existing stations`);
} catch {
  console.log('No existing stations found, starting fresh');
}

// Remove existing TH and IN stations that we'll replace
const otherCountries = existing.filter(s => s.country !== 'Thailand' && s.country !== 'India' && s.country !== 'Indonesia' && s.country !== 'Malaysia' && s.country !== 'Singapore' && s.country !== 'Japan');
console.log(`Keeping ${otherCountries.length} stations from other countries`);

const allStations = [...otherCountries];

for (const [country, cities] of Object.entries(CITY_TARGETS)) {
  const operators = OPERATORS[country];
  let index = 1;
  for (const [city, count] of Object.entries(cities)) {
    for (let i = 0; i < count; i++) {
      allStations.push(generateStation(country, city, index, operators));
      index++;
    }
  }
  console.log(`Generated ${index - 1} stations for ${country}`);
}

// Shuffle to avoid clustering
allStations.sort(() => Math.random() - 0.5);

// Remove duplicates by id
const seen = new Set();
const unique = allStations.filter(s => {
  if (seen.has(s.id)) return false;
  seen.add(s.id);
  return true;
});

console.log(`Total unique stations: ${unique.length}`);

// Count per country
const counts = {};
unique.forEach(s => {
  counts[s.country] = (counts[s.country] || 0) + 1;
});
console.log('Per country:', counts);

// Validate all fields present
const requiredFields = ['id','name','city','country','address','latitude','longitude','chargerTypes','chargerCount','chargerSpeed','reliability','locationConvenience','isOperational','hasRestroomNearby','hasFoodNearby','hasCoveredParking','has24by7Access','isMallParking','paymentMethods','operator','description','seoKeywords','phone','website'];
let valid = true;
unique.forEach(s => {
  requiredFields.forEach(f => {
    if (s[f] === undefined) {
      console.error(`Missing field ${f} on station ${s.id}`);
      valid = false;
    }
  });
});

if (!valid) {
  console.error('Validation failed!');
  process.exit(1);
}

fs.writeFileSync(dataPath, JSON.stringify(unique, null, 2));
console.log(`\nWritten ${unique.length} stations to ${dataPath}`);
