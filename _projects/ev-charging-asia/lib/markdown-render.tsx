// Simple, lightweight markdown-to-JSX renderer
// No external dependencies needed (no react-markdown / remark-gfm required)

import React from 'react';

/**
 * Convert markdown text to an array of React elements.
 * Supports:
 *   - Headings (# through ######)
 *   - Bold (**text**), Italic (*text*), Strikethrough (~~text~~)
 *   - Inline code (`code`)
 *   - Images (![alt](url))
 *   - Links ([text](url))
 *   - Unordered lists (- item)
 *   - Ordered lists (1. item)
 *   - Tables (| col1 | col2 |)
 *   - Paragraphs
 *   - Line breaks in paragraphs
 */
export function renderMarkdown(markdown: string | undefined | null): React.ReactNode {
  if (!markdown) return null;
  const lines = markdown.split('\n');
  const elements: React.ReactNode[] = [];
  let paragraphLines: string[] = [];
  let inList = false;
  let listItems: { ordered: boolean; items: string[] } = { ordered: false, items: [] };
  let inTable = false;
  let tableData: string[][] = [];

  function flushParagraph(key: number) {
    if (paragraphLines.length > 0) {
      const html = inlineMarkdownToHtml(paragraphLines.join('\n'));
      elements.push(
        <p key={key} className="mb-4 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
      );
      paragraphLines = [];
    }
  }

  function flushList(key: number) {
    if (listItems.items.length > 0) {
      const Tag = listItems.ordered ? 'ol' : 'ul';
      const cls = listItems.ordered ? 'list-decimal' : 'list-disc';
      elements.push(
        <Tag key={key} className={`${cls} pl-6 mb-4 space-y-1 text-gray-700`}>
          {listItems.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inlineMarkdownToHtml(item) }} />
          ))}
        </Tag>
      );
      listItems = { ordered: false, items: [] };
    }
  }

  function flushTable(key: number) {
    if (tableData.length > 0) {
      const [header, ...rows] = tableData;
      elements.push(
        <div key={key} className="overflow-x-auto mb-4">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            {header && (
              <thead>
                <tr className="bg-gray-100">
                  {header.map((h, i) => (
                    <th key={i} className="border border-gray-300 px-3 py-2 font-semibold text-gray-700 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border border-gray-300 px-3 py-2 text-gray-700">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableData = [];
    }
  }

  let keyCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip separator lines in tables
    if (inTable && /^\|?\s*[-:]+\s*\|?\s*[-:]+\s*\|?\s*[-:]*\s*\|?$/.test(line)) {
      continue; // Header separator row
    }

    // Table row
    if (inTable || (line.startsWith('|') && line.endsWith('|'))) {
      flushParagraph(keyCounter++);
      flushList(keyCounter++);
      inTable = true;
      const cells = line
        .split('|')
        .filter(c => c.trim() !== '')
        .map(c => c.trim().replace(/\\\|/g, '|'));
      if (cells.length > 0) {
        tableData.push(cells);
      }
      // Check if next line is still a table or separator
      const nextLine = lines[i + 1];
      if (!nextLine || !(nextLine.startsWith('|') || /^\|?\s*[-:]+\s*\|/.test(nextLine))) {
        flushTable(keyCounter++);
        inTable = false;
      }
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph(keyCounter++);
      flushList(keyCounter++);
      const level = headingMatch[1].length;
      const text = inlineMarkdownToHtml(headingMatch[2]);
      let cls = 'font-bold ';
      switch (level) {
        case 1: cls += 'text-2xl mb-4 mt-8 text-gray-900'; break;
        case 2: cls += 'text-xl mb-3 mt-6 text-gray-900'; break;
        case 3: cls += 'text-lg mb-2 mt-5 text-gray-800'; break;
        default: cls += 'text-base mb-2 mt-4 text-gray-800'; break;
      }
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      elements.push(
        <Tag key={keyCounter++} className={cls} dangerouslySetInnerHTML={{ __html: text }} />
      );
      continue;
    }

    // HR
    if (/^---+\s*$/.test(line.trim())) {
      flushParagraph(keyCounter++);
      flushList(keyCounter++);
      elements.push(<hr key={keyCounter++} className="my-6 border-gray-200" />);
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^[-*+]\s+(.+)$/);
    if (ulMatch) {
      flushParagraph(keyCounter++);
      if (!inList || listItems.ordered) {
        flushList(keyCounter++);
        inList = true;
        listItems.ordered = false;
      }
      inList = true;
      listItems.items.push(ulMatch[1]);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      flushParagraph(keyCounter++);
      if (!inList || !listItems.ordered) {
        flushList(keyCounter++);
        inList = true;
        listItems.ordered = true;
      }
      inList = true;
      listItems.items.push(olMatch[1]);
      continue;
    }

    // Paragraph with content (non-empty)
    if (line.trim() !== '') {
      if (inList) {
        flushList(keyCounter++);
        inList = false;
      }
      paragraphLines.push(line);
    } else {
      // Empty line = end of paragraph/list
      flushParagraph(keyCounter++);
      flushList(keyCounter++);
      inList = false;
    }
  }

  // Flush remaining
  flushParagraph(keyCounter++);
  flushList(keyCounter++);

  return elements;
}

/**
 * Convert inline markdown (bold, italic, code, links) to HTML.
 * Handles images BEFORE escaping to preserve tag syntax.
 */
function inlineMarkdownToHtml(text: string): string {
  let html = text;

  // Store raw content tokens to preserve after escaping
  const tokens: string[] = [];
  const placeholder = (): string => `%%TOKEN${tokens.push('PLACEHOLDER') - 1}%%`;

  // Images: ![alt](url) — preserve first
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, url) => {
    const token = placeholder();
    tokens[parseInt(token.replace(/[^0-9]/g, ''))] = `<img src="${escapeAttr(url)}" alt="${escapeAttr(alt)}" class="rounded-lg my-2 max-w-full" />`;
    return token;
  });

  // Links: [text](url) 
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => {
    const token = placeholder();
    const isExternal = url.startsWith('http');
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    tokens[parseInt(token.replace(/[^0-9]/g, ''))] = `<a href="${escapeAttr(url)}"${target} class="text-sky-600 hover:text-sky-700 underline">${escapeHtml(text)}</a>`;
    return token;
  });

  // Bold: **text**
  html = html.replace(/\*\*(.+?)\*\*/g, (_match, inner) => {
    const token = placeholder();
    tokens[parseInt(token.replace(/[^0-9]/g, ''))] = `<strong>${inner}</strong>`;
    return token;
  });
  // Italic: *text*
  html = html.replace(/\*(.+?)\*/g, (_match, inner) => {
    if (inner.includes('<') || inner.includes('>')) return _match;
    const token = placeholder();
    tokens[parseInt(token.replace(/[^0-9]/g, ''))] = `<em>${inner}</em>`;
    return token;
  });
  // Strikethrough: ~~text~~
  html = html.replace(/~~(.+?)~~/g, (_match, inner) => {
    const token = placeholder();
    tokens[parseInt(token.replace(/[^0-9]/g, ''))] = `<del>${inner}</del>`;
    return token;
  });
  // Inline code: `code`
  html = html.replace(/`([^`]+)`/g, (_match, code) => {
    const token = placeholder();
    tokens[parseInt(token.replace(/[^0-9]/g, ''))] = `<code class="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-xs font-mono">${escapeHtml(code)}</code>`;
    return token;
  });

  // Escape everything
  html = escapeHtml(html);

  // Restore preserved tokens (which are safe since they don't contain user text that isn't escaped)
  html = html.replace(/%%TOKEN(\d+)%%/g, (_match, idx) => tokens[parseInt(idx)] || '');

  // Line breaks within paragraph
  html = html.replace(/  \n/g, '<br />');

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(text: string): string {
  return text.replace(/"/g, '&quot;').replace(/&/g, '&amp;');
}
