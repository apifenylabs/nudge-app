# Apifeny AI — Geo Page Properties

## Geo-Targeted Landing Pages

| Slug | Country | Language | Currency | Capital | Status |
|------|---------|----------|----------|---------|--------|
| ai-tools-bangladesh | Bangladesh | Bengali/English | BDT | Dhaka | Active |
| ai-tools-cambodia | Cambodia | Khmer/English | KHR | Phnom Penh | Active |
| ai-tools-china | China | Chinese/English | CNY | Beijing | Active |
| ai-tools-hong-kong | Hong Kong | Chinese/English | HKD | Hong Kong | Active |
| ai-tools-india | India | Hindi/English | INR | New Delhi | Active |
| **ai-tools-indonesia** | **Indonesia** | **Indonesian/English** | **IDR** | **Jakarta** | **Active** |
| ai-tools-japan | Japan | Japanese/English | JPY | Tokyo | Active |
| ai-tools-malaysia | Malaysia | Malay/English | MYR | Kuala Lumpur | Active |
| ai-tools-myanmar | Myanmar | Burmese/English | MMK | Naypyidaw | Active |
| ai-tools-nepal | Nepal | Nepali/English | NPR | Kathmandu | Active |
| ai-tools-pakistan | Pakistan | Urdu/English | PKR | Islamabad | Active |
| ai-tools-philippines | Philippines | Filipino/English | PHP | Manila | Active |
| ai-tools-saudi-arabia | Saudi Arabia | Arabic/English | SAR | Riyadh | Active |
| ai-tools-singapore | Singapore | English/Chinese/Malay/Tamil | SGD | Singapore | Active |
| ai-tools-south-korea | South Korea | Korean/English | KRW | Seoul | Active |
| ai-tools-sri-lanka | Sri Lanka | Sinhala/English | LKR | Colombo | Active |
| ai-tools-taiwan | Taiwan | Chinese/English | TWD | Taipei | Active |
| ai-tools-thailand | Thailand | Thai/English | THB | Bangkok | Active |
| **ai-tools-turkey** | **Turkey** | **Turkish/English** | **TRY** | **Ankara** | **Active** |
| ai-tools-uae | UAE | Arabic/English | AED | Abu Dhabi | Active |
| ai-tools-vietnam | Vietnam | Vietnamese/English | VND | Hanoi | Active |

## Page Status

- **Active** — Published, fully localized, SEO-optimized
- **Draft** — In development
- **Planned** — Identified but not yet created

## Template

Each geo page follows the same structure:
- `'use client'` with Next.js dynamic rendering
- Schema: `GeoSeoSchema` + `BreadcrumbSchema`
- Metadata: `SeoMetadata` component
- Sections: Hero → Top Tools → Why Country → Category Sections → Playbooks → Stats → Ecosystem → FAQ → CTA → Blog Links → Cross Links → SEO Footer
- Locale-specific: flag emoji, currency code, local language headlines, localized FAQ, SEO keywords
