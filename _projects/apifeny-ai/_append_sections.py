#!/usr/bin/env python3
"""Append sections 1-3 (demand forecasting + visibility + warehouse) to the supply chain blog post."""
import os

path = '/home/captain/.openclaw/workspace/apifeny-ai/app/blog/ai-supply-chain-logistics-asia-2026/page.tsx'
part2_path = '/home/captain/.openclaw/workspace/apifeny-ai/_part2_appendix.py'

with open(part2_path, 'r') as f:
    part2 = f.read()

# Remove the marker line
part2 = part2.replace('# PART2_CONTENT_START\n', '')

with open(path, 'a') as f:
    f.write(part2)

print(f"Appended part 2. File size: {os.path.getsize(path)} bytes")
