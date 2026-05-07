# Button Functionality Review

## Working Buttons:
1. Search input (onChange) - updates searchQuery state ✓
2. City pills (onClick) - toggles selectedCity ✓
3. Category grid (onClick) - toggles selectedCategory ✓
4. Explore/Stories tabs (onClick) - switches activeTab ✓
5. Parent story cards (onClick) - expands/collapses ✓
6. Sort dropdown (onChange) - updates sortBy ✓
7. Filters button (onClick) - toggles showFilters ✓
8. Filter dropdowns (onChange) - update selectedCategory/City ✓
9. Apply Filters button (onClick) - closes filter panel ✓
10. Clear all filters button (onClick) - resets all ✓

## Potential Issues:
1. Search button (line 166) - only triggers UI, no actual search API
2. "Write Your Family Story" button - no handler
3. "Explore All Destinations" CTA - no handler
4. "Read Parent Stories" CTA - no handler
5. Footer links - no href values

## Data Loading:
- fetch() from /data/*.json - works if files exist in public/
- Type mismatch: BusinessListingCard expects id: number, gets id: string (cast as any)

## Recommendation:
Fix critical buttons (search, main CTAs) before launch. Remove or stub non-critical ones.
