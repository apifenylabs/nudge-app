#!/usr/bin/env python3
"""Fix garbled ecosystem sections from generic Canadian text replacement."""
import os, re

APP = 'app'

# Each country: (country_name, adj, subtitle, approach, talent, eco_header, cards_json_list)
DATA = [
('argentina', 'Argentine',
'From Buenos Aires\' thriving fintech district to C\u00f3rdoba\u2019s software development talent pool and Rosario\u2019s agtech innovation, Argentina combines world-class engineering education with a dynamic startup ecosystem.',
'that powers the world\u2019s most advanced systems \u2014 with a distinctly Argentine approach to building.',
"Argentina's tech talent pool exceeds 100,000 developers, with strong CS programs at UBA, UTN, and UNC. The country benefits from government support through the Argentine Digital Agenda, R&D tax incentives (Ley de Economia del Conocimiento), and growing venture capital from funds like Kaszek Ventures and Monashees.",
"Argentina's AI Ecosystem Is a Growing Latin American Powerhouse",
'{"title": "Buenos Aires \u2014 Fintech & SaaS Capital", "desc": "Buenos Aires is home to Latin America\u2019s most sophisticated fintech ecosystem, including Mercado Libre\u2019s AI initiatives, Uala, and Technisys."}|{"title": "C\u00f3rdoba \u2014 Engineering Backbone", "desc": "C\u00f3rdoba produces Argentina\u2019s highest concentration of software engineers per capita, anchored by UNC\u2019s renowned CS faculty."}|{"title": "Rosario & La Plata \u2014 AgTech & Research Hubs", "desc": "Rosario powers Argentina\u2019s agtech revolution with the INTA agricultural research institute."}',
),
]
