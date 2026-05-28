#!/usr/bin/env node
/**
 * Fix Canadian clone content in AI directory geo pages.
 * 
 * 21 country pages were cloned from Canada and contain Canadian AI content.
 * This script replaces those strings with country-appropriate content.
 *
 * Strategy: For each cloned file, replaces known Canadian substrings
 * with country-specific data. The country data is minimal since the
 * process reads the file, detects the country, and applies replacements.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = join(__dirname, '..', 'app');

// ─── Country Data ────────────────────────────────────────────────────────────
// C[slug] contains replacement strings for each country.
// Keys: 
//   cn = country name
//   adj = adjective form
//   flag = emoji flag
//   faq_q1 = FAQ answer for "best AI tools in X" (replaces Canadian research reference)
//   faq_q2 = FAQ answer for privacy (replaces PIPEDA/Law 25)
//   faq_q3 = FAQ answer for key industries (replaces Toronto/Montreal industry refs)
//   faq_q4 = FAQ answer for funding (replaces SR&ED/CIFAR/IRAP)
//   faq_q5 = FAQ answer for regulations (replaces AIDA/PIPEDA/OSFI)
//   hero_pitch = hero paragraph (replaces Canadian readiness text)
//   hero_badges = hero badges array [text1, text2, text3, text4]
//   why_cards = 3 "Why X needs its own" cards [{title, desc}, ...]
//   eco_hdr = ecosystem section heading
//   eco_sub = ecosystem section subtext
//   eco_cards = 4 ecosystem cards [{title, desc}, ...]
//   cta_badge = CTA badge text
//   cta_h2 = CTA heading
//   cta_p = CTA paragraph
//   cat_sub = category section subtitle
//   seo_footer = SEO footer keywords (tail)

const C = {};

function add(slug, d) {
  C[slug] = d;
}

// ── Argentina ────────────────────────────────────────────────────────────────
add('argentina', {
  cn:'Argentina', adj:'Argentine', flag:'🇦🇷',
  hero_badges: ['Spanish / English', 'ARS/USD Pricing', 'PDPA Compliant', 'Dev Talent-Ready'],
  faq_q1: "Argentina has a growing AI ecosystem fueled by excellent engineering talent from UBA, UTN, and UNC. The country produces world-class software engineers and is home to Globant, Mercado Libre's AI initiatives, and a thriving fintech/agtech startup scene centered in Buenos Aires, Córdoba, and Rosario.",
  faq_q2: "Argentina's Personal Data Protection Act (Ley 25.326 / PDPA) imposes strict requirements on how AI tools collect, use, and disclose personal information. The Agencia de Acceso a la Información Pública (AAIP) oversees enforcement. We flag every tool for PDPA compliance, data residency options within Argentina, and alignment with AAIP guidance on AI and automated decision-making.",
  faq_q3: "Argentina's economy has distinct AI priorities: agtech and precision farming in the Pampas and Rosario, fintech AI in Buenos Aires (payments, lending, wealth management), software development and nearshore services in Córdoba, healthcare AI for Argentina's public health system, natural language tools for Spanish-language requirements across LatAm, and energy AI for Vaca Muerta's oil and gas sector.",
  faq_q4: "Argentina offers growing AI innovation support. The Ministry of Science and Technology funds research through CONICET and the National Agency for Scientific Research (ANPCyT). The Argentina 4.0 plan supports technology adoption. Tax incentives exist for software and R&D (Ley de Economía del Conocimiento). VC funding is growing through Kaszek Ventures, Monashees, and local government programs supporting tech startups.",
  faq_q5: "Argentina's AI regulatory framework centers on Ley 25.326 (PDPA) for data protection, enforced by the AAIP. Specific sectors have additional regulations: ANMAT for health AI, BCRA for financial fintech AI, and ENACOM for telecommunications. Argentina follows OECD AI principles and participates in Ibero-American AI ethics discussions.",
  hero_pitch: "We rank every tool on PDPA compliance, ARS/USD pricing, Spanish-language support, and Argentine tech ecosystem readiness — so you find tools built for Argentina's unique market.",
  cat_sub: "Top picks for Argentine teams — rated for PDPA compliance, ARS pricing, and Spanish-language support.",
  why_cards: [
    {title:'Spanish & English', desc:"Spanish is the official language of Argentina with high English proficiency in tech hubs. We flag every tool for Spanish-language support, Argentina compliance, and LatAm localization — critical for serving markets from Buenos Aires to Mexico City."},
    {title:'PDPA Compliance', desc:"Argentina's Personal Data Protection Act (PDPA / Ley 25.326), enforced by the AAIP, is one of LatAm's strictest privacy laws. We evaluate tools for Argentine data residency, consent management, and Mercosur cross-border data transfer compliance."},
    {title:'AgTech & FinTech Hub', desc:"Argentina produces world-class AI talent from UBA, UTN, and Universidad de San Andrés. The startup ecosystem spans fintech (Mercado Pago, Ualá), agtech (Bioceres), and health tech. We prioritize tools that integrate with Argentina's unique commercialization pipeline."},
  ],
  eco_hdr: "Argentina's AI Ecosystem Is a LatAm Powerhouse",
  eco_sub: "From Buenos Aires' fintech boom to Córdoba's software clusters, Argentina produces world-class talent across every tech vertical — with a distinct approach to solving emerging-market challenges.",
  eco_cards: [
    {title:"Buenos Aires — Fintech & Startup Capital 🇦🇷", desc:"Buenos Aires is LatAm's leading startup ecosystem outside São Paulo, anchored by the Buenos Aires Tech Hub and top engineering talent from UBA's Exact Sciences School. The ecosystem spans fintech (Mercado Pago, Ualá, Naranja X), e-commerce, and SaaS."},
    {title:"Córdoba — Argentina's Software Valley 🎓", desc:"Córdoba has emerged as Argentina's premier software development hub, home to thousands of developers, the Universidad Nacional de Córdoba, and a dense cluster of tech outsourcing and product startups."},
    {title:"Rosario — AgTech & Biotech Hub 🏢", desc:"Rosario, at the heart of Argentina's Pampas agricultural region, has become a hub for agtech and biotech innovation. UNR feeds into precision farming, crop analytics, and bioinformatics."},
    {title:"Globally Recognized Software Talent 🔬", desc:"Argentina consistently ranks among the world's top countries for software engineering talent. With strong CS programs at UBA, UTN, and UNC, combined with competitive costs and a US-friendly time zone, Argentina offers one of the best nearshore engineering destinations globally."},
  ],
  cta_badge: "Built for Argentine Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Argentine Business",
  cta_p: "No more guessing if a tool complies with PDPA, supports Spanish, or works for Argentine teams. Every tool on Apifeny AI is rated for Argentine data compliance, ARS/USD pricing, and Spanish-language readiness. Start exploring — no account needed.",
  seo_footer: "best AI tools in Argentina 2026 · AI tools for Argentine businesses · Argentina AI software · AI writing tools Argentina · AI coding tools Argentina · AI marketing Argentina · Argentina AI directory · AI tools for Argentine startups · enterprise AI tools Argentina · free AI tools Argentina · AI productivity Argentina · Argentine tech stack · AI tools Buenos Aires · AI tools Córdoba · AI tools Rosario",
});

// ── Austria ──────────────────────────────────────────────────────────────────
add('austria', {
  cn:'Austria', adj:'Austrian', flag:'🇦🇹',
  hero_badges: ['German / English', 'EUR Pricing', 'GDPR Compliant', 'AI Research Hub'],
  faq_q1: "Austria has a growing AI ecosystem with strong research at TU Wien, JKU Linz (LIT AI Lab), and TU Graz. The startup scene is centered around Vienna's Digital Economy hub, Graz's industrial automation cluster, and Linz's deep learning community — producing AI for manufacturing, healthcare, and fintech.",
  faq_q2: "Austria's Datenschutzgesetz (DSG) implements EU GDPR with Austrian-specific provisions. The Data Protection Authority (DSB) in Vienna is one of Europe's most active regulators on AI-related privacy matters. We flag every tool for DSG/GDPR compliance, data residency options within Austria/EU, and alignment with the EU AI Act framework.",
  faq_q3: "Austria's economy has distinct AI priorities: industrial AI and Industry 4.0 for manufacturing (Steyr, Graz, Linz), healthcare AI for Austria's world-class medical system, fintech AI in Vienna (payments, insurtech, regtech), energy AI for renewable grid management and hydropower optimization, and tourism AI for Austria's massive hospitality sector.",
  faq_q4: "Austria offers extensive AI innovation funding. The FFG (Austrian Research Promotion Agency) provides grants through its Basisprogramm and AI-specific calls. AWS (Austria Wirtschaftsservice) offers innovation vouchers and venture capital co-investments. The Austrian Startup Package provides tax incentives for R&D.",
  faq_q5: "Austria's AI regulatory framework combines EU GDPR (DSG implementation) with the upcoming EU AI Act. The DSB enforces data protection in AI systems. Sector-specific regulations apply: AGES for health AI, FMA for financial AI. Austria contributes actively to EU AI ethics guidelines.",
  hero_pitch: "We rank every tool on DSG/GDPR compliance, EUR pricing, German-language support, and Austrian tech ecosystem readiness — so you find tools built for Austria's unique market.",
  cat_sub: "Top picks for Austrian teams — rated for DSG/GDPR compliance, EUR pricing, and German-language support.",
  why_cards: [
    {title:'German & English', desc:"Austria's official language is German, with strong English proficiency in tech sectors. Vienna is a major EU tech hub. We flag every tool for German-language support, Austrian compliance, and DACH-region localization."},
    {title:'GDPR & DSG Compliance', desc:"Austria's Datenschutzgesetz (DSG) implements EU GDPR with additional local requirements. The DSB is known for strict enforcement. We evaluate tools for Austrian data residency, consent management, and DSB guidance alignment."},
    {title:'Vienna AI & Research Hub', desc:"Austria produces top AI research from TU Wien, University of Vienna, and JKU Linz (LIT AI Lab). The Austrian Institute of Technology (AIT) drives applied AI in energy, health, and manufacturing."},
  ],
  eco_hdr: "Austria's AI Ecosystem Is a European Research Powerhouse",
  eco_sub: "From Vienna's world-class research institutes to Graz's industrial automation, Austria combines deep tech heritage with a thriving startup scene — all within the heart of Europe.",
  eco_cards: [
    {title:"Vienna — Research & Tech Capital 🇦🇹", desc:"Vienna consistently ranks among Europe's most livable cities and is Austria's undisputed tech hub. Anchored by TU Wien, the University of Vienna, and the Austrian Institute of Technology (AIT), the city excels in AI for healthcare, manufacturing, and fintech."},
    {title:"Graz — Industrial AI & Automation 🎓", desc:"Graz, home to TU Graz and the Know-Center, is a powerhouse for industrial AI, automation, and cybersecurity. The city's strong ties to automotive and manufacturing make it a hub for Industry 4.0."},
    {title:"Linz — AI & Deep Learning at JKU 🏢", desc:"Linz hosts the Johannes Kepler University (JKU) with its renowned LIT AI Lab and Institute for Machine Learning. The city also drives AI in logistics and steel production via voestalpine partnerships."},
    {title:"EU Research & Innovation Hub 🔬", desc:"Austria punches above its weight in EU research funding, consistently ranking among top EU countries for Horizon Europe participation per capita. The FFG, AWS, and Austria's Startup Package offer substantial R&D grants."},
  ],
  cta_badge: "Built for Austrian Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Austrian Business",
  cta_p: "No more guessing if a tool complies with DSG/GDPR, supports German, or works for Austrian teams. Every tool on Apifeny AI is rated for Austrian data compliance, EUR pricing, and German-language readiness. Start exploring — no account needed.",
  seo_footer: "best AI tools in Austria 2026 · AI tools for Austrian businesses · Austria AI software · AI writing tools Austria · AI coding tools Austria · AI marketing Austria · Austria AI directory · AI tools Vienna · AI tools Graz · AI tools Linz",
});

// ── Belgium ──────────────────────────────────────────────────────────────────
add('belgium', {
  cn:'Belgium', adj:'Belgian', flag:'🇧🇪',
  hero_badges: ['Dutch / French / German', 'EUR Pricing', 'GDPR Compliant', 'EU & NATO Hub'],
  faq_q1: "Belgium has a growing AI ecosystem with world-class research at KU Leuven, Imec, ULB, and UGent. The startup scene is centered around Brussels' EU-tech ecosystem, Leuven's deep tech corridor, and Antwerp's logistics/port automation hub.",
  faq_q2: "Belgium's privacy framework implements EU GDPR with local additions via the Belgian Data Protection Authority (GBA/APD). We flag every tool for GDPR/Belgian law compliance, data residency options within Belgium/EU, and alignment with GBA guidance on AI and automated decision-making.",
  faq_q3: "Belgium's economy has distinct AI priorities: port and logistics AI in Antwerp (Europe's second-largest port), pharma and biotech AI for Belgium's world-leading drug industry, fintech and regtech AI in Brussels serving EU financial markets, manufacturing AI for Flanders' industrial corridor, and legal AI for EU regulatory compliance across multiple languages.",
  faq_q4: "Belgium offers robust AI innovation support. VLAIO (Flanders) and SPW Recherche (Wallonia) provide substantial R&D grants. BELSPO funds AI research programs. Imec's venture arm and KU Leuven R&D support deep tech spinouts.",
  faq_q5: "Belgium's AI regulatory framework combines EU GDPR with the upcoming EU AI Act. The GBA/APD enforces data protection. Sector-specific regulations apply: FAMHP for health AI, NBB/FSMA for financial AI. Belgium actively participates in EU AI ethics discussions.",
  hero_pitch: "We rank every tool on GDPR compliance, EUR pricing, multilingual (NL/FR/EN) support, and Belgian tech ecosystem readiness — so you find tools built for Belgium's unique market.",
  cat_sub: "Top picks for Belgian teams — rated for GDPR compliance, EUR pricing, and multilingual support.",
  why_cards: [
    {title:'Dutch, French & German', desc:"Belgium is officially trilingual (Dutch, French, German) with strong English proficiency. Brussels hosts the EU and NATO. We flag every tool for multilingual support, Belgian compliance, and Benelux localization."},
    {title:'GDPR & Belgian Privacy Law', desc:"Belgium's privacy framework implements EU GDPR with local additions via the GBA/APD. We evaluate tools for Belgian data residency, consent management, and EU AI Act alignment."},
    {title:'Brussels AI Ecosystem', desc:"Belgium produces strong AI research from KU Leuven, ULB, VUB, and UGent. Imec (Leuven) is a world-leading nanoelectronics and AI hardware research center."},
  ],
  eco_hdr: "Belgium's AI Ecosystem Is a European Crossroads",
  eco_sub: "From Brussels' EU connections to Leuven's world-class research, Belgium combines multilingual talent, deep tech heritage, and a strategic position at the heart of Europe.",
  eco_cards: [
    {title:"Brussels — EU & NATO Capital 🇧🇪", desc:"Brussels is the capital of Europe, hosting EU institutions and NATO headquarters. The city's AI scene is driven by ULB and VUB research, a dense network of EU-focused startups, and a booming legal/fintech AI sector."},
    {title:"Leuven — Imec & Deep Tech 🎓", desc:"Leuven is home to KU Leuven and Imec, a world-leading nanoelectronics and AI hardware research center with 5,000+ researchers. The startup ecosystem spans chip design, AI hardware, healthtech."},
    {title:"Antwerp & Ghent — Port & Pharma AI 🏢", desc:"Antwerp, Europe's second-largest port, drives AI in logistics. Ghent University and IDLab produce cutting-edge AI in NLP and computer vision, powering biotech drug discovery."},
    {title:"European Research & Funding Hub 🔬", desc:"Belgium's central EU location gives it unmatched access to Horizon Europe and ERC funding. VLAIO, SPW Recherche, and Innoviris provide substantial R&D incentives."},
  ],
  cta_badge: "Built for Belgian Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Belgian Business",
  cta_p: "No more guessing if a tool complies with GDPR, supports Dutch/French, or works for Belgian teams. Every tool on Apifeny AI is rated for Belgian data compliance, EUR pricing, and multilingual readiness. Start exploring — no account needed.",
  seo_footer: "best AI tools in Belgium 2026 · AI tools for Belgian businesses · Belgium AI software · AI writing tools Belgium · Belgium AI directory · AI tools Brussels · AI tools Leuven · AI tools Antwerp",
});

// ── Chile ────────────────────────────────────────────────────────────────────
add('chile', {
  cn:'Chile', adj:'Chilean', flag:'🇨🇱',
  hero_badges: ['Español & English', 'CLP/USD Pricing', 'PDPA Compliant', 'Startup Chile Hub'],
  faq_q1: "Chile has a growing AI ecosystem with strong research at UC (PUC) and Universidad de Chile. The startup scene is centered around Santiago's Startup Chile ecosystem, Valparaíso's tech corridor, and Antofagasta's mining tech cluster — producing AI for fintech, mining, and renewable energy.",
  faq_q2: "Chile's data protection framework is governed by Law No. 19.628 with a new GDPR-aligned bill in progress. The Consejo para la Transparencia (CPLT) oversees data privacy. We flag every tool for Chilean data protection compliance and evolving AI governance frameworks.",
  faq_q3: "Chile's economy has distinct AI priorities: mining tech and predictive maintenance in Antofagasta and the Atacama region, fintech AI in Santiago (payments, lending, wealth management), renewable energy AI for Chile's massive solar and wind installations, agtech for Chile's fruit and wine export industries, and salmon farming AI for the aquaculture sector.",
  faq_q4: "Chile offers robust AI innovation support. CORFO provides grants through InnovaChile and Startup Chile. ANID funds AI research. Tax incentives under the R&D Law benefit tech companies investing in innovation.",
  faq_q5: "Chile's AI regulatory framework centers on Law 19.628 for data protection. CORFO and the Ministry of Science published a National AI Policy with ethical guidelines. Sector-specific regulations: CMF for fintech, SERNAGEOMIN for mining AI.",
  hero_pitch: "We rank every tool on data protection compliance, CLP/USD pricing, Spanish-language support, and Chilean tech ecosystem readiness — so you find tools built for Chile's unique market.",
  cat_sub: "Top picks for Chilean teams — rated for PDPA compliance, CLP pricing, and Spanish-language support.",
  why_cards: [
    {title:'Spanish & English', desc:"Chile has the highest English proficiency in LatAm and is a regional leader in tech innovation. We flag every tool for Spanish-language support, Chilean compliance, and LatAm localization."},
    {title:'PDPA & Data Protection', desc:"Chile's Law No. 19.628 on Personal Data Protection is being modernized with a new GDPR-aligned bill. The CPLT oversees data privacy."},
    {title:'Startup Chile & Innovation', desc:"Chile is a LatAm innovation leader, anchored by Startup Chile, strong universities (UC, UChile, USM), and a growing AI ecosystem."},
  ],
  eco_hdr: "Chile's Tech Ecosystem Is LatAm's Innovation Leader",
  eco_sub: "From Santiago's thriving startup scene to Antofagasta's mining tech revolution, Chile combines political stability, open markets, and a talent pool that punches above its weight.",
  eco_cards: [
    {title:"Santiago — Startup Capital of LatAm 🇨🇱", desc:"Santiago is LatAm's most dynamic startup ecosystem outside Brazil, anchored by Startup Chile, UC's Engineering School, and Universidad de Chile. The city excels in fintech, e-commerce, and SaaS."},
    {title:"Valparaíso & Viña del Mar — Tech Hub 🎓", desc:"The Valparaíso region is home to the Federico Santa María Technical University (USM) and a growing cluster of tech startups."},
    {title:"Antofagasta — Mining & Energy Tech 🏢", desc:"Antofagasta produces 30% of global copper and is a natural hub for mining tech AI — predictive maintenance, autonomous vehicles, and energy optimization."},
    {title:"Open Economy & Innovation Gateway 🔬", desc:"Chile is LatAm's most competitive economy with strong IP protection, trade agreements covering 65+ markets, and substantial CORFO R&D grants."},
  ],
  cta_badge: "Built for Chilean Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Chilean Business",
  cta_p: "No more guessing if a tool complies with Chilean data protection law, supports Spanish, or works for Chilean teams. Every tool on Apifeny AI is rated for Chile data compliance, CLP/USD pricing, and Spanish-language readiness. Start exploring — no account needed.",
  seo_footer: "best AI tools in Chile 2026 · AI tools for Chilean businesses · Chile AI software · AI writing tools Chile · AI coding tools Chile · Chile AI directory · AI tools Santiago · AI tools Valparaíso · AI tools Antofagasta",
});

// ── Colombia ─────────────────────────────────────────────────────────────────
add('colombia', {
  cn:'Colombia', adj:'Colombian', flag:'🇨🇴',
  hero_badges: ['Español & English', 'COP/USD Pricing', 'PDPA Compliant', 'Bogotá Tech Hub'],
  faq_q1: "Colombia has a growing AI ecosystem with strong universities (Uniandes, EAFIT, UNAL) and a booming tech scene. The startup ecosystem is centered around Bogotá's fintech hub, Medellín's innovation district (Ruta N), and Cali's emerging tech cluster.",
  faq_q2: "Colombia's Statutory Law 1581 of 2012 governs personal data protection, enforced by the Superintendencia de Industria y Comercio (SIC). We flag every tool for Law 1581 compliance, data residency options within Colombia, and alignment with SIC guidance.",
  faq_q3: "Colombia's economy has distinct AI priorities: fintech AI in Bogotá and Medellín (digital payments, lending, insurtech), logistics AI for Colombia's trade corridors, e-commerce AI for the rapidly growing online retail sector, agtech for coffee and flower export industries, and energy AI for Colombia's oil and renewable sectors.",
  faq_q4: "Colombia offers growing AI innovation support. INNpulsa Colombia provides grants and venture-building programs. Colciencias funds AI research. The Orange Economy law provides tax incentives for creative and tech industries.",
  faq_q5: "Colombia's AI regulatory framework includes Law 1581 for data protection, with CONPES 3975 (National AI Policy) setting strategic guidelines. Sector-specific regulations: SFC for fintech AI, INVIMA for health AI, MinTIC for digital governance. Colombia participates in OECD AI policy discussions.",
  hero_pitch: "We rank every tool on data protection compliance, COP/USD pricing, Spanish-language support, and Colombian tech ecosystem readiness.",
  cat_sub: "Top picks for Colombian teams — rated for data protection compliance, COP pricing, and Spanish-language support.",
  why_cards: [
    {title:'Spanish & English', desc:"Colombia is LatAm's third-largest tech talent pool with growing English proficiency in tech hubs. We flag every tool for Spanish-language support and Colombian compliance."},
    {title:'Data Protection Law', desc:"Colombia's Statutory Law 1581 of 2012 governs personal data protection, enforced by the SIC. We evaluate tools for Colombian data residency and SIC guidance."},
    {title:'Medellín & Bogotá Innovation', desc:"Colombia's tech scene is booming. Medellín won Innovative City of the Year. Universities like Uniandes, EAFIT, and UNAL produce top engineers."},
  ],
  eco_hdr: "Colombia's Tech Ecosystem Is One of LatAm's Fastest Growing",
  eco_sub: "From Bogotá's fintech explosion to Medellín's innovation renaissance, Colombia combines deep tech talent with a rapidly maturing startup ecosystem.",
  eco_cards: [
    {title:"Bogotá — Fintech & Corporate Hub 🇨🇴", desc:"Bogotá is Colombia's largest tech hub with a booming fintech ecosystem (Nequi, Addi, Truora), corporate innovation centers, and top universities."},
    {title:"Medellín — Innovation City 🎓", desc:"Medellín transformed from industrial city to global innovation icon, home to EAFIT University, Ruta N innovation district, and thriving startups."},
    {title:"Cali — Emerging Tech & Logistics Hub 🏢", desc:"Cali is Colombia's third tech pole with a growing software development cluster and Pacific logistics infrastructure."},
    {title:"Talent Pipeline & Innovation Funding 🔬", desc:"Colombia produces 15,000+ engineering graduates annually. INNpulsa Colombia and Colciencias provide generous R&D grants."},
  ],
  cta_badge: "Built for Colombian Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Colombian Business",
  cta_p: "No more guessing if a tool complies with Colombian data protection law, supports Spanish, or works for Colombian teams.",
  seo_footer: "best AI tools in Colombia 2026 · AI tools for Colombian businesses · Colombia AI software · AI writing tools Colombia · Colombia AI directory · AI tools Bogotá · AI tools Medellín · AI tools Cali",
});

// ── Denmark ──────────────────────────────────────────────────────────────────
add('denmark', {
  cn:'Denmark', adj:'Danish', flag:'🇩🇰',
  hero_badges: ['Danish & English', 'DKK/EUR Pricing', 'GDPR Compliant', 'Nordic Innovation Hub'],
  faq_q1: "Denmark has a strong AI ecosystem with world-class research at DTU, University of Copenhagen, and Aarhus University. The startup scene centers on Copenhagen's Pioneer Centre for AI and Aarhus' tech hub — producing AI for healthcare, energy, shipping, and fintech.",
  faq_q2: "Denmark's Data Protection Act supplements EU GDPR with Danish-specific provisions. Datatilsynet (Danish Data Protection Authority) is highly active on AI guidance. We evaluate tools for Danish data residency, GDPR compliance, and Datatilsynet's AI guidance.",
  faq_q3: "Denmark's economy has distinct AI priorities: healthcare AI leveraging Denmark's digitized health records, shipping and logistics AI (Maersk, DFDS), green energy AI for wind and district heating, fintech AI in Copenhagen, and agtech AI for Denmark's world-leading agriculture sector.",
  faq_q4: "Denmark offers extensive AI innovation funding. Innovation Fund Denmark invests in AI research and commercialization. The Danish Growth Fund provides venture capital. EU Horizon Europe and EIC grants are accessible through Denmark's strong EU network.",
  faq_q5: "Denmark's AI regulatory framework combines EU GDPR with the Danish Data Protection Act. Datatilsynet enforces AI-related privacy. Sector regulations: Lægemiddelstyrelsen for health AI, Finanstilsynet for financial AI. Denmark's Data Ethics Seal is a pioneering framework.",
  hero_pitch: "We rank every tool on GDPR compliance, DKK/EUR pricing, Danish-language support, and Danish tech ecosystem readiness — so you find tools built for Denmark's unique market.",
  cat_sub: "Top picks for Danish teams — rated for GDPR compliance, DKK pricing, and Danish-language support.",
  why_cards: [
    {title:'Danish & English', desc:"Denmark has near-universal English proficiency alongside Danish as the official language. We flag every tool for Danish language support and Nordic localization."},
    {title:'GDPR & Danish Data Law', desc:"Denmark's Data Protection Act supplements EU GDPR. Datatilsynet is highly active on AI guidance. We evaluate tools for Danish data residency."},
    {title:'Copenhagen AI Ecosystem', desc:"Denmark produces world-class AI research from DTU, University of Copenhagen, and Aarhus University. Innovation Fund Denmark invests heavily in AI research and commercialization."},
  ],
  eco_hdr: "Denmark's AI Ecosystem Is a Nordic Innovation Leader",
  eco_sub: "From Copenhagen's world-class research to Aarhus' AI startups, Denmark combines a digitized society, green energy leadership, and responsible AI.",
  eco_cards: [
    {title:"Copenhagen — Nordic AI Hub 🇩🇰", desc:"Copenhagen is Scandinavia's leading tech hub, anchored by DTU and University of Copenhagen. The city drives AI in healthcare, shipping (Maersk), and clean energy."},
    {title:"Aarhus — Research & Innovation Hub 🎓", desc:"Aarhus University is a powerhouse for AI research in NLP, robotics, and computational social science. The innovation district hosts a growing cluster of AI startups."},
    {title:"Aalborg — Industrial AI & Smart Systems 🏢", desc:"Aalborg University is renowned for industrial AI in smart manufacturing, energy systems, and the built environment."},
    {title:"Nordic Innovation & Green AI Hub 🔬", desc:"Innovation Fund Denmark invests heavily in AI. The Data Ethics Seal creates a unique environment for responsible AI."},
  ],
  cta_badge: "Built for Danish Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Danish Business",
  cta_p: "No more guessing if a tool complies with GDPR, supports Danish, or works for Danish teams. Every tool on Apifeny AI is rated for Danish data compliance, DKK pricing, and Danish-language readiness.",
  seo_footer: "best AI tools in Denmark 2026 · AI tools for Danish businesses · Denmark AI software · AI writing tools Denmark · Denmark AI directory · AI tools Copenhagen · AI tools Aarhus · AI tools Aalborg",
});

// ── Finland ──────────────────────────────────────────────────────────────────
add('finland', {
  cn:'Finland', adj:'Finnish', flag:'🇫🇮',
  hero_badges: ['Finnish & English', 'EUR Pricing', 'GDPR Compliant', 'Gaming & Health AI'],
  faq_q1: "Finland has a strong AI ecosystem with world-class research at Aalto University, University of Helsinki (Finnish Center for AI / FCAI), and Tampere University. The startup scene centers on Helsinki's gaming/healthtech hub, Espoo's deep tech corridor, and Tampere's industrial AI cluster.",
  faq_q2: "Finland's Data Protection Act implements EU GDPR, enforced by the Office of the Data Protection Ombudsman. We flag every tool for GDPR compliance, Finnish data residency, and alignment with national AI ethics guidelines.",
  faq_q3: "Finland's economy has distinct AI priorities: gaming AI for the world-leading game industry (Rovio, Supercell), healthtech and biotech AI leveraging Finland's biobanks, clean tech AI for renewable and circular economy, industrial AI for smart manufacturing, and telecom AI for 5G/6G networks.",
  faq_q4: "Finland offers extensive AI innovation funding. Business Finland provides substantial R&D grants and innovation funding. VTT Technical Research Centre supports deep tech commercialization. The Finnish AI Accelerator (FAIA) supports AI startups.",
  faq_q5: "Finland's AI regulatory framework combines EU GDPR with the Finnish Data Protection Act. Sector regulations: Fimea for health AI, FIN-FSA for financial AI. Finland's national AI strategy sets ethical guidelines.",
  hero_pitch: "We rank every tool on GDPR compliance, EUR pricing, Finnish-language support, and Finnish tech ecosystem readiness — so you find tools built for Finland's unique market.",
  cat_sub: "Top picks for Finnish teams — rated for GDPR compliance, EUR pricing, and Finnish-language support.",
  why_cards: [
    {title:'Finnish & English', desc:"Finland has excellent English proficiency alongside Finnish and Swedish as official languages. We flag every tool for Finnish language support and Nordic localization."},
    {title:'GDPR & Finnish Data Law', desc:"Finland's Data Protection Act implements EU GDPR, enforced by the Office of the Data Protection Ombudsman. We evaluate tools for Finnish data residency."},
    {title:'Helsinki AI & FCAI Hub', desc:"Finland produces world-class AI research from Aalto University, University of Helsinki (FCAI), and Tampere University. Business Finland accelerates AI commercialization."},
  ],
  eco_hdr: "Finland's AI Ecosystem Is a Nordic Powerhouse",
  eco_sub: "From Helsinki's gaming/healthtech hub to Tampere's industrial AI, Finland combines world-class education with deep tech innovation.",
  eco_cards: [
    {title:"Helsinki — Nordic AI Powerhouse 🇫🇮", desc:"Helsinki is a global hub for AI and gaming, anchored by Aalto University and the University of Helsinki (home to the FCAI)."},
    {title:"Espoo — Deep Tech & Research Corridor 🎓", desc:"Espoo hosts Aalto University, VTT, and Nokia's R&D campus. Otaniemi innovation district is Northern Europe's largest concentration of deep tech."},
    {title:"Tampere — Industrial AI & Smart Systems 🏢", desc:"Tampere University drives AI in industrial automation, machine vision, and smart systems."},
    {title:"World-Class Education Ecosystem 🔬", desc:"Finland consistently ranks among the world's most innovative countries. Business Finland offers generous R&D grants."},
  ],
  cta_badge: "Built for Finnish Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Finnish Business",
  cta_p: "No more guessing if a tool complies with GDPR, supports Finnish, or works for Finnish teams. Every tool on Apifeny AI is rated for Finnish data compliance, EUR pricing, and Finnish-language readiness.",
  seo_footer: "best AI tools in Finland 2026 · AI tools for Finnish businesses · Finland AI software · AI writing tools Finland · Finland AI directory · AI tools Helsinki · AI tools Espoo · AI tools Tampere",
});

// ── Ireland ──────────────────────────────────────────────────────────────────
add('ireland', {
  cn:'Ireland', adj:'Irish', flag:'🇮🇪',
  hero_badges: ['English & Irish', 'EUR Pricing', 'GDPR Compliant', 'EU Tech Gateway'],
  faq_q1: "Ireland has a thriving AI ecosystem with strong research at Trinity College Dublin, UCD, and the Insight Centre for Data Analytics. The startup scene centers on Dublin's Silicon Docks, Cork's pharma-tech hub, and Galway's medtech cluster — producing AI for enterprise SaaS, fintech, and health tech.",
  faq_q2: "Ireland's Data Protection Act implements EU GDPR. The Irish Data Protection Commission (DPC) is Europe's most influential data regulator for global tech — it's the lead authority for Meta, Google, Apple, TikTok and others. We flag every tool for GDPR compliance, Irish data residency, and DPC guidance.",
  faq_q3: "Ireland's economy has distinct AI priorities: enterprise SaaS and cloud AI for the multinational tech sector (Google, Meta, Apple, Microsoft), pharma and biotech AI in Cork, fintech AI in Dublin's IFSC, medtech AI in Galway, and agrifood AI for Ireland's massive agriculture and food export industry.",
  faq_q4: "Ireland offers generous AI innovation support. Enterprise Ireland provides R&D grants and commercialization support. IDA Ireland supports AI FDI. Science Foundation Ireland (SFI) funds AI research through Insight and ADAPT centres. R&D tax credits of 25% benefit tech companies.",
  faq_q5: "Ireland's AI regulatory framework combines EU GDPR with the Irish Data Protection Act. The DPC is Europe's most active AI-related privacy regulator. Sector regulations: HPRA for health AI, Central Bank of Ireland for financial AI. Ireland's national AI strategy ('AI - Here for Good') sets guidelines.",
  hero_pitch: "We rank every tool on GDPR compliance, EUR pricing, English-language support, and Irish tech ecosystem readiness — so you find tools built for Ireland's unique market.",
  cat_sub: "Top picks for Irish teams — rated for GDPR compliance, EUR pricing, and English-language support.",
  why_cards: [
    {title:'English & Irish', desc:"Ireland is predominantly English-speaking with Irish (Gaeilge) as the first official language. Dublin's Silicon Docks hosts the EMEA HQ of 10+ global tech giants."},
    {title:'GDPR & Irish Data Law', desc:"Ireland's Data Protection Act implements EU GDPR. The DPC is Europe's most influential data regulator, serving as lead authority for Meta, Google, Apple, and TikTok."},
    {title:'Dublin Tech & FDI Hub', desc:"Ireland offers a 12.5% corporate tax rate, strong R&D tax credits, and access to EU talent. Enterprise Ireland and IDA Ireland actively support AI startups and FDI."},
  ],
  eco_hdr: "Ireland's AI Ecosystem Is a European Tech Powerhouse",
  eco_sub: "From Dublin's Silicon Docks to Galway's medtech corridor, Ireland combines multinational tech scale with a thriving indigenous startup ecosystem.",
  eco_cards: [
    {title:"Dublin — European Tech Capital 🇮🇪", desc:"Dublin is home to the European HQ of Google, Meta, Apple, Microsoft, and LinkedIn. Trinity College Dublin and UCD produce world-class CS talent."},
    {title:"Cork — Pharma & Manufacturing AI 🎓", desc:"Cork hosts UCC and a massive pharmaceutical cluster. The city drives AI in drug discovery, clinical trials, and smart manufacturing."},
    {title:"Galway — MedTech & Creative AI 🏢", desc:"Galway is a global medtech hub (Boston Scientific, Medtronic), anchored by NUI Galway and CÚRAM. Creative AI spans animation, VR, and digital media."},
    {title:"EU Gateway & Talent Magnet 🔬", desc:"Ireland offers one of the world's most attractive tech tax regimes (12.5% corporate tax) and deep multilingual talent."},
  ],
  cta_badge: "Built for Irish Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Irish Business",
  cta_p: "No more guessing if a tool complies with GDPR, or works for Irish teams. Every tool on Apifeny AI is rated for Irish data compliance, EUR pricing, and English-language readiness.",
  seo_footer: "best AI tools in Ireland 2026 · AI tools for Irish businesses · Ireland AI software · AI writing tools Ireland · Ireland AI directory · AI tools Dublin · AI tools Cork · AI tools Galway",
});

// ── Israel ───────────────────────────────────────────────────────────────────
add('israel', {
  cn:'Israel', adj:'Israeli', flag:'🇮🇱',
  hero_badges: ['Hebrew & English', 'ILS/USD Pricing', 'Privacy Compliant', 'Startup Nation'],
  faq_q1: "Israel has a world-class AI ecosystem with research at Weizmann Institute, Technion, and Hebrew University. The startup scene centers on Tel Aviv's Silicon Wadi, Haifa's deep tech corridor, and Jerusalem's biotech cluster — producing AI for cybersecurity, fintech, and health tech.",
  faq_q2: "Israel's Privacy Protection Act (1981) governs data protection, enforced by the Privacy Protection Authority. A GDPR-aligned update is in progress. We flag every tool for Israeli data protection compliance and evolving AI governance frameworks.",
  faq_q3: "Israel's economy has distinct AI priorities: cybersecurity AI in Tel Aviv and Be'er Sheva, fintech AI for the startup ecosystem, health AI leveraging Israel's digitized healthcare system, agtech AI for precision agriculture, and autonomous systems and defense AI.",
  faq_q4: "Israel offers extensive AI innovation support. The Israel Innovation Authority provides R&D grants through multiple tracks. OurCrowd and other VC platforms connect AI startups to global capital. TASE has specific tech listing paths.",
  faq_q5: "Israel's AI regulatory framework centers on the Privacy Protection Act with the AI Regulation Bill in progress. Sector regulations: Ministry of Health for medical AI, Bank of Israel for financial AI. Israel National Digital Agency published AI ethics guidelines.",
  hero_pitch: "We rank every tool on privacy compliance, ILS/USD pricing, Hebrew/English support, and Israeli tech ecosystem readiness — so you find tools built for Israel's unique market.",
  cat_sub: "Top picks for Israeli teams — rated for privacy compliance, ILS pricing, and Hebrew/English support.",
  why_cards: [
    {title:'Hebrew & English', desc:"Hebrew is the official language with near-universal English proficiency in tech. Israel's Startup Nation culture is English-friendly. We flag every tool for Hebrew support."},
    {title:'Privacy Protection Act', desc:"Israel's Privacy Protection Act (1981) governs data protection, enforced by the Privacy Protection Authority. A GDPR-aligned update is in progress."},
    {title:'Startup Nation Innovation', desc:"Israel has the highest density of startups per capita globally. The Innovation Authority offers R&D grants. Military units (Unit 8200, Talpiot) produce top AI talent."},
  ],
  eco_hdr: "Israel's AI Ecosystem Is a Global Startup Powerhouse",
  eco_sub: "From Tel Aviv's Silicon Wadi to Haifa's deep tech corridor, Israel produces more startups per capita than any other country.",
  eco_cards: [
    {title:"Tel Aviv — Startup Nation Capital 🇮🇱", desc:"Tel Aviv is one of the world's top startup ecosystems per capita, anchored by Weizmann Institute, Tel Aviv University, and the thriving Silicon Wadi."},
    {title:"Haifa — Deep Tech & Research Hub 🎓", desc:"Haifa is home to the Technion ('MIT of Israel'), with major R&D labs from IBM, Intel, and Apple. The city excels in computer vision, NLP, and AI hardware."},
    {title:"Jerusalem — BioTech & Academic AI 🏢", desc:"Jerusalem hosts Hebrew University and the Safra Center for AI. Biotech AI ecosystem spans life sciences and academic excellence."},
    {title:"Startup Nation — Global AI Innovation 🔬", desc:"Israel has the highest density of startups per capita globally. The Innovation Authority offers substantial R&D grants."},
  ],
  cta_badge: "Built for Israeli Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Israeli Business",
  cta_p: "No more guessing if a tool complies with Israel's privacy laws, supports Hebrew, or works for Israeli teams. Every tool on Apifeny AI is rated for Israeli data compliance, ILS pricing, and Hebrew-language readiness.",
  seo_footer: "best AI tools in Israel 2026 · AI tools for Israeli businesses · Israel AI software · AI writing tools Israel · Israel AI directory · AI tools Tel Aviv · AI tools Haifa · AI tools Jerusalem",
});

// ── Italy ────────────────────────────────────────────────────────────────────
add('italy', {
  cn:'Italy', adj:'Italian', flag:'🇮🇹',
  hero_badges: ['Italian & English', 'EUR Pricing', 'GDPR Compliant', 'Fashion & Manufacturing AI'],
  faq_q1: "Italy has a growing AI ecosystem with strong research at Politecnico di Milano, Sapienza Rome, and Politecnico di Torino. The startup scene centers on Milan's fintech/fashion hub, Turin's automotive AI cluster, and Rome's public sector AI ecosystem.",
  faq_q2: "Italy's Data Protection Code (Codice in materia di protezione dei dati personali) implements EU GDPR, enforced by the Garante — one of Europe's most active DPAs. We flag every tool for GDPR compliance, Italian data residency, and Garante guidance.",
  faq_q3: "Italy's economy has distinct AI priorities: manufacturing AI for Industry 4.0 (automotive, machinery, robotics), fashion and design AI for the Made in Italy brand, fintech AI in Milan, tourism AI for Italy's massive hospitality sector, and agrifood AI for world-leading food production.",
  faq_q4: "Italy offers growing AI innovation support through the Ministry of Enterprises and Made in Italy (MIMIT). The National AI Strategy funds research. CDP Venture Capital invests in AI startups. Tax incentives for R&D include Credito d'Imposta Ricerca & Sviluppo.",
  faq_q5: "Italy's AI regulatory framework combines EU GDPR with the Italian Data Protection Code. The Garante enforces AI-related privacy. Sector regulations: AIFA for health AI, CONSOB for financial AI. Italy is an active EU AI Act participant.",
  hero_pitch: "We rank every tool on GDPR compliance, EUR pricing, Italian-language support, and Italian tech ecosystem readiness — so you find tools built for Italy's unique market.",
  cat_sub: "Top picks for Italian teams — rated for GDPR compliance, EUR pricing, and Italian-language support.",
  why_cards: [
    {title:'Italian & English', desc:"Italian is the official language with growing English proficiency in tech hubs like Milan and Turin. We flag every tool for Italian-language support and Italian localization."},
    {title:'GDPR & Italian Data Law', desc:"Italy's Data Protection Code implements EU GDPR. The Garante is one of Europe's most active DPAs. We evaluate tools for Italian data residency."},
    {title:'Milan AI & Innovation Hub', desc:"Italy produces strong AI research from Politecnico di Milano, Sapienza Rome, and Politecnico di Torino. The Italian Institute of Technology (IIT) drives robotics and AI."},
  ],
  eco_hdr: "Italy's AI Ecosystem Is a European Innovation Engine",
  eco_sub: "From Milan's fintech and fashion AI to Turin's automotive innovation, Italy combines industrial heritage with cutting-edge AI across manufacturing, design, and food.",
  eco_cards: [
    {title:"Milan — Economic & Fintech Hub 🇮🇹", desc:"Milan is Italy's economic and financial capital, driving AI in fintech, fashion tech, and enterprise SaaS. Home to Politecnico di Milano and Bocconi University."},
    {title:"Turin — Automotive & Aerospace AI 🎓", desc:"Turin, home to Politecnico di Torino and the IIT, is a hub for AI in automotive (Stellantis), aerospace, and advanced manufacturing."},
    {title:"Rome — Research & Public Sector AI 🏢", desc:"Rome hosts Sapienza University and the CNR (National Research Council). AI ecosystem serves Italy's public administration, healthcare, and defense."},
    {title:"Made in Italy — Manufacturing & Design 🔬", desc:"Italy is the EU's second-largest manufacturing economy. The National AI Strategy funds AI research across world-leading industrial design and automotive sectors."},
  ],
  cta_badge: "Built for Italian Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Italian Business",
  cta_p: "No more guessing if a tool complies with GDPR, supports Italian, or works for Italian teams. Every tool on Apifeny AI is rated for Italian data compliance, EUR pricing, and Italian-language readiness.",
  seo_footer: "best AI tools in Italy 2026 · AI tools for Italian businesses · Italy AI software · AI writing tools Italy · Italy AI directory · AI tools Milan · AI tools Turin · AI tools Rome",
});

// ── Mexico ───────────────────────────────────────────────────────────────────
add('mexico', {
  cn:'Mexico', adj:'Mexican', flag:'🇲🇽',
  hero_badges: ['Español & English', 'MXN/USD Pricing', 'LFPDPPP Compliance', 'Fintech Hub MEX'],
  faq_q1: "Mexico has a growing AI ecosystem with strong research at UNAM, ITESM (Tec de Monterrey), and IPN. The startup scene centers on Mexico City's fintech hub, Guadalajara's innovation district, and Monterrey's industrial tech cluster — producing AI for fintech, manufacturing, and nearshore services.",
  faq_q2: "Mexico's Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP) governs data protection, enforced by the INAI. We flag every tool for LFPDPPP compliance, data residency options within Mexico, and INAI AI guidance.",
  faq_q3: "Mexico's economy has distinct AI priorities: fintech AI in Mexico City (the largest fintech market in LatAm), nearshore and manufacturing AI across the industrial corridor, automotive AI for Mexico's massive auto manufacturing sector, energy AI for PEMEX and renewables, and telecommunications AI.",
  faq_q4: "Mexico offers growing AI innovation support through CONAHCYT. ProMexico supports tech exports. The fintech law (Ley Fintech) provides regulatory clarity. VC is growing through funds like Variv Capital, ALLVP, and DILA Capital.",
  faq_q5: "Mexico's AI regulatory framework includes the LFPDPPP for data protection. Sector-specific regulations: CONDUSEF for fintech AI, COFEPRIS for health AI. Mexico's National AI Strategy sets ethical guidelines.",
  hero_pitch: "We rank every tool on LFPDPPP compliance, MXN/USD pricing, Spanish-language support, and Mexican tech ecosystem readiness — so you find tools built for Mexico's unique market.",
  cat_sub: "Top picks for Mexican teams — rated for LFPDPPP compliance, MXN pricing, and Spanish-language support.",
  why_cards: [
    {title:'Spanish & English', desc:"Spanish is the official language with strong English proficiency in tech hubs like Mexico City and Guadalajara. We flag every tool for Mexican Spanish support."},
    {title:'LFPDPPP Compliance', desc:"Mexico's Federal Law on Protection of Personal Data (LFPDPPP), enforced by INAI, is one of LatAm's most comprehensive privacy laws."},
    {title:'Mexico City Innovation Hub', desc:"Mexico produces strong tech talent from UNAM, Tec de Monterrey, and IPN. The fintech ecosystem is the largest in LatAm outside Brazil."},
  ],
  eco_hdr: "Mexico's AI Ecosystem Is LatAm's Nearshore Powerhouse",
  eco_sub: "From Mexico City's fintech revolution to Guadalajara's innovation district, Mexico combines a massive domestic market with world-class nearshore tech talent.",
  eco_cards: [
    {title:"Mexico City — Fintech Hub 🇲🇽", desc:"Mexico City is LatAm's largest fintech market, anchored by UNAM and ITAM. The ecosystem spans fintech, e-commerce, and SaaS."},
    {title:"Guadalajara — Innovation District 🎓", desc:"Guadalajara is Mexico's 'Silicon Valley', home to Oracle, Intel, HP, and 1,000+ tech companies. Tec de Monterrey produces top engineering talent."},
    {title:"Monterrey — Industrial & Manufacturing AI 🏢", desc:"Monterrey, Mexico's industrial capital, drives AI in advanced manufacturing, automotive, and steel. ITESM is one of LatAm's top private universities."},
    {title:"Nearshore & US Market Gateway 🔬", desc:"Mexico is the world's #1 nearshore destination for US tech companies. Shared time zones, deep talent pools, and competitive costs."},
  ],
  cta_badge: "Built for Mexican Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Mexican Business",
  cta_p: "No more guessing if a tool complies with LFPDPPP, supports Spanish, or works for Mexican teams. Every tool on Apifeny AI is rated for Mexican data compliance, MXN pricing, and Spanish-language readiness.",
  seo_footer: "best AI tools in Mexico 2026 · AI tools for Mexican businesses · Mexico AI software · AI writing tools Mexico · Mexico AI directory · AI tools Mexico City · AI tools Guadalajara · AI tools Monterrey",
});

// ── Netherlands ──────────────────────────────────────────────────────────────
add('netherlands', {
  cn:'Netherlands', adj:'Dutch', flag:'🇳🇱',
  hero_badges: ['Dutch & English', 'EUR Pricing', 'GDPR Compliant', 'AI & Logistics Hub'],
  faq_q1: "The Netherlands has a thriving AI ecosystem with world-class research at TU Delft, University of Amsterdam (AMLab), and TU Eindhoven. The startup scene centers on Amsterdam's Data Science ecosystem, Eindhoven's High Tech Campus, and Utrecht's research corridor.",
  faq_q2: "The Netherlands' privacy framework implements EU GDPR with oversight by the Dutch Data Protection Authority (AP - Autoriteit Persoonsgegevens). We flag every tool for GDPR compliance, Dutch data residency, and AP guidance on AI.",
  faq_q3: "The Netherlands' economy has distinct AI priorities: logistics and supply chain AI at Rotterdam (Europe's largest port), agtech and food AI for the world's second-largest agricultural exporter, fintech AI in Amsterdam, health AI leveraging world-class medical research, and water management and climate AI.",
  faq_q4: "The Netherlands offers extensive AI innovation support. The Dutch Research Council (NWO) funds AI research through the National AI Coalition (NL AIC). WBSO tax credits cover up to 32% of R&D wage costs. Invest-NL supports AI startups.",
  faq_q5: "The Netherlands' AI regulatory framework combines EU GDPR with the Dutch GDPR Implementation Act. The AP enforces AI-related privacy. Sector regulations: IGJ for health AI, AFM for financial AI. The NL AIC sets ethical guidelines.",
  hero_pitch: "We rank every tool on GDPR compliance, EUR pricing, Dutch-language support, and Dutch tech ecosystem readiness — so you find tools built for the Netherlands' unique market.",
  cat_sub: "Top picks for Dutch teams — rated for GDPR compliance, EUR pricing, and Dutch-language support.",
  why_cards: [
    {title:'Dutch & English', desc:"The Netherlands has the highest English proficiency in continental Europe. We flag every tool for Dutch-language support and Benelux localization."},
    {title:'GDPR & Dutch Privacy Law', desc:"The Dutch Data Protection Authority (AP) is one of Europe's most active regulators. We evaluate tools for Dutch data residency and AP guidance on AI."},
    {title:'Amsterdam AI & Innovation Hub', desc:"The Netherlands produces world-class AI research from TU Delft, UvA, and TU Eindhoven. The AMLab and NL AIC coordinate national AI efforts."},
  ],
  eco_hdr: "The Netherlands' AI Ecosystem Is a European Digital Leader",
  eco_sub: "From Amsterdam's data science community to Eindhoven's High Tech Campus, the Netherlands combines world-class infrastructure with a globally connected economy.",
  eco_cards: [
    {title:"Amsterdam — Data Science & Fintech Hub 🇳🇱", desc:"Amsterdam is a top European tech hub, anchored by the University of Amsterdam (AMLab), VU Amsterdam, and thriving fintech ecosystem."},
    {title:"Eindhoven — High Tech & Manufacturing AI 🎓", desc:"Eindhoven's High Tech Campus is one of Europe's most concentrated ecosystems, home to ASML, Philips, and TU Eindhoven."},
    {title:"Rotterdam — Port & Logistics AI 🏢", desc:"Rotterdam, Europe's largest port, is a hub for AI in logistics and maritime tech. Erasmus University Rotterdam drives AI for business."},
    {title:"National AI Coalition & Ecosystem 🔬", desc:"The NL AIC coordinates AI research. WBSO R&D tax credits and Invest-NL provide substantial support for AI startups."},
  ],
  cta_badge: "Built for Dutch Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Dutch Business",
  cta_p: "No more guessing if a tool complies with GDPR, supports Dutch, or works for Dutch teams. Every tool on Apifeny AI is rated for Dutch data compliance, EUR pricing, and Dutch-language readiness.",
  seo_footer: "best AI tools in Netherlands 2026 · AI tools for Dutch businesses · Netherlands AI software · Netherlands AI directory · AI tools Amsterdam · AI tools Rotterdam · AI tools Eindhoven",
});

// ── New Zealand ──────────────────────────────────────────────────────────────
add('new-zealand', {
  cn:'New Zealand', adj:'New Zealand', flag:'🇳🇿',
  hero_badges: ['English & Māori', 'NZD Pricing', 'Privacy Act Compliant', 'AgTech Hub NZ'],
  faq_q1: "New Zealand has a growing AI ecosystem with strong research at the University of Auckland, University of Waikato, and Victoria University of Wellington. The startup scene centers on Auckland's growing tech hub, Wellington's creative tech cluster, and Christchurch's emerging innovation ecosystem.",
  faq_q2: "New Zealand's Privacy Act 2020 governs data protection, enforced by the Office of the Privacy Commissioner (OPC). We flag every tool for Privacy Act compliance, data residency options within New Zealand, and OPC guidance on AI.",
  faq_q3: "New Zealand's economy has distinct AI priorities: agtech and precision agriculture for dairy, sheep and horticulture, geospatial and environmental AI for conservation and natural disaster management, tourism AI for the visitor economy, creative AI in Wellington's film and game industry, and health AI for the public health system.",
  faq_q4: "New Zealand offers growing AI innovation support. Callaghan Innovation provides R&D grants and innovation funding. NZTE supports AI exports. The AI Forum of New Zealand coordinates ecosystem development. R&D tax credits of 15% benefit tech companies.",
  faq_q5: "New Zealand's AI regulatory framework includes the Privacy Act 2020 for data protection. Sector-specific regulations: Medsafe for health AI, RBNZ for financial AI. New Zealand's AI Guidelines set early standards. NZ participates in OECD AI policy discussions.",
  hero_pitch: "We rank every tool on Privacy Act compliance, NZD pricing, English-language support, and New Zealand tech ecosystem readiness — so you find tools built for NZ's unique market.",
  cat_sub: "Top picks for New Zealand teams — rated for Privacy Act compliance, NZD pricing, and English-language support.",
  why_cards: [
    {title:'English & Māori', desc:"New Zealand is predominantly English-speaking with Te Reo Māori as an official language. We flag every tool for NZ localization."},
    {title:'Privacy Act Compliance', desc:"New Zealand's Privacy Act 2020 governs data protection, enforced by the OPC. We evaluate tools for NZ data residency and OPC AI guidance."},
    {title:'Auckland Tech Hub', desc:"New Zealand produces strong tech talent from University of Auckland, University of Waikato, and AUT. The AI Forum coordinates a growing AI ecosystem."},
  ],
  eco_hdr: "New Zealand's AI Ecosystem Is a Pacific Innovation Hub",
  eco_sub: "From Auckland's growing tech scene to Wellington's world-class creative AI, New Zealand combines unique quality of life with deep expertise in agtech, geospatial AI, and creative technology.",
  eco_cards: [
    {title:"Auckland — New Zealand's Tech Capital 🇳🇿", desc:"Auckland is NZ's largest city and primary tech hub, home to the University of Auckland and AUT, plus a growing fintech, SaaS, and healthtech startup scene."},
    {title:"Wellington — Creative Tech & GovTech 🎓", desc:"Wellington is NZ's creative tech capital, anchored by Victoria University and Weta Workshop. The city excels in film VFX, game development, and govtech."},
    {title:"Christchurch — Emerging Innovation Hub 🏢", desc:"Christchurch is rebuilding as an innovation city, with the University of Canterbury driving agtech and geospatial AI."},
    {title:"AgTech & Environmental AI Hub 🔬", desc:"Callaghan Innovation provides R&D grants. The AI Forum coordinates a growing ecosystem. NZ's unique environment drives specialized AI applications."},
  ],
  cta_badge: "Built for New Zealand Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your New Zealand Business",
  cta_p: "No more guessing if a tool complies with the Privacy Act, supports NZ pricing, or works for Kiwi teams. Every tool on Apifeny AI is rated for NZ data compliance and NZD pricing.",
  seo_footer: "best AI tools in New Zealand 2026 · AI tools for NZ businesses · New Zealand AI software · New Zealand AI directory · AI tools Auckland · AI tools Wellington · AI tools Christchurch",
});

// ── Norway ───────────────────────────────────────────────────────────────────
add('norway', {
  cn:'Norway', adj:'Norwegian', flag:'🇳🇴',
  hero_badges: ['Norwegian & English', 'NOK Pricing', 'GDPR Compliant', 'Energy & Maritime AI'],
  faq_q1: "Norway has a growing AI ecosystem with strong research at NTNU (Trondheim), University of Oslo, and the Norwegian Computing Center (NR). The startup scene centers on Oslo's burgeoning tech hub, Trondheim's deep tech ecosystem, and Bergen's energy and maritime AI cluster.",
  faq_q2: "Norway's Data Protection Act supplements EU GDPR (via the EEA Agreement) with Norwegian provisions. Datatilsynet is highly active on AI guidance. We evaluate tools for Norwegian data residency, GDPR compliance, and Datatilsynet's AI guidance.",
  faq_q3: "Norway's economy has distinct AI priorities: oil and gas AI for offshore drilling and subsea operations, maritime and shipping AI for the world's 5th largest merchant fleet, renewable energy AI for hydropower and offshore wind, salmon farming AI for the world's largest seafood export, and health AI for the public healthcare system.",
  faq_q4: "Norway offers extensive AI innovation support. The Research Council of Norway funds AI research through IKTPLUSS. Innovation Norway provides grants for AI commercialization. The Norwegian AI Strategy coordinates efforts. Equinor's venture arm and the sovereign wealth fund support AI.",
  faq_q5: "Norway's AI regulatory framework combines EEA-relevant GDPR with the Norwegian Data Protection Act. Datatilsynet enforces AI-related privacy. Sector regulations: Norwegian Medicines Agency for health AI, Finanstilsynet for financial AI.",
  hero_pitch: "We rank every tool on GDPR compliance, NOK pricing, Norwegian-language support, and Norwegian tech ecosystem readiness — so you find tools built for Norway's unique market.",
  cat_sub: "Top picks for Norwegian teams — rated for GDPR compliance, NOK pricing, and Norwegian-language support.",
  why_cards: [
    {title:'Norwegian & English', desc:"Norwegian and English have high proficiency. Oslo is a growing Nordic tech hub. We flag every tool for Norwegian language support and Nordic localization."},
    {title:'GDPR & Norwegian Data Law', desc:"Norway's Data Protection Act supplements EEA-relevant GDPR. Datatilsynet is active on AI guidance. We evaluate tools for Norwegian data residency."},
    {title:'Oslo Energy & Maritime Hub', desc:"Norway produces strong AI research from NTNU and UiO. The sovereign wealth fund and Equinor's VC arm support deep tech AI with substantial capital."},
  ],
  eco_hdr: "Norway's AI Ecosystem Is a Nordic Energy & Maritime Leader",
  eco_sub: "From Oslo's growing tech scene to Trondheim's deep tech corridors, Norway combines sovereign wealth, world-leading energy infrastructure, and a strong tradition of maritime innovation.",
  eco_cards: [
    {title:"Oslo — Growing Tech Hub 🇳🇴", desc:"Oslo is Norway's primary tech hub, anchored by the University of Oslo and a growing startup ecosystem in fintech, health tech, and enterprise SaaS."},
    {title:"Trondheim — Deep Tech & Research 🎓", desc:"Trondheim, home to NTNU (Norway's top engineering school), is a hub for deep tech, industrial AI, and ocean technology. Strong spinoff culture from SINTEF research."},
    {title:"Bergen — Energy & Maritime AI 🏢", desc:"Bergen, Norway's oil and gas hub, drives AI in offshore energy, subsea operations, and maritime logistics. University of Bergen excels in marine and climate AI."},
    {title:"Sovereign Innovation Engine 🔬", desc:"The Research Council of Norway funds AI through IKTPLUSS. Innovation Norway grants support commercialization. Norway's $1.7T sovereign wealth fund catalyzes AI investment."},
  ],
  cta_badge: "Built for Norwegian Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Norwegian Business",
  cta_p: "No more guessing if a tool complies with GDPR, supports Norwegian, or works for Norwegian teams. Every tool on Apifeny AI is rated for Norwegian data compliance, NOK pricing, and Norwegian-language readiness.",
  seo_footer: "best AI tools in Norway 2026 · AI tools for Norwegian businesses · Norway AI software · Norway AI directory · AI tools Oslo · AI tools Trondheim · AI tools Bergen",
});

// ── Poland ───────────────────────────────────────────────────────────────────
add('poland', {
  cn:'Poland', adj:'Polish', flag:'🇵🇱',
  hero_badges: ['Polish & English', 'PLN Pricing', 'GDPR Compliant', 'IT Outsourcing Hub'],
  faq_q1: "Poland has a thriving AI ecosystem with strong research at University of Warsaw, Warsaw University of Technology, AGH Krakow, and Jagiellonian University. The startup scene centers on Warsaw's growing fintech hub, Krakow's deep tech cluster, and Wroclaw's IT outsourcing corridor.",
  faq_q2: "Poland's data protection framework implements EU GDPR, enforced by the Personal Data Protection Office (UODO). We flag every tool for GDPR compliance, Polish data residency, and UODO guidance on AI.",
  faq_q3: "Poland's economy has distinct AI priorities: IT outsourcing and nearshore services (3rd largest in the world), fintech AI in Warsaw, manufacturing AI for Poland's automotive and electronics sectors, gaming AI for the world-class game industry (CD Projekt, Techland), and health AI for the public healthcare system.",
  faq_q4: "Poland offers growing AI innovation support through the National Centre for Research and Development (NCBR). The Polish Development Fund (PFR) invests in AI startups. R&D tax relief allows deduction of up to 200% of qualifying costs. The Polish AI Strategy coordinates efforts.",
  faq_q5: "Poland's AI regulatory framework combines EU GDPR with the Polish Data Protection Act. UODO enforces AI-related privacy. Sector regulations: URPL for health AI, KNF for financial AI. Poland actively participates in EU AI Act development.",
  hero_pitch: "We rank every tool on GDPR compliance, PLN pricing, Polish-language support, and Polish tech ecosystem readiness — so you find tools built for Poland's unique market.",
  cat_sub: "Top picks for Polish teams — rated for GDPR compliance, PLN pricing, and Polish-language support.",
  why_cards: [
    {title:'Polish & English', desc:"Polish is the official language with strong English proficiency in tech. Poland has the 3rd largest IT talent pool in Europe. We flag every tool for Polish support."},
    {title:'GDPR & Polish Data Law', desc:"Poland implements EU GDPR. The UODO enforce AI-related privacy. We evaluate tools for Polish data residency and UODO guidance."},
    {title:'Warsaw Tech & Innovation Hub', desc:"Poland produces 20,000+ CS graduates annually. Warsaw, Krakow, and Wroclaw are major tech hubs. Polish game dev and fintech are world-class."},
  ],
  eco_hdr: "Poland's AI Ecosystem Is Central Europe's Tech Powerhouse",
  eco_sub: "From Warsaw's fintech scene to Krakow's deep tech cluster, Poland combines Europe's 3rd largest IT talent pool with a rapidly maturing startup ecosystem.",
  eco_cards: [
    {title:"Warsaw — Fintech & Corporate Hub 🇵🇱", desc:"Warsaw is Poland's primary tech hub with a booming fintech ecosystem, strong corporate R&D centers, and top universities (UW, PW)."},
    {title:"Krakow — Deep Tech & Gaming 🎓", desc:"Krakow hosts AGH University, Jagiellonian University, and a thriving tech scene. The city is a hub for deep tech, cybersecurity, and gaming (CD Projekt)."},
    {title:"Wroclaw — IT & Outsourcing Corridor 🏢", desc:"Wroclaw is a major IT outsourcing hub with Google, Nokia, and Amazon R&D centers. Wroclaw Tech University produces top engineering talent."},
    {title:"Central European Talent Engine 🔬", desc:"Poland produces 20,000+ CS graduates annually. NCBR and PFR provide substantial R&D grants. 200% R&D tax relief is among Europe's most generous."},
  ],
  cta_badge: "Built for Polish Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Polish Business",
  cta_p: "No more guessing if a tool complies with GDPR, supports Polish, or works for Polish teams.",
  seo_footer: "best AI tools in Poland 2026 · AI tools for Polish businesses · Poland AI software · Poland AI directory · AI tools Warsaw · AI tools Krakow · AI tools Wroclaw",
});

// ── Portugal ─────────────────────────────────────────────────────────────────
add('portugal', {
  cn:'Portugal', adj:'Portuguese', flag:'🇵🇹',
  hero_badges: ['Portuguese & English', 'EUR Pricing', 'GDPR Compliant', 'Startup Hub EU'],
  faq_q1: "Portugal has a growing AI ecosystem with strong research at Instituto Superior Técnico (IST Lisbon), University of Coimbra, and University of Porto. The startup scene centers on Lisbon's thriving tech hub (Web Summit ecosystem), Porto's engineering corridor, and Coimbra's deep tech research.",
  faq_q2: "Portugal's data protection framework implements EU GDPR, enforced by the National Data Protection Commission (CNPD). We flag every tool for GDPR compliance, Portuguese data residency, and CNPD guidance on AI.",
  faq_q3: "Portugal's economy has distinct AI priorities: tourism AI for the massive hospitality sector, fintech AI in Lisbon (one of Europe's fastest growing fintech hubs), renewable energy AI for wind and solar, agtech for wine and olive production, and shipping and logistics AI.",
  faq_q4: "Portugal offers growing AI innovation support through ANI (National Innovation Agency) and Portugal 2030 programs. Startup Portugal coordinates ecosystem development. R&D tax incentives (SIFIDE) provide up to 82.5% of qualifying R&D costs. VC is growing through funds like Indico Capital and Bynd.",
  faq_q5: "Portugal's AI regulatory framework combines EU GDPR with the Portuguese Data Protection Act. CNPD enforces AI-related privacy. Sector regulations: INFARMED for health AI, Banco de Portugal for financial AI. Portugal's AI Strategy sets ethical guidelines.",
  hero_pitch: "We rank every tool on GDPR compliance, EUR pricing, Portuguese-language support, and Portuguese tech ecosystem readiness — so you find tools built for Portugal's unique market.",
  cat_sub: "Top picks for Portuguese teams — rated for GDPR compliance, EUR pricing, and Portuguese-language support.",
  why_cards: [
    {title:'Portuguese & English', desc:"Portuguese is the official language with high English proficiency in tech. Lisbon's Web Summit ecosystem is one of Europe's fastest growing."},
    {title:'GDPR & Portuguese Data Law', desc:"Portugal implements EU GDPR. The CNPD enforces AI-related privacy. We evaluate tools for Portuguese data residency."},
    {title:'Lisbon Tech & Innovation Hub', desc:"Portugal produces strong tech talent from IST Lisbon, University of Porto, and University of Coimbra. R&D tax incentives (SIFIDE) are among Europe's best."},
  ],
  eco_hdr: "Portugal's AI Ecosystem Is Southern Europe's Rising Tech Star",
  eco_sub: "From Lisbon's thriving startup scene to Porto's engineering corridor, Portugal combines Atlantic energy with a booming tech ecosystem powered by Web Summit and EU funding.",
  eco_cards: [
    {title:"Lisbon — Startup Hub 🇵🇹", desc:"Lisbon is one of Europe's fastest growing startup ecosystems, anchored by IST (Instituto Superior Técnico), Web Summit, and thriving fintech, SaaS, and tourism tech sectors."},
    {title:"Porto — Engineering & Fintech Corridor 🎓", desc:"Porto, home to University of Porto and FEUP, is a major engineering hub with growing fintech and healthtech ecosystems."},
    {title:"Coimbra — Deep Tech & Research 🏢", desc:"Coimbra hosts one of Europe's oldest universities and a growing deep tech ecosystem spanning AI, biotech, and biomedical engineering."},
    {title:"Atlantic Innovation Gateway 🔬", desc:"Portugal offers one of Europe's best R&D tax incentive systems (SIFIDE, up to 82.5% of R&D costs). The Portuguese tech ecosystem is globally connected via Web Summit and growing VC community."},
  ],
  cta_badge: "Built for Portuguese Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Portuguese Business",
  cta_p: "No more guessing if a tool complies with GDPR, supports Portuguese, or works for Portuguese teams.",
  seo_footer: "best AI tools in Portugal 2026 · AI tools for Portuguese businesses · Portugal AI software · Portugal AI directory · AI tools Lisbon · AI tools Porto · AI tools Coimbra",
});

// ── Russia ───────────────────────────────────────────────────────────────────
add('russia', {
  cn:'Russia', adj:'Russian', flag:'🇷🇺',
  hero_badges: ['Russian & English', 'RUB Pricing', 'Data Protection', 'Moscow Innovation'],
  faq_q1: "Russia has a strong AI ecosystem with world-class research at Moscow State University, Skoltech, and Moscow Institute of Physics and Technology (MIPT). The startup scene centers on Moscow's Skolkovo innovation center, St. Petersburg's tech hub, and Novosibirsk's Akademgorodok research cluster.",
  faq_q2: "Russia's Federal Law No. 152-FZ on Personal Data governs data protection, enforced by Roskomnadzor. Data localization requirements mandate Russian servers for personal data. We flag every tool for 152-FZ compliance, Russian data residency, and Roskomnadzor AI guidance.",
  faq_q3: "Russia's economy has distinct AI priorities: natural language processing for Russian language (the largest European internet market), computer vision and security AI, search engine and recommendation AI (Yandex), fintech AI in Moscow, and industrial AI for energy and manufacturing.",
  faq_q4: "Russia offers extensive AI innovation support through the National AI Strategy and the AI Federal Project. Skolkovo Foundation provides grants and incubation. The Russian Development Fund (RVC) invests in AI. Yandex and Sberbank run major AI research labs.",
  faq_q5: "Russia's AI regulatory framework centers on 152-FZ for data protection with data localization requirements. The National AI Strategy (2019) sets development priorities. Sector regulations: Ministry of Health for medical AI, Central Bank for financial AI. Russia is developing a national AI code of ethics.",
  hero_pitch: "We rank every tool on 152-FZ compliance, RUB pricing, Russian-language support, and Russian tech ecosystem readiness — so you find tools built for Russia's unique market.",
  cat_sub: "Top picks for Russian teams — rated for 152-FZ compliance, RUB pricing, and Russian-language support.",
  why_cards: [
    {title:'Russian & English', desc:"Russian is the official language with the largest European internet market. Yandex's AI ecosystem is one of the world's most sophisticated."},
    {title:'152-FZ Data Protection', desc:"Russia's 152-FZ governs data protection with localization requirements. Roskomnadzor enforces compliance. We evaluate tools for Russian data residency."},
    {title:'Moscow & St. Petersburg Innovation', desc:"Russia produces strong AI research from MSU, Skoltech, and MIPT. Yandex and Sberbank run world-class AI labs. Skolkovo provides startup support."},
  ],
  eco_hdr: "Russia's AI Ecosystem Is a Eurasian Research Powerhouse",
  eco_sub: "From Moscow's Yandex AI lab to Novosibirsk's Akademgorodok, Russia combines deep mathematical traditions with world-class CS research and vast natural language AI opportunities.",
  eco_cards: [
    {title:"Moscow — Skolkovo & AI Capital 🇷🇺", desc:"Moscow is Russia's AI capital, anchored by Skolkovo innovation center, MSU, and MIPT. Yandex, Sberbank, and VK run major AI research labs."},
    {title:"St. Petersburg — Tech & Research Hub 🎓", desc:"St. Petersburg hosts ITMO University (one of the world's top CS schools) and a growing startup ecosystem in fintech and enterprise SaaS."},
    {title:"Novosibirsk — Akademgorodok 🏢", desc:"Novosibirsk's Akademgorodok (Academy Town) is a world-renowned research cluster with Novosibirsk State University and dozens of research institutes."},
    {title:"Natural Language AI Giant 🔬", desc:"The Russian internet market is the largest in Europe. Yandex's search, NLP, and recommendation AI are world-class. The National AI Strategy funds research and commercialization."},
  ],
  cta_badge: "Built for Russian Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Russian Business",
  cta_p: "No more guessing if a tool complies with 152-FZ, supports Russian, or works for Russian teams.",
  seo_footer: "best AI tools in Russia 2026 · AI tools for Russian businesses · Russia AI software · Russia AI directory · AI tools Moscow · AI tools St. Petersburg · AI tools Novosibirsk",
});

// ── South Africa ─────────────────────────────────────────────────────────────
add('south-africa', {
  cn:'South Africa', adj:'South African', flag:'🇿🇦',
  hero_badges: ['English & Afrikaans', 'ZAR Pricing', 'POPIA Compliant', 'Cape Town Tech'],
  faq_q1: "South Africa has a growing AI ecosystem with strong research at University of Cape Town, Stellenbosch University, and Wits University. The startup scene centers on Cape Town's vibrant tech hub (Silicon Cape), Johannesburg's fintech corridor, and Stellenbosch's deep tech ecosystem.",
  faq_q2: "South Africa's Protection of Personal Information Act (POPIA) governs data protection, enforced by the Information Regulator. We flag every tool for POPIA compliance, data residency options within South Africa, and Information Regulator guidance on AI.",
  faq_q3: "South Africa's economy has distinct AI priorities: fintech AI for Africa's most sophisticated financial sector, mining tech AI for deep-level and platinum mining, health AI for the public and private healthcare system, agtech for the agricultural sector, and logistic and retail AI.",
  faq_q4: "South Africa offers growing AI innovation support. The Department of Science & Innovation (DSI) funds AI research through the Centre for AI Research (CAIR). The Industrial Development Corporation (IDC) supports tech startups. VC is growing through funds like Naspers/Prosus, Knife Capital, and Kalon Venture Partners.",
  faq_q5: "South Africa's AI regulatory framework includes POPIA for data protection, enforced by the Information Regulator. Sector regulations: SAHPRA for health AI, FSCA for financial AI. South Africa's AI strategy (AI4SA) and the Fourth Industrial Revolution Commission set guidelines.",
  hero_pitch: "We rank every tool on POPIA compliance, ZAR pricing, English-language support, and South African tech ecosystem readiness — so you find tools built for SA's unique market.",
  cat_sub: "Top picks for South African teams — rated for POPIA compliance, ZAR pricing, and English-language support.",
  why_cards: [
    {title:'English & Afrikaans', desc:"South Africa has 11 official languages with English as the primary business language. Cape Town's Silicon Cape is a leading African tech hub."},
    {title:'POPIA Compliance', desc:"South Africa's POPIA governs data protection, enforced by the Information Regulator. We evaluate tools for SA data residency and POPIA compliance."},
    {title:'Cape Town Innovation Hub', desc:"South Africa produces strong tech talent from UCT, Stellenbosch, and Wits. Naspers/Prosus and CAIR drive AI research. The fintech ecosystem is Africa's most sophisticated."},
  ],
  eco_hdr: "South Africa's AI Ecosystem Is Africa's Tech Leader",
  eco_sub: "From Cape Town's vibrant startup scene to Johannesburg's fintech corridor, South Africa combines Africa's most sophisticated financial sector with world-class research universities.",
  eco_cards: [
    {title:"Cape Town — Silicon Cape 🇿🇦", desc:"Cape Town is Africa's leading tech hub, anchored by UCT, Stellenbosch University, and the Silicon Cape initiative. The city excels in fintech, SaaS, and healthtech."},
    {title:"Johannesburg — Fintech Corridor 🎓", desc:"Johannesburg, Africa's financial capital, hosts Wits University and a booming fintech ecosystem. Corporate innovation from SA's largest banks and insurers."},
    {title:"Stellenbosch — Deep Tech Ecosystem 🏢", desc:"Stellenbosch University drives deep tech in agtech, biotech, and wine tech. LaunchLab provides startup incubation. The Stellenbosch innovation district is world-class."},
    {title:"African AI Innovation Gateway 🔬", desc:"South Africa has Africa's most advanced digital economy. The DSI funds CAIR. Naspers/Prosus ($100B+ market cap) is the world's largest tech investor in emerging markets."},
  ],
  cta_badge: "Built for South African Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your South African Business",
  cta_p: "No more guessing if a tool complies with POPIA, supports English, or works for South African teams.",
  seo_footer: "best AI tools in South Africa 2026 · AI tools for South African businesses · South Africa AI software · South Africa AI directory · AI tools Cape Town · AI tools Johannesburg · AI tools Stellenbosch",
});

// ── Spain ────────────────────────────────────────────────────────────────────
add('spain', {
  cn:'Spain', adj:'Spanish', flag:'🇪🇸',
  hero_badges: ['Español & English', 'EUR Pricing', 'GDPR Compliant', 'Barcelona Tech'],
  faq_q1: "Spain has a thriving AI ecosystem with strong research at Universitat Politècnica de Catalunya (UPC), Universidad Politécnica de Madrid (UPM), and University of Barcelona. The startup scene centers on Barcelona's world-class tech hub, Madrid's fintech/enterprise corridor, and Valencia's emerging startup ecosystem.",
  faq_q2: "Spain's data protection framework implements EU GDPR via the Organic Law on Data Protection (LOPDGDD), enforced by the Spanish Data Protection Agency (AEPD). We flag every tool for GDPR compliance, Spanish data residency, and AEPD guidance on AI.",
  faq_q3: "Spain's economy has distinct AI priorities: tourism AI for the world's second-most visited country, fintech AI in Madrid and Barcelona, manufacturing AI for automotive (SEAT) and textiles, agrifood AI for olive oil, wine, and fruit exports, and renewable energy AI for wind and solar.",
  faq_q4: "Spain offers growing AI innovation support through the Centre for the Development of Industrial Technology (CDTI). The Spanish AI Strategy (ENIA) coordinates efforts. R&D tax credits provide up to 42% of qualifying costs. VC is strong through funds like K Fund, Seaya, and Nauta Capital.",
  faq_q5: "Spain's AI regulatory framework combines EU GDPR with the LOPDGDD. The AEPD is one of Europe's most active DPAs. Sector regulations: AEMPS for health AI, CNMV for financial AI. Spain's ENIA and the Spanish AI Ethics Observatory set guidelines.",
  hero_pitch: "We rank every tool on GDPR compliance, EUR pricing, Spanish-language support, and Spanish tech ecosystem readiness — so you find tools built for Spain's unique market.",
  cat_sub: "Top picks for Spanish teams — rated for GDPR compliance, EUR pricing, and Spanish-language support.",
  why_cards: [
    {title:'Spanish & English', desc:"Spanish is the official language with high English proficiency in tech hubs Barcelona and Madrid. Spain is the #2 most visited country globally."},
    {title:'GDPR & Spanish Data Law', desc:"Spain's LOPDGDD implements EU GDPR. The AEPD is one of Europe's most active DPAs. We evaluate tools for Spanish data residency."},
    {title:'Barcelona Tech & Innovation', desc:"Spain produces strong tech talent from UPC, UPM, and UB. Barcelona is one of Europe's top 5 startup ecosystems. CDTI and ENIA provide substantial support."},
  ],
  eco_hdr: "Spain's AI Ecosystem Is Southern Europe's Rising Tech Star",
  eco_sub: "From Barcelona's world-class startup scene to Madrid's fintech corridor, Spain combines a massive domestic market with strong tech talent and EU connectivity.",
  eco_cards: [
    {title:"Barcelona — Southern Europe's Tech Capital 🇪🇸", desc:"Barcelona is one of Europe's top startup ecosystems, anchored by UPC, Mobile World Capital, and thriving SaaS, biotech, and tourism tech sectors."},
    {title:"Madrid — Fintech & Enterprise Hub 🎓", desc:"Madrid is Spain's economic and political capital, home to UPM and UC3M, a booming fintech ecosystem, and major corporate innovation centers."},
    {title:"Valencia — Emerging Startup Hub 🏢", desc:"Valencia is a rising tech hub with a growing startup scene, strong university ecosystem, and a focus on agtech, gaming, and logistics AI."},
    {title:"EU Innovation Engine 🔬", desc:"Spain offers one of Europe's most extensive R&D tax credit systems (up to 42%). CDTI and ENIA provide grants. Barcelona and Madrid are top 10 EU startup capitals."},
  ],
  cta_badge: "Built for Spanish Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Spanish Business",
  cta_p: "No more guessing if a tool complies with GDPR, supports Spanish, or works for Spanish teams.",
  seo_footer: "best AI tools in Spain 2026 · AI tools for Spanish businesses · Spain AI software · Spain AI directory · AI tools Barcelona · AI tools Madrid · AI tools Valencia",
});

// ── Sweden ───────────────────────────────────────────────────────────────────
add('sweden', {
  cn:'Sweden', adj:'Swedish', flag:'🇸🇪',
  hero_badges: ['Swedish & English', 'SEK/EUR Pricing', 'GDPR Compliant', 'Nordic AI Leader'],
  faq_q1: "Sweden has a world-class AI ecosystem with strong research at KTH Royal Institute of Technology, Chalmers University of Technology, and Lund University. The startup scene centers on Stockholm's thriving tech hub (one of Europe's top startup ecosystems per capita), Gothenburg's industrial AI cluster, and Lund's deep tech corridor.",
  faq_q2: "Sweden's Data Protection Act supplements EU GDPR with Swedish-specific provisions. The Swedish Authority for Privacy Protection (IMY) enforces AI-related privacy. We flag every tool for GDPR compliance, Swedish data residency, and IMY guidance.",
  faq_q3: "Sweden's economy has distinct AI priorities: fintech AI in Stockholm (Klarna, iZettle, Trustly), gaming AI for the world-class game industry (King, Mojang, Embracer), health AI leveraging Sweden's digitized healthcare system, industrial AI for manufacturing (Volvo, Scania, Ericsson), and green AI for renewable energy and cleantech.",
  faq_q4: "Sweden offers extensive AI innovation support. Vinnova funds AI research and innovation. The Swedish AI Strategy coordinates national efforts. Almi and the Swedish Venture Capital Forum support startups. R&D tax reduction covers up to 50% of R&D wages.",
  faq_q5: "Sweden's AI regulatory framework combines EU GDPR with the Swedish Data Protection Act. IMY enforces AI-related privacy. Sector regulations: Swedish Medical Products Agency for health AI, Finansinspektionen for financial AI. Sweden's AI strategy sets ethical guidelines.",
  hero_pitch: "We rank every tool on GDPR compliance, SEK/EUR pricing, Swedish-language support, and Swedish tech ecosystem readiness — so you find tools built for Sweden's unique market.",
  cat_sub: "Top picks for Swedish teams — rated for GDPR compliance, SEK pricing, and Swedish-language support.",
  why_cards: [
    {title:'Swedish & English', desc:"Sweden has near-universal English proficiency. Stockholm is one of Europe's top startup ecosystems per capita (the 'Unicorn Factory')."},
    {title:'GDPR & Swedish Data Law', desc:"Sweden's Data Protection Act supplements EU GDPR. IMY enforces AI-related privacy. We evaluate tools for Swedish data residency."},
    {title:'Stockholm Unicorn Factory', desc:"Sweden produces world-class AI research from KTH, Chalmers, and Lund. Vinnova and the Swedish AI Strategy provide substantial AI support."},
  ],
  eco_hdr: "Sweden's AI Ecosystem Is a Nordic Unicorn Factory",
  eco_sub: "From Stockholm's world-class startup scene to Gothenburg's industrial AI, Sweden combines a massive startup success rate with strong research and social trust.",
  eco_cards: [
    {title:"Stockholm — The Unicorn Factory 🇸🇪", desc:"Stockholm produces more unicorns per capita than any region outside Silicon Valley. Home to Klarna, Spotify, King, iZettle, and a world-class VC ecosystem."},
    {title:"Gothenburg — Industrial & Automotive AI 🎓", desc:"Gothenburg, home to Chalmers University and Volvo, drives AI in automotive, manufacturing, and shipping. The Gothenburg tech scene is growing rapidly."},
    {title:"Lund — Deep Tech & Research 🏢", desc:"Lund University and Ideon Science Park form one of Europe's most concentrated deep tech ecosystems. Strong in biotech, AI hardware, and life sciences."},
    {title:"Nordic Innovation Engine 🔬", desc:"Vinnova provides substantial AI R&D funding. Sweden has the highest startup density in the EU. R&D tax reduction covers up to 50% of R&D wages."},
  ],
  cta_badge: "Built for Swedish Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Swedish Business",
  cta_p: "No more guessing if a tool complies with GDPR, supports Swedish, or works for Swedish teams.",
  seo_footer: "best AI tools in Sweden 2026 · AI tools for Swedish businesses · Sweden AI software · Sweden AI directory · AI tools Stockholm · AI tools Gothenburg · AI tools Lund",
});

// ── Switzerland ──────────────────────────────────────────────────────────────
add('switzerland', {
  cn:'Switzerland', adj:'Swiss', flag:'🇨🇭',
  hero_badges: ['German / French / Italian', 'CHF Pricing', 'GDPR (FADP) Compliant', 'ETH Zurich Hub'],
  faq_q1: "Switzerland has a world-class AI ecosystem with research at ETH Zurich (one of the world's top AI research institutions), EPFL Lausanne, and University of Zurich. The startup scene centers on Zurich's thriving AI hub, Lausanne's EPFL innovation district, and Basel's life sciences AI cluster.",
  faq_q2: "Switzerland's Federal Act on Data Protection (FADP / nFADP) governs data protection, enforced by the Federal Data Protection and Information Commissioner (FDPIC). We flag every tool for FADP compliance, Swiss data residency, and FDPIC guidance on AI.",
  faq_q3: "Switzerland's economy has distinct AI priorities: pharma and life sciences AI for Basel's global drug industry (Novartis, Roche), fintech and wealth management AI in Zurich and Geneva, advanced manufacturing AI for precision instruments, agrifood AI for the food industry, and proptech and climate AI.",
  faq_q4: "Switzerland offers extensive AI innovation support. Innosuisse provides innovation grants and coaching. The Swiss National Science Foundation (SNSF) funds AI research. ETH Zurich and EPFL spinout support programs are world-class. Swiss VC is growing through funds like Lakestar and Index Ventures.",
  faq_q5: "Switzerland's AI regulatory framework includes the FADP for data protection. Sector regulations: Swissmedic for health AI, FINMA for financial AI. Switzerland follows OECD AI principles. The National AI Strategy (2020) sets guidelines. Swiss AI ethics conversations are led by the SATW.",
  hero_pitch: "We rank every tool on FADP compliance, CHF pricing, multilingual (DE/FR/IT) support, and Swiss tech ecosystem readiness — so you find tools built for Switzerland's unique market.",
  cat_sub: "Top picks for Swiss teams — rated for FADP compliance, CHF pricing, and multilingual support.",
  why_cards: [
    {title:'German / French / Italian', desc:"Switzerland has four official languages (German, French, Italian, Romansh). ETH Zurich and EPFL are world top-10 CS schools. We flag every tool for Swiss multilingual support."},
    {title:'FADP & Swiss Data Law', desc:"Switzerland's nFADP governs data protection, enforced by the FDPIC. While not EU, Swiss law is GDPR-adequate. We evaluate tools for Swiss data residency."},
    {title:'ETH Zurich & EPFL Hub', desc:"Switzerland produces world-leading AI research from ETH Zurich (home to renowned AI researchers) and EPFL. Innosuisse and SNSF provide substantial grants."},
  ],
  eco_hdr: "Switzerland's AI Ecosystem Is a Global Innovation Leader",
  eco_sub: "From Zurich's world-class ETH AI labs to Basel's pharma AI, Switzerland combines the world's top innovation index ranking with deep capital markets and multilingual talent.",
  eco_cards: [
    {title:"Zurich — ETH & AI Capital 🇨🇭", desc:"Zurich, anchored by ETH Zurich (among the world's top AI institutions) and the University of Zurich, is Switzerland's primary AI hub. The city's fintech and insurtech ecosystem is world-class."},
    {title:"Lausanne — EPFL Innovation District 🎓", desc:"Lausanne's EPFL is one of Europe's top engineering schools. The EPFL Innovation Park hosts 200+ startups. Strong in AI hardware, robotics, and environmental AI."},
    {title:"Basel — Life Sciences AI 🏢", desc:"Basel is the global capital of pharma (Novartis, Roche, Syngenta). AI for drug discovery, clinical trials, and genomics is a major focus. University of Basel drives computational biology."},
    {title:"Global Innovation & Capital Hub 🔬", desc:"Switzerland ranks #1 in the Global Innovation Index. The world's most competitive economy with deep capital markets (Zurich, Geneva). Innosuisse funds innovation. ETH/EPFL spinout support is world-class."},
  ],
  cta_badge: "Built for Swiss Founders, Researchers & Enterprises",
  cta_h2: "Find the Right AI Tool for Your Swiss Business",
  cta_p: "No more guessing if a tool complies with FADP, supports German/French/Italian, or works for Swiss teams. Every tool on Apifeny AI is rated for Swiss data compliance, CHF pricing, and multilingual readiness.",
  seo_footer: "best AI tools in Switzerland 2026 · AI tools for Swiss businesses · Switzerland AI software · Switzerland AI directory · AI tools Zurich · AI tools Lausanne · AI tools Basel",
});

// ─── Apply All Fixes ──────────────────────────────────────────────────────────

function applyFixes(slug, content) {
  const data = C[slug];
  if (!data) return content;
  const c = data;

  // Helper: replace all occurrences of old strings with new
  function r(from, to) { content = content.split(from).join(to); }

  // Count of replacements applied
  let count = 0;

  // ── 1. Hero section: badges ──────────────────────────────────────────
  // Replace the hero badge list (pipe-separated string of 4 items)
  // Pattern: ['English / French', 'CAD Pricing', 'PIPEDA Compliant', 'AI Research Hub']
  r(`'English / French', 'CAD Pricing', 'PIPEDA Compliant', 'AI Research Hub'`, 
    `'${c.hero_badges.join(`', '`)}'`);

  // ── 2. FAQ Q1: "What are the best AI tools in [Country]?" ──────────
  // Pattern contains "Vector Institute in Toronto, Mila in Montreal" etc.
  // Find the answer string that contains Canadian references
  if (c.faq_q1) {
    // The Canadian answer starts after "Answer:" and contains Vector Institute/Mila/Amii
    // We replace the entire answer content
    const canadianFaqQ1 = /answer:\s*"[^"]*Vector Institute[^"]*Mila[^"]*Amii[^"]*"/;
    content = content.replace(canadianFaqQ1, `answer: "${c.faq_q1}"`);
    if (content.match(canadianFaqQ1)) count++;
    // Fallback: try without the Vector Institute / Mila / Amii pattern
    if (!c.faq_q1_applied) {
      // Try finding the answer by looking for "global AI powerhouse"
      const oldPattern = /answer:\s*"The best AI tools in [^"]*?global AI powerhouse[^"]*?Waterloo[^"]*"/;
      content = content.replace(oldPattern, `answer: "${c.faq_q1}"`);
    }
  }

  // ── 3. FAQ Q2: Privacy/data protection ─────────────────────────────
  // Contains "PIPEDA", "Quebec", "Law 25", "Charter of the French Language"
  if (c.faq_q2) {
    const patterns = [
      /answer:\s*"[^"]*?PIPEDA[^"]*?Quebec[^"]*?Law 25[^"]*?Charter of the French Language[^"]*"/,
      /answer:\s*"[^"]*?PIPEDA[^"]*?Quebec[^"]*?Law 25[^"]*"/,
      /answer:\s*"[^"]*?PIPEDA[^"]*?Law 25[^"]*"/,
    ];
    for (const p of patterns) {
      const m = content.match(p);
      if (m) {
        content = content.replace(m[0], `answer: "${c.faq_q2}"`);
        break;
      }
    }
  }

  // ── 4. FAQ Q3: Key industries ───────────────────────────────────────
  // Contains "mining, forestry, cleantech" or other Canadian industries
  if (c.faq_q3) {
    const patterns = [
      /answer:\s*"[^"]*?mining[^"]*?forestry[^"]*?cleantech[^"]*"/,
      /answer:\s*"[^"]*?mining[^"]*?forestry[^"]*"/,
    ];
    for (const p of patterns) {
      const m = content.match(p);
      if (m) {
        content = content.replace(m[0], `answer: "${c.faq_q3}"`);
        break;
      }
    }
  }

  // ── 5. FAQ Q4: Funding ────────────────────────────────────────────
  // Contains "SR&ED", "CIFAR", "IRAP", "Pan-Canadian"
  if (c.faq_q4) {
    const patterns = [
      /answer:\s*"[^"]*?SR&ED[^"]*?CIFAR[^"]*?IRAP[^"]*"/,
      /answer:\s*"[^"]*?SR&ED[^"]*?CIFAR[^"]*"/,
      /answer:\s*"[^"]*?SR&ED[^"]*?Pan-Canadian[^"]*"/,
      /answer:\s*"[^"]*?SR&ED[^"]*"/,
    ];
    for (const p of patterns) {
      const m = content.match(p);
      if (m) {
        content = content.replace(m[0], `answer: "${c.faq_q4}"`);
        break;
      }
    }
  }

  // ── 6. FAQ Q5: Regulations ────────────────────────────────────────
  // Contains "AIDA", "PIPEDA", "OSFI", "Quebec"
  if (c.faq_q5) {
    const patterns = [
      /answer:\s*"[^"]*?AIDA[^"]*?PIPEDA[^"]*?OSFI[^"]*"/,
      /answer:\s*"[^"]*?AIDA[^"]*?PIPEDA[^"]*"/,
      /answer:\s*"[^"]*?PIPEDA[^"]*?OSFI[^"]*"/,
      /answer:\s*"[^"]*?PIPEDA[^"]*"/,
    ];
    for (const p of patterns) {
      const m = content.match(p);
      if (m) {
        content = content.replace(m[0], `answer: "${c.faq_q5}"`);
        break;
      }
    }
  }

  // ── 7. Hero pitch line ────────────────────────────────────────────
  // Contains "PIPEDA", "Quebec", "French/English", "CAD" in the pitch
  if (c.hero_pitch) {
    const canadianPitch = /We rank every tool on PIPEDA[^"]*Quebec[^"]*CAD[^"]*Toronto[^"]*Montreal[^"]*Vancouver[^"]*/;
    const m = content.match(canadianPitch);
    if (m) {
      content = content.replace(m[0], c.hero_pitch);
    }
  }

  // ── 8. Category subtitle ──────────────────────────────────────────
  if (c.cat_sub) {
    const canadianSub = /Top picks for [^s]*?teams[^.]*?PIPEDA[^.]*?CAD[^.]*?French[^.]*?Canadian[^.]*?\./;
    const m = content.match(canadianSub);
    if (m) {
      content = content.replace(m[0], c.cat_sub);
    }
  }

  // ── 9. Why US cards ────────────────────────────────────────────────
  if (c.why_cards) {
    // Replace card titles and descriptions one by one
    // Card 1: French/English
    const card1Title = /{title:\s*'English & French'/;
    const m1 = content.match(card1Title);
    if (m1 && c.why_cards[0]) {
      // Find the exact card object and replace it
      const card1Start = /{title:\s*'English & French',\s*desc:/;
      const card1End = /{\s*'/;
      // Simple approach: replace the first occurrence of known card patterns
      r(`{title:'English & French',desc:"Canada is officially bilingual (English and French) with Quebec's Charter of the French Language requiring French-first interfaces in the province. Toronto and Vancouver are major AI hubs. We flag every tool for bilingual support, Canadian compliance, and North American localization."}`,
        `{title:'${c.why_cards[0].title}',desc:"${c.why_cards[0].desc}"}`);
    }

    if (c.why_cards[1]) {
      r(`{title:'PIPEDA & Quebec Law 25',desc:"Canada's PIPEDA governs federal data protection while Quebec's Law 25 adds provincial requirements with strict consent rules. British Columbia and Alberta have their own private-sector privacy laws. We evaluate tools for Canadian data residency and multi-provider compliance."}`,
        `{title:'${c.why_cards[1].title}',desc:"${c.why_cards[1].desc}"}`);
    }

    if (c.why_cards[2]) {
      r(`{title:'Toronto-Waterloo AI Corridor',desc:"Canada is a global AI powerhouse — home to the Vector Institute in Toronto, Mila in Montreal, and the Alberta Machine Intelligence Institute (Amii). CIFAR's Pan-Canadian AI Strategy has produced foundational AI breakthroughs at U of T, McGill, UBC, and Waterloo. National research funding is among the world's most generous."}`,
        `{title:'${c.why_cards[2].title}',desc:"${c.why_cards[2].desc}"}`);
    }
  }

  // ── 10. Ecosystem section header ──────────────────────────────────
  if (c.eco_hdr) {
    const canadianEcoHdr = /Canada's AI Ecosystem[^"]*/;
    const m = content.match(/Canada's AI Ecosystem[^"]*"/);
    if (m) {
      content = content.replace(`Canada's AI Ecosystem${m[0].substring(21)}`, c.eco_hdr);
    }
  }

  // ── 11. Ecosystem section subtitle ────────────────────────────────
  if (c.eco_sub) {
    const canadianSub = /From Toronto's world-class research[^"]*/;
    const m = content.match(/From Toronto's world-class research[^"]*"/);
    if (m) {
      content = content.replace(m[0], c.eco_sub);
    }
  }

  // ── 12. Ecosystem cards ────────────────────────────────────────────
  if (c.eco_cards && c.eco_cards.length >= 3) {
    // Card 1: Toronto — Global Research Powerhouse
    r(`{title:"Toronto — Global Research Powerhouse 🇨🇦",desc:"Toronto is home to the University of Toronto (one of the world's top AI research institutions), the Vector Institute for AI, and the Creative Destruction Lab. The city's innovation corridor — anchored by MaRS Discovery District, Google's Sidewalk Labs (now Waterfront Innovation), and a thriving fintech and health AI ecosystem — makes it one of North America's most dynamic tech hubs."}`,
      `{title:"${c.eco_cards[0].title}",desc:"${c.eco_cards[0].desc}"}`);

    // Card 2: Montreal — Deep Learning Capital
    r(`{title:"Montreal — Deep Learning Capital 🎓",desc:"Montreal is the birthplace of deep learning thanks to Yoshua Bengio's pioneering work at Mila (Quebec AI Institute) and the University of Montreal. The city hosts major AI labs from Google, Meta, Microsoft, and Samsung. Montreal's AI ecosystem is one of the most concentrated in the world, with strong government support and a thriving startup scene."}`,
      `{title:"${c.eco_cards[1].title}",desc:"${c.eco_cards[1].desc}"}`);

    // Card 3: Vancouver — Emerging AI Hub
    r(`{title:"Vancouver — Emerging AI Hub 🏢",desc:"Vancouver is home to UBC's Computer Science department and the Amii-affiliated research at SFU and UAlberta (via remote hubs). The city's strengths include natural language processing (Cohere's founders), computer graphics, and cleantech. Vancouver's growing AI community benefits from strong ties to the Bay Area and a high quality of life."}`,
      `{title:"${c.eco_cards[2].title}",desc:"${c.eco_cards[2].desc}"}`);

    // Card 4 if exists
    if (c.eco_cards[3]) {
      r(`{title:"Pan-Canadian AI Strategy & Government Support 🇨🇦",desc:"Canada was the first country to launch a national AI strategy (CIFAR's Pan-Canadian AI Strategy, 2017), investing $125M initially and billions since. The strategy funds three national AI institutes (Amii, Mila, Vector), supports research chairs, and drives AI adoption across the economy."}`,
        `{title:"${c.eco_cards[3].title}",desc:"${c.eco_cards[3].desc}"}`);
    }
  }

  // ── 13. CTA badge ──────────────────────────────────────────────────
  if (c.cta_badge) {
    r(`'Built for Canadian Founders, Researchers & Enterprises'`, `'${c.cta_badge}'`);
  }

  // ── 14. CTA heading ────────────────────────────────────────────────
  if (c.cta_h2) {
    r(`"Find the Right AI Tool for Your Canadian Business"`, `"${c.cta_h2}"`);
  }

  // ── 15. CTA paragraph ──────────────────────────────────────────────
  if (c.cta_p) {
    r(`"No more guessing if a tool complies with PIPEDA and Quebec Law 25, supports French/English, or works for Canadian teams. Every tool on Apifeny AI is rated for Canadian data compliance, CAD pricing, and English/French-language readiness. Start exploring — no account needed."`,
      `"${c.cta_p}"`);
  }

  // ── 16. SEO footer ──────────────────────────────────────────────────
  if (c.seo_footer) {
    r(`"best AI tools in Canada 2026 · AI tools for Canadian businesses · Canada AI software · AI writing tools Canada · AI coding tools Canada · AI marketing Canada · Canada AI directory · AI tools Toronto · AI tools Montreal · AI tools Vancouver · AI tools Waterloo"`,
      `"${c.seo_footer}"`);
  }

  return content;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const SKIP = new Set([
  'ai-tools-canada',
  'ai-tools-australia', 'ai-tools-bangladesh', 'ai-tools-brazil',
  'ai-tools-cambodia', 'ai-tools-china', 'ai-tools-egypt',
  'ai-tools-france', 'ai-tools-germany', 'ai-tools-hong-kong',
  'ai-tools-india', 'ai-tools-indonesia', 'ai-tools-japan',
  'ai-tools-kenya', 'ai-tools-malaysia', 'ai-tools-myanmar',
  'ai-tools-nepal', 'ai-tools-nigeria', 'ai-tools-pakistan',
  'ai-tools-peru', 'ai-tools-philippines', 'ai-tools-saudi-arabia',
  'ai-tools-singapore', 'ai-tools-south-korea', 'ai-tools-sri-lanka',
  'ai-tools-taiwan', 'ai-tools-thailand', 'ai-tools-turkey',
  'ai-tools-uae', 'ai-tools-uk', 'ai-tools-usa', 'ai-tools-vietnam',
]);

const TARGET_SLUGS = Object.keys(C);

let fixed = 0;
let skipped = 0;
let errors = [];

for (const slug of TARGET_SLUGS) {
  const dirName = `ai-tools-${slug}`;
  if (SKIP.has(dirName)) {
    skipped++;
    continue;
  }
  const filePath = join(APP, dirName, 'page.tsx');
  try {
    let content = readFileSync(filePath, 'utf8');
    const newContent = applyFixes(slug, content);
    if (newContent !== content) {
      writeFileSync(filePath, newContent, 'utf8');
      fixed++;
      console.log(`✅ Fixed: ${dirName}/page.tsx`);
    } else {
      console.log(`⚠️  No changes needed: ${dirName}/page.tsx`);
    }
  } catch (e) {
    errors.push(`${dirName}: ${e.message}`);
    console.error(`❌ Error: ${dirName}/page.tsx - ${e.message}`);
  }
}

console.log(`\n📊 Summary: ${fixed} files fixed, ${skipped} skipped, ${errors.length} errors`);
if (errors.length) {
  console.log('\nErrors:');
  errors.forEach(e => console.log(`  ${e}`));
}
