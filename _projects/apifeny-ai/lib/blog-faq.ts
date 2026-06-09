/**
 * Auto-generate FAQ entries from blog post content.
 *
 * Strategy:
 * 1. Parse H2 headings that look like questions (end with "?")
 * 2. Extract the following paragraph(s) as the answer
 * 3. Also extract "### Key Takeaways" / "### Quick Summary" bullets as Q&A
 * 4. Falls back to generating generic FAQs based on post tags/title
 */

export interface FAQEntry {
  question: string;
  answer: string;
}

/**
 * Extract FAQ entries from a blog post's markdown content.
 * Returns at least 2 entries for rich snippet eligibility, or an empty array.
 */
export function extractFaqFromContent(
  content: string,
  title: string,
  tags: string[],
): FAQEntry[] {
  const faqs: FAQEntry[] = [];

  // Strategy 1: H2 headings ending with "?"
  const h2QuestionRegex = /## (.+?)\n([\s\S]*?)(?=\n## |\n### |$)/g;
  let match: RegExpExecArray | null;
  
  while ((match = h2QuestionRegex.exec(content)) !== null) {
    const heading = match[1].trim();
    if (heading.endsWith('?')) {
      const body = match[2].trim();
      const firstParagraph = extractFirstParagraph(body);
      if (firstParagraph && firstParagraph.length > 20) {
        faqs.push({
          question: heading,
          answer: firstParagraph.length > 500
            ? firstParagraph.substring(0, 497) + '...'
            : firstParagraph,
        });
      }
    }
  }

  // Strategy 1b: H3 headings that look like questions or "How to / What / Why / When / Where / Is / Are / Can / Do / Does"
  const h3QuestionRegex = /### (.+?)\n([\s\S]*?)(?=\n## |\n### |$)/g;
  while ((match = h3QuestionRegex.exec(content)) !== null) {
    const heading = match[1].trim();
    // Match headings that are clearly questions or actionable "how to" guides
    const isQuestion = heading.endsWith('?') ||
      /^(How|What|Why|When|Where|Which|Who|Is|Are|Can|Do|Does|Should|Would|Will)/i.test(heading) ||
      /^(Top|Best|Ultimate|Complete|Definitive|Step-by-Step|Guide to)/i.test(heading);
    if (isQuestion && !faqs.some(f => f.question.toLowerCase() === heading.toLowerCase())) {
      const body = match[2].trim();
      const firstParagraph = extractFirstParagraph(body);
      if (firstParagraph && firstParagraph.length > 20) {
        faqs.push({
          question: heading,
          answer: firstParagraph.length > 500
            ? firstParagraph.substring(0, 497) + '...'
            : firstParagraph,
        });
      }
    }
    if (faqs.length >= 6) break;
  }

  // Strategy 2: Extract "Key Takeaways" / "FAQ" sections
  if (faqs.length < 2) {
    const takeawayRegex = /### (?:Key Takeaways|FAQs?|Quick Summary|Common Questions?)\n([\s\S]*?)(?=\n## |\n### |$)/i;
    const takeawayMatch = takeawayRegex.exec(content);
    if (takeawayMatch) {
      const takeawayContent = takeawayMatch[1];
      const bullets = takeawayContent.match(/- (.+?)$/gm);
      if (bullets) {
        bullets.forEach((bullet) => {
          const text = bullet.replace(/^- /, '').trim();
          if (text.length > 15 && faqs.length < 5) {
            faqs.push({
              question: text.length > 80 ? text.substring(0, 77) + '...' : text,
              answer: text.length > 100 ? text : `${text}. This is covered in detail in the article.`,
            });
          }
        });
      }
    }
  }

  // Strategy 3: If still not enough FAQs, generate from tags + title
  if (faqs.length < 2) {
    const generated = generateFallbackFaqs(title, tags, content);
    faqs.push(...generated);
  }

  // Deduplicate by question (case-insensitive)
  const seen = new Set<string>();
  return faqs.filter((faq) => {
    const key = faq.question.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 6); // Max 6 FAQ entries
}

function extractFirstParagraph(text: string): string | null {
  // Remove bold markers, list markers, etc.
  const clean = text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^- /gm, '')
    .replace(/\*\*/g, '')
    .trim();

  // Split by double newline and find first long-enough paragraph
  const paragraphs = clean.split(/\n\n+/);
  for (const para of paragraphs) {
    const trimmed = para.replace(/\n/g, ' ').trim();
    if (trimmed.length > 30) return trimmed;
  }

  // Fallback: take everything up to the first newline
  const firstLine = clean.split('\n')[0]?.trim();
  return firstLine && firstLine.length > 20 ? firstLine : null;
}

function generateFallbackFaqs(title: string, tags: string[], content: string): FAQEntry[] {
  const faqs: FAQEntry[] = [];
  const first300 = content.substring(0, 300).replace(/\*\*/g, '').replace(/\n/g, ' ').trim();

  // Extract bullet points as potential answers
  const bulletItems = content.match(/- (.+?)$/gm);
  const bullets = bulletItems
    ? bulletItems.map((b) => b.replace(/^- /, '').trim()).filter((b) => b.length > 20)
    : [];

  // Generate from title
  if (title.toLowerCase().includes('vs')) {
    const parts = title.split(/vs\.?/i);
    if (parts.length >= 2) {
      const a = parts[0].replace(/^\d+\s*/g, '').trim();
      const b = parts[1].replace(/\s*\d+.*$/, '').trim();
      if (a && b) {
        faqs.push({
          question: `What are the main differences between ${a} and ${b}?`,
          answer: first300.length > 500 ? first300.substring(0, 497) + '...' : first300,
        });
      }
    }
  }

  // Generate tag-based FAQs
  const tagQuestions: Record<string, string> = {
    'ai-tools': 'What AI tools are covered in this article?',
    automation: 'How can automation help with this use case?',
    productivity: 'What productivity gains can I expect?',
    pricing: 'How much do these tools cost?',
    free: 'Are there free alternatives available?',
    comparison: 'How do these options compare to each other?',
    beginner: 'Is this suitable for beginners?',
    asia: 'Are these tools available in Asia?',
  };

  for (const tag of tags) {
    const lowerTag = tag.toLowerCase();
    for (const [key, question] of Object.entries(tagQuestions)) {
      if (lowerTag.includes(key) && !faqs.find((f) => f.question === question)) {
        const answer =
          bullets.length > 0
            ? bullets.slice(0, 3).join('. ') + '.'
            : first300.length > 500
              ? first300.substring(0, 497) + '...'
              : first300;
        faqs.push({ question, answer: answer.length > 500 ? answer.substring(0, 497) + '...' : answer });
      }
    }
    if (faqs.length >= 4) break;
  }

  return faqs;
}
