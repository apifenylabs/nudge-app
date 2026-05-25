import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Sun, Cloud, CloudRain, Snowflake, Thermometer, Route, ChevronRight, Star, Calendar } from 'lucide-react';
import { getAllItineraries } from '@/data/itineraries';
import SiteFooter from '@/components/SiteFooter';
import { BreadcrumbSchemaSSR } from '@/components/SchemaOrg';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Best Seasons for EV Road Trips — EV Charging Asia',
  description: 'Find the best time of year for your EV road trip across Asia. Month-by-month seasonal guide with weather, road conditions, and packing recommendations for each route.',
  alternates: {
    canonical: 'https://ev-charging-asia.vercel.app/seasons',
  },
  openGraph: {
    title: 'Best Seasons for EV Road Trips in Asia',
    description: 'Month-by-month guide to the best times for EV road trips across Asia.',
    url: 'https://ev-charging-asia.vercel.app/seasons',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Seasons for EV Road Trips in Asia',
    description: 'Month-by-month guide to the best times for EV road trips across Asia.',
  },
};

// Season data for each month
const seasonMonths = [
  { index: 0, name: 'January', abbr: 'Jan', icon: '❄️', color: 'from-blue-400 to-blue-500' },
  { index: 1, name: 'February', abbr: 'Feb', icon: '🌸', color: 'from-pink-400 to-pink-500' },
  { index: 2, name: 'March', abbr: 'Mar', icon: '🌱', color: 'from-emerald-400 to-emerald-500' },
  { index: 3, name: 'April', abbr: 'Apr', icon: '🌺', color: 'from-rose-400 to-rose-500' },
  { index: 4, name: 'May', abbr: 'May', icon: '☀️', color: 'from-amber-400 to-amber-500' },
  { index: 5, name: 'June', abbr: 'Jun', icon: '⛱️', color: 'from-orange-400 to-orange-500' },
  { index: 6, name: 'July', abbr: 'Jul', icon: '🌧️', color: 'from-slate-400 to-slate-500' },
  { index: 7, name: 'August', abbr: 'Aug', icon: '🌊', color: 'from-cyan-400 to-cyan-500' },
  { index: 8, name: 'September', abbr: 'Sep', icon: '🍂', color: 'from-amber-400 to-amber-500' },
  { index: 9, name: 'October', abbr: 'Oct', icon: '🎃', color: 'from-orange-400 to-orange-500' },
  { index: 10, name: 'November', abbr: 'Nov', icon: '🍁', color: 'from-red-400 to-red-500' },
  { index: 11, name: 'December', abbr: 'Dec', icon: '🎄', color: 'from-green-400 to-green-500' },
];

// Region-based seasonal guidance
const regionSeasons: Record<string, { months: string; description: string; icon: string }> = {
  thailand: {
    months: 'Nov–Feb (Cool), Mar–Jun (Hot), Jul–Oct (Rainy)',
    description: 'The cool season (Nov–Feb) is ideal for EV road trips — comfortable temperatures and clear skies reduce AC drain on battery. Hot season means AC usage cuts range significantly.',
    icon: '🇹🇭',
  },
  malaysia: {
    months: 'Dec–Feb (Dry NE Monsoon), Jun–Aug (Dry SW Monsoon)',
    description: 'Malaysia has relatively consistent temperatures year-round. The driest periods are Dec–Feb on the west coast and Jun–Aug on the east coast.',
    icon: '🇲🇾',
  },
  japan: {
    months: 'Mar–May (Spring), Jun–Aug (Summer), Sep–Nov (Autumn), Dec–Feb (Winter)',
    description: 'Spring (cherry blossoms) and autumn (foliage) are peak seasons with the best weather for driving. Summer is hot and humid with typhoon risk. Winter brings snow to northern routes.',
    icon: '🇯🇵',
  },
  india: {
    months: 'Oct–Mar (Cool/Dry), Apr–Jun (Hot), Jul–Sep (Monsoon)',
    description: 'The post-monsoon winter (Oct–Mar) offers the best driving conditions with pleasant temperatures. Summer heat can impact EV range due to AC usage.',
    icon: '🇮🇳',
  },
  vietnam: {
    months: 'Mar–May (Spring), Jun–Aug (Summer), Sep–Nov (Autumn), Dec–Feb (Winter)',
    description: 'Spring and autumn offer the best conditions for driving. Northern Vietnam (Hanoi, Ha Long Bay) has distinct seasons. Southern Vietnam is warm year-round.',
    icon: '🇻🇳',
  },
  singapore: {
    months: 'Year-round tropical',
    description: 'Singapore has consistent weather year-round with temperatures 25–32°C. Occasional thunderstorms are brief. EV range impact is minimal.',
    icon: '🇸🇬',
  },
  indonesia: {
    months: 'Apr–Oct (Dry), Nov–Mar (Wet)',
    description: 'The dry season (Apr–Oct) is the best time for Bali and Indonesian EV road trips. The wet season brings daily downpours and potential flooding on local roads.',
    icon: '🇮🇩',
  },
  china: {
    months: 'Mar–May (Spring), Jun–Aug (Summer), Sep–Nov (Autumn), Dec–Feb (Winter)',
    description: 'Spring and autumn are the best times for driving in southern China (Guangdong). Northern China can have harsh winters affecting EV battery range.',
    icon: '🇨🇳',
  },
  philippines: {
    months: 'Nov–May (Dry), Jun–Oct (Wet/Typhoon)',
    description: 'The dry season is ideal for driving. Typhoon season (Jul–Oct) can cause road closures and flooding. Plan around weather forecasts.',
    icon: '🇵🇭',
  },
  korea: {
    months: 'Mar–May (Spring), Jun–Aug (Summer), Sep–Nov (Autumn), Dec–Feb (Winter)',
    description: 'Spring and autumn offer the most pleasant driving weather. Winter can be very cold (Seoul -10°C) which significantly reduces EV battery range.',
    icon: '🇰🇷',
  },
};

// Country grouping for season pages
const countryGroups: Record<string, string[]> = {
  'Southeast Asia': ['thailand', 'malaysia', 'vietnam', 'indonesia', 'singapore', 'philippines'],
  'East Asia': ['japan', 'china', 'korea'],
  'South Asia': ['india'],
};

export default function SeasonsPage() {
  const allItineraries = getAllItineraries();

  // Group itineraries by month by analyzing bestSeason
  function getRecommendedMonths(bestSeason: string): number[] {
    const lower = bestSeason.toLowerCase();
    const monthMap: Record<string, number> = {
      january: 0, jan: 0, february: 1, feb: 1, march: 2, mar: 2,
      april: 3, apr: 3, may: 4, june: 5, jun: 5,
      july: 6, jul: 6, august: 7, aug: 7, september: 8, sep: 8,
      october: 9, oct: 9, november: 10, nov: 10, december: 11, dec: 11,
    };
    const months: number[] = [];
    const rangeMatch = lower.match(/(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*(?:-|to|through|–)\s*(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i);
    if (rangeMatch) {
      const start = monthMap[rangeMatch[1].toLowerCase()];
      const end = monthMap[rangeMatch[2].toLowerCase()];
      if (start !== undefined && end !== undefined) {
        if (end >= start) {
          for (let m = start; m <= end; m++) months.push(m);
        } else {
          for (let m = start; m < 12; m++) months.push(m);
          for (let m = 0; m <= end; m++) months.push(m);
        }
      }
    }
    if (months.length === 0 && lower.includes('year-round')) {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    }
    return months;
  }

  function getMonthName(index: number): string {
    return ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'][index];
  }

  const itinerariesByMonth = seasonMonths.map(m => ({
    month: m,
    routes: allItineraries.filter(it => getRecommendedMonths(it.bestSeason).includes(m.index)),
  }));

  // JSON-LD: FAQPage for rich results
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best season for EV road trips in Asia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best season varies by region. For Southeast Asia (Thailand, Vietnam, Malaysia), November to February offers cool, dry weather ideal for driving. For Japan and Korea, spring (March-May) and autumn (September-November) are best. India is best October to March. Mild temperatures (20-25°C) maximize EV battery range.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does hot weather affect EV range in Asia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Air conditioning usage in hot weather can reduce EV range by 15-25%. Battery thermal management systems also draw power. In tropical Asian countries like Thailand, Malaysia, and Indonesia, plan for more frequent charging stops during the hot season (March-June).',
        },
      },
      {
        '@type': 'Question',
        name: 'Does cold weather affect EV range in Asia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Cold temperatures can reduce EV battery efficiency by 20-40%. In northern Japan, Korea, and mountainous parts of China and India, winter driving requires careful range planning. Pre-condition the battery while plugged in before departure.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which Asian countries have the best EV charging infrastructure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'China leads Asia with the most extensive fast-charging network. Thailand has rapidly expanding 50-150kW chargers along major highways. Japan has widespread CHAdeMO coverage. South Korea offers ultra-fast 350kW chargers on major corridors. Singapore has excellent urban coverage. India and Indonesia are growing quickly but planning is recommended.',
        },
      },
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EV Charging Asia',
    url: 'https://ev-charging-asia.vercel.app',
    description: 'Best seasons for EV road trips across Asia — month-by-month guide with route recommendations.',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchemaSSR items={[
        { name: 'Home', url: '/' },
        { name: 'Best Seasons', url: '/seasons' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/routes" className="hover:text-gray-900">Routes</Link>
            <Link href="/compare" className="hover:text-gray-900">Compare</Link>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
              🌿 GUIDE
            </span>
            <span className="text-xs text-gray-500">Seasonal Travel Planning</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Best Seasons for EV Road Trips in Asia
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            When to go matters — not just for the views but for your EV&apos;s range too.
            Temperature, rain, and road conditions all affect your driving experience.
            Use this guide to plan the perfect seasonal road trip.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* How season affects EV range */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Thermometer size={20} className="text-sky-500" />
            How Season Affects Your EV Road Trip
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-2xl mb-1">☀️</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Hot Weather</h3>
              <p className="text-xs text-gray-600">AC usage can reduce EV range by 15-25%. Battery cooling systems also draw power. Charge more frequently in summer.</p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4">
              <div className="text-2xl mb-1">❄️</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Cold Weather</h3>
              <p className="text-xs text-gray-600">Cold temperatures reduce battery efficiency by 20-40%. Pre-condition the battery while plugged in before departure.</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4">
              <div className="text-2xl mb-1">🌿</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Mild Weather</h3>
              <p className="text-xs text-gray-600">20-25°C is the sweet spot for EV range. Minimal AC/heating needed. Plan your road trips in spring or autumn when possible.</p>
            </div>
          </div>
        </div>

        {/* Region-by-region guidance */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">🌏 Regional Seasonal Guide</h2>
        <div className="space-y-4 mb-8">
          {Object.entries(countryGroups).map(([region, countries]) => (
            <div key={region} className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="text-base font-bold text-gray-900 mb-3">{region}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {countries.map(country => {
                  const info = regionSeasons[country];
                  if (!info) return null;
                  return (
                    <div key={country} className="bg-gray-50 rounded-xl p-3.5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span>{info.icon}</span>
                        <span className="text-sm font-bold text-gray-900 capitalize">{country}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1.5 font-medium">{info.months}</p>
                      <p className="text-[11px] text-gray-600">{info.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Month-by-month route recommendations */}
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-emerald-500" />
          Month-by-Month Route Recommendations
        </h2>

        <div className="space-y-6">
          {itinerariesByMonth.map(({ month, routes }) => (
            <div key={month.index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className={`bg-gradient-to-r ${month.color} px-5 py-3 flex items-center gap-3`}>
                <span className="text-2xl">{month.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-white">{month.name}</h3>
                  <p className="text-xs text-white/80">
                    {routes.length} recommended route{routes.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="p-4">
                {routes.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    No specific route recommendations for {month.name}. Check the regional guides above.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {routes.map(it => (
                      <Link
                        key={it.id}
                        href={`/routes/${it.slug}`}
                        className="group flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all"
                      >
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                          <Route size={18} className="text-emerald-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                            {it.title.split(':')[0] || it.title}
                          </h4>
                          <p className="text-[11px] text-gray-500 truncate">{it.cities.join(' → ')}</p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                            <span>{it.duration}</span>
                            <span>·</span>
                            <span>{it.totalDistanceKm}km</span>
                            <span>·</span>
                            <span className={`capitalize ${
                              it.difficulty === 'easy' ? 'text-emerald-500' :
                              it.difficulty === 'moderate' ? 'text-amber-500' :
                              'text-red-500'
                            }`}>{it.difficulty}</span>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-emerald-500 shrink-0 mt-1 transition-colors" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* EV range tips section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-5 md:p-6 mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Star size={20} className="text-amber-500" />
            Tips for Maximizing EV Range by Season
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-white/80 rounded-xl p-3.5 border border-amber-100">
              <h3 className="font-bold text-gray-900 mb-1 text-sm">☀️ Hot Weather Tips</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Pre-cool the cabin while plugged in before departure</li>
                <li>• Use seat ventilation instead of AC when possible</li>
                <li>• Park in shaded or covered parking to reduce battery temps</li>
                <li>• Plan charging during the cooler morning/evening hours</li>
              </ul>
            </div>
            <div className="bg-white/80 rounded-xl p-3.5 border border-amber-100">
              <h3 className="font-bold text-gray-900 mb-1 text-sm">❄️ Cold Weather Tips</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Pre-condition the battery while plugged in before driving</li>
                <li>• Use seat heaters instead of cabin heating (more efficient)</li>
                <li>• Keep the car plugged in overnight to maintain battery temp</li>
                <li>• Expect 20-40% range reduction in freezing conditions</li>
              </ul>
            </div>
            <div className="bg-white/80 rounded-xl p-3.5 border border-amber-100">
              <h3 className="font-bold text-gray-900 mb-1 text-sm">🌧️ Rainy Season Tips</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Allow longer following distance — wet roads increase stopping distance</li>
                <li>• Use regenerative braking to recapture energy in stop-and-go traffic</li>
                <li>• Rain increases rolling resistance — expect 5-10% range reduction</li>
                <li>• Pack rain gear for unexpected charging stops without shelter</li>
              </ul>
            </div>
            <div className="bg-white/80 rounded-xl p-3.5 border border-amber-100">
              <h3 className="font-bold text-gray-900 mb-1 text-sm">🌿 Optimal Season Tips</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 20-25°C is the ideal temperature for maximum EV range</li>
                <li>• Minimal climate control needed — maximize your driving range</li>
                <li>• Best time for mountain routes with elevation changes</li>
                <li>• Book hotels and car rentals well in advance (peak travel season)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA to routes */}
        <div className="mt-8 text-center">
          <Link
            href="/routes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl transition-all text-sm"
          >
            <Route size={16} />
            Browse All Routes
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
