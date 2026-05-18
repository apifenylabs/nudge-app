/**
 * EV Car Models — popular in Asian markets.
 * Data sourced from manufacturer specs and regional EV databases.
 *
 * batteryKwh: usable battery capacity in kWh
 * efficiencyWhKm: mixed-cycle efficiency (Wh/km)
 * maxChargeKw: maximum DC fast-charge rate
 * popularInAsia: countries where this model is commonly sold/imported
 */

export interface EvCarModel {
  id: string;
  brand: string;
  model: string;
  batteryKwh: number;
  efficiencyWhKm: number;
  maxChargeKw: number;
  popularInAsia: string[];
}

export const carModels: EvCarModel[] = [
  // === BYD (China / global) ===
  {
    id: 'byd-atto-3',
    brand: 'BYD',
    model: 'Atto 3',
    batteryKwh: 60.5,
    efficiencyWhKm: 175,
    maxChargeKw: 120,
    popularInAsia: ['Thailand', 'Singapore', 'Malaysia', 'Indonesia', 'India', 'Australia'],
  },
  {
    id: 'byd-seal',
    brand: 'BYD',
    model: 'Seal',
    batteryKwh: 82.6,
    efficiencyWhKm: 157,
    maxChargeKw: 180,
    popularInAsia: ['China', 'Thailand', 'Australia', 'Malaysia'],
  },
  {
    id: 'byd-dolphin',
    brand: 'BYD',
    model: 'Dolphin',
    batteryKwh: 44.9,
    efficiencyWhKm: 142,
    maxChargeKw: 88,
    popularInAsia: ['China', 'Thailand', 'Singapore', 'Malaysia'],
  },
  {
    id: 'byd-han',
    brand: 'BYD',
    model: 'Han EV',
    batteryKwh: 85.4,
    efficiencyWhKm: 152,
    maxChargeKw: 120,
    popularInAsia: ['China'],
  },
  {
    id: 'bdy-yuan-plus',
    brand: 'BYD',
    model: 'Yuan Plus',
    batteryKwh: 49.9,
    efficiencyWhKm: 165,
    maxChargeKw: 90,
    popularInAsia: ['China', 'Thailand', 'India'],
  },

  // === Tesla ===
  {
    id: 'tesla-model-3',
    brand: 'Tesla',
    model: 'Model 3 (RWD)',
    batteryKwh: 60,
    efficiencyWhKm: 141,
    maxChargeKw: 170,
    popularInAsia: ['China', 'Singapore', 'Thailand', 'Malaysia', 'Japan', 'South Korea', 'Australia'],
  },
  {
    id: 'tesla-model-3-performance',
    brand: 'Tesla',
    model: 'Model 3 (Performance)',
    batteryKwh: 78.4,
    efficiencyWhKm: 159,
    maxChargeKw: 250,
    popularInAsia: ['China', 'Singapore', 'Thailand', 'Japan', 'South Korea', 'Australia'],
  },
  {
    id: 'tesla-model-y',
    brand: 'Tesla',
    model: 'Model Y',
    batteryKwh: 60,
    efficiencyWhKm: 158,
    maxChargeKw: 170,
    popularInAsia: ['China', 'Singapore', 'Thailand', 'Malaysia', 'Japan', 'Australia'],
  },
  {
    id: 'tesla-model-y-long-range',
    brand: 'Tesla',
    model: 'Model Y Long Range',
    batteryKwh: 78.4,
    efficiencyWhKm: 168,
    maxChargeKw: 250,
    popularInAsia: ['China', 'Singapore', 'Thailand', 'Japan', 'South Korea', 'Australia'],
  },

  // === MG (SAIC) ===
  {
    id: 'mg4-51',
    brand: 'MG',
    model: 'MG4 Electric (51 kWh)',
    batteryKwh: 51,
    efficiencyWhKm: 168,
    maxChargeKw: 150,
    popularInAsia: ['Thailand', 'Singapore', 'Malaysia', 'India', 'Indonesia', 'Australia'],
  },
  {
    id: 'mg4-64',
    brand: 'MG',
    model: 'MG4 Electric (64 kWh)',
    batteryKwh: 64,
    efficiencyWhKm: 175,
    maxChargeKw: 135,
    popularInAsia: ['Thailand', 'Singapore', 'Malaysia', 'India', 'Indonesia', 'Australia'],
  },
  {
    id: 'mg-zs-ev',
    brand: 'MG',
    model: 'ZS EV',
    batteryKwh: 51.5,
    efficiencyWhKm: 198,
    maxChargeKw: 92,
    popularInAsia: ['Thailand', 'Singapore', 'India', 'Indonesia'],
  },

  // === Nio ===
  {
    id: 'nio-et5',
    brand: 'Nio',
    model: 'ET5',
    batteryKwh: 75,
    efficiencyWhKm: 165,
    maxChargeKw: 140,
    popularInAsia: ['China', 'Hong Kong', 'Singapore'],
  },
  {
    id: 'nio-et7',
    brand: 'Nio',
    model: 'ET7',
    batteryKwh: 75,
    efficiencyWhKm: 173,
    maxChargeKw: 140,
    popularInAsia: ['China', 'Hong Kong'],
  },
  {
    id: 'nio-el6',
    brand: 'Nio',
    model: 'EL6 (SUV)',
    batteryKwh: 75,
    efficiencyWhKm: 189,
    maxChargeKw: 140,
    popularInAsia: ['China', 'Hong Kong'],
  },

  // === Hyundai ===
  {
    id: 'hyundai-ioniq-5',
    brand: 'Hyundai',
    model: 'Ioniq 5 (RWD)',
    batteryKwh: 58,
    efficiencyWhKm: 178,
    maxChargeKw: 240,
    popularInAsia: ['South Korea', 'Singapore', 'Indonesia', 'Thailand', 'India'],
  },
  {
    id: 'hyundai-ioniq-5-awd',
    brand: 'Hyundai',
    model: 'Ioniq 5 (AWD)',
    batteryKwh: 72.6,
    efficiencyWhKm: 193,
    maxChargeKw: 240,
    popularInAsia: ['South Korea', 'Singapore', 'Indonesia', 'Thailand'],
  },
  {
    id: 'hyundai-ioniq-6',
    brand: 'Hyundai',
    model: 'Ioniq 6',
    batteryKwh: 77.4,
    efficiencyWhKm: 155,
    maxChargeKw: 240,
    popularInAsia: ['South Korea', 'Singapore', 'Thailand'],
  },
  {
    id: 'hyundai-kona-ev',
    brand: 'Hyundai',
    model: 'Kona Electric',
    batteryKwh: 48.4,
    efficiencyWhKm: 170,
    maxChargeKw: 100,
    popularInAsia: ['South Korea', 'Singapore', 'India'],
  },

  // === Kia ===
  {
    id: 'kia-ev6',
    brand: 'Kia',
    model: 'EV6 (RWD)',
    batteryKwh: 58,
    efficiencyWhKm: 175,
    maxChargeKw: 240,
    popularInAsia: ['South Korea', 'Singapore', 'Thailand', 'Indonesia'],
  },
  {
    id: 'kia-ev6-awd',
    brand: 'Kia',
    model: 'EV6 (AWD)',
    batteryKwh: 77.4,
    efficiencyWhKm: 190,
    maxChargeKw: 240,
    popularInAsia: ['South Korea', 'Singapore', 'Thailand', 'Indonesia'],
  },
  {
    id: 'kia-niro-ev',
    brand: 'Kia',
    model: 'Niro EV',
    batteryKwh: 64.8,
    efficiencyWhKm: 170,
    maxChargeKw: 77,
    popularInAsia: ['South Korea', 'Singapore', 'Thailand'],
  },

  // === GAC Aion ===
  {
    id: 'gac-aion-y',
    brand: 'GAC Aion',
    model: 'Aion Y',
    batteryKwh: 63.9,
    efficiencyWhKm: 168,
    maxChargeKw: 120,
    popularInAsia: ['China', 'Thailand'],
  },
  {
    id: 'gac-aion-v',
    brand: 'GAC Aion',
    model: 'Aion V',
    batteryKwh: 65.5,
    efficiencyWhKm: 175,
    maxChargeKw: 120,
    popularInAsia: ['China', 'Thailand'],
  },
  {
    id: 'gac-aion-lx',
    brand: 'GAC Aion',
    model: 'Aion LX',
    batteryKwh: 72.7,
    efficiencyWhKm: 160,
    maxChargeKw: 140,
    popularInAsia: ['China', 'Thailand'],
  },

  // === Wuling ===
  {
    id: 'wuling-airy-ev',
    brand: 'Wuling',
    model: 'Air EV',
    batteryKwh: 26.7,
    efficiencyWhKm: 100,
    maxChargeKw: 6.6,
    popularInAsia: ['Indonesia', 'Thailand', 'India'],
  },
  {
    id: 'wuling-bingo',
    brand: 'Wuling',
    model: 'Bingo',
    batteryKwh: 31,
    efficiencyWhKm: 115,
    maxChargeKw: 6.6,
    popularInAsia: ['Indonesia', 'Thailand'],
  },

  // === ORA (GWM) ===
  {
    id: 'ora-good-cat',
    brand: 'ORA',
    model: 'Good Cat',
    batteryKwh: 63,
    efficiencyWhKm: 165,
    maxChargeKw: 80,
    popularInAsia: ['Thailand', 'Malaysia', 'Singapore', 'Indonesia'],
  },
  {
    id: 'ora-03',
    brand: 'ORA',
    model: 'ORA 03 (Funky Cat)',
    batteryKwh: 48,
    efficiencyWhKm: 152,
    maxChargeKw: 60,
    popularInAsia: ['Thailand', 'Malaysia', 'Singapore'],
  },

  // === Nissan ===
  {
    id: 'nissan-leaf-40',
    brand: 'Nissan',
    model: 'Leaf (40 kWh)',
    batteryKwh: 40,
    efficiencyWhKm: 168,
    maxChargeKw: 50,
    popularInAsia: ['Japan', 'Thailand', 'Singapore', 'Hong Kong'],
  },
  {
    id: 'nissan-leaf-eplus',
    brand: 'Nissan',
    model: 'Leaf e+',
    batteryKwh: 62,
    efficiencyWhKm: 178,
    maxChargeKw: 100,
    popularInAsia: ['Japan', 'Thailand', 'Hong Kong'],
  },
  {
    id: 'nissan-sakura',
    brand: 'Nissan',
    model: 'Sakura (kei EV)',
    batteryKwh: 20,
    efficiencyWhKm: 114,
    maxChargeKw: 6.6,
    popularInAsia: ['Japan'],
  },

  // === BMW ===
  {
    id: 'bmw-i4-edrive35',
    brand: 'BMW',
    model: 'i4 eDrive35',
    batteryKwh: 66,
    efficiencyWhKm: 173,
    maxChargeKw: 180,
    popularInAsia: ['China', 'South Korea', 'Japan', 'Singapore', 'Thailand'],
  },
  {
    id: 'bmw-i4-edrive40',
    brand: 'BMW',
    model: 'i4 eDrive40',
    batteryKwh: 80.7,
    efficiencyWhKm: 179,
    maxChargeKw: 210,
    popularInAsia: ['China', 'South Korea', 'Japan', 'Singapore', 'Thailand'],
  },
  {
    id: 'bmw-ix',
    brand: 'BMW',
    model: 'iX xDrive40',
    batteryKwh: 77,
    efficiencyWhKm: 220,
    maxChargeKw: 150,
    popularInAsia: ['China', 'South Korea', 'Japan', 'Singapore'],
  },

  // === Mercedes-Benz ===
  {
    id: 'mercedes-eqb-250',
    brand: 'Mercedes-Benz',
    model: 'EQB 250+',
    batteryKwh: 66.5,
    efficiencyWhKm: 188,
    maxChargeKw: 110,
    popularInAsia: ['China', 'Japan', 'Singapore', 'Thailand', 'South Korea'],
  },
  {
    id: 'mercedes-eqe-300',
    brand: 'Mercedes-Benz',
    model: 'EQE 300',
    batteryKwh: 89,
    efficiencyWhKm: 186,
    maxChargeKw: 170,
    popularInAsia: ['China', 'Japan', 'Singapore', 'South Korea'],
  },
  {
    id: 'mercedes-eqs-450',
    brand: 'Mercedes-Benz',
    model: 'EQS 450+',
    batteryKwh: 107.8,
    efficiencyWhKm: 185,
    maxChargeKw: 200,
    popularInAsia: ['China', 'Japan', 'Singapore', 'South Korea'],
  },

  // === Volkswagen ===
  {
    id: 'vw-id4',
    brand: 'Volkswagen',
    model: 'ID.4',
    batteryKwh: 58,
    efficiencyWhKm: 190,
    maxChargeKw: 120,
    popularInAsia: ['China', 'Singapore', 'Thailand'],
  },
  {
    id: 'vw-id3',
    brand: 'Volkswagen',
    model: 'ID.3',
    batteryKwh: 58,
    efficiencyWhKm: 178,
    maxChargeKw: 120,
    popularInAsia: ['China', 'Singapore', 'Thailand'],
  },

  // === Porsche ===
  {
    id: 'porsche-taycan',
    brand: 'Porsche',
    model: 'Taycan',
    batteryKwh: 79.2,
    efficiencyWhKm: 215,
    maxChargeKw: 270,
    popularInAsia: ['China', 'Japan', 'Singapore', 'South Korea'],
  },

  // === XPeng ===
  {
    id: 'xpeng-g9',
    brand: 'XPeng',
    model: 'G9',
    batteryKwh: 78.2,
    efficiencyWhKm: 172,
    maxChargeKw: 300,
    popularInAsia: ['China', 'Hong Kong', 'Singapore'],
  },
  {
    id: 'xpeng-p7',
    brand: 'XPeng',
    model: 'P7',
    batteryKwh: 70.8,
    efficiencyWhKm: 158,
    maxChargeKw: 175,
    popularInAsia: ['China', 'Hong Kong', 'Singapore'],
  },

  // === Mazda ===
  {
    id: 'mazda-mx-30',
    brand: 'Mazda',
    model: 'MX-30',
    batteryKwh: 35.5,
    efficiencyWhKm: 195,
    maxChargeKw: 50,
    popularInAsia: ['Japan', 'Thailand'],
  },
];

/**
 * Get a car model by its ID.
 */
export function getCarModel(id: string): EvCarModel | undefined {
  return carModels.find(c => c.id === id);
}

/**
 * Get all unique brands.
 */
export function getBrands(): string[] {
  const brands = new Set(carModels.map(c => c.brand));
  return Array.from(brands).sort();
}

/**
 * Get car models for a specific brand.
 */
export function getCarsByBrand(brand: string): EvCarModel[] {
  return carModels.filter(c => c.brand === brand);
}

/**
 * Get cars popular in a given country.
 */
export function getCarsByCountry(country: string): EvCarModel[] {
  return carModels.filter(c => c.popularInAsia.includes(country));
}
