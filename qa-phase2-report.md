# QA Phase 2 Report — Family Travel Directory Beast

**Date:** 2026-04-23  
**Scope:** Data expansion validation for destinations.json × page.tsx integration  
**Total destinations checked:** 25 across 9 cities and 4 categories

---

## 1. City Filter Test

| Check | Result |
|---|---|
| Data has these cities | Tokyo, Hong Kong, Bangkok, Phuket, Singapore, Bali, Hanoi, **Seoul**, **Osaka** |
| Page filter has these | Tokyo, Hong Kong, Bangkok, Phuket, Singapore, Bali, Hanoi, Seoul |
| **❌ MISSING from page** | **Osaka** 🇯🇵 |

### Details
- **Universal Studios Japan** (osaka-001) and **Osaka Aquarium Kaiyukan** (osaka-002) have no city filter button.
- These 2 destinations are effectively **hidden** unless the user searches or selects "All" cities.
- Seoul has 3 destinations and *does* have a button — correct.
- All other cities (7 of 8 in the filter) are correctly represented.

### Action needed
Add `"Osaka"` to the `cities` array in page.tsx (line 54).

---

## 2. Category Dedup

No duplicate category values exist in the data. All 4 unique categories are clean:

| Category | Destinations |
|---|---|
| Theme Parks | 8 |
| Zoos & Aquariums | 7 |
| Parks & Nature | 3 |
| Museums | 2 |

**❌ Page defines 2 extra categories with zero data:**
- `"Restaurants"` — no destinations use this
- `"Hotels"` — no destinations use this

These filter buttons will always show 0 results. Consider either removing them or seeding a few restaurant/hotel destinations.

✅ All 4 categories present in data have matching filter buttons.

---

## 3. Age Range Check

### All ageRange values in data
```
0-12, 0-99, 1-12, 2-10, 2-12, 2-17, 3-12, 3-14, 3-17, 4-14, 4-17, 4-99, 5-17
```

**✅ No problematic values** — every ageRange follows the `"min-max"` format and `parseInt()` works cleanly on all of them. No values like `"all-ages"`, `"3+"`, or `"1-4"` that would break parsing.

### 🐛 Age Filter Logic Bug

The filter logic in page.tsx has a **semantic accuracy bug**:

```javascript
// Current logic — checks only the MINIMUM age
if (selectedAge === "4-6") return parseInt(d.ageRange) <= 6;
if (selectedAge === "7-12") return parseInt(d.ageRange) <= 12;
```

**Problem:** `parseInt("2-10")` returns `2`, so a destination for ages 2-10 matches the "7-12" filter (because `2 <= 12` is true). A 12-year-old looking for age-appropriate activities would see this destination even though it tops out at age 10.

**Impact:** Age filters are **over-inclusive** — destinations show up in broader ranges than they should. This means fewer bugs for actual users (they see *more* results rather than fewer), but the filtering is imprecise.

**Sample of the bug:**
| Destination | Actual Range | Shows in "7-12"? | Should it? |
|---|---|---|---|
| Safari World Bangkok | 2-10 | ✅ Yes (2 ≤ 12) | ⚠️ Only up to age 10 |
| Siam Ocean World | 2-12 | ✅ Yes (2 ≤ 12) | ✅ Yes |
| Bali Treetop Adventure Park | 4-17 | ✅ Yes (4 ≤ 12) | ✅ Yes (ages 4-12 in range) |

### 🐛 "13+" Filter Implementation

```javascript
if (selectedAge === "13+") return parseInt(d.ageRange) >= 13 || d.ageRange.includes('17') || d.ageRange.includes('99');
```

This is a **fragile hack** that works for current data but would break with:
- A destination with `"6-16"` → no match (16 isn't 17 or 99)
- A destination with `"10-18"` → no match (18 isn't 17 or 99)
- Any range ending in a number other than 17 or 99

**Suggestion:** Replace with proper upper-bound parsing or add explicit `maxAge` / `minAge` fields.

---

## 4. Gallery Consistency

**✅ PASS — All 25 destinations have exactly 3 gallery entries.**

No issues found.

---

## 5. Image URL Format

**✅ PASS — All image URLs (main + gallery) start with `https://` and follow valid URLs.**

No broken path patterns detected. URLs use:
- `images.unsplash.com` for all images
- Consistent `?w=800&q=80` suffix
- No relative paths, localhost URLs, or empty strings

---

## 6. Missing Fields

### Per the spec (name, city, country, shortDescription, rating, priceLevel):

| Field | In Data? | Notes |
|---|---|---|
| `name` | ✅ | All 25 present |
| `city` | ✅ | All 25 present |
| `country` | ✅ | All 25 present |
| `shortDescription` | ❌ **Not in spec** | Data uses `description` instead |
| `rating` | ❌ **Not in spec** | Data uses `safetyRating` (numeric) |
| `priceLevel` | ❌ **Not in spec** | Data uses `priceRange` (string like `"$$"`) |

### Actual field names in the data:
```json
{
  "description": "...",        // long description, acts as shortDescription
  "safetyRating": 4.8,        // numeric rating 0-5
  "priceRange": "$$"          // $ to $$$ string
}
```

**⚠️ Field naming mismatch between spec and implementation.** The data schema uses different field names than what the QA spec asked to check. This is not a data bug but a spec-to-implementation gap. If `shortDescription`/`rating`/`priceLevel` are used anywhere in the rendering code, they would show nothing.

### Additional check: All required fields are present using actual data schema
✅ `name` — 25/25 present  
✅ `city` — 25/25 present  
✅ `country` — 25/25 present  
✅ `description` — 25/25 present  
✅ `safetyRating` — 25/25 present  
✅ `priceRange` — 25/25 present  
✅ `ageRange` — 25/25 present  
✅ `gallery` — 25/25 present (all with 3 images)  
✅ `parentStory` — 25/25 present (all with title, excerpt, author)  
✅ `tipsAndTricks` — 25/25 present  
✅ `amenities` — 25/25 present  
✅ `safetyFeatures` — 25/25 present  
✅ `itineraryComparison` — 25/25 present  

---

## Summary

| # | Check | Status | Severity |
|---|---|---|---|
| 1 | City filter has all cities | ❌ **FAIL** — Osaka missing from filter | **High** — 2 destinations invisible |
| 2 | No duplicate categories | ✅ **PASS** | — |
| 3 | Age range filter correctness | ⚠️ **WARN** — Over-inclusive logic, fragile 13+ hack | **Medium** — Inaccurate but not crashing |
| 4 | Gallery consistency (3 each) | ✅ **PASS** | — |
| 5 | Image URL format | ✅ **PASS** | — |
| 6 | Required fields present | ⚠️ **WARN** — Field naming mismatch with spec | **Low** — Data is complete, names differ |

### Critical fixes needed (before ship):
1. **Add `"Osaka"` to the city filter buttons** in page.tsx (line 54)
2. Either remove `"Restaurants"` and `"Hotels"` category buttons or add matching data

### Recommended improvements:
3. Fix the age filter to check both bounds (e.g., `parseInt(ageRange.split('-')[1])` for upper bound)
4. Replace the `includes('17')` hack with proper upper-bound parsing for "13+"
5. Document the actual field names in the data schema so future QA checks match reality
