import { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap, MapPin, BatteryCharging, ChevronRight, Smartphone,
  DollarSign, Hotel, Car, Route, Shield, Wifi,
  ArrowLeft, ExternalLink, CheckCircle2, AlertTriangle,
  Plug, Cpu, Calendar, BookOpen
} from 'lucide-react';
import SiteFooter from '@/components/SiteFooter';
import NewsletterSignup from '@/components/NewsletterSignup';

export const metadata: Metadata = {
  title: 'Thailand EV Charging Guide — Networks, Costs & Road Trip Tips',
  description: 'Complete guide to EV charging in Thailand. All major networks (EA Anywhere, PTT EV Station PluZ, Charge+, EVolt, MCharge), costs, charger types, payment methods, and route tips for Bangkok—Phuket, Bangkok—Chiang Mai, and more.',
  openGraph: {
    title: 'Thailand EV Charging Guide — Networks, Costs & Road Trip Tips | EV Charging Asia',
    description: 'Complete guide to EV charging in Thailand. Networks, costs, charger types, and road trip tips for driving electric in the Land of Smiles.',
    url: 'https://ev-charging-asia.vercel.app/thailand/ev-charging-guide',
    type: 'article',
    siteName: 'EV Charging Asia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thailand EV Charging Guide — Networks, Costs & Road Trip Tips',
    description: 'Complete guide to EV charging in Thailand. Networks, costs, charger types, and road trip tips for driving electric in the Land of Smiles.',
  },
  alternates: {
    canonical: 'https://ev-charging-asia.vercel.app/thailand/ev-charging-guide',
  },
};

const NetworkList = [
  { name: 'EA Anywhere (Energy Absolute)', coverage: 'Bangkok, Pattaya, Phuket, Chiang Mai, highways', chargers: '50 kW DC, 120 kW DC, AC', plugType: 'CCS2, CHAdeMO, Type 2', payment: 'App, card, QR code', speed: 'Fast', note: 'Largest public network in Thailand. Great coverage on main highways.' },
  { name: 'PTT EV Station PluZ', coverage: 'PTT petrol stations nationwide', chargers: '50 kW DC, 60 kW DC', plugType: 'CCS2, CHAdeMO', payment: 'App, PTT Blue Card', speed: 'Good', note: 'Integrated with PTT fuel stations — very reliable for long-distance travel.' },
  { name: 'PEA Volta', coverage: 'Government-run, expanding across provinces', chargers: '22 kW AC, 50 kW DC', plugType: 'CCS2, Type 2', payment: 'App', speed: 'Moderate', note: 'Provincial Electricity Authority network. Good for upcountry routes.' },
  { name: 'MEA EV', coverage: 'Bangkok metropolitan area', chargers: '22 kW AC, 50 kW DC', plugType: 'CCS2, Type 2', payment: 'App', speed: 'Moderate', note: 'Metro Electricity Authority network. Focused on greater Bangkok.' },
  { name: 'Charge+ (EVPower)', coverage: 'Bangkok, Pattaya, Hua Hin, Phuket', chargers: '50 kW DC, 180 kW DC', plugType: 'CCS2, CHAdeMO', payment: 'App, RFID card', speed: 'Very Fast', note: 'Singapore operator expanding in Thailand. Ultra-fast 180 kW units available.' },
  { name: 'EVolt (B. Grimm)', coverage: 'Bangkok, major shopping malls', chargers: '50 kW DC, 150 kW DC', plugType: 'CCS2, CHAdeMO, Type 2', payment: 'App', speed: 'Fast', note: 'Often found in premium malls like Siam Paragon, EmQuartier.' },
  { name: 'MCharge (Motorist)', coverage: 'Bangkok, Pattaya, Rayong', chargers: '50 kW DC, 200 kW DC', plugType: 'CCS2, CHAdeMO', payment: 'App', speed: 'Ultra Fast', note: 'New entrant with some of the fastest chargers in Thailand.' },
  { name: 'Tesla Supercharger', coverage: 'Bangkok, Pattaya, Phuket, Hua Hin', chargers: '150 kW, 250 kW V3', plugType: 'NACS (Tesla)', payment: 'App (pay-per-use)', speed: 'Ultra Fast', note: 'Expanding rapidly. Some stations opening to non-Tesla vehicles.' },
  { name: 'ChargeNow (BMW/Ministry)', coverage: 'Bangkok luxury hotels, shopping malls', chargers: '11 kW AC, 50 kW DC', plugType: 'CCS2, Type 2', payment: 'App', speed: 'Moderate', note: 'BMW-backed network. Often found at luxury hotel partners.' },
  { name: 'EleX by EGAT', coverage: 'Government buildings, select highways', chargers: '22 kW AC, 60 kW DC', plugType: 'CCS2, Type 2', payment: 'App', speed: 'Moderate', note: 'Electricity Generating Authority of Thailand — pilot program expanding.' },
];

const Faqs = [
  {
    q: 'What charging plug does Thailand use?',
    a: 'Thailand uses CCS2 (Combo 2) as the standard for DC fast charging — the same as Europe. CHAdeMO is also available at many stations but declining. Type 2 (Mennekes) is used for AC charging. Tesla uses NACS at Supercharger stations.',
  },
  {
    q: 'Can I drive from Bangkok to Phuket in an EV?',
    a: 'Yes, absolutely. The 840 km journey is well-covered: Bangkok → Hua Hin (200 km, multiple chargers) → Chumphon (250 km, EA Anywhere at PTT stations) → Phuket (390 km, chargers throughout Phuket). Plan one 30–40 min fast charge stop.',
  },
  {
    q: 'Can I drive from Bangkok to Chiang Mai in an EV?',
    a: 'Yes. The 700 km journey on Highway 1 (Phahonyothin) is lined with PTT EV Station PluZ and EA Anywhere chargers every 60–80 km. Charge at Ayutthaya, Nakhon Sawan, and Lampang. Total charging time: approximately one hour with two stops.',
  },
  {
    q: 'How much does EV charging cost in Thailand?',
    a: 'DC fast charging costs 7–12 THB/kWh (~$0.20–$0.35 USD/kWh). A full charge for a 60 kWh battery costs 420–720 THB (~$12–$20 USD). AC slow charging is cheaper at 3–5 THB/kWh (~$0.08–$0.15 USD/kWh). Many hotels offer free AC charging for guests.',
  },
  {
    q: 'Which EV charging app is best for Thailand?',
    a: 'We recommend installing at least three apps before your trip: EA Anywhere (largest network), EV Station PluZ (PTT petrol stations), and MEA EV / PEA Volta (government networks). Tesla owners can rely on the Tesla app.',
  },
  {
    q: 'Is hotel EV charging common in Thailand?',
    a: 'Yes, especially at mid-range and luxury hotels. Many resorts in Phuket, Krabi, Hua Hin, Pattaya, and Koh Samui offer complimentary overnight AC charging. Always confirm with the hotel before booking — mention you drive an EV.',
  },
];

const CityData = [
  {
    name: 'Bangkok',
    description: 'Thailand\'s EV capital. Over 1,000 public charging stations across the city. Shopping malls (Siam Paragon, CentralWorld, EmQuartier) have the fastest DC chargers. Condos in Sukhumvit and Thonglor increasingly offer resident charging.',
    chargers: '1,000+',
    bestNetworks: 'EA Anywhere, MEA EV, EVolt, Tesla Supercharger',
    tips: 'Charge at shopping malls during your visit. Many condos in Sukhumvit now have overnight charging for guests staying via Airbnb.',
  },
  {
    name: 'Phuket',
    description: 'Thailand\'s most EV-ready island destination. Charging stations are concentrated along the west coast: Patong, Kata, Karon, and along the main route from Phuket Town to the beaches.',
    chargers: '200+',
    bestNetworks: 'EA Anywhere, PTT EV Station PluZ, Tesla Supercharger',
    tips: 'Most luxury resorts (Amanpuri, Trisara, Banyan Tree) offer complimentary EV charging. The island is only 50 km end-to-end — range is never a concern.',
  },
  {
    name: 'Pattaya',
    description: 'Popular weekend getaway from Bangkok (150 km). Charging is plentiful along Sukhumvit Road and near Walking Street. Jomtien Beach has growing coverage.',
    chargers: '150+',
    bestNetworks: 'EA Anywhere, Charge+, PTT EV Station PluZ',
    tips: 'The 150 km drive from Bangkok uses less than 50% battery in most EVs. Arrive with plenty of range.',
  },
  {
    name: 'Chiang Mai',
    description: 'Gateway to northern Thailand road trips. The city itself has good charging coverage. Routes to Pai, Chiang Rai, and Doi Inthanon require careful planning.',
    chargers: '100+',
    bestNetworks: 'EA Anywhere, PEA Volta, PTT EV Station PluZ',
    tips: 'Mountain driving consumes more energy. Charge fully before heading to Pai or Doi Inthanon. November–February is peak season with increased charger demand.',
  },
  {
    name: 'Hua Hin',
    description: 'Royal beach town, 200 km south of Bangkok. Excellent charging options at Hua Hin Market Village, BluPort Mall, and most resort hotels.',
    chargers: '80+',
    bestNetworks: 'EA Anywhere, EVolt, Charge+',
    tips: 'An easy day trip from Bangkok. Charge at BluPort Mall while exploring the town.',
  },
];

export default function ThailandEVChargingGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', url: 'https://ev-charging-asia.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Thailand', url: 'https://ev-charging-asia.vercel.app/countries/thailand' },
      { '@type': 'ListItem', position: 3, name: 'EV Charging Guide', url: 'https://ev-charging-asia.vercel.app/thailand/ev-charging-guide' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Thailand EV Charging Guide — Networks, Costs & Road Trip Tips',
            description: 'Complete guide to EV charging in Thailand covering all major networks, costs, charger types, payment methods, city-by-city breakdowns, and road trip tips.',
            image: 'https://ev-charging-asia.vercel.app/og-image.jpg',
            author: { '@type': 'Person', name: 'EV Charging Asia' },
            datePublished: '2026-04-01',
            dateModified: '2026-05-29',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: Faqs.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/search" className="hover:text-gray-900">Search</Link>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
            <Link href="/countries/thailand" className="hover:text-gray-900">Thailand Routes</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight size={14} />
            <Link href="/countries/thailand" className="hover:text-gray-700">Thailand</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">EV Charging Guide</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🇹🇭</span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
              Complete Guide
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Thailand EV Charging Guide — 2026
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            Everything you need to know about charging an electric vehicle in the Land of Smiles.
            From Bangkok&apos;s shopping mall chargers to mountain routes in Chiang Mai,
            Thailand is one of Southeast Asia&apos;s most EV-ready road trip destinations.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-5 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> Updated May 2026</span>
            <span className="flex items-center gap-1.5"><BookOpen size={14} /> 15 min read</span>
            <span className="hidden sm:flex items-center gap-1.5"><MapPin size={14} /> 3,000+ chargers nationwide</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-3">On this page</h2>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <Link href="#overview" className="text-sky-600 hover:text-sky-700 hover:underline">1. Overview — EV in Thailand</Link>
            <Link href="#networks" className="text-sky-600 hover:text-sky-700 hover:underline">2. Charging Networks</Link>
            <Link href="#charger-types" className="text-sky-600 hover:text-sky-700 hover:underline">3. Charger Types & Plugs</Link>
            <Link href="#city-by-city" className="text-sky-600 hover:text-sky-700 hover:underline">4. City-by-City Guide</Link>
            <Link href="#costs" className="text-sky-600 hover:text-sky-700 hover:underline">5. Costs & Payment</Link>
            <Link href="#road-trips" className="text-sky-600 hover:text-sky-700 hover:underline">6. Road Trip Routes</Link>
            <Link href="#hotels" className="text-sky-600 hover:text-sky-700 hover:underline">7. Hotel Charging</Link>
            <Link href="#apps" className="text-sky-600 hover:text-sky-700 hover:underline">8. Essential Apps</Link>
            <Link href="#faq" className="text-sky-600 hover:text-sky-700 hover:underline">9. FAQ</Link>
          </nav>
        </div>

        {/* 1. Overview */}
        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap size={22} className="text-emerald-500" />
            Overview — EV in Thailand
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              Thailand has rapidly emerged as Southeast Asia&apos;s most EV-friendly road trip destination.
              With <strong>over 3,000 public charging stations</strong> nationwide and aggressive government
              targets — <strong>30% of all vehicle production by 2030</strong> — the charging infrastructure
              is expanding faster than almost anywhere else in the region.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The EV market has surged: BYD, MG, Neta, Great Wall Motors (Ora), and NETA dominate sales.
              Even legacy brands like Toyota and Honda are rapidly electrifying their Thai lineups.
              The government offers significant import duty reductions and excise tax cuts for EVs,
              making Thailand one of the most affordable places in Asia to buy and run an electric car.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <BatteryCharging size={22} className="mx-auto text-emerald-500 mb-1.5" />
              <div className="text-xl font-bold text-gray-900">3,000+</div>
              <div className="text-xs text-gray-500">Public Chargers</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <Plug size={22} className="mx-auto text-sky-500 mb-1.5" />
              <div className="text-xl font-bold text-gray-900">1,200+</div>
              <div className="text-xs text-gray-500">DC Fast (50 kW+)</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <MapPin size={22} className="mx-auto text-amber-500 mb-1.5" />
              <div className="text-xl font-bold text-gray-900">10+</div>
              <div className="text-xs text-gray-500">Networks</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <Car size={22} className="mx-auto text-purple-500 mb-1.5" />
              <div className="text-xl font-bold text-gray-900">400%+</div>
              <div className="text-xs text-gray-500">EV Sales Growth (2023–25)</div>
            </div>
          </div>
        </section>

        {/* 2. Charging Networks */}
        <section id="networks" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Cpu size={22} className="text-sky-500" />
            Charging Networks in Thailand
          </h2>
          <p className="text-gray-600 mb-5">
            Thailand has a diverse charging ecosystem with multiple competing networks.
            Here&apos;s every major operator, what they offer, and where you&apos;ll find them.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Network</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 hidden md:table-cell">Coverage</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 hidden lg:table-cell">Chargers</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 hidden sm:table-cell">Plug</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Payment</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 hidden md:table-cell">Speed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {NetworkList.map((net, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{net.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{net.note}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell max-w-[200px]">{net.coverage}</td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{net.chargers}</td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{net.plugType}</td>
                    <td className="px-4 py-3 text-gray-600">{net.payment}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        net.speed === 'Ultra Fast' ? 'bg-purple-100 text-purple-700' :
                        net.speed === 'Very Fast' ? 'bg-sky-100 text-sky-700' :
                        net.speed === 'Fast' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {net.speed}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Charger Types */}
        <section id="charger-types" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Plug size={22} className="text-amber-500" />
            Charger Types & Plugs in Thailand
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <BatteryCharging size={18} className="text-emerald-500" />
                AC Charging (Slow)
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" /> <span><strong>Type 2 (Mennekes)</strong> — Standard AC plug at hotels, condos, and shopping malls</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" /> <span><strong>Power:</strong> 3.7 kW to 22 kW</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" /> <span><strong>Best for:</strong> Overnight hotel charging, workplace charging</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" /> <span><strong>Cost:</strong> 3–5 THB/kWh (~$0.08–$0.15/kWh)</span></li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <BatteryCharging size={18} className="text-sky-500" />
                DC Fast Charging
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-500 mt-1 shrink-0" /> <span><strong>CCS2 (Combo 2)</strong> — Dominant standard. Same as Europe.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-500 mt-1 shrink-0" /> <span><strong>CHAdeMO</strong> — Available at many existing stations (declining)</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-500 mt-1 shrink-0" /> <span><strong>Power:</strong> 50 kW to 250 kW (Tesla V3)</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-500 mt-1 shrink-0" /> <span><strong>Cost:</strong> 7–12 THB/kWh (~$0.20–$0.35/kWh)</span></li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-5">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <AlertTriangle size={16} className="text-amber-500" />
              Important: NACS (Tesla) in Thailand
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Tesla Superchargers in Thailand use NACS (North American Charging Standard).
              Most non-Tesla EVs in Thailand use CCS2. <strong>Adapters are available</strong> for some
              CCS2 vehicles to use Tesla Superchargers, and Tesla is opening its network to non-Tesla
              EVs in some regions. Check the Tesla app for compatibility before arriving.
            </p>
          </div>
        </section>

        {/* 4. City-by-City Guide */}
        <section id="city-by-city" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={22} className="text-red-500" />
            City-by-City Charging Guide
          </h2>
          <div className="space-y-4">
            {CityData.map((city, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{city.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{city.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400 text-xs block">Public Chargers</span>
                    <span className="font-semibold text-gray-900">{city.chargers}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-400 text-xs block">Best Networks</span>
                    <span className="font-medium text-gray-700">{city.bestNetworks}</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-start gap-1.5">
                  <Shield size={12} className="mt-0.5 shrink-0 text-sky-500" />
                  <span>{city.tips}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Costs & Payment */}
        <section id="costs" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign size={22} className="text-emerald-500" />
            Costs & Payment Methods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-3">Typical Charging Costs</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 font-medium text-gray-500">Type</th>
                    <th className="text-right py-2 font-medium text-gray-500">Per kWh</th>
                    <th className="text-right py-2 font-medium text-gray-500">60 kWh Full</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-900">AC Slow (Hotel)</td>
                    <td className="py-2 text-right text-gray-900">3–5 THB</td>
                    <td className="py-2 text-right text-gray-900">180–300 THB</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-900">DC Fast (50 kW)</td>
                    <td className="py-2 text-right text-gray-900">7–9 THB</td>
                    <td className="py-2 text-right text-gray-900">420–540 THB</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-900">DC Ultra-Fast (150 kW+)</td>
                    <td className="py-2 text-right text-gray-900">9–12 THB</td>
                    <td className="py-2 text-right text-gray-900">540–720 THB</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-900">Tesla Supercharger</td>
                    <td className="py-2 text-right text-gray-900">~10 THB</td>
                    <td className="py-2 text-right text-gray-900">~600 THB</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-3">Payment Methods</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Smartphone size={16} className="text-sky-500 mt-0.5 shrink-0" />
                  <span><strong>Mobile Apps</strong> — Every network has its own app. Register before your trip. Apps accept credit cards and Thai bank accounts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wifi size={16} className="text-sky-500 mt-0.5 shrink-0" />
                  <span><strong>QR Code Payment</strong> — Scan with Thai banking apps (PromptPay) at many stations. Very convenient if you have a Thai bank account.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" fill="none"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  </svg>
                  <span><strong>RFID Cards</strong> — Charge+ and some EA Anywhere stations accept RFID cards. Convenient if you don&apos;t want to use your phone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" fill="none"/>
                    <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
                    <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                  <span><strong>Credit/Debit Card</strong> — Growing number of stations accept direct card payments. Most reliable at PTT EV Station PluZ locations.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        
        {/* 6. Road Trip Routes */}
        <section id="road-trips" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Route size={22} className="text-indigo-500" />
            Best EV Road Trip Routes
          </h2>
          <p className="text-gray-600 mb-5">
            Thailand offers some of Southeast Asia's most scenic EV road trips. Here are our top recommendations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-2">🚗 Bangkok → Chiang Mai</h3>
              <p className="text-sm text-gray-600 mb-2"><strong>Distance:</strong> ~700 km · <strong>Drive time:</strong> 8–9 hours</p>
              <p className="text-sm text-gray-600 mb-3">Highway 1 (Phahonyothin) via Ayutthaya, Nakhon Sawan, Tak, and Lampang. PTT EV and EA Anywhere chargers every 60–80 km. One of Thailand's most scenic drives through changing landscapes.</p>
              <Link href="/countries/thailand" className="text-sm text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-1">
                Thailand routes <ExternalLink size={12} />
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-2">🚗 Bangkok → Phuket</h3>
              <p className="text-sm text-gray-600 mb-2"><strong>Distance:</strong> ~840 km · <strong>Drive time:</strong> 10–11 hours</p>
              <p className="text-sm text-gray-600 mb-3">Highway 4 (Phetkasem) via Hua Hin, Chumphon, and Surat Thani. Well-covered with EA Anywhere at PTT stations. Plan one 30–40 min DC fast charge stop. Overnight in Hua Hin recommended.</p>
              <Link href="/countries/thailand" className="text-sm text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-1">
                Thailand routes <ExternalLink size={12} />
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-2">🚗 Bangkok → Pattaya</h3>
              <p className="text-sm text-gray-600 mb-2"><strong>Distance:</strong> ~150 km · <strong>Drive time:</strong> 2 hours</p>
              <p className="text-sm text-gray-600 mb-3">The easiest EV road trip from Bangkok. Route 7 motorway is smooth and fast. You won't even need to charge — a full battery can do the round trip. Charging available at Pattaya's shopping malls and hotels.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-2">🚗 Bangkok → Hua Hin</h3>
              <p className="text-sm text-gray-600 mb-2"><strong>Distance:</strong> ~200 km · <strong>Drive time:</strong> 2.5 hours</p>
              <p className="text-sm text-gray-600 mb-3">Popular weekend beach escape. Highway 35 (Thonburi-Pak Tho) then Highway 4 south. Multiple charging options at Hua Hin Market Village and BluPort Mall. Most resort hotels offer complimentary AC charging.</p>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mt-4">
            <h3 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
              <Route size={16} className="text-indigo-500" />
              Road Trip Tips for Thailand
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-indigo-500 mt-0.5 shrink-0" /> <span><strong>Download apps before departing</strong> — EA Anywhere, EV Station PluZ, and PEA Volta. Thai mobile data is cheap (300 THB for unlimited 4G/5G).</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-indigo-500 mt-0.5 shrink-0" /> <span><strong>Plan around daytime charging</strong> — Most DC fast chargers are at PTT petrol stations open 24/7, but shopping mall chargers close with the mall.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-indigo-500 mt-0.5 shrink-0" /> <span><strong>November–February is ideal</strong> — Cool, dry weather (25–30°C) maximizes EV range. Avoid March–May (extreme heat) for long drives.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-indigo-500 mt-0.5 shrink-0" /> <span><strong>Highway driving at 110 km/h</strong> — Toll roads (motorway) have speed limits of 120 km/h. EVs lose efficiency above 100 km/h like anywhere else.</span></li>
            </ul>
          </div>
        </section>

        {/* 7. Hotel Charging */}
        <section id="hotels" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Hotel size={22} className="text-rose-500" />
            Hotel & Resort EV Charging
          </h2>
          <p className="text-gray-600 mb-4">
            Thailand's hospitality industry has embraced EV charging faster than almost any other Asian country.
            Mid-range to luxury hotels in tourist destinations now routinely offer overnight AC charging — often <strong>free of charge</strong> for guests.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Phuket Luxury Resorts</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Amanpuri, Trisara, Banyan Tree, Rosewood, InterContinental — all offer complimentary overnight Type 2 AC charging.
                Most use 11 kW or 22 kW wall boxes. Confirm availability when booking.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Bangkok Hotels</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Mandarin Oriental, The Siam, Capella Bangkok, W Bangkok, and most 5-star hotels have EV charging.
                Some charge a fee (300–500 THB per session). The Siam offers complimentary charging for guests.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Chiang Mai & Northern Resorts</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Four Seasons Chiang Mai, Anantara Golden Triangle, and 137 Pillars House offer complimentary EV charging.
                Mountain resorts are increasingly installing solar-powered charging stations.
              </p>
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <p className="text-sm text-gray-700 flex items-start gap-2">
              <Shield size={16} className="text-rose-500 mt-0.5 shrink-0" />
              <span><strong>Pro tip:</strong> When booking any hotel in Thailand, add a note that you drive an electric vehicle. Many hotels have chargers that aren't listed on booking platforms. Call ahead to confirm availability and connector type (Type 2 / CCS2 / Tesla).</span>
            </p>
          </div>
        </section>

        {/* 8. Essential Apps */}
        <section id="apps" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Smartphone size={22} className="text-violet-500" />
            Essential Apps for EV Drivers in Thailand
          </h2>
          <p className="text-gray-600 mb-5">
            Install these apps before your trip to make charging in Thailand seamless.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                <BatteryCharging size={20} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">EA Anywhere</h3>
                <p className="text-xs text-gray-500 mt-0.5">Largest network — 1,200+ chargers. Must-have for long-distance driving.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                <BatteryCharging size={20} className="text-sky-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">PTT EV Station PluZ</h3>
                <p className="text-xs text-gray-500 mt-0.5">Chargers at PTT petrol stations nationwide. Most reliable for highway routes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                <BatteryCharging size={20} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">PEA Volta / MEA EV</h3>
                <p className="text-xs text-gray-500 mt-0.5">Government networks. PEA Volta for upcountry routes, MEA EV for Bangkok.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                <BatteryCharging size={20} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Tesla App</h3>
                <p className="text-xs text-gray-500 mt-0.5">For Tesla Supercharger access and pay-per-use billing.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Google Maps</h3>
                <p className="text-xs text-gray-500 mt-0.5">Increasingly shows EV charger locations with live availability in Thailand.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                <Wifi size={20} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Charge+</h3>
                <p className="text-xs text-gray-500 mt-0.5">Ultra-fast 180 kW DC chargers at select locations. Growing rapidly.</p>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Getting a Thai SIM & Data</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              You'll need mobile data to use charging apps. Buy a tourist SIM at Suvarnabhumi (BKK) airport upon arrival:
              <strong> AIS, TrueMove, or dtac</strong> offer 15–30 day unlimited data plans for 300–600 THB (~$8–$17 USD).
              All work well on major highways and in cities. eSIM options (Airalo, Holafly) are also available for pre-trip setup.
            </p>
          </div>
        </section>

        {/* 9. FAQ */}
        <section id="faq" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield size={22} className="text-emerald-500" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {Faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Newsletter signup */}
        <div className="mb-10">
          <NewsletterSignup variant="inline" source="thailand-guide" />
        </div>

        {/* Cross-reference links */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Pages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/countries/thailand" className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-sm transition-all text-sm">
              <span>🇹🇭</span>
              <span className="font-medium text-gray-900">Thailand EV Routes</span>
              <ChevronRight size={12} className="ml-auto text-gray-300" />
            </Link>
            <Link href="/search" className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-sm transition-all text-sm">
              <Zap size={14} className="text-green-500" />
              <span className="font-medium text-gray-900">Find Charging Stations</span>
              <ChevronRight size={12} className="ml-auto text-gray-300" />
            </Link>
            <Link href="/blog" className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-sm transition-all text-sm">
              <BookOpen size={14} className="text-sky-500" />
              <span className="font-medium text-gray-900">EV Charging Blog</span>
              <ChevronRight size={12} className="ml-auto text-gray-300" />
            </Link>
            <Link href="/compare" className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-sm transition-all text-sm">
              <Route size={14} className="text-indigo-500" />
              <span className="font-medium text-gray-900">Compare Routes</span>
              <ChevronRight size={12} className="ml-auto text-gray-300" />
            </Link>
            <Link href="/routes" className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-sm transition-all text-sm">
              <MapPin size={14} className="text-amber-500" />
              <span className="font-medium text-gray-900">All EV Routes</span>
              <ChevronRight size={12} className="ml-auto text-gray-300" />
            </Link>
            <Link href="/deals" className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-sm transition-all text-sm">
              <DollarSign size={14} className="text-emerald-500" />
              <span className="font-medium text-gray-900">EV Deals & Packages</span>
              <ChevronRight size={12} className="ml-auto text-gray-300" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
            <Link href="/countries/singapore" className="text-xs text-gray-500 hover:text-sky-600 flex items-center gap-1">
              <span>🇸🇬 Singapore</span>
            </Link>
            <Link href="/countries/malaysia" className="text-xs text-gray-500 hover:text-sky-600 flex items-center gap-1">
              <span>🇲🇾 Malaysia</span>
            </Link>
            <Link href="/countries/indonesia" className="text-xs text-gray-500 hover:text-sky-600 flex items-center gap-1">
              <span>🇮🇩 Indonesia</span>
            </Link>
            <Link href="/countries/vietnam" className="text-xs text-gray-500 hover:text-sky-600 flex items-center gap-1">
              <span>🇻🇳 Vietnam</span>
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
