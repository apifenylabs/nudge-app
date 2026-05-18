import fs from 'fs';
import path from 'path';

export interface MetaData {
  totalDestinations: number;
  cities: string[];
  totalParentTips: number;
}

export function getMeta(): MetaData {
  const filePath = path.join(process.cwd(), 'public', 'data', 'destinations.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const all: any[] = JSON.parse(raw);

  const seen = new Set<string>();
  const cities = all.filter(d => {
    const key = d.city?.toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map(d => d.city);

  const totalParentTips = all.reduce((sum: number, d: any) => sum + (d.tipsAndTricks?.length || 0), 0);

  return {
    totalDestinations: all.length,
    cities,
    totalParentTips,
  };
}
