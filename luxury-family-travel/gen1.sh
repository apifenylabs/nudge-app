#!/bin/bash
echo "Generating post 1: Bali Villas..."
ollama run llama3.2 "$(cat << 'PROMPT_END'
Write a detailed, SEO-optimized blog post titled 'Top 10 Luxury Private Villas in Bali for Families — 2026 Review' for a luxury family travel website. Include an introduction about why families choose Bali for luxury travel, then list 10 top villas with descriptions of what makes each special for families (kids clubs, pools, nannies, dining, activities), and end with practical tips (best time to visit, booking advice, nanny services, pool safety). Write at least 1500 words of rich, engaging content in British English. Write in a warm, sophisticated tone that appeals to affluent parents. Use markdown headings for each villa and section.
PROMPT_END
)" 2>&1
