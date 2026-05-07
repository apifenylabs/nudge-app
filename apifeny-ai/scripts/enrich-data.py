#!/usr/bin/env python3
"""
Enrich apifeny-ai/lib/data.ts with:
1. New Phase 2 enrichment fields on all 20 existing tools
2. 30 new tools (total 50)

Additive only, atomic write.
"""
import re, os, sys

DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'lib', 'data.ts')

# ─── Helper: build enrichment field string ───

ENRICHMENTS = {
    '1': {'solopreneur_score': 10,'best_for_smallbusiness_use_case': '"All-round AI assistant for solopreneurs"','local_language_support': 'true','supported_languages_detail': '"Chinese, Japanese, Korean, Vietnamese, Thai, Indonesian"','ai_ready': 'true','community_rating': 4.7,'total_community_reviews': 45200,'how_to_use_guide_title': '"Master ChatGPT for daily workflows"','best_for_pipeline_stage': '"all-rounder"'},
    '2': {'solopreneur_score': 9,'best_for_smallbusiness_use_case': '"Deep analysis and document processing"','local_language_support': 'true','supported_languages_detail': '"Chinese, Japanese, Korean"','ai_ready': 'true','community_rating': 4.6,'total_community_reviews': 32100,'how_to_use_guide_title': '"Leverage Claude for deep analysis"','best_for_pipeline_stage': '"research"'},
    '3': {'solopreneur_score': 8,'best_for_smallbusiness_use_case': '"Research and long-form content"','local_language_support': 'true','supported_languages_detail': '"Chinese, Japanese, Korean, Hindi, Thai, Vietnamese"','ai_ready': 'true','community_rating': 4.3,'total_community_reviews': 28100,'how_to_use_guide_title': '"Get the most from Gemini 2.5"','best_for_pipeline_stage': '"research"'},
    '4': {'solopreneur_score': 8,'best_for_smallbusiness_use_case': '"Code completion for solo devs"','local_language_support': 'true','supported_languages_detail': '"English, Chinese, Japanese"','ai_ready': 'true','community_rating': 4.2,'total_community_reviews': 19500,'how_to_use_guide_title': '"Supercharge your coding with Copilot"','best_for_pipeline_stage': '"coding"'},
    '5': {'solopreneur_score': 7,'best_for_smallbusiness_use_case': '"Product photography and branding visuals"','local_language_support': 'false','supported_languages_detail': '"English prompts only"','ai_ready': 'false','community_rating': 4.5,'total_community_reviews': 15200,'how_to_use_guide_title': '"Create stunning visuals with Midjourney"','best_for_pipeline_stage': '"design"'},
    '6': {'solopreneur_score': 9,'best_for_smallbusiness_use_case': '"Market research and competitor analysis"','local_language_support': 'true','supported_languages_detail': '"Chinese, Japanese, Korean, English"','ai_ready': 'true','community_rating': 4.5,'total_community_reviews': 22100,'how_to_use_guide_title': '"Research like a pro with Perplexity"','best_for_pipeline_stage': '"research"'},
    '7': {'solopreneur_score': 10,'best_for_smallbusiness_use_case': '"Rapid MVP development for solopreneurs"','local_language_support': 'true','supported_languages_detail': '"English, Chinese, Japanese"','ai_ready': 'true','community_rating': 4.8,'total_community_reviews': 28100,'how_to_use_guide_title': '"Build apps faster with Cursor AI"','best_for_pipeline_stage': '"coding"'},
    '8': {'solopreneur_score': 8,'best_for_smallbusiness_use_case': '"Project management and documentation"','local_language_support': 'true','supported_languages_detail': '"Chinese, Japanese, Korean, English"','ai_ready': 'true','community_rating': 4.0,'total_community_reviews': 12300,'how_to_use_guide_title': '"Organise your business with Notion AI"','best_for_pipeline_stage': '"planning"'},
    '9': {'solopreneur_score': 7,'best_for_smallbusiness_use_case': '"Autonomous bug fixing and feature dev"','local_language_support': 'false','supported_languages_detail': '"English only"','ai_ready': 'true','community_rating': 3.8,'total_community_reviews': 8900,'how_to_use_guide_title': '"Let Devin handle the coding"','best_for_pipeline_stage': '"coding"'},
    '10': {'solopreneur_score': 9,'best_for_smallbusiness_use_case': '"Social media graphics and presentations"','local_language_support': 'true','supported_languages_detail': '"Chinese, Japanese, Korean, Thai, Vietnamese, English"','ai_ready': 'true','community_rating': 4.4,'total_community_reviews': 18400,'how_to_use_guide_title': '"Design everything with Canva AI"','best_for_pipeline_stage': '"design"'},
    '11': {'solopreneur_score': 7,'best_for_smallbusiness_use_case': '"Marketing copy and blog content"','local_language_support': 'false','supported_languages_detail': '"English only"','ai_ready': 'true','community_rating': 4.2,'total_community_reviews': 4200,'how_to_use_guide_title': '"Generate marketing content at scale"','best_for_pipeline_stage': '"marketing"'},
    '12': {'solopreneur_score': 7,'best_for_smallbusiness_use_case': '"Business writing and email polish"','local_language_support': 'false','supported_languages_detail': '"English only"','ai_ready': 'true','community_rating': 4.3,'total_community_reviews': 3800,'how_to_use_guide_title': '"Write better with Grammarly AI"','best_for_pipeline_stage': '"content"'},
    '13': {'solopreneur_score': 7,'best_for_smallbusiness_use_case': '"Marketing content and copywriting"','local_language_support': 'false','supported_languages_detail': '"English only"','ai_ready': 'true','community_rating': 4.2,'total_community_reviews': 4200,'how_to_use_guide_title': '"Generate marketing content at scale"','best_for_pipeline_stage': '"marketing"'},
    '14': {'solopreneur_score': 6,'best_for_smallbusiness_use_case': '"AI video content for marketing"','local_language_support': 'true','supported_languages_detail': '"Chinese, Japanese, Korean, English, Spanish"','ai_ready': 'false','community_rating': 4.1,'total_community_reviews': 5100,'how_to_use_guide_title': '"Create AI videos in minutes"','best_for_pipeline_stage': '"content"'},
    '15': {'solopreneur_score': 5,'best_for_smallbusiness_use_case': '"Custom AI model hosting"','local_language_support': 'true','supported_languages_detail': '"Chinese, Japanese, Korean, English"','ai_ready': 'false','community_rating': 4.6,'total_community_reviews': 24100,'how_to_use_guide_title': '"Explore and deploy open-source AI models"','best_for_pipeline_stage': '"coding"'},
    '16': {'solopreneur_score': 6,'best_for_smallbusiness_use_case': '"Building custom AI workflows"','local_language_support': 'true','supported_languages_detail': '"Chinese, Japanese, Korean, English"','ai_ready': 'false','community_rating': 4.3,'total_community_reviews': 17200,'how_to_use_guide_title': '"Build LLM-powered applications"','best_for_pipeline_stage': '"coding"'},
    '17': {'solopreneur_score': 7,'best_for_smallbusiness_use_case': '"Voiceovers for content and ads"','local_language_support': 'true','supported_languages_detail': '"Chinese, Japanese, Korean, English"','ai_ready': 'true','community_rating': 4.4,'total_community_reviews': 9800,'how_to_use_guide_title': '"Generate professional voiceovers"','best_for_pipeline_stage': '"content"'},
    '18': {'solopreneur_score': 6,'best_for_smallbusiness_use_case': '"Video editing and generation"','local_language_support': 'false','supported_languages_detail': '"English only"','ai_ready': 'false','community_rating': 4.2,'total_community_reviews': 7400,'how_to_use_guide_title': '"Edit video with AI-powered tools"','best_for_pipeline_stage': '"design"'},
    '19': {'solopreneur_score': 7,'best_for_smallbusiness_use_case': '"Podcast and video editing"','local_language_support': 'true','supported_languages_detail': '"Chinese, Japanese, Korean, English"','ai_ready': 'true','community_rating': 4.3,'total_community_reviews': 6100,'how_to_use_guide_title': '"Edit audio and video like a text doc"','best_for_pipeline_stage': '"content"'},
    '20': {'solopreneur_score': 6,'best_for_smallbusiness_use_case': '"Customer support automation"','local_language_support': 'true','supported_languages_detail': '"Chinese, Japanese, Korean, English"','ai_ready': 'true','community_rating': 4.3,'total_community_reviews': 3200,'how_to_use_guide_title': '"Automate customer support with Fin"','best_for_pipeline_stage': '"marketing"'},
}

QUICK_STARTS_MAP = {}
for i in range(1, 21):
    sid = str(i)
    if sid == '1':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Start a conversation",description:"Open ChatGPT and type your request naturally."},{step:2,title:"Refine with follow-ups",description:"Ask follow-up questions or request revisions. ChatGPT remembers the conversation."},{step:3,title:"Custom instructions",description:"Set custom instructions in settings for consistent responses."},{step:4,title:"Explore GPTs",description:"Browse the GPT Store for specialised assistants."},{step:5,title:"Use voice and images",description:"Upload images for analysis or use voice mode for hands-free interaction."}]'
    elif sid == '2':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Upload documents",description:"Drag and drop PDFs, Word docs, or code files. Claude processes up to 200K tokens."},{step:2,title:"Ask complex questions",description:"Ask Claude to analyse, summarise, or extract insights from your documents."},{step:3,title:"Use projects",description:"Create a Project with custom instructions and a knowledge base for consistent context."},{step:4,title:"Iterate on outputs",description:"Request revisions with specific feedback. Claude excels at following nuanced instructions."},{step:5,title:"Export and share",description:"Copy outputs, share conversation links, or export in your preferred format."}]'
    elif sid == '3':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Open Gemini",description:"Start with a simple question to understand its capabilities."},{step:2,title:"Use Google ecosystem",description:"Connect to Google Workspace for summarising emails, docs, and calendars."},{step:3,title:"Leverage long context",description:"Paste entire codebases or long documents. Gemini handles 1M+ tokens."},{step:4,title:"Deep research",description:"Use Gemini for multi-source research across documents."},{step:5,title:"Image and video analysis",description:"Upload images or videos. Gemini understands visual content natively."}]'
    elif sid == '4':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Install the extension",description:"Install in VS Code, JetBrains, or your preferred IDE."},{step:2,title:"Start typing",description:"Begin typing code and Copilot will suggest completions."},{step:3,title:"Write comments",description:"Write a comment describing what you want and Copilot generates the implementation."},{step:4,title:"Use Copilot Chat",description:"Open Copilot Chat to ask questions about your codebase."},{step:5,title:"Inline fixes",description:"Select code and ask Copilot to fix bugs, refactor, or add documentation."}]'
    elif sid == '5':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Join Discord",description:"Midjourney runs on Discord. Join the server and go to a newbie channel."},{step:2,title:"Write your first prompt",description:"Type /imagine followed by a detailed description."},{step:3,title:"Upscale and vary",description:"Use U buttons to upscale, V buttons for variations."},{step:4,title:"Refine with parameters",description:"Add --ar 16:9 for aspect ratio, --s 250 for stylization."},{step:5,title:"Use Describe feature",description:"Upload an image and use /describe to get prompt ideas."}]'
    elif sid == '6':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Ask a research question",description:"Type any question and Perplexity searches the web with cited sources."},{step:2,title:"Choose focus mode",description:"Select Academic, Writing, Math, or Social for tailored results."},{step:3,title:"Explore related questions",description:"Auto-suggested follow-ups dig deeper into any topic."},{step:4,title:"Create collections",description:"Save related queries into collections for ongoing research."},{step:5,title:"Use Pro search",description:"Upgrade to Pro for multi-step reasoning and deeper analysis."}]'
    elif sid == '7':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Install Cursor",description:"Download Cursor IDE — a fork of VS Code with deep AI integration."},{step:2,title:"Use Composer",description:"Open Composer with Cmd+I for multi-file AI changes."},{step:3,title:"Chat with your codebase",description:"Press Cmd+L to chat with Cursor about your entire project."},{step:4,title:"Agent mode",description:"Switch to Agent mode for autonomous coding."},{step:5,title:"Use Cursor rules",description:"Create a .cursorrules file for tech stack preferences."}]'
    elif sid == '8':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Set up workspace",description:"Create pages for docs, wikis, databases, and task boards."},{step:2,title:"Use AI features",description:"Press Cmd+J to invoke Notion AI for writing or editing."},{step:3,title:"Build databases",description:"Create database views for task tracking, CRM, or content calendars."},{step:4,title:"Connect tools",description:"Integrate with Slack, Google Drive, Figma, and 100+ tools."},{step:5,title:"Create templates",description:"Save frequently-used page layouts as templates."}]'
    elif sid == '9':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Describe your task",description:"Tell Devin what you need built in natural language."},{step:2,title:"Watch it work",description:"Devin uses its own terminal, code editor, and browser."},{step:3,title:"Review changes",description:"Devin shows a full diff and explains what it changed."},{step:4,title:"Provide feedback",description:"Ask for changes or refinements. Devin iterates."},{step:5,title:"Deploy autonomously",description:"Devin can deploy your app, including hosting and domain setup."}]'
    elif sid == '10':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Create a design",description:"Start with a template or use Magic Design from text prompts."},{step:2,title:"Use Magic Studio",description:"Access Magic Write, Magic Eraser, and Magic Animator."},{step:3,title:"Brand kit",description:"Upload your logos, fonts, and brand colours."},{step:4,title:"Collaborate",description:"Share designs for real-time collaboration."},{step:5,title:"Export and schedule",description:"Export or schedule social media posts directly from Canva."}]'
    elif sid == '11':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Choose a template",description:"Select from 50+ marketing-specific writing templates."},{step:2,title:"Set brand voice",description:"Define your brand tone, audience, and guidelines."},{step:3,title:"Generate and refine",description:"AI creates multiple versions. Pick and customise the best one."}]'
    elif sid == '12':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Install everywhere",description:"Browser extension, desktop app, and mobile keyboard."},{step:2,title:"Write confidently",description:"Grammarly checks spelling, grammar, tone, and clarity."},{step:3,title:"Set goals",description:"Set tone, audience, and formality before writing."}]'
    elif sid == '13':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Start with a workflow",description:"Choose blog posts, social media, or email campaigns."},{step:2,title:"Enter details",description:"Fill in topic, keywords, brand voice — Copy.ai generates versions."},{step:3,title:"Use Infobase",description:"Store brand guidelines and product details for consistent outputs."}]'
    elif sid == '14':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Choose an avatar",description:"Select from 160+ AI avatars with diverse appearances."},{step:2,title:"Write your script",description:"Type or paste your script. Synthesia converts to speech."},{step:3,title:"Customise video",description:"Add backgrounds, images, music, and text overlays."}]'
    elif sid == '15':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Explore the Hub",description:"Browse 500K+ models on Hugging Face Hub."},{step:2,title:"Use Spaces",description:"Try models in interactive demo apps without installing anything."},{step:3,title:"Deploy with API",description:"Use the free Inference API to test models programmatically."}]'
    elif sid == '16':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Install LangChain",description:"pip install langchain langchain-openai"},{step:2,title:"Set up LLM",description:"Configure OpenAI, Anthropic, or other provider with API keys."},{step:3,title:"Build a chain",description:"Create prompt template + LLM + output parser for structured responses."}]'
    elif sid == '17':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Choose a voice",description:"Browse 1000+ options across 32 languages."},{step:2,title:"Type or upload",description:"Type your script or upload a PDF. ElevenLabs generates natural speech."},{step:3,title:"Voice Design",description:"Design custom voices by adjusting age, gender, and accent."}]'
    elif sid == '18':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Choose a tool",description:"Select Text-to-Video, Image-to-Video, or Inpainting."},{step:2,title:"Write your prompt",description:"Describe the video you want in detail."},{step:3,title:"Edit and refine",description:"Use the timeline editor to add transitions and adjust timing."}]'
    elif sid == '19':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Import media",description:"Drag audio or video files. AI transcribes instantly."},{step:2,title:"Edit as text",description:"Delete or rearrange words — the video edits automatically."},{step:3,title:"Studio Sound",description:"Remove background noise and enhance voice quality."}]'
    elif sid == '20':
        QUICK_STARTS_MAP[sid]= '[{step:1,title:"Connect knowledge base",description:"Fin reads your help articles to answer questions automatically."},{step:2,title:"Set up Fin",description:"Configure tone, personality, and behaviour in settings."},{step:3,title:"Train with examples",description:"Provide example conversations for tricky questions."}]'

def enrich_fields(tid):
    e = ENRICHMENTS.get(tid, {})
    qs = QUICK_STARTS_MAP.get(tid, '[]')
    fields = []
    for k, v in e.items():
        fields.append(f'    {k}: {v}')
    fields.append(f'    quick_start_steps: {qs}')
    return ',\n'.join(fields)

# ─── Read & parse existing file ───

with open(DATA_PATH) as f:
    content = f.read()

export_idx = content.find('export default toolsData;')
insert_point = content.rfind('];\n', 0, export_idx)
if insert_point == -1:
    print("ERROR: Could not find tools array end")
    sys.exit(1)

header = content[:insert_point]
footer = content[insert_point:]

# Extract individual tool blocks using regex
# Each tool: starts with "  {" after a newline, ends with "  },"
tool_pattern = re.compile(
    r'  \{\n    id: \'(?P<id>\d+)\'.*?\n  \},',
    re.DOTALL
)

existing_tools = list(tool_pattern.finditer(header))
print(f"Found {len(existing_tools)} existing tools")

if len(existing_tools) != 20:
    print(f"WARNING: Expected 20 tools, found {len(existing_tools)}")

# Rebuild the tools section with enrichments
new_tools_section = "export const toolsData: Tool[] = [\n"

for match in existing_tools:
    full_block = match.group(0)
    tid = match.group('id')
    enr = enrich_fields(tid)
    # Remove the trailing '  },' from the block
    # The regex matches up to and including '  },'
    # Strip trailing whitespace first, then check
    inner = full_block.rstrip()
    if inner.endswith('},'):
        # Remove the last '},' and any trailing whitespace before it
        idx = inner.rfind('},')
        inner = inner[:idx].rstrip()
    new_block = inner + ',\n' + enr + '\n  },\n'
    new_tools_section += new_block

# Now add 30 new tools (the footer will be appended later with the complete new tools)
# Read from the enrichments file
new_tools_path = os.path.join(os.path.dirname(__file__), 'new-tools-data.txt')
if os.path.exists(new_tools_path):
    with open(new_tools_path) as f:
        new_tools = f.read()
    # Strip trailing stuff from new tools if present
    new_tools = new_tools.rstrip()
    if new_tools.endswith('];'):
        new_tools = new_tools[:-2].rstrip()
    if new_tools.endswith('],'):
        new_tools = new_tools[:-2].rstrip()
    new_tools_section += new_tools
    print(f"Added new tools from {new_tools_path}")
else:
    print(f"WARNING: {new_tools_path} not found. Only enrichment applied.")

# Write atomically
temp_path = DATA_PATH + '.tmp'
with open(temp_path, 'w') as f:
    f.write('import { Tool } from \'./types\';\n\n// Seed dataset — 50+ tools covering all major categories\n// This simulates the Kaggle dataset import. In production, use Supabase.\n')
    f.write(new_tools_section)
    f.write(footer)

os.replace(temp_path, DATA_PATH)
print(f"Written to {DATA_PATH}")
print("Done!")
