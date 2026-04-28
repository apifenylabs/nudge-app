# Skill: source-directory-beast

**Goal:** Pull destinations from Directory Beast data files and output standardized DataSource items.

**Input:**
- `directoryPath` (string): Path to Directory Beast data directory (default: `workspace/family-travel-directory/public/data/`)
- `maxItems` (number, optional): Max items to return. Default: 10

**Steps:**
1. Read `destinations.json` from the Directory Beast data directory
2. If `destinations.json` doesn't exist, scan for `batch-*.json` files as fallback
3. Map each destination to the DataSource interface
4. Limit to `maxItems` (pick highest popularity)
5. Return DataSource array

**Output:**
- `items` (DataSource[]): Standardized data source items

**Dependencies:**
- schemas.md (DataSource interface)
