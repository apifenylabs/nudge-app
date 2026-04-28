/**
 * transform-carousel-card.js
 * Convert a DataSource item into Instagram carousel text (text-only, image gen Phase 2).
 */

const lib = require('./lib');

/**
 * @param {object} source - DataSource item
 * @param {object} opts
 * @param {string} opts.dateStr - Date string for content hash
 * @returns {object} ContentItem
 */
function transform(source, opts = {}) {
  if (!source || !source.title) {
    throw new Error('[transform-carousel-card] Invalid source: title required');
  }

  const dateStr = opts.dateStr || lib.todayStr();
  const { title, description, url, tags, metadata } = source;
  const tips = metadata?.tipsAndTricks || [];
  const parentStory = metadata?.parentStory || null;

  const slides = [];
  const totalSlides = 5;

  // Slide 1: Title slide
  slides.push(`1/${totalSlides} ${title}\n${truncateTo(description, 200)}\n📍 ${metadata?.city || ''}, ${metadata?.country || ''}`);
  slides.push('');

  // Slide 2: Why it's great
  let why = `2/${totalSlides} Why ${title}?\n`;
  if (metadata?.ageRange) why += `• Perfect for ages ${metadata.ageRange}\n`;
  if (metadata?.safetyRating) why += `• Safety rating: ${metadata.safetyRating}/5\n`;
  if (metadata?.bestTime) why += `• Best time: ${metadata.bestTime}\n`;
  if (metadata?.priceRange) why += `• ${metadata.priceRange} — great value for families`;
  slides.push(why);
  slides.push('');

  // Slide 3: Tips
  let tipsSlide = `3/${totalSlides} Pro Tips\n`;
  (tips.length > 0 ? tips.slice(0, 3) : ['Plan ahead', 'Arrive early', 'Bring snacks']).forEach(t => {
    tipsSlide += `• ${t}\n`;
  });
  slides.push(tipsSlide.trim());
  slides.push('');

  // Slide 4: Parent story or practical info
  if (parentStory) {
    slides.push(`4/${totalSlides} Real Parent Take\n${truncateTo(parentStory.excerpt, 200)}\n— ${parentStory.author}`);
  } else {
    slides.push(`4/${totalSlides} Quick Facts\nCategory: ${metadata?.category || 'Family'}\nTags: ${tags.slice(0, 3).join(', ')}`);
  }
  slides.push('');

  // Slide 5: CTA
  let cta = `5/${totalSlides} Save This For Later\n`;
  if (url) cta += `🔗 Link in bio\n`;
  cta += `❤️ Like if you'd take your family here!\n💬 Comment your favorite family destination`;
  if (tags.length > 0) cta += `\n${tags.slice(0, 2).map(t => `#${t.replace(/\s+/g, '')}`).join(' ')}`;
  slides.push(cta);

  const content = slides.join('\n');

  const id = `cc-${lib.contentHash(source.id, 'carousel-card', dateStr)}`;

  return {
    id,
    sourceId: source.id,
    sourceProject: source.sourceProject,
    format: 'carousel-card',
    platforms: ['instagram'],
    content,
    thread: slides.filter(s => s.trim()),
    images: source.images.slice(0, 5),
    contentHash: lib.contentHash(source.id, 'carousel-card', dateStr),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
}

function truncateTo(text, max) {
  if (!text || text.length <= max) return text || '';
  return text.substring(0, max - 3) + '...';
}

module.exports = { transform };
