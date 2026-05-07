#!/usr/bin/env python3
"""Generate batch 18 data (Scandinavia, Russia, Central Asia) for Family Travel Directory."""
import json

data = [
  {
    "id": "helsinki-001",
    "name": "Helsinki Zoo",
    "city": "Helsinki",
    "country": "Finland",
    "category": "Zoos & Aquariums",
    "ageRange": "2-12",
    "safetyRating": 4.8,
    "priceRange": "$$",
    "popularity": 82,
    "description": "The oldest zoo in Finland, set on the beautiful Korkeasaari Island. Home to over 150 animal species from snow leopards to Amazonian monkeys. The natural island setting means animals have spacious, well-designed habitats that feel more like wilderness than cages.",
    "location": "Mustikkamaanpolku 12, 00570 Helsinki",
    "bestTime": "Late spring to early autumn, 10 AM opening",
    "imageUrl": "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&q=80",
    "amenities": ["Stroller Rental", "Restaurant & Cafe", "Picnic Areas", "Indoor Exhibits", "Souvenir Shop"],
    "safetyFeatures": ["Animal Safety Barriers", "First Aid Station", "Well-Marked Paths", "Lifeguards at Water Areas"],
    "tipsAndTricks": [
      "Take the ferry from Market Square (May-September) \u2014 it\u2019s part of the experience and kids love the boat ride. Winter access is by bus only.",
      "The Amazonia house is warm and humid \u2014 dress in layers so you can peel off when you go inside.",
      "Weekday mornings are gloriously quiet. You\u2019ll often have entire exhibits to yourselves.",
      "Pack snacks. The cafe is decent but pricey, and picky eaters will prefer familiar food.",
      "The zoo has excellent indoor play areas for toddlers \u2014 perfect if it rains (which it will).",
      "Don\u2019t miss the feeding times: snow leopards at 11 AM and seals at 1 PM are crowd favorites."
    ],
    "parentStory": {
      "title": "Snow leopard eye contact through the glass",
      "excerpt": "Our 6-year-old came nose-to-nose with a snow leopard. She whispered \u2018he\u2019s wearing pajamas.\u2019 The keeper heard her and spent 10 minutes explaining how their fur keeps them warm. That conversation is still quoted at dinner.",
      "author": "Anna, mom of 2 from Stockholm",
      "fullStory": "Korkeasaari is a hidden gem. We\u2019ve been to zoos all over Europe and this one has the best habitats. The snow leopard enclosure is elevated so you\u2019re at eye level with them. Our youngest pressed her hands against the glass and a leopard walked right over and sat down. A keeper noticed and gave us an impromptu lesson. The kids still talk about \u2018the pajama cat\u2019 two years later."
    },
    "itineraryComparison": {
      "halfDay": "Ferry in, visit highlights (Amazonia, snow leopards, bears), lunch at cafe, ferry back",
      "fullDay": "Full zoo exploration, picnic on the island, children\u2019s farm, play areas, late afternoon ferry",
      "bestFor": "Ages 2-12, nature families, rainy day backup"
    },
    "commissionRate": "5%",
    "seoKeywords": ["Helsinki Zoo", "Korkeasaari", "Finland family attractions", "Helsinki with kids"],
    "gallery": [
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80",
      "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&q=80",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80"
    ]
  },
  {
    "id": "helsinki-002",
    "name": "Linnanm\u00e4ki Amusement Park",
    "city": "Helsinki",
    "country": "Finland",
    "category": "Theme Parks",
    "ageRange": "3-15",
    "safetyRating": 4.9,
    "priceRange": "$$",
    "popularity": 91,
    "description": "Finland\u2019s oldest and most beloved amusement park, perched on a hill with panoramic views of Helsinki. Over 40 rides from gentle carousels for toddlers to heart-pounding coasters for teens. The park is impeccably maintained and famously safe. Bonus: all profits go to Finnish children\u2019s welfare.",
    "location": "Tivolikuja 1, 00510 Helsinki",
    "bestTime": "June-August, weekday evenings for shorter queues",
    "imageUrl": "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80",
    "amenities": ["Nursing Room", "Baby Change Stations", "Family Restrooms", "Stroller Parking", "Lost Child Center", "First Aid"],
    "safetyFeatures": ["Regular Ride Inspections", "Height Measurement Stations", "Trained Ride Operators", "Emergency Response Team", "Well-Lit Park at Night"],
    "tipsAndTricks": [
      "Buy tickets online in advance \u2014 the queue at the gate can be 30 minutes on summer weekends and the online price is cheaper.",
      "The \u2018Taiga\u2019 rollercoaster is world-class but has a 120 cm height requirement. Check at the measurement station before queuing.",
      "There\u2019s a dedicated \u2018Peukaloisen Maa\u2019 (Thumbelina\u2019s Land) area for under-5s with gentle rides and no queues.",
      "Wednesday afternoons are local \u2018happy hour\u2019 \u2014 discounted entry after 3 PM on most Wednesdays.",
      "The park has excellent dietary accommodation \u2014 labels allergens clearly and offers gluten-free and dairy-free options.",
      "Bring cash. Some food stalls and games are cash-only, though most rides accept cards."
    ],
    "parentStory": {
      "title": "When our shy kid rode the little rollercoaster 7 times",
      "excerpt": "My 5-year-old was terrified of everything. Then she did the \u2018Kieppi\u2019 \u2014 a gentle rollercoaster for little ones \u2014 and asked to go again. Seven times. The operator just smiled and waved her through each time. Best \u20ac40 we ever spent.",
      "author": "Mikko, dad of 2 from Espoo",
      "fullStory": "We brought our daughter expecting her to hate it. She\u2019s the cautious type. But the \u2018Peukaloisen Maa\u2019 area is genius \u2014 the rides are small enough that kids feel in control. She picked the little rollercoaster, screamed the whole way, and immediately asked to go again. The Finnish summer night (light until 10 PM!) meant we stayed until closing. She fell asleep in the car with the biggest smile."
    },
    "itineraryComparison": {
      "halfDay": "Afternoon visit, focus on age-appropriate zone, 1-2 big rides, dinner at park",
      "fullDay": "Full day with lunch break outside, all zones, evening shows, fireworks (Saturday)",
      "bestFor": "Ages 3-15, first-time theme park families, budget-conscious"
    },
    "commissionRate": "6%",
    "seoKeywords": ["Linnanm\u00e4ki", "Helsinki amusement park", "Finland theme parks", "family fun Helsinki", "Helsinki with kids"],
    "gallery": [
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800&q=80",
      "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
      "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&q=80"
    ]
  },
  {
    "id": "stockholm-003",
    "name": "Skansen Aquarium",
    "city": "Stockholm",
    "country": "Sweden",
    "category": "Zoos & Aquariums",
    "ageRange": "2-12",
    "safetyRating": 4.7,
    "priceRange": "$$",
    "popularity": 78,
    "description": "A compact but thrilling indoor aquarium located inside the Skansen open-air museum. Home to exotic species including ring-tailed lemurs that roam freely in a walk-through enclosure, plus tropical fish, reptiles, and a bat cave. The tropical house is a warm escape from Stockholm\u2019s chilly climate.",
    "location": "Djurg\u00e5rdssl\u00e4tten 49-51, 115 21 Stockholm",
    "bestTime": "Weekday mornings, winter afternoons (warm escape)",
    "imageUrl": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "amenities": ["Indoor Climate Control", "Pushchair Access", "Nappy Changing", "Small Cafe", "Souvenir Shop"],
    "safetyFeatures": ["Glass Barriers", "Staff Supervision at Lemur Enclosure", "Clear Walkways", "Emergency Exits"],
    "tipsAndTricks": [
      "Entry is included with your Skansen ticket \u2014 don\u2019t pay separately. Just walk in through the main entrance near the Skansen park.",
      "The lemur walk-through opens at 10 AM and they\u2019re most active in the first hour before the crowd builds.",
      "It\u2019s hot and humid inside the tropical house. Dress in layers and leave coats at the nearby Skansen cloakroom.",
      "The bat cave is dark and might spook very young children. Scope it out solo first if your kid is jumpy.",
      "Combine with a full day at Skansen \u2014 the aquarium is a perfect 45-minute warm-up break between outdoor exhibits."
    ],
    "parentStory": {
      "title": "The lemur that stole my daughter\u2019s banana",
      "excerpt": "A lemur jumped onto our bench, grabbed the banana my 4-year-old was eating, and peeled it with its tiny hands while staring at her. She was speechless. A keeper explained they\u2019re mischievous by nature. She still tells everyone about the \u2018banana thief.\u2019",
      "author": "Emma, mom of 1 from Oslo",
      "fullStory": "We bought Skansen tickets mainly for the animals and zoo. The aquarium was an afterthought. Best accident ever. The lemurs roam freely in the walk-through and they have NO shame. One hopped onto our bench, looked my daughter dead in the eye, and gently took her banana. The peeling was so precise and human-like we couldn\u2019t stop laughing. My daughter was too shocked to cry. She now eats bananas with intense suspicion."
    },
    "itineraryComparison": {
      "halfDay": "Combine with Skansen main zoo, 45 min at aquarium, lunch at Skansen",
      "fullDay": "Full Skansen day with aquarium as warm break, Nordic Museum nearby, ferry back",
      "bestFor": "Ages 2-12, families already visiting Skansen, rainy days"
    },
    "commissionRate": "5%",
    "seoKeywords": ["Skansen Aquarium", "Stockholm aquarium", "lemur walk-through Stockholm", "Skansen with kids"],
    "gallery": [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
      "https://images.unsplash.com/photo-1438109491414-7198515b166b?w=800&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
    ]
  },
  {
    "id": "oslo-002",
    "name": "Oslo Reptile Park",
    "city": "Oslo",
    "country": "Norway",
    "category": "Zoos & Aquariums",
    "ageRange": "4-14",
    "safetyRating": 4.6,
    "priceRange": "$$",
    "popularity": 72,
    "description": "Scandinavia\u2019s largest reptile and exotic animal exhibition. Over 100 species including massive pythons, monitor lizards, colorful poison dart frogs, and a walk-through terrarium with free-roaming turtles and iguanas. The park also has a small aquarium section with piranhas and caimans.",
    "location": "St. Olavs gate 2, 0165 Oslo",
    "bestTime": "Weekday afternoons, avoid school holidays",
    "imageUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    "amenities": ["Indoor Exhibits", "Handwashing Stations", "Interactive Zones", "Small Gift Shop"],
    "safetyFeatures": ["Reinforced Glass Enclosures", "Staff Throughout Exhibit", "Height-Protected Viewing Areas", "Emergency Protocols"],
    "tipsAndTricks": [
      "Check the feeding schedule online \u2014 watching the piranhas feed is a highlight kids never forget.",
      "The monitor lizard enclosure has scheduled keeper talks at 1 PM daily. Get there 10 minutes early for a good spot.",
      "It\u2019s located about 15 minutes from the city center by tram. Take line 11 or 17 to \u2018St. Olavs Gate.\u2019",
      "Some terrariums are dimly lit for the animals\u2019 comfort. Let nervous kids know it\u2019s not scary \u2014 just cozy.",
      "The touch pool with small turtles and geckos is open between 12-2 PM on weekends. Gloves provided."
    ],
    "parentStory": {
      "title": "My snake-phobic wife held a python",
      "excerpt": "My wife has been terrified of snakes her entire life. The staff let her hold a baby python during a talk. She cried. Happy tears. The keeper explained their body temperature, how they sense movement. She\u2019s been researching adoption ever since.",
      "author": "Thomas, dad of 3 from Bergen",
      "fullStory": "We went for the kids but the reptile park converted my wife. The keeper talks are genuinely educational \u2014 not the usual \u2018snakes are scary\u2019 nonsense. They explained how docile the pythons are, how they \u2018smell\u2019 with their tongues, and how they make incredible escape artists. By the end, my wife was holding a snake around her neck. The kids were more jealous than scared. We now have a pet bearded dragon named after the park."
    },
    "itineraryComparison": {
      "halfDay": "2-3 hours, covers all exhibits, keeper talk, feeding session",
      "fullDay": "Combine with Vigeland Park and lunch in central Oslo. Park is small enough that half-day suffices.",
      "bestFor": "Ages 4-14, reptile enthusiasts, rainy days"
    },
    "commissionRate": "5%",
    "seoKeywords": ["Oslo Reptile Park", "Norway reptile exhibition", "Oslo with kids", "indoor family attraction Oslo"],
    "gallery": [
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80"
    ]
  },
  {
    "id": "reykjavik-001",
    "name": "Reykjavik Family Park & Zoo",
    "city": "Reykjavik",
    "country": "Iceland",
    "category": "Zoos & Aquariums",
    "ageRange": "1-10",
    "safetyRating": 4.8,
    "priceRange": "$",
    "popularity": 75,
    "description": "A charming, small-scale zoo and amusement park in the heart of Reykjavik. Features Icelandic farm animals (horses, sheep, goats, reindeer) plus a petting zoo and small rides. Refreshingly simple \u2014 no gimmicks, just the joy of meeting animals up close in a safe, laid-back Scandinavian setting.",
    "location": "Fj\u00f6lskyldu- og h\u00fasd\u00fdragar\u00f0urinn, 112 Reykjav\u00edk",
    "bestTime": "Summer afternoons, 11 AM for feeding time",
    "imageUrl": "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=800&q=80",
    "amenities": ["Petting Zoo", "Small Rides", "Picnic Tables", "Playground", "Ice Cream Kiosk"],
    "safetyFeatures": ["Gentle Animal Policy", "Staff at Petting Areas", "Handwashing Stations", "Fenced Play Areas"],
    "tipsAndTricks": [
      "Entry is very affordable (about 1000 ISK) and includes both the zoo and unlimited rides on the small train and carousel.",
      "The pony rides are a highlight \u2014 they\u2019re led by staff and suitable for children aged 2-8.",
      "The Icelandic horse exhibit is special. These horses have five gaits (most have three) and the kids can brush them at designated times.",
      "Bring a change of clothes. The playground has a sandpit and water play area that kids find irresistible.",
      "Combine with the nearby Reykjavik Botanic Garden for a full afternoon of calm outdoor family time."
    ],
    "parentStory": {
      "title": "She brushed an Icelandic horse for an hour",
      "excerpt": "Our 3-year-old found a grooming brush and spent an hour brushing an Icelandic horse that patiently stood there, occasionally sighing with what seemed like contentment. The staff just let it happen. No rush. No upselling. Pure Icelandic hospitality.",
      "author": "Laura, mom of 2 from Boston",
      "fullStory": "We came to Iceland for the geothermal pools and Northern Lights. The family park was a \u2018maybe\u2019 on our list. It became our favorite memory. The Icelandic horses are incredibly gentle and patient. Our toddler grabbed a brush and just went to work on this one horse\u2019s mane. The horse stood perfectly still for over an hour. A zookeeper came over and taught us about the horses\u2019 unique t\u00f6lt gait. My daughter still draws pictures of \u2018her\u2019 horse."
    },
    "itineraryComparison": {
      "halfDay": "2-3 hours: petting zoo, pony ride, playground, ice cream",
      "fullDay": "Combine with Botanic Garden and nearby playgrounds. Small enough to pair with other Reykjavik attractions.",
      "bestFor": "Ages 1-10, budget families, animal lovers"
    },
    "commissionRate": "4%",
    "seoKeywords": ["Reykjavik Family Park", "Iceland zoo", "Reykjavik with kids", "Iceland family activities", "petting zoo Reykjavik"],
    "gallery": [
      "https://images.unsplash.com/photo-1503256200498-2e6f4c310d9f?w=800&q=80",
      "https://images.unsplash.com/photo-1506751331345-831a30d5a740?w=800&q=80",
      "https://images.unsplash.com/photo-1647592720834-ffe28f6ddf75?w=800&q=80"
    ]
  },
  {
    "id": "reykjavik-002",
    "name": "FlyOver Iceland",
    "city": "Reykjavik",
    "country": "Iceland",
    "category": "Theme Parks",
    "ageRange": "4-16",
    "safetyRating": 4.9,
    "priceRange": "$$$",
    "popularity": 88,
    "description": "An immersive aerial flight simulation ride that takes you on a breathtaking journey over Iceland\u2019s most dramatic landscapes. You soar over glaciers, waterfalls, volcanic fields, and northern lights \u2014 suspended in front of a massive 20-meter spherical screen with wind, mist, and scents for full sensory immersion.",
    "location": "Fiskisl\u00f3\u00f0 45, 101 Reykjav\u00edk (Grandi district)",
    "bestTime": "Book the first or last showing of the day for shortest queues",
    "imageUrl": "https://images.unsplash.com/photo-1775144113652-6592b3ebeb06?w=800&q=80",
    "amenities": ["Indoor Queuing", "Seating Throughout", "Gift Shop", "Cafe", "Accessible Entry"],
    "safetyFeatures": ["Secure Harnessing", "Briefing Before Each Ride", "Height Requirements Enforced", "Emergency Stop Systems"],
    "tipsAndTricks": [
      "Minimum height is 102 cm. Under 140 cm must ride with an adult. The ride is gentle but check the rule before booking.",
      "Book online at least 3 days in advance during summer. Walk-in slots are rare from June to August.",
      "The \u2018Pre-Show\u2019 in the Viking longhouse is worth arriving early for \u2014 it sets the story beautifully.",
      "Motion-sensitive kids will be fine. It\u2019s smooth, with no jerking or spinning. More like flying than a rollercoaster.",
      "The scents (wildflowers, sea spray, glacial air) are a fun surprise. Warn kids so they don\u2019t get confused.",
      "Combine with lunch at the Grandi district\u2019s famous lobster soup spot, \u2018Saegreifinn\u2019 \u2014 a 5-minute walk away."
    ],
    "parentStory": {
      "title": "My 6-year-old thought we were really flying",
      "excerpt": "When the screen lifted and we were \u2018flying\u2019 over a glacier, my daughter grabbed my arm and whispered \u2018Are we in a helicopter?\u2019 The wind in her hair and mist on her face made it totally real. She asked to go again. We did. Worth every krona.",
      "author": "David, dad of 1 from Singapore",
      "fullStory": "I was skeptical about a simulator ride costing this much. But FlyOver Iceland is genuinely spectacular. The way the seats lift and the screen wraps around you \u2014 your brain believes you\u2019re flying. My daughter, who hates rollercoasters, loved every second. The mist from the waterfall scene made her shriek with delight. We went straight back in line and did it again. The second time she knew what was coming and was laughing before each scene."
    },
    "itineraryComparison": {
      "halfDay": "FlyOver (45 min experience) + lunch at Grandi + walk along the harbor",
      "fullDay": "Combine with Harpa concert hall, Maritime Museum, and Grandi district exploration",
      "bestFor": "Ages 4-16, families who love experiences over rides, rainy days"
    },
    "commissionRate": "8%",
    "seoKeywords": ["FlyOver Iceland", "Reykjavik flight simulator", "Iceland family experience", "things to do Reykjavik kids", "indoor attraction Iceland"],
    "gallery": [
      "https://images.unsplash.com/photo-1573558290253-fde4fa372d80?w=800&q=80",
      "https://images.unsplash.com/photo-1642262978329-a9211480300b?w=800&q=80",
      "https://images.unsplash.com/photo-1560580652-cd41f0dcc565?w=800&q=80"
    ]
  },
  {
    "id": "tallinn-001",
    "name": "Tallinn Zoo",
    "city": "Tallinn",
    "country": "Estonia",
    "category": "Zoos & Aquariums",
    "ageRange": "2-12",
    "safetyRating": 4.7,
    "priceRange": "$",
    "popularity": 76,
    "description": "Estonia\u2019s largest zoo, set across 90 hectares of forested parkland. Famous for its impressive collection of mountain goats, eagles, and rare snow leopards. The spacious enclosures are set among pine trees, giving the entire zoo a peaceful, natural atmosphere. Exceptionally affordable by European standards.",
    "location": "Paldiski mnt 145, 13522 Tallinn",
    "bestTime": "Late spring to early autumn, weekdays",
    "imageUrl": "https://images.unsplash.com/photo-1735796788543-c99c460a0800?w=800&q=80",
    "amenities": ["Stroller-Friendly Paths", "Children\u2019s Zoo", "Playground", "Cafe", "Picnic Areas"],
    "safetyFeatures": ["Natural Barriers", "First Aid Post", "Security Staff", "Lost Child Protocol"],
    "tipsAndTricks": [
      "The zoo is huge \u2014 rent a stroller at the entrance or your toddler will be exhausted within an hour.",
      "The eagle aviary is world-class. The golden eagles here have one of the largest flight enclosures in Europe.",
      "Bring mosquito repellent in summer. The forested area means bugs, especially near the lake.",
      "The children\u2019s zoo has domestic animals you can pet and feed. Feed is available at the counter for 1 EUR.",
      "The indoor tropical house is warm year-round \u2014 a perfect winter escape when Tallinn is freezing.",
      "Take tram #6 from the city center (about 20 minutes). It stops right at the zoo entrance."
    ],
    "parentStory": {
      "title": "The eagle that showed off for us",
      "excerpt": "A golden eagle did a full flight display just as we reached its enclosure \u2014 swooping from one end of the massive aviary to the other, then back. My son\u2019s jaw dropped. A keeper told us it was \u2018morning exercises.\u2019 We saw it three more times during our visit.",
      "author": "Mari, mom of 1 from Helsinki",
      "fullStory": "We took the ferry from Helsinki for a day trip to Tallinn. The zoo wasn\u2019t the main plan (we came for the Old Town) but it ended up being the highlight. The enclosures are so spacious and natural \u2014 the eagles have room to properly fly. My 5-year-old son is obsessed with birds of prey and seeing a golden eagle soar up close was a dream come true. The keeper took 10 minutes to explain their hunting style. He\u2019s been drawing eagles ever since."
    },
    "itineraryComparison": {
      "halfDay": "3-4 hours: tropical house, eagle aviary, children\u2019s zoo, playground",
      "fullDay": "Full zoo exploration + nearby Rocca al Mare shopping center for lunch and play",
      "bestFor": "Ages 2-12, nature families, budget-conscious travelers"
    },
    "commissionRate": "4%",
    "seoKeywords": ["Tallinn Zoo", "Estonia zoo", "Tallinn with kids", "Estonia family activities", "Tallinn day trip"],
    "gallery": [
      "https://images.unsplash.com/photo-1724892053773-cd28a4f6a622?w=800&q=80",
      "https://images.unsplash.com/photo-1718863336605-5e9c7c738336?w=800&q=80",
      "https://images.unsplash.com/photo-1738023354227-16a406891bd2?w=800&q=80"
    ]
  },
  {
    "id": "riga-001",
    "name": "Riga Zoo",
    "city": "Riga",
    "country": "Latvia",
    "category": "Zoos & Aquariums",
    "ageRange": "2-12",
    "safetyRating": 4.6,
    "priceRange": "$",
    "popularity": 73,
    "description": "A charming, well-maintained zoo located in Riga\u2019s Me\u017eaparks forest district. Home to nearly 500 species including elephants, giraffes, rhinos, and a popular tropical butterfly house. The zoo is set around a picturesque lake with walking trails, giving it a park-like feel. Excellent value for money.",
    "location": "Me\u017ea prospekts 1, LV-1014 Riga",
    "bestTime": "May-September, weekday mornings",
    "imageUrl": "https://images.unsplash.com/photo-1775152496490-9cebc8bb7dde?w=800&q=80",
    "amenities": ["Stroller Rental", "Children\u2019s Playground", "Cafe & Snack Bars", "Butterfly House", "Souvenir Shop"],
    "safetyFeatures": ["Double-Fenced Exhibits", "On-Site Veterinary", "First Aid Points", "Supervised Play Areas"],
    "tipsAndTricks": [
      "The butterfly house is a magical experience for kids under 8 \u2014 butterflies land on shoulders and hands. Go early when they\u2019re most active.",
      "The zoo is a 15-minute tram ride from the Old Town. Take tram #11 from the city center.",
      "The elephant enclosure has underwater viewing windows. Your kids will press their faces to the glass watching them swim.",
      "Bring swimsuits in summer. Me\u017eaparks has a great public beach right next to the zoo entrance.",
      "The polar bear exhibit is excellent \u2014 they have a large, chilled pool and are surprisingly active in the morning.",
      "Pack a picnic. The cafe is fine but there are lovely benches around the lake with beautiful views."
    ],
    "parentStory": {
      "title": "A butterfly landed on her nose for 10 minutes",
      "excerpt": "My 3-year-old stood frozen with a blue morpho butterfly on her nose for what felt like forever. She whispered \u2018Mama, don\u2019t move.\u2019 The butterfly house keeper took our photo and printed it for us. That photo is on our fridge three years later.",
      "author": "Inese, mom of 2 from Liep\u0101ja",
      "fullStory": "The Riga Zoo butterfly house is something special. It\u2019s not huge but the butterflies are fearless. They land on people constantly. My toddler was terrified at first, then a blue morpho landed on her hand. She giggled. Then it flew to her nose. She held so still, eyes crossed trying to see it. The keeper recognized the moment and snapped a photo, then printed it at the gift shop. Best \u20ac5 we spent in Riga."
    },
    "itineraryComparison": {
      "halfDay": "3 hours: butterfly house, elephants, polar bears, lake walk, playground",
      "fullDay": "Zoo + Me\u017eaparks forest trails + beach + cafe lunch, very relaxing day out",
      "bestFor": "Ages 2-12, budget families, nature lovers"
    },
    "commissionRate": "4%",
    "seoKeywords": ["Riga Zoo", "Latvia zoo", "Riga with kids", "family activities Latvia", "Riga children attractions"],
    "gallery": [
      "https://images.unsplash.com/photo-1508597370841-836e72ef6f54?w=800&q=80",
      "https://images.unsplash.com/photo-1737040009019-1576b1342b0e?w=800&q=80",
      "https://images.unsplash.com/photo-1716745324526-8a4149760198?w=800&q=80"
    ]
  },
  {
    "id": "warsaw-001",
    "name": "Warsaw Zoo",
    "city": "Warsaw",
    "country": "Poland",
    "category": "Zoos & Aquariums",
    "ageRange": "2-14",
    "safetyRating": 4.7,
    "priceRange": "$",
    "popularity": 84,
    "description": "One of Europe\u2019s most historically significant zoos, known for sheltering Jewish families during WWII (the inspiring story behind \u2018The Zookeeper\u2019s Wife\u2019). Today it\u2019s a modern, spacious zoo with over 500 species including elephants, dolphins (in a dedicated aquarium), and a large reptile house. Sprawling green grounds make for a full day of exploration.",
    "location": "ul. Ratuszowa 1/3, 03-461 Warsaw",
    "bestTime": "Spring and fall, weekday mornings for quietest experience",
    "imageUrl": "https://images.unsplash.com/photo-1772550018808-ebbcc271726c?w=800&q=80",
    "amenities": ["Stroller Rental", "Dolphin Show Arena", "Children\u2019s Zoo", "Multiple Restaurants", "Playgrounds", "Free Wi-Fi"],
    "safetyFeatures": ["Modern Enclosure Design", "On-Site Medical Team", "CCTV Coverage", "Safety Briefings at Dolphin Show"],
    "tipsAndTricks": [
      "Buy a combined zoo + dolphin show ticket online. It\u2019s cheaper and the dolphin show sells out on weekends.",
      "The \u2018Zookeeper\u2019s Wife\u2019 memorial is near the main entrance. Take 10 minutes to read the story \u2014 it adds depth to your visit.",
      "The children\u2019s zoo has goats, sheep, and rabbits you can pet and feed. Feed pellets are 2 PLN per cup.",
      "The aquarium section is small but excellent. The tunnel walkway with sharks overhead is a hit with kids.",
      "There are plenty of shaded benches. This zoo was designed with stroller-pushing parents in mind.",
      "Zoo is located right next to the Praga district, which has excellent and affordable Polish restaurants for lunch."
    ],
    "parentStory": {
      "title": "Learning about heroes while feeding goats",
      "excerpt": "I read \u2018The Zookeeper\u2019s Wife\u2019 years ago. Standing in the villa where Jan and Antonina \u017babi\u0144ski hid 300 Jews, while my kids fed goats 50 meters away was surreal. I explained it simply: \u2018Good people helped other people here.\u2019 My 8-year-old asked thoughtful questions for days.",
      "author": "Katherine, mom of 2 from London",
      "fullStory": "I came to Warsaw Zoo knowing the history. My husband and kids just wanted to see animals. The memorial