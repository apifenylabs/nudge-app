#!/usr/bin/env python3
"""Fix garbled ecosystem sections in 21 country files.
The generic replacement from the first pass created garbled text like:
  "From Argentina's major cities's Argentina's top AI research institutions..."
  "Argentina produces foundational AI research that powers..."
  "Globally Recognized Software Talent" card with "$125M+ Argentina's..."
and garbled ecosystem 3-card section and CTA section.

This script replaces all garbled sections with proper country-specific content.
"""
import os, re

APP = 'app'

countries = [
    'argentina', 'austria', 'belgium', 'chile', 'colombia', 'denmark',
    'finland', 'ireland', 'israel', 'italy', 'mexico', 'netherlands',
    'new-zealand', 'norway', 'poland', 'portugal', 'russia',
    'south-africa', 'spain', 'sweden', 'switzerland'
]

# Per-country replacement data
# Each has: subtitle, approach, talent_card
# And ecosystem_cards (3 items for the 3-card ecosystem section)
# And eco_header (the h2 text)
# And eco_sub_card (the sub-card with title/description)
DATA = {
'argentina': {
'subtitle': 'From Buenos Aires\' thriving fintech district to C\u00f3rdoba\u2019s software development talent pool and Rosario\u2019s agtech innovation, Argentina combines world-class engineering education with a dynamic startup ecosystem.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 with a distinctly Argentine approach to building.',
'talent': "Argentina's tech talent pool exceeds 100,000 developers, with strong CS programs at UBA, UTN, and UNC. The country benefits from government support through the Argentine Digital Agenda, R&D tax incentives (Ley de Economia del Conocimiento), and growing venture capital from funds like Kaszek Ventures and Monashees.",
'eco_header': "Argentina's AI Ecosystem Is a Growing Latin American Powerhouse",
'card1': "{ title: '\U0001f1e6\U0001f1f7 Buenos Aires \u2014 Fintech & SaaS Capital', description: 'Buenos Aires is home to Latin America\u2019s most sophisticated fintech ecosystem, including Mercado Libre\u2019s AI initiatives, Uala, and Technisys. The city\u2019s 50+ tech hubs and co-working spaces produce a steady stream of enterprise SaaS, fintech, and AI startups.' }",
'card2': "{ title: '\U0001f393 C\u00f3rdoba \u2014 Engineering Backbone', description: 'C\u00f3rdoba produces Argentina\u2019s highest concentration of software engineers per capita, anchored by UNC\u2019s renowned CS faculty. The city hosts major global tech R&D centers for Intel, Motorola, and Vates, alongside a growing startup community.' }",
'card3': "{ title: '\U0001f3e2 Rosario & La Plata \u2014 AgTech & Research Hubs', description: 'Rosario powers Argentina\u2019s agtech revolution with the INTA agricultural research institute, while La Plata produces strong AI research from UNLP\u2019s LIDI lab. Both cities feed into Argentina\u2019s growing deep tech ecosystem.' }",
'eco_sub_cards': [
  "{ title: '\U0001f1e6\U0001f1f7 Buenos Aires \u2014 Fintech & SaaS Capital', description: 'Buenos Aires is home to Latin America\u2019s most sophisticated fintech ecosystem, including Mercado Libre\u2019s AI initiatives, Uala, and Technisys. The city\u2019s 50+ tech hubs and co-working spaces produce a steady stream of enterprise SaaS, fintech, and AI startups.' }",
  "{ title: '\U0001f393 C\u00f3rdoba \u2014 Engineering Backbone', description: 'C\u00f3rdoba produces Argentina\u2019s highest concentration of software engineers per capita, anchored by UNC\u2019s renowned CS faculty. The city hosts major global tech R&D centers for Intel, Motorola, and Vates, alongside a growing startup community.' }",
  "{ title: '\U0001f3e2 Rosario & La Plata \u2014 AgTech & Research Hubs', description: 'Rosario powers Argentina\u2019s agtech revolution with the INTA agricultural research institute, while La Plata produces strong AI research from UNLP\u2019s LIDI lab. Both cities feed into Argentina\u2019s growing deep tech ecosystem.' }",
],
},
'austria': {
'subtitle': 'From Vienna\u2019s world-class research institutes to Linz\u2019s AI lab and Graz\u2019s industrial automation centers, Austria combines strong academic fundamentals with a thriving tech scene.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Austrian businesses.',
'talent': "Austria's tech ecosystem offers strong AI research through the Austrian Institute of Technology (AIT), strong government R&D funding via FFG, and a growing startup ecosystem. The talent pipeline combines deep engineering skills with competitive costs compared to neighboring Germany.",
'eco_header': "Austria's AI Ecosystem Is a Central European Innovation Hub",
'eco_sub_cards': [
  "{ title: '\U0001f1e6\U0001f1f9 Vienna \u2014 Innovation & Research Hub', description: 'Vienna is consistently ranked among the world\u2019s most livable cities and hosts a thriving startup ecosystem with 500+ tech startups. TU Wien produces world-class CS graduates, and the city is home to the AIT Austrian Institute of Technology.' }",
  "{ title: '\U0001f393 Linz \u2014 LIT AI Lab Excellence', description: 'JKU Linz hosts the LIT AI Lab, one of Europe\u2019s leading AI research centers. The city has a growing deep tech community and strong connections to Austria\u2019s industrial automation sector.' }",
  "{ title: '\U0001f3e2 Graz \u2014 Industrial & Automation AI', description: 'Graz is Austria\u2019s second-largest city and a hub for industrial AI, driven by TU Graz and companies like AVL List. The city excels in automation, automotive AI, and smart manufacturing.' }",
],
},
'belgium': {
'subtitle': 'From Brussels\u2019 international institutions to Leuven\u2019s world-leading nanoelectronics research and Ghent\u2019s AI innovation centers, Belgium combines deep tech research with a multilingual, EU-facing market.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Belgian businesses.',
'talent': "Belgium's tech ecosystem offers world-class AI research at KU Leuven, ULB, and UGent. Imec in Leuven is a global leader in nanoelectronics and AI hardware. The Belgian government offers strong R&D tax incentives and the country benefits from hosting EU institutions in Brussels.",
'eco_header': "Belgium's AI Ecosystem Is a European Research Powerhouse",
'eco_sub_cards': [
  "{ title: '\U0001f1e7\U0001f1ea Brussels \u2014 EU Capital & Tech Hub', description: 'Brussels hosts the EU and NATO, creating unique opportunities for GovTech, cybersecurity, and regulatory AI. The city has a growing startup ecosystem with strong connections to EU tech policy.' }",
  "{ title: '\U0001f393 Leuven \u2014 Imec & Research Excellence', description: 'Leuven is home to Imec, one of the world\u2019s leading nanoelectronics research centers with 5,000+ researchers. KU Leuven\u2019s CS department is among Europe\u2019s top 10 for AI research output.' }",
  "{ title: '\U0001f3e2 Ghent & Antwerp \u2014 Digital Innovation', description: 'Ghent hosts a thriving AI ecosystem anchored by imec\u2019s IDLab and Ghent University. Antwerp is a hub for digital logistics AI and the Port of Antwerp\u2019s smart shipping initiatives.' }",
],
},
'chile': {
'subtitle': 'From Santiago\u2019s startup-friendly policies to Valpara\u00edso\u2019s creative tech scene and Concepci\u00f3n\u2019s research institutions, Chile combines strong government support with a growing venture capital scene.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Chilean businesses.',
'talent': "Chile's tech ecosystem is anchored by Startup Chile, the world's first government-backed startup accelerator, strong universities (UC, UChile, USM), and rapidly growing VC funding. CORFO and ANID provide substantial R&D and innovation support across the country.",
'eco_header': "Chile's AI Ecosystem Is Latin America's Innovation Lab",
'eco_sub_cards': [
  "{ title: '\U0001f1e8\U0001f1f1 Santiago \u2014 Startup Chile & Innovation Hub', description: 'Santiago is Latin America\u2019s most startup-friendly city, home to Startup Chile and 1,000+ tech startups. The city has excellent infrastructure for entrepreneurship with strong angel networks and growing VC funds.' }",
  "{ title: '\U0001f393 Valpara\u00edso \u2014 Creative Tech & AI', description: 'Valpara\u00edso hosts the Federico Santa Mar\u00eda Technical University and a growing creative tech community. The port city is known for its innovative approach to edtech and digital transformation.' }",
  "{ title: '\U0001f3e2 Concepci\u00f3n \u2014 Research & Industrial AI', description: 'Concepci\u00f3n produces strong CS research from the University of Concepci\u00f3n. The Biob\u00edo region is Chile\u2019s industrial heartland, driving AI applications in forestry, energy, and manufacturing.' }",
],
},
'colombia': {
'subtitle': 'From Bogot\u00e1\u2019s government tech initiatives to Medell\u00edn\u2019s innovation transformation and Cali\u2019s growing tech talent pool, Colombia produces world-class software engineers with a rapidly maturing startup ecosystem.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Colombian businesses.',
'talent': "Colombia is Latin America's third-largest tech talent pool with strong CS programs at Uniandes, EAFIT, and UNAL. Apps.co, iNNpulsa, and the Bogot\u00e1 Innovation Lab provide substantial startup support.",
'eco_header': "Colombia's AI Ecosystem Is a Latin American Rising Star",
'eco_sub_cards': [
  "{ title: '\U0001f1e8\U0001f1f4 Bogot\u00e1 \u2014 Government & Fintech Hub', description: 'Bogot\u00e1 is the political and economic center, hosting the Apps.co startup program and Colombia\u2019s most active investor community. The city excels in fintech, GovTech, and enterprise SaaS.' }",
  "{ title: '\U0001f393 Medell\u00edn \u2014 Innovation Transformation', description: 'Medell\u00edn won Innovative City of the Year in 2012 and now hosts Ruta N, a world-class innovation center. EAFIT and the city\u2019s tech parks produce a thriving startup ecosystem in robotics and AI.' }",
  "{ title: '\U0001f3e2 Cali & Barranquilla \u2014 Talent Hubs', description: 'Cali produces Colombia\u2019s highest concentration of software developers outside Bogot\u00e1. Barranquilla\u2019s growing tech scene benefits from strong port infrastructure and new investments in digital education.' }",
],
},
'denmark': {
'subtitle': 'From Copenhagen\u2019s vibrant startup scene to Aarhus\u2019 world-class research and Aalborg\u2019s engineering excellence, Denmark combines a strong welfare state with aggressive digitalization and AI adoption.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Danish businesses.',
'talent': "Denmark's tech ecosystem is supported by Innovation Fund Denmark, the Danish Growth Fund, and a government AI strategy investing heavily in research and commercialization. DTU, University of Copenhagen, and Aarhus University produce world-class AI graduates.",
'eco_header': "Denmark's AI Ecosystem Is a Nordic Digital Leader",
'eco_sub_cards': [
  "{ title: '\U0001f1e9\U0001f1f0 Copenhagen \u2014 Nordic Startup Capital', description: 'Copenhagen is Scandinavia\u2019s leading startup hub with a thriving ecosystem spanning fintech, health tech, and cleantech. The city\u2019s CPH Tech cluster supports 1,000+ startups and attracts significant international VC.' }",
  "{ title: '\U0001f393 Aarhus \u2014 Research & Innovation', description: 'Aarhus University is a powerhouse of European AI research, particularly in NLP and computational linguistics. The city hosts a growing startup ecosystem with strong university-industry collaboration.' }",
  "{ title: '\U0001f3e2 Aalborg \u2014 Engineering & Automation', description: 'Aalborg University is known for its problem-based learning model and strong engineering programs. The city is a hub for industrial AI, energy tech, and automation in northern Denmark.' }",
],
},
'finland': {
'subtitle': 'From Helsinki\u2019s world-class research at FCAI to Espoo\u2019s gaming and health tech industries and Tampere\u2019s engineering excellence, Finland combines deep AI expertise with a society that has embraced digital transformation.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Finnish businesses.',
'talent': "Finland offers a world-class AI research ecosystem through FCAI (Finnish Center for AI), strong government funding from Business Finland, and a startup scene that produced unicorns like Supercell and Wolt.",
'eco_header': "Finland's AI Ecosystem Is a Global AI Innovator",
'eco_sub_cards': [
  "{ title: '\U0001f1eb\U0001f1ee Helsinki \u2014 FCAI & AI Excellence', description: 'Helsinki hosts the Finnish Center for AI (FCAI), a collaboration between Aalto University and the University of Helsinki. The city is a global leader in gaming AI, health AI, and language technology.' }",
  "{ title: '\U0001f393 Espoo \u2014 Gaming & Deep Tech', description: 'Espoo is home to Aalto University\u2019s main campus and a thriving deep tech ecosystem. Gaming giants like Supercell and Rovio were born here, alongside cutting-edge industrial AI companies.' }",
  "{ title: '\U0001f3e2 Tampere \u2014 Engineering & Industrial AI', description: 'Tampere is Finland\u2019s engineering heartland, with a strong focus on industrial AI, smart manufacturing, and signal processing. Tampere University produces top engineering talent for Finland\u2019s industrial sector.' }",
],
},
'ireland': {
'subtitle': 'From Dublin\u2019s Silicon Docks to Cork\u2019s research excellence and Galway\u2019s medtech innovation, Ireland combines a favorable business environment with access to EU talent and deep connections to global tech giants.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Irish businesses.',
'talent': "Ireland offers one of the world's most favorable business environments for tech: 12.5% corporate tax rate, strong R&D tax credits, and access to the EU single market. IDA Ireland and Enterprise Ireland actively support AI startups.",
'eco_header': "Ireland's AI Ecosystem Is Europe's Tech Gateway",
'eco_sub_cards': [
  "{ title: '\U0001f1ee\U0001f1ea Dublin \u2014 Silicon Docks & Tech HQ', description: 'Dublin\u2019s Silicon Docks hosts the EMEA headquarters of Google, Meta, Apple, Microsoft, and LinkedIn. The city\u2019s startup ecosystem is one of Europe\u2019s fastest growing.' }",
  "{ title: '\U0001f393 Cork \u2014 Research & Development Hub', description: 'Cork is home to University College Cork and Tyndall National Institute, a leading microelectronics research center. The city hosts major R&D centers for Apple, Johnson & Johnson, and Dell.' }",
  "{ title: '\U0001f3e2 Galway \u2014 MedTech & AI Research', description: 'Galway is a global medtech hub with 200+ medical device companies and strong AI research at NUI Galway. The Insight Center for Data Analytics drives AI innovation in health and biomedical fields.' }",
],
},
'israel': {
'subtitle': 'From Tel Aviv\u2019s bustling startup scene to Haifa\u2019s research powerhouse and Jerusalem\u2019s growing tech ecosystem, Israel produces more startups per capita than any other country.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 with a distinctly Israeli approach to innovation.',
'talent': "Israel has the highest density of startups per capita globally. The Innovation Authority provides substantial R&D grants, and military intelligence units like Unit 8200 produce some of the world's best AI talent. Weizmann Institute, Technion, and Hebrew University produce Nobel-level research.",
'eco_header': "Israel's AI Ecosystem Is the Startup Nation",
'eco_sub_cards': [
  "{ title: '\U0001f1ee\U0001f1f1 Tel Aviv \u2014 Startup City', description: 'Tel Aviv has the highest concentration of startups per capita in the world. The city excels in cybersecurity AI, fintech, and enterprise SaaS, with deep VC networks and a culture of rapid iteration.' }",
  "{ title: '\U0001f393 Haifa \u2014 Technion & Research Hub', description: 'Technion \u2014 Israel Institute of Technology drives world-class AI and robotics research. The city\u2019s Matam tech park hosts R&D centers for Intel, Google, Apple, and Microsoft.' }",
  "{ title: '\U0001f3e2 Jerusalem \u2014 BioTech & AI', description: 'Jerusalem\u2019s growing tech ecosystem includes strong AI research at Hebrew University with a focus on life sciences, NLP, and computer vision.' }",
],
},
'italy': {
'subtitle': 'From Milan\u2019s fashion and finance AI innovations to Turin\u2019s automotive excellence and Rome\u2019s research institutions, Italy combines centuries of design thinking with cutting-edge AI research.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Italian businesses.',
'talent': "Italy produces strong AI research from Politecnico di Milano, Sapienza Rome, and Politecnico di Torino. The Italian Institute of Technology (IIT) drives world-class robotics and AI.",
'eco_header': "Italy's AI Ecosystem Is a European Renaissance in Tech",
'eco_sub_cards': [
  "{ title: '\U0001f1ee\U0001f1f9 Milan \u2014 Fashion, Finance & AI', description: 'Milan is Italy\u2019s economic engine and a leader in AI for fashion, design, and finance. Politecnico di Milano is one of Europe\u2019s top technical universities.' }",
  "{ title: '\U0001f393 Turin \u2014 Automotive & Robotics', description: 'Turin is Italy\u2019s automotive capital, home to the Italian Institute of Technology (IIT) and a growing robotics and autonomous driving ecosystem.' }",
  "{ title: '\U0001f3e2 Rome \u2014 Research & Government Tech', description: 'Sapienza University in Rome is one of Europe\u2019s largest and most respected universities, with strong AI and computer science programs.' }",
],
},
'mexico': {
'subtitle': 'From Mexico City\u2019s booming fintech scene to Guadalajara\u2019s software development excellence and Monterrey\u2019s industrial innovation, Mexico has the largest tech talent pool in the Spanish-speaking world.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Mexican businesses.',
'talent': "Mexico produces more than 130,000 engineering graduates annually from institutions like UNAM, Tec de Monterrey, and IPN. The government\u2019s Fintech Law and INAI data protection framework provide regulatory clarity.",
'eco_header': "Mexico's AI Ecosystem Is Latin America's Tech Powerhouse",
'eco_sub_cards': [
  "{ title: '\U0001f1f2\U0001f1fd Mexico City \u2014 Fintech & Innovation Hub', description: 'Mexico City is Latin America\u2019s largest fintech hub outside Brazil, home to unicorns like Clip, Konfio, and Bitso. The city has 1,000+ startups and strong VC activity.' }",
  "{ title: '\U0001f393 Guadalajara \u2014 Mexico\u2019s Silicon Valley', description: 'Guadalajara is known as Mexico\u2019s Silicon Valley, with the highest concentration of software developers in the country. Major global tech companies have large R&D centers here.' }",
  "{ title: '\U0001f3e2 Monterrey \u2014 Industrial & AI Innovation', description: 'Monterrey is Mexico\u2019s industrial and business capital, driving AI innovation in manufacturing, logistics, and nearshoring. Tec de Monterrey is one of Latin America\u2019s top universities.' }",
],
},
'netherlands': {
'subtitle': 'From Amsterdam\u2019s vibrant startup ecosystem to Delft\u2019s engineering prowess and Eindhoven\u2019s high-tech manufacturing, the Netherlands combines world-class research with a business-friendly environment.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Dutch businesses.',
'talent': "The Netherlands offers world-class AI research through TU Delft, UvA (AMLab), and TU Eindhoven. The NL AIC (Netherlands AI Coalition) coordinates national AI efforts. The government offers generous R&D tax credits (WBSO).",
'eco_header': "The Netherlands' AI Ecosystem Is Europe's Digital Gateway",
'eco_sub_cards': [
  "{ title: '\U0001f1f3\U0001f1f1 Amsterdam \u2014 Digital Innovation Capital', description: 'Amsterdam is a top-5 European startup ecosystem, home to Booking.com, Adyen, and Mollie. The city\u2019s AI ecosystem spans fintech, adtech, and logistics.' }",
  "{ title: '\U0001f393 Delft \u2014 Engineering & Research Hub', description: 'TU Delft is one of Europe\u2019s top technical universities with world-class AI research in robotics, computer vision, and autonomous systems. YES!Delft incubator has produced 400+ tech startups.' }",
  "{ title: '\U0001f3e2 Eindhoven \u2014 High-Tech Manufacturing AI', description: 'Eindhoven is the heart of the Brainport region, one of Europe\u2019s most innovative areas. Home to Philips, ASML, and NXP, the city drives AI innovation in semiconductor manufacturing.' }",
],
},
'new-zealand': {
'subtitle': 'From Auckland\u2019s growing startup scene to Wellington\u2019s government tech and Christchurch\u2019s agtech innovation, New Zealand combines a high quality of life with strong digital government.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for New Zealand businesses.',
'talent': "New Zealand's tech ecosystem is supported by Callaghan Innovation, the AI Forum NZ, and a progressive government approach to digital transformation. The University of Auckland and University of Waikato produce strong CS graduates.",
'eco_header': "New Zealand's AI Ecosystem Is a Pacific Tech Innovator",
'eco_sub_cards': [
  "{ title: '\U0001f1f3\U0001f1ff Auckland \u2014 Startup Capital', description: 'Auckland is New Zealand\u2019s largest city and primary tech hub, home to 60% of the country\u2019s tech workforce. The startup ecosystem spans fintech, SaaS, and gaming.' }",
  "{ title: '\U0001f393 Wellington \u2014 GovTech & Creative AI', description: 'Wellington is the capital with a thriving GovTech ecosystem driven by NZ\u2019s world-leading digital government services. Victoria University produces strong CS graduates.' }",
  "{ title: '\U0001f3e2 Christchurch \u2014 AgTech & Innovation', description: 'Christchurch leads New Zealand\u2019s agtech revolution, developing AI solutions for agriculture and environmental monitoring. Canterbury University drives AI research in these fields.' }",
],
},
'norway': {
'subtitle': 'From Oslo\u2019s growing startup scene to Trondheim\u2019s world-class engineering and Bergen\u2019s maritime AI innovation, Norway combines abundant natural resources with a forward-looking approach to AI-driven industries.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Norwegian businesses.',
'talent': "Norway's tech ecosystem is powered by NTNU (Trondheim) and UiO (Oslo), producing strong engineering talent. The sovereign wealth fund, Innovation Norway, and Equinor's VC arm provide substantial capital.",
'eco_header': "Norway's AI Ecosystem Is a Nordic Energy & Maritime Powerhouse",
'eco_sub_cards': [
  "{ title: '\U0001f1f3\U0001f1f4 Oslo \u2014 Nordic Tech Hub', description: 'Oslo is a growing Nordic startup hub with strong fintech, health tech, and AI sectors. The city benefits from substantial VC funding and a business-friendly environment.' }",
  "{ title: '\U0001f393 Trondheim \u2014 NTNU & Engineering Excellence', description: 'NTNU is Norway\u2019s largest university and a world-class engineering school. The city is a hub for deep tech, maritime AI, and autonomous systems.' }",
  "{ title: '\U0001f3e2 Bergen \u2014 Maritime & Energy AI', description: 'Bergen is Norway\u2019s maritime capital, driving AI innovation in shipping, offshore energy, and fisheries. NORCE and the University of Bergen lead research in AI for the ocean economy.' }",
],
},
'poland': {
'subtitle': 'From Warsaw\u2019s booming tech scene to Krakow\u2019s software development excellence and Wroclaw\u2019s growing innovation ecosystem, Poland produces more than 20,000 CS graduates annually.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Polish businesses.',
'talent': "Poland is Europe's top IT outsourcing destination with deep engineering talent. Warsaw University, Jagiellonian University, and Wroclaw Tech produce 20,000+ CS graduates annually. The Polish Development Fund provides growing startup capital.",
'eco_header': "Poland's AI Ecosystem Is Central Europe's Tech Talent Hub",
'eco_sub_cards': [
  "{ title: '\U0001f1f5\U0001f1f1 Warsaw \u2014 Capital & Startup Hub', description: 'Warsaw is Poland\u2019s largest tech hub with a thriving startup ecosystem spanning fintech, enterprise SaaS, and gaming. The city hosts major tech R&D centers from Google, Microsoft, and Samsung.' }",
  "{ title: '\U0001f393 Krakow \u2014 Software Development Hub', description: 'Krakow is one of Europe\u2019s most important software development hubs, hosting R&D centers for Google, IBM, and Motorola. Jagiellonian University and AGH are powerhouses of CS education.' }",
  "{ title: '\U0001f3e2 Wroclaw \u2014 Gaming & Innovation', description: 'Wroclaw is a major gaming and tech hub, home to CD Projekt (Cyberpunk 2077) and many game dev studios. Wroclaw Tech produces top engineers.' }",
],
},
'portugal': {
'subtitle': 'From Lisbon\u2019s Web Summit-fueled startup boom to Porto\u2019s engineering excellence and Braga\u2019s emerging tech talent pool, Portugal combines a high quality of life with one of the best R&D tax incentive systems in Europe.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Portuguese businesses.',
'talent': "Portugal produces strong CS graduates from IST Lisbon, University of Porto, and University of Coimbra. SIFIDE offers one of Europe's best R&D tax credit regimes (up to 82.5% of eligible expenses). Unicorns like OutSystems and Talkdesk were born here.",
'eco_header': "Portugal's AI Ecosystem Is Europe's Fastest Growing Startup Scene",
'eco_sub_cards': [
  "{ title: '\U0001f1f5\U0001f1f9 Lisbon \u2014 Web Summit & Startup Capital', description: 'Lisbon hosts Europe\u2019s largest tech conference and has become one of the continent\u2019s hottest startup destinations. The city excels in fintech, SaaS, and climate tech.' }",
  "{ title: '\U0001f393 Porto \u2014 Engineering & Research Hub', description: 'Porto is home to INESC TEC, one of Europe\u2019s leading research institutes, and the University of Porto\u2019s strong engineering programs. The city has a thriving startup scene in health tech.' }",
  "{ title: '\U0001f3e2 Braga & Coimbra \u2014 Emerging Talent Hubs', description: 'Braga hosts the University of Minho and a rapidly growing tech ecosystem. Coimbra University produces strong CS research in AI and biomedical engineering.' }",
],
},
'russia': {
'subtitle': 'From Moscow\u2019s world-class research to St. Petersburg\u2019s engineering excellence and Novosibirsk\u2019s academic powerhouse, Russia produces some of the world\u2019s strongest mathematics and CS fundamentals.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 with a distinctly Russian approach to fundamental research.',
'talent': "Russia produces world-class mathematicians and computer scientists from MSU, MIPT, Skoltech, and Novosibirsk State University. Yandex runs one of the world's most advanced AI platforms, and Sberbank operates a major AI research lab.",
'eco_header': "Russia's AI Ecosystem Is a Eurasian Research Powerhouse",
'eco_sub_cards': [
  "{ title: '\U0001f1f7\U0001f1fa Moscow \u2014 AI Research & Innovation', description: 'Moscow is Russia\u2019s AI capital, home to Yandex\u2019s AI division, Sberbank\u2019s AI lab, and Skolkovo Innovation Center. MSU and MIPT produce world-class AI researchers.' }",
  "{ title: '\U0001f393 St. Petersburg \u2014 Engineering Excellence', description: 'St. Petersburg is Russia\u2019s second-largest tech hub, with strong CS programs at SPbSU and ITMO University. ITMO is one of the world\u2019s top 10 universities for computer vision.' }",
  "{ title: '\U0001f3e2 Novosibirsk \u2014 Academic Powerhouse', description: 'Novosibirsk hosts Akademgorodok (Siberian science city), Russia\u2019s largest research center with 35+ research institutes. Novosibirsk State University produces top mathematics and physics graduates.' }",
],
},
'south-africa': {
'subtitle': 'From Cape Town\u2019s Silicon Cape to Johannesburg\u2019s fintech revolution and Stellenbosch\u2019s innovation pipeline, South Africa combines deep financial services expertise with the most developed tech ecosystem on the African continent.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for South African businesses.',
'talent': "South Africa's tech ecosystem is Africa's most developed, anchored by UCT, Stellenbosch University, and Wits. Naspers/Prosus is one of the world's largest tech investors. CAIR (Centre for AI Research) coordinates AI research across SA universities.",
'eco_header': "South Africa's AI Ecosystem Is Africa's Most Sophisticated Tech Market",
'eco_sub_cards': [
  "{ title: '\U0001f1ff\U0001f1e6 Cape Town \u2014 Silicon Cape & Innovation', description: 'Cape Town\u2019s Silicon Cape initiative has created Africa\u2019s most vibrant startup ecosystem. The city attracts global talent and investment, excelling in fintech and enterprise SaaS.' }",
  "{ title: '\U0001f393 Johannesburg \u2014 Fintech & Corporate AI', description: 'Johannesburg is Africa\u2019s financial heart, driving AI innovation in banking, insurance, and mining. Wits University produces strong CS graduates.' }",
  "{ title: '\U0001f3e2 Stellenbosch \u2014 Research & Innovation Pipeline', description: 'Stellenbosch University is one of Africa\u2019s top research universities with strong AI programs. LaunchLab and the Stellenbosch Innovation District produce a steady pipeline of tech startups.' }",
],
},
'spain': {
'subtitle': 'From Barcelona\u2019s vibrant startup scene to Madrid\u2019s corporate innovation and Valencia\u2019s growing tech talent pool, Spain combines a high quality of life with growing VC investment.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Spanish businesses.',
'talent': "Spain produces strong CS graduates from UPC, UPM, and UB. CDTI provides innovation funding, and ENIA (National AI Strategy) coordinates AI development. Barcelona is consistently ranked among Europe's top 5 startup ecosystems.",
'eco_header': "Spain's AI Ecosystem Is a European Tech Renaissance",
'eco_sub_cards': [
  "{ title: '\U0001f1ea\U0001f1f8 Barcelona \u2014 Startup & Innovation Hub', description: 'Barcelona is one of Europe\u2019s top startup ecosystems, excelling in mobile tech, SaaS, and health AI. The city hosts major tech events and has attracted R&D centers from Amazon, Google, and King.' }",
  "{ title: '\U0001f393 Madrid \u2014 Corporate & Government Innovation', description: 'Madrid is Spain\u2019s capital and corporate innovation hub, with strong AI research at UPM and UC3M. The city hosts most of Spain\u2019s VC funds and corporate R&D centers.' }",
  "{ title: '\U0001f3e2 Valencia \u2014 Emerging Tech Hub', description: 'Valencia is a rapidly growing tech hub with a strong focus on tourism tech, agtech, and logistics AI. The Polytechnic University of Valencia produces top engineering talent.' }",
],
},
'sweden': {
'subtitle': 'From Stockholm\u2019s prolific startup ecosystem to Gothenburg\u2019s industrial AI innovation and Lund\u2019s deep tech research, Sweden produces more unicorns per capita than almost any other country.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Swedish businesses.',
'talent': "Sweden produces world-class AI research from KTH, Chalmers, and Lund University. Vinnova and the Swedish AI Strategy provide substantial support for AI R&D. The country has produced unicorns like Spotify, Klarna, and iZettle.",
'eco_header': "Sweden's AI Ecosystem Is a European Unicorn Factory",
'eco_sub_cards': [
  "{ title: '\U0001f1f8\U0001f1ea Stockholm \u2014 Unicorn Factory', description: 'Stockholm is one of the world\u2019s most productive startup ecosystems per capita, home to Spotify, Klarna, and 20+ other unicorns. The city excels in fintech, gaming AI, and music recommendation.' }",
  "{ title: '\U0001f393 Gothenburg \u2014 Industrial & Automotive AI', description: 'Gothenburg is Sweden\u2019s industrial heart, home to Volvo\u2019s autonomous driving and AI initiatives. Chalmers University of Technology produces top engineering graduates.' }",
  "{ title: '\U0001f3e2 Lund \u2014 Deep Tech & Research Hub', description: 'Lund University is a powerhouse of European AI research, particularly in machine learning and computer vision. MAX IV and ESS attract deep tech talent.' }",
],
},
'switzerland': {
'subtitle': '