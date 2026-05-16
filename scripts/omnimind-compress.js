#!/usr/bin/env node
/**
 * OmniMind Consolidation Pipeline — runCompression()
 * 
 * Reads episodic memory files (memory/YYYY-MM-DD.md),
 * compresses into semantic summaries,
 * and stores them in knowledge/episodic/ and knowledge/semantic/.
 */

const fs = require('fs');
const path = require('path');

const MEMORY_DIR = path.resolve(__dirname, '../memory');
const EPISODIC_DIR = path.resolve(__dirname, '../knowledge/episodic');
const SEMANTIC_DIR = path.resolve(__dirname, '../knowledge/semantic');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Parse a memory file into structured episodic chunks
function parseEpisodicChunks(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const dateMatch = content.match(/^#\s+([\d-]+)/m);
  const date = dateMatch ? dateMatch[1] : path.basename(filePath, '.md');
  
  const chunks = [];
  let currentSection = null;
  let currentLines = [];

  for (const line of lines) {
    if (line.startsWith('## ') || line.startsWith('### ')) {
      if (currentSection && currentLines.length > 0) {
        chunks.push({ section: currentSection, text: currentLines.join('\n'), date, contentType: line.startsWith('## ') ? 'major_section' : 'minor_section' });
      }
      currentSection = line.replace(/^#+\s*/, '');
      currentLines = [];
    } else if (currentSection) {
      currentLines.push(line);
    } else if (line.trim().length > 0 && !line.startsWith('#')) {
      // Content before any section header
      currentLines.push(line);
    }
  }
  if (currentSection && currentLines.length > 0) {
    chunks.push({ section: currentSection, text: currentLines.join('\n'), date, contentType: 'final_section' });
  }
  
  // Also extract bullet points as finer-grained chunks
  const bulletChunks = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      bulletChunks.push({ text: trimmed, date, contentType: 'bullet' });
    }
  }
  
  return { date, chunks, bulletChunks, raw: content };
}

// Extract semantic nodes from a set of episodic chunks
function extractSemanticNodes(allChunks) {
  const nodes = [];
  const seenKeys = new Set();

  // Helper to add a node
  function addNode(type, label, evidence, category) {
  if (typeof evidence !== 'object' || evidence === null) evidence = {};
    const key = `${type}::${label}`;
    if (seenKeys.has(key)) return;
    seenKeys.add(key);
    nodes.push({ type, label, evidence: JSON.stringify(evidence), category: category || 'general', created: new Date().toISOString().split('T')[0] });
  }

  // Process each episodic chunk for semantic extraction
  for (const entry of allChunks) {
    const text = entry.text || '';
    const section = entry.section || '';
    const date = entry.date;

    // Deployment events
    if (text.match(/deployed|Deployed|deploy/i) || section.match(/deploy|Deploy/i)) {
      const match = text.match(/([\w-]+)\s+(site|app|service)\s+(deployed|redeployed)/i) || 
                    text.match(/(deployed|Deployed)\s+(.+?)(?:\s+to|\s+✅|$)/i);
      if (match) {
        addNode('deployment', `${match[1] || match[2]} deployed`, { what: match[0], date, section }, 'infrastructure');
      } else {
        addNode('deployment', `Deployment event (${date})`, { context: text.substring(0, 100), date, section }, 'infrastructure');
      }
    }

    // Build events
    if (text.match(/build|Build.*pass|Build.*clean|exit 0|npm run build/i) && !text.match(/node_modules/)) {
      addNode('build', `Build success (${date})`, { result: text.match(/Build.*$/m)?.[0] || 'pass', date, section }, 'infrastructure');
    }

    // Bug fixes
    if (text.match(/fixed|Fixed|fix|Fix|bug/i) && text.match(/error|broken|404|issue|missing|wrong|bug/i)) {
      const match = text.match(/Fixed\s+(.+?)(?:\.|\n)/);
      if (match) {
        addNode('fix', `Fix: ${match[1].trim().substring(0, 80)}`, { detail: text.substring(0, 150), date, section }, 'engineering');
      }
    }

    // Blockers
    if (text.match(/blocker|Blocked|blocked|Blockers/i)) {
      const match = text.match(/Blocked[:\s]+(.+?)(?:\n|$)/i);
      addNode('blocker', `Blocker: ${match ? match[1].trim().substring(0, 80) : 'see evidence'}`, { text: text.substring(0, 200), date, section }, 'management');
    }

    // Cost data
    const costMatch = text.match(/\$[\d.]+/);
    if (costMatch && (text.match(/cost|Cost|budget|Budget|token|Token/i))) {
      addNode('cost', `Cost data: ${costMatch[0]} (${date})`, { text: text.substring(0, 100), date, section }, 'operations');
    }

    // Content generation
    if (text.match(/blog post|content|post written|post created|new post/i) && !text.match(/node_modules/)) {
      const countMatch = text.match(/(\d+)\s+(new\s+)?(blog post|post)/i);
      if (countMatch) {
        addNode('content', `${countMatch[0]} (${date})`, { text: text.substring(0, 150), date, section }, 'content');
      }
    }

    // Tools/scripts built
    if (text.match(/script.*built|built.*script|created|Created|built.*tool|new.*tool/i)) {
      const match = text.match(/(Created|created|Built|built)\s+(.+?)(?:\.|\n)/);
      if (match) {
        addNode('tool', `Tool: ${match[2].trim().substring(0, 60)}`, { text: text.substring(0, 100), date, section }, 'engineering');
      }
    }

    // Architecture decisions
    if (text.match(/switched|Switched|migrated|Migrated|moved\s+from\s+\w+\s+to/i)) {
      addNode('decision', `Architecture change (${date})`, { context: text.substring(0, 100), date, section }, 'architecture');
    }

    // Site metrics
    const pageMatch = text.match(/(\d+)\s*page|(\d+)\s*URL|returning 200/i);
    if (pageMatch) {
      addNode('metric', `Site metric (${date})`, { context: text.substring(0, 100), date, section }, 'analytics');
    }
  }

  return nodes;
}

// Generate semantic summary text from nodes
function generateSemanticSummary(nodes, date) {
  const categories = {};
  for (const node of nodes) {
    if (!categories[node.category]) categories[node.category] = [];
    categories[node.category].push(node);
  }

  let summary = `# Semantic Summary — Week of ${date}\n\n`;
  summary += `Compressed from episodic memories.\n\n`;

  for (const [cat, catNodes] of Object.entries(categories)) {
    summary += `## ${cat.charAt(0).toUpperCase() + cat.slice(1)}\n\n`;
    for (const node of catNodes) {
      summary += `- **${node.type}**: ${node.label}\n`;
    }
    summary += '\n';
  }

  return summary;
}

// Main pipeline
function runCompression() {
  ensureDir(EPISODIC_DIR);
  ensureDir(SEMANTIC_DIR);

  const files = fs.readdirSync(MEMORY_DIR)
    .filter(f => f.match(/^\d{4}-\d{2}-\d{2}\.md$/))
    .sort()
    .map(f => path.join(MEMORY_DIR, f));

  console.log(`OmniMind Compression Pipeline — ${new Date().toISOString()}`);
  console.log(`Found ${files.length} episodic memory files.\n`);

  let totalChunks = 0;
  let totalBullets = 0;
  const allSemanticNodes = [];
  const processedDates = [];

  for (const file of files) {
    const parsed = parseEpisodicChunks(file);
    processedDates.push(parsed.date);
    totalChunks += parsed.chunks.length;
    totalBullets += parsed.bulletChunks.length;

    // Save episodic chunk copy
    const episodicFile = path.join(EPISODIC_DIR, `episodic-${parsed.date}.md`);
    fs.writeFileSync(episodicFile, 
      `# Episodic Memory — ${parsed.date}\n\n` +
      parsed.chunks.map(c => `## ${c.section}\n${c.text}\n`).join('\n') +
      `\n---\n*Processed by OmniMind compression pipeline*`
    );

    // Extract semantic nodes
    const nodes = extractSemanticNodes(parsed.chunks.map(c => ({ ...c, text: c.text, date: parsed.date })));
    allSemanticNodes.push(...nodes);

    console.log(`  ${parsed.date}: ${parsed.chunks.length} chunks, ${parsed.bulletChunks.length} bullets → ${nodes.length} semantic nodes`);
  }

  // Deduplicate semantic nodes
  const uniqueNodes = [];
  const nodeKeys = new Set();
  for (const node of allSemanticNodes) {
    const key = `${node.type}::${node.label}`;
    if (!nodeKeys.has(key)) {
      nodeKeys.add(key);
      uniqueNodes.push(node);
    }
  }

  // Save semantic nodes data
  const semanticDataFile = path.join(SEMANTIC_DIR, 'semantic-nodes.json');
  const existingNodes = fs.existsSync(semanticDataFile) 
    ? JSON.parse(fs.readFileSync(semanticDataFile, 'utf-8')) 
    : [];
  
  // Merge with existing, deduping
  const mergedNodes = [...existingNodes];
  const mergeKeys = new Set(existingNodes.map(n => `${n.type}::${n.label}`));
  for (const node of uniqueNodes) {
    const key = `${node.type}::${node.label}`;
    if (!mergeKeys.has(key)) {
      mergeKeys.add(key);
      mergedNodes.push(node);
    }
  }

  fs.writeFileSync(semanticDataFile, JSON.stringify(mergedNodes, null, 2));

  // Generate and save weekly summary
  const latestDate = processedDates[processedDates.length - 1] || 'unknown';
  const summary = generateSemanticSummary(uniqueNodes, latestDate);
  const summaryFile = path.join(SEMANTIC_DIR, `semantic-weekly-${latestDate}.md`);
  fs.writeFileSync(summaryFile, summary);

  console.log(`\n=== Compression Results ===`);
  console.log(`Memory files processed: ${files.length}`);
  console.log(`Episodic chunks scanned: ${totalChunks}`);
  console.log(`Bullet points scanned: ${totalBullets}`);
  console.log(`New semantic nodes extracted: ${uniqueNodes.length}`);
  console.log(`Total semantic nodes stored: ${mergedNodes.length}`);
  console.log(`Semantic summary written: ${summaryFile}`);
  console.log(`Semantic nodes data: ${semanticDataFile}`);

  return {
    filesProcessed: files.length,
    episodesScanned: totalChunks + totalBullets,
    chunks: totalChunks,
    bullets: totalBullets,
    newNodes: uniqueNodes.length,
    totalNodes: mergedNodes.length,
    summaryFile,
    dataFile: semanticDataFile
  };
}

// Run
const result = runCompression();
console.log(`\n✅ pipeline.runCompression() completed successfully.`);
