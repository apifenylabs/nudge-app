import json, re

with open('lib/generated-blog-data.ts', 'r') as f:
    content = f.read()

slugs = re.findall(r'"slug":\s*"([^"]+)"', content)
dates = re.findall(r'"date":\s*"([^"]+)"', content)

posts = []
for i in range(min(len(slugs), len(dates))):
    posts.append({'slug': slugs[i], 'date': dates[i]})

with open('data/blog-index.json', 'w') as f:
    json.dump(posts, f, indent=2)

print(f'Updated blog-index.json with {len(posts)} entries')
