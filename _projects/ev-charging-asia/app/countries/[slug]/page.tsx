import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Zap, Route as RouteIcon, MapPin, BatteryCharging, ChevronRight, Star, Clock, Users, ExternalLink, ArrowLeft } from 'lucide-react';
import { getAllItineraries } from '@/data/itineraries';
import SiteFooter from '@/components/SiteFooter';
import ItineraryCard from '@/components/itineraries/ItineraryCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { BreadcrumbSchemaSSR } from '@/components/SchemaOrg';

interface Props {
  params: { slug: string };
}

export const revalidate = 3600;

// Country metadata — SEO-driven country page config
const countryMeta: Record<string, {
  name: string;
  flag: string;
  description: string;
  hero: string;
  evStats: { label: string; value: string }[];
  fastChargeStandard: string;
  evAdoption: string;
  bestSeason: string;
  highwayQuality: string;
  chargingTip: string;
}> = {
  thailand: {
    name: 'Thailand',
    flag: '🇹🇭',
    description: 'Thailand has rapidly expanded its EV charging network across major highways and tourist destinations. With over 3,000 public chargers nationwide — 50–150 kW DC fast chargers along every major highway — it\'s one of Southeast Asia\'s most EV-friendly road trip destinations.',
    hero: 'Thailand is Southeast Asia\'s EV road trip paradise — tropical highways, beach resorts, mountain temples, and a fast-growing charging network that makes Bangkok-to-Phuket and Bangkok-to-Chiang Mai effortless in an electric vehicle.',
    evStats: [
      { label: 'Public Chargers', value: '3,000+' },
      { label: 'Fast DC (50kW+)', value: '1,200+' },
      { label: 'Networks', value: 'PEA Volta, EA Anywhere, MEA EV, Charge+, PTT EV' },
    ],
    fastChargeStandard: 'CCS2 (Type 2) — same as Europe. CHAdeMO available at some stations.',
    evAdoption: 'EV sales surged 400%+ in 2023-2025. BYD, MG, and Neta dominate the market. Government targets 30% EV production by 2030.',
    bestSeason: 'November to February — cool, dry weather (25-30°C). Avoid March-May (extreme heat) and July-October (monsoon).',
    highwayQuality: 'Excellent on main corridors: Phahonyothin Highway (Bangkok-Chiang Mai), Phetkasem Highway (Bangkok-Phuket). Mountain roads require caution in wet season.',
    chargingTip: 'Download PEA Volta and EA Anywhere apps before departing. Most 7-Eleven stores have chargers now. Hotel overnight charging is common at resorts.',
  },
  malaysia: {
    name: 'Malaysia',
    flag: '🇲🇾',
    description: 'Malaysia\'s North-South Expressway is one of Asia\'s best EV road trip corridors. From Singapore to Kuala Lumpur to Penang, Gentari and Charge+ have installed fast chargers every 80-100 km along the PLUS highway.',
    hero: 'Malaysia offers the most convenient cross-border EV experience in Asia. The North-South Expressway from Singapore to Penang is lined with DC fast chargers, making the Kuala Lumpur to Penang route and KL to Singapore route effortless.',
    evStats: [
      { label: 'Public Chargers', value: '2,500+' },
      { label: 'Fast DC (50kW+)', value: '800+' },
      { label: 'Networks', value: 'Gentari, Charge+, TNB Electron, JomCharge, EV Connection' },
    ],
    fastChargeStandard: 'CCS2 (Type 2). CHAdeMO at some older stations.',
    evAdoption: 'Government targets 15% EV adoption by 2030. Strong incentives include tax exemptions and toll rebates for EVs.',
    bestSeason: 'December to February (west coast dry season) and June to August (east coast). Year-round tropical temperatures 25-32°C.',
    highwayQuality: 'Excellent. PLUS Highway is well-maintained with regular rest stops. City driving in KL can be congested.',
    chargingTip: 'Register for Gentari and Charge+ apps before your trip. Touch \'n Go RFID is essential for tolls. Most rest stops (R&R) have charging.',
  },
  singapore: {
    name: 'Singapore',
    flag: '🇸🇬',
    description: 'Singapore has over 2,800 public charging points across the island, with SP Group, Charge+, and BlueSG leading the network. Tesla V3 Superchargers are widely available. The city-state is a model for urban EV infrastructure.',
    hero: 'Singapore is the densest EV charging market in Southeast Asia. With over 2,800 public chargers island-wide and a target of 60,000 by 2030, you\'re never more than a few minutes from a charger.',
    evStats: [
      { label: 'Public Chargers', value: '2,800+' },
      { label: 'Fast DC (50kW+)', value: '600+' },
      { label: 'Networks', value: 'SP Group, Charge+, BlueSG, Shell Recharge, Tesla' },
    ],
    fastChargeStandard: 'CCS2 (Type 2). Tesla Superchargers use NACS (adapters available).',
    evAdoption: 'EVs hit 18% of new car sales in 2025. Government targets all new car registrations to be EVs by 2030.',
    bestSeason: 'Year-round tropical (25-32°C). February to July is slightly drier. Occasional thunderstorms year-round.',
    highwayQuality: 'Excellent roads throughout. ERP gantries require in-vehicle unit. Toll-free for EVs until further notice.',
    chargingTip: 'Download SP Group and Charge+ apps. HDB car parks have overnight AC charging. Shopping malls offer the fastest DC chargers.',
  },
  japan: {
    name: 'Japan',
    flag: '🇯🇵',
    description: 'Japan has one of Asia\'s most mature EV charging networks, with over 30,000 chargers nationwide. The Tomei and Meishin Expressways connecting Tokyo, Osaka, and Nagoya have CHAdeMO chargers at most service areas.',
    hero: 'Japan combines world-class highways with breathtaking scenery. Drive the Tomei Expressway from Tokyo to Osaka, explore Hakone and Mount Fuji, or take the mountain roads through the Japanese Alps — all with reliable CHAdeMO coverage.',
    evStats: [
      { label: 'Public Chargers', value: '30,000+' },
      { label: 'Fast DC (50kW+)', value: '8,000+' },
      { label: 'Networks', value: 'NCS (Next Charge Service), e-Mobility Power, Tesla Supercharger, CHAdeMO' },
    ],
    fastChargeStandard: 'CHAdeMO (dominant). CCS2 growing. Tesla uses NACS with CHAdeMO adapter.',
    evAdoption: 'Government targets 100% EV sales by 2035. Toyota, Nissan, and Honda are investing heavily.',
    bestSeason: 'Spring (March-May) for cherry blossoms. Autumn (October-November) for foliage. Winter driving requires snow tires in mountains.',
    highwayQuality: 'Excellent. Expressways are toll roads with ETC card required. Service areas are clean and well-equipped.',
    chargingTip: 'Get an NCS charging card. ETC card is essential for expressways. Many convenience stores and hotels offer overnight charging.',
  },
  india: {
    name: 'India',
    flag: '🇮🇳',
    description: 'India\'s EV charging infrastructure is growing rapidly, led by Tata Power and Statiq. The Yamuna Expressway (Delhi-Agra) has excellent coverage, and the Delhi-Jaipur corridor is well-served. Major cities have growing charging networks.',
    hero: 'India\'s Golden Triangle — Delhi, Jaipur, Agra — is becoming increasingly EV-friendly. Tata Power chargers line the Yamuna Expressway, and luxury hotels in all three cities now offer EV charging.',
    evStats: [
      { label: 'Public Chargers', value: '12,000+' },
      { label: 'Fast DC (50kW+)', value: '3,000+' },
      { label: 'Networks', value: 'Tata Power, Statiq, EESL, ChargeZone, Fortum' },
    ],
    fastChargeStandard: 'CCS2 (Type 2) — India has adopted the European standard.',
    evAdoption: 'Government targets 30% EV sales by 2030. Tata, MG, and Mahindra lead the market.',
    bestSeason: 'October to March — pleasant weather (15-25°C in the north). Avoid April-June (extreme heat, 40°C+) and July-September (monsoon).',
    highwayQuality: 'Good on major corridors (Yamuna Expressway, NH48). City traffic can be chaotic. Allow extra time.',
    chargingTip: 'Download Tata Power EZ Charge and Statiq apps. Book hotels with EV charging in advance. Plan around city traffic.',
  },
  indonesia: {
    name: 'Indonesia',
    flag: '🇮🇩',
    description: 'Indonesia\'s EV ecosystem is centered on Bali and Jakarta. Go-Ion Bali offers dedicated EV rentals with a comprehensive charging map. Jakarta has growing SPKLU (government) and private networks. The Trans-Java toll road is getting charger coverage.',
    hero: 'Bali is Indonesia\'s EV road trip capital — compact (140km tip to tip), Go-Ion\'s dedicated EV rentals, and charging coverage across Seminyak, Ubud, Sanur, Nusa Dua, and Uluwatu. Perfect for a family EV holiday.',
    evStats: [
      { label: 'Public Chargers', value: '2,000+' },
      { label: 'Fast DC (50kW+)', value: '400+' },
      { label: 'Networks', value: 'Go-Ion, SPKLU (PLN), Charge+, Tesla Supercharger (Bali)' },
    ],
    fastChargeStandard: 'CCS2 (Type 2). CHAdeMO available at some stations.',
    evAdoption: 'Government targets 600,000 EVs by 2030. Incentives include reduced import duties.',
    bestSeason: 'April to October (dry season). November to March is wet season with potential flooding on local roads.',
    highwayQuality: 'Good on toll roads (Bali Mandara). Local roads in Ubud and Uluwatu are narrow and winding.',
    chargingTip: 'Rent from Go-Ion Bali (includes charging card). Most luxury hotels have overnight wall charging. Download the Go-Ion app for live charger maps.',
  },
  vietnam: {
    name: 'Vietnam',
    flag: '🇻🇳',
    description: 'Vietnam is rapidly building EV infrastructure, led by VinFast\'s nationwide network and growing third-party chargers. The Hanoi to Ha Long Bay route is well-served. Ho Chi Minh City and Da Nang have expanding urban coverage.',
    hero: 'Vietnam\'s 2,000km coastline and dramatic landscapes are becoming accessible by EV. The Hanoi to Ha Long Bay route is the most popular, with VinFast\'s fast chargers making the trip possible in a VF 8 or VF 9.',
    evStats: [
      { label: 'Public Chargers', value: '150,000+ (VinFast network)' },
      { label: 'Fast DC (50kW+)', value: '10,000+' },
      { label: 'Networks', value: 'VinFast, EVOne, EVN, Dat Group' },
    ],
    fastChargeStandard: 'CCS2 (Type 2). VinFast uses European standard.',
    evAdoption: 'VinFast dominates with over 50,000 EVs sold. Government targets 1 million EVs by 2030.',
    bestSeason: 'Spring (March-April) and autumn (September-November). Avoid summer heat and winter drizzle in the north.',
    highwayQuality: 'Good on national highways. Ha Long Bay road is excellent. City driving in Hanoi and HCMC is congested.',
    chargingTip: 'VinFast owners have access to the extensive VinFast charging network. Third-party apps like EVOne are growing.',
  },
  china: {
    name: 'China',
    flag: '🇨🇳',
    description: 'China has the world\'s largest EV charging network with over 8 million chargers. Expressways nationwide have fast chargers every 50km. Guangdong-Hong Kong-Macau Greater Bay Area is particularly well-covered, making Shenzhen to Zhuhai and Macau routes seamless.',
    hero: 'China\'s EV charging infrastructure is unmatched — over 8 million chargers nationwide. The Guangdong province routes (Shenzhen, Zhuhai, Guangzhou) and Hong Kong-Macau cross-border routes are completely EV-ready.',
    evStats: [
      { label: 'Public Chargers', value: '8,000,000+' },
      { label: 'Fast DC (120kW+)', value: '3,000,000+' },
      { label: 'Networks', value: 'TELD (特来电), Star Charge (星星充电), State Grid, CAMS (蔚来), XPeng' },
    ],
    fastChargeStandard: 'GB/T (Chinese standard). Adapter required for foreign EVs.',
    evAdoption: 'Over 50% of new car sales are now EVs or PHEVs. BYD is the world\'s largest EV manufacturer.',
    bestSeason: 'Spring (March-May) and autumn (September-November). Summer is hot and humid in the south. Winter is cold in the north.',
    highwayQuality: 'Excellent. Expressways are world-class. Toll roads require ETC or manual payment.',
    chargingTip: 'Install TELD (特来电) and Star Charge (星星充电) apps. WeChat Pay or Alipay is essential. GB/T adapter needed for CCS2 vehicles.',
  },
  philippines: {
    name: 'Philippines',
    flag: '🇵🇭',
    description: 'The Philippines is building its EV ecosystem, with growing coverage on the Manila to Baguio route and major city centers. AC Motors / ACMobility leads the charging network, with stations at Shell gas stations and Ayala Malls.',
    hero: 'The Manila to Baguio route is the Philippines\' premier EV road trip — from tropical lowlands to the cool pine forests of Benguet at 1,500m elevation. AC Motors chargers at Shell stations make the 250km journey possible.',
    evStats: [
      { label: 'Public Chargers', value: '500+' },
      { label: 'Fast DC (50kW+)', value: '150+' },
      { label: 'Networks', value: 'ACMobility, Shell Recharge, Ayala Malls, E-Power Mo' },
    ],
    fastChargeStandard: 'CCS2 (Type 2). CHAdeMO at some locations.',
    evAdoption: 'Early stage — EVs are a small fraction of new car sales. Government incentives are emerging.',
    bestSeason: 'November to May (dry season). Avoid June to October (typhoon/rainy season).',
    highwayQuality: 'Good on major routes (NLEX, SCTEX, TPLEX). Local roads in Baguio are steep and winding.',
    chargingTip: 'Check ACMobility app for charger availability. Shell stations with charging are the most reliable. Plan for longer charging times.',
  },
  korea: {
    name: 'South Korea',
    flag: '🇰🇷',
    description: 'South Korea has one of the world\'s most advanced EV charging networks. Ultra-fast 350kW chargers are common on major expressways. The Seoul to Busan corridor via the Gyeongbu Expressway is fully covered with chargers every 30-40km.',
    hero: 'South Korea\'s EV infrastructure is world-class. Drive from Seoul to Busan on the Gyeongbu Expressway with 350kW ultra-fast chargers every 30km. Explore Gyeongju\'s ancient temples, then arrive in Busan with battery to spare.',
    evStats: [
      { label: 'Public Chargers', value: '200,000+' },
      { label: 'Fast DC (100kW+)', value: '30,000+' },
      { label: 'Networks', value: 'KEPCO, EVSIS, SK Signet, GS Caltex, Hyundai E-pit' },
    ],
    fastChargeStandard: 'CCS2 (Type 2) and CHAdeMO (older). Tesla Superchargers use NACS.',
    evAdoption: 'EVs are 10%+ of new car sales. Hyundai, Kia, and Genesis lead the market. Government is aggressively expanding charging.',
    bestSeason: 'Spring (April-June) and autumn (September-November). Winter (December-February) is cold with significant EV range reduction.',
    highwayQuality: 'Excellent. Expressways are among the best in Asia. Toll roads require Hi-Pass (ETC) or cash.',
    chargingTip: 'Download KEPCO and EVSIS apps. Hyundai E-pit ultra-fast chargers are the fastest option. Winter range can drop 30-40%.',
  },
};

export async function generateStaticParams() {
  return Object.keys(countryMeta).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = countryMeta[params.slug];
  if (!meta) return { title: 'Country Not Found' };

  return {
    title: `EV Road Trips in ${meta.name} — Routes, Charging & Tips | EV Charging Asia`,
    description: meta.description.slice(0, 160),
    alternates: {
      canonical: `https://ev-charging-asia.vercel.app/countries/${params.slug}`,
    },
    openGraph: {
      title: `Explore ${meta.name} by EV — Road Trips & Charging Guide`,
      description: meta.description.slice(0, 160),
      url: `https://ev-charging-asia.vercel.app/countries/${params.slug}`,
      type: 'website',
      locale: 'en_US',
      siteName: 'EV Charging Asia',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Explore ${meta.name} by EV — Road Trips & Charging Guide`,
      description: meta.description.slice(0, 160),
    },
  };
}

export default function CountryPage({ params }: Props) {
  const meta = countryMeta[params.slug];
  if (!meta) notFound();

  const allItineraries = getAllItineraries();
  const countryItineraries = allItineraries.filter(it =>
    it.countries.some(c => c.toLowerCase() === params.slug)
  );

  const totalKm = countryItineraries.reduce((sum, i) => sum + i.totalDistanceKm, 0);
  const totalDays = Math.max(...countryItineraries.map(i => i.days.length));

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', url: 'https://ev-charging-asia.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Routes', url: 'https://ev-charging-asia.vercel.app/routes' },
      { '@type': 'ListItem', position: 3, name: meta.name, url: `https://ev-charging-asia.vercel.app/countries/${params.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchemaSSR items={[
        { name: 'Home', url: '/' },
        { name: 'Routes', url: '/routes' },
        { name: meta.name, url: `/countries/${params.slug}` },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <Link href="/routes" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft size={14} /> All routes
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{meta.flag}</span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
              {countryItineraries.length} Route{countryItineraries.length !== 1 ? 's' : ''}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            EV Road Trips in {meta.name}
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            {meta.hero}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <RouteIcon size={22} className="mx-auto text-sky-500 mb-1.5" />
            <div className="text-xl font-bold text-gray-900">{countryItineraries.length}</div>
            <div className="text-xs text-gray-500">Curated Routes</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <MapPin size={22} className="mx-auto text-amber-500 mb-1.5" />
            <div className="text-xl font-bold text-gray-900">{totalKm.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total km</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <BatteryCharging size={22} className="mx-auto text-emerald-500 mb-1.5" />
            <div className="text-xl font-bold text-gray-900">{meta.evStats[0].value}</div>
            <div className="text-xs text-gray-500">{meta.evStats[0].label}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <Clock size={22} className="mx-auto text-purple-500 mb-1.5" />
            <div className="text-xl font-bold text-gray-900">{totalDays}</div>
            <div className="text-xs text-gray-500">Max Trip Days</div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main: route cards */}
          <div className="lg:col-span-2 space-y-6">
            {countryItineraries.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                <p className="text-gray-400">No routes available for this country yet. Check back soon!</p>
              </div>
            ) : (
              countryItineraries.map(it => (
                <ItineraryCard key={it.id} itinerary={it} />
              ))
            )}

            {/* CTA */}
            <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Plan Your {meta.name} EV Road Trip
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Not sure which route is right? Compare all {meta.name} routes side by side.
              </p>
              <Link
                href={`/compare?country=${params.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors"
              >
                <ExternalLink size={14} /> Compare Routes
              </Link>
            </div>
          </div>

          {/* Sidebar: country info */}
          <div className="space-y-6">
            {/* EV Stats */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 bg-gradient-to-r from-emerald-50 to-white border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <BatteryCharging size={16} className="text-emerald-500" />
                  EV Infrastructure
                </h3>
              </div>
              <div className="p-5 space-y-3">
                {meta.evStats.map((stat, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{stat.label}</span>
                    <span className="font-semibold text-gray-900 text-right">{stat.value}</span>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="text-xs text-gray-500 mb-1">Charging Standard</div>
                  <div className="text-xs text-gray-800 font-medium">{meta.fastChargeStandard}</div>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="text-xs text-gray-500 mb-1">EV Adoption</div>
                  <div className="text-xs text-gray-800 font-medium">{meta.evAdoption}</div>
                </div>
              </div>
            </div>

            {/* Best Season */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Star size={16} className="text-amber-500" />
                Best Season
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">{meta.bestSeason}</p>
            </div>

            {/* Highway Conditions */}
            <div className="bg-sky-50 rounded-2xl border border-sky-200 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <RouteIcon size={16} className="text-sky-500" />
                Highway Quality
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">{meta.highwayQuality}</p>
            </div>

            {/* Charging Tip */}
            <div className="bg-purple-50 rounded-2xl border border-purple-200 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Users size={16} className="text-purple-500" />
                Pro Tip
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">{meta.chargingTip}</p>
            </div>

            {/* Newsletter */}
            <NewsletterSignup variant="inline" source={`country-${params.slug}`} />
          </div>
        </div>

        {/* Cross-reference: all countries */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Explore Other Countries</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Object.entries(countryMeta)
              .filter(([slug]) => slug !== params.slug)
              .map(([slug, info]) => (
                <Link
                  key={slug}
                  href={`/countries/${slug}`}
                  className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-sm transition-all text-sm"
                >
                  <span>{info.flag}</span>
                  <span className="font-medium text-gray-900">{info.name}</span>
                  <ChevronRight size={12} className="ml-auto text-gray-300" />
                </Link>
              ))}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
