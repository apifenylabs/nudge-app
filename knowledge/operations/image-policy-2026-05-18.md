# Image Policy — May 18 2026

**Directive from Chris (01:16 HKT):** NO AI images — real photos only on all directory sites.

## Scope
Applies to: Family Travel Asia, Luxury Family Travel Asia, EV Charging Asia, Kids Activities Asia

## Audit Results (May 18 02:30 HKT)
| Site | Status | Source |
|------|--------|--------|
| Family Travel | ✅ PASS | 500 Flickr + 18 Unsplash (583 destinations) |
| Luxury Travel | ✅ PASS | All Unsplash (520+ destinations) |
| EV Charging | ✅ PASS | Unsplash blog images + map only |
| Kids Activities | 🟡 FIXED | Was 31/31 null imageUrl → assigned Unsplash via tag mapping |

## Rules Going Forward
1. All new blog post images MUST use real Unsplash or Flickr URLs
2. Never use via.placeholder.com, picsum.photos, or AI-generated images
3. Preferred format: `https://images.unsplash.com/photo-XXXXX?w=1200&h=630&fit=crop`
4. When data has null/empty imageUrl → assign via tag-to-unsplash mapping script
5. Reference mapping: `/tmp/fix-kids-images.py` (run when adding new posts)
