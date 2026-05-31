#!/usr/bin/env python3
"""Append the remaining content to the supply chain blog post."""

part2 = """
          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Geek+ Robotics — China's Warehouse Automation Giant</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Geek+ is the world's largest warehouse robotics company by deployment, with 30,000+ AMRs deployed across 40+ countries. Based in Beijing, Geek+ dominates Asian warehouse automation with its <strong className="text-gray-900">PopPick</strong>, <strong className="text-gray-900">RoboShuttle</strong>, and <strong className="text-gray-900">Sort-to-Person</strong> systems. In 2026, Geek+ launched <strong className="text-gray-900">Geek+ AI Fleet Manager</strong>, which uses reinforcement learning to optimize robot routing and task allocation in real time.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-powered fleet orchestration using reinforcement learning; dynamic slotting optimization based on order velocity; AI warehouse layout optimization; ML-based predictive maintenance for AMR fleets; automated bin repositioning for maximum picking efficiency.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Geek+ is designed for Asian warehouses — smaller footprints, higher density storage, and multi-temperature zones are first-class features. It's deployed in China's largest e-commerce warehouses (JD.com, Alibaba, SF Express), Japanese logistics centers (Nippon Express, Yamato Transport), and Korean fulfillment centers (Coupang, CJ Logistics). Geek+ systems can increase warehouse throughput by 3-5x while reducing operating costs by 50-70%.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Quote-based (robots + software license, typically ROI within 2-3 years). <strong className="text-gray-900">Best for:</strong> Mid-to-large warehouses in Asia looking to automate picking, sorting, and material handling.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Locus Robotics — Collaborative AMR Fulfillment</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Locus Robotics is a US-based AMR provider with growing APAC presence. Its <strong className="text-gray-900">LocusBots</strong> work alongside human pickers, carrying picked items to packing stations while the AI optimizes pick paths in real time. Locus's <strong className="text-gray-900">LocusARC</strong> AI engine uses reinforcement learning to continuously improve pick routes and task allocation.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Reinforcement learning for pick path optimization; AI workload balancing across bots and human pickers; ML-based demand forecasting for bot deployment; predictive maintenance; automated performance benchmarking.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Locus has expanded into Asia with deployments in Japan (via Mitsubishi Logistics) and Singapore. Locus claims 3x warehouse productivity improvement and 50% reduction in walking time.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Quote-based (Robots-as-a-Service model available). <strong className="text-gray-900">Best for:</strong> Mid-to-large e-commerce and retail fulfillment centers.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">6 River Systems (Shopify) — Collaborative Fulfillment</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            6 River Systems (acquired by Shopify) provides collaborative AMR fulfillment solutions using the <strong className="text-gray-900">Chuck</strong> robot — a smart cart that guides pickers to optimal locations in the warehouse. Its AI learns pick patterns and continuously optimizes routes and task assignments.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI route optimization for pickers; ML-based slotting recommendations; automated workload balancing across shifts; AI-driven order batching to minimize travel time; real-time WMS integration.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Quote-based. <strong className="text-gray-900">Best for:</strong> Mid-market e-commerce fulfillment centers using Shopify.</p>
        </section>

        {/* Section 4: Supplier Risk & Resilience */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-amber-600" />4. Supplier Risk & Supply Chain Resilience</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Supply chain resilience is the #1 priority for Asian manufacturers post-COVID, post-Suez Canal blockage, and amid ongoing US-China trade tensions. AI-driven supplier risk platforms monitor thousands of risk signals in real time — weather events, geopolitical shifts, financial distress, labor disputes, regulatory changes — to predict disruptions before they happen. Companies using AI supplier risk platforms reduce disruption impact by 40-60%.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Interos — AI Supply Chain Risk Intelligence</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Interos is the leading AI supply chain risk intelligence platform, mapping the complete multi-tier supply chain for enterprises. Its AI engine analyzes 1M+ data sources daily — news, corporate filings, ESG reports, social media, satellite imagery, trade data — to detect and predict supplier risk.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-powered multi-tier supplier mapping (traces suppliers 5+ tiers deep); real-time risk detection from 1M+ data sources; predictive risk scoring for financial, operational, geopolitical, and ESG risks; automated risk alerts with impact assessment; AI-driven alternative supplier recommendations.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Interos excels at mapping complex Asian supply chains — critical for automotive (Japanese keiretsu, Korean chaebol), electronics (Taiwanese semiconductor ecosystem), and apparel (Bangladeshi garment factories, Vietnamese footwear). Its AI identifies Chinese companies added to US sanctions lists in real time — critical for any company sourcing from China.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Enterprise quote-based. <strong className="text-gray-900">Best for:</strong> Large enterprises with complex, multi-tier Asian supply chains.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Resilinc — Supply Chain Resilience Platform</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Resilinc is the leading supply chain resilience platform, maintaining the industry's largest database of supply chain disruption events. Its <strong className="text-gray-900">EventWatch AI</strong> monitors 100+ risk categories across 200+ countries, using ML to predict disruption probability and impact.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-powered disruption early warning system; predictive impact analysis (which suppliers, SKUs, customers will be affected); automated supplier mapping across tiers; AI-driven recovery time estimation; scenario simulation for alternative sourcing strategies.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Resilinc has strong Asia coverage — it was the most reliable source for tracking Japanese earthquake impacts (Kumamoto 2016, Fukushima 2022), Thailand flood impacts (the 2011 floods that disrupted global HDD supply), and China COVID lockdown impacts (Shanghai 2022, Shenzhen 2022). Its AI models are trained on 15+ years of Asian disruption data.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Enterprise quote-based. <strong className="text-gray-900">Best for:</strong> Companies with critical suppliers in Asia-Pacific who need reliable disruption alerts.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Everstream Analytics — AI Risk Analytics</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Everstream Analytics provides AI-powered supply chain risk analytics and resilience solutions. Its <strong className="text-gray-900">Analytics AI</strong> platform combines internal supply chain data with external risk intelligence to predict disruptions and recommend proactive measures.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-driven weather risk analytics for Asia-Pacific (typhoons, monsoons, earthquakes); predictive supplier financial distress detection; geopolitical risk assessment with automated alerts; carbon footprint tracking with AI-optimized reduction paths; automated compliance screening for 200+ countries.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Everstream's weather AI models are specifically calibrated for Asia-Pacific's unique weather patterns — the South China Sea typhoon belt, Indian Ocean monsoons, Japanese earthquake zones, and Southeast Asian flood plains. Its supply chain mapping covers the semiconductor supply chain from TSMC (Taiwan) to assembly in Malaysia to packaging in China.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Enterprise quote-based. <strong className="text-gray-900">Best for:</strong> Large enterprises needing integrated risk analytics across weather, financial, geopolitical, and ESG categories.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Coupa Supply Chain (Llamasoft) — Supply Chain Design</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Coupa's supply chain design platform (acquired Llamasoft SC Guru) uses AI to optimize supply chain network design — where to locate warehouses, which suppliers to use, how to route products through the network. Its AI runs millions of scenarios to find the optimal supply chain configuration.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-driven network optimization (facility location, supplier selection, transportation routing); what-if simulation for supply chain disruptions; ML-based demand forecasting at network level; automated scenario comparison with cost/service trade-offs; sustainability optimization (cost vs. carbon).
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Llamasoft's AI handles Asia's unique network design challenges — multi-country distribution with ASEAN tariff structures, India's GST-driven warehouse consolidation (from state-level to regional), and China's cross-border e-commerce logistics complexity. Its models incorporate Asian-specific cost factors including toll roads, labor costs by region, and fuel price variations.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Enterprise quote-based. <strong className="text-gray-900">Best for:</strong> Companies redesigning or optimizing their Asian supply chain network.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">ParkourSC — AI Decision Intelligence</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            ParkourSC provides AI decision intelligence for supply chain operations. Its platform uses generative AI and decision modeling to help supply chain professionals make better decisions — from supplier selection to inventory positioning to transportation mode choice.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Generative AI for supply chain decision support; AI-powered root cause analysis for disruptions; ML-driven "what would happen if" simulation; automated decision documentation with rationale; continuous learning from historical decisions.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Enterprise quote-based. <strong className="text-gray-900">Best for:</strong> Companies looking to embed AI decision support into daily supply chain operations.</p>
        </section>

        {/* Section 5: Global Trade & Customs Compliance */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Ship className="w-6 h-6 text-blue-600" />5. Global Trade & Customs Compliance</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Asia handles 60%+ of global container traffic. Customs compliance across diverse regulatory regimes — China's Customs clearance, Japan's NACCS, India's ICEGATE, ASEAN's Single Window — is where many supply chains break. AI-powered trade platforms automate documentation, screen against sanctions lists, and predict customs delays.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Flexport — AI-Powered Global Trade Platform</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Flexport is the leading digital freight forwarder, combining logistics services with an AI-powered trade platform. Its <strong className="text-gray-900">Flexport Platform</strong> provides real-time visibility, predictive analytics, and automated documentation across ocean, air, and trucking. In 2026, Flexport launched <strong className="text-gray-900">Flexport AI Assistant</strong>, a generative AI tool for trade compliance and logistics optimization.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-powered customs document generation (bill of lading, commercial invoice, packing list); ML-based customs delay prediction; dynamic routing optimization across ocean/air/rail options; automated denied party and sanctions screening; AI-driven supplier compliance scoring.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Flexport has deep Asia coverage with offices in Hong Kong, Shanghai, Shenzhen, Singapore, Taipei, Tokyo, and Bangalore. Its AI handles China's complex export documentation (including the newly expanded export control lists), Japan's NACCS system, Korea's UNI-PASS, and ASEAN Single Window. Flexport's AI identifies optimal shipping routes considering port congestion, sailing schedules, and customs processing times at major Asian ports.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Commission-based on shipments plus software subscription. <strong className="text-gray-900">Best for:</strong> Mid-to-large importers/exporters shipping goods across multiple Asian markets.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">E2open — Multi-Enterprise Supply Chain Platform</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            E2open provides a comprehensive supply chain management platform that connects enterprises with their trading partners. Its AI capabilities span planning, logistics, trade compliance, and procurement. In 2026, E2open launched <strong className="text-gray-900">E2open AI Copilot</strong> for supply chain decision support.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-powered global trade management with automated Harmonized System (HS) code classification; ML-based customs clearance optimization; AI-driven supplier collaboration and performance management; predictive analytics for ocean freight rate forecasting; automated documentation for ASEAN Free Trade Agreements.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Enterprise quote-based. <strong className="text-gray-900">Best for:</strong> Large enterprises with extensive trading partner networks across Asia.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Infor Nexus — Multi-Enterprise Supply Chain Network</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Infor Nexus (formerly GT Nexus) is the world's largest multi-enterprise supply chain network, connecting tens of thousands of trading partners. Its AI capabilities include intelligent exception management, predictive visibility, and supply chain finance optimization.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI-powered exception management (automatic detection and routing of supply chain exceptions); predictive visibility with ML-based ETA corrections; AI-driven supply chain finance (dynamic discounting recommendations, invoice factoring optimization); ML-based document matching (PO-invoice-receipt three-way matching).
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Infor Nexus has deep connections in Asian supply chains, particularly in retail/apparel (suppliers in Bangladesh, Vietnam, China, India), electronics (Taiwan, China, Korea), and automotive (Japan, Korea, Thailand). Its network includes 50,000+ Asian suppliers.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Enterprise quote-based. <strong className="text-gray-900">Best for:</strong> Large enterprises with extensive supplier networks in Asia.</p>
        </section>

        {/* Section 6: Fleet Management & Autonomous Logistics */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Truck className="w-6 h-6 text-emerald-600" />6. Fleet Management & Autonomous Logistics</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Fleet management AI is saving Asian logistics companies 15-25% in fuel costs through route optimization, reducing accidents by 30-50% through driver behavior monitoring, and cutting maintenance costs by 20-30% through predictive maintenance. Autonomous logistics — from self-driving trucks to drone delivery — is moving from pilot to scale, especially in Japan (aging workforce, strict labor laws) and Singapore (labor costs, land constraints).
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Samsara — Connected Fleet Operations</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Samsara is the leading connected operations platform for fleet management, combining IoT sensors, cameras, and AI. Its platform tracks vehicles, equipment, and assets in real time, while AI analyzes driver behavior, vehicle health, and route efficiency.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI dashcam with real-time collision avoidance alerts; ML-based driver coaching (identifies harsh braking, speeding, distracted driving); predictive maintenance using vehicle sensor data; AI-powered route optimization with live traffic integration; automated ELD logs compliant with local regulations.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Samsara has expanded into APAC with cloud infrastructure in Singapore and Sydney. Its platform supports Asian regulatory requirements including Singapore's LTA, Japan's Ministry of Land, and Australia's NHVR. The AI dashcam works with Asian road infrastructure — detecting motorbikes weaving through traffic (common in Vietnam, Indonesia, Thailand), auto-rickshaws (India), and bicycles and e-scooters (China).
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> From $25/vehicle/month (basic). <strong className="text-gray-900">Best for:</strong> Mid-to-large fleets (10-1,000+ vehicles) across Asia.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Motive (KeepTruckin) — AI Fleet Safety & Efficiency</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Motive (formerly KeepTruckin) provides AI-powered fleet management with a focus on driver safety, compliance, and operational efficiency. Its <strong className="text-gray-900">Motive AI</strong> platform processes 50B+ miles of driving data to train its safety models.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> AI dashcam with real-time risk detection; ML-based driver behavior scoring; predictive maintenance alerts based on engine diagnostics and DTC codes; AI-powered fuel optimization (idling detection, route suggestions); automated HOS (hours of service) compliance with regional rule sets.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Motive supports multiple Asian regulatory environments including Singapore's LTA hours of service rules, India's Motor Vehicle Act compliance, and Australia's NHVR fatigue management. Its AI is trained on Asian driving patterns — detecting the unique safety risks of Asian road environments.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> From $30/vehicle/month. <strong className="text-gray-900">Best for:</strong> Fleets of any size focused on safety and compliance.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Lytx — AI Fleet Safety Leader</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Lytx is the pioneer of AI-powered fleet safety, processing 150B+ miles of driving data. Its <strong className="text-gray-900">Lytx AI</strong> platform provides real-time risk detection, driver coaching, and predictive safety analytics. The company serves 3,800+ fleets globally with a focus on reducing collisions.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Real-time AI risk detection (distracted driving, following too close, lane departure, stop sign violations); predictive collision modeling using 150B+ miles of training data; ML-based driver risk scoring and progress tracking; automated event review and coaching assignment; AI-powered video telematics with privacy-mode options.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Enterprise quote-based. <strong className="text-gray-900">Best for:</strong> Large fleets prioritizing collision reduction and driver safety.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Waymo Via — Autonomous Trucking</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Waymo Via is Waymo's autonomous trucking division. While currently operating primarily in the US (Texas, California, Arizona), Waymo has announced plans to expand to Asia with pilots in Japan and Singapore. Its Driver AI has 20M+ miles of autonomous driving experience.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Full-stack autonomous driving for Class 8 trucks; AI-powered perception, prediction, and planning for highway and yard operations; multi-modal sensor fusion (LiDAR, cameras, radar); behavioral prediction for human-driven vehicles and vulnerable road users.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Pilot-stage, partnership-based. <strong className="text-gray-900">Best for:</strong> Large logistics operators looking toward autonomous trucking pilots.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Nuro — Autonomous Local Delivery</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Nuro specializes in autonomous local delivery using small, low-speed electric vehicles designed for last-mile goods delivery. Nuro has been operating autonomous deliveries in the US since 2018 and expanded into Japan in 2024 via a partnership with Isuzu — adapting its vehicles for Japanese narrow streets and right-hand driving.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Fully autonomous driving for goods-only vehicles (no passengers); AI-powered navigation optimized for last-mile routes; sensor fusion with thermal cameras for night operations; advanced perception for Asian urban environments (narrow streets, pedestrians, cyclists, scooters).
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Nuro's Japan expansion is strategically important — Japan's aging workforce, strict truck driver labor laws, and dense urban environments make it the ideal market for autonomous delivery. The partnership with Isuzu provides local manufacturing, maintenance, and regulatory navigation.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Service-based (delivery-as-a-service model). <strong className="text-gray-900">Best for:</strong> Last-mile delivery operators in dense Asian urban markets.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Zipline — Autonomous Drone Delivery</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Zipline is the world's largest autonomous drone delivery system. While famous for medical deliveries in Africa, Zipline has expanded into commercial logistics. In 2026, Zipline launched operations in Japan (partnership with Toyota and Daiwa House) for on-demand delivery of auto parts and e-commerce goods.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Autonomous flight with 100-mile+ range; AI-powered precision landing with 50cm accuracy; ML-based flight path optimization considering weather, airspace constraints, and no-fly zones; automated package release using winch system (no landing at delivery point).
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Japan's mountainous terrain and aging population make drone delivery ideal for remote communities and medical supply chains. Zipline's Japan expansion leverages Toyota's manufacturing expertise and Daiwa House's real estate network for drone-port locations.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Service-based (per-delivery pricing). <strong className="text-gray-900">Best for:</strong> Medical supply chains, auto parts logistics, and remote area delivery.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Wing (Google) — Drone Delivery</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Wing, Alphabet's drone delivery service, has been operating commercially in Australia since 2019 (making it the most established drone delivery service in Asia-Pacific). Wing's AI handles autonomous flight, obstacle avoidance, and precise landing — all coordinated through a cloud-based fleet management system.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Autonomous navigation in suburban and urban environments; AI-powered obstacle detection and avoidance; ML-based noise optimization (Wing's drones are designed to be quieter than typical leaf blowers); automated fleet coordination for high-density delivery zones.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Wing has completed 350,000+ deliveries in Australia (Logan, Canberra) and has announced expansion to Southeast Asia. The Logan operations have demonstrated that drone delivery works at scale in suburban Asia-Pacific environments.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Service-based. <strong className="text-gray-900">Best for:</strong> Retail and food delivery in suburban Asia-Pacific markets.</p>
        </section>

        {/* Section 7: AI Agents & Emerging Platforms */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Cpu className="w-6 h-6 text-violet-600" />7. AI Agents & Emerging Platforms</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            The newest frontier in supply chain AI is the use of autonomous AI agents — systems that can perceive, reason, and act without human intervention. These agents handle everything from procurement negotiations to warehouse coordination to customs documentation — freeing human operators for higher-value decision-making.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Kognitos — AI Process Automation for Supply Chain</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Kognitos provides an AI-powered automation platform that uses natural language processing to automate complex supply chain processes. Unlike traditional RPA (robotic process automation) that requires hard-coded rules, Kognitos' AI understands unstructured data — email correspondence, PDF invoices, hand-written notes — and takes action.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> Natural language understanding for processing unstructured supply chain documentation; AI-driven multi-language procurement workflows; automated PO-to-invoice matching across different data formats; ML-based exception handling that learns from human corrections.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> Kognitos handles Asian language documents — Chinese, Japanese, Korean, Thai, Vietnamese, Bahasa — for PO matching, invoice processing, and customs documentation. Its AI is trained on Asian document formats (Chinese invoice formats, Japanese estimate forms, Indian GST invoices).
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Enterprise quote-based. <strong className="text-gray-900">Best for:</strong> Companies dealing with heavy document processing across multiple Asian languages and formats.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">C3 AI — Enterprise AI Suite</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            C3 AI provides a comprehensive enterprise AI platform with pre-built supply chain applications including AI demand forecasting, predictive maintenance, inventory optimization, and supply chain network design. Its <strong className="text-gray-900">C3 AI Supply Chain Suite</strong> includes seven AI applications covering the full supply chain lifecycle.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Key AI features:</strong> ML-based demand forecasting with 1,000+ external signal integration; AI-powered predictive maintenance for manufacturing and logistics assets; supply chain network optimization with what-if simulation; AI-driven inventory optimization (service level optimization with capital efficiency); generative AI for supply chain querying.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Asia-specific wins:</strong> C3 AI has strong traction with Asian enterprises including Mitsubishi, Hitachi, and Bank of China. Its platform handles Asian business requirements — multi-language support, Asian tax structures, and the complex organizational structures common in Japanese keiretsu and Korean chaebol.
          </p>
          <p className="text-gray-600 mb-4"><strong className="text-gray-900">Pricing:</strong> Enterprise quote-based. <strong className="text-gray-900">Best for:</strong> Very large enterprises looking for a comprehensive, pre-built AI supply chain suite.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Custom AI Agents for Asian Supply Chains</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            For many Asian supply chain challenges, off-the-shelf tools aren't enough. The region's unique logistics fragmentation, regulatory complexity, and cultural business norms often demand custom AI solutions. Emerging startups and consultancies like <strong className="text-gray-900">RTS Labs</strong> (Singapore/Thailand) build bespoke AI agents for supply chain operations.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">Typical custom AI agent use cases in Asia:</strong>
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Procurement negotiation agents</strong> — AI agents that handle supplier price negotiations via email/WhatsApp, learning from past negotiations and market prices.</span></li>
            <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Multi-country customs agents</strong> — AI that reads and auto-fills customs forms for China, Vietnam, Thailand, Indonesia, and India — each with different formats, languages, and data requirements.</span></li>
            <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Last-mile routing agents</strong> — AI that optimizes delivery routes through dense Asian cities (Bangkok, Jakarta, Manila, Ho Chi Minh City) with their unique traffic patterns, narrow streets, and informal delivery points.</span></li>
            <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" /><span><strong className="text-gray-900">Supplier compliance agents</strong> — AI that continuously monitors supplier ESG compliance, labor practices, and quality metrics across complex Asian supply chains.</span></li>
          </ul>
        </section>

        {/* Regional Deep Dive */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Globe className="w-6 h-6 text-blue-600" />Regional Deep Dive: Supply Chain AI by Asian Market</h2>

          <div className="grid grid-cols-1 sm:grid-cols