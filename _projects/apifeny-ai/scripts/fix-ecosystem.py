#!/usr/bin/env python3
"""Fix garbled ecosystem sections in all 21 country files."""
import os

APP = 'app'

countries = [
    'argentina', 'austria', 'belgium', 'chile', 'colombia', 'denmark',
    'finland', 'ireland', 'israel', 'italy', 'mexico', 'netherlands',
    'new-zealand', 'norway', 'poland', 'portugal', 'russia',
    'south-africa', 'spain', 'sweden', 'switzerland'
]

# Each entry: (search_string_fragment, replacement_string)
# These match garbled text from the generic Canadian replacement
FIXES = {
    'argentina': [
        # "From Argentina's major cities's Argentina's top AI research institutions to Argentina's innovation hubs's ..."
        ('From Buenos Aires\' thriving fintech district to C\u00f3rdoba\u2019s software development talent pool and Rosario\u2019s agtech innovation, Argentina combines world-class engineering education with a dynamic startup ecosystem.',
         'From Buenos Aires\' thriving fintech district to C\u00f3rdoba\u2019s software development talent pool and Rosario\u2019s agtech innovation, Argentina combines world-class engineering education with a dynamic startup ecosystem.'),
    ],
}
