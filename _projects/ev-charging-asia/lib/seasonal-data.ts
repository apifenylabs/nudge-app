/**
 * Seasonal data for EV road trips: month-by-month recommendations with EV range impacts.
 * Used by the SeasonalComparisonTable component to show a color-coded calendar.
 */

export type SeasonScore = 'excellent' | 'good' | 'fair' | 'poor' | 'avoid';

export interface MonthlySeasonData {
  month: number; // 0=January, 11=December
  label: string;
  score: SeasonScore;
  tempC: string;
  rangeImpact: string;
  rainfall: string;
  notes: string;
}

export interface RouteSeasonData {
  slug: string;
  title: string;
  months: MonthlySeasonData[];
}

const SCORE_COLORS: Record<SeasonScore, string> = {
  excellent: '#059669',  // emerald-600
  good: '#2563eb',       // blue-600
  fair: '#d97706',       // amber-600
  poor: '#dc2626',       // red-600
  avoid: '#7f1d1d',      // dark red
};

const SCORE_LABELS: Record<SeasonScore, string> = {
  excellent: '🌟 Excellent',
  good: '✅ Good',
  fair: '⚠️ Fair',
  poor: '❌ Poor',
  avoid: '🚫 Avoid',
};

export function getScoreColor(score: SeasonScore): string { return SCORE_COLORS[score]; }
export function getScoreLabel(score: SeasonScore): string { return SCORE_LABELS[score]; }

function monthData(
  month: number,
  score: SeasonScore,
  tempC: string,
  rangeImpact: string,
  rainfall: string,
  notes: string
): MonthlySeasonData {
  const labels = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return { month, label: labels[month], score, tempC, rangeImpact, rainfall, notes };
}

export const routeSeasonsData: RouteSeasonData[] = [
  {
    slug: 'bangkok-to-phuket-road-trip',
    title: 'Bangkok → Phuket',
    months: [
      monthData(0,  'excellent', '24-32°C', '-5%', 'Low', 'Cool and dry — peak season. Best for driving.'),
      monthData(1,  'excellent', '25-33°C', '-5%', 'Low', 'Still excellent. Book hotels early for Chinese New Year.'),
      monthData(2,  'good',     '27-34°C', '-10%', 'Low', 'Getting hotter but still dry. Good for beach stops.'),
      monthData(3,  'fair',     '28-35°C', '-15%', 'Low-Med', 'Hot season starts. AC usage reduces range.'),
      monthData(4,  'fair',     '28-35°C', '-15%', 'Medium', 'Hot and slightly humid. Plan morning driving.'),
      monthData(5,  'poor',     '27-34°C', '-20%', 'Medium', 'Rainy season begins. Slippery roads.'),
      monthData(6,  'poor',     '26-33°C', '-20%', 'High', 'Heavy rain on west coast roads. Drive carefully.'),
      monthData(7,  'fair',     '26-33°C', '-15%', 'High', 'Rain continues but manageable. Fewer tourists.'),
      monthData(8,  'fair',     '26-33°C', '-15%', 'Medium', 'Transition month. Good hotel deals.'),
      monthData(9,  'good',     '25-32°C', '-10%', 'Medium', 'Rain easing. Cooler temperatures return.'),
      monthData(10, 'good',     '25-31°C', '-10%', 'Low-Med', 'Loy Krathong festival — beautiful but busy.'),
      monthData(11, 'excellent', '24-31°C', '-5%', 'Low', 'Perfect driving weather. Cool sea breezes.'),
    ],
  },
  {
    slug: 'bangkok-to-chiang-mai-road-trip',
    title: 'Bangkok → Chiang Mai',
    months: [
      monthData(0,  'excellent', '15-30°C', '-5%', 'Low', 'Cool and clear. Best for mountain driving.'),
      monthData(1,  'excellent', '17-32°C', '-5%', 'Low', 'Still excellent. Clear mountain views.'),
      monthData(2,  'good',     '20-34°C', '-10%', 'Low', 'Getting warmer. Smoky season beginning.'),
      monthData(3,  'fair',     '23-36°C', '-15%', 'Low', 'Burning season — PM2.5 can be severe.'),
      monthData(4,  'poor',     '25-37°C', '-20%', 'Low-Med', 'Peak burning season. Poor air quality.'),
      monthData(5,  'poor',     '24-35°C', '-20%', 'Medium', 'First rains arrive. Smoky conditions improve.'),
      monthData(6,  'fair',     '24-34°C', '-15%', 'High', 'Green season starts. Lush landscapes.'),
      monthData(7,  'fair',     '24-33°C', '-15%', 'High', 'Rainy. Fewer tourists, great hotel rates.'),
      monthData(8,  'good',     '23-33°C', '-10%', 'Medium', 'Rains easing. Waterfalls at their best.'),
      monthData(9,  'good',     '22-32°C', '-10%', 'Medium', 'Pleasant. Green hills, clear evenings.'),
      monthData(10, 'good',     '20-31°C', '-10%', 'Low-Med', 'Cooling down. Yi Peng lantern festival.'),
      monthData(11, 'excellent', '16-30°C', '-5%', 'Low', 'Perfect. Cool, clear, festival season.'),
    ],
  },
  {
    slug: 'singapore-to-kuala-lumpur-road-trip',
    title: 'Singapore → KL',
    months: [
      monthData(0,  'good',     '25-30°C', '-10%', 'Medium', 'Monsoon season but still drivable.'),
      monthData(1,  'good',     '25-31°C', '-10%', 'Medium', 'Short afternoon showers typical.'),
      monthData(2,  'good',     '26-31°C', '-10%', 'Medium', 'End of NE monsoon. Warmer.'),
      monthData(3,  'fair',     '26-32°C', '-15%', 'Low-Med', 'Inter-monsoon. Hot and humid.'),
      monthData(4,  'fair',     '27-33°C', '-15%', 'Medium', 'AC usage increases. Plan more charging.'),
      monthData(5,  'fair',     '27-33°C', '-15%', 'Medium', 'SW monsoon starts. Afternoon showers.'),
      monthData(6,  'good',     '26-32°C', '-10%', 'Medium', 'Dry period on west coast. Good driving.'),
      monthData(7,  'good',     '26-32°C', '-10%', 'Medium', 'Consistent driving weather.'),
      monthData(8,  'good',     '26-32°C', '-10%', 'Medium', 'Similar to July. Reliable driving.'),
      monthData(9,  'fair',     '26-32°C', '-15%', 'Medium', 'SW monsoon peak. Haze possible.'),
      monthData(10, 'fair',     '26-32°C', '-15%', 'Medium', 'Inter-monsoon. Thunderstorms.'),
      monthData(11, 'good',     '25-31°C', '-10%', 'Medium', 'NE monsoon begins. Cooler mornings.'),
    ],
  },
  {
    slug: 'bali-ev-road-trip-loop',
    title: 'Bali Loop',
    months: [
      monthData(0,  'good',     '25-31°C', '-10%', 'High', 'Wet season peak. Expect daily downpours.'),
      monthData(1,  'good',     '25-31°C', '-10%', 'High', 'Still wet. Good hotel deals.'),
      monthData(2,  'good',     '25-32°C', '-10%', 'Medium', 'Rain easing. Lush green rice terraces.'),
      monthData(3,  'excellent', '25-33°C', '-5%', 'Low-Med', 'Dry season starts. Perfect touring weather.'),
      monthData(4,  'excellent', '25-33°C', '-5%', 'Low', 'Nyepi festival. Quiet roads.'),
      monthData(5,  'excellent', '24-32°C', '-5%', 'Low', 'Best month. Clear skies, calm seas.'),
      monthData(6,  'excellent', '23-31°C', '-5%', 'Low', 'Still excellent. Cool breezes.'),
      monthData(7,  'good',     '23-31°C', '-10%', 'Low', 'Dry. Slightly busier — Australian school hols.'),
      monthData(8,  'good',     '23-31°C', '-10%', 'Low-Med', 'Transition. Still good driving.'),
      monthData(9,  'good',     '24-31°C', '-10%', 'Low-Med', 'Dry season ending. Still very pleasant.'),
      monthData(10, 'fair',     '24-32°C', '-15%', 'Medium', 'Wet season begins. Afternoon storms.'),
      monthData(11, 'fair',     '25-32°C', '-15%', 'High', 'Rain increasing. Green but wet.'),
    ],
  },
  {
    slug: 'hong-kong-to-macau-road-trip',
    title: 'Hong Kong → Macau',
    months: [
      monthData(0,  'good',     '14-19°C', '-5%', 'Low', 'Cool and dry. Good visibility on bridge.'),
      monthData(1,  'good',     '15-20°C', '-5%', 'Low', 'Similar to January. Chinese New Year busy.'),
      monthData(2,  'good',     '17-22°C', '-5%', 'Low-Med', 'Pleasant. Spring festivals.'),
      monthData(3,  'excellent', '19-25°C', '-5%', 'Medium', 'Spring. Mild and comfortable.'),
      monthData(4,  'excellent', '22-28°C', '-5%', 'Medium', 'Warm and pleasant. Cherry blossoms.'),
      monthData(5,  'fair',     '25-31°C', '-10%', 'High', 'Hot with increasing humidity.'),
      monthData(6,  'poor',     '27-32°C', '-15%', 'Very High', 'Typhoon season risk. Hot and wet.'),
      monthData(7,  'avoid',   '28-33°C', '-20%', 'Very High', 'Peak typhoon season. Bridge may close.'),
      monthData(8,  'poor',     '28-33°C', '-20%', 'Very High', 'Still typhoon risk. Very humid.'),
      monthData(9,  'fair',     '26-31°C', '-15%', 'High', 'Typhoon risk reducing. Still hot.'),
      monthData(10, 'good',     '23-28°C', '-10%', 'Medium', 'Autumn. More comfortable.'),
      monthData(11, 'good',     '19-24°C', '-5%', 'Low', 'Pleasant. Great for bridge crossing.'),
    ],
  },
  {
    slug: 'hanoi-to-ha-long-bay-road-trip',
    title: 'Hanoi → Ha Long Bay',
    months: [
      monthData(0,  'fair',     '14-20°C', '-15%', 'Low-Med', 'Cool and dry. Limited visibility on bay.'),
      monthData(1,  'fair',     '15-21°C', '-10%', 'Low-Med', 'Tet holiday. Busy. Cool weather.'),
      monthData(2,  'good',     '18-24°C', '-10%', 'Low', 'Spring. Pleasant driving.'),
      monthData(3,  'excellent', '20-27°C', '-5%', 'Low-Med', 'Best month. Warm but not hot.'),
      monthData(4,  'excellent', '23-31°C', '-5%', 'Medium', 'Warm and pleasant. Bay at its best.'),
      monthData(5,  'fair',     '26-34°C', '-10%', 'High', 'Hot. Pre-monsoon humidity building.'),
      monthData(6,  'poor',     '27-34°C', '-15%', 'Very High', 'Monsoon. Heavy rain, slippery roads.'),
      monthData(7,  'poor',     '27-34°C', '-15%', 'Very High', 'Peak monsoon. Typhoon risk.'),
      monthData(8,  'poor',     '26-33°C', '-15%', 'Very High', 'Still very wet. Storms possible.'),
      monthData(9,  'fair',     '25-31°C', '-10%', 'High', 'Rain easing. Bay clears up.'),
      monthData(10, 'good',     '22-29°C', '-5%', 'Medium', 'Autumn. Cool mornings, clear skies.'),
      monthData(11, 'good',     '18-25°C', '-5%', 'Low-Med', 'Pleasant. Great for bay cruises.'),
    ],
  },
  {
    slug: 'osaka-to-tokyo-road-trip',
    title: 'Osaka → Tokyo',
    months: [
      monthData(0,  'poor',     '2-10°C', '-30%', 'Low-Med', 'Cold. Snow possible in mountain passes.'),
      monthData(1,  'poor',     '2-10°C', '-30%', 'Low', 'Similar to Jan. Battery range heavily impacted.'),
      monthData(2,  'fair',     '5-13°C', '-20%', 'Low-Med', 'Starting to warm. Cherry blossom prep.'),
      monthData(3,  'excellent', '8-18°C', '-10%', 'Medium', 'Cherry blossom season! Popular but magical.'),
      monthData(4,  'excellent', '13-23°C', '-5%', 'Medium', 'Golden Week. Busy. Beautiful weather.'),
      monthData(5,  'good',     '18-27°C', '-5%', 'Medium', 'Warm and pleasant. Green season.'),
      monthData(6,  'fair',     '22-29°C', '-10%', 'High', 'Rainy season. Tsuyu. Humid.'),
      monthData(7,  'fair',     '25-32°C', '-10%', 'Medium', 'Hot and humid. AC impacts range.'),
      monthData(8,  'fair',     '26-33°C', '-10%', 'Medium', 'Still hot. Summer festivals.'),
      monthData(9,  'good',     '22-29°C', '-5%', 'High', 'Typhoon season risk. Pleasant temps.'),
      monthData(10, 'excellent', '16-24°C', '-5%', 'Medium', 'Autumn foliage. Best driving month.'),
      monthData(11, 'good',     '10-18°C', '-10%', 'Low-Med', 'Late autumn. Cool. Foliage beautiful.'),
    ],
  },
  {
    slug: 'kuala-lumpur-to-penang-road-trip',
    title: 'KL → Penang',
    months: [
      monthData(0,  'good',     '24-32°C', '-10%', 'Low-Med', 'NE monsoon. Cooler on west coast.'),
      monthData(1,  'good',     '25-33°C', '-10%', 'Low-Med', 'Dry period. Good driving.'),
      monthData(2,  'good',     '26-33°C', '-10%', 'Medium', 'Partial dry. Afternoon showers.'),
      monthData(3,  'fair',     '26-34°C', '-15%', 'Medium', 'Inter-monsoon. Hot.'),
      monthData(4,  'fair',     '27-34°C', '-15%', 'Medium', 'Hot with heavy short showers.'),
      monthData(5,  'good',     '27-33°C', '-10%', 'Medium', 'SW monsoon. West coast dry period.'),
      monthData(6,  'good',     '26-33°C', '-10%', 'Medium', 'Best month for west coast.'),
      monthData(7,  'good',     '26-33°C', '-10%', 'Medium', 'Consistent weather. Good for island.'),
      monthData(8,  'good',     '26-33°C', '-10%', 'Medium', 'Similar to July.'),
      monthData(9,  'fair',     '26-33°C', '-15%', 'Medium', 'SW monsoon continuing.'),
      monthData(10, 'fair',     '25-32°C', '-15%', 'Medium', 'Inter-monsoon. Unpredictable showers.'),
      monthData(11, 'good',     '25-32°C', '-10%', 'Medium', 'NE monsoon starting. Cooler.'),
    ],
  },
  {
    slug: 'mumbai-to-pune-road-trip',
    title: 'Mumbai → Pune',
    months: [
      monthData(0,  'excellent', '16-30°C', '-5%', 'Low', 'Cool and dry. Perfect.'),
      monthData(1,  'excellent', '17-31°C', '-5%', 'Low', 'Still excellent. Clear expressway.'),
      monthData(2,  'good',     '20-33°C', '-10%', 'Low', 'Warming up. Still good.'),
      monthData(3,  'fair',     '23-35°C', '-15%', 'Low-Med', 'Getting hot. AC required.'),
      monthData(4,  'poor',     '26-37°C', '-20%', 'Low-Med', 'Hot. Pre-monsoon heat.'),
      monthData(5,  'avoid',    '26-36°C', '-25%', 'Medium', 'Extreme heat. EV range heavily impacted.'),
      monthData(6,  'poor',     '25-33°C', '-20%', 'High', 'Monsoon. Heavy rain. Landslides risk.'),
      monthData(7,  'poor',     '24-30°C', '-20%', 'Very High', 'Peak monsoon. Road closures on ghats.'),
      monthData(8,  'fair',     '24-30°C', '-15%', 'Very High', 'Still very wet. Green and lush.'),
      monthData(9,  'fair',     '24-31°C', '-15%', 'High', 'Monsoon easing. Watch for potholes.'),
      monthData(10, 'good',     '21-32°C', '-10%', 'Medium', 'Post-monsoon. Fresh and clean roads.'),
      monthData(11, 'excellent', '18-31°C', '-5%', 'Low-Med', 'Cool and clear. Best season begins.'),
    ],
  },
  {
    slug: 'tokyo-to-hakone-fuji-road-trip',
    title: 'Tokyo → Hakone → Fuji',
    months: [
      monthData(0,  'poor',     '-2-10°C', '-35%', 'Low', 'Cold. Mountain roads may be icy.'),
      monthData(1,  'poor',     '-1-10°C', '-35%', 'Low', 'Similar. Heavy winter gear needed.'),
      monthData(2,  'fair',     '2-13°C', '-25%', 'Low', 'Starting to thaw. Still cold.'),
      monthData(3,  'good',     '5-17°C', '-15%', 'Medium', 'Spring. Cherry blossoms starting.'),
      monthData(4,  'excellent', '10-22°C', '-5%', 'Medium', 'Perfect. Clear Fuji views.'),
      monthData(5,  'excellent', '15-26°C', '-5%', 'Medium', 'Green season. Clear skies.'),
      monthData(6,  'fair',     '19-28°C', '-10%', 'High', 'Rainy season. Fuji often hidden.'),
      monthData(7,  'fair',     '22-31°C', '-10%', 'Medium', 'Hot. Heavy AC use. Fuji climbing season.'),
      monthData(8,  'fair',     '23-32°C', '-10%', 'Medium', 'Still hot. Obon holiday traffic.'),
      monthData(9,  'good',     '19-28°C', '-5%', 'High', 'Typhoon risk but pleasant temps.'),
      monthData(10, 'excellent', '13-23°C', '-5%', 'Medium', 'Autumn foliage. Best Fuji views.'),
      monthData(11, 'good',     '7-17°C', '-10%', 'Low-Med', 'Late autumn. Beautiful but cool.'),
    ],
  },
  {
    slug: 'delhi-to-jaipur-agra-road-trip',
    title: 'Delhi → Jaipur → Agra',
    months: [
      monthData(0,  'fair',     '7-21°C', '-20%', 'Low', 'Cool and foggy. Delhi fog causes delays.'),
      monthData(1,  'fair',     '9-23°C', '-15%', 'Low', 'Fog clearing. Warming up.'),
      monthData(2,  'good',     '14-28°C', '-10%', 'Low', 'Pleasant spring temperatures.'),
      monthData(3,  'excellent', '19-33°C', '-5%', 'Low-Med', 'Best month. Warm days, cool nights.'),
      monthData(4,  'good',     '24-38°C', '-10%', 'Low-Med', 'Getting hot. AC reduces range.'),
      monthData(5,  'poor',     '28-42°C', '-20%', 'Low', 'Extreme heat. AC at max.'),
      monthData(6,  'poor',     '29-40°C', '-20%', 'Medium', 'Monsoon approaching. Heat + humidity.'),
      monthData(7,  'fair',     '27-35°C', '-15%', 'High', 'Monsoon. Wet roads, good for sightseeing.'),
      monthData(8,  'fair',     '26-33°C', '-15%', 'High', 'Still monsoon. Lush countryside.'),
      monthData(9,  'good',     '24-34°C', '-10%', 'Medium', 'Monsoon easing. Pleasanter.'),
      monthData(10, 'excellent', '18-32°C', '-5%', 'Low-Med', 'Best season starts. Perfect touring.'),
      monthData(11, 'good',     '12-27°C', '-10%', 'Low', 'Cool and pleasant. Festival season.'),
    ],
  },
  {
    slug: 'chiang-mai-to-pai-mae-hong-son-road-trip',
    title: 'Chiang Mai → Pai → Mae Hong Son',
    months: [
      monthData(0,  'excellent', '10-28°C', '-5%', 'Low', 'Cool mountain air. Best for 762 curves.'),
      monthData(1,  'excellent', '12-30°C', '-5%', 'Low', 'Still excellent. Clear mountain views.'),
      monthData(2,  'good',     '15-32°C', '-10%', 'Low', 'Warming. Smoky season begins.'),
      monthData(3,  'fair',     '18-35°C', '-15%', 'Low', 'Burning season. Poor visibility.'),
      monthData(4,  'poor',     '21-37°C', '-20%', 'Low-Med', 'Peak burning. Haze on mountain roads.'),
      monthData(5,  'poor',     '22-36°C', '-20%', 'Medium', 'First rains. Smoky clearing.'),
      monthData(6,  'fair',     '21-34°C', '-15%', 'High', 'Green season. Lush but slippery curves.'),
      monthData(7,  'fair',     '21-33°C', '-15%', 'Very High', 'Heavy rain. 762 curves become hazardous.'),
      monthData(8,  'fair',     '21-33°C', '-15%', 'Very High', 'Still very wet. Road conditions poor.'),
      monthData(9,  'good',     '20-32°C', '-10%', 'High', 'Rain easing. Waterfalls full.'),
      monthData(10, 'excellent', '17-30°C', '-5%', 'Medium', 'Cool season returns. Best after rains.'),
      monthData(11, 'excellent', '13-28°C', '-5%', 'Low-Med', 'Perfect. Cool, clear, green.'),
    ],
  },
  {
    slug: 'seoul-to-busan-road-trip',
    title: 'Seoul → Busan',
    months: [
      monthData(0,  'avoid',    '-6-2°C', '-40%', 'Low-Med', 'Extremely cold. Battery range severely impacted.'),
      monthData(1,  'avoid',    '-4-4°C', '-40%', 'Low', 'Similar to January. Very cold.'),
      monthData(2,  'fair',     '0-9°C', '-30%', 'Low-Med', 'Thawing. Still cold. Battery impact.'),
      monthData(3,  'good',     '5-15°C', '-15%', 'Medium', 'Spring. Cherry blossoms in Gyeongju.'),
      monthData(4,  'excellent', '10-22°C', '-5%', 'Medium', 'Best month. Cherry blossoms peak.'),
      monthData(5,  'excellent', '16-26°C', '-5%', 'Medium', 'Warm and pleasant. Green countryside.'),
      monthData(6,  'fair',     '20-28°C', '-10%', 'High', 'Rainy season (jangma). Humid.'),
      monthData(7,  'fair',     '23-30°C', '-10%', 'High', 'Hot and humid. Monsoon.'),
      monthData(8,  'fair',     '24-32°C', '-10%', 'Medium', 'Hot. Summer break traffic.'),
      monthData(9,  'good',     '18-27°C', '-5%', 'Medium', 'Autumn starts. Pleasant.'),
      monthData(10, 'excellent', '12-22°C', '-5%', 'Low-Med', 'Autumn foliage. Best season.'),
      monthData(11, 'good',     '4-14°C', '-10%', 'Low-Med', 'Late autumn. Cool but beautiful.'),
    ],
  },
  {
    slug: 'manila-to-baguio-road-trip',
    title: 'Manila → Baguio',
    months: [
      monthData(0,  'excellent', '15-28°C', '-5%', 'Low', 'Cool and dry. Best for mountain driving.'),
      monthData(1,  'excellent', '15-28°C', '-5%', 'Low', 'Still excellent. Bible month.'),
      monthData(2,  'good',     '16-30°C', '-5%', 'Low-Med', 'Warming slightly. Still good.'),
      monthData(3,  'fair',     '17-32°C', '-10%', 'Low-Med', 'Summer heat begins.'),
      monthData(4,  'fair',     '18-34°C', '-10%', 'Low-Med', 'Hot. But Baguio stays cooler.'),
      monthData(5,  'good',     '18-33°C', '-10%', 'Medium', 'Start of wet season. Lower traffic.'),
      monthData(6,  'bad',      '18-32°C', '-15%', 'High', 'Wet season. Landslide risk on Kennon Rd.'),
      monthData(7,  'bad',      '18-31°C', '-15%', 'Very High', 'Typhoon season. Road closures likely.'),
      monthData(8,  'bad',      '18-31°C', '-15%', 'Very High', 'Still typhoon season. Unpredictable.'),
      monthData(9,  'fair',     '18-31°C', '-10%', 'High', 'Rain easing. Still wet.'),
      monthData(10, 'good',     '17-30°C', '-10%', 'Medium', 'Dry season returning. Good compromise.'),
      monthData(11, 'excellent', '16-29°C', '-5%', 'Low-Med', 'Dry season. Cool and clear.'),
    ],
  },
];

export function getRouteSeasonData(slug: string): RouteSeasonData | undefined {
  return routeSeasonsData.find(r => r.slug === slug);
}

export function getAllRouteSeasonData(): RouteSeasonData[] {
  return routeSeasonsData;
}
